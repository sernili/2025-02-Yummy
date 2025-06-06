"use client";

import banner from "@/public/banner.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

type TitlesMap = {
  [key: string]: string;
};

export default function Banner() {
  const pathname = usePathname();

  const titlesMap: TitlesMap = {
    "/": "Home",
    "/recipes": "Rezepte",
    "/planner": "Planner",
    "/templates": "Templates",
    "/list": "Einkaufsliste",
  };

  return (
    <div className="relative my-4 max-h-96 overflow-hidden rounded-xl">
      <Image
        src={banner}
        alt="banner"
        className="max-h-96 w-full overflow-hidden rounded-xl object-cover object-center"
        priority
      />
      <h1 className="absolute bottom-[min(.05rem,_8%)] left-[min(1rem,_8%)] font-serif text-[clamp(3rem,_12vw,_10rem)] text-white">
        {titlesMap[pathname] || ""}
      </h1>
    </div>
  );
}
