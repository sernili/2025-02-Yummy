import { create } from "zustand";

// TODO: move all type declarations to separate place
export type RecipeTag = {
  id: string;
  label: string;
  uri: string;
};

export type SelectedTagId = string;

type TagState = {
  tags: RecipeTag[];
  selectedTagIds: string[]; // TODO: turn into its own type
  setInitialTags: (initialRecipes: RecipeTag[]) => void;
  setSelectedTagIds: (newSelectedTagIds: SelectedTagId[]) => void;
};

const useTagStore = create<TagState>((set, get) => ({
  tags: [],
  selectedTagIds: [],

  setInitialTags: (initialRecipeTags: RecipeTag[]) =>
    set({ tags: initialRecipeTags }),

  setSelectedTagIds: (newSelectedTagIds: SelectedTagId[]) =>
    set(() => ({ selectedTagIds: newSelectedTagIds })),
}));

export default useTagStore;
