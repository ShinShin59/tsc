import { CarteIdentite } from "@/components/game/CarteIdentite";
import { CarteMystere } from "@/components/game/CarteMystere";
import { CaseMystere } from "@/components/game/CaseMystere";
import { CaseSelectionnee } from "@/components/game/CaseSelectionnee";
import { ElementFicheLayout } from "@/components/game/ElementFicheLayout";
import { Legende } from "@/components/game/Legende";
import { PeriodicTable } from "@/components/game/PeriodicTable";

export function Game() {
  return (
    <div className="flex h-full flex-col">
      <div className="relative min-h-0 flex-1">
        <PeriodicTable className="absolute inset-0" />
        <div className="absolute top-0 left-[15%] z-10 w-[600px] flex justify-between">
          <ElementFicheLayout>
            <CaseSelectionnee />
            <CarteIdentite />
          </ElementFicheLayout>
          <ElementFicheLayout>
            <CaseMystere />
            <CarteMystere />
          </ElementFicheLayout>
        </div>
      </div>
      <Legende />
    </div>
  );
}
