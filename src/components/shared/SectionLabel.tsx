import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full",
        "bg-accent/8 border border-accent/20 text-accent text-xs font-mono font-medium tracking-widest uppercase",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-glow-pulse" />
      {children}
    </div>
  );
}
