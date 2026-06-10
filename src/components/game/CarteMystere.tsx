import { PropertyCardList } from "@/components/game/PropertyCardList";
import { buildMysterePropertyRows } from "@/components/game/property-card-rows";
import { getElement } from "@/data/elements";
import { getDiscoveredPropertyIds } from "@/lib/properties-match";
import { useGameStore } from "@/store/game";

export function CarteMystere() {
  const mysteryNumber = useGameStore((state) => state.mysteryNumber);
  const history = useGameStore((state) => state.history);
  const element = getElement(mysteryNumber);
  const discovered = getDiscoveredPropertyIds(history, mysteryNumber);
  const rows = buildMysterePropertyRows(element, discovered);

  return (
    <aside aria-label="Carte mystère" className="flex w-[175px] flex-col">
      <PropertyCardList rows={rows} />
    </aside>
  );
}
