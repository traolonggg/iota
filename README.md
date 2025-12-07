# On-Chain Mood-to-Music Recommender

This project is a decentralized application (dApp) that suggests music playlists to users based on their mood. The recommendation engine is powered by on-chain community statistics stored in a smart contract on the ShimmerEVM Testnet.
Contract Address
Network: Devnet
Package ID: 0x8b4f3bb8fd773e4d92957116db692844a8c057e2cd1f8d564daa6efaba084438
Explorer: View on Explorer
## Features

- **Decentralized Recommendations**: Playlist suggestions are based on what the community listens to for a given mood.
- **On-Chain Data**: All mood-to-genre statistics are stored and updated in a Solidity smart contract.
- **Extensible**: The system can be expanded with more genres and a real playlist API (e.g., Spotify).
- **Full-Stack**: Includes a smart contract, TypeScript backend/scripts, and deployment automation with Hardhat.

## How It Works

1.  **Users Submit Moods**: A user submits their current mood (e.g., "Happy") and the genre of music they are enjoying (e.g., "Pop").
2.  **On-Chain Aggregation**: The `MoodRecommender` smart contract receives this submission and increments a counter for the `"Happy" -> "Pop"` pair.
3.  **Recommendation Query**: When another user requests a recommendation for a "Happy" mood, the application queries the smart contract.
4.  **Playlist Suggestion**: The contract identifies that "Pop" is the most popular genre for a "Happy" mood. The backend then selects a "Pop" playlist from its database and returns it to the user.

---


## Setup and Deployment Guide

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A crypto wallet (like MetaMask) with a private key

### Step 1: Clone and Install

```bash
git clone <repository-url>
cd on-chain-mood-recommender
npm install
```

### Step 2: Configure Environment

1.  **Create `.env` file**: Copy the sample environment file.
    ```bash
    cp .env.sample .env
    ```
2.  **Add Private Key**: Open the `.env` file and add the private key of the wallet you will use for deployment.
    ```env
    PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"
    ```
3.  **Fund Your Wallet**: Make sure the wallet address corresponding to your private key is funded with ShimmerEVM Testnet tokens. You can use the [Shimmer Testnet Faucet](https://faucet.testnet.shimmer.network/).

### Step 3: Compile the Smart Contract

Compile the Solidity contract to generate the ABI and bytecode.

```bash
npx hardhat compile
```

### Step 4: Deploy to ShimmerEVM Testnet

Run the deployment script. This will deploy the `MoodRecommender.sol` contract and automatically update your `.env` file with the new contract address.

```bash
npm run deploy
```

**Expected Output:**

```
Deploying MoodRecommender contract...
✅ MoodRecommender deployed to: 0x...
Updated CONTRACT_ADDRESS in .env file.
```

---

## Running the Demo

The `demo.ts` script simulates several users submitting their moods and then requests a recommendation.

**Make sure you have deployed the contract first.**

```bash
npm run demo
```

**Expected Demo Output:**

```
--- On-Chain Mood-to-Music Recommender Demo ---

--- Simulating user submissions to build community data ---
Submitting mood to the blockchain: { mood: "Happy", genre: "Pop" }
Transaction successful! Hash: 0x...
...

--- A new user who is 'Happy' asks for a recommendation ---
Querying the blockchain for a recommendation for mood: "Happy"
On-chain recommended genre: "Pop"
Final recommendation: Playlist "Summer Hits"

✅ Recommendation for a 'Happy' mood:
   Playlist: Summer Hits
   Genre: Pop
   URL: https://...
...
```

---

## Future Upgrades

- **DID Integration**: Users could own their mood data via Decentralized Identifiers (DIDs), giving them more control.
- **Spotify/Apple Music API**: Replace the local `playlists.json` with a real-time API from a major music streaming service.
- **Oracle for Trending Music**: An oracle could feed on-chain data about trending genres or songs, enriching the recommendations.
- **Tokenomics**: Introduce a token to reward users for contributing high-quality data or curating playlists.
<img width="1919" height="1017" alt="image" src="https://github.com/user-attachments/assets/f8e512a4-e371-48f9-bbc7-736fc554a9f6" />
