import type { Ingredients } from "@/store/recipes";

export default function Ingredients({
  ingredients,
}: {
  ingredients: Ingredients[];
}) {
  return (
    <div className="bg-primary h-full space-y-4 rounded-lg p-6 shadow-lg">
      <h2 className="font-serif text-4xl text-white">Zutaten</h2>
      <ol className="">
        {ingredients.map((ingredient, index) => (
          <li
            key={index}
            className="text-primary my-2 flex items-center gap-4 rounded-md bg-white px-4 py-2"
          >
            {ingredient.name}{" "}
            <span className="text-xs">{ingredient.amount}</span>
            <span className="text-xs">{ingredient.unit}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
