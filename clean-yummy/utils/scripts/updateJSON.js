import fs from "fs/promises";
import path from "path";

const FILE_NAME = "recipes.json";
const FILE_NAME2 = "recipeTags.json";

async function updateJSON() {
  try {
    // Data Source 1
    const jsonPath = path.join(process.cwd(), "utils/data", FILE_NAME);
    const buffer = await fs.readFile(jsonPath, "utf-8");
    const data = JSON.parse(buffer);

    // Data Source 2
    const jsonPath2 = path.join(process.cwd(), "utils/data", FILE_NAME2);
    const buffer2 = await fs.readFile(jsonPath2, "utf-8");
    const data2 = JSON.parse(buffer2);

    // JSON Modifications ---------
    const updatedData = tagToTagId(data, data2);
    console.log(updatedData);

    // ---------------------
    await fs.writeFile(jsonPath, JSON.stringify(updatedData), "utf-8");

    console.log("Finished modifying json.");
  } catch (error) {
    console.error("Error reading or parsing data:", error);
  } finally {
    process.exit();
  }
}

// ["Tag1", "Tag2", "Tag3"] >> [{name: ..., key: ..., selected: ...}]
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

// [{name: ..., key: ..., selected: ...}] >> [ "00001", "00002"]
function tagToTagId(recipes, tags) {
  const updatedRecipes = recipes.map((recipe) => {
    if (recipe.tags) {
      recipe.tags = recipe.tags.map((tagRecipe) => {
        const tagMatch = tags.find(
          (tagInfo) => tagInfo.label === tagRecipe.name,
        );
        if (!tagMatch) {
          console.log("No match found for: ", tagRecipe);
        } else {
          return tagMatch.id;
        }
      });
    }
    return recipe;
  });
  return updatedRecipes;
}

// {id: ..., label: ...., uri: ....} >> filled in
function prepareTagData(dummyTags) {
  let currId = 1;

  const updatedTags = dummyTags.map((tag) => {
    const newTag = {
      id: currId.toString().padStart(5, "0"),
      label: tag.label,
      uri: encodeURIComponent(tag.label.toLowerCase()),
    };
    currId++;
    return newTag;
  });

  return updatedTags;
}

updateJSON();
