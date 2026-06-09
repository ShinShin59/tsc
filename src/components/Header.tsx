import { useState } from "react";
import loupeSrc from "@/assets/loupe.png";
import titreSrc from "@/assets/titre.png";
import { HelpButton } from "@/components/header/HelpButton";
import { InfoButton } from "@/components/header/InfoButton";
import { SettingsButton } from "@/components/header/SettingsButton";
import { StatsButton } from "@/components/header/StatsButton";
import type { OverlayId } from "@/components/header/shared";

export function Header() {
  const [activeOverlay, setActiveOverlay] = useState<OverlayId | null>(null);

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
    <header className="relative px-2 pb-2">
      <nav
        className="flex items-center justify-end gap-1 py-1"
        aria-label="Actions"
      >
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

      <div className="relative pt-1">
        <img
          src={loupeSrc}
          alt=""
          aria-hidden
          className="absolute left-0 top-1/2 h-20 w-20 -translate-y-1/2 sm:h-24 sm:w-24"
        />
        <div className="flex flex-col items-center text-center">
          <h1>
            <img
              src={titreSrc}
              alt="Élémentaire"
              className="mx-auto h-auto w-full max-w-xl sm:max-w-2xl"
            />
          </h1>
          <h2 className="mt-1 text-base font-semibold text-white sm:text-lg">
            Retrouvez l'élément mystère
          </h2>
        </div>
      </div>
    </header>
  );
}
