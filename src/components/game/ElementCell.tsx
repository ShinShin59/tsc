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
        "flex size-full p-0.5 md:py-1 flex-col items-center justify-center md:justify-between  leading-none cursor-pointer md:rounded-sm border border-black/20 transition-[filter] hover:brightness-110 relative",
        textClass,
        className,
      )}
      style={{ backgroundColor, ...style }}
    >
      <span className="hidden sm:inline absolute top-[2px] left-[2px] md:relative md:top-0 md:left-0 text-[4px] sm:text-[6px] md:text-[8px] self-baseline">
        {element.number}
      </span>
      <span className="text-[6px] sm:text-[8px] md:text-[10px] md:font-bold mt-1 md:mt-0">{element.symbol}</span>
      <span className="hidden text-[8px] md:inline truncate max-w-full">{element.name}</span>
    </button>
  );
}
