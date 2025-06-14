"use client";

import { Dialog, DialogContent, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

interface LiquidGlassDialogProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function LiquidGlassDialog({
  children,
  className,
  open,
  onOpenChange,
}: LiquidGlassDialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!contentRef.current) return;

      const rect = contentRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setMousePosition({ x, y });
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener("mousemove", handleMouseMove);
      content.addEventListener("mouseenter", () => setIsHovered(true));
      content.addEventListener("mouseleave", () => setIsHovered(false));

      return () => {
        content.removeEventListener("mousemove", handleMouseMove);
        content.removeEventListener("mouseenter", () => setIsHovered(true));
        content.removeEventListener("mouseleave", () => setIsHovered(false));
      };
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="backdrop-blur-sm bg-background/10 transition-all duration-300" />
        <DialogContent
          ref={contentRef}
          className={cn(
            "rounded-3xl w-full items-start bg-background border-muted shadow-[0_4px_16px_0_rgba(0,0,0,0.1)]",
            className
          )}
        >
            {children}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
} 