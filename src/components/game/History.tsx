import { getElement } from "@/data/elements";
import { countMatchingProperties } from "@/data/properties";
import { resolvePaletteAppearance } from "@/palette/index";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game";
import {
  HISTORY_CELL_SIZE,
  HISTORY_CONTAINER_WIDTH,
  HISTORY_GAP,
  HISTORY_GAUGE_HEIGHT,
  HISTORY_GAUGE_WIDTH,
  HISTORY_VISIBLE_COUNT,
} from "./const";

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
      className="flex cursor-default flex-col items-center gap-0.5"
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-sm border border-black/20 text-xs font-bold leading-none transition-[filter] hover:brightness-110",
          textClass,
        )}
        style={{
          width: HISTORY_CELL_SIZE,
          height: HISTORY_CELL_SIZE,
          backgroundColor,
        }}
      >
        {element.symbol}
      </div>

      <div
        aria-hidden
        className="relative overflow-hidden rounded-sm border border-white/40 bg-black/20"
        style={{ width: HISTORY_GAUGE_WIDTH, height: HISTORY_GAUGE_HEIGHT }}
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
  const setHoveredNumber = useGameStore((state) => state.setHoveredNumber);

  if (history.length === 0) {
    return null;
  }

  const visible = history.slice(-HISTORY_VISIBLE_COUNT);
  const startIndex = history.length - visible.length;

  return (
    <div
      aria-label="Historique des coups"
      className="absolute top-6 right-[11%] z-10 flex"
      style={{ width: HISTORY_CONTAINER_WIDTH, gap: HISTORY_GAP }}
      onMouseLeave={() => setHoveredNumber(null)}
    >
      {visible.map((elementNumber, index) => (
        <HistoryTile
          key={startIndex + index}
          elementNumber={elementNumber}
          mysteryNumber={mysteryNumber}
          onMouseEnter={() => setHoveredNumber(elementNumber)}
        />
      ))}
    </div>
  );
}
