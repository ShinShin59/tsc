import type { CSSProperties } from "react";
import type { CellAppearance } from "@/palette/famille";
import { cn } from "@/lib/utils";

type PlaceholderCellProps = CellAppearance & {
  label: string;
  subtitle: string;
  className?: string;
  style?: CSSProperties;
};

export function PlaceholderCell({
  label,
  subtitle,
  backgroundColor,
  textClass,
  mutedTextClass,
  className,
  style,
}: PlaceholderCellProps) {
  return (
    <div
      className={cn(
        "flex size-(--cell-size) flex-col items-center justify-center rounded-sm border border-dashed border-white/40 p-0.5",
        textClass,
        className,
      )}
      style={{ backgroundColor, ...style }}
    >
      <span className="text-xs font-bold leading-none">{label}</span>
      <span className={cn("mt-0.5 text-[7px]", mutedTextClass)}>{subtitle}</span>
    </div>
  );
}
