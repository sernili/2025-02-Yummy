"use client";

import { useEffect, useState } from "react";
import useStore from "../store/store";
import RecipeListCard from "./recipeListCard";
import { Recipe } from "@store/store";
import ReactPaginate from "react-paginate";

export default function RecipeCardList({
  recipesForCurrPage,
}: {
  recipesForCurrPage: Recipe[];
}) {
  useEffect(() => {
    console.log("comp", recipesForCurrPage);
  }, [recipesForCurrPage]);

  return (
    <>
      {recipesForCurrPage.map(
        (recipe) =>
          recipe.display && <RecipeListCard key={recipe.key} recipe={recipe} />,
      )}
    </>
  );
}

export function PaginatedItems({ itemsPerPage }: { itemsPerPage: number }) {
  const { recipes: allRecipes } = useStore();

  const [recipesToDisplay, setRecipesToDisplay] = useState<Recipe[]>([]);
  const [recipesForCurrPage, setRecipesForCurrPage] = useState<Recipe[]>([]);

  const [showPagination, setShowPagination] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    // Tipp: setState is asynchronous so don't do something right after - do it in a separate useEffect!
    setRecipesToDisplay(allRecipes.filter((recipe) => recipe.display));
  }, [allRecipes]);

  useEffect(() => {
    updatePagination();
  }, [recipesToDisplay, itemOffset, itemsPerPage]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % recipesToDisplay.length;
    setItemOffset(newOffset);
  };

  const updatePagination = () => {
    // Tipp: Compute new values before setting state
    const newEndOffset = itemOffset + itemsPerPage;
    const newPageCount = Math.ceil(recipesToDisplay.length / itemsPerPage);
    const shouldShowPagination = recipesToDisplay.length > itemsPerPage;

    // Tipp: Update state in one batch to avoid stale values
    setRecipesForCurrPage([
      ...recipesToDisplay.slice(itemOffset, newEndOffset),
    ]);
    setShowPagination(shouldShowPagination);
    setPageCount(newPageCount);
  };

  return (
    <>
      {recipesToDisplay.length > 0 ? (
        <>
          {/* Tipp: always make sure to add a key to ensure update changes */}
          <RecipeCardList
            key={recipesForCurrPage.map((r) => r.key).join(",")}
            recipesForCurrPage={recipesForCurrPage}
          />
          {showPagination && (
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
            />
          )}
        </>
      ) : (
        <div className="text-primary p-6 text-center">
          No recipes to display
        </div>
      )}
    </>
  );
}
