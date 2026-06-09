import type { Element } from "@/data/elements";
import type { LegendePropertyId } from "@/data/legend-items";
import { formatNameOrigin } from "@/data/name-origin";
import { formatStability } from "@/data/stability";

function resolveBlock({ number, group }: Element): string {
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

export function resolveIdentityPropertyValue(
  element: Element | undefined,
  propertyId: LegendePropertyId,
): string {
  if (!element) {
    return "—";
  }

  switch (propertyId) {
    case "period":
      return String(element.period);
    case "group":
      return String(element.group);
    case "block":
      return resolveBlock(element);
    case "family":
      return element.category;
    case "state":
      return element.phase;
    case "synthesis":
    case "nutrition":
    case "discovery":
      return "—";
    case "stability":
      return formatStability(element.number);
    case "etymology":
      return formatNameOrigin(element.number);
  }
}
