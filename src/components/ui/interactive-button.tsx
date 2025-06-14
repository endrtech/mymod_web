"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "./button"; // Assuming Button component is in the same directory
import { cn } from "@/lib/utils"

interface InteractiveButtonProps {
    children: React.ReactNode
    className?: string
    color1?: string
    color2?: string
    color3?: string
  }

export function InteractiveButton({ children, className = "", color1, color2, color3, ...props }: InteractiveButtonProps) {
    const buttonRef = useRef<HTMLDivElement>(null)

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)
    const [rotation, setRotation] = useState({ x: 0, y: 0 })
    const [translation, setTranslation] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!buttonRef.current) return

            const rect = buttonRef.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            const centerX = rect.width / 2
            const centerY = rect.height / 2

            const rotateX = (y - centerY) / centerY * 0.1
            const rotateY = (centerX - x) / centerX * 0.1

            const translateX = (x - centerX) / centerX * 0.2
            const translateY = (y - centerY) / centerY * 0.2

            setMousePosition({ x, y })
            setRotation({ x: rotateX, y: rotateY })
            setTranslation({ x: translateX, y: translateY })
        }

        const button = buttonRef.current
        if (button) {
            button.addEventListener("mousemove", handleMouseMove)
            button.addEventListener("mouseenter", () => setIsHovered(true))
            button.addEventListener("mouseleave", () => {
                setIsHovered(false)
                setRotation({ x: 0, y: 0 })
                setTranslation({ x: 0, y: 0 })
            })
        }

        return () => {
            if (button) {
                button.removeEventListener("mousemove", handleMouseMove)
                button.removeEventListener("mouseenter", () => setIsHovered(true))
                button.removeEventListener("mouseleave", () => {
                    setIsHovered(false)
                    setRotation({ x: 0, y: 0 })
                    setTranslation({ x: 0, y: 0 })
                })
            }
        }
    }, [])

    const defaultColor1 = "#00BFFF"
    const defaultColor2 = "#8A2BE6"
    const defaultColor3 = "#FF0080"

    const effectiveColor1 = color1 || defaultColor1
    const effectiveColor2 = color2 || defaultColor2
    const effectiveColor3 = color3 || defaultColor3

    const gradientColors = `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
    ${effectiveColor1} 0%, 
    ${effectiveColor2} 40%,
    ${effectiveColor3} 70%
  )`

    return (
        <motion.div
            ref={buttonRef}
            className={cn(
                "relative w-full h-full rounded-full overflow-hidden",
                "bg-background/50 backdrop-blur-xl border-muted shadow-[0_4px_16px_0_rgba(0,0,0,0.1)]",
                "flex items-center justify-center p-0",
                className
            )}
            animate={{
                rotateX: rotation.x,
                rotateY: rotation.y,
                translateX: translation.x,
                translateY: translation.y,
                scale: isHovered ? 1.05 : 1,
                transition: { type: "spring", stiffness: 120, damping: 15 }
            }}
            style={{
                transformStyle: "preserve-3d",
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
