import { ethers } from "hardhat";

async function main() {
  const USDC_ADDRESS    = process.env.USDC_ADDRESS || "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"; // Polygon native USDC
  const SYSTEM_WALLET   = "0x48baFBeb829a6D5ea42f5BC80433bCC72E076021";
  const MASTER_WALLET   = "0x07D7D2F65e01ec2B3ce97F58ED557830d46439BC";
  const WALLET_M        = "0x8fE850E28575686aB0Fcd9ef44c103Da1A7b39aF";
  const WALLET_A        = "0x6cC9A6ff1DFE14D02426F1C8Da3648612BE26c65";

  console.log("Deploying XionNET...");
  console.log("  USDC:     ", USDC_ADDRESS);
  console.log("  System:   ", SYSTEM_WALLET);
  console.log("  Master:   ", MASTER_WALLET);
  console.log("  Wallet M: ", WALLET_M);
  console.log("  Wallet A: ", WALLET_A);

  const XionNET = await ethers.getContractFactory("XionNET");
  const contract = await XionNET.deploy(
    USDC_ADDRESS,
    SYSTEM_WALLET,
    MASTER_WALLET,
    [WALLET_M, WALLET_A]
  );

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log("\n✅ XionNET deployed to:", address);
  console.log("\nVerify on Polygonscan:");
  console.log(`npx hardhat verify --network polygon ${address} ${USDC_ADDRESS} ${SYSTEM_WALLET} ${MASTER_WALLET} "[${WALLET_M},${WALLET_A}]"`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
