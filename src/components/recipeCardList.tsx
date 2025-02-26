"use client";

import { useEffect, useState } from "react";
import useStore from "../store/recipes";
import RecipeListCard from "./recipeListCard";
import { Recipe } from "@/store/recipes";
import ReactPaginate from "react-paginate";
import useRecipeFilters from "@/app/hooks/useRecipeFilters";

export default function RecipeCardList({
  recipesForCurrPage,
}: {
  recipesForCurrPage: Recipe[];
}) {
  console.log("Comp", recipesForCurrPage);

  return (
    <div className="w-full overflow-scroll">
      <div className="grid auto-rows-[1fr] grid-cols-[repeat(auto-fill,_minmax(min(20rem,100%),_1fr))] gap-6">
        {recipesForCurrPage.map(
          (recipe) =>
            recipe.display && (
              <RecipeListCard key={recipe.key} recipe={recipe} />
            ),
        )}
      </div>
    </div>
  );
}

export function PaginatedRecipeList({
  itemsPerPage,
}: {
  itemsPerPage: number;
}) {
  // Filter and Pagination Info ----------------------------------------------
  const { filters, setFilters } = useRecipeFilters();

  const [selectedTags, setSelectedTags] = useState(filters.selectedTags);
  const [pageCount, setPageCount] = useState(filters.pageCount);
  const [itemOffset, setItemOffset] = useState(filters.itemOffset);

  const defaultItemOffset = 0;
  const getPageCount = (newRecipesToDisplay: Recipe[] = recipesToDisplay) =>
    Math.ceil(newRecipesToDisplay.length / itemsPerPage);

  // Recipe Info ----------------------------------------------
  const { recipes: allRecipes } = useStore();

  const getRecipesToDisplay = () =>
    allRecipes.filter((recipe) => recipe.display);

  const getRecipesForCurrPage = (
    newItemOffset: number,
    newEndOffset: number,
    newRecipesToDisplay: Recipe[] = recipesToDisplay,
  ) => [...newRecipesToDisplay.slice(newItemOffset, newEndOffset)];

  const [recipesToDisplay, setRecipesToDisplay] = useState<Recipe[]>(
    getRecipesToDisplay(),
  );

  const [recipesForCurrPage, setRecipesForCurrPage] = useState<Recipe[]>([]);

  // Side Effects ----------------------------------------------
  // Sync local state with URL parameters on initial load
  useEffect(() => {
    setSelectedTags(filters.selectedTags);
    setPageCount(filters.pageCount);
    setItemOffset(filters.itemOffset);
  }, [filters]);

  // Update local state when allRecipes changes
  useEffect(() => {
    const newItemOffset = defaultItemOffset;
    const newEndOffset = newItemOffset + itemsPerPage;

    const newRecipesToDisplay = getRecipesToDisplay();

    const newPageCount = getPageCount(newRecipesToDisplay);

    setItemOffset(newItemOffset.toString());
    setPageCount(newPageCount.toString());

    setRecipesToDisplay(newRecipesToDisplay);
    setRecipesForCurrPage(
      getRecipesForCurrPage(newItemOffset, newEndOffset, newRecipesToDisplay),
    );
  }, [allRecipes]);

  // Update URL parameters when local state changes (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters({ selectedTags, pageCount, itemOffset });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [itemOffset, pageCount]);

  // Event Handlers ----------------------------------------------
  const handlePageClick = (event: { selected: number }) => {
    const newItemOffset =
      (event.selected * itemsPerPage) % recipesToDisplay.length;
    const newEndOffset = newItemOffset + itemsPerPage;

    setItemOffset(newItemOffset.toString());

    setRecipesForCurrPage(getRecipesForCurrPage(newItemOffset, newEndOffset));
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
            pageCount={Number(pageCount)}
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
