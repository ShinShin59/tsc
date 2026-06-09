import { LEGENDE_ITEMS } from "@/data/legend-items";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function Legende() {
  return (
    <aside
      aria-label="Légende des propriétés"
      className="w-fit shrink-0 border-t border-white/20 bg-[#2d3e47]/95 px-3 py-1.5 ml-auto"
    >
      <ul className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
        {LEGENDE_ITEMS.map(({ id, label, icon: Icon, color, description }) => (
          <li key={id}>
            <Tooltip>
              <TooltipTrigger render={<span className="flex cursor-default items-center gap-1" />}>
                <Icon className="size-3.5 shrink-0" style={{ color }} aria-hidden />
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
