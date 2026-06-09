import { create } from "zustand";
import { MAX_ATOMIC_NUMBER } from "@/data/elements";

export const MAX_HISTORY = MAX_ATOMIC_NUMBER;

type GameState = {
  history: number[];
  lastSelected: number | null;
  recordSelection: (elementNumber: number) => void;
  reset: () => void;
};

export const useGameStore = create<GameState>((set) => ({
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

  reset: () => set({ history: [], lastSelected: null }),
}));
