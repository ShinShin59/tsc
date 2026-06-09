import { SELECTED_CELL_SIZE } from "./constants";

export function CaseMystere() {
  return (
    <div
      className="flex items-center justify-center rounded-sm border-2 border-accent bg-transparent"
      style={{ width: SELECTED_CELL_SIZE, height: SELECTED_CELL_SIZE }}
      aria-label="Élément mystère"
    >
      <span className="text-7xl font-bold leading-none text-accent">?</span>
    </div>
  );
}
