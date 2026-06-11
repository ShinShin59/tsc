import { getElement } from "@/data/elements";
import type { RoundStatus } from "@/store/game";

export type RoundSnapshot = {
  roundStatus: RoundStatus;
  history: readonly number[];
};

const DEFAULT_SUBTITLE = "• Retrouve l'Élément mystère •";

export function canCommitElement(roundStatus: RoundStatus): boolean {
  return roundStatus === "playing";
}

export function shouldConfirmAbandon({ roundStatus, history }: RoundSnapshot): boolean {
  return roundStatus === "playing" && history.length > 0;
}

export function isMysteryCellRevealed(roundStatus: RoundStatus): boolean {
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

export function resolveDisplayElement(input: {
  hoveredElement: number | null;
  committedElement: number | null;
}): number | null {
  return input.hoveredElement ?? input.committedElement;
}

export function shouldShowComparison(input: {
  displayElement: number | null;
  hoveredElement: number | null;
  committedElement: number | null;
  history: readonly number[];
}): boolean {
  return (
    input.displayElement !== null &&
    (input.history.includes(input.displayElement) ||
      (input.hoveredElement === null && input.displayElement === input.committedElement))
  );
}

export { DEFAULT_SUBTITLE };
