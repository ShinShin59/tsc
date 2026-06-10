import { getElement } from "@/data/elements";
import type { RoundStatus } from "@/store/game";

export type RoundSnapshot = {
  roundStatus: RoundStatus;
  history: readonly number[];
};

const DEFAULT_SUBTITLE = "• Retrouve l'Élément mystère •";

export function canCommit(roundStatus: RoundStatus): boolean {
  return roundStatus === "playing";
}

export function shouldConfirmAbandon({ roundStatus, history }: RoundSnapshot): boolean {
  return roundStatus === "playing" && history.length > 0;
}

export function isMysterySlotRevealed(roundStatus: RoundStatus): boolean {
  return roundStatus !== "playing";
}

export function resolveHeaderSubtitle(
  roundStatus: RoundStatus,
  historyLength: number,
  mysteryNumber: number,
): string {
  const element = getElement(mysteryNumber);

  if (roundStatus === "won") {
    const guessLabel = historyLength === 1 ? "coup" : "coups";
    return `Bravo — ${element?.name ?? "?"} en ${historyLength} ${guessLabel}`;
  }

  if (roundStatus === "lost") {
    return `Plus de coups — l'élément était ${element?.name ?? "?"} (${element?.symbol ?? "?"})`;
  }

  return DEFAULT_SUBTITLE;
}

export function resolveDisplayNumber(input: {
  hoveredNumber: number | null;
  committedNumber: number | null;
}): number | null {
  return input.hoveredNumber ?? input.committedNumber;
}

export function shouldShowComparison(input: {
  displayNumber: number | null;
  hoveredNumber: number | null;
  committedNumber: number | null;
  history: readonly number[];
}): boolean {
  return (
    input.displayNumber !== null &&
    (input.history.includes(input.displayNumber) ||
      (input.hoveredNumber === null && input.displayNumber === input.committedNumber))
  );
}

export { DEFAULT_SUBTITLE };
