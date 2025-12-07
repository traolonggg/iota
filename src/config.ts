import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../.env") });

export const config = {
  network: {
    rpcUrl: "https://json-rpc.evm.testnet.shimmer.network",
  },
  wallet: {
    privateKey: process.env.PRIVATE_KEY,
  },
  contract: {
    address: process.env.CONTRACT_ADDRESS,
  },
  // Path to the local playlist database
  data: {
    playlistsDbPath: resolve(__dirname, "../data/playlists.json"),
  },
};

// Validate environment variables
if (!config.wallet.privateKey) {
  console.error("FATAL ERROR: PRIVATE_KEY is not set in the .env file.");
  process.exit(1);
}
