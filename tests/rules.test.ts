import { describe, expect, it } from "vitest";
import { buildPropertyRows } from "@/components/game/property-card/buildPropertyRows";
import { getElement } from "@/data/elements";
import { getDiscoveredPropertyIds } from "@/data/properties";
import {
  canCommit,
  isMysteryCellRevealed,
  resolveDisplayNumber,
  resolveHeaderSubtitle,
  shouldConfirmAbandon,
  shouldShowComparison,
} from "@/lib/rules";

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

describe("shouldShowComparison", () => {
  it("shows comparison for a guess replayed from history", () => {
    expect(
      shouldShowComparison({
        displayNumber: 11,
        hoveredNumber: 11,
        committedNumber: 26,
        history: [26, 11],
      }),
    ).toBe(true);
  });

  it("shows comparison for last commit after mouse leave", () => {
    expect(
      shouldShowComparison({
        displayNumber: 26,
        hoveredNumber: null,
        committedNumber: 26,
        history: [26],
      }),
    ).toBe(true);
  });

  it("dims rows when browsing an uncommitted element", () => {
    expect(
      shouldShowComparison({
        displayNumber: 11,
        hoveredNumber: 11,
        committedNumber: 26,
        history: [26],
      }),
    ).toBe(false);
  });
});

describe("canCommit", () => {
  it("allows commits only while playing", () => {
    expect(canCommit("playing")).toBe(true);
    expect(canCommit("won")).toBe(false);
    expect(canCommit("lost")).toBe(false);
  });
});

describe("shouldConfirmAbandon", () => {
  it("requires confirmation when abandoning an in-progress round with guesses", () => {
    expect(shouldConfirmAbandon({ roundStatus: "playing", history: [26] })).toBe(true);
  });

  it("skips confirmation when no guesses were played", () => {
    expect(shouldConfirmAbandon({ roundStatus: "playing", history: [] })).toBe(false);
  });
});

describe("isMysteryCellRevealed", () => {
  it("hides the mystery symbol while playing", () => {
    expect(isMysteryCellRevealed("playing")).toBe(false);
  });

  it("reveals the mystery symbol after win or loss", () => {
    expect(isMysteryCellRevealed("won")).toBe(true);
    expect(isMysteryCellRevealed("lost")).toBe(true);
  });
});

describe("resolveHeaderSubtitle", () => {
  it("shows the default subtitle while playing", () => {
    expect(resolveHeaderSubtitle("playing", 0, 26)).toBe("• Retrouve l'Élément mystère •");
  });

  it("shows win copy with guess count", () => {
    expect(resolveHeaderSubtitle("won", 3, 26)).toBe("Bravo — Iron en 3 coups");
  });
});

describe("buildPropertyRows", () => {
  it("dims all rows when comparison is inactive", () => {
    const element = getElement(26);
    const rows = buildPropertyRows(element, { mode: "identity", mysteryNumber: 61, showComparison: false });
    expect(rows.every((row) => row.state === "mismatch")).toBe(true);
  });

  it("marks discovered properties on the mystery card", () => {
    const element = getElement(61);
    const discovered = getDiscoveredPropertyIds([26], 61);
    const rows = buildPropertyRows(element, { mode: "mystery", discovered });
    expect(rows.some((row) => row.state === "discovered")).toBe(true);
    expect(rows.some((row) => row.state === "undiscovered")).toBe(true);
  });
});
