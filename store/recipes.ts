import { create } from "zustand";
import { RecipeTag } from "./tags";
import { DocumentReference } from "firebase-admin/firestore";

// TODO: Put all type declarations in one place
type RecipeStore = {
  recipes: Recipe[];
  setInitialRecipes: (initialRecipes: Recipe[]) => void;
  updateRecipeDisplay: (selectedTagIds: string[]) => void;
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

type RecipeBaseProperties = {
  id: string;
  title: string;
  key: string;
  description?: string;
  cookingTime?: CookingTime;
  people?: number;
  imageURL?: string;
  steps: Steps[];
  notes?: Notes;
  ingredients: Ingredients[];
};

export type RecipeDatabase = RecipeBaseProperties & {
  tags: string[]; // e.g. ["00001", "00002"]
  tagRefs: DocumentReference<RecipeTag>[]; // firestore reference to recipeTags docs
};

export type Recipe = RecipeBaseProperties & {
  tagData: RecipeTag[] | undefined;
  display: boolean;
};

const useRecipeStore = create<RecipeStore>()((set) => ({
  recipes: [],
  setInitialRecipes: (initialRecipes: Recipe[]) =>
    set({ recipes: initialRecipes }),

  updateRecipeDisplay: (selectedTagIds: string[]) => {
    set((state: RecipeStore) => {
      const updatedRecipes: Recipe[] = state.recipes.map((recipe) => ({
        ...recipe,
        display:
          selectedTagIds.length === 0 ||
          (recipe.tagData?.some((tag) => selectedTagIds.includes(tag.id)) ??
            false),
      }));

      return { recipes: updatedRecipes };
    });
  },
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
