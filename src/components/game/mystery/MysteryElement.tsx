import { MysteryCard } from "@/components/game/mystery/MysteryCard";
import { MysteryCell } from "@/components/game/mystery/MysteryCell";

export function MysteryElement() {
  return (
    <div className="flex min-w-0 flex-1 items-start justify-end gap-1.5 sm:gap-2">
      <MysteryCard />
      <MysteryCell />
    </div>
  );
}
