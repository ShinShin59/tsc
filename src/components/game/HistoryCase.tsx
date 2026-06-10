import { getElement } from "@/data/elements";
import { countMatchingProperties } from "@/lib/properties-match";
import { resolvePaletteAppearance } from "@/palette/index";
import { cn } from "@/lib/utils";
import {
  HISTORY_CELL_SIZE,
  HISTORY_JAUGE_HEIGHT,
  HISTORY_JAUGE_WIDTH,
} from "./constants";

type HistoryCaseProps = {
  elementNumber: number;
  mysteryNumber: number;
  onMouseEnter: () => void;
};

export function HistoryCase({ elementNumber, mysteryNumber, onMouseEnter }: HistoryCaseProps) {
  const element = getElement(elementNumber);
  if (!element) {
    return null;
  }

  const { backgroundColor, textClass } = resolvePaletteAppearance(element);
  const { matched, total } = countMatchingProperties(elementNumber, mysteryNumber);
  const fillRatio = matched / total;

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
        style={{ width: HISTORY_JAUGE_WIDTH, height: HISTORY_JAUGE_HEIGHT }}
      >
        <div
          className="absolute inset-x-0 bottom-0 bg-sky-400"
          style={{ height: `${fillRatio * 100}%` }}
        />
      </div>
    </div>
  );
}
