import type { CSSProperties } from "react";
import { getElement } from "@/data/elements";
import { useGameStore } from "@/store/game";
import {
  SELECTED_CELL_SCALE,
  SELECTED_CELL_SIZE,
  TABLE_CELL_SIZE,
} from "./constants";
import { ElementCell } from "./ElementCell";

export function SelectedCell() {
  const lastSelected = useGameStore((state) => state.lastSelected);
  const element = lastSelected ? getElement(lastSelected) : undefined;

  return (
    <div
      className=""
      style={{ width: SELECTED_CELL_SIZE, height: SELECTED_CELL_SIZE }}
      aria-label={element ? `Élément sélectionné : ${element.name}` : "Aucun élément sélectionné"}
    >
      {element ? (
        <div
          key={element.number}
          className="size-full animate-in fade-in zoom-in-95 duration-200"
        >
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
        <div className="flex size-full items-center justify-center rounded-sm border border-dashed border-white/40 text-2xl font-bold text-white/50">
          ?
        </div>
      )}
    </div>
  );
}
