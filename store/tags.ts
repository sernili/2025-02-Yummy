import { useSearchParams } from "next/navigation";
import { create } from "zustand";

// TODO: move all type declarations to separate place
export type RecipeTag = {
  id: string;
  label: string;
  uri: string;
};

export type SelectedTagId = string;

// TODO: figure out how to set initial selectedTagIds right
type TagState = {
  allTags: RecipeTag[];
  selectedTagIds: string[]; // TODO: turn into its own type
  setInitialTags: (initialRecipes: RecipeTag[]) => void;
  setSelectedTagIds: (newSelectedTagIds: SelectedTagId[]) => void;
};

const useTagStore = create<TagState>((set, get) => ({
  allTags: [],
  selectedTagIds: [],

  setInitialTags: (initialRecipeTags: RecipeTag[]) =>
    set({ allTags: initialRecipeTags }),

  setSelectedTagIds: (newSelectedTagIds: SelectedTagId[]) =>
    set(() => ({ selectedTagIds: newSelectedTagIds })),
}));

export default useTagStore;
