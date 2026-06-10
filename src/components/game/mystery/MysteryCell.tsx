import { getElement } from "@/data/elements";
import { isMysteryCellRevealed } from "@/lib/rules";
import { useGameStore } from "@/store/game";
import { ElementSlot } from "@/components/game/shared/ElementSlot";

export function MysteryCell() {
  const roundStatus = useGameStore((state) => state.roundStatus);
  const mysteryNumber = useGameStore((state) => state.mysteryNumber);
  const element = getElement(mysteryNumber);
  const revealed = isMysteryCellRevealed(roundStatus) && element;

  return (
    <ElementSlot
      element={revealed ? element : undefined}
      ariaLabel={
        revealed
          ? `Élément mystère : ${element.name} (${element.symbol})`
          : "Élément mystère"
      }
    />
  );
}
