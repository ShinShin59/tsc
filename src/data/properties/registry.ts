import type { Element } from "@/data/elements";
import { getDiscoveryPeriod, formatDiscovery } from "@/data/discovery";
import type { LegendePropertyId } from "@/data/legend-items";
import { getNameOriginCategories, formatNameOrigin } from "@/data/name-origin";
import { getNutritionCategory, formatNutrition } from "@/data/nutrition";
import { getStabilityTier, formatStability } from "@/data/stability";
import { getSynthesisOrigins, formatSynthesis } from "@/data/synthesis";

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

const PROPERTY_REGISTRY: Record<LegendePropertyId, PropertyDefinition> = {
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
  propertyId: LegendePropertyId,
): boolean {
  return PROPERTY_REGISTRY[propertyId].compare(elementA, elementB);
}

export function resolvePropertyDisplay(element: Element, propertyId: LegendePropertyId): string {
  return PROPERTY_REGISTRY[propertyId].resolveDisplay(element);
}

export function resolveIdentityPropertyValue(
  element: Element | undefined,
  propertyId: LegendePropertyId,
): string {
  if (!element) {
    return "—";
  }

  return resolvePropertyDisplay(element, propertyId);
}
