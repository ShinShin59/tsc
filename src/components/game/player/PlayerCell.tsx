import { getElement } from "@/data/elements";
import { resolveDisplayElement } from "@/lib/rules";
import { useGameStore } from "@/store/game";
import { ElementSlot } from "@/components/game/shared/ElementSlot";

export function PlayerCell() {
  const hoveredElement = useGameStore((state) => state.hoveredElement);
  const committedElement = useGameStore((state) => state.committedElement);

  const displayElement = resolveDisplayElement({ hoveredElement, committedElement });
  const element = displayElement ? getElement(displayElement) : undefined;

  return (
    <ElementSlot
      element={element}
      ariaLabel={
        element ? `Élément sélectionné : ${element.name}` : "Aucun élément sélectionné"
      }
    />
  );
}
