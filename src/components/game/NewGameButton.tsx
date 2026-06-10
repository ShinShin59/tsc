import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { shouldConfirmAbandon } from "@/lib/rules";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/game";

export function NewGameButton() {
  const history = useGameStore((state) => state.history);
  const roundStatus = useGameStore((state) => state.roundStatus);
  const startTrainingRound = useGameStore((state) => state.startTrainingRound);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClick = () => {
    if (shouldConfirmAbandon({ roundStatus, history })) {
      setConfirmOpen(true);
      return;
    }

    startTrainingRound();
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "shrink-0 border-white/50 bg-[#2d3e47]/90 text-white hover:bg-[#2d3e47] hover:text-white",
        )}
        onClick={handleClick}
      >
        Nouvelle partie
      </Button>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="border border-white/80 bg-[#2d3e47]/95 text-white ring-0 sm:max-w-md [&_[data-slot=dialog-close]]:text-white [&_[data-slot=dialog-close]]:hover:bg-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Abandonner la partie ?</DialogTitle>
            <DialogDescription className="text-white/80">
              La progression en cours sera perdue et une nouvelle partie d&apos;entraînement
              commencera.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="border-white/20 bg-transparent sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="text-black hover:text-black"
              onClick={() => setConfirmOpen(false)}
            >
              Annuler
            </Button>
            <Button
              type="button"
              onClick={() => {
                startTrainingRound();
                setConfirmOpen(false);
              }}
            >
              Nouvelle partie
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
