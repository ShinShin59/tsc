import { getElement } from "@/data/elements";
import { getDiscoveredPropertyIds } from "@/data/properties";
import { buildPropertyRows } from "@/components/game/property-card/buildPropertyRows";
import { PropertyCardList } from "@/components/game/property-card/PropertyCardList";
import { useGameStore } from "@/store/game";

const cardClassName = "flex flex-col";

export function MysteryCard() {
  const mysteryNumber = useGameStore((state) => state.mysteryNumber);
  const history = useGameStore((state) => state.history);
  const element = getElement(mysteryNumber);
  const discovered = getDiscoveredPropertyIds(history, mysteryNumber);
  const rows = buildPropertyRows(element, { mode: "mystery", discovered });

  return (
    <aside aria-label="Carte mystère" className={cardClassName}>
      <PropertyCardList rows={rows} iconEnd />
    </aside>
  );
}
