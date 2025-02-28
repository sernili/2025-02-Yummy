"use client";

import useStore, { Recipe } from "@/store/recipes";

export default function RecipeCard({ slug }: { slug: string }) {
  const { recipes } = useStore();
  const titleFromSlug = slug.replaceAll("%20", " ");

  const recipe = recipes.find(
    (recipe: Recipe) => recipe.title === titleFromSlug,
  );

  return (
    recipe && (
      <>
        <div
          style={{ backgroundImage: `url('${recipe.imageURL || ""}')` }}
          className="my-4 flex h-[clamp(40rem,_40vh,_75vh)] flex-col justify-end space-y-16 overflow-hidden rounded-4xl bg-cover bg-center p-6 text-white shadow"
        >
          <div>
            <h1 className="font-serif text-[clamp(4rem,_8vw,_8rem)] leading-none">
              {recipe.title}
            </h1>
            <p className="text-2xl">{recipe.description}</p>
          </div>
          <p className="flex flex-wrap gap-2 text-lg">
            {recipe.cookingTime && (
              <span className="flex-none after:ml-2 after:content-['|'] last:after:content-none">
                Dauer:{" "}
                {recipe.cookingTime.number + " " + recipe.cookingTime.unit}
              </span>
            )}

            {recipe.people && (
              <span className="flex-none after:ml-2 after:content-['|'] last:after:content-none">
                Personen: {recipe.people}
              </span>
            )}
          </p>
        </div>

        <div className="flex w-full flex-col rounded-2xl bg-white shadow-lg">
          <div className="flex h-full flex-col justify-between gap-14 p-4">
            <div className="space-y-1">
              <h2 className="text-primary font-serif text-4xl">
                {recipe.title}
              </h2>
            </div>
          </div>
        </div>
      </>
    )
  );
}
