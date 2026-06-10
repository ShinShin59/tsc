import type { Element } from "@/data/elements";
import type { LegendePropertyId } from "@/data/legend-items";
import { cellAppearance, type CellAppearance } from "@/palette/famille";

export type PaletteMode = LegendePropertyId | "none";

export const DEFAULT_PALETTE_MODE = "family" satisfies PaletteMode;

export function resolvePaletteAppearance(
  element: Element,
  mode: PaletteMode = DEFAULT_PALETTE_MODE,
): CellAppearance {
  switch (mode) {
    case "family":
      return cellAppearance(element.category);
    case "none":
    case "period":
    case "group":
    case "block":
    case "state":
    case "synthesis":
    case "nutrition":
    case "discovery":
    case "stability":
    case "etymology":
      return cellAppearance(element.category);
    default: {
      const unhandledMode: never = mode;
      return unhandledMode;
    }
  }
}

export { cellAppearance, type CellAppearance } from "@/palette/famille";
