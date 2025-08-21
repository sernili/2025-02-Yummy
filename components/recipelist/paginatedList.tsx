"use client";

import { useEffect, useRef, useState } from "react";
import useRecipeStore from "../../store/recipes";
import { Recipe } from "@/store/recipes";
import ReactPaginate from "react-paginate";
import useRecipeFilters from "@/hooks/useRecipeFilters";
import RecipeList from "@/components/recipelist/recipeList";
import useTagStore from "@/store/tags";

export function PaginatedRecipeList({
  itemsPerPage,
}: {
  itemsPerPage: number;
}) {
  // Getters and Constants ----------------------------------------------

  const DEFAULT_PAGE_INDEX = 0;

  const getPageCount = (newRecipesToDisplay: Recipe[]) =>
    Math.ceil(newRecipesToDisplay.length / itemsPerPage);

  const getEndOffset = (newItemOffset: number) => newItemOffset + itemsPerPage;

  const getSortedRecipes = (recipes: Recipe[]) => {
    // Sort recipes alphabetically
    recipes.sort((a, b) => a.title.localeCompare(b.title));

    // Sort recipe tags alphabetically
    recipes.forEach((recipe) => {
      recipe.tagData?.sort((a, b) => a.label.localeCompare(b.label));
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

  const getCurrentPage = (newItemOffset: number) =>
    Math.floor(newItemOffset / itemsPerPage);

  const getNewItemOffset = (
    pageIndex: number,
    newRecipesToDisplay: Recipe[] = recipesToDisplay,
  ) => (pageIndex * itemsPerPage) % newRecipesToDisplay.length;

  // Recipe Info ----------------------------------------------

  const { recipes: allRecipes, updateRecipeDisplay } = useRecipeStore();

  const [recipesToDisplay, setRecipesToDisplay] = useState<Recipe[]>(
    getRecipesToDisplay(getSortedRecipes(allRecipes)),
  );
  const [recipesForCurrPage, setRecipesForCurrPage] = useState<Recipe[]>([]);

  const prevAllRecipes = useRef<Recipe[]>(allRecipes);

  // Filter and Pagination Info ----------------------------------------------

  const { filters, setFilters } = useRecipeFilters();
  const { selectedTagIds } = useTagStore();

  const [tags] = useState(filters.tags);
  const [itemOffset, setItemOffset] = useState(filters.itemOffset);

  const [pageCount, setPageCount] = useState(getPageCount(recipesToDisplay));
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);

  // Side Effects ----------------------------------------------

  useEffect(() => {}, [recipesToDisplay, recipesForCurrPage]);

  useEffect(() => {
    if (allRecipes.length > 0) {
      updatePagination(Number(itemOffset));
    }
  }, []);

  useEffect(() => {
    const recipesChanged =
      JSON.stringify(prevAllRecipes.current) !== JSON.stringify(allRecipes);

    if (recipesChanged) {
      updatePagination(Number(itemOffset));
      prevAllRecipes.current = allRecipes;
    }
  }, [allRecipes]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters({ tags, itemOffset });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [itemOffset]);

  useEffect(() => {
    updateRecipeDisplay(selectedTagIds);
  }, [selectedTagIds]);

  // Event Handlers ----------------------------------------------

  const handlePageClick = (event: { selected: number }) => {
    const pageIndex = event.selected;
    const newItemOffset = getNewItemOffset(pageIndex);
    const newEndOffset = getEndOffset(newItemOffset);
    const newCurrPage = getCurrentPage(newItemOffset);

    setItemOffset(newItemOffset.toString());
    setCurrentPage(newCurrPage);
    setRecipesForCurrPage(getRecipesForCurrPage(newItemOffset, newEndOffset));
  };

  const updatePagination = (newItemOffset: number) => {
    const newRecipesToDisplay = getRecipesToDisplay(allRecipes);
    const newPageCount = getPageCount(newRecipesToDisplay);
    const newCurrPage = getCurrentPage(newItemOffset);
    const correctedItemOffset = getNewItemOffset(
      newCurrPage,
      newRecipesToDisplay,
    );
    const newEndOffset = getEndOffset(correctedItemOffset);

    const newRecipesForCurrPage = getRecipesForCurrPage(
      correctedItemOffset,
      newEndOffset,
      newRecipesToDisplay,
    );

    setItemOffset(correctedItemOffset.toString());
    setCurrentPage(newCurrPage);
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

          {pageCount > 1 && (
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
          )}
        </>
      ) : (
        <div className="text-primary p-6 text-center">
          Keine Rezepte vorhanden
        </div>
      )}
    </>
  );
}
