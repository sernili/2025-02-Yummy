"use client";

import useTagStore from "@/store/tags";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

export type RecipeFilters = {
  tags: string;
  itemOffset: string;
};

const DEFAULT_ITEM_OFFSET = "0";
const DEFAULT_TAGS = "";

// TODO: fix initial Filters - take old URL from before reload!
// TODO: set initial selected Tag Ids from Filters in URL - or in State?
// TODO: fix actual filter functionality

const useRecipeFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { tags, selectedTagIds, setSelectedTagIds } = useTagStore();

  console.log("searchParams: ", searchParams.get("tags"));

  const filters = useMemo(() => {
    return {
      tags: searchParams.get("tags") || DEFAULT_TAGS,
      itemOffset: searchParams.get("itemOffset") || DEFAULT_ITEM_OFFSET,
    };
  }, [searchParams]);

  useEffect(() => {
    const selectedTagNames = filters.tags.split(",");
    const selectedTagIds = tags
      .filter((tag) => selectedTagNames.includes(tag.uri))
      .map((tag) => tag.id);

    setSelectedTagIds(selectedTagIds);
    console.log("CHANGE", filters.tags);
  }, [filters.tags]);

  const setFilters = useCallback(
    (newFilters: RecipeFilters) => {
      const currentParams = new URLSearchParams(searchParams.toString());

      console.log("newFilters: ", newFilters);

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          currentParams.set(key, value);
        } else {
          currentParams.delete(key);
        }
      });

      const search = currentParams.toString();
      const query = search ? `?${search}` : "";
      const url = `${pathname.split("?")[0]}${query}`;

      router.replace(url, { scroll: false });
    },
    [router, searchParams],
  );

  return { filters, setFilters };
};

const getCorrectedFilters = (originalFilters: RecipeFilters) => {
  // TODO: implement
};

export default useRecipeFilters;
