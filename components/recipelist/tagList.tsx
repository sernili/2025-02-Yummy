"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import useRecipeFilters from "@/hooks/useRecipeFilters";
import useTagStore, { RecipeTag, SelectedTagId } from "@/store/tags";

export default function TagList() {
  const { tags, selectedTagIds, setSelectedTagIds } = useTagStore();

  const [sortedTags, setLocalTags] = useState<RecipeTag[]>(
    sortTags(tags, selectedTagIds),
  );
  const [localSelectedTagIds, setLocalSelectedTagIds] =
    useState<string[]>(selectedTagIds);

  const { filters, setFilters } = useRecipeFilters();
  const [itemOffset] = useState(filters.itemOffset);

  // useLayoutEffect(() => {
  //   setLocalTags(sortTags(tags, localSelectedTagIds));
  // }, [tags]);

  // useLayoutEffect(() => {
  //   setLocalSelectedTagIds(selectedTagIds);
  // }, [selectedTagIds]);

  const handleClick = (clickedTag: RecipeTag) => {
    const newSelectedTagIds: SelectedTagId[] = localSelectedTagIds;
    const clickedTagIndex = localSelectedTagIds.indexOf(clickedTag.id);

    if (clickedTagIndex === -1) {
      newSelectedTagIds.push(clickedTag.id);
    } else {
      delete newSelectedTagIds[clickedTagIndex];
    }

    // const tagsForFilters = sortedTags.map((tag) => tag.uri).join(",");
    setLocalTags(sortTags(sortedTags, newSelectedTagIds));
    setLocalSelectedTagIds(newSelectedTagIds);
    setSelectedTagIds(newSelectedTagIds);
    // setFilters({ tags: tagsForFilters, itemOffset });
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => handleClick(tag)}
          className={`rounded-md px-4 py-1.5 text-sm shadow transition-all duration-300 hover:cursor-pointer ${
            localSelectedTagIds.includes(tag.id)
              ? "bg-primary hover:bg-primary/80 text-white"
              : "hover:bg-primary/20 text-primary bg-white hover:text-white"
          }`}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
}

// Helper Functions ----------------------------------------------

const sortTags = (tags: RecipeTag[], selectedIds: string[]) => {
  const selectedTags = tags.filter((tag) => selectedIds.includes(tag.id));
  const otherTags = tags.filter((tag) => !selectedIds.includes(tag.id));

  const sortedSelectedTags = selectedTags.sort((a, b) =>
    a.label.localeCompare(b.label),
  );
  const sortedOtherTags = otherTags.sort((a, b) =>
    a.label.localeCompare(b.label),
  );

  // return [
  //   ...filterEmptyString(sortedSelectedTags),
  //   ...filterEmptyString(sortedOtherTags),
  // ];

  return [...sortedSelectedTags, ...sortedOtherTags];
};
