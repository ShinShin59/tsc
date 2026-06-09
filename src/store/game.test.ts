import { beforeEach, describe, expect, it } from "vitest";
import { MAX_ATOMIC_NUMBER } from "@/data/elements";
import { useGameStore } from "@/store/game";

describe("useGameStore commitSelection", () => {
  beforeEach(() => {
    useGameStore.setState({
      hoveredNumber: null,
      committedNumber: null,
      history: [],
      maxTries: MAX_ATOMIC_NUMBER,
    });
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

  it("blocks commits once maxTries is reached", () => {
    useGameStore.setState({ maxTries: 2 });
    useGameStore.getState().commitSelection(26);
    useGameStore.getState().commitSelection(11);
    useGameStore.getState().commitSelection(1);

    expect(useGameStore.getState().history).toEqual([26, 11]);
    expect(useGameStore.getState().committedNumber).toBe(11);
  });
});
