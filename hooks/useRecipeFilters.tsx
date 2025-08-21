"use client";

import useTagStore from "@/store/tags";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export type RecipeFilters = {
  tags: string;
  itemOffset: string;
};

const ITEM_OFFSET = "itemOffset";
const TAGS = "tags";

const DEFAULT_ITEM_OFFSET = "0";
const DEFAULT_TAGS = "";

// TODO: store itemOffset in Store to remove Filters implementation from tagList.tsx

const useRecipeFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { allTags, setSelectedTagIds } = useTagStore();

  const [filterTags, setFilterTags] = useState(
    searchParams.get("tags") || DEFAULT_TAGS,
  );
  const [filterItemOffset, setFilterItemOffset] = useState(
    searchParams.get("itemOffset") || DEFAULT_ITEM_OFFSET,
  );

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tags", filterTags);
    newParams.set("itemOffset", filterItemOffset);

    const url = `${pathname}?${newParams.toString()}`;
    router.replace(url, { scroll: false });
  }, [filterTags, filterItemOffset]);

  // Update selectedTagIds
  useEffect(() => {
    console.log("setSelectedTagIds", filterTags);

    const selectedTagNames = filterTags.split(",");

    const selectedTagIds = allTags
      .filter((tag) => selectedTagNames.includes(tag.uri))
      .map((tag) => tag.id);

    setSelectedTagIds(selectedTagIds);
  }, [filterTags, allTags]);

  const handleFilterTagChange = (newTags: string) => {
    setFilterTags(newTags);
  };

  const handleFilterItemOffsetChange = (newItemOffset: string) => {
    setFilterItemOffset(newItemOffset);
  };

  return {
    filterTags,
    filterItemOffset,
    handleFilterTagChange,
    handleFilterItemOffsetChange,
  };
};

export default useRecipeFilters;
