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

  const filters = useMemo(() => {
    console.log("MEMO: ", searchParams.get("itemOffset"));

    return {
      tags: searchParams.get("tags") || "",
      itemOffset: searchParams.get("itemOffset") || "0",
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (newFilters: RecipeFilters) => {
      const currentParams = new URLSearchParams(searchParams.toString());
      console.log("SET FILTERS: ", searchParams.toString());
      console.log("NEW FILTERS: ", newFilters);

      Object.entries(newFilters).forEach(([key, value]) => {
        console.log("KEY: ", key);
        console.log("VALUE: ", value);

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
