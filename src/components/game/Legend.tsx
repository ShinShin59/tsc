import { LEGEND_ITEMS } from "@/data/properties";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function Legend() {
  return (
    <aside
      aria-label="Légende des propriétés"
      className="w-fit shrink-0 border-3 border-accent px-3 py-1.5 m-auto mb-2"
    >
      <ul className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
        {LEGEND_ITEMS.map(({ id, label, icon, description }) => (
          <li key={id}>
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
