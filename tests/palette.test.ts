import { describe, expect, it } from "vitest";
import { getElement } from "@/data/elements";
import { cellAppearance, DEFAULT_PALETTE_MODE, resolvePaletteAppearance } from "@/palette/index";

describe("resolvePaletteAppearance", () => {
  it("matches family palette for the default mode", () => {
    const element = getElement(26);
    expect(element).toBeDefined();
    if (!element) {
      return;
    }

    expect(resolvePaletteAppearance(element)).toEqual(cellAppearance(element.category));
    expect(resolvePaletteAppearance(element, DEFAULT_PALETTE_MODE)).toEqual(
      cellAppearance(element.category),
    );
  });
});
