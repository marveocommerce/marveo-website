import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/shared/GlowOrb";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-radial-glow" />
        <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="lg" />
        <div className="relative z-10 max-w-lg mx-auto px-6 text-center">
          <div className="font-display text-[120px] font-800 leading-none text-gradient opacity-20 mb-4">404</div>
          <h1 className="font-display text-3xl font-700 text-text-primary mb-4">Page not found</h1>
          <p className="text-text-secondary mb-8">
            This page doesn&apos;t exist or hasn&apos;t been built yet. Head back to the homepage.
          </p>
          <Link href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-bright text-white font-semibold text-sm rounded-xl transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Marvéo
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
