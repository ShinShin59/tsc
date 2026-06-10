import { getElement } from "@/data/elements";
import { resolveDisplayNumber } from "@/lib/rules";
import { useGameStore } from "@/store/game";
import { ElementSlot } from "@/components/game/shared/ElementSlot";

export function PlayerCell() {
  const hoveredNumber = useGameStore((state) => state.hoveredNumber);
  const committedNumber = useGameStore((state) => state.committedNumber);

  const displayNumber = resolveDisplayNumber({ hoveredNumber, committedNumber });
  const element = displayNumber ? getElement(displayNumber) : undefined;

  return (
    <ElementSlot
      element={element}
      ariaLabel={
        element ? `Élément sélectionné : ${element.name}` : "Aucun élément sélectionné"
      }
    />
  );
}
