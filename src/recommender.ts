import { getContract } from "./ethers";
import { Playlist, PlaylistDatabase } from "./types";
import { config } from "./config";
import * as fs from "fs/promises";

/**
 * Submits a user's mood and listening choice to the blockchain.
 * @param mood The user's current mood.
 * @param genre The genre of music they are listening to.
 */
export async function submitMood(mood: string, genre: string): Promise<void> {
  const contract = getContract();
  console.log(
    `Submitting mood to the blockchain: { mood: "${mood}", genre: "${genre}" }`
  );

  try {
    const tx = await contract.submitMood(mood, genre);
    await tx.wait(); // Wait for the transaction to be mined
    console.log(`Transaction successful! Hash: ${tx.hash}`);
  } catch (error) {
    console.error("Failed to submit mood:", error);
  }
}

/**
 * Gets a music recommendation for a given mood.
 * @param mood The user's current mood.
 * @returns A recommended playlist or null if no recommendation can be made.
 */
export async function getRecommendation(
  mood: string
): Promise<Playlist | null> {
  const contract = getContract();
  console.log(
    `Querying the blockchain for a recommendation for mood: "${mood}"`
  );

  try {
    // 1. Get the recommended genre from on-chain data
    const recommendedGenre = await contract.getRecommendedGenre(mood);
    console.log(`On-chain recommended genre: "${recommendedGenre}"`);

    if (recommendedGenre === "None") {
      console.log(
        "No community data available for this mood yet. No recommendation can be made."
      );
      return null;
    }

    // 2. Look up playlists for that genre in our local database
    const db: PlaylistDatabase = JSON.parse(
      await fs.readFile(config.data.playlistsDbPath, "utf-8")
    );
    const playlists = db[recommendedGenre];

    if (!playlists || playlists.length === 0) {
      console.log(
        `No playlists found in the local database for genre: "${recommendedGenre}"`
      );
      return null;
    }

    // 3. Return a random playlist from the matching genre
    const randomIndex = Math.floor(Math.random() * playlists.length);
    const recommendedPlaylist = playlists[randomIndex];

    console.log(`Final recommendation: Playlist "${recommendedPlaylist.name}"`);
    return recommendedPlaylist;
  } catch (error) {
    console.error("Failed to get recommendation:", error);
    return null;
  }
}
