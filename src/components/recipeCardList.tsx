"use client";

import useStore from "../store/store";
import RecipeListCard from "./recipeListCard";

export default function RecipeCardList() {
  const { recipes } = useStore();

  return (
    <>
      {recipes.map((recipe) => {
        return <RecipeListCard recipe={recipe} />;
      })}
    </>
  );
}
