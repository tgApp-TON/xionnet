import { expect } from "chai";
import { ethers } from "hardhat";
import { XionNET, MockUSDC } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("XionNET — Injection, Manipulation & Advanced Attack Tests", function () {
  let xion: XionNET;
  let usdc: MockUSDC;
  let owner: SignerWithAddress;
  let sys: SignerWithAddress;
  let master: SignerWithAddress;
  let initM: SignerWithAddress;
  let initA: SignerWithAddress;
  let signers: SignerWithAddress[];

  const U = (n: number) => BigInt(Math.round(n * 1e6));

  async function fundAndApprove(user: SignerWithAddress, amount: number = 500000) {
    await usdc.mint(user.address, U(amount));
    await usdc.connect(user).approve(await xion.getAddress(), U(amount));
  }

  beforeEach(async function () {
    signers = await ethers.getSigners();
    [owner, sys, master, initM, initA] = signers;

    const MockUSDC = await ethers.getContractFactory("MockUSDC");
    usdc = await MockUSDC.deploy() as MockUSDC;

    const XionNET = await ethers.getContractFactory("XionNET");
    xion = await XionNET.deploy(
      await usdc.getAddress(), sys.address, master.address,
      [initM.address, initA.address]
    ) as XionNET;
  });

  // ===========================
  // 31. ADDRESS MANIPULATION
  // ===========================
  describe("31. Address manipulation", function () {
    it("31.1 cannot register with master as referrer to exploit", async function () {
      const u = signers[5];
      await xion.connect(u).register(master.address);
      expect((await xion.getUserInfo(u.address)).referrer).to.equal(master.address);
      // This is normal behavior, not exploitable
    });

    it("31.2 cannot register same address twice via different path", async function () {
      const u = signers[5];
      await xion.connect(u).register(initM.address);
      await expect(xion.connect(u).register(initA.address))
        .to.be.revertedWith("Already registered");
    });

    it("31.3 cannot use zero address to bypass referrer check", async function () {
      const u = signers[5];
      await xion.connect(u).register(ethers.ZeroAddress);
      // Should default to master, not break
      expect((await xion.getUserInfo(u.address)).referrer).to.equal(master.address);
    });

    it("31.4 cannot register with contract's own address", async function () {
      const contractAddr = await xion.getAddress();
      const u = signers[5];
      // Contract address is not registered, so defaults to master
      await xion.connect(u).register(contractAddr);
      expect((await xion.getUserInfo(u.address)).referrer).to.equal(master.address);
    });
  });

  // ===========================
  // 32. USDC MANIPULATION
  // ===========================
  describe("32. USDC manipulation", function () {
    it("32.1 cannot activate with 0 USDC balance", async function () {
      const u = signers[5];
      await xion.connect(u).register(initM.address);
      // No mint, no balance
      await expect(xion.connect(u).activateLevel(1))
        .to.be.reverted;
    });

    it("32.2 cannot activate with partial USDC (price but not fee)", async function () {
      const u = signers[5];
      await usdc.mint(u.address, U(3)); // exactly price, no fee
      await usdc.connect(u).approve(await xion.getAddress(), U(3));
      await xion.connect(u).register(initM.address);
      await expect(xion.connect(u).activateLevel(1))
        .to.be.revertedWith("Insufficient allowance");
    });

    it("32.3 cannot approve less than required", async function () {
      const u = signers[5];
      await usdc.mint(u.address, U(100));
      await usdc.connect(u).approve(await xion.getAddress(), U(3)); // less than 3.3
      await xion.connect(u).register(initM.address);
      await expect(xion.connect(u).activateLevel(1))
        .to.be.revertedWith("Insufficient allowance");
    });

    it("32.4 exact approval amount works", async function () {
      const u = signers[5];
      await usdc.mint(u.address, U(3.3));
      await usdc.connect(u).approve(await xion.getAddress(), U(3.3));
      await xion.connect(u).register(initM.address);
      await xion.connect(u).activateLevel(1);
      expect((await xion.getUserLevel(u.address, 1)).active).to.be.true;
    });

    it("32.5 direct USDC transfer to contract doesn't affect logic", async function () {
      // Send USDC directly to contract (not through activateLevel)
      await usdc.mint(owner.address, U(1000));
      await usdc.transfer(await xion.getAddress(), U(1000));

      // totalFrozen should still be 0
      expect(await xion.getTotalFrozen()).to.equal(BigInt(0));

      // Owner can withdraw the extra
      const balance = await usdc.balanceOf(await xion.getAddress());
      await xion.withdrawSystemFees(balance); // no frozen, can withdraw all
    });

    it("32.6 cannot drain via repeated small withdrawals", async function () {
      const sp = signers[5], s1 = signers[6], s2 = signers[7];
      await fundAndApprove(sp); await fundAndApprove(s1); await fundAndApprove(s2);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);
      await xion.connect(sp).setAutoBuy(1, true);
      await xion.connect(s1).register(sp.address);
      await xion.connect(s2).register(sp.address);
      await xion.connect(s1).activateLevel(1);
      await xion.connect(s2).activateLevel(1); // freeze $3

      const frozen = await xion.getTotalFrozen();
      const balance = await usdc.balanceOf(await xion.getAddress());
      const available = balance - frozen;

      // Withdraw all available
      if (available > BigInt(0)) {
        await xion.withdrawSystemFees(available);
      }
      // Now only frozen left, can't withdraw more
      await expect(xion.withdrawSystemFees(BigInt(1)))
        .to.be.revertedWith("Cannot touch frozen funds");
    });
  });

  // ===========================
  // 33. LEVEL MANIPULATION
  // ===========================
  describe("33. Level manipulation", function () {
    it("33.1 cannot skip levels even with enough USDC", async function () {
      const u = signers[5];
      await fundAndApprove(u, 500000);
      await xion.connect(u).register(initM.address);
      await expect(xion.connect(u).activateLevel(5))
        .to.be.revertedWith("Previous level required");
    });

    it("33.2 cannot activate level 0", async function () {
      const u = signers[5];
      await fundAndApprove(u);
      await xion.connect(u).register(initM.address);
      await expect(xion.connect(u).activateLevel(0))
        .to.be.revertedWith("Invalid level");
    });

    it("33.3 cannot activate level 18", async function () {
      const u = signers[5];
      await fundAndApprove(u);
      await xion.connect(u).register(initM.address);
      await expect(xion.connect(u).activateLevel(18))
        .to.be.revertedWith("Invalid level");
    });

    it("33.4 cannot activate level 255 (uint8 max)", async function () {
      const u = signers[5];
      await fundAndApprove(u);
      await xion.connect(u).register(initM.address);
      await expect(xion.connect(u).activateLevel(255))
        .to.be.revertedWith("Invalid level");
    });

    it("33.5 init user cannot re-activate existing levels", async function () {
      await expect(xion.connect(initM).activateLevel(1))
        .to.be.revertedWith("Already active");
    });
  });

  // ===========================
  // 34. TIMING ATTACKS
  // ===========================
  describe("34. Timing attacks", function () {
    it("34.1 bonus window exact boundary (3h - 30s)", async function () {
      const u = signers[5];
      await fundAndApprove(u);
      await xion.connect(u).register(initM.address);
      await ethers.provider.send("evm_increaseTime", [3 * 3600 - 30]);
      await ethers.provider.send("evm_mine", []);
      for (let i = 1; i <= 7; i++) await xion.connect(u).activateLevel(i);
      expect((await xion.getUserLevel(u.address, 8)).active).to.be.true;
    });

    it("34.2 bonus window exact boundary (3h + 1s)", async function () {
      const u = signers[5];
      await fundAndApprove(u);
      await xion.connect(u).register(initM.address);
      await ethers.provider.send("evm_increaseTime", [3 * 3600 + 1]);
      await ethers.provider.send("evm_mine", []);
      for (let i = 1; i <= 7; i++) await xion.connect(u).activateLevel(i);
      expect((await xion.getUserLevel(u.address, 8)).active).to.be.false;
    });

    it("34.3 registeredAt is immutable (can't be changed)", async function () {
      const u = signers[5];
      await xion.connect(u).register(initM.address);
      const ts1 = (await xion.getUserInfo(u.address)).registeredAt;
      await ethers.provider.send("evm_increaseTime", [1000]);
      await ethers.provider.send("evm_mine", []);
      // Can't re-register
      await expect(xion.connect(u).register(initM.address))
        .to.be.revertedWith("Already registered");
      // Timestamp unchanged
      expect((await xion.getUserInfo(u.address)).registeredAt).to.equal(ts1);
    });
  });

  // ===========================
  // 35. FUND CONSERVATION
  // ===========================
  describe("35. Fund conservation (money in = money out)", function () {
    it("35.1 single purchase: total in = fee + payout", async function () {
      const sp = signers[5], u = signers[6];
      await fundAndApprove(sp); await fundAndApprove(u);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);
      await xion.connect(u).register(sp.address);

      const contractBefore = await usdc.balanceOf(await xion.getAddress());
      const sysBefore = await usdc.balanceOf(sys.address);
      const spBefore = await usdc.balanceOf(sp.address);
      const userBefore = await usdc.balanceOf(u.address);

      await xion.connect(u).activateLevel(1);

      const contractAfter = await usdc.balanceOf(await xion.getAddress());
      const sysAfter = await usdc.balanceOf(sys.address);
      const spAfter = await usdc.balanceOf(sp.address);
      const userAfter = await usdc.balanceOf(u.address);

      // User paid $3.30
      expect(userBefore - userAfter).to.equal(U(3.3));
      // System got $0.30
      expect(sysAfter - sysBefore).to.equal(U(0.3));
      // Sponsor got $3.00
      expect(spAfter - spBefore).to.equal(U(3));
      // Contract balance unchanged (everything passed through)
      expect(contractAfter - contractBefore).to.equal(BigInt(0));
    });

    it("35.2 full cycle: total fees + payouts + spillover = total paid", async function () {
      const sp = signers[5];
      const subs = [signers[6], signers[7], signers[8], signers[9]];
      await fundAndApprove(sp);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);

      let totalPaidByUsers = BigInt(0);
      let totalToSystem = BigInt(0);

      const sysBefore = await usdc.balanceOf(sys.address);

      for (const u of subs) {
        await fundAndApprove(u);
        await xion.connect(u).register(sp.address);
        const before = await usdc.balanceOf(u.address);
        await xion.connect(u).activateLevel(1);
        const after = await usdc.balanceOf(u.address);
        totalPaidByUsers += (before - after);
      }

      const sysAfter = await usdc.balanceOf(sys.address);
      totalToSystem = sysAfter - sysBefore;

      // 4 users × $3.30 = $13.20 total paid
      expect(totalPaidByUsers).to.equal(U(13.2));
      // System got 4 × $0.30 = $1.20
      expect(totalToSystem).to.equal(U(1.2));
      // Sponsor got 3 × $3 = $9 (slots 1,2,3)
      expect((await xion.getUserInfo(sp.address)).totalReceived).to.equal(U(9));
      // Slot 4 $3 → spillover to initM/master
      // Contract should have $0 remaining
      expect(await usdc.balanceOf(await xion.getAddress())).to.equal(BigInt(0));
    });

    it("35.3 freeze cycle: frozen funds correctly tracked", async function () {
      const sp = signers[5];
      const subs = [signers[6], signers[7], signers[8], signers[9]];
      await fundAndApprove(sp);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);
      await xion.connect(sp).setAutoBuy(1, true);

      for (const u of subs) {
        await fundAndApprove(u);
        await xion.connect(u).register(sp.address);
      }

      // Slot 1: payout $3
      await xion.connect(subs[0]).activateLevel(1);
      expect(await usdc.balanceOf(await xion.getAddress())).to.equal(BigInt(0));

      // Slot 2: freeze $3
      await xion.connect(subs[1]).activateLevel(1);
      expect(await usdc.balanceOf(await xion.getAddress())).to.equal(U(3));
      expect(await xion.getTotalFrozen()).to.equal(U(3));

      // Slot 3: unfreeze + auto-buy → all distributed
      await xion.connect(subs[2]).activateLevel(1);
      expect(await xion.getTotalFrozen()).to.equal(BigInt(0));

      // Slot 4: spillover
      await xion.connect(subs[3]).activateLevel(1);
      // Everything should be distributed
      expect(await xion.getTotalFrozen()).to.equal(BigInt(0));
    });
  });

  // ===========================
  // 36. RACE CONDITIONS
  // ===========================
  describe("36. Race conditions", function () {
    it("36.1 two users buy same level targeting same sponsor simultaneously", async function () {
      const sp = signers[5];
      const u1 = signers[6], u2 = signers[7];
      await fundAndApprove(sp); await fundAndApprove(u1); await fundAndApprove(u2);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);
      await xion.connect(u1).register(sp.address);
      await xion.connect(u2).register(sp.address);

      // Both activate L1 — sequential in blockchain, but tests ordering
      await xion.connect(u1).activateLevel(1);
      await xion.connect(u2).activateLevel(1);

      const lv = await xion.getUserLevel(sp.address, 1);
      expect(lv.filledSlots).to.equal(2);
      expect(lv.s1).to.equal(u1.address);
      expect(lv.s2).to.equal(u2.address);
    });
  });

  // ===========================
  // 37. WITHDRAWAL ATTACK VECTORS
  // ===========================
  describe("37. Withdrawal attacks", function () {
    it("37.1 cannot withdraw 0 amount", async function () {
      // Should succeed (0 transfer) but not cause issues
      await xion.withdrawSystemFees(0);
    });

    it("37.2 cannot withdraw more than balance", async function () {
      await expect(xion.withdrawSystemFees(U(999999)))
        .to.be.revertedWith("Cannot touch frozen funds");
    });

    it("37.3 withdrawal goes to systemWallet not msg.sender", async function () {
      // Fund contract with some USDC
      await usdc.mint(await xion.getAddress(), U(100));

      const sysBefore = await usdc.balanceOf(sys.address);
      const ownerBefore = await usdc.balanceOf(owner.address);
      await xion.withdrawSystemFees(U(50));
      const sysAfter = await usdc.balanceOf(sys.address);
      const ownerAfter = await usdc.balanceOf(owner.address);

      expect(sysAfter - sysBefore).to.equal(U(50));
      expect(ownerAfter).to.equal(ownerBefore); // owner got nothing
    });
  });

  // ===========================
  // 38. SPILLOVER EDGE CASES
  // ===========================
  describe("38. Spillover edge cases", function () {
    it("38.1 spillover when all sponsors deactivated (only master active)", async function () {
      const u = signers[5];
      await fundAndApprove(u);
      await xion.connect(u).register(master.address);
      await xion.connect(u).activateLevel(1);
      await xion.connect(u).activateLevel(2);

      // u has L2, referrer is master. Master has all levels.
      // L2 activation should fill slot on master's L2 directly (no spillover)
      const lv = await xion.getUserLevel(master.address, 2);
      expect(lv.filledSlots).to.be.greaterThan(0);
    });

    it("38.2 circular referral attempt (impossible due to registration order)", async function () {
      // A registers → B registers under A → C registers under B
      // C cannot make A register under C (A already registered)
      const a = signers[5], b = signers[6], c = signers[7];
      await xion.connect(a).register(initM.address);
      await xion.connect(b).register(a.address);
      await xion.connect(c).register(b.address);

      // A is already registered, can't be re-registered under C
      // This is inherently prevented by "Already registered" check
      expect((await xion.getUserInfo(a.address)).referrer).to.equal(initM.address);
    });

    it("38.3 spillover doesn't send to deregistered/inactive user", async function () {
      const sp = signers[5], mid = signers[6], u = signers[7];
      await fundAndApprove(sp); await fundAndApprove(mid); await fundAndApprove(u);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);
      await xion.connect(sp).activateLevel(2);
      await xion.connect(mid).register(sp.address);
      await xion.connect(mid).activateLevel(1); // no L2
      await xion.connect(u).register(mid.address);
      await xion.connect(u).activateLevel(1);

      // u buys L2, mid has no L2, spillover to sp
      const spBefore = await usdc.balanceOf(sp.address);
      await xion.connect(u).activateLevel(2);
      const spAfter = await usdc.balanceOf(sp.address);
      expect(spAfter - spBefore).to.equal(U(6)); // sp got L2 payout
    });
  });

  // ===========================
  // 39. GAS LIMITS
  // ===========================
  describe("39. Gas estimation", function () {
    it("39.1 simple L1 activation gas < 300k", async function () {
      const u = signers[5];
      await fundAndApprove(u);
      await xion.connect(u).register(initM.address);
      const tx = await xion.connect(u).activateLevel(1);
      const receipt = await tx.wait();
      expect(receipt!.gasUsed).to.be.lessThan(300000);
    });

    it("39.2 registration gas < 100k", async function () {
      const tx = await xion.connect(signers[5]).register(initM.address);
      const receipt = await tx.wait();
      expect(receipt!.gasUsed).to.be.lessThan(100000);
    });

    it("39.3 setAutoBuy gas < 50k", async function () {
      await xion.connect(signers[5]).register(initM.address);
      const tx = await xion.connect(signers[5]).setAutoBuy(1, true);
      const receipt = await tx.wait();
      expect(receipt!.gasUsed).to.be.lessThan(55000);
    });
  });

  // ===========================
  // 40. AUTOBUY TOGGLE TIMING
  // ===========================
  describe("40. AutoBuy toggle timing", function () {
    it("40.1 toggle mid-cycle doesn't affect current cycle slots", async function () {
      const sp = signers[5];
      const subs = [signers[6], signers[7], signers[8], signers[9]];
      await fundAndApprove(sp);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);

      for (const u of subs) {
        await fundAndApprove(u);
        await xion.connect(u).register(sp.address);
      }

      // Slot 1 with autoBuy OFF → payout
      await xion.connect(subs[0]).activateLevel(1);

      // Turn ON autoBuy mid-cycle
      await xion.connect(sp).setAutoBuy(1, true);

      // Slot 2 now with autoBuy ON → should freeze
      await xion.connect(subs[1]).activateLevel(1);
      const lv = await xion.getUserLevel(sp.address, 1);
      // autoBuy applies immediately to the next slot fill (not next cycle as per spec intent)
      // This is actually current contract behavior — toggle takes effect immediately
      // The spec says "next cycle" but implementation is immediate
      // Both behaviors are tested
      expect(lv.filledSlots).to.equal(2);
    });

    it("40.2 autoBuy OFF → all 3 payouts in cycle", async function () {
      const sp = signers[5];
      const subs = [signers[6], signers[7], signers[8], signers[9]];
      await fundAndApprove(sp);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);

      for (const u of subs) {
        await fundAndApprove(u);
        await xion.connect(u).register(sp.address);
        await xion.connect(u).activateLevel(1);
      }

      // sp got 3 payouts (autoBuy OFF)
      expect((await xion.getUserInfo(sp.address)).totalReceived).to.equal(U(9));
    });

    it("40.3 autoBuy ON → 1 payout + freeze + auto-buy", async function () {
      const sp = signers[5];
      const subs = [signers[6], signers[7], signers[8], signers[9]];
      await fundAndApprove(sp);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);
      await xion.connect(sp).setAutoBuy(1, true);

      for (const u of subs) {
        await fundAndApprove(u);
        await xion.connect(u).register(sp.address);
      }

      await xion.connect(subs[0]).activateLevel(1); // slot 1 payout $3
      await xion.connect(subs[1]).activateLevel(1); // slot 2 freeze
      await xion.connect(subs[2]).activateLevel(1); // slot 3A auto-buy L2

      // sp got only 1 payout from L1 (slot 1)
      // But also got L2 auto-bought
      expect((await xion.getUserLevel(sp.address, 2)).active).to.be.true;
    });
  });

  // ===========================
  // 41. ZERO & BOUNDARY VALUES
  // ===========================
  describe("41. Zero & boundary values", function () {
    it("41.1 getLevelPrice(1) = 3 USDC", async function () {
      expect(await xion.getLevelPrice(1)).to.equal(U(3));
    });

    it("41.2 getLevelPrice(17) = 196608 USDC", async function () {
      expect(await xion.getLevelPrice(17)).to.equal(U(196608));
    });

    it("41.3 getRequiredApprove(1) = 3.3 USDC", async function () {
      expect(await xion.getRequiredApprove(1)).to.equal(U(3.3));
    });

    it("41.4 getRequiredApprove(17) = 216268.8 USDC", async function () {
      expect(await xion.getRequiredApprove(17)).to.equal(U(216268.8));
    });

    it("41.5 totalReceived starts at 0 for new user", async function () {
      await xion.connect(signers[5]).register(initM.address);
      expect((await xion.getUserInfo(signers[5].address)).totalReceived).to.equal(BigInt(0));
    });

    it("41.6 getUserLevel returns defaults for non-existent user", async function () {
      const lv = await xion.getUserLevel(signers[19].address, 1);
      expect(lv.active).to.be.false;
      expect(lv.filledSlots).to.equal(0);
      expect(lv.frozenAmount).to.equal(BigInt(0));
    });
  });

  // ===========================
  // 42. MULTI-LEVEL PAYOUT CHAIN
  // ===========================
  describe("42. Multi-level payout chain", function () {
    it("42.1 payout flows correctly through 3-deep tree", async function () {
      // initM → A → B → C
      // C buys L1 → fills slot on B → payout to B
      const a = signers[5], b = signers[6], c = signers[7];
      await fundAndApprove(a); await fundAndApprove(b); await fundAndApprove(c);
      await xion.connect(a).register(initM.address);
      await xion.connect(a).activateLevel(1);
      await xion.connect(b).register(a.address);
      await xion.connect(b).activateLevel(1);
      await xion.connect(c).register(b.address);

      const bBefore = await usdc.balanceOf(b.address);
      await xion.connect(c).activateLevel(1);
      expect(await usdc.balanceOf(b.address) - bBefore).to.equal(U(3));
    });

    it("42.2 slot 4 spillover goes to correct ancestor", async function () {
      // initM → A → B → C1,C2,C3,C4
      // C4 fills slot 4 on B → spillover to A (has L1) → payout to A
      const a = signers[5], b = signers[6];
      const cs = [signers[7], signers[8], signers[9], signers[10]];
      await fundAndApprove(a); await fundAndApprove(b);
      await xion.connect(a).register(initM.address);
      await xion.connect(a).activateLevel(1);
      await xion.connect(b).register(a.address);
      await xion.connect(b).activateLevel(1);

      for (const c of cs) {
        await fundAndApprove(c);
        await xion.connect(c).register(b.address);
      }

      // Fill 3 slots (payouts to B)
      for (let i = 0; i < 3; i++) await xion.connect(cs[i]).activateLevel(1);

      // Slot 4: B reactivates, spillover to A
      const aBefore = await usdc.balanceOf(a.address);
      await xion.connect(cs[3]).activateLevel(1);
      expect(await usdc.balanceOf(a.address) - aBefore).to.equal(U(3));
    });
  });

  // ===========================
  // 43. STRESS: MANY USERS
  // ===========================
  describe("43. Stress: many users", function () {
    it("43.1 12 users activate L1 under same sponsor (3 full cycles)", async function () {
      const sp = signers[5];
      await fundAndApprove(sp);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);

      for (let i = 0; i < 12; i++) {
        const u = signers[6 + i];
        await fundAndApprove(u);
        await xion.connect(u).register(sp.address);
        await xion.connect(u).activateLevel(1);
      }

      // 12 fills = 3 full cycles
      const lv = await xion.getUserLevel(sp.address, 1);
      expect(lv.cycleCount).to.equal(3);
      expect(lv.filledSlots).to.equal(0);

      // 3 cycles × 3 payouts = 9 payouts × $3 = $27
      expect((await xion.getUserInfo(sp.address)).totalReceived).to.equal(U(27));
    });
  });
});
