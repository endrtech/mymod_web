"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link"; // Import Link from Next.js

interface InteractiveLinkButtonProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
  className?: string;
  // Add any other specific props InteractiveLinkButton needs
}

export function InteractiveLinkButton({ children, className = "", ...props }: InteractiveLinkButtonProps) {
  const linkRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [translation, setTranslation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log("InteractiveLinkButton mounted, isHovered:", isHovered); // Debug log for mount
    const handleMouseMove = (e: MouseEvent) => {
      if (!linkRef.current) return;
      
      const rect = linkRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * 2; // Even more subtle rotation
      const rotateY = (centerX - x) / centerX * 2; // Even more subtle rotation
      
      const translateX = (x - centerX) / centerX * 2; // Even more subtle translation
      const translateY = (y - centerY) / centerY * 2; // Even more subtle translation
      
      setMousePosition({ x, y });
      setRotation({ x: rotateX, y: rotateY });
      setTranslation({ x: translateY, y: translateY }); // Typo: translateY repeated here
    };

    const linkElement = linkRef.current;
    if (linkElement) {
      linkElement.addEventListener("mousemove", handleMouseMove);
      linkElement.addEventListener("mouseenter", () => {
        setIsHovered(true);
        console.log("Mouse ENTERED, isHovered:", true); // Debug log for hover
      });
      linkElement.addEventListener("mouseleave", () => {
        setIsHovered(false);
        console.log("Mouse LEFT, isHovered:", false); // Debug log for leave
        setRotation({ x: 0, y: 0 }); 
        setTranslation({ x: 0, y: 0 });
      });
    }

    return () => {
      if (linkElement) {
        linkElement.removeEventListener("mousemove", handleMouseMove);
        linkElement.removeEventListener("mouseenter", () => {
          setIsHovered(true);
          console.log("Mouse ENTERED (cleanup), isHovered:", true); // Debug log for cleanup
        });
        linkElement.removeEventListener("mouseleave", () => {
          setIsHovered(false);
          console.log("Mouse LEFT (cleanup), isHovered:", false); // Debug log for cleanup
          setRotation({ x: 0, y: 0 });
          setTranslation({ x: 0, y: 0 });
        });
      }
    };
  }, []);

  return (
    <motion.div
      ref={linkRef}
      className={`relative rounded-lg overflow-hidden w-full h-full p-2
        ${className}
      `}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        translateX: translation.x,
        translateY: translation.y,
        scale: isHovered ? 1.02 : 1,
        translateZ: isHovered ? 5 : 0,
        transition: { type: "spring", stiffness: 100, damping: 10 }
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <Link 
        {...props}
        className={`w-full h-full flex items-center justify-start text-foreground/70 hover:text-foreground/90 transition-colors duration-200 hover:underline`}
      >
        {children}
      </Link>
    </motion.div>
  );
} 