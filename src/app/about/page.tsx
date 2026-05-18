import Link from "next/link";
import { ArrowRight, Target, Zap, Globe } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { ABOUT_VALUES } from "@/constants";
import { siteConfig } from "@/config/site";

const ICONS: Record<string, React.ElementType> = { Target, Zap, Globe };

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="About Marvéo"
          title={<>We&apos;re building the<br /><span className="text-gradient">OS for the web.</span></>}
          description="Marvéo was built because managing websites for modern businesses was still unnecessarily complex. We're changing that — one deployment at a time."
        />

        <section className="max-w-4xl mx-auto px-6 py-16">
          {/* Mission quote */}
          <div className="card-surface border-glow rounded-3xl p-10 md:p-14 text-center relative overflow-hidden mb-20">
            <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="md" />
            <div className="relative">
              <div className="text-xs font-mono text-accent uppercase tracking-widest mb-5">Our Mission</div>
              <blockquote className="font-display text-2xl md:text-3xl font-600 text-text-primary leading-snug">
                &ldquo;Any website content or business platform should be dynamically importable into Marvéo and editable without requiring heavy technical expertise.&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Story */}
          <div className="mb-20">
            <h2 className="font-display text-3xl font-700 text-text-primary mb-6">The story</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed text-sm">
              <p>
                Marvéo started as a product line within{" "}
                <a href={siteConfig.links.avario} target="_blank" rel="noopener noreferrer"
                  className="text-accent hover:text-accent-bright transition-colors">
                  Avario Digitals
                </a>{" "}
                — a digital agency that spent years building websites for businesses across multiple sectors.
              </p>
              <p>
                We saw the same problem repeating: businesses would pay significant sums to have websites built, then struggle to manage them without calling a developer every time something needed updating. WordPress helped, but its admin interface was designed for publishers, not operators.
              </p>
              <p>
                Marvéo is our answer. A clean, modern operating system for website deployment and management that meets businesses where they are — whether they&apos;re running traditional WordPress, a headless architecture, or a full custom Next.js stack.
              </p>
            </div>
          </div>

          {/* Values — from constants */}
          <div className="mb-20">
            <h2 className="font-display text-3xl font-700 text-text-primary mb-10">What we believe</h2>
            <div className="space-y-5">
              {ABOUT_VALUES.map((v) => {
                const Icon = ICONS[v.icon];
                return (
                  <div key={v.label} className="card-surface card-surface-hover rounded-2xl p-6 flex items-start gap-5">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center shrink-0">
                      {Icon && <Icon className="w-5 h-5 text-accent" />}
                    </div>
                    <div>
                      <h3 className="font-display font-700 text-text-primary mb-1">{v.label}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-display text-3xl font-700 text-text-primary mb-4">
              Ready to see it in action?
            </h2>
            <p className="text-text-secondary mb-8">
              Book a demo and we&apos;ll walk you through what Marvéo can do for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact"
                className="flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-bright text-white font-semibold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(79,142,247,0.3)]">
                Book a Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/templates"
                className="flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/8 border border-white/10 text-text-secondary hover:text-text-primary font-semibold text-sm rounded-xl transition-all">
                Browse Templates
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
