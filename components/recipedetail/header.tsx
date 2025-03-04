import { Recipe } from "@store/recipes";

export default function Header({ recipe }: { recipe: Recipe }) {
  return (
    <div
      style={{ backgroundImage: `url('${recipe.imageURL || ""}')` }}
      className="my-4 flex h-[clamp(30rem,_30vh,_60vh)] flex-col justify-end space-y-16 overflow-hidden rounded-xl bg-cover bg-center p-6 text-white shadow"
    >
      <div className="space-y-2">
        <h1 className="font-serif text-[clamp(3rem,_6vw,_6rem)] leading-none">
          {recipe.title}
        </h1>
        <p className="text-md">{recipe.description}</p>
      </div>
      <p className="flex flex-wrap gap-2 text-sm">
        {recipe.cookingTime && (
          <span className="flex-none after:ml-2 after:content-['|'] last:after:content-none">
            Dauer: {recipe.cookingTime.number + " " + recipe.cookingTime.unit}
          </span>
        )}

        {recipe.people && (
          <span className="flex-none after:ml-2 after:content-['|'] last:after:content-none">
            Personen: {recipe.people}
          </span>
        )}
      </p>
    </div>
  );
}
