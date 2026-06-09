import { useGameStore } from "@/store/game";
import { HISTORY_CONTAINER_WIDTH, HISTORY_GAP, HISTORY_VISIBLE_COUNT } from "./constants";
import { HistoryCase } from "./HistoryCase";

export function Historique() {
  const history = useGameStore((state) => state.history);
  const mysteryNumber = useGameStore((state) => state.mysteryNumber);
  const setHoveredNumber = useGameStore((state) => state.setHoveredNumber);

  if (history.length === 0) {
    return null;
  }

  const visible = history.slice(-HISTORY_VISIBLE_COUNT);
  const startIndex = history.length - visible.length;

  return (
    <div
      aria-label="Historique des coups"
      className="absolute top-6 right-[11%] z-10 flex"
      style={{ width: HISTORY_CONTAINER_WIDTH, gap: HISTORY_GAP }}
      onMouseLeave={() => setHoveredNumber(null)}
    >
      {visible.map((elementNumber, index) => (
        <HistoryCase
          key={startIndex + index}
          elementNumber={elementNumber}
          mysteryNumber={mysteryNumber}
          onMouseEnter={() => setHoveredNumber(elementNumber)}
        />
      ))}
    </div>
  );
}
