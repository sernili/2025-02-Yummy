import { create } from "zustand";
import { RecipeTag } from "./tags";

// Put all type declarations in one place
type RecipeStore = {
  recipes: Recipe[];
  setInitialRecipes: (initialRecipes: Recipe[]) => void;
  //updateRecipeDisplay: (clickedTags: Tag[]) => void;
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

export type Steps = string;

export type Notes = string;

export type Recipe = {
  id: string;
  title: string;
  key: string;
  description?: string;
  tags?: RecipeTag[];
  cookingTime?: CookingTime;
  people?: number;
  imageURL?: string;
  display: boolean;
  steps: Steps[];
  notes?: Notes;
  ingredients: Ingredients[];
};

const useRecipeStore = create<RecipeStore>()((set) => ({
  recipes: [],
  setInitialRecipes: (initialRecipes: Recipe[]) =>
    set({ recipes: initialRecipes }),

  // TODO: update logic
  // TODO: push changes to the database!
  // updateRecipeDisplay: (tags) => {
  // set((state: RecipeStore) => {
  //   const updatedRecipes: Recipe[] = state.recipes.map((recipe) => ({
  //     ...recipe,
  //     display: !clickedTag.selected,
  //   }));
  // TODO: delete? Not needed?
  // selectedTags.length === 0 ||
  //           (!!recipe.tags &&
  //             recipe.tags?.length > 0 &&
  //             selectedTags.every((tagName) => recipe.tags?.includes(tagName))),
  // Sort recipes alphabetically
  // updateRecipes.sort((a, b) => a.title.localeCompare(b.title));
  // Sort recipe tags alphabetically
  // updateRecipes.forEach((recipe) => {
  //   recipe.tags?.sort((a, b) => a.localeCompare(b));
  // });
  //   return {
  //     ...state,
  //     recipes: updatedRecipes,
  //   };
  // });
  // },
}));

// Helpers --------------------

// const getNewSelectedTags = (clickedTag: string) => {
//   if (selectedTags.includes(clickedTag)) {
//     return selectedTags.filter((tag) => tag !== clickedTag);
//   }

//   return [...filterEmptyString(selectedTags), clickedTag];
// };

const filterEmptyString = (array: string[]) =>
  array.filter((element) => element !== "");

export default useRecipeStore;
