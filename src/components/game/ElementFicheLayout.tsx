import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ElementFicheLayoutProps = {
  children: ReactNode;
  className?: string;
};

export function ElementFicheLayout({ children, className }: ElementFicheLayoutProps) {
  return <div className={cn("flex items-center gap-x-2", className)}>{children}</div>;
}
