import type { Steps } from "@/store/recipes";

export default function Steps({ steps }: { steps: Steps[] }) {
  return (
    <div className="h-full space-y-4 rounded-lg bg-white p-6 shadow-lg">
      <h2 className="text-primary font-serif text-4xl">Schritte</h2>
      <ol className="text-tertiary list-inside list-decimal">
        {steps.map((step, index) => (
          <li key={index} className="p-2">
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
