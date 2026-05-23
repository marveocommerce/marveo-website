import Link from "next/link";
import { ArrowRight, LifeBuoy, Network, Rocket, Wrench } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";

const HELP_PATHS = [
  {
    icon: Rocket,
    label: "Start Here",
    title: "Getting Started",
    desc: "New to Marveo? Follow the quickest setup path and know what to do first.",
    href: "/docs/getting-started",
  },
  {
    icon: Network,
    label: "WordPress",
    title: "Connect Existing WordPress",
    desc: "Connect your current WordPress site without rebuilding from scratch.",
    href: "/docs/wordpress",
  },
  {
    icon: LifeBuoy,
    label: "Next.js",
    title: "Next.js Integration Guides",
    desc: "Set up adapter-based workflows for Next.js and headless environments.",
    href: "/docs/nextjs",
  },
  {
    icon: Wrench,
    label: "Troubleshooting",
    title: "Fix Common Issues",
    desc: "Solve the most common connection and onboarding issues quickly.",
    href: "/docs/troubleshooting",
  },
];

const FEATURED_ARTICLES = [
  {
    label: "Getting Started",
    title: "Choose Your Connection Path",
    description: "Decide the right onboarding track before setup begins.",
    href: "/docs/getting-started/choose-your-connection-path",
  },
  {
    label: "WordPress",
    title: "Connect Existing WordPress Site",
    description: "Connect a live WordPress site without rebuilding.",
    href: "/docs/wordpress/connect-existing-site",
  },
  {
    label: "Next.js",
    title: "Connect Next.js Site",
    description: "Map your Next.js project to the right workspace.",
    href: "/docs/nextjs/connect-site",
  },
  {
    label: "Troubleshooting",
    title: "Next.js Connection Stuck in Pending",
    description: "Resolve the most common pending-connection blockers.",
    href: "/docs/troubleshooting/nextjs-pending-connection",
  },
  {
    label: "Troubleshooting",
    title: "WordPress Site Not Verifying",
    description: "Fix verification failures with a focused triage flow.",
    href: "/docs/troubleshooting/wordpress-not-verifying",
  },
  {
    label: "Launch",
    title: "Prepare for Launch Readiness",
    description: "Complete final checks before rollout decisions.",
    href: "/docs/getting-started/prepare-for-launch-readiness",
  },
];

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Help Center"
          title={<>How Can We Help You<br /><span className="text-gradient">Get Set Up Faster?</span></>}
          description="Simple guides for connecting your website, launching your workspace, and resolving issues quickly."
        />
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {HELP_PATHS.map((path) => {
              const Icon = path.icon;
              return (
                <Link key={path.title} href={path.href}
                  className="card-surface rounded-2xl p-6 group block transition-all duration-300 hover:-translate-y-1 hover:border-accent/24 hover:shadow-[0_22px_50px_-34px_rgba(79,142,247,0.72)]">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-accent/15 group-hover:border-accent/28">
                    <Icon className="w-5 h-5 text-accent transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-0.5" />
                  </div>
                  <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-2">{path.label}</div>
                  <h3 className="font-display font-700 text-text-primary text-lg mb-2">{path.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{path.desc}</p>
                  <span className="flex items-center gap-1.5 text-xs text-accent font-medium">
                    Open Guide <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mb-14">
            <div className="flex items-end justify-between gap-4 mb-5">
              <div>
                <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-2">Featured Articles</p>
                <h2 className="font-display text-2xl font-700 text-text-primary">Popular Help Topics</h2>
              </div>
              <Link href="/docs/getting-started" className="text-sm text-accent hover:text-accent-bright transition-colors font-medium">
                Browse all guides
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURED_ARTICLES.map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="card-surface rounded-2xl p-6 group block transition-all duration-300 hover:-translate-y-1 hover:border-accent/24 hover:shadow-[0_22px_50px_-34px_rgba(79,142,247,0.72)]"
                >
                  <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-2">{article.label}</div>
                  <h3 className="font-display font-700 text-text-primary text-lg mb-2">{article.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{article.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-accent font-medium">
                    Read Article <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="card-surface rounded-2xl p-8 text-center border-glow">
            <div className="text-sm text-text-secondary mb-3">Need guided onboarding with the Marveo team?</div>
            <Link href="/contact?intent=guided-onboarding" className="text-sm text-accent hover:text-accent-bright transition-colors font-medium">
              Request Guided Setup →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
