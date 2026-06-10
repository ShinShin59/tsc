import { describe, expect, it } from "vitest";
import { resolveDisplayNumber, shouldShowTriangulation } from "@/lib/triangulation-view";

describe("resolveDisplayNumber", () => {
  it("prefers hovered over committed", () => {
    expect(resolveDisplayNumber({ hoveredNumber: 26, committedNumber: 11 })).toBe(26);
  });

  it("falls back to committed when not hovering", () => {
    expect(resolveDisplayNumber({ hoveredNumber: null, committedNumber: 11 })).toBe(11);
  });

  it("returns null when nothing is selected", () => {
    expect(resolveDisplayNumber({ hoveredNumber: null, committedNumber: null })).toBeNull();
  });
});

describe("shouldShowTriangulation", () => {
  const base = {
    displayNumber: 26 as number | null,
    hoveredNumber: null as number | null,
    committedNumber: 26 as number | null,
    history: [26] as readonly number[],
  };

  it("shows comparison for a coup replayed from historique", () => {
    expect(
      shouldShowTriangulation({
        displayNumber: 11,
        hoveredNumber: 11,
        committedNumber: 26,
        history: [26, 11],
      }),
    ).toBe(true);
  });

  it("shows comparison for last commit after mouse leave", () => {
    expect(
      shouldShowTriangulation({
        displayNumber: 26,
        hoveredNumber: null,
        committedNumber: 26,
        history: [26],
      }),
    ).toBe(true);
  });

  it("dims rows when browsing an uncommitted element", () => {
    expect(
      shouldShowTriangulation({
        displayNumber: 11,
        hoveredNumber: 11,
        committedNumber: 26,
        history: [26],
      }),
    ).toBe(false);
  });

  it("dims rows when nothing is displayed", () => {
    expect(
      shouldShowTriangulation({
        displayNumber: null,
        hoveredNumber: null,
        committedNumber: null,
        history: [],
      }),
    ).toBe(false);
  });

  it("shows comparison while pointer stays on a freshly committed cell", () => {
    expect(
      shouldShowTriangulation({
        ...base,
        hoveredNumber: 26,
        displayNumber: 26,
      }),
    ).toBe(true);
  });
});
