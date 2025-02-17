import banner from "@public/banner.png";
import Image from "next/image";
import { headers } from "next/headers";

type TitlesMap = {
  [key: string]: string;
};

export default async function Banner() {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path") || "/";

  const titlesMap: TitlesMap = {
    "/": "Home",
    "/recipelist": "Rezepte",
    "/planner": "Planner",
    "/templates": "Templates",
    "/list": "Einkaufsliste",
  };

  return (
    <div className="relative my-4 max-h-96 overflow-hidden rounded-4xl">
      <Image
        src={banner}
        alt="banner"
        className="max-h-96 w-full overflow-hidden rounded-4xl object-cover object-center"
        priority
      />
      <h1 className="absolute bottom-6 left-6 font-serif text-9xl text-white">
        {titlesMap[pathname]}
      </h1>
    </div>
  );
}
