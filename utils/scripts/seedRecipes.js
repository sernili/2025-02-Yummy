import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";

dotenv.config();

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKey) {
  console.error(
    `Error: The FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. - ${process.env}`,
  );
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(serviceAccountKey);
} catch (error) {
  console.error(
    "Error parsing FIREBASE_SERVICE_ACCOUNT_KEY:" + process.env.title,
    error,
  );
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function seedDatabase() {
  try {
    const recipesPath = path.join(process.cwd(), "data", "recipes.json");

    const recipesBuffer = await fs.readFile(recipesPath, "utf-8");
    const recipesData = JSON.parse(recipesBuffer);

    for (const recipe of recipesData) {
      try {
        const docRef = await db.collection("recipes").add(recipe);
        console.log(`Recipe "${recipe.title}" with ID: ${docRef.id} added.`);
      } catch (error) {
        console.error(`Error when adding: "${recipe.title}":`, error);
      }
    }
    console.log("Finished Database Seeding.");
  } catch (error) {
    console.error("Error reading or parsing recipes data:", error);
  } finally {
    process.exit();
  }
}

seedDatabase();
