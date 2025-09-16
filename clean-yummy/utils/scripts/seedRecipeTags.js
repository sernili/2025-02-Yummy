import { db } from "./firebaseAdmin.js";
import fs from "fs/promises";
import path from "path";

async function seedDatabase() {
  try {
    const tagsPath = path.join(process.cwd(), "utils/data", "recipeTags.json");

    const tagsBuffer = await fs.readFile(tagsPath, "utf-8");
    const tagsData = JSON.parse(tagsBuffer);

    for (const tag of tagsData) {
      try {
        const docRef = await db.collection("recipeTags").add(tag);
        console.log(`Tag "${tag.label}" with ID: ${docRef.id} added.`);
      } catch (error) {
        console.error(`Error when adding: "${tag.label}":`, error);
      }
    }
    console.log("Finished Database Seeding.");
  } catch (error) {
    console.error("Error reading or parsing tags data:", error);
  } finally {
    process.exit();
  }
}

seedDatabase();
