import { elements } from "@/data/elements";
import { canCommitElement, resolveDisplayElement } from "@/lib/rules";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game";
import { ElementCell } from "./ElementCell";

export function PeriodicTable() {
  const hoveredElement = useGameStore((state) => state.hoveredElement);
  const committedElement = useGameStore((state) => state.committedElement);
  const roundStatus = useGameStore((state) => state.roundStatus);
  const setHoveredElement = useGameStore((state) => state.setHoveredElement);
  const commitElement = useGameStore((state) => state.commitElement);

  const highlightedElement = resolveDisplayElement({ hoveredElement, committedElement });

  return (
    <section
      className={cn(
        "@container flex shrink-0 min-w-0 w-full justify-center p-1 sm:p-2",
        "[--cell:min(64px,calc((100cqw-17px)/18))]",
      )}
    >
      <div
        className={cn(
          "grid min-w-0 max-w-full shrink gap-px",
          "grid-cols-[repeat(18,var(--cell))]",
          "grid-rows-[repeat(7,var(--cell))_calc(var(--cell)*0.06)_repeat(2,var(--cell))]",
        )}
        onMouseLeave={() => setHoveredElement(null)}
      >
        {elements.map((el) => (
          <div key={el.number} style={{ gridColumn: el.xpos, gridRow: el.ypos }}>
            <ElementCell
              element={el}
              selected={el.number === highlightedElement}
              onMouseEnter={() => setHoveredElement(el.number)}
              onClick={() => {
                if (canCommitElement(roundStatus)) {
                  commitElement(el.number);
                }
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
