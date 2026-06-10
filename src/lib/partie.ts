import { getElement } from "@/data/elements";
import type { PartieStatus } from "@/store/game";

export type PartieSnapshot = {
  partieStatus: PartieStatus;
  history: readonly number[];
};

const DEFAULT_SUBTITLE = "• Retrouve l'Élément mystère •";

export function canCommitCoup(partieStatus: PartieStatus): boolean {
  return partieStatus === "playing";
}

export function shouldConfirmAbandon({ partieStatus, history }: PartieSnapshot): boolean {
  return partieStatus === "playing" && history.length > 0;
}

export function isCaseMystereRevealed(partieStatus: PartieStatus): boolean {
  return partieStatus !== "playing";
}

export function resolveHeaderSubtitle(
  partieStatus: PartieStatus,
  historyLength: number,
  mysteryNumber: number,
): string {
  const element = getElement(mysteryNumber);

  if (partieStatus === "won") {
    const coupLabel = historyLength === 1 ? "coup" : "coups";
    return `Bravo — ${element?.name ?? "?"} en ${historyLength} ${coupLabel}`;
  }

  if (partieStatus === "lost") {
    return `Plus de coups — l'élément était ${element?.name ?? "?"} (${element?.symbol ?? "?"})`;
  }

  return DEFAULT_SUBTITLE;
}

export { DEFAULT_SUBTITLE };
