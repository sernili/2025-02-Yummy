"use client";

import useRecipeStore, { Recipe } from "@/store/recipes";
import Header from "./header";
import Tags from "./tags";

import Steps from "./steps";
import Ingredients from "./ingredients";
import Notes from "./notes";

export default function RecipeCard({ slug }: { slug: string }) {
  const { recipes } = useRecipeStore();

  const titleFromSlug = decodeURIComponent(slug);

  const recipe = recipes.find(
    (recipe: Recipe) => recipe.title === titleFromSlug,
  );

  return (
    recipe && (
      <>
        <Header recipe={recipe} />

        <div className="my-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-3">
            {recipe.tagData && <Tags tags={recipe.tagData} />}
          </div>

          <div className="lg:col-span-2">
            <Steps steps={recipe.steps} />
          </div>

          <div className="max-md:row-start-2">
            <Ingredients ingredients={recipe.ingredients} />
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            {recipe.notes && <Notes notes={recipe.notes} />}
          </div>
        </div>
      </>
    )
  );
}
