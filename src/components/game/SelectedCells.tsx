import type { CSSProperties } from "react";
import { getElement } from "@/data/elements";
import { isMysterySlotRevealed, resolveDisplayNumber } from "@/lib/rules";
import { resolvePaletteAppearance } from "@/palette/index";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game";
import { ElementCell } from "./ElementCell";
import {
  SELECTED_CELL_SCALE,
  SELECTED_CELL_SIZE,
  TABLE_CELL_SIZE,
} from "./const";

export function SelectedCell() {
  const hoveredNumber = useGameStore((state) => state.hoveredNumber);
  const committedNumber = useGameStore((state) => state.committedNumber);

  const displayNumber = resolveDisplayNumber({ hoveredNumber, committedNumber });
  const element = displayNumber ? getElement(displayNumber) : undefined;

  return (
    <div
      style={{ width: SELECTED_CELL_SIZE, height: SELECTED_CELL_SIZE }}
      aria-label={element ? `Élément sélectionné : ${element.name}` : "Aucun élément sélectionné"}
    >
      {element ? (
        <div className="size-full">
          <div
            className="origin-top-left"
            style={
              {
                width: TABLE_CELL_SIZE,
                height: TABLE_CELL_SIZE,
                transform: `scale(${SELECTED_CELL_SCALE})`,
                "--cell-size": `${TABLE_CELL_SIZE}px`,
              } as CSSProperties
            }
          >
            <ElementCell
              element={element}
              selected
              className="cursor-default hover:brightness-100"
            />
          </div>
        </div>
      ) : (
        <div className="flex size-full items-center justify-center rounded-sm border-white/40 text-2xl font-bold text-white/50" />
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
        className="flex items-center justify-center rounded-sm border-2 border-accent bg-transparent"
        style={{ width: SELECTED_CELL_SIZE, height: SELECTED_CELL_SIZE }}
        aria-label="Élément mystère"
      >
        <span className="text-7xl font-bold leading-none text-accent">?</span>
      </div>
    );
  }

  const { backgroundColor, textClass } = resolvePaletteAppearance(element);

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
