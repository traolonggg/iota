import { submitMood, getRecommendation } from "../src/recommender";

async function runDemo() {
  console.log("--- On-Chain Mood-to-Music Recommender Demo ---");

  // --- Step 1: Simulate a few users submitting their moods ---
  console.log("\n--- Simulating user submissions to build community data ---");
  await submitMood("Happy", "Pop");
  await submitMood("Happy", "Pop");
  await submitMood("Happy", "Electronic");
  await submitMood("Sad", "Classical");
  await submitMood("Sad", "Classical");
  await submitMood("Sad", "Jazz");
  await submitMood("Energetic", "Rock");

  // --- Step 2: A new user asks for a recommendation ---
  console.log("\n--- A new user who is 'Happy' asks for a recommendation ---");
  const happyRecommendation = await getRecommendation("Happy");
  if (happyRecommendation) {
    console.log(`\n✅ Recommendation for a 'Happy' mood:`);
    console.log(`   Playlist: ${happyRecommendation.name}`);
    console.log(`   Genre: ${happyRecommendation.genre}`);
    console.log(`   URL: ${happyRecommendation.url}`);
  }

  console.log("\n--- Another user who is 'Sad' asks for a recommendation ---");
  const sadRecommendation = await getRecommendation("Sad");
  if (sadRecommendation) {
    console.log(`\n✅ Recommendation for a 'Sad' mood:`);
    console.log(`   Playlist: ${sadRecommendation.name}`);
    console.log(`   Genre: ${sadRecommendation.genre}`);
    console.log(`   URL: ${sadRecommendation.url}`);
  }

  console.log("\n--- Demo Complete ---");
}

runDemo().catch((error) => {
  console.error("Demo script failed:", error);
});
