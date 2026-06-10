import type { CSSProperties } from "react";
import { getElement } from "@/data/elements";
import { resolveDisplayNumber } from "@/lib/rules";
import { useGameStore } from "@/store/game";
import { ElementCell } from "@/components/game/ElementCell";
import { CELL_SLOT_CLASS } from "@/components/game/shared/cellSlot";

export function PlayerCell() {
  const hoveredNumber = useGameStore((state) => state.hoveredNumber);
  const committedNumber = useGameStore((state) => state.committedNumber);

  const displayNumber = resolveDisplayNumber({ hoveredNumber, committedNumber });
  const element = displayNumber ? getElement(displayNumber) : undefined;

  return (
    <div
      className={CELL_SLOT_CLASS}
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
