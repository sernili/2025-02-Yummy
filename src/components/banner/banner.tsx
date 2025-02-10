import banner from "../../../public/banner.png";
import Image from "next/image";
import { headers } from "next/headers";

type TitlesMap = {
  [key: string]: string;
};

export default function Banner() {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const titlesMap: TitlesMap = {
    "/": "Home",
    "/recipes": "Rezepte",
    "/planner": "Planner",
    "/templates": "Templates",
    "/list": "Einkaufsliste",
  };

  return (
    <div className="m-4 max-h-96 rounded-4xl overflow-hidden relative">
      <Image
        src={banner}
        alt="banner"
        className="object-cover max-h-96 w-full object-center rounded-4xl overflow-hidden"
        priority
      />
      <h1 className="text-9xl font-serif text-white absolute bottom-6 left-6">
        {titlesMap[pathname]}
      </h1>
    </div>
  );
}
