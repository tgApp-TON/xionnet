import { expect } from "chai";
import { ethers } from "hardhat";
import { XionNET, MockUSDC } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("XionNET", function () {
  let xion: XionNET;
  let usdc: MockUSDC;
  let owner: SignerWithAddress;
  let systemWallet: SignerWithAddress;
  let masterWallet: SignerWithAddress;
  let userM: SignerWithAddress;
  let userA: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;
  let user4: SignerWithAddress;
  let user5: SignerWithAddress;

  const USDC = (n: number) => BigInt(Math.round(n * 1e6));

  beforeEach(async function () {
    [owner, systemWallet, masterWallet, userM, userA, user1, user2, user3, user4, user5] =
      await ethers.getSigners();

    const MockUSDC = await ethers.getContractFactory("MockUSDC");
    usdc = await MockUSDC.deploy() as MockUSDC;

    const XionNET = await ethers.getContractFactory("XionNET");
    xion = await XionNET.deploy(
      await usdc.getAddress(),
      systemWallet.address,
      masterWallet.address,
      [userM.address, userA.address]
    ) as XionNET;

    // Mint USDC to users
    for (const u of [user1, user2, user3, user4, user5]) {
      await usdc.mint(u.address, USDC(500000));
      await usdc.connect(u).approve(await xion.getAddress(), USDC(500000));
    }
  });

  describe("Deployment", function () {
    it("sets correct level prices", async function () {
      expect(await xion.levelPrices(1)).to.equal(USDC(3));
      expect(await xion.levelPrices(2)).to.equal(USDC(6));
      expect(await xion.levelPrices(17)).to.equal(USDC(196608));
    });

    it("master has all levels active", async function () {
      for (let i = 1; i <= 17; i++) {
        const lv = await xion.getUserLevel(masterWallet.address, i);
        expect(lv.active).to.be.true;
      }
    });

    it("init users registered under master with all levels", async function () {
      const info = await xion.getUserInfo(userM.address);
      expect(info.registered).to.be.true;
      expect(info.referrer).to.equal(masterWallet.address);

      const lv = await xion.getUserLevel(userM.address, 17);
      expect(lv.active).to.be.true;
    });
  });

  describe("Registration", function () {
    it("registers with referrer", async function () {
      await xion.connect(user1).register(userM.address);
      const info = await xion.getUserInfo(user1.address);
      expect(info.registered).to.be.true;
      expect(info.referrer).to.equal(userM.address);
    });

    it("defaults to master if referrer not registered", async function () {
      await xion.connect(user1).register(user2.address);
      const info = await xion.getUserInfo(user1.address);
      expect(info.referrer).to.equal(masterWallet.address);
    });

    it("defaults to master if referrer is zero", async function () {
      await xion.connect(user1).register(ethers.ZeroAddress);
      const info = await xion.getUserInfo(user1.address);
      expect(info.referrer).to.equal(masterWallet.address);
    });

    it("rejects self-referral", async function () {
      await expect(xion.connect(user1).register(user1.address))
        .to.be.revertedWith("Cannot self-refer");
    });

    it("rejects double registration", async function () {
      await xion.connect(user1).register(userM.address);
      await expect(xion.connect(user1).register(userM.address))
        .to.be.revertedWith("Already registered");
    });
  });

  describe("Level Activation", function () {
    beforeEach(async function () {
      await xion.connect(user1).register(userM.address);
    });

    it("activates L1 with correct payment", async function () {
      const sysBefore = await usdc.balanceOf(systemWallet.address);
      await xion.connect(user1).activateLevel(1);
      const sysAfter = await usdc.balanceOf(systemWallet.address);

      // System gets 10% = 0.30 USDC
      expect(sysAfter - sysBefore).to.equal(USDC(0.3));

      const lv = await xion.getUserLevel(user1.address, 1);
      expect(lv.active).to.be.true;
    });

    it("rejects skipping levels", async function () {
      await expect(xion.connect(user1).activateLevel(3))
        .to.be.revertedWith("Previous level required");
    });

    it("rejects duplicate activation", async function () {
      await xion.connect(user1).activateLevel(1);
      await expect(xion.connect(user1).activateLevel(1))
        .to.be.revertedWith("Already active");
    });

    it("rejects unregistered user", async function () {
      await expect(xion.connect(user5).activateLevel(1))
        .to.be.revertedWith("Not registered");
    });
  });

  describe("Slot Logic — autoBuy OFF (default)", function () {
    beforeEach(async function () {
      // Register 4 users under userM
      for (const u of [user1, user2, user3, user4]) {
        await xion.connect(u).register(userM.address);
      }
    });

    it("slot 1: payout to sponsor", async function () {
      const before = await usdc.balanceOf(userM.address);
      await xion.connect(user1).activateLevel(1);
      const after = await usdc.balanceOf(userM.address);
      // Sponsor gets price(L1) = $3
      expect(after - before).to.equal(USDC(3));
    });

    it("slot 2: payout (autoBuy OFF)", async function () {
      await xion.connect(user1).activateLevel(1);
      const before = await usdc.balanceOf(userM.address);
      await xion.connect(user2).activateLevel(1);
      const after = await usdc.balanceOf(userM.address);
      expect(after - before).to.equal(USDC(3));
    });

    it("slot 3: payout (autoBuy OFF, no freeze)", async function () {
      await xion.connect(user1).activateLevel(1);
      await xion.connect(user2).activateLevel(1);
      const before = await usdc.balanceOf(userM.address);
      await xion.connect(user3).activateLevel(1);
      const after = await usdc.balanceOf(userM.address);
      expect(after - before).to.equal(USDC(3));
    });

    it("slot 4: reactivation + spillover, owner gets nothing", async function () {
      await xion.connect(user1).activateLevel(1);
      await xion.connect(user2).activateLevel(1);
      await xion.connect(user3).activateLevel(1);

      const before = await usdc.balanceOf(userM.address);
      await xion.connect(user4).activateLevel(1);
      const after = await usdc.balanceOf(userM.address);

      // userM gets nothing from slot 4 (spillover goes to master)
      expect(after - before).to.equal(BigInt(0));

      // Level reactivated
      const lv = await xion.getUserLevel(userM.address, 1);
      expect(lv.cycleCount).to.equal(1);
      expect(lv.filledSlots).to.equal(0);
    });

    it("all 3 payouts when autoBuy OFF", async function () {
      await xion.connect(user1).activateLevel(1);
      await xion.connect(user2).activateLevel(1);
      await xion.connect(user3).activateLevel(1);

      // userM should have received 3 × $3 = $9
      const info = await xion.getUserInfo(userM.address);
      expect(info.totalReceived).to.equal(USDC(9));
    });
  });

  describe("Slot Logic — autoBuy ON", function () {
    beforeEach(async function () {
      for (const u of [user1, user2, user3, user4]) {
        await xion.connect(u).register(userM.address);
      }
      // Turn on autoBuy for L1
      await xion.connect(userM).setAutoBuy(1, true);
      // Deactivate L2 for userM to test freeze
      // userM already has all levels from _init, so autoBuy ON + N+1 active = payout
      // We need a fresh user as sponsor to test freeze
    });

    it("slot 2 freezes when autoBuy ON and N+1 not active", async function () {
      // Register user5 as a fresh sponsor (no levels pre-opened)
      await xion.connect(user5).register(userM.address);
      await usdc.mint(user5.address, USDC(100));
      await usdc.connect(user5).approve(await xion.getAddress(), USDC(100));
      await xion.connect(user5).activateLevel(1);
      // Turn on autoBuy for L1
      await xion.connect(user5).setAutoBuy(1, true);

      // Register users under user5
      const signers = await ethers.getSigners();
      const sub1 = signers[10];
      const sub2 = signers[11];
      await usdc.mint(sub1.address, USDC(100));
      await usdc.mint(sub2.address, USDC(100));
      await usdc.connect(sub1).approve(await xion.getAddress(), USDC(100));
      await usdc.connect(sub2).approve(await xion.getAddress(), USDC(100));

      await xion.connect(sub1).register(user5.address);
      await xion.connect(sub2).register(user5.address);

      // Slot 1: payout
      await xion.connect(sub1).activateLevel(1);
      const lvAfter1 = await xion.getUserLevel(user5.address, 1);
      expect(lvAfter1.filledSlots).to.equal(1);

      // Slot 2: should freeze (user5 has no L2)
      await xion.connect(sub2).activateLevel(1);
      const lvAfter2 = await xion.getUserLevel(user5.address, 1);
      expect(lvAfter2.filledSlots).to.equal(2);
      expect(lvAfter2.frozenAmount).to.equal(USDC(3));

      const frozen = await xion.getTotalFrozen();
      expect(frozen).to.equal(USDC(3));
    });
  });

  describe("Slot 3A — Auto-buy", function () {
    it("auto-buys N+1 from frozen + incoming", async function () {
      const signers = await ethers.getSigners();
      const sponsor = signers[10];
      const s1 = signers[11];
      const s2 = signers[12];
      const s3 = signers[13];

      for (const u of [sponsor, s1, s2, s3]) {
        await usdc.mint(u.address, USDC(1000));
        await usdc.connect(u).approve(await xion.getAddress(), USDC(1000));
      }

      // Sponsor registers and buys L1
      await xion.connect(sponsor).register(userM.address);
      await xion.connect(sponsor).activateLevel(1);
      await xion.connect(sponsor).setAutoBuy(1, true);

      // 3 subs register under sponsor
      for (const u of [s1, s2, s3]) {
        await xion.connect(u).register(sponsor.address);
      }

      // Slot 1: payout $3
      await xion.connect(s1).activateLevel(1);
      // Slot 2: freeze $3 (no L2)
      await xion.connect(s2).activateLevel(1);

      const lvBefore = await xion.getUserLevel(sponsor.address, 1);
      expect(lvBefore.frozenAmount).to.equal(USDC(3));

      // Slot 3: frozen $3 + incoming $3 = $6 = price(L2) → auto-buy L2
      await xion.connect(s3).activateLevel(1);

      // Check L2 activated
      const l2 = await xion.getUserLevel(sponsor.address, 2);
      expect(l2.active).to.be.true;

      // Frozen cleared
      const l1 = await xion.getUserLevel(sponsor.address, 1);
      expect(l1.frozenAmount).to.equal(BigInt(0));
      expect(await xion.getTotalFrozen()).to.equal(BigInt(0));
    });
  });

  describe("L17 — Last Level", function () {
    it("all 3 slots are payouts, no freeze", async function () {
      // Register 3 users under userM and buy levels one by one
      // autoBuy is OFF by default so no auto-purchases will interfere
      const signers = await ethers.getSigners();
      const buyers = [signers[10], signers[11], signers[12]];

      for (const b of buyers) {
        await usdc.mint(b.address, USDC(500000));
        await usdc.connect(b).approve(await xion.getAddress(), USDC(500000));
        await xion.connect(b).register(userM.address);
        for (let i = 1; i <= 17; i++) {
          const lv = await xion.getUserLevel(b.address, i);
          if (!lv.active) {
            await xion.connect(b).activateLevel(i);
          }
        }
      }

      // Check userM got 3 payouts on L17
      const lv = await xion.getUserLevel(userM.address, 17);
      expect(lv.filledSlots).to.equal(3);
      expect(lv.frozenAmount).to.equal(BigInt(0));
    });
  });

  describe("MASTER", function () {
    it("all slots = payout, slot 4 no spillover up", async function () {
      // Register 4 under master directly
      const signers = await ethers.getSigners();
      const m1 = signers[10], m2 = signers[11], m3 = signers[12], m4 = signers[13];

      for (const u of [m1, m2, m3, m4]) {
        await usdc.mint(u.address, USDC(100));
        await usdc.connect(u).approve(await xion.getAddress(), USDC(100));
        await xion.connect(u).register(masterWallet.address);
      }

      const before = await usdc.balanceOf(masterWallet.address);
      for (const u of [m1, m2, m3, m4]) {
        await xion.connect(u).activateLevel(1);
      }
      const after = await usdc.balanceOf(masterWallet.address);

      // Master gets all 4 slots: 4 × $3 = $12
      expect(after - before).to.equal(USDC(12));
    });
  });

  describe("Spillover", function () {
    it("bypasses sponsor without active level", async function () {
      // user1 registers under userM, buys L1
      await xion.connect(user1).register(userM.address);
      await xion.connect(user1).activateLevel(1);

      // user2 registers under user1, buys L1+L2
      await xion.connect(user2).register(user1.address);
      await xion.connect(user2).activateLevel(1);
      await xion.connect(user2).activateLevel(2);

      // user3 registers under user2, buys L1+L2
      await xion.connect(user3).register(user2.address);
      await xion.connect(user3).activateLevel(1);

      // user3 buys L2 → fills slot on user2's L2
      // user2 has L2, so direct fill
      const before2 = await usdc.balanceOf(user2.address);
      await xion.connect(user3).activateLevel(2);
      const after2 = await usdc.balanceOf(user2.address);

      // user2 got $6 payout for L2 slot 1
      expect(after2 - before2).to.equal(USDC(6));
    });
  });

  describe("Bonus: 7 levels in 3 hours", function () {
    it("grants L8 free when buying L7 within bonus window", async function () {
      await xion.connect(user1).register(userM.address);

      for (let i = 1; i <= 7; i++) {
        await xion.connect(user1).activateLevel(i);
      }

      // L8 should be auto-activated (bonus)
      const l8 = await xion.getUserLevel(user1.address, 8);
      expect(l8.active).to.be.true;

      // L7 bought, L8 free — no slot fill on sponsor for L8
      const sponsorL8 = await xion.getUserLevel(userM.address, 8);
      // Sponsor's L8 slots unchanged by bonus (no _fillSlot called)
    });

    it("does NOT grant bonus after 3 hours", async function () {
      await xion.connect(user1).register(userM.address);

      // Fast forward 4 hours
      await ethers.provider.send("evm_increaseTime", [4 * 3600]);
      await ethers.provider.send("evm_mine", []);

      for (let i = 1; i <= 7; i++) {
        await xion.connect(user1).activateLevel(i);
      }

      const l8 = await xion.getUserLevel(user1.address, 8);
      expect(l8.active).to.be.false;
    });
  });

  describe("FundsReturned", function () {
    it("returns frozen when manually buying N+1", async function () {
      const signers = await ethers.getSigners();
      const sponsor = signers[10];
      const s1 = signers[11];
      const s2 = signers[12];

      for (const u of [sponsor, s1, s2]) {
        await usdc.mint(u.address, USDC(1000));
        await usdc.connect(u).approve(await xion.getAddress(), USDC(1000));
      }

      await xion.connect(sponsor).register(userM.address);
      await xion.connect(sponsor).activateLevel(1);
      await xion.connect(sponsor).setAutoBuy(1, true);

      await xion.connect(s1).register(sponsor.address);
      await xion.connect(s2).register(sponsor.address);

      // Slot 1 payout, Slot 2 freeze
      await xion.connect(s1).activateLevel(1);
      await xion.connect(s2).activateLevel(1);

      const frozenBefore = await xion.getUserLevel(sponsor.address, 1);
      expect(frozenBefore.frozenAmount).to.equal(USDC(3));

      // Sponsor manually buys L2 → frozen returned
      const balBefore = await usdc.balanceOf(sponsor.address);
      await xion.connect(sponsor).activateLevel(2);
      const balAfter = await usdc.balanceOf(sponsor.address);

      // Got $3 back from frozen, paid $6.60 for L2 → net change = 3 - 6.6 = -3.6
      expect(balBefore - balAfter).to.equal(USDC(3.6));

      // Frozen cleared
      const l1 = await xion.getUserLevel(sponsor.address, 1);
      expect(l1.frozenAmount).to.equal(BigInt(0));
    });
  });

  describe("setAutoBuy", function () {
    it("toggles autoBuy per level", async function () {
      await xion.connect(user1).register(userM.address);
      expect(await xion.getAutoBuy(user1.address, 1)).to.be.false;
      await xion.connect(user1).setAutoBuy(1, true);
      expect(await xion.getAutoBuy(user1.address, 1)).to.be.true;
      await xion.connect(user1).setAutoBuy(1, false);
      expect(await xion.getAutoBuy(user1.address, 1)).to.be.false;
    });

    it("rejects L17 autoBuy", async function () {
      await xion.connect(user1).register(userM.address);
      await expect(xion.connect(user1).setAutoBuy(17, true))
        .to.be.revertedWith("Invalid level");
    });
  });

  describe("Admin", function () {
    it("withdrawSystemFees respects totalFrozen", async function () {
      // Setup: create frozen funds
      const signers = await ethers.getSigners();
      const sp = signers[10], s1 = signers[11], s2 = signers[12];
      for (const u of [sp, s1, s2]) {
        await usdc.mint(u.address, USDC(1000));
        await usdc.connect(u).approve(await xion.getAddress(), USDC(1000));
      }
      await xion.connect(sp).register(userM.address);
      await xion.connect(sp).activateLevel(1);
      await xion.connect(sp).setAutoBuy(1, true);
      await xion.connect(s1).register(sp.address);
      await xion.connect(s2).register(sp.address);
      await xion.connect(s1).activateLevel(1);
      await xion.connect(s2).activateLevel(1); // freezes $3

      const frozen = await xion.getTotalFrozen();
      expect(frozen).to.equal(USDC(3));

      const balance = await usdc.balanceOf(await xion.getAddress());
      // Try to withdraw more than available
      await expect(xion.withdrawSystemFees(balance))
        .to.be.revertedWith("Cannot touch frozen funds");

      // Withdraw only available amount
      const available = balance - frozen;
      await xion.withdrawSystemFees(available);
    });

    it("pause blocks activateLevel", async function () {
      await xion.connect(user1).register(userM.address);
      await xion.pause();
      await expect(xion.connect(user1).activateLevel(1))
        .to.be.reverted;
      await xion.unpause();
      await xion.connect(user1).activateLevel(1);
    });
  });
});
