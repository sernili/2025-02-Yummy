import TagList from "@components/tags";
import RecipeListCard from "@components/recipeListCard";

export type Recipe = {
  title: string;
  key: string;
  description?: string;
  tags?: string[];
  cookingTime?: { unit: string; number: number };
  people?: number;
  imageURL?: string;
};

export default function Page() {
  const recipies: Recipe[] = [
    {
      title: "Spaghetti Carbonara",
      key: "spaghetti_carbonara",
      description: "Klassische italienische Pasta mit Ei und Speck.",
      tags: ["Fleisch", "Salat"],
      cookingTime: { unit: "Minuten", number: 25 },
      people: 4,
      imageURL: "https://picsum.photos/500/400",
    },
    {
      title: "Avocado-Toast",
      key: "avocado_toast",
      description: "Gesundes Frühstück mit Avocado und Ei.",
      tags: ["Frühstück"],
      cookingTime: { unit: "Minuten", number: 10 },
      people: 2,
      imageURL: "https://picsum.photos/600/200",
    },
    {
      title: "Griechischer Salat",
      key: "griechischer_salat",
      description: "Frischer Salat mit Feta, Gurke und Oliven.",
      tags: ["Salat", "Vegetarisch"],
      cookingTime: { unit: "Minuten", number: 15 },
      people: 3,
      imageURL: "https://picsum.photos/500/400",
    },
    {
      title: "Vegetarische Lasagne",
      key: "vegetarische_lasagne",
      description: "Herzhafte Lasagne mit Gemüse und Käse.",
      tags: ["Vegetarisch"],
      cookingTime: { unit: "Minuten", number: 50 },
      people: 6,
      imageURL: "https://picsum.photos/500/500",
    },
    {
      title: "Hähnchen-Curry",
      key: "haehnchen_curry",
      description: "Würziges Curry mit Hähnchen und Kokosmilch.",
      tags: ["Fleisch", "Indisch"],
      cookingTime: { unit: "Minuten", number: 40 },
      people: 4,
      imageURL: "https://picsum.photos/500/400",
    },
  ];

  return (
    <div className="bg-secondary min-h-screen space-y-12 overflow-hidden py-6">
      <TagList />

      <div className="space-y-6">
        {recipies.map((recipe) => {
          return <RecipeListCard recipe={recipe} />;
        })}
      </div>
    </div>
  );
}
