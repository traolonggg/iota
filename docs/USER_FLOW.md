# User Flow

This document describes the end-to-end user journey for the Mood-to-Music Recommender.

## Scenario: A New User Wants a Recommendation

**Persona**: Alex, a new user who feels energetic and wants to discover new music.

### Steps

1.  **Landing on the App**: Alex opens the web application. The interface is clean and simple, presenting two main options: "Submit My Mood" and "Get a Recommendation."

2.  **Choosing an Action**: Alex wants a recommendation, so they click "Get a Recommendation."

3.  **Selecting a Mood**: A modal or new section appears, asking "How are you feeling today?" Alex is presented with a list of moods: "Happy," "Sad," "Energetic," "Calm," etc. Alex selects **"Energetic."**

4.  **Triggering the Recommendation**: Alex clicks the "Find Music" button.

5.  **Backend Process**:

    - The frontend sends a request to the backend: `GET /recommend?mood=Energetic`.
    - The backend's `getRecommendation("Energetic")` function is called.
    - The backend connects to the ShimmerEVM Testnet and calls the `getRecommendedGenre("Energetic")` function on the `MoodRecommender` smart contract.

6.  **On-Chain Query**:

    - The smart contract looks at its `moodToGenreStats` data for the "Energetic" mood.
    - It finds that the counts are: `Rock: 5`, `Pop: 2`, `Electronic: 3`.
    - The contract determines that **"Rock"** is the most popular genre and returns this string to the backend.

7.  **Playlist Selection**:

    - The backend receives "Rock" as the recommended genre.
    - It opens `data/playlists.json` and finds the array of playlists under the "Rock" key.
    - It randomly selects one playlist from the array, for example: `{ name: "Classic Rock Anthems", ... }`.

8.  **Displaying the Result**:
    - The backend sends the playlist object back to the frontend.
    - The frontend updates to display the recommendation:
      - **Title**: "Based on the community, here's a playlist for an energetic mood:"
      - **Playlist Name**: "Classic Rock Anthems"
      - **Link**: A clickable link to the playlist URL.

## Scenario: A User Contributes Data

**Persona**: Beth, a user who is feeling happy and listening to Pop music.

1.  **Choosing an Action**: Beth decides to contribute to the community data and clicks "Submit My Mood."

2.  **Submitting Data**: The interface asks for her mood and what she's listening to.

    - She selects **"Happy"** from the mood list.
    - She selects **"Pop"** from the genre list.
    - She clicks "Submit."

3.  **Backend and On-Chain Process**:
    - The frontend sends a request: `POST /submit { mood: "Happy", genre: "Pop" }`.
    - The backend's `submitMood("Happy", "Pop")` function is called.
    - The backend uses its wallet to sign and send a transaction to the `submitMood` function on the smart contract.
    - The smart contract receives the transaction, and the counter for `moodToGenreStats["Happy"]["Pop"]` is incremented by one.
    - The frontend shows a "Thank you for contributing!" message.
