import { create } from "zustand";
import { getDailySeed, mysteryIndexFromSeed } from "@/lib/daily-mystery";

const dailySeed = getDailySeed();

type GameState = {
  dailySeed: string;
  mysteryNumber: number;
  hoveredNumber: number | null;
  committedNumber: number | null;
  setHoveredNumber: (elementNumber: number | null) => void;
  commitSelection: (elementNumber: number) => void;
};

export const useGameStore = create<GameState>((set) => ({
  dailySeed,
  mysteryNumber: mysteryIndexFromSeed(dailySeed),
  hoveredNumber: null,
  committedNumber: null,

  setHoveredNumber: (elementNumber) => set({ hoveredNumber: elementNumber }),

  commitSelection: (elementNumber) =>
    set((state) => {
      if (state.committedNumber === elementNumber) {
        return state;
      }

      return { committedNumber: elementNumber };
    }),
}));
