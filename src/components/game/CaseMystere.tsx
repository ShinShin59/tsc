import { getElement } from "@/data/elements";
import { cellAppearance } from "@/palette/famille";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game";
import { SELECTED_CELL_SIZE } from "./constants";

export function CaseMystere() {
  const partieStatus = useGameStore((state) => state.partieStatus);
  const mysteryNumber = useGameStore((state) => state.mysteryNumber);
  const element = getElement(mysteryNumber);
  const revealed = partieStatus !== "playing" && element;

  if (!revealed) {
    return (
      <div
        className="flex items-center justify-center rounded-sm border-2 border-accent bg-transparent"
        style={{ width: SELECTED_CELL_SIZE, height: SELECTED_CELL_SIZE }}
        aria-label="Élément mystère"
      >
        <span className="text-7xl font-bold leading-none text-accent">?</span>
      </div>
    );
  }

  const { backgroundColor, textClass } = cellAppearance(element.category);

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-sm border-2 border-black/20",
        textClass,
      )}
      style={{
        width: SELECTED_CELL_SIZE,
        height: SELECTED_CELL_SIZE,
        backgroundColor,
      }}
      aria-label={`Élément mystère : ${element.name} (${element.symbol})`}
    >
      <span className="text-7xl font-bold leading-none">{element.symbol}</span>
    </div>
  );
}
