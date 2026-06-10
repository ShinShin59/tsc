import { History } from "@/components/game/History";
import { Legend } from "@/components/game/Legend";
import { NewGameButton } from "@/components/game/NewGameButton";
import { IdentityCard, MysteryCard } from "@/components/game/PropertyCards";
import { MysterySlot, SelectedCell } from "@/components/game/SelectedCells";
import { PeriodicTable } from "@/components/game/PeriodicTable";
import { cn } from "@/lib/utils";

export function Game() {
  return (
    <div className="flex h-full flex-col">
      <div className="relative min-h-0 flex-1">
        <PeriodicTable className="absolute inset-0" />
        <History />
        <div className="absolute top-0 left-[15%] z-10 w-[600px] flex justify-between">
          <div className={cn("flex items-center gap-x-2")}>
            <SelectedCell />
            <IdentityCard />
          </div>
          <div className={cn("flex items-center gap-x-2")}>
            <MysterySlot />
            <MysteryCard />
          </div>
        </div>
        <NewGameButton />
      </div>
      <Legend />
    </div>
  );
}
