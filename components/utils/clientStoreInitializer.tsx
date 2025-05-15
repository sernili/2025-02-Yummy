"use client";

import { useEffect } from "react";
import useRecipeStore, { Recipe } from "@/store/recipes";
import useTagStore, { RecipeTag } from "@/store/tags";

interface Props {
  initialRecipes: Recipe[];
  initialTags: RecipeTag[];
  children: React.ReactNode;
}

const ClientStoreInitializer: React.FC<Props> = ({
  initialRecipes,
  initialTags,
  children,
}) => {
  const { setInitialRecipes } = useRecipeStore();
  const { setInitialTags: setInitialRecipeTags } = useTagStore();

  useEffect(() => {
    if (initialRecipes && initialRecipes.length > 0) {
      setInitialRecipes(initialRecipes);
    }
  }, [initialRecipes, setInitialRecipes]);

  useEffect(() => {
    if (initialTags && initialTags.length > 0) {
      setInitialRecipeTags(initialTags);
    }
  }, [initialTags, setInitialRecipeTags]);

  return <>{children}</>;
};

export default ClientStoreInitializer;
