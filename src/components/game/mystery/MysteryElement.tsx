import { MysteryCard } from "@/components/game/mystery/MysteryCard";
import { MysteryCell } from "@/components/game/mystery/MysteryCell";

export function MysteryElement() {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 sm:gap-2 md:order-3 md:flex-row md:justify-end">
      <MysteryCard />
      <MysteryCell />
    </div>
  );
}
