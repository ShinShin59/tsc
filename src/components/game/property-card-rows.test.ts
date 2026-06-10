import { describe, expect, it } from "vitest";
import { getElement } from "@/data/elements";
import {
  buildIdentitePropertyRows,
  buildMysterePropertyRows,
} from "@/components/game/property-card-rows";
import { getDiscoveredPropertyIds } from "@/lib/properties-match";

describe("buildIdentitePropertyRows", () => {
  it("dims all rows when comparison is inactive", () => {
    const element = getElement(26);
    const rows = buildIdentitePropertyRows(element, 61, false);
    expect(rows.every((row) => row.state === "mismatch")).toBe(true);
    expect(rows.some((row) => row.value !== "—")).toBe(true);
  });

  it("highlights matching properties when comparison is active", () => {
    const element = getElement(26);
    const rows = buildIdentitePropertyRows(element, 26, true);
    expect(rows.every((row) => row.state === "match")).toBe(true);
  });
});

describe("buildMysterePropertyRows", () => {
  it("marks discovered properties from history", () => {
    const element = getElement(61);
    const discovered = getDiscoveredPropertyIds([26], 61);
    const rows = buildMysterePropertyRows(element, discovered);
    expect(rows.some((row) => row.state === "discovered")).toBe(true);
    expect(rows.some((row) => row.state === "undiscovered")).toBe(true);
  });
});
