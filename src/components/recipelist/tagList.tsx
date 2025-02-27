"use client";

import { useEffect } from "react";
import useStore, { Tag } from "../../store/recipes";

export default function TagList() {
  const {
    tags,
    getTagsFromRecipes,
    updateRecipeDisplaySettings,
    sortTags,
    updateTag,
  } = useStore();

  useEffect(() => {
    getTagsFromRecipes();
  }, []);

  useEffect(() => {
    updateRecipeDisplaySettings();
  }, [tags]);

  const handleClick = (clickedTag: Tag) => {
    updateTag(clickedTag);
    sortTags();
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag: Tag) => (
        <button
          key={tag.value}
          onClick={() => handleClick(tag)}
          className={`rounded-xl px-4 py-1.5 text-sm shadow transition-all duration-300 hover:cursor-pointer ${
            tag.selected
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
