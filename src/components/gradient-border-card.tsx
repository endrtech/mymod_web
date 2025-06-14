import { Card } from "@/components/ui/card";

interface GradientBorderCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientBorderCard({ children, className = "" }: GradientBorderCardProps) {
  return (
    <Card className={`w-full h-[100%] bg-background/50 backdrop-blur-xl rounded-[28px] border-muted shadow-[0_4px_16px_0_rgba(0,0,0,0.1)] ${className}`}>
      {children}
    </Card>
  );
} 