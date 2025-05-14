import { db } from "./firebaseAdmin.js";
import { updateDoc } from "firebase/firestore";

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

      if (recipeTags && recipeTags.length > 0) {
        const newRecipeTagRefs = [];
        let hasChanged = false;

        recipeTags.forEach((tagId) => {
          const tagRef = tagMap.get(tagId);

          if (tagRef) {
            newRecipeTagRefs.push(tagRef);
            hasChanged = true;
          } else {
            console.warn(
              `Tag with ID '${tagId}' not found in recipeTags collection.`,
            );
          }
        });

        // console.log("recipeRef: ", recipeRef);
        // console.log("newRecipeTagRefs: ", newRecipeTagRefs);

        console.log(
          "Type of recipeDoc.data().tags:",
          typeof recipeDoc.data().tags,
          recipeDoc.data().tags,
        );
        console.log(
          "Type of newRecipeTagRefs:",
          typeof newRecipeTagRefs,
          newRecipeTagRefs,
        );

        if (hasChanged) {
          updatePromises.push(updateDoc(recipeRef, { tags: newRecipeTagRefs }));
        }
      } else if (
        recipeTags &&
        recipeTags.length > 0 &&
        recipeDoc.data().tags.length > 0
      ) {
        console.log("Empty Array");

        updatePromises.push(updateDoc(recipeRef, { tags: [] }));
      }
    });

    // Update recipes in database (update promises)
    await Promise.all(updatePromises);
    console.log(`Finished linking. Updated ${updatePromises.length} recipes.`);

    const newRecipeSnapshot = await db.collection("recipes").get();
    console.log("Updated Recipes: ", newRecipeSnapshot);
  } catch (error) {
    console.error("Error reading or parsing data:", error);
  } finally {
    process.exit();
  }
}

linkRecipesAndTags();
