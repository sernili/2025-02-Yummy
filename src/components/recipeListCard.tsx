import Image from "next/image";

export default function RecipeListCard() {
  return (
    <div className="flex items-center justify-start gap-10 rounded-2xl bg-white shadow-lg">
      <Image
        src="https://picsum.photos/500/400"
        alt="recipephoto"
        className="h-[10rem] w-auto rounded-l-2xl"
        width={300}
        height={300}
      />
      <div className="flex flex-col gap-6 p-4">
        <div className="space-y-1">
          <h2 className="text-primary font-serif text-4xl">Recipe Name</h2>
          <p className="text-primary">Description</p>
        </div>
        <div className="text-tertiary flex items-center gap-4">
          <p>Tags</p> | <p>Zeit</p> | <p>Pers onen</p>
        </div>
      </div>
    </div>
  );
}
