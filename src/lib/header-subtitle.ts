import { getElement } from "@/data/elements";
import type { PartieStatus } from "@/store/game";

const DEFAULT_SUBTITLE = "• Retrouve l'Élément mystère •";

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
