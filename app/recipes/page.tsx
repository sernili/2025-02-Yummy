import Banner from "@components/global/banner";
import { PaginatedRecipeList } from "@components/recipelist/paginatedList";
import TagList from "@components/recipelist/tagList";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <Banner />
      <div className="bg-secondary space-y-12 overflow-hidden py-6">
        <Suspense fallback={<div>Loading...</div>}>
          <TagList />

          <div className="space-y-6">
            <PaginatedRecipeList itemsPerPage={6} />
          </div>
        </Suspense>
      </div>
    </>
  );
}
