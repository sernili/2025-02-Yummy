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
  const [endOffset, setEndOffset] = useState(0);

  useEffect(() => {
    setRecipesToDisplay(allRecipes.filter((recipe) => recipe.display));
  }, [allRecipes]);

  useEffect(() => {
    updatePagination();
  }, [recipesToDisplay, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % recipesToDisplay.length;
    console.log("event", event.selected);

    setItemOffset(newOffset);
  };

  const updatePagination = () => {
    console.log("updatePagination --------");

    setShowPagination(recipesToDisplay.length > itemsPerPage);
    setRecipesForCurrPage(recipesToDisplay.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(recipesToDisplay.length / itemsPerPage));
    setEndOffset(itemOffset + itemsPerPage);

    // console.log("pagecount", pageCount);

    // console.log(showPagination);
    console.log(allRecipes);
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
