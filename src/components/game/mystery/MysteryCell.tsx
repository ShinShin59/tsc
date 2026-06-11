import { ElementCell } from "@/components/game/ElementCell";
import { getElement } from "@/data/elements";
import { isMysteryCellRevealed } from "@/lib/rules";
import { useGameStore } from "@/store/game";

export function MysteryCell() {
  const roundStatus = useGameStore((state) => state.roundStatus);
  const mysteryNumber = useGameStore((state) => state.mysteryNumber);
  const element = getElement(mysteryNumber);
  const revealed = isMysteryCellRevealed(roundStatus) && element;
  const displayElement = revealed ? element : undefined;
  const ariaLabel = displayElement
    ? `Élément mystère : ${displayElement.name} (${displayElement.symbol})`
    : "Élément mystère";

  if (!displayElement) {
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
      <ElementCell element={displayElement} />
    </div>
  );
}
