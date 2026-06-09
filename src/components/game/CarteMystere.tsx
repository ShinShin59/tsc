import { CarteIdentiteRow, type MysteryPropertyState } from "@/components/game/CarteIdentiteRow";
import { getElement } from "@/data/elements";
import { resolveIdentityPropertyValue } from "@/data/identity-property-values";
import { LEGENDE_ITEMS } from "@/data/legend-items";
import { getDiscoveredPropertyIds } from "@/lib/properties-match";
import { useGameStore } from "@/store/game";

export function CarteMystere() {
  const mysteryNumber = useGameStore((state) => state.mysteryNumber);
  const history = useGameStore((state) => state.history);
  const element = getElement(mysteryNumber);
  const discovered = getDiscoveredPropertyIds(history, mysteryNumber);

  return (
    <aside aria-label="Carte mystère" className="flex w-[175px] flex-col">
      <ul className="flex flex-col gap-y-0.5">
        {LEGENDE_ITEMS.map(({ id, icon }) => {
          const state: MysteryPropertyState = discovered.has(id) ? "discovered" : "undiscovered";

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
