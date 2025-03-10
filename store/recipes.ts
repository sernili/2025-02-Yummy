import { create } from "zustand";

type Store = {
  recipes: Recipe[];
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
      steps: [
        "Nudeln kochen",
        "Ei und Speck anbraten",
        "Alles vermengen",
        "Genießen",
      ],
      ingredients: [
        { name: "Spaghetti", amount: "400", unit: "g" },
        { name: "Eier", amount: "4", unit: "Stück" },
        { name: "Speck", amount: "200", unit: "g" },
        { name: "Parmesan", amount: "100", unit: "g" },
      ],
      notes:
        "Die Eier sollten nicht zu lange in der Pfanne bleiben, damit sie nicht stocken.",
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
      steps: [
        "Avocado zerdrücken",
        "Ei kochen",
        "Toast rösten",
        "Alles zusammenfügen",
      ],
      ingredients: [
        { name: "Avocado", amount: "1", unit: "Stück" },
        { name: "Ei", amount: "2", unit: "Stück" },
        { name: "Brot", amount: "2", unit: "Scheiben" },
      ],
      notes: "Das Ei sollte wachsweich gekocht sein.",
    },
    {
      title: "Griechischer Salat",
      key: "griechischer_salat",
      description: "Frischer Salat mit Feta, Gurke und Oliven.",
      tags: ["Salat", "Vegetarisch", "Gesund"],
      imageURL:
        "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JpZWNoaXNjaGVyJTIwc2FsYXR8ZW58MHx8MHx8fDA%3D",
      display: true,
      steps: [
        "Gemüse schneiden",
        "Feta zerbröseln",
        "Alles vermengen",
        "Genießen",
      ],
      ingredients: [
        { name: "Gurke", amount: "1", unit: "Stück" },
        { name: "Tomate", amount: "2", unit: "Stück" },
        { name: "Feta", amount: "100", unit: "g" },
        { name: "Oliven", amount: "50", unit: "g" },
      ],
      notes: "Der Salat schmeckt besonders gut mit frischem Olivenöl.",
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
      steps: [
        "Gemüse schneiden",
        "Soße kochen",
        "Schichten aufbauen",
        "Backen",
      ],
      ingredients: [
        { name: "Lasagneplatten", amount: "200", unit: "g" },
        { name: "Zucchini", amount: "1", unit: "Stück" },
        { name: "Paprika", amount: "1", unit: "Stück" },
        { name: "Mozzarella", amount: "200", unit: "g" },
      ],
      notes:
        "Die Lasagne sollte vor dem Servieren kurz ruhen, damit sie nicht zerfällt.",
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
      steps: [
        "Hähnchen anbraten",
        "Gemüse schneiden",
        "Alles kochen",
        "Genießen",
      ],
      ingredients: [
        { name: "Hähnchenbrust", amount: "400", unit: "g" },
        { name: "Zwiebel", amount: "1", unit: "Stück" },
        { name: "Kokosmilch", amount: "400", unit: "ml" },
        { name: "Reis", amount: "200", unit: "g" },
      ],
      notes: "Das Curry schmeckt besonders gut mit frischem Koriander.",
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
      steps: ["Brot toasten", "Tomaten schneiden", "Alles belegen", "Genießen"],
      ingredients: [
        { name: "Brot", amount: "2", unit: "Scheiben" },
        { name: "Tomate", amount: "2", unit: "Stück" },
        { name: "Mozzarella", amount: "100", unit: "g" },
        { name: "Basilikum", amount: "1", unit: "Bund" },
      ],
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
      steps: [
        "Steak braten",
        "Kräuterbutter zubereiten",
        "Alles servieren",
        "Genießen",
      ],
      ingredients: [
        { name: "Rindersteak", amount: "2", unit: "Stück" },
        { name: "Butter", amount: "100", unit: "g" },
        { name: "Kräuter", amount: "1", unit: "Bund" },
        { name: "Salz", amount: "1", unit: "Prise" },
      ],
      notes:
        "Das Steak sollte vor dem Servieren kurz ruhen, damit es saftig bleibt.",
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
      steps: [
        "Gemüseschneiden",
        "Alles kochen",
        "Nudeln hinzufügen",
        "Genießen",
      ],
      ingredients: [
        { name: "Karotte", amount: "2", unit: "Stück" },
        { name: "Sellerie", amount: "1", unit: "Stange" },
        { name: "Zucchini", amount: "1", unit: "Stück" },
        { name: "Nudeln", amount: "100", unit: "g" },
      ],
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
      steps: ["Lachs würzen", "Im Ofen backen", "Sauce zubereiten", "Genießen"],
      ingredients: [
        { name: "Lachsfilet", amount: "3", unit: "Stück" },
        { name: "Zitrone", amount: "1", unit: "Stück" },
        { name: "Dill", amount: "1", unit: "Bund" },
        { name: "Salz", amount: "1", unit: "Prise" },
      ],
      notes: "Der Lachs sollte saftig und nicht zu trocken sein.",
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
      steps: [
        "Quinoa kochen",
        "Gemüse schneiden",
        "Alles vermengen",
        "Genießen",
      ],
      ingredients: [
        { name: "Quinoa", amount: "100", unit: "g" },
        { name: "Avocado", amount: "1", unit: "Stück" },
        { name: "Kichererbsen", amount: "50", unit: "g" },
        { name: "Tomate", amount: "1", unit: "Stück" },
      ],
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
      steps: [
        "Chicken Wings würzen",
        "Grillen",
        "BBQ-Sauce auftragen",
        "Genießen",
      ],
      ingredients: [
        { name: "Chicken Wings", amount: "1", unit: "kg" },
        { name: "BBQ-Sauce", amount: "200", unit: "ml" },
        { name: "Salz", amount: "1", unit: "Prise" },
        { name: "Pfeffer", amount: "1", unit: "Prise" },
      ],
      notes: "Die Chicken Wings sollten knusprig und gut durchgebraten sein.",
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
      steps: [
        "Teig zubereiten",
        "Pancakes backen",
        "Ahornsirup servieren",
        "Genießen",
      ],
      ingredients: [
        { name: "Mehl", amount: "200", unit: "g" },
        { name: "Milch", amount: "200", unit: "ml" },
        { name: "Eier", amount: "2", unit: "Stück" },
        { name: "Ahornsirup", amount: "100", unit: "ml" },
      ],
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
      steps: ["Falafel formen", "Frittieren", "Dip zubereiten", "Genießen"],
      ingredients: [
        { name: "Kichererbsen", amount: "200", unit: "g" },
        { name: "Joghurt", amount: "200", unit: "g" },
        { name: "Knoblauch", amount: "1", unit: "Zehe" },
        { name: "Koriander", amount: "1", unit: "Bund" },
      ],
      notes: "Die Falafel sollten knusprig und goldbraun sein.",
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
      steps: ["Gemüse schneiden", "Alles kochen", "Würzen", "Genießen"],
      ingredients: [
        { name: "Aubergine", amount: "1", unit: "Stück" },
        { name: "Zucchini", amount: "1", unit: "Stück" },
        { name: "Tomate", amount: "2", unit: "Stück" },
        { name: "Paprika", amount: "1", unit: "Stück" },
      ],
      notes: "Das Ratatouille schmeckt besonders gut mit frischem Baguette.",
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
      steps: ["Banane schälen", "Zutaten mixen", "Genießen"],
      ingredients: [
        { name: "Banane", amount: "1", unit: "Stück" },
        { name: "Kakao", amount: "1", unit: "EL" },
        { name: "Milch", amount: "200", unit: "ml" },
        { name: "Honig", amount: "1", unit: "EL" },
      ],
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
      steps: [
        "Zwiebel schneiden",
        "Kichererbsen kochen",
        "Curry zubereiten",
        "Genießen",
      ],
      ingredients: [
        { name: "Kichererbsen", amount: "200", unit: "g" },
        { name: "Tomate", amount: "2", unit: "Stück" },
        { name: "Zwiebel", amount: "1", unit: "Stück" },
        { name: "Reis", amount: "100", unit: "g" },
      ],
      notes: "Das Curry schmeckt besonders gut mit frischem Koriander.",
    },
  ],
  updateRecipeDisplaySettings: (selectedTags: string[]) => {
    set((state: Store) => {
      // Update display property of recipes
      const newRecipes: Recipe[] = state.recipes.map((recipe) => ({
        ...recipe,
        display:
          selectedTags.length === 0 ||
          (!!recipe.tags &&
            recipe.tags?.length > 0 &&
            selectedTags.every((tagName) => recipe.tags?.includes(tagName))),
      }));

      // Sort recipes alphabetically
      newRecipes.sort((a, b) => a.title.localeCompare(b.title));

      // Sort recipe tags alphabetically
      newRecipes.forEach((recipe) => {
        recipe.tags?.sort((a, b) => a.localeCompare(b));
      });

      console.log("selectedTags", selectedTags);

      console.log("newRecipes", newRecipes);

      return {
        recipes: newRecipes,
      };
    });
  },
}));

export default useStore;
