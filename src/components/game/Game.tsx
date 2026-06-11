import { History } from "@/components/game/History";
import { MysteryElement } from "@/components/game/mystery/MysteryElement";
import { PlayerElement } from "@/components/game/player/PlayerElement";
import { PeriodicTable } from "@/components/game/PeriodicTable";

export function Game() {
  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <section aria-label="Element sélectionnés et élément mystère" className="shrink-0 px-2 py-1">
        <div className="mx-auto flex  flex-col gap-2 md:flex-row md:items-center">
          <div className="flex gap-2 md:contents">
            <PlayerElement />
            <MysteryElement />
          </div>
          <History />
        </div>
      </section>

      <PeriodicTable />
    </main>
  );
}
