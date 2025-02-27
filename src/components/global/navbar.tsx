"use client";

import useStore from "@/store/global";

export default function Navbar() {
  const { showNavbar } = useStore();

  return (
    <>
      {showNavbar && (
        <div className="flex items-center justify-between gap-4">
          <a
            href="/recipelist"
            className="selected:text-white hover:bg-primary selected:bg-primary selected: rounded-full px-4 py-2 text-black no-underline hover:rounded-full hover:text-white"
          >
            Rezepte
          </a>
          <a
            href="/planner"
            className="selected:text-white hover:bg-primary selected:bg-primary selected: rounded-full px-4 py-2 text-black no-underline hover:rounded-full hover:text-white"
          >
            Planner
          </a>
          <a
            href="/templates"
            className="selected:text-white hover:bg-primary selected:bg-primary selected: rounded-full px-4 py-2 text-black no-underline hover:rounded-full hover:text-white"
          >
            Templates
          </a>
          <a
            href="/shoppinglist"
            className="selected:text-white hover:bg-primary selected:bg-primary selected: rounded-full px-4 py-2 text-black no-underline hover:rounded-full hover:text-white"
          >
            Einkaufsliste
          </a>
        </div>
      )}
    </>
  );
}
