import { LEGEND_ITEMS } from "@/data/properties";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type LegendProps = {
  className?: string;
};

export function Legend({ className }: LegendProps) {
  return (
    <aside aria-label="Légende des propriétés" className={cn("min-w-0", className)}>
      <ul className="flex flex-nowrap items-center gap-x-3 overflow-x-auto py-0.5 [scrollbar-width:thin]">
        {LEGEND_ITEMS.map(({ id, label, icon, description }) => (
          <li key={id} className="shrink-0">
            <Tooltip>
              <TooltipTrigger render={<span className="flex cursor-default items-center gap-1" />}>
                <img src={icon} alt="" aria-hidden className="h-[19px] w-auto shrink-0" />
                <span className="text-[11px] text-amber-200/90">{label}</span>
              </TooltipTrigger>
              <TooltipContent side="top">{description}</TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </aside>
  );
}
