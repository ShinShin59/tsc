import type { Element } from "@/data/elements";
import { getElement } from "@/data/elements";
import { compareProperty } from "@/data/properties";
import type { LegendePropertyId } from "@/data/legend-items";
import { LEGENDE_ITEMS } from "@/data/legend-items";

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
  return compareProperty(elementA, elementB, propertyId);
}

export type PropertyMatchCount = {
  matched: number;
  total: number;
};

export function getDiscoveredPropertyIds(
  history: readonly number[],
  mysteryNumber: number,
): Set<LegendePropertyId> {
  const discovered = new Set<LegendePropertyId>();

  for (const coup of history) {
    for (const { id } of LEGENDE_ITEMS) {
      if (propertiesMatch(coup, mysteryNumber, id)) {
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
  const total = LEGENDE_ITEMS.length;
  let matched = 0;

  for (const { id } of LEGENDE_ITEMS) {
    if (propertiesMatch(elementNumberA, elementNumberB, id)) {
      matched += 1;
    }
  }

  return { matched, total };
}
