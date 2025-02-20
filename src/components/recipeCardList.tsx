"use client";

import { useEffect, useState } from "react";
import useStore from "../store/store";
import RecipeListCard from "./recipeListCard";
import { Recipe } from "@store/store";
import ReactPaginate from "react-paginate";

export default function RecipeCardList({
  recipesForCurrentPage,
}: {
  recipesForCurrentPage: Recipe[];
}) {
  return (
    <>
      {recipesForCurrentPage.map(
        (recipe) =>
          recipe.display && <RecipeListCard key={recipe.key} recipe={recipe} />,
      )}
    </>
  );
}

export function PaginatedItems({ itemsPerPage }: { itemsPerPage: number }) {
  const { recipes } = useStore();

  const [itemOffset, setItemOffset] = useState(0);
  const [hasRecipesToDisplay, setHasRecipesToDisplay] = useState<Boolean>(true);

  const endOffset = itemOffset + itemsPerPage;
  const recipesForCurrentPage = recipes.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(recipes.length / itemsPerPage);

  useEffect(() => {
    checkHasRecipesToDisplay();
  }, [recipes]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % recipes.length;
    setItemOffset(newOffset);
  };

  const checkHasRecipesToDisplay = () =>
    setHasRecipesToDisplay(recipes.some((recipe) => recipe.display));

  return (
    <>
      {hasRecipesToDisplay ? (
        <>
          <RecipeCardList recipesForCurrentPage={recipesForCurrentPage} />
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </>
      ) : (
        <div className="text-primary p-6 text-center">
          No recipes to display
        </div>
      )}
    </>
  );
}
