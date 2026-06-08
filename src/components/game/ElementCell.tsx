import { cn } from "@/lib/utils";
import type { Element } from "@/data/periodic-table";

type ElementCellProps = {
  element: Element;
  className?: string;
};

function formatAtomicMass(mass: number): string {
  return mass.toFixed(2);
}

export function ElementCell({ element, className }: ElementCellProps) {
  return (
    <div
      className={cn(
        "flex size-(--cell-size) min-w-0 flex-col rounded-sm border border-black/20 p-0.5",
        element.textClass,
        className,
      )}
      style={{ backgroundColor: element.backgroundColor }}
    >
      <div className="flex items-start justify-between text-[7px] leading-none">
        <span>{element.number}</span>
        <span>{formatAtomicMass(element.atomic_mass)}</span>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center">
        <span className="text-xs font-bold leading-none">{element.symbol}</span>
      </div>

      <div className="flex shrink-0 flex-col items-center gap-0.5 text-center leading-snug">
        <span className="max-w-full truncate px-0.5 text-[9px] font-semibold">
          {element.name}
        </span>
        <span className={cn("max-w-full truncate px-0.5 text-[8px] font-medium", element.mutedTextClass)}>
          {element.category}
        </span>
      </div>
    </div>
  );
}
