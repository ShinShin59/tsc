import type { CSSProperties } from "react";
import { elements } from "@/data/elements";
import { canCommit, resolveDisplayNumber } from "@/lib/rules";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game";
import {
  TABLE_CELL_MAX_SIZE,
  TABLE_COLUMNS,
  TABLE_COLUMN_GAPS,
  TABLE_LANTHANIDE_GAP_FRACTION,
  TABLE_ROW_GAPS,
  TABLE_ROW_SIZE_UNITS,
} from "./const";
import { ElementCell } from "./ElementCell";

type PeriodicTableProps = {
  className?: string;
};

const tableGridStyle = {
  "--table-cell-max": `${TABLE_CELL_MAX_SIZE}px`,
  "--cell-from-width": `calc((100cqw - ${TABLE_COLUMN_GAPS}px) / ${TABLE_COLUMNS})`,
  "--cell-from-height": `calc((100cqh - ${TABLE_ROW_GAPS}px) / ${TABLE_ROW_SIZE_UNITS})`,
  "--table-cell":
    "min(var(--table-cell-max), var(--cell-from-width), var(--cell-from-height))",
  gridTemplateColumns: "repeat(18, var(--table-cell))",
  gridTemplateRows: `repeat(7, var(--table-cell)) calc(var(--table-cell) * ${TABLE_LANTHANIDE_GAP_FRACTION}) repeat(2, var(--table-cell))`,
} as CSSProperties;

export function PeriodicTable({ className }: PeriodicTableProps) {
  const hoveredNumber = useGameStore((state) => state.hoveredNumber);
  const committedNumber = useGameStore((state) => state.committedNumber);
  const roundStatus = useGameStore((state) => state.roundStatus);
  const setHoveredNumber = useGameStore((state) => state.setHoveredNumber);
  const commitSelection = useGameStore((state) => state.commitSelection);

  const highlightedNumber = resolveDisplayNumber({ hoveredNumber, committedNumber });

  return (
    <div
      className={cn(
        "[container-type:size] flex h-full min-h-0 items-center justify-center overflow-hidden p-1 sm:p-2",
        className,
      )}
    >
      <div
        className="grid shrink-0 gap-px"
        onMouseLeave={() => setHoveredNumber(null)}
        style={tableGridStyle}
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
