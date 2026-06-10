import { useState } from "react";
import { Settings } from "lucide-react";
import { HeaderDialog } from "@/components/header/HeaderDialog";
import type { OverlayControlProps } from "@/components/header/shared";
import { MAX_ATOMIC_NUMBER } from "@/data/elements";
import { useGameStore } from "@/store/game";

export function SettingsButton({ open, onOpenChange, onOpen }: OverlayControlProps) {
  const maxTries = useGameStore((state) => state.maxTries);
  const roundMaxTries = useGameStore((state) => state.roundMaxTries);
  const roundStatus = useGameStore((state) => state.roundStatus);
  const setMaxTries = useGameStore((state) => state.setMaxTries);
  const [language, setLanguage] = useState<"fr" | "en">("fr");
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <HeaderDialog
      open={open}
      onOpenChange={onOpenChange}
      onOpen={onOpen}
      icon={Settings}
      label="Réglages"
      title="Réglages"
      description="Préférences de partie et options"
      headerVisible
    >
      <div className="space-y-5 text-sm text-white">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="max-tries-slider" className="font-medium">
              Coups maximum
            </label>
            <span className="tabular-nums text-white/90">
              {maxTries} / {MAX_ATOMIC_NUMBER}
            </span>
          </div>
          <input
            id="max-tries-slider"
            type="range"
            min={1}
            max={MAX_ATOMIC_NUMBER}
            value={maxTries}
            onChange={(event) => setMaxTries(Number(event.target.value))}
            className="w-full accent-accent"
          />
          {roundStatus === "playing" && (
            <p className="text-xs text-white/70">
              Partie en cours : {roundMaxTries} coups. Prochaine partie : {maxTries} coups.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <p className="font-medium">Langue</p>
          <div className="flex gap-2">
            {(["fr", "en"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={language === value}
                className={`rounded-md border px-3 py-1 uppercase ${
                  language === value
                    ? "border-accent bg-accent/20 text-white"
                    : "border-white/30 text-white/80"
                }`}
                onClick={() => setLanguage(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="rounded-md border border-white/30 px-3 py-1"
          aria-label={soundEnabled ? "Son activé" : "Son désactivé"}
          onClick={() => setSoundEnabled((enabled) => !enabled)}
        >
          {soundEnabled ? "🔊 Son activé" : "🔇 Son désactivé"}
        </button>
      </div>
    </HeaderDialog>
  );
}
