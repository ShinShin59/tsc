import type { Element } from "@/data/elements";
import { getElement } from "@/data/elements";
import { getDiscoveryPeriod } from "@/data/discovery";
import { resolveElementBlock } from "@/data/identity-property-values";
import { LEGENDE_ITEMS, type LegendePropertyId } from "@/data/legend-items";
import { getNameOriginCategories } from "@/data/name-origin";
import { getNutritionCategory } from "@/data/nutrition";
import { getStabilityTier } from "@/data/stability";
import { getSynthesisOrigins } from "@/data/synthesis";

function setsOverlap<T>(left: readonly T[], right: readonly T[]): boolean {
  const rightSet = new Set(right);
  return left.some((item) => rightSet.has(item));
}

export function propertiesMatch(
  elementNumberA: number,
  elementNumberB: number,
  propertyId: LegendePropertyId,
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
  propertyId: LegendePropertyId,
): boolean {
  switch (propertyId) {
    case "period":
      return elementA.period === elementB.period;
    case "group":
      return elementA.group === elementB.group;
    case "block":
      return resolveElementBlock(elementA) === resolveElementBlock(elementB);
    case "family":
      return elementA.category === elementB.category;
    case "state":
      return elementA.phase === elementB.phase;
    case "synthesis":
      return setsOverlap(
        getSynthesisOrigins(elementA.number),
        getSynthesisOrigins(elementB.number),
      );
    case "nutrition":
      return getNutritionCategory(elementA.number) === getNutritionCategory(elementB.number);
    case "discovery":
      return getDiscoveryPeriod(elementA.number) === getDiscoveryPeriod(elementB.number);
    case "stability":
      return getStabilityTier(elementA.number) === getStabilityTier(elementB.number);
    case "etymology":
      return setsOverlap(
        getNameOriginCategories(elementA.number),
        getNameOriginCategories(elementB.number),
      );
  }
}

export type PropertyMatchCount = {
  matched: number;
  total: number;
};

export function countMatchingProperties(
  elementNumberA: number,
  elementNumberB: number,
): PropertyMatchCount {
  const total = LEGENDE_ITEMS.length;
  let matched = 0;

  for (const { id } of LEGENDE_ITEMS) {
    if (propertiesMatch(elementNumberA, elementNumberB, id)) {
      matched += 1;
    }
  }

  return { matched, total };
}
