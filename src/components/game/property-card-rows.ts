import type { CarteIdentiteRowState } from "@/components/game/CarteIdentiteRow";
import type { Element } from "@/data/elements";
import { resolveIdentityPropertyValue } from "@/data/properties";
import { LEGENDE_ITEMS, type LegendePropertyId } from "@/data/legend-items";
import { propertiesMatch } from "@/lib/properties-match";

export type PropertyCardRow = {
  id: LegendePropertyId;
  icon: string;
  value: string;
  state: CarteIdentiteRowState;
};

export function buildIdentitePropertyRows(
  element: Element | undefined,
  mysteryNumber: number,
  showComparison: boolean,
): PropertyCardRow[] {
  return LEGENDE_ITEMS.map(({ id, icon }) => {
    const state: CarteIdentiteRowState =
      showComparison && element && propertiesMatch(element.number, mysteryNumber, id)
        ? "match"
        : "mismatch";

    return {
      id,
      icon,
      value: resolveIdentityPropertyValue(element, id),
      state,
    };
  });
}

export function buildMysterePropertyRows(
  element: Element | undefined,
  discovered: ReadonlySet<LegendePropertyId>,
): PropertyCardRow[] {
  return LEGENDE_ITEMS.map(({ id, icon }) => ({
    id,
    icon,
    value: resolveIdentityPropertyValue(element, id),
    state: discovered.has(id) ? "discovered" : "undiscovered",
  }));
}
