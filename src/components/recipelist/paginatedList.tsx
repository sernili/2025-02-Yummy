"use client";

import { useEffect, useState } from "react";
import useStore from "../../store/recipes";
import { Recipe } from "@/store/recipes";
import ReactPaginate from "react-paginate";
import useRecipeFilters from "@/app/hooks/useRecipeFilters";
import RecipeList from "./recipeList";

export function PaginatedRecipeList({
  itemsPerPage,
}: {
  itemsPerPage: number;
}) {
  // Getters and Constants ----------------------------------------------

  const DEFAULT_ITEM_OFFSET = 0;
  const DEFAULT_PAGE_INDEX = 0;

  const getPageCount = (newRecipesToDisplay: Recipe[]) =>
    Math.ceil(newRecipesToDisplay.length / itemsPerPage);

  const getEndOffset = (newItemOffset: number) => newItemOffset + itemsPerPage;

  const getSortedRecipes = (recipes: Recipe[]) => {
    // Sort recipes alphabetically
    recipes.sort((a, b) => a.title.localeCompare(b.title));

    // Sort recipe tags alphabetically
    recipes.forEach((recipe) => {
      recipe.tags?.sort((a, b) => a.localeCompare(b));
    });

    return recipes;
  };

  const getRecipesToDisplay = (allRecipes: Recipe[]) =>
    allRecipes.filter((recipe) => recipe.display);

  const getRecipesForCurrPage = (
    newItemOffset: number,
    newEndOffset: number,
    newRecipesToDisplay: Recipe[] = recipesToDisplay,
  ) => [...newRecipesToDisplay.slice(newItemOffset, newEndOffset)];

  // Recipe Info ----------------------------------------------

  const { recipes: allRecipes } = useStore();

  const [recipesToDisplay, setRecipesToDisplay] = useState<Recipe[]>(
    getRecipesToDisplay(getSortedRecipes(allRecipes)),
  );
  const [recipesForCurrPage, setRecipesForCurrPage] = useState<Recipe[]>([]);

  // Filter and Pagination Info ----------------------------------------------

  const { filters, setFilters } = useRecipeFilters();

  const [tags] = useState(filters.tags);
  const [itemOffset, setItemOffset] = useState(filters.itemOffset);

  const [pageCount, setPageCount] = useState(getPageCount(recipesToDisplay));
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);

  // Side Effects ----------------------------------------------

  useEffect(() => {
    updatePagination(Number(itemOffset));
  }, []);

  useEffect(() => {
    // deep compare tags to keep initial itemOffset when tags change initially
    // if (tags !== prevSelectedTags.current) {
    console.log("update");

    updatePagination(DEFAULT_ITEM_OFFSET);
    // prevSelectedTags.current = tags;
    // }
  }, [allRecipes]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters({ tags, itemOffset });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [itemOffset]);

  // Event Handlers ----------------------------------------------

  const handlePageClick = (event: { selected: number }) => {
    const pageIndex = event.selected;
    const newItemOffset = (pageIndex * itemsPerPage) % recipesToDisplay.length;
    const newEndOffset = getEndOffset(newItemOffset);

    setItemOffset(newItemOffset.toString());
    setRecipesForCurrPage(getRecipesForCurrPage(newItemOffset, newEndOffset));
  };

  const updatePagination = (newItemOffset: number) => {
    const newRecipesToDisplay = getRecipesToDisplay(allRecipes);
    const newPageCount = getPageCount(newRecipesToDisplay);
    const newPageIndices: number[] = Array.from(
      { length: newPageCount },
      (_, i) => i * itemsPerPage,
    );
    const currPage =
      newPageIndices.findLastIndex(
        (pageIndex: number) => pageIndex < newItemOffset,
      ) ?? DEFAULT_PAGE_INDEX;

    const correctedItemOffset = newPageIndices[currPage] ?? DEFAULT_ITEM_OFFSET;
    const newEndOffset = getEndOffset(correctedItemOffset);

    const newRecipesForCurrPage = getRecipesForCurrPage(
      correctedItemOffset,
      newEndOffset,
      newRecipesToDisplay,
    );

    setItemOffset(correctedItemOffset.toString());
    setCurrentPage(currPage);
    setPageCount(newPageCount);
    setRecipesToDisplay(newRecipesToDisplay);
    setRecipesForCurrPage(newRecipesForCurrPage);
  };

  return (
    <>
      {recipesToDisplay.length > 0 ? (
        <>
          <RecipeList
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
            forcePage={currentPage}
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
