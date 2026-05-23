import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { GETTING_STARTED_ARTICLES, getGettingStartedArticle } from "../articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return GETTING_STARTED_ARTICLES.map((article) => ({ slug: article.slug }));
}

export default async function GettingStartedArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getGettingStartedArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Getting Started Article"
          title={
            <>
              {article.title}
              <br />
              <span className="text-gradient">for Marveo teams</span>
            </>
          }
          description={article.description}
        />

        <section className="max-w-4xl mx-auto px-6 pb-24">
          <div className="card-surface rounded-3xl p-6 md:p-8 mb-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted mb-5">
              <Link href="/docs/getting-started" className="inline-flex items-center gap-1.5 hover:text-text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Getting Started
              </Link>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-text-secondary">
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-text-secondary">
                <Clock3 className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="font-display text-xl font-700 text-text-primary mb-3">Overview</h2>
                <p className="text-base text-text-secondary leading-relaxed">{article.overview}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-700 text-text-primary mb-3">When to use this</h2>
                <ul className="space-y-3 text-text-secondary">
                  {article.whenToUse.map((item) => (
                    <li key={item} className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-700 text-text-primary mb-3">Steps</h2>
                <ol className="space-y-3 text-text-secondary">
                  {article.steps.map((step, index) => (
                    <li key={step} className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 leading-relaxed">
                      <span className="text-accent font-semibold shrink-0">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h2 className="font-display text-xl font-700 text-text-primary mb-3">Expected result</h2>
                <p className="rounded-2xl border border-accent/20 bg-accent/[0.05] px-4 py-4 text-base text-text-secondary leading-relaxed">
                  {article.expectedResult}
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-700 text-text-primary mb-3">If something goes wrong</h2>
                <ul className="space-y-3 text-text-secondary">
                  {article.troubleshooting.map((item) => (
                    <li key={item} className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {article.relatedLinks.map((relatedLink) => (
              <article key={relatedLink.href} className="card-surface rounded-2xl p-6">
                <p className="text-helper font-mono uppercase tracking-widest text-text-muted mb-2">Related guide</p>
                <h3 className="font-display text-lg font-700 text-text-primary mb-4">{relatedLink.label}</h3>
                <Link href={relatedLink.href} className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-bright font-semibold">
                  Open guide <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
