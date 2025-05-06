"use client";

import { useEffect } from "react";
import useStore from "@/store/recipes";
import { Recipe } from "@/store/recipes";

interface Props {
  initialRecipes: Recipe[];
  children: React.ReactNode;
}

const ClientStoreInitializer: React.FC<Props> = ({
  initialRecipes,
  children,
}) => {
  const { setInitialRecipes } = useStore();

  useEffect(() => {
    if (initialRecipes && initialRecipes.length > 0) {
      setInitialRecipes(initialRecipes);
    }
  }, [initialRecipes, setInitialRecipes]);

  return <>{children}</>;
};

export default ClientStoreInitializer;
