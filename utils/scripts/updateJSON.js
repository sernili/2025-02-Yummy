import fs from "fs/promises";
import path from "path";

const FILE_NAME = "recipes.json";

async function updateJSON() {
  try {
    const jsonPath = path.join(process.cwd(), "utils/data", FILE_NAME);
    const buffer = await fs.readFile(jsonPath, "utf-8");
    const data = JSON.parse(buffer);

    // JSON Modifications ---------
    const updatedData = stringToTag(data);

    // ---------------------
    await fs.writeFile(jsonPath, JSON.stringify(updatedData), "utf-8");

    console.log("Finished modifying json.");
  } catch (error) {
    console.error("Error reading or parsing data:", error);
  } finally {
    process.exit();
  }
}

function stringToTag(recipes) {
  const updatedRecipes = recipes.map((recipe) => {
    if (recipe.tags) {
      recipe.tags = recipe.tags.map((tag) => ({
        name: tag,
        key: encodeURIComponent(tag.toLowerCase()),
        selected: false,
      }));
    }
    return recipe;
  });
  return updatedRecipes;
}

updateJSON();
