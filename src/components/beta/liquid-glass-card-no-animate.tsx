"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  variant?: "default" | "colorful";
}

export function LiquidGlassCardNoAnimate({
  children,
  className,
  title,
  variant = "default",
}: LiquidGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setMousePosition({ x, y });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseenter", () => setIsHovered(true));
      card.addEventListener("mouseleave", () => setIsHovered(false));

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseenter", () => setIsHovered(true));
        card.removeEventListener("mouseleave", () => setIsHovered(false));
      };
    }
  }, []);

  return (
    <div ref={cardRef} className="relative group">
      {/* Refracting overlay */}
      <div
        className={cn(
          "absolute inset-0 rounded-lg opacity-0 transition-all duration-500",
          "bg-gradient-to-br from-white/10 via-transparent to-white/5",
          "dark:from-white/5 dark:to-white/2",
          isHovered && "opacity-100"
        )}
        style={{
          background: isHovered
            ? `linear-gradient(
               ${mousePosition.x * 1.8}deg, 
               rgba(255, 255, 255, ${document?.documentElement?.classList.contains('dark') ? '0.08' : '0.15'}) 0%, 
               transparent 50%, 
               rgba(255, 255, 255, ${document?.documentElement?.classList.contains('dark') ? '0.03' : '0.08'}) 100%
             )`
            : undefined,
        }}
      />

      <Card
        className={cn(
          // Glass effect - Light mode (bright/white glass)
          "relative backdrop-blur-xl bg-white/60 border-white/40",
          "shadow-xl shadow-gray-900/10",
          // Glass effect - Dark mode (dark/black glass)
          "dark:bg-black/40 dark:border-black/10",
          "dark:shadow-2xl dark:shadow-black/50",
          // Smooth transitions
          "transition-all duration-500 ease-out",
          // Hover effects - Light mode
          "hover:bg-white/70 hover:border-white/50",
          "hover:shadow-2xl hover:shadow-gray-900/15",
          // Hover effects - Dark mode
          "dark:hover:bg-black/50 dark:hover:border-black/20",
          "dark:hover:shadow-3xl dark:hover:shadow-black/60",
          // Enhanced backdrop blur
          "hover:backdrop-blur-2xl",
          // Subtle transform on hover
          "hover:scale-[1.005]",
          // Refraction effect overlay
          "before:absolute before:inset-0 before:rounded-lg",
          "before:bg-gradient-to-br before:from-white/20 before:to-transparent",
          "dark:before:from-white/5 dark:before:to-transparent",
          "before:opacity-0 hover:before:opacity-100",
          "before:transition-opacity before:duration-500",
          className
        )}
      >
        {title && (
          <CardHeader className="relative z-10">
            <CardTitle
              className={cn(
                "font-medium transition-all duration-300",
                // Light mode text (dark text on light glass)
                "text-gray-900/90",
                // Dark mode text (light text on dark glass)
                "dark:text-white/90",
                // Hover effects
                isHovered && "text-gray-950 dark:text-white drop-shadow-sm"
              )}
            >
              {title}
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className="relative z-10 text-gray-800/85 dark:text-gray-100/85">
          {children}
        </CardContent>

        {/* Inner glow effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500",
            isHovered && "opacity-100"
          )}
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                 rgba(255, 255, 255, 0.15) 0%, 
                 rgba(255, 255, 255, 0.05) 25%,
                 transparent 50%)`
              : undefined,
          }}
        />
      </Card>
    </div>
  );
}