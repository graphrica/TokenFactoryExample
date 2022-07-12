import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";


describe("Token Factory", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function setupContracts() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const tokenFactoryContract = await ethers.getContractFactory("TokenFactory");
    const tokenFactory = await tokenFactoryContract.deploy();

    return { tokenFactory, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("TokenCount should be 0", async function () {
      const { tokenFactory } = await setupContracts();

      expect(await tokenFactory.totalTokenCount()).to.equal(ethers.BigNumber.from(0));
    });
  });
  describe("Create Token", function () {
    it("Should Deploy an ERC20 Token", async function () {
      const { tokenFactory, owner } = await setupContracts();

      await (await tokenFactory.connect(owner).createToken(ethers.utils.parseUnits("10000"), "TestToken", "TST")).wait();
      var tokenAddress = await tokenFactory.getTokenAddressAt(0);

      var token = await ethers.getContractAt("Token", tokenAddress);

      expect(await token.balanceOf(owner.address)).to.equal(ethers.utils.parseUnits("10000"));
    });
  });
});
