import Banner from "@/components/global/banner";
import { PaginatedRecipeList } from "@/components/recipelist/paginatedList";
import TagList from "@/components/recipelist/tagList";

export default function Page() {
  return (
    <>
      <Banner />
      <div className="bg-secondary space-y-12 overflow-hidden py-6">
        <TagList />

        <div className="space-y-6">
          <PaginatedRecipeList itemsPerPage={6} />
        </div>
      </div>
    </>
  );
}
