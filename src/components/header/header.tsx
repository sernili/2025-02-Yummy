export default function Header() {
  return (
    <>
      <div className="p-4 justify-between items-center flex">
        <a href="/" className="text-primary text-4xl font-logo">
          Yummy!
        </a>
        <div className="flex justify-between items-center gap-4">
          <a
            href="/recipes"
            className="text-black no-underline px-4 py-2 hover:text-white selected:text-white hover:bg-primary hover:rounded-full selected:bg-primary selected: rounded-full"
          >
            Rezepte
          </a>
          <a
            href="/planner"
            className="text-black no-underline px-4 py-2 hover:text-white selected:text-white hover:bg-primary hover:rounded-full selected:bg-primary selected: rounded-full"
          >
            Planner
          </a>
          <a
            href="/templates"
            className="text-black no-underline px-4 py-2 hover:text-white selected:text-white hover:bg-primary hover:rounded-full selected:bg-primary selected: rounded-full"
          >
            Templates
          </a>
          <a
            href="/list"
            className="text-black no-underline px-4 py-2 hover:text-white selected:text-white hover:bg-primary hover:rounded-full selected:bg-primary selected: rounded-full"
          >
            Einkaufsliste
          </a>
        </div>
      </div>
    </>
  );
}
