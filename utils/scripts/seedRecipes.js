import { db } from "./firebaseAdmin.js";
import fs from "fs/promises";
import path from "path";

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
