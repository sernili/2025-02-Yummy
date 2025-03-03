import { create } from "zustand";
import recipesJSON from "../data/recipes.json";

type Store = {
  recipes: Recipe[];
  updateRecipeDisplaySettings: (selectedTags: string[]) => void;
};

export type Ingredients = {
  name: string;
  amount: string;
  unit: string;
};

export type CookingTime = {
  unit: string;
  number: number;
};

export type Tag = string;

export type Steps = string;

export type Notes = string;

export type Recipe = {
  title: string;
  key: string;
  description?: string;
  tags?: Tag[];
  cookingTime?: CookingTime;
  people?: number;
  imageURL?: string;
  display: boolean;
  steps: Steps[];
  notes?: Notes;
  ingredients: Ingredients[];
};

const useStore = create<Store>()((set) => ({
  recipes: recipesJSON,
  updateRecipeDisplaySettings: (selectedTags: string[]) => {
    set((state: Store) => {
      // Update display property of recipes
      const newRecipes: Recipe[] = state.recipes.map((recipe) => ({
        ...recipe,
        display:
          selectedTags.length === 0 ||
          (!!recipe.tags &&
            recipe.tags?.length > 0 &&
            selectedTags.every((tagName) => recipe.tags?.includes(tagName))),
      }));

      // Sort recipes alphabetically
      newRecipes.sort((a, b) => a.title.localeCompare(b.title));

      // Sort recipe tags alphabetically
      newRecipes.forEach((recipe) => {
        recipe.tags?.sort((a, b) => a.localeCompare(b));
      });

      console.log("selectedTags", selectedTags);

      console.log("newRecipes", newRecipes);

      return {
        recipes: newRecipes,
      };
    });
  },
}));

export default useStore;
