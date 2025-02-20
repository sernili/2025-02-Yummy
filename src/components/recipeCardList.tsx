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
    setRecipesToDisplay(allRecipes.filter((recipe) => recipe.display));
  }, [allRecipes]);

  useEffect(() => {
    updatePagination();
  }, [recipesToDisplay, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % recipesToDisplay.length;
    setItemOffset(newOffset);
  };

  const updatePagination = () => {
    // Compute new values before setting state
    const newEndOffset = itemOffset + itemsPerPage;
    const newPageCount = Math.ceil(recipesToDisplay.length / itemsPerPage);
    const shouldShowPagination = recipesToDisplay.length > itemsPerPage;

    // Update state in one batch to avoid stale values
    setRecipesForCurrPage(recipesToDisplay.slice(itemOffset, newEndOffset));
    setShowPagination(shouldShowPagination);
    setPageCount(newPageCount);

    console.log("....................");

    console.log(showPagination);
    console.log("pagecount", pageCount);
    console.log("to d", recipesToDisplay);
    console.log("for c", recipesForCurrPage);
  };

  return (
    <>
      {recipesToDisplay.length > 0 ? (
        <>
          <RecipeCardList recipesForCurrPage={recipesForCurrPage} />
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
