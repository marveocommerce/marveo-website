import Link from "next/link";
import { ArrowRight, CheckCircle2, Link2, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { WORDPRESS_ARTICLES } from "./articles";

export default function DocsWordPressPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="WordPress Help"
          title={<>Connect WordPress<br /><span className="text-gradient">Without Rebuilding</span></>}
          description="Simple steps to connect an existing WordPress site to Marveo and verify it is ready for operations."
        />

        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="card-surface rounded-3xl p-6 md:p-8 mb-8 border-glow">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-helper font-mono uppercase tracking-widest text-text-muted mb-2">Article-based help</p>
                <h2 className="font-display text-2xl font-700 text-text-primary mb-2">Browse WordPress guides as articles</h2>
                <p className="text-sm text-text-secondary max-w-2xl leading-relaxed">
                  Each guide opens as a readable help article, with related articles inside the page so users can move naturally from setup to verification to troubleshooting.
                </p>
              </div>
              <Link href="/docs/getting-started" className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-bright font-semibold">
                Start with onboarding <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {WORDPRESS_ARTICLES.map((guide) => (
              <article key={guide.slug} className="card-surface rounded-2xl p-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="text-helper font-mono uppercase tracking-widest text-text-muted">{guide.category}</p>
                  <p className="text-helper text-text-muted">{guide.readTime}</p>
                </div>
                <h2 className="font-display text-lg font-700 text-text-primary mb-2">{guide.title}</h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{guide.description}</p>
                <Link href={`/docs/wordpress/${guide.slug}`} className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-bright font-semibold">
                  Read article <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="card-surface rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <Link2 className="w-4 h-4 text-accent" />
                <h3 className="font-display text-base font-700 text-text-primary">Expected outcome</h3>
              </div>
              <p className="text-sm text-text-secondary">Your workspace shows verified status and your team can move into onboarding and launch readiness.</p>
            </div>
            <div className="card-surface rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-success" />
                <h3 className="font-display text-base font-700 text-text-primary">Security note</h3>
              </div>
              <p className="text-sm text-text-secondary">Use approved connector versions and complete verification before rollout.</p>
            </div>
          </div>

          <div className="mt-10 text-center text-sm text-text-secondary">
            <CheckCircle2 className="w-4 h-4 text-success inline-block mr-2" />
            Prefer support-assisted setup? <Link href="/contact?intent=guided-onboarding" className="text-accent hover:text-accent-bright">Request guided onboarding</Link>.
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
