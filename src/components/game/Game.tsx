import { History } from "@/components/game/History";
import { Legend } from "@/components/game/Legend";
import { NewGameButton } from "@/components/game/NewGameButton";
import { IdentityCard, MysteryCard } from "@/components/game/PropertyCards";
import { MysterySlot, SelectedCell } from "@/components/game/SelectedCells";
import { PeriodicTable } from "@/components/game/PeriodicTable";

export function Game() {
  return (
    <main className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)_auto]">
      <section
        aria-label="Sélection et cartes"
        className="shrink-0 border-b border-white/10 px-2 py-2"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start justify-center gap-2 lg:flex-1 lg:justify-end">
            <SelectedCell />
            <IdentityCard />
          </div>
          <History className="lg:shrink-0" />
          <div className="flex items-start justify-center gap-2 lg:flex-1 lg:justify-start">
            <MysterySlot />
            <MysteryCard />
          </div>
        </div>
      </section>

      <PeriodicTable className="min-h-0" />

      <footer className="flex shrink-0 items-center gap-3 border-t-3 border-accent bg-[#2d3e47]/50 px-2 py-1.5">
        <Legend className="min-w-0 flex-1" />
        <NewGameButton />
      </footer>
    </main>
  );
}
