import { describe, expect, it } from "vitest";
import { getElement } from "@/data/elements";
import {
  compareElements,
  countMatchingProperties,
  getDiscoveredPropertyIds,
  LEGEND_ITEMS,
  propertiesMatch,
} from "@/data/properties";

describe("propertiesMatch", () => {
  it("matches scalar properties for identical elements", () => {
    for (const { id } of LEGEND_ITEMS) {
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

  it("uses etymology category overlap", () => {
    expect(propertiesMatch(2, 63, "etymology")).toBe(true);
    expect(propertiesMatch(2, 1, "etymology")).toBe(false);
  });

  it("returns false when an element number is unknown", () => {
    expect(propertiesMatch(999, 26, "period")).toBe(false);
  });
});

describe("countMatchingProperties", () => {
  it("counts all properties for identical elements", () => {
    expect(countMatchingProperties(26, 26)).toEqual({ matched: 10, total: 10 });
  });

  it("returns zero matched when an element is unknown", () => {
    expect(countMatchingProperties(999, 26)).toEqual({ matched: 0, total: 10 });
  });

  it("returns partial overlap between distinct elements", () => {
    const { matched, total } = countMatchingProperties(26, 28);
    expect(total).toBe(10);
    expect(matched).toBeGreaterThan(0);
    expect(matched).toBeLessThan(total);
  });
});

describe("getDiscoveredPropertyIds", () => {
  it("returns an empty set when history is empty", () => {
    expect(getDiscoveredPropertyIds([], 61)).toEqual(new Set());
  });

  it("discovers matching properties from wrong guesses", () => {
    const discovered = getDiscoveredPropertyIds([26], 11);
    expect(discovered.has("family")).toBe(false);
    expect(discovered.size).toBeGreaterThan(0);
    expect(discovered.size).toBeLessThan(LEGEND_ITEMS.length);
  });

  it("discovers all legend properties when mystery is in history", () => {
    const discovered = getDiscoveredPropertyIds([26, 28], 28);
    expect(discovered.size).toBe(LEGEND_ITEMS.length);
    for (const { id } of LEGEND_ITEMS) {
      expect(discovered.has(id)).toBe(true);
    }
  });
});
