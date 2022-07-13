import { ethers } from "hardhat";

async function main() {
  const tokenFactory = await ethers.getContractFactory("TokenFactory");
  const tokenFactoryContract = await tokenFactory.deploy();

  await tokenFactoryContract.deployed();
  var tokenAddress = await (await tokenFactoryContract.createToken(
    ethers.utils.parseUnits("10000"),
    "MackMoney",
    "MACK"
  )).wait();

  console.log(
    `Contract Deployed at: ${tokenFactoryContract.address} Token Deployed at: ${tokenAddress}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
