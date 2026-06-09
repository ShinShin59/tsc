import { beforeEach, describe, expect, it } from "vitest";
import { MAX_ATOMIC_NUMBER } from "@/data/elements";
import { useGameStore } from "@/store/game";

function resetStore(overrides: Partial<ReturnType<typeof useGameStore.getState>> = {}) {
  useGameStore.setState({
    gameMode: "daily",
    seed: "2026-06-09",
    mysteryNumber: 61,
    partieStatus: "playing",
    maxTries: MAX_ATOMIC_NUMBER,
    partieMaxTries: MAX_ATOMIC_NUMBER,
    hoveredNumber: null,
    committedNumber: null,
    history: [],
    ...overrides,
  });
}

describe("useGameStore commitSelection", () => {
  beforeEach(() => {
    resetStore();
  });

  it("appends a new element to history on commit", () => {
    useGameStore.getState().commitSelection(26);
    expect(useGameStore.getState().committedNumber).toBe(26);
    expect(useGameStore.getState().history).toEqual([26]);
  });

  it("does not append when re-clicking the same element", () => {
    useGameStore.getState().commitSelection(26);
    useGameStore.getState().commitSelection(26);
    expect(useGameStore.getState().history).toEqual([26]);
  });

  it("appends each distinct commit chronologically", () => {
    useGameStore.getState().commitSelection(26);
    useGameStore.getState().commitSelection(11);
    useGameStore.getState().commitSelection(1);
    expect(useGameStore.getState().history).toEqual([26, 11, 1]);
  });

  it("blocks commits once partieMaxTries is reached", () => {
    resetStore({ partieMaxTries: 2, maxTries: 2 });
    useGameStore.getState().commitSelection(26);
    useGameStore.getState().commitSelection(11);
    useGameStore.getState().commitSelection(1);

    expect(useGameStore.getState().history).toEqual([26, 11]);
    expect(useGameStore.getState().committedNumber).toBe(11);
  });

  it("sets partieStatus to won when mystery element is committed", () => {
    resetStore({ mysteryNumber: 26 });
    useGameStore.getState().commitSelection(11);
    useGameStore.getState().commitSelection(26);

    expect(useGameStore.getState().partieStatus).toBe("won");
    expect(useGameStore.getState().history).toEqual([11, 26]);
  });

  it("sets partieStatus to lost when cap is reached without a win", () => {
    resetStore({ mysteryNumber: 1, partieMaxTries: 2, maxTries: 2 });
    useGameStore.getState().commitSelection(26);
    useGameStore.getState().commitSelection(11);

    expect(useGameStore.getState().partieStatus).toBe("lost");
    expect(useGameStore.getState().history).toEqual([26, 11]);
  });

  it("blocks commits after the partie ends", () => {
    resetStore({ mysteryNumber: 26 });
    useGameStore.getState().commitSelection(26);

    useGameStore.getState().commitSelection(11);
    expect(useGameStore.getState().history).toEqual([26]);
    expect(useGameStore.getState().partieStatus).toBe("won");
  });
});

describe("useGameStore setMaxTries", () => {
  beforeEach(() => {
    resetStore({ partieMaxTries: 10 });
  });

  it("clamps preference to 1..MAX_ATOMIC_NUMBER", () => {
    useGameStore.getState().setMaxTries(0);
    expect(useGameStore.getState().maxTries).toBe(1);

    useGameStore.getState().setMaxTries(999);
    expect(useGameStore.getState().maxTries).toBe(MAX_ATOMIC_NUMBER);
  });

  it("does not change partieMaxTries mid-partie", () => {
    useGameStore.getState().setMaxTries(5);
    expect(useGameStore.getState().partieMaxTries).toBe(10);
  });
});

describe("useGameStore startTrainingPartie", () => {
  beforeEach(() => {
    resetStore({ maxTries: 12, partieMaxTries: 10, history: [26], committedNumber: 26 });
  });

  it("resets session state and switches to training", () => {
    useGameStore.getState().startTrainingPartie();
    const state = useGameStore.getState();

    expect(state.gameMode).toBe("training");
    expect(state.partieStatus).toBe("playing");
    expect(state.history).toEqual([]);
    expect(state.committedNumber).toBeNull();
    expect(state.hoveredNumber).toBeNull();
    expect(state.partieMaxTries).toBe(12);
    expect(state.seed).not.toBe("2026-06-09");
    expect(state.mysteryNumber).toBeGreaterThanOrEqual(1);
    expect(state.mysteryNumber).toBeLessThanOrEqual(MAX_ATOMIC_NUMBER);
  });
});
