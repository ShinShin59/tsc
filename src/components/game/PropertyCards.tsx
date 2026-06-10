import type { Element } from "@/data/elements";
import { getElement } from "@/data/elements";
import {
  getDiscoveredPropertyIds,
  LEGEND_ITEMS,
  propertiesMatch,
  resolveIdentityPropertyValue,
  type LegendPropertyId,
} from "@/data/properties";
import { resolveDisplayNumber, shouldShowComparison } from "@/lib/rules";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game";

type IdentityRowState = "match" | "mismatch";
type MysteryRowState = "discovered" | "undiscovered";
type PropertyRowState = IdentityRowState | MysteryRowState;

type PropertyCardRow = {
  id: LegendPropertyId;
  icon: string;
  value: string;
  state: PropertyRowState;
};

function buildPropertyRows(
  element: Element | undefined,
  options:
    | { mode: "identity"; mysteryNumber: number; showComparison: boolean }
    | { mode: "mystery"; discovered: ReadonlySet<LegendPropertyId> },
): PropertyCardRow[] {
  return LEGEND_ITEMS.map(({ id, icon }) => {
    const state: PropertyRowState =
      options.mode === "identity"
        ? options.showComparison &&
          element &&
          propertiesMatch(element.number, options.mysteryNumber, id)
          ? "match"
          : "mismatch"
        : options.discovered.has(id)
          ? "discovered"
          : "undiscovered";

    return {
      id,
      icon,
      value: resolveIdentityPropertyValue(element, id),
      state,
    };
  });
}

function PropertyCardRow({ icon, value, state = "mismatch" }: Omit<PropertyCardRow, "id">) {
  const isDimmed = state === "mismatch";
  const isUndiscovered = state === "undiscovered";

  return (
    <li className="flex items-center gap-x-1">
      <img
        src={icon}
        alt=""
        aria-hidden
        className={cn(
          "size-3.5 shrink-0 object-contain sm:size-4",
          (isDimmed || isUndiscovered) && "brightness-0 opacity-30",
        )}
      />
      <span
        className={cn(
          "min-w-0 truncate text-[10px] font-bold leading-none sm:text-[11px]",
          state === "match" && "text-accent",
          isDimmed && "text-black/35",
          state === "discovered" && "text-accent",
          isUndiscovered && "text-accent/50",
        )}
        title={isUndiscovered ? undefined : value}
      >
        {isUndiscovered ? "?" : value}
      </span>
    </li>
  );
}

function PropertyCardList({ rows }: { rows: PropertyCardRow[] }) {
  return (
    <ul className="flex flex-col gap-px sm:gap-0.5">
      {rows.map(({ id, icon, value, state }) => (
        <PropertyCardRow key={id} icon={icon} value={value} state={state} />
      ))}
    </ul>
  );
}

const cardClassName = "flex w-[88px] flex-col sm:w-[104px] md:w-[120px]";

export function IdentityCard() {
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

export function MysteryCard() {
  const mysteryNumber = useGameStore((state) => state.mysteryNumber);
  const history = useGameStore((state) => state.history);
  const element = getElement(mysteryNumber);
  const discovered = getDiscoveredPropertyIds(history, mysteryNumber);
  const rows = buildPropertyRows(element, { mode: "mystery", discovered });

  return (
    <aside aria-label="Carte mystère" className={cardClassName}>
      <PropertyCardList rows={rows} />
    </aside>
  );
}

export { buildPropertyRows, type PropertyCardRow };
