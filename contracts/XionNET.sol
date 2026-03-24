// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract XionNET is ReentrancyGuard, Ownable, Pausable {
    using SafeERC20 for IERC20;

    // ==================== CONSTANTS ====================
    uint8   public constant MAX_LEVELS      = 17;
    uint8   public constant MAX_SLOTS       = 4;
    uint16  public constant MAX_HOPS        = 200;      // reduced from 100k for gas safety
    uint8   public constant MAX_DEPTH       = 20;       // max recursion depth for _fillSlot
    uint256 public constant PROTOCOL_PCT    = 10;
    uint32  public constant BONUS_WINDOW    = 3 hours;
    uint8   public constant BONUS_TRIGGER   = 7;
    uint8   public constant BONUS_GIFT      = 8;

    // ==================== STORAGE ====================
    IERC20  public immutable usdcToken;
    address public systemWallet;
    address public masterWallet;
    uint256[18] public levelPrices; // index 0 unused, 1-17
    uint256 public totalFrozen;
    uint8   private _currentDepth;  // recursion depth tracker

    struct LevelData {
        bool     active;
        uint8    filledSlots;
        uint32   cycleCount;
        uint32   activatedAt;
        uint256  frozenAmount;
        address  slot1;
        address  slot2;
        address  slot3;
        address  slot4;
    }

    struct UserData {
        bool     registered;
        address  referrer;
        bool     isMaster;
        uint32   registeredAt;
        uint256  totalReceived;
        uint256  totalPaid;
    }

    mapping(address => UserData) public users;
    mapping(address => mapping(uint8 => LevelData)) public userLevels;
    mapping(address => mapping(uint8 => bool)) public autoBuyEnabled;

    // ==================== EVENTS ====================
    event UserRegistered(address indexed user, address indexed referrer, uint32 timestamp);

    event LevelActivated(address indexed user, uint8 level, uint256 price,
        uint8 actType, uint32 timestamp);

    event SlotFilled(address indexed owner, address indexed source,
        uint8 level, uint8 slot, uint256 amount,
        uint8 srcType, uint32 timestamp);

    event PayoutSent(address indexed receiver, address indexed sender,
        uint8 level, uint8 slot, uint256 amount, uint32 timestamp);

    event FundsFrozen(address indexed user, uint8 level,
        uint256 amount, uint32 timestamp);

    event FundsUnfrozen(address indexed user, uint8 level,
        uint256 amount, bool autoActivated, uint32 timestamp);

    event FundsReturned(address indexed user, uint8 level,
        uint256 amount, uint32 timestamp);

    event SpilloverSent(address indexed from, address indexed to,
        uint8 level, uint256 amount, uint16 hops, uint32 timestamp);

    event LevelReactivated(address indexed user, uint8 level,
        uint32 cycleCount, uint32 timestamp);

    event CommissionTaken(address indexed user, uint8 level,
        uint256 amount, uint32 timestamp);

    event Bounced(address indexed user, uint8 level,
        uint8 reason, uint32 timestamp);

    event SystemWalletChanged(address indexed oldWallet, address indexed newWallet);
    event MasterWalletChanged(address indexed oldWallet, address indexed newWallet);
    event AutoBuyToggled(address indexed user, uint8 level, bool enabled);

    // ==================== CONSTRUCTOR ====================
    constructor(
        address _usdc,
        address _systemWallet,
        address _masterWallet,
        address[] memory _init
    ) Ownable(msg.sender) {
        require(_usdc != address(0), "Invalid USDC");
        require(_systemWallet != address(0), "Invalid system wallet");
        require(_masterWallet != address(0), "Invalid master wallet");

        usdcToken    = IERC20(_usdc);
        systemWallet = _systemWallet;
        masterWallet = _masterWallet;

        levelPrices[1]  = 3_000_000;
        levelPrices[2]  = 6_000_000;
        levelPrices[3]  = 12_000_000;
        levelPrices[4]  = 24_000_000;
        levelPrices[5]  = 48_000_000;
        levelPrices[6]  = 96_000_000;
        levelPrices[7]  = 192_000_000;
        levelPrices[8]  = 384_000_000;
        levelPrices[9]  = 768_000_000;
        levelPrices[10] = 1_536_000_000;
        levelPrices[11] = 3_072_000_000;
        levelPrices[12] = 6_144_000_000;
        levelPrices[13] = 12_288_000_000;
        levelPrices[14] = 24_576_000_000;
        levelPrices[15] = 49_152_000_000;
        levelPrices[16] = 98_304_000_000;
        levelPrices[17] = 196_608_000_000;

        // Master account
        users[_masterWallet].registered = true;
        users[_masterWallet].isMaster = true;
        users[_masterWallet].registeredAt = uint32(block.timestamp);
        for (uint8 i = 1; i <= MAX_LEVELS; i++) {
            userLevels[_masterWallet][i].active = true;
            userLevels[_masterWallet][i].activatedAt = uint32(block.timestamp);
        }

        // Initial participants — all levels open, under master
        for (uint256 j = 0; j < _init.length; j++) {
            address u = _init[j];
            require(u != address(0), "Invalid init address");
            users[u].registered = true;
            users[u].referrer = _masterWallet;
            users[u].registeredAt = uint32(block.timestamp);
            for (uint8 i = 1; i <= MAX_LEVELS; i++) {
                userLevels[u][i].active = true;
                userLevels[u][i].activatedAt = uint32(block.timestamp);
            }
        }
    }

    // Reject native token transfers
    receive() external payable { revert("No native tokens"); }

    // ==================== PUBLIC: REGISTER ====================
    function register(address referrer) external whenNotPaused {
        require(!users[msg.sender].registered, "Already registered");
        require(msg.sender != referrer, "Cannot self-refer");
        require(msg.sender == tx.origin, "No contracts"); // prevent contract accounts

        if (referrer == address(0) || !users[referrer].registered) {
            referrer = masterWallet;
        }

        users[msg.sender].registered = true;
        users[msg.sender].referrer = referrer;
        users[msg.sender].registeredAt = uint32(block.timestamp);

        emit UserRegistered(msg.sender, referrer, uint32(block.timestamp));
    }

    // ==================== PUBLIC: ACTIVATE LEVEL ====================
    function activateLevel(uint8 levelNum) external nonReentrant whenNotPaused {
        require(msg.sender == tx.origin, "No contracts");
        require(users[msg.sender].registered, "Not registered");
        require(levelNum >= 1 && levelNum <= MAX_LEVELS, "Invalid level");
        require(!userLevels[msg.sender][levelNum].active, "Already active");
        require(levelNum == 1 || userLevels[msg.sender][levelNum - 1].active, "Previous level required");

        uint256 price = levelPrices[levelNum];
        uint256 fee = price * PROTOCOL_PCT / 100;
        uint256 total = price + fee;

        require(usdcToken.allowance(msg.sender, address(this)) >= total, "Insufficient allowance");
        usdcToken.safeTransferFrom(msg.sender, address(this), total);

        // Send 10% fee to system
        usdcToken.safeTransfer(systemWallet, fee);
        emit CommissionTaken(msg.sender, levelNum, fee, uint32(block.timestamp));

        // Return frozen from previous level if exists
        if (levelNum > 1) {
            _returnFrozenIfExists(msg.sender, levelNum - 1);
        }

        users[msg.sender].totalPaid += total;

        _currentDepth = 0;
        _activateLevelInternal(msg.sender, levelNum, price, 1); // actType=1 manual

        // Bonus check: bought L7 within 3 hours of registration
        if (levelNum == BONUS_TRIGGER
            && block.timestamp - users[msg.sender].registeredAt <= BONUS_WINDOW
            && !userLevels[msg.sender][BONUS_GIFT].active
            && BONUS_GIFT <= MAX_LEVELS)
        {
            _returnFrozenIfExists(msg.sender, BONUS_TRIGGER);

            // Activate L8 for free — no _fillSlot
            userLevels[msg.sender][BONUS_GIFT].active = true;
            userLevels[msg.sender][BONUS_GIFT].activatedAt = uint32(block.timestamp);
            emit LevelActivated(msg.sender, BONUS_GIFT, 0, 3, uint32(block.timestamp));
        }
    }

    // ==================== PUBLIC: SET AUTO-BUY ====================
    function setAutoBuy(uint8 level, bool enabled) external whenNotPaused {
        require(users[msg.sender].registered, "Not registered");
        require(level >= 1 && level < MAX_LEVELS, "Invalid level"); // not L17
        autoBuyEnabled[msg.sender][level] = enabled;
        emit AutoBuyToggled(msg.sender, level, enabled);
    }

    // ==================== VIEW FUNCTIONS ====================
    function getUserInfo(address user) external view returns (
        bool registered, address referrer, bool isMaster,
        uint32 registeredAt, uint256 totalReceived, uint256 totalPaid
    ) {
        UserData storage u = users[user];
        return (u.registered, u.referrer, u.isMaster, u.registeredAt, u.totalReceived, u.totalPaid);
    }

    function getUserLevel(address user, uint8 level) external view returns (
        bool active, uint8 filledSlots, uint32 cycleCount, uint32 activatedAt,
        uint256 frozenAmount, address s1, address s2, address s3, address s4
    ) {
        LevelData storage lv = userLevels[user][level];
        return (lv.active, lv.filledSlots, lv.cycleCount, lv.activatedAt,
                lv.frozenAmount, lv.slot1, lv.slot2, lv.slot3, lv.slot4);
    }

    function getReferrer(address user) external view returns (address) {
        return users[user].referrer;
    }

    function getLevelPrice(uint8 level) external view returns (uint256) {
        require(level >= 1 && level <= MAX_LEVELS, "Invalid level");
        return levelPrices[level];
    }

    function getRequiredApprove(uint8 level) external view returns (uint256) {
        require(level >= 1 && level <= MAX_LEVELS, "Invalid level");
        return levelPrices[level] + levelPrices[level] * PROTOCOL_PCT / 100;
    }

    function checkAllowance(address user, uint8 level) external view returns (
        bool sufficient, uint256 required, uint256 current
    ) {
        uint256 req = levelPrices[level] + levelPrices[level] * PROTOCOL_PCT / 100;
        uint256 cur = usdcToken.allowance(user, address(this));
        return (cur >= req, req, cur);
    }

    function getTotalFrozen() external view returns (uint256) {
        return totalFrozen;
    }

    function getAutoBuy(address user, uint8 level) external view returns (bool) {
        return autoBuyEnabled[user][level];
    }

    // ==================== ADMIN ====================
    function setSystemWallet(address _wallet) external onlyOwner {
        require(_wallet != address(0), "Invalid address");
        emit SystemWalletChanged(systemWallet, _wallet);
        systemWallet = _wallet;
    }

    function setMasterWallet(address _wallet) external onlyOwner {
        require(_wallet != address(0), "Invalid address");
        address oldMaster = masterWallet;
        // Remove isMaster from old
        users[oldMaster].isMaster = false;
        // Set up new master
        users[_wallet].registered = true;
        users[_wallet].isMaster = true;
        users[_wallet].registeredAt = uint32(block.timestamp);
        for (uint8 i = 1; i <= MAX_LEVELS; i++) {
            userLevels[_wallet][i].active = true;
            userLevels[_wallet][i].activatedAt = uint32(block.timestamp);
        }
        emit MasterWalletChanged(oldMaster, _wallet);
        masterWallet = _wallet;
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function withdrawSystemFees(uint256 amount) external onlyOwner {
        uint256 available = usdcToken.balanceOf(address(this)) - totalFrozen;
        require(amount <= available, "Cannot touch frozen funds");
        usdcToken.safeTransfer(systemWallet, amount);
    }

    // ==================== INTERNAL HELPERS ====================
    function _returnFrozenIfExists(address user, uint8 levelNum) internal {
        LevelData storage lv = userLevels[user][levelNum];
        if (lv.frozenAmount > 0) {
            uint256 frozen = lv.frozenAmount;
            lv.frozenAmount = 0;
            totalFrozen -= frozen;
            usdcToken.safeTransfer(user, frozen);
            emit FundsReturned(user, levelNum, frozen, uint32(block.timestamp));
        }
    }

    // ==================== INTERNAL: ACTIVATE ====================
    function _activateLevelInternal(
        address user, uint8 levelNum, uint256 amount, uint8 actType
    ) internal {
        LevelData storage level = userLevels[user][levelNum];
        level.active = true;
        level.filledSlots = 0;
        level.frozenAmount = 0;
        level.slot1 = address(0);
        level.slot2 = address(0);
        level.slot3 = address(0);
        level.slot4 = address(0);
        level.activatedAt = uint32(block.timestamp);

        emit LevelActivated(user, levelNum, amount, actType, uint32(block.timestamp));

        // Find sponsor with active level
        address sponsor = users[user].referrer;
        if (sponsor != address(0) && userLevels[sponsor][levelNum].active) {
            _fillSlot(sponsor, levelNum, amount, user, 1); // srcType=1 direct
        } else {
            _spillover(user, levelNum, amount);
        }
    }

    // ==================== INTERNAL: FILL SLOT ====================
    function _fillSlot(
        address owner, uint8 levelNum, uint256 amount, address from, uint8 srcType
    ) internal {
        // Recursion depth protection
        _currentDepth += 1;
        require(_currentDepth <= MAX_DEPTH, "Max recursion depth");

        LevelData storage level = userLevels[owner][levelNum];
        require(level.filledSlots < MAX_SLOTS, "Level already full");
        level.filledSlots += 1;
        uint8 slotNum = level.filledSlots;

        // Record slot address
        if (slotNum == 1) level.slot1 = from;
        else if (slotNum == 2) level.slot2 = from;
        else if (slotNum == 3) level.slot3 = from;
        else if (slotNum == 4) level.slot4 = from;

        emit SlotFilled(owner, from, levelNum, slotNum, amount, srcType, uint32(block.timestamp));

        // MASTER — all slots = payout
        if (users[owner].isMaster) {
            if (slotNum == 4) {
                _reactivate(owner, levelNum);
            }
            _payout(owner, from, levelNum, slotNum, amount);
            _currentDepth -= 1;
            return;
        }

        if (slotNum == 1) {
            _slot1(owner, from, levelNum, amount);
        } else if (slotNum == 2) {
            _slot2(owner, from, levelNum, amount);
        } else if (slotNum == 3) {
            _slot3(owner, from, levelNum, amount);
        } else if (slotNum == 4) {
            _slot4(owner, from, levelNum, amount);
        }

        _currentDepth -= 1;
    }

    // ==================== SLOT HANDLERS ====================

    function _slot1(address owner, address from, uint8 levelNum, uint256 amount) internal {
        _payout(owner, from, levelNum, 1, amount);
    }

    function _slot2(address owner, address from, uint8 levelNum, uint256 amount) internal {
        // L17: always payout
        if (levelNum == MAX_LEVELS) {
            _payout(owner, from, levelNum, 2, amount);
            return;
        }

        // If autoBuy enabled AND N+1 not bought → freeze
        if (autoBuyEnabled[owner][levelNum] && !userLevels[owner][levelNum + 1].active) {
            // Safety: ensure no existing frozen amount (should be 0 after activation)
            assert(userLevels[owner][levelNum].frozenAmount == 0);
            userLevels[owner][levelNum].frozenAmount = amount;
            totalFrozen += amount;
            emit FundsFrozen(owner, levelNum, amount, uint32(block.timestamp));
        } else {
            _payout(owner, from, levelNum, 2, amount);
        }
    }

    function _slot3(address owner, address from, uint8 levelNum, uint256 amount) internal {
        // L17: always payout
        if (levelNum == MAX_LEVELS) {
            _payout(owner, from, levelNum, 3, amount);
            return;
        }

        uint256 frozen = userLevels[owner][levelNum].frozenAmount;

        if (frozen > 0 && !userLevels[owner][levelNum + 1].active) {
            // 3A: auto-buy N+1
            userLevels[owner][levelNum].frozenAmount = 0;
            totalFrozen -= frozen;
            emit FundsUnfrozen(owner, levelNum, frozen, true, uint32(block.timestamp));

            uint256 totalAmount = frozen + amount; // = price(N+1)
            _activateLevelInternal(owner, levelNum + 1, totalAmount, 2); // actType=2 auto

        } else if (frozen > 0 && userLevels[owner][levelNum + 1].active) {
            // 3B: N+1 already bought, send frozen+incoming to N+1 slot
            userLevels[owner][levelNum].frozenAmount = 0;
            totalFrozen -= frozen;
            emit FundsUnfrozen(owner, levelNum, frozen, false, uint32(block.timestamp));

            uint256 totalAmount = frozen + amount;
            address sponsor = users[owner].referrer;
            if (sponsor != address(0) && userLevels[sponsor][levelNum + 1].active) {
                _fillSlot(sponsor, levelNum + 1, totalAmount, owner, 3); // srcType=3 unfreeze
            } else {
                _spillover(owner, levelNum + 1, totalAmount);
            }
        } else {
            // 3C: no frozen, payout
            _payout(owner, from, levelNum, 3, amount);
        }
    }

    function _slot4(address owner, address /*from*/, uint8 levelNum, uint256 amount) internal {
        _reactivate(owner, levelNum);
        _spillover(owner, levelNum, amount);
    }

    // ==================== INTERNAL: PAYOUT ====================
    function _payout(
        address receiver, address sender, uint8 levelNum, uint8 slotNum, uint256 amount
    ) internal {
        usdcToken.safeTransfer(receiver, amount);
        users[receiver].totalReceived += amount;
        emit PayoutSent(receiver, sender, levelNum, slotNum, amount, uint32(block.timestamp));
    }

    // ==================== INTERNAL: SPILLOVER ====================
    function _spillover(address fromUser, uint8 levelNum, uint256 amount) internal {
        address p = users[fromUser].referrer;
        uint16 hops = 0;

        while (true) {
            if (p == address(0) || p == masterWallet) {
                p = masterWallet;
                break;
            }
            if (hops >= MAX_HOPS) {
                emit Bounced(fromUser, levelNum, 2, uint32(block.timestamp));
                p = masterWallet;
                break;
            }
            if (userLevels[p][levelNum].active) break;
            p = users[p].referrer;
            hops++;
        }

        emit SpilloverSent(fromUser, p, levelNum, amount, hops, uint32(block.timestamp));
        _fillSlot(p, levelNum, amount, fromUser, 2); // srcType=2 spillover
    }

    // ==================== INTERNAL: REACTIVATE ====================
    function _reactivate(address owner, uint8 levelNum) internal {
        LevelData storage level = userLevels[owner][levelNum];

        // C-2 fix: return frozen funds if any exist at reactivation
        if (level.frozenAmount > 0) {
            uint256 frozen = level.frozenAmount;
            level.frozenAmount = 0;
            totalFrozen -= frozen;
            usdcToken.safeTransfer(owner, frozen);
            emit FundsReturned(owner, levelNum, frozen, uint32(block.timestamp));
        }

        level.filledSlots = 0;
        level.slot1 = address(0);
        level.slot2 = address(0);
        level.slot3 = address(0);
        level.slot4 = address(0);
        level.cycleCount += 1;
        level.activatedAt = uint32(block.timestamp);

        emit LevelReactivated(owner, levelNum, level.cycleCount, uint32(block.timestamp));
    }
}
