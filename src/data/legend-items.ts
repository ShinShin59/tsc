import blockOn from "@/assets/legende/block-on.png";
import discoveryOn from "@/assets/legende/discovery-on.png";
import etymologyOn from "@/assets/legende/etymology-on.png";
import familyOn from "@/assets/legende/family-on.png";
import groupOn from "@/assets/legende/group-on.png";
import nutritionOn from "@/assets/legende/nutrition-on.png";
import periodOn from "@/assets/legende/period-on.png";
import stabilityOn from "@/assets/legende/stability-on.png";
import stateOn from "@/assets/legende/state-on.png";
import synthesisOn from "@/assets/legende/synthesis-on.png";

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
  icon: string;
  description: string;
};

export const LEGENDE_ITEMS: LegendeItem[] = [
  {
    id: "period",
    label: "Période",
    icon: periodOn,
    description: "Numéro de ligne dans le tableau périodique.",
  },
  {
    id: "group",
    label: "Groupe",
    icon: groupOn,
    description: "Numéro de colonne dans le tableau périodique.",
  },
  {
    id: "block",
    label: "Block",
    icon: blockOn,
    description: "Bloc d'orbitales (s, p, d ou f).",
  },
  {
    id: "family",
    label: "Famille",
    icon: familyOn,
    description: "Famille chimique (métaux alcalins, gaz nobres, etc.).",
  },
  {
    id: "state",
    label: "État",
    icon: stateOn,
    description: "État physique à température ambiante (solide, liquide ou gaz).",
  },
  {
    id: "synthesis",
    label: "Synthèse",
    icon: synthesisOn,
    description: "Élément synthétisé artificiellement en laboratoire.",
  },
  {
    id: "nutrition",
    label: "Importance nutritive",
    icon: nutritionOn,
    description: "Rôle biologique ou importance nutritionnelle.",
  },
  {
    id: "discovery",
    label: "Date découverte",
    icon: discoveryOn,
    description: "Année ou période de découverte de l'élément.",
  },
  {
    id: "stability",
    label: "Stabilité",
    icon: stabilityOn,
    description: "Stabilité radioactive ou isotopes instables.",
  },
  {
    id: "etymology",
    label: "Origine du nom",
    icon: etymologyOn,
    description: "Étymologie ou origine du nom de l'élément.",
  },
];
