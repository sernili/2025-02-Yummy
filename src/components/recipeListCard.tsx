import Recipe from "@app/recipelist/page";
import Image from "next/image";

export default function RecipeListCard({ recipe }: Recipe) {
  return (
    <div className="flex items-center justify-start gap-10 rounded-2xl bg-white shadow-lg">
      <Image
        src={recipe.imageURL}
        alt="recipephoto"
        className="h-[10rem] max-w-[12rem] overflow-hidden rounded-l-2xl object-cover"
        width={300}
        height={300}
      />
      <div className="flex flex-col gap-6 p-4">
        <div className="space-y-1">
          <h2 className="text-primary font-serif text-4xl">{recipe.title}</h2>
          <p className="text-primary">{recipe.description}</p>
        </div>

        <p className="text-tertiary flex gap-2">
          {recipe.tags && (
            <span>
              {recipe.tags.map((tag: [], index: number, array: []) => {
                return `${tag}${
                  index < array.length && index != array.length - 1 ? ", " : ""
                }`;
              })}
            </span>
          )}

          <span>|</span>

          {recipe.cookingTime && (
            <span>
              {recipe.cookingTime.number + " " + recipe.cookingTime.unit}
            </span>
          )}

          <span>|</span>

          {recipe.people && <span>{recipe.people + " Personen"}</span>}
        </p>
      </div>
    </div>
  );
}
