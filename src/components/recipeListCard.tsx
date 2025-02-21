import { Recipe } from "@/store/recipes";
import Image from "next/image";

export default function RecipeListCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="flex h-full min-h-[20rem] items-stretch justify-start gap-10 rounded-2xl bg-white shadow-lg md:flex-col md:gap-0">
      <div className="h-full w-[12rem] md:h-[20rem] md:w-full">
        <Image
          src={recipe.imageURL || ""}
          alt="recipephoto"
          className="h-full w-full overflow-hidden rounded-l-2xl object-cover md:rounded-l-none md:rounded-t-2xl"
          width={300}
          height={300}
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-6 p-4 md:gap-8 md:p-6">
        <div className="space-y-1">
          <h2 className="text-primary font-serif text-4xl">{recipe.title}</h2>
          <p className="text-primary">{recipe.description}</p>
        </div>

        <p className="text-tertiary flex gap-2 text-xs">
          {recipe?.tags && recipe.tags.length > 0 && (
            <span
              className="relative inline-block max-w-[33%] overflow-hidden pr-2 text-pretty text-ellipsis whitespace-nowrap after:absolute after:right-0 after:bg-white after:content-['|'] last:after:content-none"
              title={(recipe.tags || []).join(", ")}
            >
              {(recipe.tags || []).join(", ")}
            </span>
          )}

          {recipe.cookingTime && (
            <span className="after:ml-2 after:content-['|'] last:after:content-none">
              {recipe.cookingTime.number + " " + recipe.cookingTime.unit}
            </span>
          )}

          {recipe.people && (
            <span className="after:ml-2 after:content-['|'] last:after:content-none">
              {recipe.people + " Personen"}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
