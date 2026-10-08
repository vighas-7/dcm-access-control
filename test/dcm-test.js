import { expect } from "chai";
import hre from "hardhat";

describe("dcm Admin Access Test", function () {
  it("Admin secret set panna mudiyum, non-admin panna fail aaganum", async function () {
    const [admin, nonAdmin] = await hre.ethers.getSigners();

    const dcm = await hre.ethers.deployContract("dcm");
    await dcm.waitForDeployment();

    // 1. Admin updates data (Success aaganum)
    await dcm.connect(admin).setSecret("TopSecret123");
    expect(await dcm.secretData()).to.equal("TopSecret123");

    // 2. Non-admin update panna try panrar (Fail aaganum)
    await expect(
      dcm.connect(nonAdmin).setSecret("HackerData")
    ).to.be.revertedWith("Not authorized: Admin only");
  });
});