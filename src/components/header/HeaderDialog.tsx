import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DialogIconBadge } from "./DialogIconBadge";
import { HeaderIconButton } from "./HeaderIconButton";
import { dialogContentClass, type OverlayControlProps } from "./shared";

type HeaderDialogProps = OverlayControlProps & {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  headerVisible?: boolean;
  children?: ReactNode;
};

export function HeaderDialog({
  open,
  onOpenChange,
  onOpen,
  icon,
  label,
  title,
  description,
  headerVisible = false,
  children,
}: HeaderDialogProps) {
  return (
    <>
      <HeaderIconButton icon={icon} label={label} onClick={onOpen} />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={cn(dialogContentClass, "pt-8")}>
          <DialogIconBadge icon={icon} />
          <DialogHeader className={headerVisible ? undefined : "sr-only"}>
            <DialogTitle className={headerVisible ? "text-center text-white" : undefined}>
              {title}
            </DialogTitle>
            <DialogDescription
              className={headerVisible ? "text-center text-white/80" : undefined}
            >
              {description}
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}
