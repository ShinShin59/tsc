import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  Columns3,
  Drumstick,
  Languages,
  Orbit,
  Radiation,
  Rows3,
  Sparkles,
  Thermometer,
  Users,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type LegendePropertyId =
  | "period"
  | "group"
  | "block"
  | "family"
  | "state"
  | "synthesis"
  | "nutrition"
  | "discovery"
  | "stability"
  | "etymology";

type LegendeItem = {
  id: LegendePropertyId;
  label: string;
  icon: LucideIcon;
  color: string;
  description: string;
};

const LEGENDE_ITEMS: LegendeItem[] = [
  {
    id: "period",
    label: "Période",
    icon: Rows3,
    color: "#3498db",
    description: "Numéro de ligne dans le tableau périodique.",
  },
  {
    id: "group",
    label: "Groupe",
    icon: Columns3,
    color: "#e74c3c",
    description: "Numéro de colonne dans le tableau périodique.",
  },
  {
    id: "block",
    label: "Block",
    icon: Orbit,
    color: "#f1c40f",
    description: "Bloc d'orbitales (s, p, d ou f).",
  },
  {
    id: "family",
    label: "Famille",
    icon: Users,
    color: "#2ecc71",
    description: "Famille chimique (métaux alcalins, gaz nobles, etc.).",
  },
  {
    id: "state",
    label: "État",
    icon: Thermometer,
    color: "#3498db",
    description: "État physique à température ambiante (solide, liquide ou gaz).",
  },
  {
    id: "synthesis",
    label: "Synthèse",
    icon: Sparkles,
    color: "#f39c12",
    description: "Élément synthétisé artificiellement en laboratoire.",
  },
  {
    id: "nutrition",
    label: "Importance nutritive",
    icon: Drumstick,
    color: "#e84393",
    description: "Rôle biologique ou importance nutritionnelle.",
  },
  {
    id: "discovery",
    label: "Date découverte",
    icon: CalendarDays,
    color: "#ecf0f1",
    description: "Année ou période de découverte de l'élément.",
  },
  {
    id: "stability",
    label: "Stabilité",
    icon: Radiation,
    color: "#f1c40f",
    description: "Stabilité radioactive ou isotopes instables.",
  },
  {
    id: "etymology",
    label: "Origine du nom",
    icon: Languages,
    color: "#bdc3c7",
    description: "Étymologie ou origine du nom de l'élément.",
  },
];

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
