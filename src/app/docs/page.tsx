import Link from "next/link";
import { BookOpen, Code2, PlugZap, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { DOC_SECTIONS } from "@/constants";

const ICONS: Record<string, React.ElementType> = { BookOpen, Code2, PlugZap };

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Documentation"
          title={<>Everything you need<br /><span className="text-gradient">to get started.</span></>}
          description="Comprehensive guides, API references, and integration documentation for the Marvéo platform."
        />
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {DOC_SECTIONS.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <Link key={s.title} href={s.href}
                  className="card-surface card-surface-hover rounded-2xl p-6 group block">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors">
                    {Icon && <Icon className="w-5 h-5 text-accent" />}
                  </div>
                  <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-2">{s.label}</div>
                  <h3 className="font-display font-700 text-text-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{s.desc}</p>
                  <span className="flex items-center gap-1.5 text-xs text-accent font-medium">
                    Read docs <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="card-surface rounded-2xl p-8 text-center">
            <div className="text-sm text-text-muted mb-3">Full documentation is being finalised.</div>
            <Link href="/contact" className="text-sm text-accent hover:text-accent-bright transition-colors">
              Contact us for early access →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
