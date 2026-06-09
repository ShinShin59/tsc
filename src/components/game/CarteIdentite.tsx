import { CarteIdentiteRow, type IdentityPropertyState } from "@/components/game/CarteIdentiteRow";
import { getElement } from "@/data/elements";
import { resolveIdentityPropertyValue } from "@/data/identity-property-values";
import { LEGENDE_ITEMS } from "@/data/legend-items";
import { propertiesMatch } from "@/lib/properties-match";
import { useGameStore } from "@/store/game";

export function CarteIdentite() {
  const hoveredNumber = useGameStore((state) => state.hoveredNumber);
  const committedNumber = useGameStore((state) => state.committedNumber);
  const mysteryNumber = useGameStore((state) => state.mysteryNumber);

  const displayNumber = hoveredNumber ?? committedNumber;
  const element = displayNumber ? getElement(displayNumber) : undefined;
  const showComparison =
    committedNumber !== null && displayNumber === committedNumber;

  return (
    <aside
      aria-label="Carte d'identité"
      className={`flex flex-col w-[175px]${element ? "" : " opacity-0"}`}
    >
      <ul className="flex flex-col gap-y-0.5">
        {LEGENDE_ITEMS.map(({ id, icon }) => {
          const state: IdentityPropertyState =
            showComparison && element && propertiesMatch(element.number, mysteryNumber, id)
              ? "match"
              : "mismatch";

          return (
            <CarteIdentiteRow
              key={id}
              icon={icon}
              value={resolveIdentityPropertyValue(element, id)}
              state={state}
            />
          );
        })}
      </ul>
    </aside>
  );
}
