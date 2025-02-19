"use client";

import { useEffect, useState } from "react";
import useStore from "../store/store";
import RecipeListCard from "./recipeListCard";

export default function RecipeCardList() {
  const { recipes } = useStore();
  const [recipesToDisplay, setRecipesToDisplay] = useState<Boolean>(true);

  useEffect(() => {
    const hasRecipesToDisplay = recipes.some((recipe) => recipe.display);
    setRecipesToDisplay(hasRecipesToDisplay);
  }, [recipes]);

  return (
    <>
      {recipesToDisplay ? (
        recipes.map((recipe) => {
          return recipe.display && <RecipeListCard recipe={recipe} />;
        })
      ) : (
        <div className="text-primary p-6 text-center">
          No recipes to display
        </div>
      )}
    </>
  );
}
