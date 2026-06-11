import type { Element } from "@/data/elements";
import { ElementCell } from "@/components/game/ElementCell";
import { CELL_SLOT_CLASS } from "@/components/game/shared/cellSlot";
import { PlaceholderCell } from "@/components/game/shared/PlaceholderCell";

type ElementSlotProps = {
  element?: Element;
  ariaLabel: string;
};

export function ElementSlot({ element, ariaLabel }: ElementSlotProps) {
  if (!element) {
    return <PlaceholderCell ariaLabel={ariaLabel} />;
  }

  return (
    <div className={CELL_SLOT_CLASS} aria-label={ariaLabel}>
      <ElementCell element={element} selected />
    </div>
  );
}
