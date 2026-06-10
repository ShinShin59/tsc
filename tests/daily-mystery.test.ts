import { describe, expect, it } from "vitest";
import { getDailySeed, hashStringDjb2, mysteryIndexFromSeed } from "@/lib/daily-mystery";

describe("mysteryIndexFromSeed", () => {
  it.each([
    ["2026-06-09", 61],
    ["2026-01-01", 82],
    ["2025-12-31", 54],
  ])("maps %s to element %i", (seed, expected) => {
    expect(mysteryIndexFromSeed(seed)).toBe(expected);
  });

  it("is deterministic for the same seed", () => {
    expect(mysteryIndexFromSeed("2026-06-09")).toBe(mysteryIndexFromSeed("2026-06-09"));
  });

  it("returns atomic numbers in 1–118", () => {
    for (let day = 1; day <= 28; day += 1) {
      const seed = `2026-01-${String(day).padStart(2, "0")}`;
      const index = mysteryIndexFromSeed(seed);
      expect(index).toBeGreaterThanOrEqual(1);
      expect(index).toBeLessThanOrEqual(118);
    }
  });
});

describe("hashStringDjb2", () => {
  it("returns unsigned 32-bit integers", () => {
    expect(hashStringDjb2("2026-06-09")).toBeLessThanOrEqual(0xffff_ffff);
    expect(hashStringDjb2("2026-06-09")).toBeGreaterThanOrEqual(0);
  });
});

describe("getDailySeed", () => {
  it("formats as YYYY-MM-DD in Europe/Paris", () => {
    const seed = getDailySeed(new Date("2026-06-08T22:30:00.000Z"));
    expect(seed).toBe("2026-06-09");
  });

  it("uses Paris calendar date before UTC midnight", () => {
    const seed = getDailySeed(new Date("2026-06-08T21:59:59.000Z"));
    expect(seed).toBe("2026-06-08");
  });
});
