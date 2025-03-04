"use client";

import { Recipe } from "@store/recipes";
import RecipeCard from "./recipeCard";

export default function RecipeList({
  recipesForCurrPage,
}: {
  recipesForCurrPage: Recipe[];
}) {
  return (
    <div className="w-full overflow-scroll">
      <div className="grid auto-rows-[1fr] grid-cols-[repeat(auto-fill,_minmax(min(20rem,100%),_1fr))] gap-6">
        {recipesForCurrPage.map(
          (recipe) =>
            recipe.display && <RecipeCard key={recipe.key} recipe={recipe} />,
        )}
      </div>
    </div>
  );
}
