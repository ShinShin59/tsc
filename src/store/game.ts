import { create } from "zustand";
import { getElement, MAX_ATOMIC_NUMBER } from "@/data/elements";
import { getDailySeed, mysteryIndexFromSeed } from "@/lib/daily-mystery";

export type GameMode = "daily" | "training";
export type PartieStatus = "playing" | "won" | "lost";

function clampMaxTries(value: number): number {
  return Math.min(MAX_ATOMIC_NUMBER, Math.max(1, Math.trunc(value)));
}

function logMysteryElement(gameMode: GameMode, seed: string, mysteryNumber: number): void {
  const element = getElement(mysteryNumber);
  const label = element ? `${element.name} (${element.symbol})` : `#${mysteryNumber}`;
  console.info(`[osc] élément mystère [${gameMode}] seed=${seed} → ${label}`);
}

function createInitialPartieState() {
  const seed = getDailySeed();
  const maxTries = MAX_ATOMIC_NUMBER;
  const mysteryNumber = mysteryIndexFromSeed(seed);

  logMysteryElement("daily", seed, mysteryNumber);

  return {
    gameMode: "daily" as GameMode,
    seed,
    mysteryNumber,
    partieStatus: "playing" as PartieStatus,
    maxTries,
    partieMaxTries: maxTries,
    hoveredNumber: null as number | null,
    committedNumber: null as number | null,
    history: [] as number[],
  };
}

type GameState = ReturnType<typeof createInitialPartieState> & {
  setHoveredNumber: (elementNumber: number | null) => void;
  setMaxTries: (maxTries: number) => void;
  commitSelection: (elementNumber: number) => void;
  startTrainingPartie: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  ...createInitialPartieState(),

  setHoveredNumber: (elementNumber) => set({ hoveredNumber: elementNumber }),

  setMaxTries: (maxTries) => set({ maxTries: clampMaxTries(maxTries) }),

  commitSelection: (elementNumber) =>
    set((state) => {
      if (state.partieStatus !== "playing") {
        return state;
      }

      if (state.committedNumber === elementNumber) {
        return state;
      }

      if (state.history.length >= state.partieMaxTries) {
        return state;
      }

      const history = [...state.history, elementNumber];
      let partieStatus: PartieStatus = state.partieStatus;

      if (elementNumber === state.mysteryNumber) {
        partieStatus = "won";
      } else if (history.length >= state.partieMaxTries) {
        partieStatus = "lost";
      }

      return {
        committedNumber: elementNumber,
        history,
        partieStatus,
      };
    }),

  startTrainingPartie: () =>
    set((state) => {
      const seed = crypto.randomUUID();
      const mysteryNumber = mysteryIndexFromSeed(seed);

      logMysteryElement("training", seed, mysteryNumber);

      return {
        gameMode: "training",
        seed,
        mysteryNumber,
        partieStatus: "playing",
        hoveredNumber: null,
        committedNumber: null,
        history: [],
        partieMaxTries: state.maxTries,
      };
    }),
}));
