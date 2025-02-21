import { create } from "zustand";

type Store = {
  recipes: Recipe[];
  updateRecipeDisplaySettings: () => void;
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
      tags: ["Salat", "Vegetarisch", "Gesund"],
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
    {
      title: "Tomaten-Mozzarella-Brot",
      key: "tomaten_mozzarella_brot",
      description: "Leichtes Gericht mit frischen Tomaten und Mozzarella.",
      tags: ["Vegetarisch", "Schnell", "Gesund"],
      cookingTime: { unit: "Minuten", number: 15 },
      people: 2,
      imageURL: "https://picsum.photos/500/400",
      display: true,
    },
    {
      title: "Rindersteak mit Kräuterbutter",
      key: "rindersteak_kraeuterbutter",
      description: "Saftiges Steak mit hausgemachter Kräuterbutter.",
      tags: ["Fleisch", "Grillen"],
      cookingTime: { unit: "Minuten", number: 30 },
      people: 2,
      imageURL: "https://picsum.photos/500/400",
      display: true,
    },
    {
      title: "Minestrone",
      key: "minestrone",
      description: "Italienische Gemüsesuppe mit Nudeln.",
      tags: ["Vegetarisch", "Suppe", "Gesund"],
      cookingTime: { unit: "Minuten", number: 40 },
      people: 4,
      imageURL: "https://picsum.photos/500/400",
      display: true,
    },
    {
      title: "Gebackener Lachs mit Zitronen-Dill-Sauce",
      key: "gebackener_lachs",
      description: "Zarter Lachs aus dem Ofen mit frischer Zitronensauce.",
      tags: ["Fisch", "Gesund"],
      cookingTime: { unit: "Minuten", number: 25 },
      people: 3,
      imageURL: "https://picsum.photos/500/400",
      display: true,
    },
    {
      title: "Quinoa-Bowl mit Gemüse",
      key: "quinoa_bowl",
      description: "Gesunde Bowl mit Quinoa, Avocado und Kichererbsen.",
      tags: ["Vegan", "Gesund"],
      cookingTime: { unit: "Minuten", number: 20 },
      people: 2,
      imageURL: "https://picsum.photos/500/400",
      display: true,
    },
    {
      title: "BBQ Chicken Wings",
      key: "bbq_chicken_wings",
      description: "Würzige Chicken Wings mit rauchiger BBQ-Sauce.",
      tags: ["Fleisch", "Grillen"],
      cookingTime: { unit: "Minuten", number: 45 },
      people: 4,
      imageURL: "https://picsum.photos/500/400",
      display: true,
    },
    {
      title: "Pancakes mit Ahornsirup",
      key: "pancakes_ahornsirup",
      description: "Fluffige Pancakes mit süßem Ahornsirup.",
      tags: ["Süß", "Frühstück"],
      cookingTime: { unit: "Minuten", number: 20 },
      people: 3,
      imageURL: "https://picsum.photos/500/400",
      display: true,
    },
    {
      title: "Falafel mit Joghurt-Dip",
      key: "falafel_joghurt_dip",
      description: "Knusprige Falafel mit cremigem Joghurt-Dip.",
      tags: ["Vegetarisch", "Orientalisch", "Gesund"],
      cookingTime: { unit: "Minuten", number: 35 },
      people: 4,
      imageURL: "https://picsum.photos/500/400",
      display: true,
    },
    {
      title: "Schoko-Bananen-Smoothie",
      key: "schoko_bananen_smoothie",
      description: "Cremiger Smoothie mit Banane und Kakao.",
      tags: ["Süß", "Getränk"],
      cookingTime: { unit: "Minuten", number: 5 },
      people: 1,
      imageURL: "https://picsum.photos/500/400",
      display: true,
    },
    {
      title: "Kichererbsen-Curry",
      key: "kichererbsen_curry",
      description: "Würziges Curry mit Kichererbsen und Tomaten.",
      tags: ["Vegan", "Indisch", "Gesund"],
      cookingTime: { unit: "Minuten", number: 30 },
      people: 3,
      imageURL: "https://picsum.photos/500/400",
      display: true,
    },
  ],
  updateRecipeDisplaySettings: () => {
    set((state: Store) => {
      // Get selected tag names
      const selectedTagNames: string[] = state.tags
        .filter((tag) => tag.selected)
        .map((tag) => tag.label);

      // Update display property of recipes
      const newRecipes: Recipe[] = state.recipes.map((recipe) => ({
        ...recipe,
        display:
          selectedTagNames.length === 0 ||
          (!!recipe.tags &&
            recipe.tags?.length > 0 &&
            selectedTagNames.every((tagName) =>
              recipe.tags?.includes(tagName),
            )),
      }));

      // Sort recipes alphabetically
      newRecipes.sort((a, b) => a.title.localeCompare(b.title));

      // Sort recipe tags alphabetically
      newRecipes.forEach((recipe) => {
        recipe.tags?.sort((a, b) => a.localeCompare(b));
      });

      return {
        recipes: newRecipes,
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
