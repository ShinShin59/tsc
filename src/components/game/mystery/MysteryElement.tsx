import { MysteryCard } from "@/components/game/mystery/MysteryCard";
import { MysteryCell } from "@/components/game/mystery/MysteryCell";

export function MysteryElement() {
  return (
    <div className="flex flex-col-reverse sm:flex-row min-w-0 flex-1 justify-between gap-1.5 sm:gap-2">
      <MysteryCell />
      <MysteryCard />
    </div>
  );
}
