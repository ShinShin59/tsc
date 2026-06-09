import { cn } from "@/lib/utils";

export type CarteIdentiteRowState = "off" | "revealed" | "hidden";

type CarteIdentiteRowProps = {
  icon: string;
  value: string;
  state?: CarteIdentiteRowState;
};

export function CarteIdentiteRow({ icon, value, state = "off" }: CarteIdentiteRowProps) {
  const isOff = state === "off";
  const isHidden = state === "hidden";

  return (
    <li className="flex items-center gap-x-1.5">
      <img
        src={icon}
        alt=""
        aria-hidden
        className={cn(
          "size-[19px] shrink-0 object-contain",
          (isOff || isHidden) && "brightness-0 opacity-30",
        )}
      />
      <span
        className={cn(
          "min-w-0 truncate text-[12px] font-bold leading-none",
          isOff && "text-black/35",
          state === "revealed" && "text-accent",
          isHidden && "text-accent/50",
        )}
        title={isHidden ? undefined : value}
      >
        {isHidden ? "?" : value}
      </span>
    </li>
  );
}
