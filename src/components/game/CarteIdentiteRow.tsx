import { cn } from "@/lib/utils";

export type IdentityPropertyState = "match" | "mismatch";
export type MysteryPropertyState = "undiscovered" | "discovered";

export type CarteIdentiteRowState = IdentityPropertyState | MysteryPropertyState;

type CarteIdentiteRowProps = {
  icon: string;
  value: string;
  state?: CarteIdentiteRowState;
};

export function CarteIdentiteRow({ icon, value, state = "mismatch" }: CarteIdentiteRowProps) {
  const isDimmed = state === "mismatch";
  const isUndiscovered = state === "undiscovered";

  return (
    <li className="flex items-center gap-x-1.5">
      <img
        src={icon}
        alt=""
        aria-hidden
        className={cn(
          "size-[19px] shrink-0 object-contain",
          (isDimmed || isUndiscovered) && "brightness-0 opacity-30",
        )}
      />
      <span
        className={cn(
          "min-w-0 truncate text-[12px] font-bold leading-none",
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
