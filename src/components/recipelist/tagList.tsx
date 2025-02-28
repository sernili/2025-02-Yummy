"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import useStore from "../../store/recipes";
import useRecipeFilters from "@/app/hooks/useRecipeFilters";

export default function TagList() {
  const { recipes, updateRecipeDisplaySettings } = useStore();

  const { filters, setFilters } = useRecipeFilters();

  const [selectedTags, setSelectedTags] = useState(filters.tags.split(","));
  const [itemOffset] = useState(filters.itemOffset);

  const [allTags, setAllTags] = useState<string[]>([]);

  // TODO: make tags/ recipes persistent?
  useLayoutEffect(() => {
    const alltags = sortTags(getTagsFromRecipes(), selectedTags);
    setAllTags(alltags);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const tags: string = selectedTags.join(",");

      setFilters({ tags, itemOffset });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [selectedTags]);

  const handleClick = (clickedTag: string) => {
    const newSelectedTags = getNewSelectedTags(clickedTag);

    updateRecipeDisplaySettings(newSelectedTags);

    setSelectedTags(newSelectedTags);
    setAllTags(sortTags(allTags, newSelectedTags));
  };

  // Helper Functions ----------------------------------------------

  const getTagsFromRecipes = () => {
    const allTagNames = recipes
      .map((recipe) => recipe.tags)
      .flat()
      .filter((tag): tag is string => tag != undefined);

    const uniqueTagNames = [...new Set(allTagNames)];

    return uniqueTagNames;
  };

  const sortTags = (allTags: string[], selectedTags: string[]) => {
    const notSelectedTags = allTags.filter(
      (tag: string) => !selectedTags.includes(tag),
    );

    const sortedSelectedTags = selectedTags.sort((a, b) => a.localeCompare(b));
    const sortedOtherTags = notSelectedTags.sort((a, b) => a.localeCompare(b));

    return [
      ...filterEmptyString(sortedSelectedTags),
      ...filterEmptyString(sortedOtherTags),
    ];
  };

  const getNewSelectedTags = (clickedTag: string) => {
    if (selectedTags.includes(clickedTag)) {
      return selectedTags.filter((tag) => tag !== clickedTag);
    }

    return [...filterEmptyString(selectedTags), clickedTag];
  };

  const filterEmptyString = (array: string[]) =>
    array.filter((element) => element !== "");

  return (
    <div className="flex flex-wrap gap-1.5">
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleClick(tag)}
          className={`rounded-md px-4 py-1.5 text-sm shadow transition-all duration-300 hover:cursor-pointer ${
            selectedTags.includes(tag)
              ? "bg-primary hover:bg-primary/80 text-white"
              : "hover:bg-primary/20 text-primary bg-white hover:text-white"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
