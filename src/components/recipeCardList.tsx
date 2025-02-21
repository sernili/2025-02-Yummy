"use client";

import { useEffect, useState } from "react";
import useStore from "../store/recipes";
import RecipeListCard from "./recipeListCard";
import { Recipe } from "@/store/recipes";
import ReactPaginate from "react-paginate";

export default function RecipeCardList({
  recipesForCurrPage,
}: {
  recipesForCurrPage: Recipe[];
}) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {recipesForCurrPage.map(
        (recipe) =>
          recipe.display && <RecipeListCard key={recipe.key} recipe={recipe} />,
      )}
    </div>
  );
}

export function PaginatedRecipeList({
  itemsPerPage,
}: {
  itemsPerPage: number;
}) {
  const { recipes: allRecipes } = useStore();

  const [recipesToDisplay, setRecipesToDisplay] = useState<Recipe[]>([]);
  const [recipesForCurrPage, setRecipesForCurrPage] = useState<Recipe[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setRecipesToDisplay(allRecipes.filter((recipe) => recipe.display));
  }, [allRecipes]);

  useEffect(() => {
    setItemOffset(0);
  }, [recipesToDisplay]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setRecipesForCurrPage([...recipesToDisplay.slice(itemOffset, endOffset)]);
  }, [recipesToDisplay, itemOffset, itemsPerPage]);

  useEffect(() => {
    const newPageCount = Math.ceil(recipesToDisplay.length / itemsPerPage);
    setPageCount(newPageCount);
  }, [recipesToDisplay.length, itemsPerPage]);

  const handlePageClick = (event: { selected: number }) => {
    setItemOffset((event.selected * itemsPerPage) % recipesToDisplay.length);
  };

  return (
    <>
      {recipesToDisplay.length > 0 ? (
        <>
          <RecipeCardList
            key="recipe-card-list"
            recipesForCurrPage={recipesForCurrPage}
          />
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            className="text-primary *:[&.disabled]:text-tertiary *:not my-16 flex w-full items-center justify-center gap-8 text-center *:cursor-pointer *:not-[&.disabled]:hover:border-b *:[&.disabled]:cursor-default *:[&.selected]:border-b"
          />
        </>
      ) : (
        <div className="text-primary p-6 text-center">
          Keine Rezepte vorhanden
        </div>
      )}
    </>
  );
}
