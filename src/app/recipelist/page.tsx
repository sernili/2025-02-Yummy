import TagList from "@components/tags"; // TODO: find way to generalize import
import RecipeListCard from "../../components/recipeListCard";

export default function Page() {
  return (
    <div className="bg-secondary min-h-screen space-y-4 overflow-hidden py-6">
      <TagList />
      <RecipeListCard />
    </div>
  );
}
