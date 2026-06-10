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
    <header className="relative shrink-0 px-2 pb-2 md:pb-4">
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

      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-4">
        <img
          src={loupeSrc}
          alt=""
          aria-hidden
          className="h-16 w-16 shrink-0 sm:h-20 sm:w-20 md:h-24 md:w-24"
        />
        <div className="flex flex-col items-center text-center">
          <h1>
            <img
              src={titreSrc}
              alt="Élémentaire"
              className="h-auto w-52 sm:w-64 md:w-80 lg:max-w-2xl"
            />
          </h1>
          <h2 className="max-w-full text-lg font-bold text-accent sm:text-xl md:text-2xl lg:text-4xl">
            {subtitle}
          </h2>
        </div>
      </div>
    </header>
  );
}
