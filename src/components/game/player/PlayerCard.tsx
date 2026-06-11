import { getElement } from "@/data/elements";
import {
  buildPropertyRows,
  buildUndiscoveredPropertyRows,
} from "@/components/game/property-card/buildPropertyRows";
import { PropertyCardList } from "@/components/game/property-card/PropertyCardList";
import { resolveDisplayElement, shouldShowComparison } from "@/lib/rules";
import { useGameStore } from "@/store/game";

const cardClassName = "flex flex-col";

export function PlayerCard() {
  const hoveredElement = useGameStore((state) => state.hoveredElement);
  const committedElement = useGameStore((state) => state.committedElement);
  const history = useGameStore((state) => state.history);
  const mysteryNumber = useGameStore((state) => state.mysteryNumber);

  const displayElement = resolveDisplayElement({ hoveredElement, committedElement });
  const element = displayElement ? getElement(displayElement) : undefined;
  const showComparison = shouldShowComparison({
    displayElement,
    hoveredElement,
    committedElement,
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
