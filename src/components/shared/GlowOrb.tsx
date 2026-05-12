import { cn } from "@/lib/utils";

interface GlowOrbProps {
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: "w-48 h-48",
  md: "w-80 h-80",
  lg: "w-[500px] h-[500px]",
  xl: "w-[800px] h-[800px]",
};

export function GlowOrb({ className, color = "rgba(79,142,247,0.12)", size = "lg" }: GlowOrbProps) {
  return (
    <div
      className={cn("absolute rounded-full pointer-events-none blur-[80px]", sizes[size], className)}
      style={{ background: color }}
      aria-hidden="true"
    />
  );
}
