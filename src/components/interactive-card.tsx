import { Card } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  color1?: string;
  color2?: string;
  color3?: string;
}

export function InteractiveCard({ children, className = "", color1, color2, color3 }: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseenter", () => setIsHovered(true));
      card.addEventListener("mouseleave", () => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      });
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseenter", () => setIsHovered(true));
        card.removeEventListener("mouseleave", () => {
          setIsHovered(false);
          setMousePosition({ x: 0, y: 0 });
        });
      }
    };
  }, []);

  const defaultColor1 = "#00BFFF";
  const defaultColor2 = "#8A2BE6";
  const defaultColor3 = "#FF0080";

  const effectiveColor1 = color1 || defaultColor1;
  const effectiveColor2 = color2 || defaultColor2;
  const effectiveColor3 = color3 || defaultColor3;

  const gradientColors = `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
    ${effectiveColor1} 0%, 
    ${effectiveColor2} 40%,
    ${effectiveColor3} 70%
  )`;

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-[28px] overflow-hidden ${className}`}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-[28px] pointer-events-none"
            style={{
              background: gradientColors,
              zIndex: -1,
            }}
          />
        )}
      </AnimatePresence>
      <Card 
        className={`w-full h-[100%] bg-background/10 dark:bg-background/10 backdrop-blur-4xl rounded-[28px] border-muted/20 dark:border-muted/10 shadow-md inset-shadow-sm inset-shadow-black/10`}
        style={{
          backdropFilter: isHovered 
            ? `blur(16px) brightness(${document.documentElement.classList.contains('dark') ? '1.1' : '1.3'})` 
            : `blur(12px) brightness(1)`,
          transition: "backdrop-filter 0.3s ease-out",
          position: 'relative',
          zIndex: 0,
        }}
      >
        {children}
      </Card>
    </motion.div>
  );
} 