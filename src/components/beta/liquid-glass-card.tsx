"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import LiquidGlass from 'liquid-glass-react';

interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  // Glass effect properties
  shadowColor?: string;
  shadowBlur?: number;
  shadowSpread?: number;
  tintColor?: string;
  tintOpacity?: number;
  blurAmount?: number; // Renamed from frostBlur
  // Distortion properties for LiquidGlass
  displacementScale?: number; // Renamed from distortionStrength
  // Size and styling
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
}

const LiquidGlassCard = React.forwardRef<HTMLDivElement, LiquidGlassCardProps>(
  (
    {
      className,
      children,
      shadowColor = "#ffffff",
      shadowBlur = 20,
      shadowSpread = -5,
      tintColor = "#ffffff",
      tintOpacity = 0.4,
      blurAmount = 0.0625, // Default for liquid-glass-react
      displacementScale = 70, // Default for liquid-glass-react
      width = 300,
      height = 200,
      borderRadius = 28,
      style,
      ...props
    },
    ref
  ) => {

    return (
      <LiquidGlass
        className={cn("liquid-glass-card", className)}
        blurAmount={blurAmount}
        displacementScale={displacementScale}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          borderRadius: `${borderRadius}px`,
          overflow: 'hidden', /* Ensure content is clipped */
          background: tintColor ? `rgba(${parseInt(tintColor.slice(1, 3), 16)}, ${parseInt(tintColor.slice(3, 5), 16)}, ${parseInt(tintColor.slice(5, 7), 16)}, ${tintOpacity})` : undefined,
          ...style,
          // Applying outer shadow here as LiquidGlass might not handle it directly
          boxShadow: `0px 6px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, 0.2)`,
        }}
      >
        {/* Content */}
        {children && (
          <div className="relative z-10 p-6 h-full flex flex-col pointer-events-auto"> {/* Re-enable pointer events for content */}
            {children}
          </div>
        )}
      </LiquidGlass>
    );
  }
);

LiquidGlassCard.displayName = "LiquidGlassCard";

// Control Panel Component
interface LiquidGlassControlsProps {
  onSettingsChange?: (settings: Partial<LiquidGlassCardProps>) => void;
}

// Card content components for better composition
const LiquidGlassCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
));
LiquidGlassCardHeader.displayName = "LiquidGlassCardHeader";

const LiquidGlassCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-white drop-shadow-lg",
      className
    )}
    {...props}
  />
));
LiquidGlassCardTitle.displayName = "LiquidGlassCardTitle";

const LiquidGlassCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-white/80 drop-shadow", className)}
    {...props}
  />
));
LiquidGlassCardDescription.displayName = "LiquidGlassCardDescription";

const LiquidGlassCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1", className)} {...props} />
));
LiquidGlassCardContent.displayName = "LiquidGlassCardContent";

const LiquidGlassCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
LiquidGlassCardFooter.displayName = "LiquidGlassCardFooter";

export {
  LiquidGlassCard,
  LiquidGlassCardHeader,
  LiquidGlassCardFooter,
  LiquidGlassCardTitle,
  LiquidGlassCardDescription,
  LiquidGlassCardContent,
};