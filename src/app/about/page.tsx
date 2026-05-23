import Link from "next/link";
import { ArrowRight, Target, Zap, Globe } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { ABOUT_VALUES } from "@/constants";

const ICONS: Record<string, React.ElementType> = { Target, Zap, Globe };

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="About Marvéo"
          title={<>The Operational Layer for<br /><span className="text-gradient">Modern Commerce.</span></>}
          description="Marvéo centralizes operational workflows, infrastructure coordination, deployments, and commerce environments into one scalable operational platform."
        />

        <section className="max-w-4xl mx-auto px-6 py-16">
          {/* Mission quote */}
          <div className="card-surface border-glow rounded-3xl p-10 md:p-14 text-center relative overflow-hidden mb-20">
            <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="md" />
            <div className="relative">
              <div className="text-xs font-mono text-accent uppercase tracking-widest mb-5">Our Mission</div>
              <blockquote className="font-display text-2xl md:text-3xl font-600 text-text-primary leading-snug">
                &ldquo;Modern commerce businesses should operate from connected operational infrastructure - not fragmented dashboards, plugins, and disconnected workflows.&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Story */}
          <div className="mb-20">
            <h2 className="font-display text-3xl font-700 text-text-primary mb-6">The story</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed text-base md:text-[1.05rem]">
              <p>
                Modern businesses increasingly operate across fragmented
                operational systems, disconnected workflows, deployment
                environments, and infrastructure layers. Marvéo was built to
                centralize those operational experiences into one scalable
                platform environment.
              </p>
              <p>
                As organizations scale, operational complexity compounds.
                Teams lose visibility across commerce execution, deployment
                coordination, and cross-functional workflows. Marvéo creates a
                single operational surface that keeps those systems aligned.
              </p>
              <p>
                The platform is designed for operational efficiency,
                infrastructure readiness, and connected system visibility - so
                businesses can execute faster without increasing fragmentation.
              </p>
            </div>
          </div>

          {/* Values — from constants */}
          <div className="mb-20">
            <h2 className="font-display text-3xl font-700 text-text-primary mb-10">Operational Principles</h2>
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
              Experience Modern Commerce Operations
            </h2>
            <p className="text-text-secondary mb-8">
              Explore how Marvéo unifies infrastructure, workflows, and deployment execution through one operational workspace.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pricing"
                className="flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-bright text-white font-semibold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(79,142,247,0.3)]">
                Launch Workspace <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/deployments"
                className="flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/8 border border-white/10 text-text-secondary hover:text-text-primary font-semibold text-sm rounded-xl transition-all">
                Explore Platform Experience
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
