import type { Element } from "@/data/elements";
import { cellAppearance } from "@/palette/famille";
import { cn } from "@/lib/utils";

type ElementCellProps = {
  element: Element;
  selected?: boolean;
  className?: string;
  onClick?: () => void;
};

export function ElementCell({ element, selected = false, className, onClick }: ElementCellProps) {
  const { backgroundColor, textClass } = cellAppearance(element.category);

  return (
    <button
      type="button"
      aria-label={`${element.name} (${element.symbol})`}
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "flex size-(--cell-size) min-w-0 cursor-pointer flex-col rounded-sm border border-black/20 p-0.5 text-left transition-[filter] hover:brightness-110",
        textClass,
        className,
      )}
      style={{ backgroundColor }}
    >
      <div className="text-[7px] leading-none">
        <span>{element.number}</span>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center">
        <span className="text-xs font-bold leading-none">{element.symbol}</span>
      </div>

      <div className="shrink-0 text-center leading-snug">
        <span className="block max-w-full truncate px-0.5 text-[9px] font-semibold">{element.name}</span>
      </div>
    </button>
  );
}
