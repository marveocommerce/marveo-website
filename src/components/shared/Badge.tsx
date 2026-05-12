import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "warning";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-white/5 text-text-secondary border-white/8",
    accent: "bg-accent/10 text-accent border-accent/25",
    success: "bg-success/10 text-success border-success/25",
    warning: "bg-warning/10 text-warning border-warning/25",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
