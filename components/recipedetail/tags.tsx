import { RecipeTag } from "@/store/tags";

export default function Tags({ tags }: { tags: RecipeTag[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <button
          key={tag.id}
          className="bg-primary rounded-md px-4 py-1.5 text-sm text-white shadow transition-all duration-300 hover:cursor-default"
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
}
