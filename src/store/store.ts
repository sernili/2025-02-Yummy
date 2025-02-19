import { create } from "zustand";

type Store = {
  recipes: Recipe[];
  updateRecipeDisplayOptions: () => void;
  tags: Tag[];
  getTagsFromRecipes: () => void;
  sortTags: () => void;
  updateTag: (clickedTag: Tag) => void;
};

export type Recipe = {
  title: string;
  key: string;
  description?: string;
  tags?: string[];
  cookingTime?: { unit: string; number: number };
  people?: number;
  imageURL?: string;
  display: boolean;
};

export type Tag = {
  label: string;
  value: string;
  selected: boolean; // multiple tags can be selected
};

const useStore = create<Store>()((set) => ({
  recipes: [
    {
      title: "Spaghetti Carbonara",
      key: "spaghetti_carbonara",
      description: "Klassische italienische Pasta mit Ei und Speck.",
      tags: ["Fleisch", "Salat"],
      cookingTime: { unit: "Minuten", number: 25 },
      people: 4,
      imageURL: "https://picsum.photos/500/400",
      display: true,
    },
    {
      title: "Avocado-Toast",
      key: "avocado_toast",
      description: "Gesundes Frühstück mit Avocado und Ei.",
      cookingTime: { unit: "Minuten", number: 10 },
      people: 2,
      imageURL: "https://picsum.photos/600/200",
      display: true,
    },
    {
      title: "Griechischer Salat",
      key: "griechischer_salat",
      description: "Frischer Salat mit Feta, Gurke und Oliven.",
      tags: ["Salat", "Vegetarisch"],
      imageURL: "https://picsum.photos/500/400",

      display: true,
    },
    {
      title: "Vegetarische Lasagne",
      key: "vegetarische_lasagne",
      description: "Herzhafte Lasagne mit Gemüse und Käse.",
      tags: ["Vegetarisch"],
      cookingTime: { unit: "Minuten", number: 50 },
      imageURL: "https://picsum.photos/500/500",
      display: true,
    },
    {
      title: "Hähnchen-Curry",
      key: "haehnchen_curry",
      description: "Würziges Curry mit Hähnchen und Kokosmilch.",
      tags: ["Fleisch", "Indisch"],
      people: 4,
      imageURL: "https://picsum.photos/500/400",
      display: true,
    },
  ],
  updateRecipeDisplayOptions: () => {
    set((state: Store) => {
      const selectedTagNames: string[] = state.tags
        .filter((tag) => tag.selected)
        .map((tag) => tag.label);

      return {
        recipes: state.recipes.map((recipe) => ({
          ...recipe,
          display: selectedTagNames.length
            ? recipe.tags && recipe.tags?.length > 0
              ? selectedTagNames.every((tagName) =>
                  recipe.tags?.includes(tagName),
                )
              : false
            : true,
        })),
      };
    });
  },
  tags: [],
  getTagsFromRecipes: () => {
    set((state: Store) => {
      const allTagNames = state.recipes
        .map((recipe) => recipe.tags)
        .flat()
        .filter((tag): tag is string => tag != undefined);

      const uniqueTagNames = [...new Set(allTagNames)];

      return {
        tags: uniqueTagNames.map((tag) => ({
          label: tag,
          value: tag.toLowerCase(),
          selected: false,
        })),
      };
    });
  },
  sortTags: () => {
    set((state: Store) => {
      const selectedTags = state.tags.filter((tag) => tag.selected);
      selectedTags.sort((a, b) => a.label.localeCompare(b.label));

      const otherTags = state.tags.filter((tag) => !tag.selected);
      otherTags.sort((a, b) => a.label.localeCompare(b.label));

      return { tags: [...selectedTags, ...otherTags] };
    });
  },
  updateTag: (clickedTag: Tag) => {
    set((state: Store) => {
      const updatedTags = state.tags.map((tag) =>
        tag.value === clickedTag.value
          ? { ...tag, selected: !tag.selected }
          : tag,
      );

      return { tags: updatedTags };
    });
  },
}));

export default useStore;
