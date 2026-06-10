import { getElement } from "@/data/elements";
import { isMysteryCellRevealed } from "@/lib/rules";
import { resolvePaletteAppearance } from "@/palette/index";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game";
import { CELL_SLOT_CLASS } from "@/components/game/shared/cellSlot";

export function MysteryCell() {
  const roundStatus = useGameStore((state) => state.roundStatus);
  const mysteryNumber = useGameStore((state) => state.mysteryNumber);
  const element = getElement(mysteryNumber);
  const revealed = isMysteryCellRevealed(roundStatus) && element;

  if (!revealed) {
    return (
      <div
        className={cn(
          CELL_SLOT_CLASS,
          "flex items-center justify-center rounded-sm border-2 border-accent bg-transparent",
        )}
        aria-label="Élément mystère"
      >
        <span className="text-3xl font-bold leading-none text-accent sm:text-4xl md:text-5xl">?</span>
      </div>
    );
  }

  const { backgroundColor, textClass } = resolvePaletteAppearance(element);

  return (
    <div
      className={cn(
        CELL_SLOT_CLASS,
        "flex items-center justify-center rounded-sm border-2 border-black/20",
        textClass,
      )}
      style={{ backgroundColor }}
      aria-label={`Élément mystère : ${element.name} (${element.symbol})`}
    >
      <span className="text-3xl font-bold leading-none sm:text-4xl md:text-5xl">{element.symbol}</span>
    </div>
  );
}
