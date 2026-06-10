import { cn } from "@/lib/utils";
import type { PropertyCardRow } from "@/components/game/property-card/types";

function PropertyCardRowItem({
  icon,
  value,
  state = "mismatch",
  iconEnd = false,
}: Omit<PropertyCardRow, "id"> & { iconEnd?: boolean }) {
  const isDimmed = state === "mismatch";
  const isUndiscovered = state === "undiscovered";

  return (
    <li className={cn("flex items-center gap-x-1", iconEnd && "flex-row-reverse")}>
      <img
        src={icon}
        alt=""
        aria-hidden
        className={cn(
          "size-3.5 shrink-0 object-contain sm:size-4",
          (isDimmed || isUndiscovered) && "brightness-0 opacity-30",
        )}
      />
      <span
        className={cn(
          "min-w-0 text-[10px] font-bold leading-none sm:text-[11px]",
          iconEnd && "text-right",
          state === "match" && "text-accent",
          isDimmed && "text-black/35",
          state === "discovered" && "text-accent",
          isUndiscovered && "text-accent/50",
        )}
        title={isUndiscovered ? undefined : value}
      >
        {isUndiscovered ? "?" : value}
      </span>
    </li>
  );
}

export function PropertyCardList({
  rows,
  iconEnd = false,
}: {
  rows: PropertyCardRow[];
  iconEnd?: boolean;
}) {
  return (
    <ul className="flex flex-col gap-px sm:gap-0.5">
      {rows.map(({ id, icon, value, state }) => (
        <PropertyCardRowItem key={id} icon={icon} value={value} state={state} iconEnd={iconEnd} />
      ))}
    </ul>
  );
}
