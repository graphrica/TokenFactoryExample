import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    localhost: {
      url: "http://localhost:8545",
      /*
        notice no env vars here? it will just use account 0 of the hardhat node to deploy
        (you can put in a mnemonic here to set the deployer locally)
      */
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/a4905e3b34cc498aa5a839bbcf49b8f2`,
      accounts: [`ADD PRIVATE KEY HERE`],
    },
  }
};

export default config;
