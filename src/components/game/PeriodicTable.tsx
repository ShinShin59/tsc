import { elements, PLACEHOLDER_CELLS } from "@/data/periodic-table";
import { ElementCell } from "./ElementCell";
import { PlaceholderCell } from "./PlaceholderCell";

export function PeriodicTable() {
  return (
    <div className="overflow-x-auto p-4">
      <div className="mx-auto aspect-2/1 w-full">
        <div
          className="grid h-full w-full gap-0.5"
          style={{
            gridTemplateColumns: "repeat(18, 1fr)",
            gridTemplateRows: "repeat(7, 1fr) 0.5rem repeat(2, 1fr)",
          }}
        >
          {elements.map((el) => (
            <div key={el.number} style={{ gridColumn: el.xpos, gridRow: el.ypos }}>
              <ElementCell element={el} className="h-full w-full min-w-0" />
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
    </div>
  );
}
