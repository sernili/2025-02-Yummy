"use client";

import { useEffect } from "react";
import useStore from "../store/store";
import RecipeListCard from "./recipeListCard";

export default function RecipeCardList() {
  const { recipes } = useStore();

  useEffect(() => {}, [recipes]);
  console.log(recipes);

  return (
    <>
      {recipes.map((recipe) => {
        return recipe.display && <RecipeListCard recipe={recipe} />;
      })}
    </>
  );
}
