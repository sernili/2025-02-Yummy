"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import useStore, { Recipe, Tag } from "@/store/recipes";
import useRecipeFilters from "@/hooks/useRecipeFilters";

export default function TagList() {
  const { recipes, tags, setTags } = useStore();
  const [localTags, setLocalTags] = useState<Tag[]>([]);

  const { filters, setFilters } = useRecipeFilters();
  const [itemOffset] = useState(filters.itemOffset);

  useLayoutEffect(() => {
    setLocalTags(getTagsFromRecipes(recipes));
  }, [recipes]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const tagsForFilters = localTags.map((tag) => tag.key).join(",");

      setTags(localTags);
      setFilters({ tags: tagsForFilters, itemOffset });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [localTags]);

  const handleClick = (clickedTag: Tag) => {
    const updatedTags: Tag[] = localTags;

    updatedTags.map((tag) => {
      if (tag.key === clickedTag.key) {
        !tag.selected;
      }
    });

    setLocalTags(updatedTags);

    // setClickedTags([...clickedTags, clickedTag]);

    // updateRecipeDisplaySettings(clickedTag);

    // const match = clickedTags.find((tag) => tag.key === clickedTag.key);

    // const updatedClickedTag = clickedTag;
    // const updatedClickedTags = clickedTags;
    // const otherTags = [];

    // if (match) {
    //   otherTags = cli;
    //   updatedClickedTag.selected = !match.selected;
    // }

    // setClickedTags([...clickedTags]);

    // const newSelectedTags = getNewSelectedTags(clickedTag);

    // updateRecipeDisplaySettings(newSelectedTags);

    // setSelectedTags(newSelectedTags);
    // setAllTags(sortTags(allTags, newSelectedTags));
  };

  // Helper Functions ----------------------------------------------

  const getTagsFromRecipes = (recipes: Recipe[]) => {
    const allTags = recipes
      .map((recipe) => recipe.tags)
      .flat()
      .filter((tag): tag is Tag => tag != undefined);

    const uniqueTags = getUniqueTags(allTags);
    const sortedTags = sortTags(uniqueTags);

    return sortedTags;
  };

  const getUniqueTags = (tags: Tag[]) => {
    const uniqueTags: Tag[] = [];

    tags.forEach((currentTag) => {
      const match = uniqueTags.find(
        (uniqueTag) => uniqueTag.name == currentTag.name,
      );

      if (match) {
        const matchIndex = uniqueTags.findIndex(
          (uniqueTag) => uniqueTag.name == currentTag.name,
        );
        const selected = match.selected || currentTag.selected; // choose true if either one is true

        uniqueTags.splice(matchIndex, 1, {
          ...match,
          selected: selected,
        });
      } else {
        uniqueTags.push(currentTag);
      }
    });

    return uniqueTags;
  };

  const sortTags = (tags: Tag[]) => {
    const selectedTags = tags.filter((tag) => tag.selected);
    const otherTags = tags.filter((tag) => !tag.selected);

    const sortedSelectedTags = selectedTags.sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    const sortedOtherTags = otherTags.sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    // return [
    //   ...filterEmptyString(sortedSelectedTags),
    //   ...filterEmptyString(sortedOtherTags),
    // ];

    return [...sortedSelectedTags, ...sortedOtherTags];
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <button
          key={tag.key}
          onClick={() => handleClick(tag)}
          className={`rounded-md px-4 py-1.5 text-sm shadow transition-all duration-300 hover:cursor-pointer ${
            tag.selected
              ? "bg-primary hover:bg-primary/80 text-white"
              : "hover:bg-primary/20 text-primary bg-white hover:text-white"
          }`}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
}
