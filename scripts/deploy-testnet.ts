import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);
  console.log("Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH");

  // 1. Deploy MockUSDC
  console.log("\n1. Deploying MockUSDC...");
  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const usdc = await MockUSDC.deploy();
  await usdc.waitForDeployment();
  const usdcAddr = await usdc.getAddress();
  console.log("   MockUSDC:", usdcAddr);

  // 2. Deploy XionNET
  const SYSTEM = "0x48baFBeb829a6D5ea42f5BC80433bCC72E076021";
  const MASTER = "0x07D7D2F65e01ec2B3ce97F58ED557830d46439BC";
  const WM     = "0x8fE850E28575686aB0Fcd9ef44c103Da1A7b39aF";
  const WA     = "0x6cC9A6ff1DFE14D02426F1C8Da3648612BE26c65";

  console.log("\n2. Deploying XionNET...");
  const XionNET = await ethers.getContractFactory("XionNET");
  const xion = await XionNET.deploy(usdcAddr, SYSTEM, MASTER, [WM, WA]);
  await xion.waitForDeployment();
  const xionAddr = await xion.getAddress();
  console.log("   XionNET:", xionAddr);

  // 3. Mint test USDC to all wallets
  console.log("\n3. Minting test USDC...");
  const mintAmount = ethers.parseUnits("100000", 6); // $100k each
  for (const [name, addr] of [["Master", MASTER], ["WalletM", WM], ["WalletA", WA], ["Owner", deployer.address]]) {
    await usdc.mint(addr, mintAmount);
    console.log(`   ${name} (${addr}): +$100,000 USDC`);
  }

  // Summary
  console.log("\n========================================");
  console.log("✅ DEPLOYMENT COMPLETE");
  console.log("========================================");
  console.log("MockUSDC:", usdcAddr);
  console.log("XionNET: ", xionAddr);
  console.log("Network: ", (await ethers.provider.getNetwork()).name);
  console.log("Owner:   ", deployer.address);
  console.log("System:  ", SYSTEM);
  console.log("Master:  ", MASTER);
  console.log("WalletM: ", WM);
  console.log("WalletA: ", WA);
  console.log("========================================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
