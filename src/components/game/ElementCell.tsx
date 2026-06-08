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
        "flex aspect-square w-full flex-col rounded-sm border border-black/20 p-1.5",
        element.textClass,
        className,
      )}
      style={{ backgroundColor: element.backgroundColor }}
    >
      <div className="flex items-start justify-between text-[10px] leading-none">
        <span>{element.number}</span>
        <span>{formatAtomicMass(element.atomic_mass)}</span>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <span className="text-3xl font-bold leading-none">{element.symbol}</span>
      </div>

      <div className="flex flex-col items-center gap-0.5 text-center leading-tight">
        <span className="truncate text-[10px] font-medium">{element.name}</span>
        <span className={cn("truncate text-[8px]", element.mutedTextClass)}>
          {element.category}
        </span>
      </div>
    </div>
  );
}
