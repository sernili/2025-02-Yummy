"use client";

import { useState } from "react";

export type Tag = {
  label: string;
  value: string;
  selected: boolean; // multiple tags can be selected
};

export default function TagList() {
  const sortTags = (allTags: Tag[]) => {
    const selectedTags = allTags.filter((tag) => tag.selected);
    selectedTags.sort((a, b) => a.label.localeCompare(b.label));

    const otherTags = allTags.filter((tag) => !tag.selected);
    otherTags.sort((a, b) => a.label.localeCompare(b.label));

    return [...selectedTags, ...otherTags];
  };

  const initialTags: Tag[] = [
    { label: "Frühstück", value: "breakfast", selected: true },
    { label: "Salat", value: "salad", selected: true },
    { label: "Fleisch", value: "meat", selected: false },
    { label: "Backen", value: "baking", selected: false },
    { label: "Vegetarisch", value: "vegetarian", selected: true },
    { label: "Vegan", value: "vegan", selected: false },
  ];

  const [tags, setTags] = useState<Tag[]>(sortTags(initialTags));

  const handleClick = (clickedTag: Tag) => {
    const updatedTags = tags.map((tag) =>
      tag.value === clickedTag.value
        ? { ...tag, selected: !tag.selected }
        : tag,
    );
    setTags(sortTags(updatedTags));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag.value}
          onClick={() => handleClick(tag)}
          className={`rounded-xl px-4 py-1.5 text-sm shadow transition-all duration-300 hover:cursor-pointer ${
            tag.selected
              ? "bg-primary hover:bg-primary/80 text-white"
              : "hover:bg-primary/20 bg-white text-black hover:text-white"
          }`}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
}
