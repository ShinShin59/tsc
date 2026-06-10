import { CELL_SLOT_CLASS } from "@/components/game/shared/cellSlot";
import { cn } from "@/lib/utils";

type PlaceholderCellProps = {
  ariaLabel: string;
};

export function PlaceholderCell({ ariaLabel }: PlaceholderCellProps) {
  return (
    <div
      className={cn(
        CELL_SLOT_CLASS,
        "flex items-center justify-center rounded-sm border-2 border-accent/30 bg-transparent",
      )}
      aria-label={ariaLabel}
    >
      <span className="text-3xl font-bold leading-none text-accent sm:text-4xl md:text-5xl">?</span>
    </div>
  );
}
