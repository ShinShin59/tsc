import { CircleHelp } from "lucide-react";
import { HeaderDialog } from "./HeaderDialog";
import type { OverlayControlProps } from "./shared";

export function HelpButton({ open, onOpenChange, onOpen }: OverlayControlProps) {
  return (
    <HeaderDialog
      open={open}
      onOpenChange={onOpenChange}
      onOpen={onOpen}
      icon={CircleHelp}
      label="Aide"
      title="Aide"
      description="Règles, légendes et sources de données"
    >
      <div className="space-y-4 text-sm leading-relaxed text-white">
        <p>
          Explications sur les règles, les légendes du jeu et les sources de données (...)
        </p>
        <p>
          Explications sur les règles, les légendes du jeu et les sources de données (...)
          Explications sur les règles, les légendes du jeu et les sources de données (...)
        </p>
      </div>
    </HeaderDialog>
  );
}
