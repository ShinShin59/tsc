import { describe, expect, it } from "vitest";
import {
  canCommitCoup,
  isCaseMystereRevealed,
  resolveHeaderSubtitle,
  shouldConfirmAbandon,
} from "@/lib/partie";

describe("canCommitCoup", () => {
  it("allows commits only while playing", () => {
    expect(canCommitCoup("playing")).toBe(true);
    expect(canCommitCoup("won")).toBe(false);
    expect(canCommitCoup("lost")).toBe(false);
  });
});

describe("shouldConfirmAbandon", () => {
  it("requires confirmation when abandoning an in-progress partie with coups", () => {
    expect(shouldConfirmAbandon({ partieStatus: "playing", history: [26] })).toBe(true);
  });

  it("skips confirmation when no coups were played", () => {
    expect(shouldConfirmAbandon({ partieStatus: "playing", history: [] })).toBe(false);
  });

  it("skips confirmation after fin de partie", () => {
    expect(shouldConfirmAbandon({ partieStatus: "won", history: [26] })).toBe(false);
  });
});

describe("isCaseMystereRevealed", () => {
  it("hides the mystery symbol while playing", () => {
    expect(isCaseMystereRevealed("playing")).toBe(false);
  });

  it("reveals the mystery symbol after win or loss", () => {
    expect(isCaseMystereRevealed("won")).toBe(true);
    expect(isCaseMystereRevealed("lost")).toBe(true);
  });
});

describe("resolveHeaderSubtitle", () => {
  it("shows the default subtitle while playing", () => {
    expect(resolveHeaderSubtitle("playing", 0, 26)).toBe("• Retrouve l'Élément mystère •");
  });

  it("shows win copy with coup count", () => {
    expect(resolveHeaderSubtitle("won", 3, 26)).toBe("Bravo — Iron en 3 coups");
  });

  it("shows loss copy with element name", () => {
    expect(resolveHeaderSubtitle("lost", 2, 26)).toBe("Plus de coups — l'élément était Iron (Fe)");
  });
});
