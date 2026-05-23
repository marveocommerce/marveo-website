import Link from "next/link";
import { ArrowRight, Code2, LifeBuoy, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { NEXTJS_ARTICLES } from "./articles";

export default function DocsNextJsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Next.js Help"
          title={<>Connect Next.js<br /><span className="text-gradient">With Confidence</span></>}
          description="Practical, non-jargon guides for connecting Next.js projects to Marveo operations."
        />

        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="card-surface rounded-3xl p-6 md:p-8 mb-8 border-glow">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-helper font-mono uppercase tracking-widest text-text-muted mb-2">Article-based help</p>
                <h2 className="font-display text-2xl font-700 text-text-primary mb-2">Browse by article, not internal docs</h2>
                <p className="text-sm text-text-secondary max-w-2xl leading-relaxed">
                  Each guide opens as a proper help article. Related articles are linked inside each page so readers can move naturally through setup, operations, and troubleshooting.
                </p>
              </div>
              <Link href="/docs/getting-started" className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-bright font-semibold">
                Start with onboarding <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {NEXTJS_ARTICLES.map((guide) => (
              <article key={guide.slug} className="card-surface rounded-2xl p-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="text-helper font-mono uppercase tracking-widest text-text-muted">{guide.category}</p>
                  <p className="text-helper text-text-muted">{guide.readTime}</p>
                </div>
                <h2 className="font-display text-lg font-700 text-text-primary mb-2">{guide.title}</h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{guide.description}</p>
                <Link
                  href={`/docs/nextjs/${guide.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-bright font-semibold"
                >
                  Read article <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Link href="/docs/nextjs/install-adapter" className="card-surface rounded-2xl p-6 block transition-transform duration-200 hover:-translate-y-0.5 hover:border-white/15">
              <Code2 className="w-4 h-4 text-accent mb-2" />
              <h3 className="font-display text-base font-700 text-text-primary mb-2">For developers</h3>
              <p className="text-sm text-text-secondary mb-3">Use this when your team owns deployment and environment management.</p>
              <span className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-bright font-semibold">
                Open setup article <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/docs/nextjs/editable-content" className="card-surface rounded-2xl p-6 block transition-transform duration-200 hover:-translate-y-0.5 hover:border-white/15">
              <RefreshCw className="w-4 h-4 text-accent mb-2" />
              <h3 className="font-display text-base font-700 text-text-primary mb-2">For operators</h3>
              <p className="text-sm text-text-secondary mb-3">Use this when content and workflows are managed by non-technical teams.</p>
              <span className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-bright font-semibold">
                Open operations article <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <div className="card-surface rounded-2xl p-6">
              <LifeBuoy className="w-4 h-4 text-success mb-2" />
              <h3 className="font-display text-base font-700 text-text-primary mb-2">Need support help?</h3>
              <Link href="/contact?intent=guided-onboarding" className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-bright font-semibold">
                Request guided onboarding <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
