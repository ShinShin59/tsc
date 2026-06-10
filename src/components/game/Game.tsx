import { History } from "@/components/game/History";
import { Legend } from "@/components/game/Legend";
import { NewGameButton } from "@/components/game/NewGameButton";
import { MysteryElement } from "@/components/game/mystery/MysteryElement";
import { PlayerElement } from "@/components/game/player/PlayerElement";
import { PeriodicTable } from "@/components/game/PeriodicTable";

export function Game() {
  return (
    <main className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden">
      <section aria-label="Sélection et cartes" className="shrink-0 px-2 py-1">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 md:flex-row md:items-center">
          <div className="flex gap-2 md:contents">
            <PlayerElement />
            <MysteryElement />
          </div>
          <History />
        </div>
      </section>

      <PeriodicTable />

      <footer className="flex shrink-0 items-center gap-2 border-t-3 border-accent bg-[#2d3e47]/50 px-2 py-1">
        <Legend className="min-w-0 flex-1" />
        <NewGameButton />
      </footer>
    </main>
  );
}
