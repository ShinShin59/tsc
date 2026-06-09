import { CarteIdentiteRow, type MysteryPropertyState } from "@/components/game/CarteIdentiteRow";
import { getElement } from "@/data/elements";
import { resolveIdentityPropertyValue } from "@/data/identity-property-values";
import { LEGENDE_ITEMS, type LegendePropertyId } from "@/data/legend-items";
import { useGameStore } from "@/store/game";

/** Presentation mock — wire when Carte mystère slice lands. */
const MOCK_REVEALED_PROPERTIES = new Set<LegendePropertyId>([
  "period",
  "block",
  "family",
  "nutrition",
  "stability",
]);

export function CarteMystere() {
  const mysteryNumber = useGameStore((state) => state.mysteryNumber);
  const element = getElement(mysteryNumber);

  return (
    <aside aria-label="Carte mystère" className="flex w-[175px] flex-col">
      <ul className="flex flex-col gap-y-0.5">
        {LEGENDE_ITEMS.map(({ id, icon }) => {
          const state: MysteryPropertyState = MOCK_REVEALED_PROPERTIES.has(id)
            ? "discovered"
            : "undiscovered";

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
