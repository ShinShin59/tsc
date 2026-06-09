import { create } from "zustand";
import { MAX_ATOMIC_NUMBER } from "@/data/elements";
import { getDailySeed, mysteryIndexFromSeed } from "@/lib/daily-mystery";

const dailySeed = getDailySeed();

type GameState = {
  dailySeed: string;
  mysteryNumber: number;
  hoveredNumber: number | null;
  committedNumber: number | null;
  history: number[];
  maxTries: number;
  setHoveredNumber: (elementNumber: number | null) => void;
  commitSelection: (elementNumber: number) => void;
};

export const useGameStore = create<GameState>((set) => ({
  dailySeed,
  mysteryNumber: mysteryIndexFromSeed(dailySeed),
  hoveredNumber: null,
  committedNumber: null,
  history: [],
  maxTries: MAX_ATOMIC_NUMBER,

  setHoveredNumber: (elementNumber) => set({ hoveredNumber: elementNumber }),

  commitSelection: (elementNumber) =>
    set((state) => {
      if (state.committedNumber === elementNumber) {
        return state;
      }

      if (state.history.length >= state.maxTries) {
        return state;
      }

      return {
        committedNumber: elementNumber,
        history: [...state.history, elementNumber],
      };
    }),
}));
