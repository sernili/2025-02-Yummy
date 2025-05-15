import { db } from "./firebaseAdmin.js";

async function linkRecipesAndTags() {
  try {
    const recipeSnapshot = await db.collection("recipes").get();
    const tagSnapshot = await db.collection("recipeTags").get();

    const tagMap = new Map();

    // Map: tag id string => tag database id
    tagSnapshot.forEach((tagDoc) => {
      tagMap.set(tagDoc.data().id, tagDoc.ref);
    });

    const updatePromises = [];

    // Get updated recipes (update promises)
    recipeSnapshot.forEach((recipeDoc) => {
      const recipeTags = recipeDoc.data().tags;
      const recipeRef = recipeDoc.ref;
      const newRecipeTagRefs = [];

      if (!recipeTags || !Array.isArray(recipeTags) || !recipeTags.length > 0)
        return;

      recipeTags.forEach((tagId) => {
        const tagRef = tagMap.get(tagId);

        if (tagRef) {
          newRecipeTagRefs.push(tagRef);
        } else {
          console.warn(
            `Tag with ID '${tagId}' not found in recipeTags collection.`,
          );
        }
      });

      updatePromises.push(recipeRef.update({ tags: newRecipeTagRefs }));
    });

    // Update recipes in database (update promises)
    await Promise.all(updatePromises).then(() =>
      console.log(
        `Finished linking. Updated ${updatePromises.length} recipes.`,
      ),
    );
  } catch (error) {
    console.error("Error reading or parsing data:", error);
  } finally {
    process.exit();
  }
}

linkRecipesAndTags();
