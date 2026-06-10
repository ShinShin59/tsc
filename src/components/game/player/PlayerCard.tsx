import { getElement } from "@/data/elements";
import {
  buildPropertyRows,
  buildUndiscoveredPropertyRows,
} from "@/components/game/property-card/buildPropertyRows";
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

  const rows = element
    ? buildPropertyRows(element, { mode: "identity", mysteryNumber, showComparison })
    : buildUndiscoveredPropertyRows();

  return (
    <aside aria-label="Carte d'identité" className={cardClassName}>
      <PropertyCardList rows={rows} />
    </aside>
  );
}
