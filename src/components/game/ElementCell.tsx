import type { Element } from "@/data/elements";
import { resolvePaletteAppearance } from "@/palette/index";
import { cn } from "@/lib/utils";

type ElementCellProps = {
  element: Element;
  big?: boolean;
  selected?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
};

export function ElementCell({
  element,
  big = false,
  selected = false,
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
        "@container relative flex size-full flex-col items-center justify-center overflow-hidden p-0.5 leading-none cursor-pointer border border-black/20 transition-[filter] hover:brightness-110",
        " [@container_(min-height:2.5rem)]:py-1",
        "@min-[2.5rem]:rounded-sm",
        textClass,
      )}
      style={{ backgroundColor }}
    >
      {!big && (
        <span className="hidden @min-[1.5rem]:inline absolute top-[2px] left-[2px] text-[clamp(3px,20cqmin,8px)] self-baseline @min-[2.5rem]:relative @min-[2.5rem]:top-0 @min-[2.5rem]:left-0">
          {element.number}
        </span>
      )}
 
      <span
        className={cn(
          big
            ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[2.5rem]"
            : "text-[clamp(5px,34cqmin,11px)] @min-[2.5rem]:font-bold md:translate-y-1",
        )}
      >
        {element.symbol}
      </span>
      <span className="hidden truncate max-w-full text-[clamp(4px,18cqmin,8px)] [@container_(min-width:2.5rem)_and_(min-height:2rem)]:inline mt-auto">
        {element.name}
      </span>
    </button>
  );
}
