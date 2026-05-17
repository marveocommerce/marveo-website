import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/shared/GlowOrb";

interface ComingSoonProps {
  title: string;
  description: string;
  label: string;
}

export function ComingSoon({ title, description, label }: ComingSoonProps) {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-radial-glow" />
        <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="lg" />
        <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warning/10 border border-warning/20 text-warning text-xs font-mono mb-8">
            <Clock className="w-3 h-3" />
            {label}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-800 text-text-primary mb-5">
            {title}
          </h1>
          <p className="text-text-secondary mb-10 leading-relaxed">{description}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/8 border border-white/10 text-text-secondary hover:text-text-primary rounded-xl transition-all text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
