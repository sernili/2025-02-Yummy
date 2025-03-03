import RecipeCard from "@/components/recipedetail/card";

type Params = Promise<{ slug: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  return <RecipeCard slug={slug} />;
};

export default Page;
