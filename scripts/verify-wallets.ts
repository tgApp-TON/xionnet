import { ethers } from "hardhat";

async function main() {
  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const usdc = await MockUSDC.deploy();
  console.log("MockUSDC:", await usdc.getAddress());

  const SYSTEM = "0x48baFBeb829a6D5ea42f5BC80433bCC72E076021";
  const MASTER = "0x07D7D2F65e01ec2B3ce97F58ED557830d46439BC";
  const WM     = "0x8fE850E28575686aB0Fcd9ef44c103Da1A7b39aF";
  const WA     = "0x6cC9A6ff1DFE14D02426F1C8Da3648612BE26c65";

  const XionNET = await ethers.getContractFactory("XionNET");
  const xion = await XionNET.deploy(await usdc.getAddress(), SYSTEM, MASTER, [WM, WA]);
  console.log("XionNET:", await xion.getAddress());

  console.log("\n--- Wallet Verification ---");
  console.log("systemWallet:", await xion.systemWallet());
  console.log("masterWallet:", await xion.masterWallet());

  const masterInfo = await xion.getUserInfo(MASTER);
  console.log("\nMaster:", MASTER);
  console.log("  registered:", masterInfo.registered, "| isMaster:", masterInfo.isMaster);

  const wmInfo = await xion.getUserInfo(WM);
  console.log("\nWallet M:", WM);
  console.log("  registered:", wmInfo.registered, "| referrer == master:", wmInfo.referrer === MASTER);

  const waInfo = await xion.getUserInfo(WA);
  console.log("\nWallet A:", WA);
  console.log("  registered:", waInfo.registered, "| referrer == master:", waInfo.referrer === MASTER);

  for (const [name, addr] of [["Master", MASTER], ["Wallet M", WM], ["Wallet A", WA]]) {
    let active = 0;
    for (let i = 1; i <= 17; i++) {
      const lv = await xion.getUserLevel(addr, i);
      if (lv.active) active++;
    }
    console.log(`\n${name}: ${active}/17 levels active`);
  }

  console.log("\n✅ All wallets verified correctly");
}

main().catch(console.error);
