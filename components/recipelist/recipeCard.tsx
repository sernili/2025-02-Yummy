import { Recipe } from "@store/recipes";
import Image from "next/image";
import Link from "next/link";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.title}`}>
      <div className="flex h-full w-full flex-col rounded-lg bg-white shadow-lg">
        <div className="h-[10rem] w-full">
          <Image
            src={recipe.imageURL || ""}
            alt="recipephoto"
            className="h-full w-full rounded-t-lg object-cover"
            width={300}
            height={300}
          />
        </div>

        <div className="flex h-full flex-col justify-between gap-14 p-4">
          <div className="space-y-1">
            <h2 className="text-primary font-serif text-4xl">{recipe.title}</h2>
            <p className="text-primary">{recipe.description}</p>
          </div>

          <p className="text-tertiary flex flex-wrap gap-2 text-sm">
            {recipe?.tags && recipe.tags.length > 0 && (
              <span
                className="relative inline-block w-fit min-w-0 overflow-hidden pr-2 text-pretty text-ellipsis whitespace-nowrap after:absolute after:right-0 after:bg-white after:content-['|'] last:after:content-none"
                title={(recipe.tags || []).join(", ")}
              >
                {(recipe.tags || []).join(", ")}
              </span>
            )}

            {recipe.cookingTime && (
              <span className="flex-none after:ml-2 after:content-['|'] last:after:content-none">
                {recipe.cookingTime.number + " " + recipe.cookingTime.unit}
              </span>
            )}

            {recipe.people && (
              <span className="flex-none after:ml-2 after:content-['|'] last:after:content-none">
                {recipe.people + " Personen"}
              </span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}
