import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    shimmer_testnet: {
      url: "https://json-rpc.evm.testnet.shimmer.network",
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
};

export default config;
