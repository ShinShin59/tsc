import { useState } from "react";
import loupeSrc from "@/assets/loupe.png";
import titreSrc from "@/assets/titre.png";
import { HelpButton } from "@/components/header/HelpButton";
import { InfoButton } from "@/components/header/InfoButton";
import { SettingsButton } from "@/components/header/SettingsButton";
import { StatsButton } from "@/components/header/StatsButton";
import type { OverlayId } from "@/components/header/shared";
import { resolveHeaderSubtitle } from "@/lib/rules";
import { useGameStore } from "@/store/game";

export function Header() {
  const [activeOverlay, setActiveOverlay] = useState<OverlayId | null>(null);
  const roundStatus = useGameStore((state) => state.roundStatus);
  const history = useGameStore((state) => state.history);
  const mysteryNumber = useGameStore((state) => state.mysteryNumber);
  const subtitle = resolveHeaderSubtitle(roundStatus, history.length, mysteryNumber);

  const openOverlay = (overlay: OverlayId) => {
    setActiveOverlay(overlay);
  };

  const handleOverlayOpenChange = (overlay: OverlayId, open: boolean) => {
    if (open) {
      setActiveOverlay(overlay);
      return;
    }
    setActiveOverlay((current) => (current === overlay ? null : current));
  };

  return (
    <header className="relative px-2 pb-10">
      <nav className="flex items-center justify-end gap-1 py-1" aria-label="Actions">
        <StatsButton
          open={activeOverlay === "stats"}
          onOpen={() => openOverlay("stats")}
          onOpenChange={(open) => handleOverlayOpenChange("stats", open)}
        />
        <HelpButton
          open={activeOverlay === "help"}
          onOpen={() => openOverlay("help")}
          onOpenChange={(open) => handleOverlayOpenChange("help", open)}
        />
        <InfoButton
          open={activeOverlay === "info"}
          onOpen={() => openOverlay("info")}
          onOpenChange={(open) => handleOverlayOpenChange("info", open)}
        />
        <SettingsButton
          open={activeOverlay === "settings"}
          onOpen={() => openOverlay("settings")}
          onOpenChange={(open) => handleOverlayOpenChange("settings", open)}
        />
      </nav>

      <div className="relative flex items-center justify-center flex-wrap">
        <img src={loupeSrc} alt="" aria-hidden className="h-50 w-50" />
        <div className="flex flex-col items-center text-center">
          <h1>
            <img src={titreSrc} alt="Élémentaire" className="h-auto w-full max-w-4xl" />
          </h1>
        </div>
        <h2 className="text-4xl font-bold text-accent w-100%">{subtitle}</h2>
      </div>
    </header>
  );
}
