import type { Element } from "@/data/elements";
import {
  LEGEND_ITEMS,
  propertiesMatch,
  resolveIdentityPropertyValue,
  type LegendPropertyId,
} from "@/data/properties";
import type { PropertyCardRow, PropertyRowState } from "@/components/game/property-card/types";

const EMPTY_DISCOVERED: ReadonlySet<LegendPropertyId> = new Set();

export function buildUndiscoveredPropertyRows(element?: Element): PropertyCardRow[] {
  return buildPropertyRows(element, { mode: "mystery", discovered: EMPTY_DISCOVERED });
}

export function buildPropertyRows(
  element: Element | undefined,
  options:
    | { mode: "identity"; mysteryNumber: number; showComparison: boolean }
    | { mode: "mystery"; discovered: ReadonlySet<LegendPropertyId> },
): PropertyCardRow[] {
  return LEGEND_ITEMS.map(({ id, icon }) => {
    const state: PropertyRowState =
      options.mode === "identity"
        ? options.showComparison &&
          element &&
          propertiesMatch(element.number, options.mysteryNumber, id)
          ? "match"
          : "mismatch"
        : options.discovered.has(id)
          ? "discovered"
          : "undiscovered";

    return {
      id,
      icon,
      value: resolveIdentityPropertyValue(element, id),
      state,
    };
  });
}
