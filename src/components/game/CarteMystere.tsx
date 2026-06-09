import { CarteIdentiteRow } from "@/components/game/CarteIdentiteRow";
import { getElement } from "@/data/elements";
import { resolveIdentityPropertyValue } from "@/data/identity-property-values";
import { LEGENDE_ITEMS, type LegendePropertyId } from "@/data/legend-items";

/** Presentation mock — wire to store when comparison engine lands. */
const MOCK_MYSTERY_NUMBER = 1;
const MOCK_REVEALED_PROPERTIES = new Set<LegendePropertyId>([
  "period",
  "block",
  "family",
  "nutrition",
  "stability",
]);

export function CarteMystere() {
  const element = getElement(MOCK_MYSTERY_NUMBER);

  return (
    <aside aria-label="Carte mystère" className="flex w-[175px] flex-col">
      <ul className="flex flex-col gap-y-0.5">
        {LEGENDE_ITEMS.map(({ id, icon }) => {
          const revealed = MOCK_REVEALED_PROPERTIES.has(id);

          return (
            <CarteIdentiteRow
              key={id}
              icon={icon}
              value={resolveIdentityPropertyValue(element, id)}
              state={revealed ? "revealed" : "hidden"}
            />
          );
        })}
      </ul>
    </aside>
  );
}
