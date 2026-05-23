import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass, PlugZap, Rocket } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { GETTING_STARTED_ARTICLES } from "./articles";

export default function GettingStartedPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Getting Started"
          title={<>Start Here<br /><span className="text-gradient">In 4 Simple Steps</span></>}
          description="Follow this path to connect your site, verify setup, and launch your operational workspace with confidence."
        />

        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="card-surface rounded-3xl p-6 md:p-8 mb-8 border-glow">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-helper font-mono uppercase tracking-widest text-text-muted mb-2">Article-based help</p>
                <h2 className="font-display text-2xl font-700 text-text-primary mb-2">Start with the right article</h2>
                <p className="text-sm text-text-secondary max-w-2xl leading-relaxed">
                  Instead of a flat checklist, each step now opens as a proper Help Center article with related guides inside it.
                </p>
              </div>
              <Link href="/contact?intent=guided-onboarding" className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-bright font-semibold">
                Request guided onboarding <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {GETTING_STARTED_ARTICLES.map((article, index) => {
              const icons = [PlugZap, Rocket, Compass, CheckCircle2];
              const Icon = icons[index] ?? Compass;
              return (
                <Link
                  key={article.slug}
                  href={`/docs/getting-started/${article.slug}`}
                  className="card-surface rounded-2xl p-6 group transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/24 hover:shadow-[0_18px_46px_-30px_rgba(79,142,247,0.65)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <p className="text-helper font-mono uppercase tracking-widest text-text-muted">{article.category}</p>
                    <p className="text-helper text-text-muted">{article.readTime}</p>
                  </div>
                  <h2 className="font-display text-xl font-700 text-text-primary mb-2">{article.title}</h2>
                  <p className="text-sm text-text-secondary mb-3">{article.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold">
                    Read article <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="card-surface rounded-2xl p-7 border-glow">
            <h3 className="font-display text-xl font-700 text-text-primary mb-4">Quick Start Checklist</h3>
            <div className="space-y-3">
              {GETTING_STARTED_ARTICLES.map((article) => (
                <div key={article.slug} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-success shrink-0" />
                  <p className="text-sm text-text-secondary leading-relaxed">{article.title}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-sm text-text-secondary">
              Need help? <Link href="/contact?intent=guided-onboarding" className="text-accent hover:text-accent-bright">Request guided onboarding</Link>.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
