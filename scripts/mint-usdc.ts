import { ethers } from "hardhat";

async function main() {
  const usdc = await ethers.getContractAt("MockUSDC", "0xba7e3dF16aA202ab0A0d0DE982b8D240E1d3e54E");
  const mint = ethers.parseUnits("100000", 6);

  const wallets = [
    ["WalletM", "0x8fE850E28575686aB0Fcd9ef44c103Da1A7b39aF"],
    ["WalletA", "0x6cC9A6ff1DFE14D02426F1C8Da3648612BE26c65"],
    ["Owner",   "0xE4c41b544acafF7d6a6f8441690841935Ccc8038"],
  ];

  for (const [name, addr] of wallets) {
    const tx = await usdc.mint(addr, mint);
    await tx.wait();
    console.log(`${name} (${addr}): +$100,000 USDC`);
  }

  console.log("\n✅ All wallets funded with test USDC");
}

main().catch(console.error);
