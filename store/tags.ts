import { create } from "zustand";

// TODO: move all type declarations to separate place
export type RecipeTag = {
  id: string;
  label: string;
  uri: string;
};

type TagState = {
  tags: RecipeTag[];
  selectedTagIds: string[];
  setInitialTags: (initialRecipes: RecipeTag[]) => void;
};

const useTagStore = create<TagState>((set, get) => ({
  tags: [],
  selectedTagIds: [],

  setInitialTags: (initialRecipeTags: RecipeTag[]) =>
    set({ tags: initialRecipeTags }),
}));

export default useTagStore;
