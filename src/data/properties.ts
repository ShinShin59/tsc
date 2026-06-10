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
import type { Element } from "@/data/elements";
import { getElement } from "@/data/elements";
import {
  formatDiscovery,
  formatNameOrigin,
  formatNutrition,
  formatStability,
  formatSynthesis,
  getDiscoveryPeriod,
  getNameOriginCategories,
  getNutritionCategory,
  getStabilityTier,
  getSynthesisOrigins,
} from "@/data/enriched";

export type LegendPropertyId =
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

export type LegendItem = {
  id: LegendPropertyId;
  label: string;
  icon: string;
  description: string;
};

export const LEGEND_ITEMS: LegendItem[] = [
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

function setsOverlap<T>(left: readonly T[], right: readonly T[]): boolean {
  const rightSet = new Set(right);
  return left.some((item) => rightSet.has(item));
}

export function resolveElementBlock({ number, group }: Element): string {
  if ((number >= 57 && number <= 71) || (number >= 89 && number <= 103)) {
    return "F-block";
  }
  if (number === 2 || group === 1 || group === 2) {
    return "S-block";
  }
  if (group >= 3 && group <= 12) {
    return "D-block";
  }
  if (group >= 13 && group <= 18) {
    return "P-block";
  }
  return "—";
}

type PropertyDefinition = {
  compare: (elementA: Element, elementB: Element) => boolean;
  resolveDisplay: (element: Element) => string;
};

const PROPERTY_REGISTRY: Record<LegendPropertyId, PropertyDefinition> = {
  period: {
    compare: (a, b) => a.period === b.period,
    resolveDisplay: (element) => String(element.period),
  },
  group: {
    compare: (a, b) => a.group === b.group,
    resolveDisplay: (element) => String(element.group),
  },
  block: {
    compare: (a, b) => resolveElementBlock(a) === resolveElementBlock(b),
    resolveDisplay: (element) => resolveElementBlock(element),
  },
  family: {
    compare: (a, b) => a.category === b.category,
    resolveDisplay: (element) => element.category,
  },
  state: {
    compare: (a, b) => a.phase === b.phase,
    resolveDisplay: (element) => element.phase,
  },
  synthesis: {
    compare: (a, b) =>
      setsOverlap(getSynthesisOrigins(a.number), getSynthesisOrigins(b.number)),
    resolveDisplay: (element) => formatSynthesis(element.number),
  },
  nutrition: {
    compare: (a, b) =>
      getNutritionCategory(a.number) === getNutritionCategory(b.number),
    resolveDisplay: (element) => formatNutrition(element.number),
  },
  discovery: {
    compare: (a, b) =>
      getDiscoveryPeriod(a.number) === getDiscoveryPeriod(b.number),
    resolveDisplay: (element) => formatDiscovery(element.number),
  },
  stability: {
    compare: (a, b) => getStabilityTier(a.number) === getStabilityTier(b.number),
    resolveDisplay: (element) => formatStability(element.number),
  },
  etymology: {
    compare: (a, b) =>
      setsOverlap(getNameOriginCategories(a.number), getNameOriginCategories(b.number)),
    resolveDisplay: (element) => formatNameOrigin(element.number),
  },
};

export function compareProperty(
  elementA: Element,
  elementB: Element,
  propertyId: LegendPropertyId,
): boolean {
  return PROPERTY_REGISTRY[propertyId].compare(elementA, elementB);
}

export function resolvePropertyDisplay(element: Element, propertyId: LegendPropertyId): string {
  return PROPERTY_REGISTRY[propertyId].resolveDisplay(element);
}

export function resolveIdentityPropertyValue(
  element: Element | undefined,
  propertyId: LegendPropertyId,
): string {
  if (!element) {
    return "—";
  }

  return resolvePropertyDisplay(element, propertyId);
}

export function propertiesMatch(
  elementNumberA: number,
  elementNumberB: number,
  propertyId: LegendPropertyId,
): boolean {
  const elementA = getElement(elementNumberA);
  const elementB = getElement(elementNumberB);
  if (!elementA || !elementB) {
    return false;
  }

  return compareElements(elementA, elementB, propertyId);
}

export function compareElements(
  elementA: Element,
  elementB: Element,
  propertyId: LegendPropertyId,
): boolean {
  return compareProperty(elementA, elementB, propertyId);
}

export type PropertyMatchCount = {
  matched: number;
  total: number;
};

export function getDiscoveredPropertyIds(
  history: readonly number[],
  mysteryNumber: number,
): Set<LegendPropertyId> {
  const discovered = new Set<LegendPropertyId>();

  for (const guess of history) {
    for (const { id } of LEGEND_ITEMS) {
      if (propertiesMatch(guess, mysteryNumber, id)) {
        discovered.add(id);
      }
    }
  }

  return discovered;
}

export function countMatchingProperties(
  elementNumberA: number,
  elementNumberB: number,
): PropertyMatchCount {
  const total = LEGEND_ITEMS.length;
  let matched = 0;

  for (const { id } of LEGEND_ITEMS) {
    if (propertiesMatch(elementNumberA, elementNumberB, id)) {
      matched += 1;
    }
  }

  return { matched, total };
}
