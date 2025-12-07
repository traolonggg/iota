// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title On-Chain Mood-to-Music Recommender
 * @author GitHub Copilot
 * @notice This contract collects community data on which music genres
 * are associated with which moods. It can then be queried to recommend
 * a genre for a given mood based on the most popular choice.
 */
contract MoodRecommender {
    // A nested mapping to store the statistics.
    // mapping(mood => mapping(genre => count))
    mapping(string => mapping(string => uint256)) public moodToGenreStats;

    // An array to keep track of all unique moods submitted.
    string[] public moods;

    // An event to log when a new mood is submitted.
    event MoodSubmitted(address indexed user, string mood, string genre);

    /**
     * @notice Submits a user's current mood and the genre of music they are listening to.
     * This function updates the on-chain statistics.
     * @param _mood The user's current mood (e.g., "Happy", "Sad").
     * @param _genre The genre of music the user is listening to (e.g., "Pop", "Rock").
     */
    function submitMood(string memory _mood, string memory _genre) public {
        // Increment the counter for the given mood and genre pair.
        moodToGenreStats[_mood][_genre]++;

        // If this is the first time this mood is being submitted, add it to our list of moods.
        if (isNewMood(_mood)) {
            moods.push(_mood);
        }

        // Emit an event to log the submission.
        emit MoodSubmitted(msg.sender, _mood, _genre);
    }

    /**
     * @notice Recommends a music genre based on the most popular choice for a given mood.
     * @param _mood The mood to get a recommendation for.
     * @return The genre with the highest count for the given mood.
     */
    function getRecommendedGenre(string memory _mood) public view returns (string memory) {
        // This is a simplified approach for on-chain demonstration.
        // A real-world implementation would need a more efficient way to iterate
        // over genres, as iterating over a mapping's keys is not possible.
        // For this example, we assume a fixed set of genres to check against.
        string[] memory genres = new string[](5);
        genres[0] = "Pop";
        genres[1] = "Rock";
        genres[2] = "Jazz";
        genres[3] = "Classical";
        genres[4] = "Electronic";

        string memory recommendedGenre = "None";
        uint256 maxCount = 0;

        for (uint i = 0; i < genres.length; i++) {
            string memory currentGenre = genres[i];
            uint256 currentCount = moodToGenreStats[_mood][currentGenre];

            if (currentCount > maxCount) {
                maxCount = currentCount;
                recommendedGenre = currentGenre;
            }
        }

        return recommendedGenre;
    }

    /**
     * @notice A helper function to check if a mood has been submitted before.
     * @param _mood The mood to check.
     * @return A boolean indicating if the mood is new.
     */
    function isNewMood(string memory _mood) internal view returns (bool) {
        for (uint i = 0; i < moods.length; i++) {
            if (keccak256(abi.encodePacked(moods[i])) == keccak256(abi.encodePacked(_mood))) {
                return false; // Mood found, so it's not new.
            }
        }
        return true; // Mood not found.
    }
}
