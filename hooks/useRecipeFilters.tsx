"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export type RecipeFilters = {
  tags: string;
  itemOffset: string;
};

const useRecipeFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => ({
      tags: searchParams.get("tags") || "",
      itemOffset: searchParams.get("itemOffset") || "0",
    }),
    [searchParams],
  );

  const setFilters = useCallback(
    (newFilters: RecipeFilters) => {
      const currentParams = new URLSearchParams(searchParams.toString());

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

export default useRecipeFilters;
