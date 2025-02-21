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
      imageURL:
        "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=3035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      display: true,
    },
    {
      title: "Avocado-Toast",
      key: "avocado_toast",
      description: "Gesundes Frühstück mit Avocado und Ei.",
      cookingTime: { unit: "Minuten", number: 10 },
      people: 2,
      imageURL:
        "https://images.unsplash.com/photo-1603046891726-36bfd957e0bf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZvY2FkbyUyMHRvYXN0fGVufDB8fDB8fHww",
      display: true,
    },
    {
      title: "Griechischer Salat",
      key: "griechischer_salat",
      description: "Frischer Salat mit Feta, Gurke und Oliven.",
      tags: ["Salat", "Vegetarisch", "Gesund"],
      imageURL:
        "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JpZWNoaXNjaGVyJTIwc2FsYXR8ZW58MHx8MHx8fDA%3D",
      display: true,
    },
    {
      title: "Vegetarische Lasagne",
      key: "vegetarische_lasagne",
      description: "Herzhafte Lasagne mit Gemüse und Käse.",
      tags: ["Vegetarisch"],
      cookingTime: { unit: "Minuten", number: 50 },
      imageURL:
        "https://images.unsplash.com/photo-1619895092538-128341789043?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFzYWduZXxlbnwwfHwwfHx8MA%3D%3D",
      display: true,
    },
    {
      title: "Hähnchen-Curry",
      key: "haehnchen_curry",
      description: "Würziges Curry mit Hähnchen und Kokosmilch.",
      tags: ["Fleisch", "Indisch"],
      people: 4,
      imageURL:
        "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      display: true,
    },
    {
      title: "Tomaten-Mozzarella-Brot",
      key: "tomaten_mozzarella_brot",
      description: "Leichtes Gericht mit frischen Tomaten und Mozzarella.",
      tags: ["Vegetarisch", "Schnell", "Gesund"],
      cookingTime: { unit: "Minuten", number: 15 },
      people: 2,
      imageURL:
        "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      display: true,
    },
    {
      title: "Rindersteak mit Kräuterbutter",
      key: "rindersteak_kraeuterbutter",
      description: "Saftiges Steak mit hausgemachter Kräuterbutter.",
      tags: ["Fleisch", "Grillen"],
      cookingTime: { unit: "Minuten", number: 30 },
      people: 2,
      imageURL:
        "https://images.unsplash.com/photo-1625937329935-287441889bce?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVlZnN0ZWFrfGVufDB8fDB8fHww",
      display: true,
    },
    {
      title: "Minestrone",
      key: "minestrone",
      description: "Italienische Gemüsesuppe mit Nudeln.",
      tags: ["Vegetarisch", "Suppe", "Gesund"],
      cookingTime: { unit: "Minuten", number: 40 },
      people: 4,
      imageURL:
        "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWluZXN0cm9uZXxlbnwwfHwwfHx8MA%3D%3D",
      display: true,
    },
    {
      title: "Gebackener Lachs mit Zitronen-Dill-Sauce",
      key: "gebackener_lachs",
      description: "Zarter Lachs aus dem Ofen mit frischer Zitronensauce.",
      tags: ["Fisch", "Gesund"],
      cookingTime: { unit: "Minuten", number: 25 },
      people: 3,
      imageURL:
        "https://images.unsplash.com/photo-1560717845-968823efbee1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2FsbW9ufGVufDB8fDB8fHww",
      display: true,
    },
    {
      title: "Quinoa-Bowl mit Gemüse",
      key: "quinoa_bowl",
      description: "Gesunde Bowl mit Quinoa, Avocado und Kichererbsen.",
      tags: ["Vegan", "Gesund"],
      cookingTime: { unit: "Minuten", number: 20 },
      people: 2,
      imageURL:
        "https://plus.unsplash.com/premium_photo-1705003210245-41b4773b5bb5?q=80&w=3176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      display: true,
    },
    {
      title: "BBQ Chicken Wings",
      key: "bbq_chicken_wings",
      description: "Würzige Chicken Wings mit rauchiger BBQ-Sauce.",
      tags: ["Fleisch", "Grillen"],
      cookingTime: { unit: "Minuten", number: 45 },
      people: 4,
      imageURL:
        "https://images.unsplash.com/photo-1524114664604-cd8133cd67ad?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      display: true,
    },
    {
      title: "Pancakes mit Ahornsirup",
      key: "pancakes_ahornsirup",
      description: "Fluffige Pancakes mit süßem Ahornsirup.",
      tags: ["Süß", "Frühstück"],
      cookingTime: { unit: "Minuten", number: 20 },
      people: 3,
      imageURL:
        "https://images.unsplash.com/photo-1587339144367-f1cacbecac82?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGFuY2FrZXN8ZW58MHx8MHx8fDA%3D",
      display: true,
    },
    {
      title: "Falafel mit Joghurt-Dip",
      key: "falafel_joghurt_dip",
      description: "Knusprige Falafel mit cremigem Joghurt-Dip.",
      tags: ["Vegetarisch", "Orientalisch", "Gesund"],
      cookingTime: { unit: "Minuten", number: 35 },
      people: 4,
      imageURL:
        "https://images.unsplash.com/photo-1547058881-aa0edd92aab3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFsYWZlbHxlbnwwfHwwfHx8MA%3D%3D",
      display: true,
    },
    {
      title: "Ratatouille",
      key: "ratatouille",
      description: "Französisches Gemüsegericht mit Auberginen und Tomaten.",
      tags: ["Vegetarisch", "Gesund"],
      cookingTime: { unit: "Minuten", number: 45 },
      people: 4,
      imageURL:
        "https://plus.unsplash.com/premium_photo-1713635953474-b74990274152?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmF0YXRvdWlsbGV8ZW58MHx8MHx8fDA%3D",
      display: true,
    },
    {
      title: "Schoko-Bananen-Smoothie",
      key: "schoko_bananen_smoothie",
      description: "Cremiger Smoothie mit Banane und Kakao.",
      tags: ["Süß", "Getränk"],
      cookingTime: { unit: "Minuten", number: 5 },
      people: 1,
      imageURL:
        "https://plus.unsplash.com/premium_photo-1663853293850-6099a76d4c51?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hvY29sYXRlJTIwc21vb3RoaWV8ZW58MHx8MHx8fDA%3D",
      display: true,
    },
    {
      title: "Kichererbsen-Curry",
      key: "kichererbsen_curry",
      description: "Würziges Curry mit Kichererbsen und Tomaten.",
      tags: ["Vegan", "Indisch", "Gesund"],
      cookingTime: { unit: "Minuten", number: 30 },
      people: 3,
      imageURL:
        "https://plus.unsplash.com/premium_photo-1695456064603-aa7568121827?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2twZWElMjBjdXJyeXxlbnwwfHwwfHx8MA%3D%3D",
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
