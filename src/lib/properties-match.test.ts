import { describe, expect, it } from "vitest";
import { getElement } from "@/data/elements";
import { LEGENDE_ITEMS } from "@/data/legend-items";
import { compareElements, propertiesMatch } from "@/lib/properties-match";

describe("propertiesMatch", () => {
  it("matches scalar properties for identical elements", () => {
    for (const { id } of LEGENDE_ITEMS) {
      expect(propertiesMatch(26, 26, id)).toBe(true);
    }
  });

  it("detects period mismatch", () => {
    expect(propertiesMatch(26, 11, "period")).toBe(false);
    expect(propertiesMatch(26, 28, "family")).toBe(true);
  });

  it("uses synthesis origin overlap, not formatted labels", () => {
    const thorium = getElement(90);
    const uranium = getElement(92);
    expect(thorium).toBeDefined();
    expect(uranium).toBeDefined();
    if (!thorium || !uranium) {
      return;
    }

    expect(compareElements(thorium, uranium, "synthesis")).toBe(true);
  });

  it("returns false when an element number is unknown", () => {
    expect(propertiesMatch(999, 26, "period")).toBe(false);
  });
});
