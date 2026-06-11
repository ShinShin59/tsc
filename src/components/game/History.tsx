import { getElement } from "@/data/elements";
import { countMatchingProperties } from "@/data/properties";
import { resolvePaletteAppearance } from "@/palette/index";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game";
import { HISTORY_VISIBLE_COUNT } from "./const";

function HistoryTile({
  elementNumber,
  mysteryNumber,
  onMouseEnter,
}: {
  elementNumber: number;
  mysteryNumber: number;
  onMouseEnter: () => void;
}) {
  const element = getElement(elementNumber);
  if (!element) {
    return null;
  }

  const { backgroundColor, textClass } = resolvePaletteAppearance(element);
  const { matched, total } = countMatchingProperties(elementNumber, mysteryNumber);

  return (
    <div
      role="img"
      aria-label={`${element.name} (${element.symbol})`}
      onMouseEnter={onMouseEnter}
      className="flex shrink cursor-default flex-col items-center gap-px"
    >
      <div
        className={cn(
          "flex size-5 items-center justify-center rounded-sm border border-black/20 text-[9px] font-bold leading-none transition-[filter] hover:brightness-110 sm:size-6 sm:text-[10px]",
          textClass,
        )}
        style={{ backgroundColor }}
      >
        {element.symbol}
      </div>

      <div
        aria-hidden
        className="relative h-3 w-1.5 overflow-hidden rounded-sm border border-white/40 bg-black/20 sm:h-4 sm:w-2"
      >
        <div
          className="absolute inset-x-0 bottom-0 bg-sky-400"
          style={{ height: `${(matched / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

export function History() {
  const history = useGameStore((state) => state.history);
  const mysteryNumber = useGameStore((state) => state.mysteryNumber);
  const setHoveredElement = useGameStore((state) => state.setHoveredElement);

  const visible = history.slice(-HISTORY_VISIBLE_COUNT);
  const startIndex = history.length - visible.length;

  return (
    <div
      aria-label="Historique des coups"
      className="flex min-h-[calc(--spacing(6)+1px+(--spacing(3)))] min-w-[calc(10*(--spacing(5))+9*(--spacing(0)))] shrink justify-center gap-0.5 sm:min-h-[calc(--spacing(6)+1px+(--spacing(4)))] sm:min-w-[calc(10*(--spacing(6))+9*(--spacing(0)))]"
      onMouseLeave={() => setHoveredElement(null)}
    >
      {visible.map((elementNumber, index) => (
        <HistoryTile
          key={startIndex + index}
          elementNumber={elementNumber}
          mysteryNumber={mysteryNumber}
          onMouseEnter={() => setHoveredElement(elementNumber)}
        />
      ))}
    </div>
  );
}
