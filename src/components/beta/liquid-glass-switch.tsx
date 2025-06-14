"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

interface LiquidGlassSwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  className?: string;
}

export function LiquidGlassSwitch({
  className,
  ...props
}: LiquidGlassSwitchProps) {
  const switchRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!switchRef.current) return;

      const rect = switchRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setMousePosition({ x, y });
    };

    const switchEl = switchRef.current;
    if (switchEl) {
      switchEl.addEventListener("mousemove", handleMouseMove);
      switchEl.addEventListener("mouseenter", () => setIsHovered(true));
      switchEl.addEventListener("mouseleave", () => setIsHovered(false));

      setIsDarkMode(document?.documentElement?.classList.contains('dark') || window.matchMedia('(prefers-color-scheme: dark)').matches);

      const observer = new MutationObserver(() => {
        setIsDarkMode(document.documentElement.classList.contains('dark'));
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleMediaQueryChange = () => {
        setIsDarkMode(mediaQuery.matches || document.documentElement.classList.contains('dark'));
      };
      mediaQuery.addEventListener('change', handleMediaQueryChange);

      return () => {
        switchEl.removeEventListener("mousemove", handleMouseMove);
        switchEl.removeEventListener("mouseenter", () => setIsHovered(true));
        switchEl.removeEventListener("mouseleave", () => setIsHovered(false));
        observer.disconnect();
        mediaQuery.removeEventListener('change', handleMediaQueryChange);
      };
    }
  }, []);

  return (
    <SwitchPrimitive.Root
      ref={switchRef}
      className={cn(
        "peer relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary/10 data-[state=unchecked]:bg-input/10",
        "hover:scale-[1.02]",
        className
      )}
      {...props}
    >
      {/* Glass effect overlay */}
      <div
        className={cn(
          "absolute inset-0 rounded-full opacity-0 transition-all duration-500 ease-out pointer-events-none",
          "bg-gradient-to-br from-white/40 via-transparent to-white/20",
          "dark:from-white/30 dark:to-white/10",
          isHovered && "opacity-100"
        )}
        style={{
          background: isHovered
            ? `linear-gradient(
               ${mousePosition.x * 1.8}deg, 
               rgba(255, 255, 255, ${isDarkMode ? '0.35' : '0.45'}) 0%, 
               transparent 50%, 
               rgba(255, 255, 255, ${isDarkMode ? '0.25' : '0.35'}) 100%
             )`
            : undefined,
        }}
      />

      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none relative block h-6 w-6 rounded-full ring-0 transition-all duration-500 ease-out",
          "data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
          "bg-background/95 backdrop-blur-2xl",
          "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/50 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 before:ease-out",
          "after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-br after:from-transparent after:to-white/30 after:opacity-0 after:transition-opacity after:duration-500 after:ease-out",
          "hover:before:opacity-100 hover:after:opacity-100",
          "data-[state=checked]:bg-primary/95 data-[state=unchecked]:bg-foreground/95",
          "data-[state=checked]:shadow-primary/40 data-[state=unchecked]:shadow-foreground/40",
          "hover:scale-105",
          "border border-white/30"
        )}
        style={{
          boxShadow: isHovered
            ? (isDarkMode ? '0 0 15px rgba(255, 255, 255, 0.3)' : '0 0 15px rgba(0, 0, 0, 0.2)')
            : (isDarkMode ? '0 0 10px rgba(255, 255, 255, 0.15)' : '0 0 10px rgba(0, 0, 0, 0.1)'),
        }}
      >
        {/* Inner glow effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 ease-out pointer-events-none",
            isHovered && "opacity-100"
          )}
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                 rgba(255, 255, 255, ${isDarkMode ? '0.35' : '0.45'}) 0%, 
                 rgba(255, 255, 255, ${isDarkMode ? '0.15' : '0.25'}) 25%,
                 transparent 50%)`
              : undefined,
          }}
        />

        {/* Bubble highlight */}
        <div
          className={cn(
            "absolute inset-0 rounded-full opacity-0 transition-all duration-500 ease-out pointer-events-none",
            "bg-gradient-to-br from-white/50 to-transparent",
            isHovered && "opacity-100"
          )}
          style={{
            transform: `rotate(${mousePosition.x * 0.5}deg)`,
          }}
        />
      </SwitchPrimitive.Thumb>

      {/* Track highlight */}
      <div
        className={cn(
          "absolute inset-0 rounded-full opacity-0 transition-all duration-500 ease-out pointer-events-none",
          "bg-gradient-to-br from-white/30 to-transparent",
          isHovered && "opacity-100"
        )}
        style={{
          transform: `rotate(${mousePosition.x * 0.3}deg)`,
        }}
      />

      {/* Ambient light effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-full opacity-0 transition-all duration-500 ease-out pointer-events-none",
          "bg-gradient-to-br from-white/20 via-transparent to-white/10",
          isHovered && "opacity-100"
        )}
      />
    </SwitchPrimitive.Root>
  );
} 