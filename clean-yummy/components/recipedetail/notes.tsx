import type { Notes } from "@/store/recipes";

export default function Notes({ notes }: { notes: Notes }) {
  return (
    <div className="space-y-4 rounded-lg bg-white p-6 shadow-lg">
      <h2 className="text-primary font-serif text-4xl">Notizen</h2>
      <p className="text-tertiary list-inside list-decimal">{notes}</p>
    </div>
  );
}
