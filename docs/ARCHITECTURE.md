# Architecture

This document provides a detailed overview of the On-Chain Mood-to-Music Recommender's architecture.

## System Components

The system is a full-stack decentralized application (dApp) composed of three main layers: a smart contract, a backend service, and a conceptual frontend.

### 1. On-Chain Layer (ShimmerEVM)

- **`contracts/MoodRecommender.sol`**: The core of the system's logic resides in this Solidity smart contract.
  - **State**: It maintains a `mapping(string => mapping(string => uint256))` named `moodToGenreStats`. This public mapping acts as the on-chain database, storing counters for each `mood -> genre` pair.
  - **Functions**:
    - `submitMood()`: A public write function that allows any user to submit their mood and listening preference. It increments the appropriate counter in the state.
    - `getRecommendedGenre()`: A public view function that takes a mood as input and iterates through a predefined list of genres to find the one with the highest count for that mood.

### 2. Backend Layer (Node.js/TypeScript)

This layer orchestrates the application logic and connects the user to the blockchain.

- **`src/ethers.ts`**: An abstraction layer for all blockchain interactions. It uses the `ethers.js` library to connect to the ShimmerEVM Testnet, instantiate the wallet from a private key, and create a contract object for seamless interaction.
- **`src/recommender.ts`**: Contains the primary business logic.
  - `submitMood()`: Wraps the smart contract's `submitMood` function, handling the transaction submission and waiting for confirmation.
  - `getRecommendation()`: A multi-step process that first calls the smart contract's `getRecommendedGenre()` function. Based on the result, it then queries the local playlist database (`data/playlists.json`) to find and return a suitable playlist.
- **`src/config.ts`**: Centralizes all configuration, loading sensitive data like the private key and contract address from a `.env` file to keep it separate from the source code.

### 3. Frontend Layer (Conceptual)

- **`frontend/MOCKUP.md`**: While not a full implementation, this file outlines the user interface. It would be a simple web page with:
  - A dropdown or button group for the user to select their current mood.
  - A similar interface to select the genre they are currently listening to.
  - A "Submit" button to record their preference.
  - A "Get Recommendation" button that triggers the recommendation flow.
  - A display area to show the final recommended playlist, including its name and a link.

## Data Flow

The data flows from the user, through the backend, to the blockchain, and back again.

1.  **Write Flow (Submitting a Mood)**: User -> Frontend -> Backend (`recommender.ts`) -> `ethers.ts` -> Smart Contract (`submitMood`). The data is permanently recorded on the ShimmerEVM blockchain.
2.  **Read Flow (Getting a Recommendation)**: User -> Frontend -> Backend (`recommender.ts`) -> `ethers.ts` -> Smart Contract (`getRecommendedGenre`). The backend receives the recommended genre, queries its local `playlists.json`, and returns a final playlist to the user.
