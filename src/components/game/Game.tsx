import { History } from "@/components/game/History";
import { Legend } from "@/components/game/Legend";
import { NewGameButton } from "@/components/game/NewGameButton";
import { IdentityCard, MysteryCard } from "@/components/game/PropertyCards";
import { MysterySlot, SelectedCell } from "@/components/game/SelectedCells";
import { PeriodicTable } from "@/components/game/PeriodicTable";

export function Game() {
  return (
    <main className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden">
      <section
        aria-label="Sélection et cartes"
        className="shrink-0 border-b border-white/10 px-2 py-1"
      >
        <div className="mx-auto flex max-w-5xl items-start justify-center gap-2 sm:justify-between">
          <div className="flex min-w-0 items-start gap-1.5 sm:gap-2">
            <SelectedCell />
            <IdentityCard />
          </div>
          <History />
          <div className="flex min-w-0 items-start gap-1.5 sm:gap-2">
            <MysterySlot />
            <MysteryCard />
          </div>
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
