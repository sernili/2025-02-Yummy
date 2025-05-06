import { Tag } from "@/store/recipes";

export default function Tags({ tags }: { tags: Tag[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <button
          key={tag}
          className="bg-primary hover:bg-primary/80 rounded-md px-4 py-1.5 text-sm text-white shadow transition-all duration-300 hover:cursor-pointer"
        >
          {tag}
        </button>
      ))}
      {/* <button className="hover:bg-primary/20 text-primary rounded-md bg-white px-4 py-1.5 text-sm shadow transition-all duration-300 hover:cursor-pointer hover:text-white">
        +
      </button> */}
    </div>
  );
}
