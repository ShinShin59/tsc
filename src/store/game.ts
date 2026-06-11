import { create } from "zustand";
import { getElement, MAX_ATOMIC_NUMBER } from "@/data/elements";
import { getDailySeed, mysteryIndexFromSeed } from "@/lib/daily-mystery";

export type GameMode = "daily" | "training";
export type RoundStatus = "playing" | "won" | "lost";

function clampMaxTries(value: number): number {
  return Math.min(MAX_ATOMIC_NUMBER, Math.max(1, Math.trunc(value)));
}

function logMysteryElement(gameMode: GameMode, seed: string, mysteryNumber: number): void {
  const element = getElement(mysteryNumber);
  const label = element ? `${element.name} (${element.symbol})` : `#${mysteryNumber}`;
  console.info(`[tsc] élément mystère [${gameMode}] seed=${seed} → ${label}`);
}

function createInitialRoundState() {
  const seed = getDailySeed();
  const maxTries = MAX_ATOMIC_NUMBER;
  const mysteryNumber = mysteryIndexFromSeed(seed);

  logMysteryElement("daily", seed, mysteryNumber);

  return {
    gameMode: "daily" as GameMode,
    seed,
    mysteryNumber,
    roundStatus: "playing" as RoundStatus,
    maxTries,
    roundMaxTries: maxTries,
    hoveredElement: null as number | null,
    committedElement: null as number | null,
    history: [] as number[],
  };
}

type GameState = ReturnType<typeof createInitialRoundState> & {
  setHoveredElement: (elementNumber: number | null) => void;
  setMaxTries: (maxTries: number) => void;
  commitElement: (elementNumber: number) => void;
  startTrainingRound: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  ...createInitialRoundState(),

  setHoveredElement: (elementNumber) => set({ hoveredElement: elementNumber }),

  setMaxTries: (maxTries) => set({ maxTries: clampMaxTries(maxTries) }),

  commitElement: (elementNumber) =>
    set((state) => {
      if (state.roundStatus !== "playing") {
        return state;
      }

      if (state.committedElement === elementNumber) {
        return state;
      }

      if (state.history.length >= state.roundMaxTries) {
        return state;
      }

      const history = [...state.history, elementNumber];
      let roundStatus: RoundStatus = state.roundStatus;

      if (elementNumber === state.mysteryNumber) {
        roundStatus = "won";
      } else if (history.length >= state.roundMaxTries) {
        roundStatus = "lost";
      }

      return {
        committedElement: elementNumber,
        history,
        roundStatus,
      };
    }),

  startTrainingRound: () =>
    set((state) => {
      const seed = crypto.randomUUID();
      const mysteryNumber = mysteryIndexFromSeed(seed);

      logMysteryElement("training", seed, mysteryNumber);

      return {
        gameMode: "training",
        seed,
        mysteryNumber,
        roundStatus: "playing",
        hoveredElement: null,
        committedElement: null,
        history: [],
        roundMaxTries: state.maxTries,
      };
    }),
}));
