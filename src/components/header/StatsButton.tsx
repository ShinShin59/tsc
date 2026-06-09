import { BarChart3 } from "lucide-react";
import { HeaderDialog } from "./HeaderDialog";
import type { OverlayControlProps } from "./shared";

export function StatsButton({ open, onOpenChange, onOpen }: OverlayControlProps) {
  return (
    <HeaderDialog
      open={open}
      onOpenChange={onOpenChange}
      onOpen={onOpen}
      icon={BarChart3}
      label="Statistiques"
      title="Statistiques"
      description="Contenu à venir."
      headerVisible
    />
  );
}
