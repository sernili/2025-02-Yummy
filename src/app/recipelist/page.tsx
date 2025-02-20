import TagList from "@components/tagList";
import RecipeCardList from "@components/recipeCardList";
import { PaginatedItems } from "@components/recipeCardList";

export default function Page() {
  // TODO: get selected value from localStorage

  // const { recipes } = useStore();

  return (
    <div className="bg-secondary min-h-screen space-y-12 overflow-hidden py-6">
      <TagList />

      <div className="space-y-6">
        <PaginatedItems itemsPerPage={4} />
      </div>
    </div>
  );
}
