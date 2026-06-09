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

export type LegendePropertyId =
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

export type LegendeItem = {
  id: LegendePropertyId;
  label: string;
  icon: LucideIcon;
  color: string;
  description: string;
};

export const LEGENDE_ITEMS: LegendeItem[] = [
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
