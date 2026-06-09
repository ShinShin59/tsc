import type { CSSProperties } from "react";
import { elements, PLACEHOLDER_CELLS } from "@/data/elements";
import { cellAppearance } from "@/palette/famille";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game";
import { TABLE_CELL_SIZE } from "./constants";
import { ElementCell } from "./ElementCell";
import { PlaceholderCell } from "./PlaceholderCell";

type PeriodicTableProps = {
  className?: string;
};

export function PeriodicTable({ className }: PeriodicTableProps) {
  const hoveredNumber = useGameStore((state) => state.hoveredNumber);
  const committedNumber = useGameStore((state) => state.committedNumber);
  const setHoveredNumber = useGameStore((state) => state.setHoveredNumber);
  const commitSelection = useGameStore((state) => state.commitSelection);
  const spacer = Math.round(TABLE_CELL_SIZE * 0.06);

  const highlightedNumber = hoveredNumber ?? committedNumber;

  return (
    <div className={cn("overflow-x-auto p-4", className)}>
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
              onClick={() => commitSelection(el.number)}
            />
          </div>
        ))}
        {PLACEHOLDER_CELLS.map(({ xpos, ypos, category, ...cell }) => (
          <PlaceholderCell
            key={cell.subtitle}
            {...cell}
            {...cellAppearance(category)}
            style={{ gridColumn: xpos, gridRow: ypos }}
          />
        ))}
      </div>
    </div>
  );
}
