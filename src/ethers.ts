import { ethers } from "ethers";
import { config } from "./config";
import MoodRecommender from "../artifacts/contracts/MoodRecommender.sol/MoodRecommender.json";

let provider: ethers.JsonRpcProvider;
let wallet: ethers.Wallet;
let contract: ethers.Contract;

/**
 * Initializes the connection to the blockchain.
 */
function getProvider(): ethers.JsonRpcProvider {
  if (!provider) {
    provider = new ethers.JsonRpcProvider(config.network.rpcUrl);
  }
  return provider;
}

function getWallet(): ethers.Wallet {
  if (!wallet) {
    wallet = new ethers.Wallet(
      config.wallet.privateKey as string,
      getProvider()
    );
  }
  return wallet;
}

export function getContract(): ethers.Contract {
  if (!contract) {
    if (!config.contract.address) {
      throw new Error(
        "Contract address is not set in the .env file. Please deploy the contract first."
      );
    }
    contract = new ethers.Contract(
      config.contract.address,
      MoodRecommender.abi,
      getWallet()
    );
  }
  return contract;
}
