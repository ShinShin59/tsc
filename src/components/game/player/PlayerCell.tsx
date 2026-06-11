import { ElementCell } from "@/components/game/ElementCell";
import { getElement } from "@/data/elements";
import { resolveDisplayElement } from "@/lib/rules";
import { useGameStore } from "@/store/game";

export function PlayerCell() {
  const hoveredElement = useGameStore((state) => state.hoveredElement);
  const committedElement = useGameStore((state) => state.committedElement);

  const displayElement = resolveDisplayElement({ hoveredElement, committedElement });
  const element = displayElement ? getElement(displayElement) : undefined;
  const ariaLabel = element
    ? `Élément sélectionné : ${element.name}`
    : "Aucun élément sélectionné";

  if (!element) {
    return (
      <div
        className="flex size-16 shrink-0 items-center justify-center rounded-sm border-2 border-accent/30 bg-transparent sm:size-20 md:size-24"
        aria-label={ariaLabel}
      >
        <span className="text-3xl font-bold leading-none text-accent sm:text-4xl md:text-5xl">?</span>
      </div>
    );
  }

  return (
    <div className="size-16 shrink-0 sm:size-20 md:size-24" aria-label={ariaLabel}>
      <ElementCell element={element} />
    </div>
  );
}
