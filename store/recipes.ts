import { create } from "zustand";

type Store = {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  fetchInitialRecipes: () => Promise<void>;
  setInitialRecipes: (initialRecipes: Recipe[]) => void;
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
  id: string;
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
  recipes: [],
  isLoading: false,
  error: null,
  setInitialRecipes: (initialRecipes: Recipe[]) =>
    set({ recipes: initialRecipes }),

  fetchInitialRecipes: async () => {
    set({ isLoading: true, error: null });
  },

  updateRecipeDisplaySettings: (selectedTags: string[]) => {
    set((state: Store) => {
      // Update display property of recipes
      const updateRecipes: Recipe[] = state.recipes.map((recipe) => ({
        ...recipe,
        display:
          selectedTags.length === 0 ||
          (!!recipe.tags &&
            recipe.tags?.length > 0 &&
            selectedTags.every((tagName) => recipe.tags?.includes(tagName))),
      }));

      // Sort recipes alphabetically
      updateRecipes.sort((a, b) => a.title.localeCompare(b.title));

      // Sort recipe tags alphabetically
      updateRecipes.forEach((recipe) => {
        recipe.tags?.sort((a, b) => a.localeCompare(b));
      });

      return {
        ...state,
        recipes: updateRecipes,
      };
    });
  },
}));

export default useStore;
