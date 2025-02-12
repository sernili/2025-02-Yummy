"use client";

import { useState } from "react";

// TODO: move all type definitions to a separate file?
export type Tag = {
  label: string;
  value: string;
  selected: boolean; // multiple tags can be selected
};

interface TagsProps {
  initialTags: Tag[];
  onTagsUpdate: (updatedTags: Tag[]) => void;
}

export default function TagList() {
  const sortTags = (tags: Tag[]): Tag[] => {
    return [...tags].sort(
      (a, b) => (b.selected ? 1 : -1) - (a.selected ? 1 : -1),
    );
  };

  const initialTags: Tag[] = [
    { label: "Tag1", value: "tag1", selected: true },
    { label: "Tag2", value: "tag2", selected: true },
    { label: "Tag3", value: "tag3", selected: false },
    { label: "Tag4", value: "tag4", selected: false },
    { label: "Tag5", value: "tag5", selected: true },
    { label: "Tag6", value: "tag6", selected: false },
  ];

  // TODO: sort tags alphabetically among sorted vs. not sorted
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
          className={`rounded-xl border px-4 py-1.5 text-sm hover:cursor-pointer ${
            tag.selected
              ? "bg-primary border-primary text-white"
              : "text-primary border-primary hover:bg-primary bg-white hover:text-white"
          }`}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
}
