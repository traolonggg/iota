import { ethers } from "hardhat";
import * as fs from "fs";
import { resolve } from "path";

async function main() {
  console.log("Deploying MoodRecommender contract...");

  const contractFactory = await ethers.getContractFactory("MoodRecommender");
  const contract = await contractFactory.deploy();
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log(`✅ MoodRecommender deployed to: ${contractAddress}`);

  // Update the .env file with the new contract address
  const envPath = resolve(__dirname, "../.env");
  if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, "utf-8");
    if (envContent.includes("CONTRACT_ADDRESS")) {
      envContent = envContent.replace(
        /CONTRACT_ADDRESS=.*/,
        `CONTRACT_ADDRESS="${contractAddress}"`
      );
    } else {
      envContent += `\nCONTRACT_ADDRESS="${contractAddress}"`;
    }
    fs.writeFileSync(envPath, envContent);
    console.log("Updated CONTRACT_ADDRESS in .env file.");
  } else {
    console.warn(
      ".env file not found. Please add the following line manually:"
    );
    console.warn(`CONTRACT_ADDRESS="${contractAddress}"`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
