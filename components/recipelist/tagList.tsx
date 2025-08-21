"use client";

import { useEffect, useState } from "react";
import useRecipeFilters from "@/hooks/useRecipeFilters";
import useTagStore, { RecipeTag, SelectedTagId } from "@/store/tags";

export default function TagList() {
  const { allTags, selectedTagIds, setSelectedTagIds } = useTagStore();

  const [sortedTags, setSortedTags] = useState<RecipeTag[]>(
    sortTags(allTags, selectedTagIds),
  );
  const [localSelectedTagIds, setLocalSelectedTagIds] =
    useState<string[]>(selectedTagIds);

  const { filters, setFilters } = useRecipeFilters();
  const [itemOffset] = useState(filters.itemOffset);

  useEffect(() => {
    setLocalSelectedTagIds(selectedTagIds);
    setSortedTags(sortTags(allTags, selectedTagIds));
  }, [selectedTagIds, allTags]);

  const handleClick = (clickedTag: RecipeTag) => {
    const alreadySelected = localSelectedTagIds.includes(clickedTag.id);
    let newSelectedTagIds: SelectedTagId[];

    if (alreadySelected) {
      newSelectedTagIds = localSelectedTagIds.filter(
        (id) => id !== clickedTag.id,
      );
    } else {
      newSelectedTagIds = [...localSelectedTagIds, clickedTag.id];
    }

    // Update URL Filter Info
    const tagsForFilters = sortedTags
      .filter((tag) => newSelectedTagIds.includes(tag.id))
      .map((tag) => tag.uri)
      .join(",");
    setFilters({ tags: tagsForFilters, itemOffset });

    console.log("newSelectedTagIds: ", newSelectedTagIds);
    console.log("localSelectedTagIds: ", localSelectedTagIds);

    // Update Selected Tag Id Lists (Locally and in Store)
    setLocalSelectedTagIds(newSelectedTagIds);
    setSelectedTagIds(newSelectedTagIds);
    setSortedTags(sortTags(allTags, newSelectedTagIds));
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {sortedTags.map((tag) => (
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

const sortTags = (allTags: RecipeTag[], selectedIds: string[]) => {
  const selectedTags = allTags.filter((tag) => selectedIds.includes(tag.id));
  const otherTags = allTags.filter((tag) => !selectedIds.includes(tag.id));

  const sortedSelectedTags = selectedTags.sort((a, b) =>
    a.label.localeCompare(b.label),
  );
  const sortedOtherTags = otherTags.sort((a, b) =>
    a.label.localeCompare(b.label),
  );

  return [...sortedSelectedTags, ...sortedOtherTags];
};
