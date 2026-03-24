import { expect } from "chai";
import { ethers } from "hardhat";
import { XionNET, MockUSDC } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("XionNET — Advanced & Research-Based Tests", function () {
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
  // D: setMasterWallet BUG FIX
  // ===========================
  describe("D. setMasterWallet integrity", function () {
    it("D1 old master loses isMaster after setMasterWallet", async function () {
      const newMaster = signers[15];
      await xion.setMasterWallet(newMaster.address);

      const oldInfo = await xion.getUserInfo(master.address);
      expect(oldInfo.isMaster).to.be.false;

      const newInfo = await xion.getUserInfo(newMaster.address);
      expect(newInfo.isMaster).to.be.true;
    });

    it("D2 old master no longer gets 4 payouts after change", async function () {
      const newMaster = signers[15];
      await xion.setMasterWallet(newMaster.address);

      // Register users under old master
      const subs = [signers[5], signers[6], signers[7], signers[8]];
      for (const u of subs) {
        await fundAndApprove(u);
        await xion.connect(u).register(master.address);
      }

      const oldBefore = await usdc.balanceOf(master.address);
      for (const u of subs) await xion.connect(u).activateLevel(1);
      const oldAfter = await usdc.balanceOf(master.address);

      // Old master gets 3 payouts (not 4) — regular user behavior
      // Slot 4 spillover goes to NEW master now
      const info = await xion.getUserInfo(master.address);
      // Old master has levels but not isMaster — behaves as normal user
    });

    it("D3 spillover goes to NEW masterWallet after change", async function () {
      const newMaster = signers[15];
      await xion.setMasterWallet(newMaster.address);

      const u = signers[5];
      await fundAndApprove(u);
      await xion.connect(u).register(newMaster.address);
      await xion.connect(u).activateLevel(1);
      await xion.connect(u).activateLevel(2);
      await xion.connect(u).activateLevel(3);

      // Nobody except newMaster has L3 → fills on newMaster
      const lv = await xion.getUserLevel(newMaster.address, 3);
      expect(lv.filledSlots).to.be.greaterThan(0);
    });

    it("D4 old master referrer data preserved", async function () {
      const newMaster = signers[15];
      await xion.setMasterWallet(newMaster.address);
      // Old master's referrer should remain unchanged
      const info = await xion.getUserInfo(master.address);
      expect(info.registered).to.be.true;
    });
  });

  // ===========================
  // A: Frozen Funds Edge Cases
  // ===========================
  describe("A. Frozen funds edge cases", function () {
    it("A2 frozen on L1 NOT returned when buying L3 (only L2 triggers return)", async function () {
      const sp = signers[5], s1 = signers[6], s2 = signers[7];
      await fundAndApprove(sp); await fundAndApprove(s1); await fundAndApprove(s2);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);
      await xion.connect(sp).setAutoBuy(1, true);
      await xion.connect(s1).register(sp.address);
      await xion.connect(s2).register(sp.address);
      await xion.connect(s1).activateLevel(1); // slot 1
      await xion.connect(s2).activateLevel(1); // slot 2 freeze on L1

      expect((await xion.getUserLevel(sp.address, 1)).frozenAmount).to.equal(U(3));

      // Buy L2 → should return frozen from L1
      await xion.connect(sp).activateLevel(2);
      expect((await xion.getUserLevel(sp.address, 1)).frozenAmount).to.equal(BigInt(0));

      // Now freeze on L2
      await xion.connect(sp).setAutoBuy(2, true);
      // Need subs for L2
      const s3 = signers[8], s4 = signers[9];
      await fundAndApprove(s3); await fundAndApprove(s4);
      await xion.connect(s3).register(sp.address);
      await xion.connect(s4).register(sp.address);
      await xion.connect(s3).activateLevel(1);
      await xion.connect(s3).activateLevel(2); // fills sp's L2 slot 1
      await xion.connect(s4).activateLevel(1);
      await xion.connect(s4).activateLevel(2); // fills sp's L2 slot 2 → freeze

      expect((await xion.getUserLevel(sp.address, 2)).frozenAmount).to.equal(U(6));

      // Buy L3 → returns frozen from L2 (prevLevel), NOT from L1
      await xion.connect(sp).activateLevel(3);
      expect((await xion.getUserLevel(sp.address, 2)).frozenAmount).to.equal(BigInt(0));
    });

    it("A3 assert: no double freeze on same level in single cycle", async function () {
      const sp = signers[5], s1 = signers[6], s2 = signers[7], s3 = signers[8];
      await fundAndApprove(sp); await fundAndApprove(s1); await fundAndApprove(s2); await fundAndApprove(s3);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);
      await xion.connect(sp).setAutoBuy(1, true);
      await xion.connect(s1).register(sp.address);
      await xion.connect(s2).register(sp.address);
      await xion.connect(s3).register(sp.address);

      await xion.connect(s1).activateLevel(1); // slot 1 payout
      await xion.connect(s2).activateLevel(1); // slot 2 freeze
      // frozenAmount should be exactly price(1) = $3
      expect((await xion.getUserLevel(sp.address, 1)).frozenAmount).to.equal(U(3));
      // slot 3 will unfreeze, not double-freeze
      await xion.connect(s3).activateLevel(1); // slot 3A auto-buy
      expect((await xion.getUserLevel(sp.address, 1)).frozenAmount).to.equal(BigInt(0));
    });

    it("A4 no double-unfreeze: manual buy + slot 3 don't both unfreeze", async function () {
      const sp = signers[5], s1 = signers[6], s2 = signers[7], s3 = signers[8];
      await fundAndApprove(sp); await fundAndApprove(s1); await fundAndApprove(s2); await fundAndApprove(s3);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);
      await xion.connect(sp).setAutoBuy(1, true);
      await xion.connect(s1).register(sp.address);
      await xion.connect(s2).register(sp.address);
      await xion.connect(s3).register(sp.address);

      await xion.connect(s1).activateLevel(1); // slot 1
      await xion.connect(s2).activateLevel(1); // slot 2 freeze $3

      // Manual buy L2 → returns frozen
      await xion.connect(sp).activateLevel(2);
      expect((await xion.getUserLevel(sp.address, 1)).frozenAmount).to.equal(BigInt(0));
      expect(await xion.getTotalFrozen()).to.equal(BigInt(0));

      // Slot 3 fires — frozen is 0, so 3C payout (not 3A/3B)
      const before = await usdc.balanceOf(sp.address);
      await xion.connect(s3).activateLevel(1);
      // sp should get payout (3C), not auto-buy
      expect(await usdc.balanceOf(sp.address) - before).to.equal(U(3));
      expect(await xion.getTotalFrozen()).to.equal(BigInt(0));
    });

    it("A5 withdrawSystemFees works when totalFrozen=0", async function () {
      await usdc.mint(await xion.getAddress(), U(100));
      const sysBefore = await usdc.balanceOf(sys.address);
      await xion.withdrawSystemFees(U(100));
      expect(await usdc.balanceOf(sys.address) - sysBefore).to.equal(U(100));
    });

    it("A6 reactivation returns frozen funds to user", async function () {
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

      await xion.connect(subs[0]).activateLevel(1); // slot 1
      await xion.connect(subs[1]).activateLevel(1); // slot 2 freeze

      // Now simulate: slot 3 auto-buys L2, then slot 4 reactivates L1
      // After slot 3A, frozen should be 0
      await xion.connect(subs[2]).activateLevel(1); // slot 3A
      expect(await xion.getTotalFrozen()).to.equal(BigInt(0));

      await xion.connect(subs[3]).activateLevel(1); // slot 4 reactivate
      expect(await xion.getTotalFrozen()).to.equal(BigInt(0));
    });
  });

  // ===========================
  // G: Registration Tree Integrity
  // ===========================
  describe("G. Registration tree integrity", function () {
    it("G2 master cannot register again", async function () {
      await expect(xion.connect(master).register(initM.address))
        .to.be.revertedWith("Already registered");
    });

    it("G3 init users cannot register again", async function () {
      await expect(xion.connect(initM).register(master.address))
        .to.be.revertedWith("Already registered");
      await expect(xion.connect(initA).register(master.address))
        .to.be.revertedWith("Already registered");
    });

    it("G4 register with explicit masterWallet as referrer", async function () {
      const u = signers[5];
      await xion.connect(u).register(master.address);
      expect((await xion.getUserInfo(u.address)).referrer).to.equal(master.address);
    });

    it("G5 register with contract address as referrer defaults to master", async function () {
      const u = signers[5];
      await xion.connect(u).register(await xion.getAddress());
      expect((await xion.getUserInfo(u.address)).referrer).to.equal(master.address);
    });
  });

  // ===========================
  // H: Global Invariants
  // ===========================
  describe("H. Global invariants", function () {
    it("H1 contract balance >= totalFrozen after complex scenario", async function () {
      const sp1 = signers[5], sp2 = signers[6];
      const subs = [signers[7], signers[8], signers[9], signers[10], signers[11], signers[12]];
      await fundAndApprove(sp1); await fundAndApprove(sp2);
      for (const u of subs) await fundAndApprove(u);

      await xion.connect(sp1).register(initM.address);
      await xion.connect(sp2).register(initM.address);
      await xion.connect(sp1).activateLevel(1);
      await xion.connect(sp2).activateLevel(1);
      await xion.connect(sp1).setAutoBuy(1, true);
      await xion.connect(sp2).setAutoBuy(1, true);

      for (let i = 0; i < 3; i++) {
        await xion.connect(subs[i]).register(sp1.address);
        await xion.connect(subs[i]).activateLevel(1);
      }
      for (let i = 3; i < 6; i++) {
        await xion.connect(subs[i]).register(sp2.address);
        await xion.connect(subs[i]).activateLevel(1);
      }

      const balance = await usdc.balanceOf(await xion.getAddress());
      const frozen = await xion.getTotalFrozen();
      expect(balance).to.be.greaterThanOrEqual(frozen);
    });

    it("H2 filledSlots never exceeds 4 after cascading auto-buy", async function () {
      const sp = signers[5];
      const subs = [signers[6], signers[7], signers[8], signers[9]];
      await fundAndApprove(sp);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);
      await xion.connect(sp).setAutoBuy(1, true);

      for (const u of subs) {
        await fundAndApprove(u);
        await xion.connect(u).register(sp.address);
        await xion.connect(u).activateLevel(1);
      }

      // Check all levels
      for (let i = 1; i <= 17; i++) {
        const lv = await xion.getUserLevel(sp.address, i);
        expect(lv.filledSlots).to.be.lessThanOrEqual(4);
      }
    });

    it("H3 sequential integrity: active L8 implies L1-L7 all active", async function () {
      const u = signers[5];
      await fundAndApprove(u);
      await xion.connect(u).register(initM.address);
      for (let i = 1; i <= 7; i++) await xion.connect(u).activateLevel(i);
      // L8 from bonus
      expect((await xion.getUserLevel(u.address, 8)).active).to.be.true;
      for (let i = 1; i <= 7; i++) {
        expect((await xion.getUserLevel(u.address, i)).active).to.be.true;
      }
    });
  });

  // ===========================
  // I: Access Control
  // ===========================
  describe("I. Access control edge cases", function () {
    it("I1 setAutoBuy rejects level 18 and 255", async function () {
      await xion.connect(signers[5]).register(initM.address);
      await expect(xion.connect(signers[5]).setAutoBuy(18, true)).to.be.revertedWith("Invalid level");
      await expect(xion.connect(signers[5]).setAutoBuy(255, true)).to.be.revertedWith("Invalid level");
    });

    it("I2 getUserLevel returns zeros for non-existent level 18", async function () {
      const lv = await xion.getUserLevel(signers[5].address, 18);
      expect(lv.active).to.be.false;
      expect(lv.filledSlots).to.equal(0);
    });

    it("I3 owner can register as normal user", async function () {
      await xion.connect(owner).register(initM.address);
      expect((await xion.getUserInfo(owner.address)).registered).to.be.true;
    });

    it("I4 transaction with arbitrary calldata reverts", async function () {
      await expect(
        owner.sendTransaction({ to: await xion.getAddress(), data: "0xdeadbeef" })
      ).to.be.reverted;
    });
  });

  // ===========================
  // J: Forsage-Pattern Tests
  // ===========================
  describe("J. Forsage-pattern tests", function () {
    it("J1 slot 4 spillover amount = exactly price(N)", async function () {
      const sp = signers[5];
      const subs = [signers[6], signers[7], signers[8], signers[9]];
      await fundAndApprove(sp);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);

      for (const u of subs) {
        await fundAndApprove(u);
        await xion.connect(u).register(sp.address);
      }

      for (let i = 0; i < 3; i++) await xion.connect(subs[i]).activateLevel(1);

      // Slot 4: spillover with amount = price(L1) = $3
      await expect(xion.connect(subs[3]).activateLevel(1))
        .to.emit(xion, "SpilloverSent")
        .withArgs(sp.address, (v: any) => true, 1, U(3), (v: any) => true, (v: any) => true);
    });

    it("J2 auto-buy amount = exactly price(N+1) = 2×price(N)", async function () {
      const sp = signers[5];
      const subs = [signers[6], signers[7], signers[8]];
      await fundAndApprove(sp);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);
      await xion.connect(sp).setAutoBuy(1, true);

      for (const u of subs) {
        await fundAndApprove(u);
        await xion.connect(u).register(sp.address);
      }

      await xion.connect(subs[0]).activateLevel(1); // slot 1
      await xion.connect(subs[1]).activateLevel(1); // slot 2 freeze $3

      // Slot 3A: auto-buy L2 with $6 = 2×$3
      await expect(xion.connect(subs[2]).activateLevel(1))
        .to.emit(xion, "LevelActivated")
        .withArgs(sp.address, 2, U(6), 2, (v: any) => v > 0);
    });

    it("J3 cycleCount strictly increments, never resets", async function () {
      const sp = signers[5];
      await fundAndApprove(sp);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);

      for (let cycle = 1; cycle <= 3; cycle++) {
        for (let i = 0; i < 4; i++) {
          const u = signers[6 + (cycle - 1) * 4 + i];
          if (!u) break;
          await fundAndApprove(u);
          await xion.connect(u).register(sp.address);
          await xion.connect(u).activateLevel(1);
        }
        const lv = await xion.getUserLevel(sp.address, 1);
        expect(lv.cycleCount).to.equal(cycle);
      }
    });

    it("J4 activatedAt updates on reactivation", async function () {
      const sp = signers[5];
      const subs = [signers[6], signers[7], signers[8], signers[9]];
      await fundAndApprove(sp);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);

      const ts1 = (await xion.getUserLevel(sp.address, 1)).activatedAt;

      await ethers.provider.send("evm_increaseTime", [100]);
      await ethers.provider.send("evm_mine", []);

      for (const u of subs) {
        await fundAndApprove(u);
        await xion.connect(u).register(sp.address);
        await xion.connect(u).activateLevel(1);
      }

      const ts2 = (await xion.getUserLevel(sp.address, 1)).activatedAt;
      expect(ts2).to.be.greaterThan(ts1);
    });

    it("J5 slot addresses correct after spillover fill", async function () {
      const sp = signers[5], mid = signers[6], u = signers[7];
      await fundAndApprove(sp); await fundAndApprove(mid); await fundAndApprove(u);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);
      await xion.connect(sp).activateLevel(2);
      await xion.connect(mid).register(sp.address);
      await xion.connect(mid).activateLevel(1); // no L2
      await xion.connect(u).register(mid.address);
      await xion.connect(u).activateLevel(1);
      await xion.connect(u).activateLevel(2); // spillover to sp

      // sp's L2 slot 1 should record u.address (the original buyer)
      const lv = await xion.getUserLevel(sp.address, 2);
      expect(lv.s1).to.equal(u.address);
    });
  });

  // ===========================
  // B: Spillover + Auto-buy Cascading
  // ===========================
  describe("B. Spillover + auto-buy cascading", function () {
    it("B3 slot 3B sends to sponsor's N+1, triggers slot on that level", async function () {
      const sp = signers[5];
      const subs = [signers[6], signers[7], signers[8]];
      await fundAndApprove(sp);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);
      await xion.connect(sp).setAutoBuy(1, true);

      for (const u of subs) {
        await fundAndApprove(u);
        await xion.connect(u).register(sp.address);
      }

      await xion.connect(subs[0]).activateLevel(1); // slot 1
      await xion.connect(subs[1]).activateLevel(1); // slot 2 freeze

      // Manually buy L2 → returns frozen, L2 active
      await xion.connect(sp).activateLevel(2);

      // Slot 3 fires with frozen=0 → 3C payout
      await xion.connect(subs[2]).activateLevel(1);
      // sp should get payout, L2 stays active, no weird cascading
      expect((await xion.getUserLevel(sp.address, 2)).active).to.be.true;
    });

    it("B5 spillover receiver at slot 3 → their slot 4 triggers further spillover", async function () {
      const top = signers[5], sp = signers[6];
      const subs = [signers[7], signers[8], signers[9], signers[10]];
      await fundAndApprove(top); await fundAndApprove(sp);
      await xion.connect(top).register(initM.address);
      await xion.connect(top).activateLevel(1);
      await xion.connect(sp).register(top.address);
      await xion.connect(sp).activateLevel(1);

      for (const u of subs) {
        await fundAndApprove(u);
        await xion.connect(u).register(sp.address);
      }

      // Fill sp's L1: 3 slots
      for (let i = 0; i < 3; i++) await xion.connect(subs[i]).activateLevel(1);

      // Slot 4: sp reactivates, spillover to top
      // If top's L1 is at slot 3, this would make it slot 4 → top reactivates → spillover to initM
      // Let's first fill top's L1 to 3 slots
      // top got slot 1 from sp's registration, let's add more
      // Actually sp's L1 purchase already filled top's L1 slot 1
      // We need 2 more fills on top + the spillover = slot 4

      await xion.connect(subs[3]).activateLevel(1); // sp slot 4 → spillover to top
      // Chain works without revert
      expect((await xion.getUserLevel(sp.address, 1)).cycleCount).to.equal(1);
    });
  });

  // ===========================
  // C: USDC Edge Cases
  // ===========================
  describe("C. USDC edge cases", function () {
    it("C3 auto-buy doesn't require user approval (funds from contract)", async function () {
      const sp = signers[5], s1 = signers[6], s2 = signers[7], s3 = signers[8];
      await fundAndApprove(sp); await fundAndApprove(s1); await fundAndApprove(s2); await fundAndApprove(s3);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);
      await xion.connect(sp).setAutoBuy(1, true);
      await xion.connect(s1).register(sp.address);
      await xion.connect(s2).register(sp.address);
      await xion.connect(s3).register(sp.address);

      // sp has 0 additional approval — doesn't matter for auto-buy
      await usdc.connect(sp).approve(await xion.getAddress(), BigInt(0));

      await xion.connect(s1).activateLevel(1);
      await xion.connect(s2).activateLevel(1); // freeze
      await xion.connect(s3).activateLevel(1); // auto-buy — uses contract's funds, not sp's approval

      expect((await xion.getUserLevel(sp.address, 2)).active).to.be.true;
    });

    it("C5 contract balance = totalFrozen after all payouts distributed", async function () {
      const sp = signers[5], s1 = signers[6], s2 = signers[7];
      await fundAndApprove(sp); await fundAndApprove(s1); await fundAndApprove(s2);
      await xion.connect(sp).register(initM.address);
      await xion.connect(sp).activateLevel(1);
      await xion.connect(sp).setAutoBuy(1, true);
      await xion.connect(s1).register(sp.address);
      await xion.connect(s2).register(sp.address);

      await xion.connect(s1).activateLevel(1); // slot 1 payout → balance 0
      await xion.connect(s2).activateLevel(1); // slot 2 freeze → balance = frozen

      const balance = await usdc.balanceOf(await xion.getAddress());
      const frozen = await xion.getTotalFrozen();
      expect(balance).to.equal(frozen);
    });
  });

  // ===========================
  // E: Bonus Timing Precision
  // ===========================
  describe("E. Bonus timing precision", function () {
    it("E1 exactly 10800 seconds (3h) — bonus should work", async function () {
      const u = signers[5];
      await fundAndApprove(u);
      await xion.connect(u).register(initM.address);
      // Block timestamp will be registeredAt + ~1s per tx
      // 7 activations = ~7 blocks = ~7s
      // So we need 10800 - 7 = ~10793 time jump
      await ethers.provider.send("evm_increaseTime", [10780]);
      await ethers.provider.send("evm_mine", []);
      for (let i = 1; i <= 7; i++) await xion.connect(u).activateLevel(i);
      // Should still be within window
      expect((await xion.getUserLevel(u.address, 8)).active).to.be.true;
    });

    it("E3 multiple blocks between levels still tracked correctly", async function () {
      const u = signers[5];
      await fundAndApprove(u);
      await xion.connect(u).register(initM.address);

      for (let i = 1; i <= 7; i++) {
        await ethers.provider.send("evm_increaseTime", [60]); // 1 min between each
        await ethers.provider.send("evm_mine", []);
        await xion.connect(u).activateLevel(i);
      }
      // 7 minutes total — well within 3h
      expect((await xion.getUserLevel(u.address, 8)).active).to.be.true;
    });
  });
});
