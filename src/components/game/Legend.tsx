import { LEGEND_ITEMS } from "@/data/properties";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type LegendProps = {
  className?: string;
};

export function Legend({ className }: LegendProps) {
  return (
    <aside aria-label="Légende des propriétés" className={cn("min-w-0", className)}>
      <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
        {LEGEND_ITEMS.map(({ id, label, icon, description }) => (
          <li key={id}>
            <Tooltip>
              <TooltipTrigger render={<span className="flex cursor-default items-center gap-1" />}>
                <img src={icon} alt="" aria-hidden className="size-4 shrink-0 sm:size-[19px]" />
                <span className="hidden text-[11px] text-amber-200/90 xl:inline">{label}</span>
              </TooltipTrigger>
              <TooltipContent side="top">{description}</TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </aside>
  );
}
