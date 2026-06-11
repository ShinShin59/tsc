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
      className={cn("@container-size flex min-h-0 flex-1 items-center justify-center p-1 sm:p-2")}
    >
      <div
        className={cn(
          "grid shrink-0 gap-px",
          "grid-cols-[repeat(18,min(64px,calc((100cqw-17px)/18),calc((100cqh-9px)/9.06)))]",
          "grid-rows-[repeat(7,min(64px,calc((100cqw-17px)/18),calc((100cqh-9px)/9.06)))_calc(min(64px,calc((100cqw-17px)/18),calc((100cqh-9px)/9.06))*0.06)_repeat(2,min(64px,calc((100cqw-17px)/18),calc((100cqh-9px)/9.06)))]",
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
