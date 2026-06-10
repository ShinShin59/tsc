import type { CSSProperties } from "react";
import { elements } from "@/data/elements";
import { canCommit, resolveDisplayNumber } from "@/lib/rules";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game";
import { TABLE_CELL_SIZE } from "./const";
import { ElementCell } from "./ElementCell";

type PeriodicTableProps = {
  className?: string;
};

export function PeriodicTable({ className }: PeriodicTableProps) {
  const hoveredNumber = useGameStore((state) => state.hoveredNumber);
  const committedNumber = useGameStore((state) => state.committedNumber);
  const roundStatus = useGameStore((state) => state.roundStatus);
  const setHoveredNumber = useGameStore((state) => state.setHoveredNumber);
  const commitSelection = useGameStore((state) => state.commitSelection);
  const spacer = Math.round(TABLE_CELL_SIZE * 0.06);

  const highlightedNumber = resolveDisplayNumber({ hoveredNumber, committedNumber });

  return (
    <div className={cn("overflow-auto px-2 py-2", className)}>
      <div
        className="mx-auto grid w-fit gap-px"
        onMouseLeave={() => setHoveredNumber(null)}
        style={
          {
            "--cell-size": `${TABLE_CELL_SIZE}px`,
            gridTemplateColumns: "repeat(18, var(--cell-size))",
            gridTemplateRows: `repeat(7, var(--cell-size)) ${spacer}px repeat(2, var(--cell-size))`,
          } as CSSProperties
        }
      >
        {elements.map((el) => (
          <div key={el.number} style={{ gridColumn: el.xpos, gridRow: el.ypos }}>
            <ElementCell
              element={el}
              selected={el.number === highlightedNumber}
              onMouseEnter={() => setHoveredNumber(el.number)}
              onClick={() => {
                if (canCommit(roundStatus)) {
                  commitSelection(el.number);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
