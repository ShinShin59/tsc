import { History } from "@/components/game/History";
import { MysteryElement } from "@/components/game/mystery/MysteryElement";
import { PlayerElement } from "@/components/game/player/PlayerElement";
import { PeriodicTable } from "@/components/game/PeriodicTable";

export function Game() {
  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col">
      <section
        aria-label="Element sélectionnés et élément mystère"
        className="flex shrink-0 flex-col min-w-0"
      >
        <div className="flex shrink-0 gap-2">
          <PlayerElement />
          <MysteryElement />
        </div>
        <div className="flex shrink-0 items-center justify-center">
          <History />
        </div>
      </section>

      <PeriodicTable />
    </main>
  );
}
