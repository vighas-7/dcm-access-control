import { ethers } from "ethers";
import fs from "fs";

async function main() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const artifact = JSON.parse(
    fs.readFileSync("./artifacts/contracts/dcm.sol/dcm.json", "utf8")
  );

  // Signer 0 = Admin, Signer 1 = Normal Hacker/User, Signer 2 = Pudhu User
  const admin = await provider.getSigner(0);
  const hacker = await provider.getSigner(1);
  const newUser = await provider.getSigner(2);

  console.log("1. Deploying contract...");
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, admin);
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  console.log(`Contract deployed at: ${await contract.getAddress()}`);

  console.log("\n2. Admin adding new user...");
  const tx = await contract.connect(admin).addUser(newUser.address);
  await tx.wait();

  const isAdded = await contract.isUser(newUser.address);
  console.log(`User add aagitara? -> ${isAdded}`);

  console.log("\n3. Non-admin (hacker) user add panna try pandrar...");
  try {
    const failTx = await contract.connect(hacker).addUser(newUser.address);
    await failTx.wait();
    console.log("FAIL: Unauthorized person user add pannitaaru!");
  } catch (error) {
    console.log("SUCCESS: Blocked! Only admin can add users.");
  }
}

main().catch((err) => console.error(err));