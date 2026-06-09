import { create } from "zustand";
import { MAX_ATOMIC_NUMBER } from "@/data/elements";
import { getDailySeed, mysteryIndexFromSeed } from "@/lib/daily-mystery";

export const MAX_HISTORY = MAX_ATOMIC_NUMBER;

const dailySeed = getDailySeed();

type GameState = {
  dailySeed: string;
  mysteryNumber: number;
  history: number[];
  lastSelected: number | null;
  recordSelection: (elementNumber: number) => void;
};

export const useGameStore = create<GameState>((set) => ({
  dailySeed,
  mysteryNumber: mysteryIndexFromSeed(dailySeed),
  history: [],
  lastSelected: null,

  recordSelection: (elementNumber) =>
    set((state) => {
      if (state.lastSelected === elementNumber) {
        return state;
      }

      return {
        history: [...state.history, elementNumber].slice(-MAX_HISTORY),
        lastSelected: elementNumber,
      };
    }),
}));
