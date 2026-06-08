import type { CSSProperties } from "react";
import { elements, PLACEHOLDER_CELLS } from "@/data/periodic-table";
import { ElementCell } from "./ElementCell";
import { PlaceholderCell } from "./PlaceholderCell";

export function PeriodicTable() {
  const cellSize = 62;
  const spacer = Math.round(cellSize * 0.06);

  return (
    <div className="overflow-x-auto p-4">
      <div
        className="mx-auto grid w-fit gap-px"
        style={
          {
            "--cell-size": `${cellSize}px`,
            "--cell-pad": `${cellSize * 0.04}px`,
            "--cell-font-symbol": `${cellSize * 0.32}px`,
            "--cell-font-name": `${cellSize * 0.18}px`,
            "--cell-font-meta": `${cellSize * 0.14}px`,
            gridTemplateColumns: "repeat(18, var(--cell-size))",
            gridTemplateRows: `repeat(7, var(--cell-size)) ${spacer}px repeat(2, var(--cell-size))`,
          } as CSSProperties
        }
      >
        {elements.map((el) => (
          <div key={el.number} style={{ gridColumn: el.xpos, gridRow: el.ypos }}>
            <ElementCell element={el} />
          </div>
        ))}
        {PLACEHOLDER_CELLS.map(({ xpos, ypos, ...cell }) => (
          <PlaceholderCell
            key={cell.subtitle}
            {...cell}
            style={{ gridColumn: xpos, gridRow: ypos }}
          />
        ))}
      </div>
    </div>
  );
}
