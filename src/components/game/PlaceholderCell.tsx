import type { CSSProperties } from "react";
import type { PlaceholderCellData } from "@/data/periodic-table";
import { cn } from "@/lib/utils";

type PlaceholderCellProps = PlaceholderCellData & {
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
        "flex size-(--cell-size) flex-col items-center justify-center rounded-sm border border-dashed border-white/40 p-(--cell-pad)",
        textClass,
        className,
      )}
      style={{ backgroundColor, ...style }}
    >
      <span className="font-bold leading-none" style={{ fontSize: "var(--cell-font-name)" }}>
        {label}
      </span>
      <span
        className={cn("mt-[calc(var(--cell-pad)*0.5)]", mutedTextClass)}
        style={{ fontSize: "var(--cell-font-meta)" }}
      >
        {subtitle}
      </span>
    </div>
  );
}
