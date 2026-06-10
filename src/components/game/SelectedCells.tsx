import type { CSSProperties } from "react";
import { getElement } from "@/data/elements";
import { isMysterySlotRevealed, resolveDisplayNumber } from "@/lib/rules";
import { resolvePaletteAppearance } from "@/palette/index";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game";
import { ElementCell } from "./ElementCell";

const slotClassName = "size-16 shrink-0 sm:size-20 md:size-24";

export function SelectedCell() {
  const hoveredNumber = useGameStore((state) => state.hoveredNumber);
  const committedNumber = useGameStore((state) => state.committedNumber);

  const displayNumber = resolveDisplayNumber({ hoveredNumber, committedNumber });
  const element = displayNumber ? getElement(displayNumber) : undefined;

  return (
    <div
      className={slotClassName}
      aria-label={element ? `Élément sélectionné : ${element.name}` : "Aucun élément sélectionné"}
    >
      {element ? (
        <ElementCell
          element={element}
          selected
          className="size-full cursor-default hover:brightness-100"
          style={{ "--cell-size": "100%" } as CSSProperties}
        />
      ) : (
        <div className="flex size-full items-center justify-center rounded-sm border border-white/40 text-lg font-bold text-white/50 sm:text-xl" />
      )}
    </div>
  );
}

export function MysterySlot() {
  const roundStatus = useGameStore((state) => state.roundStatus);
  const mysteryNumber = useGameStore((state) => state.mysteryNumber);
  const element = getElement(mysteryNumber);
  const revealed = isMysterySlotRevealed(roundStatus) && element;

  if (!revealed) {
    return (
      <div
        className={cn(
          slotClassName,
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
        slotClassName,
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
