import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/shared/GlowOrb";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-radial-glow" />
        <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="lg" />
        <div className="relative z-10 max-w-sm mx-auto px-6 text-center">
          <div className="card-surface border-glow rounded-3xl p-10">
            <div className="text-xs font-mono text-accent uppercase tracking-widest mb-6">Marvéo Platform</div>
            <h1 className="font-display text-2xl font-700 text-text-primary mb-3">Sign in to Marvéo</h1>
            <p className="text-sm text-text-secondary mb-8">
              The Marvéo dashboard lives on our app platform. Click below to sign in or create your account.
            </p>
            <Link
              href="https://app.marveo.co/login"
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-accent hover:bg-accent-bright text-white font-semibold text-sm rounded-xl transition-all mb-4 shadow-[0_0_20px_rgba(79,142,247,0.3)]"
            >
              <ExternalLink className="w-4 h-4" />
              Go to Marvéo App
            </Link>
            <Link href="/contact"
              className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Need help? Contact support →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
