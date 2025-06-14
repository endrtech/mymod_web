"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { Sidebar } from "../ui/sidebar";
import LiquidGlass from "./liquid-glass/card";

interface LiquidGlassSidebarProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  variant?: "floating" | "inset" | "sidebar" | undefined;
  side?: "left" | "right";
}

export function LiquidGlassSidebar({
  children,
  className,
  variant,
  side,
}: LiquidGlassSidebarProps) {
  return (
    <div className="relative group">
      <style jsx global>{`
        [data-slot="sidebar-inner"] {
          background: transparent;
          border: none;
          shadow: none;
          padding: 0px;
          border-radius: 32px;
        }
      `}</style>
      <Sidebar
        variant={variant}
        side={side}
        className={className}
      >
        <LiquidGlass className="justify-start h-[calc(100vh-var(--header-height))]!" cornerRadius={32} displacementScale={0} saturation={210} blurAmount={0.5} elasticity={0}>
          {children}
        </LiquidGlass>
      </Sidebar>
    </div>
  );
}