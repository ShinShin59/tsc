import { CarteIdentiteRow } from "@/components/game/CarteIdentiteRow";
import type { PropertyCardRow } from "@/components/game/property-card-rows";

type PropertyCardListProps = {
  rows: PropertyCardRow[];
  className?: string;
};

export function PropertyCardList({ rows, className }: PropertyCardListProps) {
  return (
    <ul className={className ?? "flex flex-col gap-y-0.5"}>
      {rows.map(({ id, icon, value, state }) => (
        <CarteIdentiteRow key={id} icon={icon} value={value} state={state} />
      ))}
    </ul>
  );
}
