"use client";

import useStore from "@/store/global";

export default function Logo() {
  const { showNavbar } = useStore();
  const logoRef = showNavbar ? "/" : "/recipelist";

  return (
    <>
      <a href={logoRef} className="text-primary font-logo text-4xl">
        Yummy!
      </a>
    </>
  );
}
