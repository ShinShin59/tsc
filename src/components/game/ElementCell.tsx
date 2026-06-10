import type { CSSProperties } from "react";
import type { Element } from "@/data/elements";
import { resolvePaletteAppearance } from "@/palette/index";
import { cn } from "@/lib/utils";

type ElementCellProps = {
  element: Element;
  selected?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
};

export function ElementCell({
  element,
  selected = false,
  className,
  style,
  onClick,
  onMouseEnter,
}: ElementCellProps) {
  const { backgroundColor, textClass } = resolvePaletteAppearance(element);

  return (
    <button
      type="button"
      aria-label={`${element.name} (${element.symbol})`}
      aria-pressed={selected}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={cn(
        "flex size-(--cell-size) min-w-0 cursor-pointer flex-col rounded-sm border border-black/20 p-0.5 text-left transition-[filter] hover:brightness-110",
        textClass,
        className,
      )}
      style={{ backgroundColor, ...style }}
    >
      <div className="text-[7px] leading-none">
        <span>{element.number}</span>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center">
        <span className="text-xs font-bold leading-none">{element.symbol}</span>
      </div>

      <div className="flex min-h-[18px] shrink-0 items-end justify-center text-center leading-[1.05]">
        <span className="line-clamp-2 max-w-full px-0.5 text-[8px] font-semibold">{element.name}</span>
      </div>
    </button>
  );
}
