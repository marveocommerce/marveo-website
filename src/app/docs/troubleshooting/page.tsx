import Link from "next/link";
import { AlertTriangle, ArrowRight, ShieldAlert } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { TROUBLESHOOTING_ARTICLES } from "./articles";

export default function DocsTroubleshootingPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Troubleshooting"
          title={<>Fix Common Setup Issues<br /><span className="text-gradient">Without Guesswork</span></>}
          description="Follow quick checks first, then escalate with the right details if needed."
        />

        <section className="max-w-4xl mx-auto px-6 pb-24">
          <div className="card-surface rounded-3xl p-6 md:p-8 mb-8 border-glow">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-helper font-mono uppercase tracking-widest text-text-muted mb-2">Article-based help</p>
                <h2 className="font-display text-2xl font-700 text-text-primary mb-2">Open the exact issue as an article</h2>
                <p className="text-sm text-text-secondary max-w-2xl leading-relaxed">
                  Each issue now opens as a proper help article with clear actions and related guides, instead of staying as a static list.
                </p>
              </div>
              <Link href="/contact?intent=guided-onboarding" className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-bright font-semibold">
                Request support help <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            {TROUBLESHOOTING_ARTICLES.map((issue) => (
              <article key={issue.slug} className="card-surface rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <h2 className="font-display text-lg font-700 text-text-primary">{issue.title}</h2>
                      <p className="text-helper text-text-muted">{issue.readTime}</p>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mb-3">{issue.description}</p>
                    <Link href={`/docs/troubleshooting/${issue.slug}`} className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-bright font-semibold">
                      Read article <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="card-surface rounded-2xl p-6 border-glow">
            <div className="flex items-start gap-3 mb-3">
              <ShieldAlert className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              <div>
                <h3 className="font-display text-base font-700 text-text-primary">When to escalate</h3>
                <p className="text-sm text-text-secondary mt-1">
                  Escalate when checks fail twice or launch is blocked. Include workspace name, environment, timestamp, and screenshots.
                </p>
              </div>
            </div>
            <Link href="/contact?intent=guided-onboarding" className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-bright font-semibold">
              Contact support team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
