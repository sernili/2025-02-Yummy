import RecipeCard from "@/components/recipedetail/card";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return slug && <RecipeCard slug={slug} />;
}
