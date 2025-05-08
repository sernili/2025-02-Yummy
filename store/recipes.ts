import { create } from "zustand";

// Put all type declarations in one place
type Store = {
  isLoading: boolean;
  error: string | null;

  recipes: Recipe[];
  fetchInitialRecipes: () => Promise<void>;
  setInitialRecipes: (initialRecipes: Recipe[]) => void;
  //updateRecipeDisplay: (clickedTags: Tag[]) => void;

  tags: Tag[];
  // updateTagsFromRecipes: (recipes: Recipe[]) => void;
  setTags: (updatedTags: Tag[]) => void;
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

export type Tag = {
  name: string;
  key: string;
  selected: boolean;
};

export type Steps = string;

export type Notes = string;

export type Recipe = {
  id: string;
  title: string;
  key: string;
  description?: string;
  tags?: Tag[];
  cookingTime?: CookingTime;
  people?: number;
  imageURL?: string;
  display: boolean; // TODO: remove - handle based on rules in the correct place
  steps: Steps[];
  notes?: Notes;
  ingredients: Ingredients[];
};

const useStore = create<Store>()((set) => ({
  isLoading: false,
  error: null,

  // Recipes --------------------
  recipes: [],
  setInitialRecipes: (initialRecipes: Recipe[]) =>
    set({ recipes: initialRecipes }),

  fetchInitialRecipes: async () => {
    set({ isLoading: true, error: null });
  },

  // TODO: update logic
  // TODO: push changes to the database!
  // updateRecipeDisplay: (clickedTags) => {
  //   // go through each

  //   set((state: Store) => {
  //     clickedTags.forEach(tag => {
  //       state.recipes.
  //     });

  // const updatedRecipes: Recipe[] = state.recipes.map((recipe) => ({
  //   ...recipe,
  //   display: !clickedTag.selected,
  // }));

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

  // Tags --------------------
  tags: [],
  // TODO: remove
  // updateTagsFromRecipes: (recipes) =>
  //   set((state) => ({
  //     ...state,
  //     tags: getTagsFromRecipes(recipes),
  //   })),
  setTags: (updatedTags) =>
    set((state) => ({
      ...state,
      tags: updatedTags,
    })),
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

export default useStore;
