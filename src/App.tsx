import { Game } from "@/components/game/Game";
import { Header } from "@/components/header/Header";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <div className="mx-auto flex h-dvh max-w-7xl flex-col overflow-hidden">
        <Header />
        <Game />
      </div>
    </TooltipProvider>
  );
}

export default App;
