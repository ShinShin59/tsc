import { PlayerCard } from "@/components/game/player/PlayerCard";
import { PlayerCell } from "@/components/game/player/PlayerCell";

export function PlayerElement() {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 sm:gap-2 md:flex-initial md:flex-row">
      <PlayerCell />
      <PlayerCard />
    </div>
  );
}
