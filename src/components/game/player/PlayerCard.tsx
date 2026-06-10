import { getElement } from "@/data/elements";
import { buildPropertyRows } from "@/components/game/property-card/buildPropertyRows";
import { PropertyCardList } from "@/components/game/property-card/PropertyCardList";
import { resolveDisplayNumber, shouldShowComparison } from "@/lib/rules";
import { useGameStore } from "@/store/game";

const cardClassName = "flex flex-col";

export function PlayerCard() {
  const hoveredNumber = useGameStore((state) => state.hoveredNumber);
  const committedNumber = useGameStore((state) => state.committedNumber);
  const history = useGameStore((state) => state.history);
  const mysteryNumber = useGameStore((state) => state.mysteryNumber);

  const displayNumber = resolveDisplayNumber({ hoveredNumber, committedNumber });
  const element = displayNumber ? getElement(displayNumber) : undefined;
  const showComparison = shouldShowComparison({
    displayNumber,
    hoveredNumber,
    committedNumber,
    history,
  });

  if (!element) {
    return null;
  }

  const rows = buildPropertyRows(element, { mode: "identity", mysteryNumber, showComparison });

  return (
    <aside aria-label="Carte d'identité" className={cardClassName}>
      <PropertyCardList rows={rows} />
    </aside>
  );
}
