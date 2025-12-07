# Frontend Mockup (Conceptual)

This document outlines a simple, minimal UI for the Mood-to-Music Recommender. It would be built with a framework like React or Next.js.

## Main View

The main page would be split into two clear sections or cards.

---

### Card 1: Get a Recommendation

**Title**: How are you feeling?

**Component**: A series of large, friendly buttons with mood labels:

- [ 😊 Happy ]
- [ 😢 Sad ]
- [ ⚡ Energetic ]
- [ 🧘 Calm ]

**Action**:

- Clicking a mood button (e.g., "Happy") immediately triggers the `getRecommendation("Happy")` flow.
- The UI enters a loading state while the backend and blockchain process the request.
- A new "Recommendation" card appears with the result.

---

### Card 2: Contribute to the Community

**Title**: Help improve our recommendations!

**Components**:

1.  **Mood Selector**: "I'm feeling..."
    - A dropdown menu with options: `[Happy, Sad, Energetic, Calm]`
2.  **Genre Selector**: "...and I'm listening to..."
    - A dropdown menu with options: `[Pop, Rock, Jazz, Classical, Electronic]`
3.  **Submit Button**: A button labeled `[ Submit Mood ]`.

**Action**:

- After selecting a mood and genre, clicking "Submit Mood" triggers the `submitMood()` flow.
- The UI shows a loading spinner while the transaction is being confirmed.
- Upon success, a confirmation message appears: "✅ Thank you for contributing!"

---

### Recommendation Display View

When a recommendation is ready, it is displayed clearly.

**Title**: We recommend...

**Content**:

- **Playlist Name**: "Summer Hits"
- **Genre**: "Pop"
- **Link**: A button labeled `[ Listen Now ]` that links to the playlist URL.
