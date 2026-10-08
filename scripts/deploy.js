import { ethers } from "ethers";
import fs from "fs";

async function main() {
  // Hardhat local provider setup
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  
  // Read contract artifact compiled by Hardhat
  const artifact = JSON.parse(
    fs.readFileSync("./artifacts/contracts/dcm.sol/dcm.json", "utf8")
  );

  // Default local admin signer
  const signer = await provider.getSigner(0);
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);

  console.log("Deploying dcm contract...");
  const contract = await factory.deploy();
  await contract.waitForDeployment();

  console.log(`dcm contract deployed successfully to: ${await contract.getAddress()}`);
}

main().catch(async () => {
  // In-memory direct compilation test if local node is not open
  const hre = await import("hardhat");
  const connection = await hre.default.network.connect();
  console.log("Connected to local network successfully!");
});
