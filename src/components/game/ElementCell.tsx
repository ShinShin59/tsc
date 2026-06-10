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
        "@container flex size-(--cell-size) min-w-0 cursor-pointer flex-col rounded-sm border border-black/20 p-0.5 text-left transition-[filter] hover:brightness-110",
        textClass,
        className,
      )}
      style={{ backgroundColor, ...style }}
    >
      <div className="text-[6px] leading-none @min-[2.5rem]:text-[7px]">
        <span>{element.number}</span>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center">
        <span className="text-[10px] font-bold leading-none @min-[2.5rem]:text-xs">{element.symbol}</span>
      </div>

      <div className="hidden min-h-0 shrink items-end justify-center text-center leading-[1.05] @min-[2.5rem]:flex">
        <span className="line-clamp-2 max-w-full px-0.5 text-[6px] font-semibold @min-[2.5rem]:text-[8px]">
          {element.name}
        </span>
      </div>
    </button>
  );
}
