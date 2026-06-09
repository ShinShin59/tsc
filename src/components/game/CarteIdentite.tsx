import { CarteIdentiteRow } from "@/components/game/CarteIdentiteRow";
import { getElement } from "@/data/elements";
import { resolveIdentityPropertyValue } from "@/data/identity-property-values";
import { LEGENDE_ITEMS } from "@/data/legend-items";
import { useGameStore } from "@/store/game";

export function CarteIdentite() {
  const lastSelected = useGameStore((state) => state.lastSelected);
  const element = lastSelected ? getElement(lastSelected) : undefined;

  return (
    <aside aria-label="Carte d'identité" className="flex flex-col w-[175px]">
      <ul className="flex flex-col gap-y-0.5">
        {LEGENDE_ITEMS.map(({ id, icon }) => (
          <CarteIdentiteRow
            key={id}
            icon={icon}
            value={resolveIdentityPropertyValue(element, id)}
            state="off"
          />
        ))}
      </ul>
    </aside>
  );
}
