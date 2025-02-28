import { PaginatedRecipeList } from "@/components/recipelist/paginatedList";
import TagList from "@/components/recipelist/tagList";

export default function Page() {
  // TODO: get selected value from localStorage/url

  return (
    <div className="bg-secondary min-h-screen space-y-12 overflow-hidden py-6">
      <TagList />

      <div className="space-y-6">
        <PaginatedRecipeList itemsPerPage={6} />
      </div>
    </div>
  );
}
