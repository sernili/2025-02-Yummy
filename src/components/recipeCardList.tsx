"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  // Getters and Constants ----------------------------------------------

  const DEFAULT_ITEM_OFFSET = 0;

  const getPageCount = (newRecipesToDisplay: Recipe[]) =>
    Math.ceil(newRecipesToDisplay.length / itemsPerPage);

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

  const { recipes: allRecipes, updateRecipeDisplaySettings } = useStore();

  const [recipesToDisplay, setRecipesToDisplay] = useState<Recipe[]>(
    getRecipesToDisplay(getSortedRecipes(allRecipes)),
  );
  const [recipesForCurrPage, setRecipesForCurrPage] = useState<Recipe[]>([]);

  // Filter and Pagination Info ----------------------------------------------

  const { filters, setFilters } = useRecipeFilters();

  const [selectedTags] = useState(filters.selectedTags);
  const [itemOffset, setItemOffset] = useState(filters.itemOffset);

  const [pageCount, setPageCount] = useState(getPageCount(recipesToDisplay));
  const prevSelectedTags = useRef(selectedTags);

  // Side Effects ----------------------------------------------

  useEffect(() => {
    updatePaginationLogic(Number(itemOffset));
  }, []);

  useEffect(() => {
    // deep compare selectedTags to keep initial itemOffset when selectedTags change initially
    if (selectedTags !== prevSelectedTags.current) {
      updatePaginationLogic(DEFAULT_ITEM_OFFSET);
      prevSelectedTags.current = selectedTags;
    }
  }, [selectedTags]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters({ selectedTags, itemOffset });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [itemOffset]);

  // Event Handlers ----------------------------------------------

  const handlePageClick = (event: { selected: number }) => {
    const newItemOffset =
      (event.selected * itemsPerPage) % recipesToDisplay.length;
    const newEndOffset = newItemOffset + itemsPerPage;

    setItemOffset(newItemOffset.toString());
    setRecipesForCurrPage(getRecipesForCurrPage(newItemOffset, newEndOffset));
  };

  const updatePaginationLogic = (newItemOffset: number) => {
    const newRecipesToDisplay = getRecipesToDisplay(allRecipes);

    const newPageCount = getPageCount(newRecipesToDisplay);
    const maxItemOffset = newPageCount - 1;

    const correctedItemOffset =
      newItemOffset > maxItemOffset ? maxItemOffset : newItemOffset;

    const newEndOffset = correctedItemOffset + itemsPerPage;

    const newRecipesForCurrPage = getRecipesForCurrPage(
      correctedItemOffset,
      newEndOffset,
      newRecipesToDisplay,
    );

    console.log(newPageCount);
    console.log(correctedItemOffset);

    setItemOffset(correctedItemOffset.toString());
    setPageCount(newPageCount);
    setRecipesToDisplay(newRecipesToDisplay);
    setRecipesForCurrPage(newRecipesForCurrPage);
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
            initialPage={Number(itemOffset)}
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
