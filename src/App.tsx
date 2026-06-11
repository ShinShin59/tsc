import { Game } from "@/components/game/Game";
import { Header } from "@/components/header/Header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Legend } from "./components/game/Legend";
import { NewGameButton } from "./components/game/NewGameButton";

function App() {
  return (
    <TooltipProvider>
      <div className="flex h-[calc(100dvh-(--spacing(10)))] flex-col max-w-5xl mx-auto px-4">
        <Header />
        <Game />
      </div>
      <footer className="h-10 flex fixed bottom-0 left-0 right-0 shrink-0 items-center gap-2 border-t-3 border-accent bg-[#2d3e47]/50 px-2 py-1">
        <Legend className="min-w-0 flex-1" />
        <NewGameButton />
      </footer>
    </TooltipProvider>
  );
}

export default App;
