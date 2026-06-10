import { PropertyCardList } from "@/components/game/PropertyCardList";
import { buildIdentitePropertyRows } from "@/components/game/property-card-rows";
import { getElement } from "@/data/elements";
import { resolveDisplayNumber, shouldShowTriangulation } from "@/lib/triangulation-view";
import { useGameStore } from "@/store/game";

export function CarteIdentite() {
  const hoveredNumber = useGameStore((state) => state.hoveredNumber);
  const committedNumber = useGameStore((state) => state.committedNumber);
  const history = useGameStore((state) => state.history);
  const mysteryNumber = useGameStore((state) => state.mysteryNumber);

  const displayNumber = resolveDisplayNumber({ hoveredNumber, committedNumber });
  const element = displayNumber ? getElement(displayNumber) : undefined;
  const showComparison = shouldShowTriangulation({
    displayNumber,
    hoveredNumber,
    committedNumber,
    history,
  });
  const rows = buildIdentitePropertyRows(element, mysteryNumber, showComparison);

  return (
    <aside
      aria-label="Carte d'identité"
      className={`flex flex-col w-[175px]${element ? "" : " opacity-0"}`}
    >
      <PropertyCardList rows={rows} />
    </aside>
  );
}
