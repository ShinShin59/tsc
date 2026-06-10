import { Game } from "@/components/game/Game";
import { Header } from "@/components/header/Header";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen mx-auto max-w-7xl">
        <Header />
        <Game />
      </div>
    </TooltipProvider>
  );
}

export default App;
