import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { CHANGELOG_ENTRIES } from "@/constants";

const STATUS_STYLES: Record<string, string> = {
  Released: "text-success bg-success/10 border-success/20",
  "Rolling Out": "text-accent-bright bg-accent/12 border-accent/28",
  Expanding: "text-accent-bright bg-accent/12 border-accent/28",
  "Infrastructure Update": "text-text-primary bg-white/8 border-white/16",
  "Workspace Improvement": "text-warning bg-warning/10 border-warning/20",
};

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Platform Evolution"
          title={<>Platform<br /><span className="text-gradient">Updates</span></>}
          description="Operational platform updates across infrastructure, workflows, workspace operations, and connected business systems."
        />
        <section className="max-w-4xl mx-auto px-6 pb-24">
          <div className="space-y-4">
            {CHANGELOG_ENTRIES.map((entry) => (
              <article
                key={`${entry.title}-${entry.date}`}
                className="group rounded-2xl border border-white/12 bg-white/[0.02] p-5 md:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/24 hover:bg-white/[0.03] hover:shadow-[0_16px_38px_-30px_rgba(79,142,247,0.35)]"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-muted">
                    {entry.category}
                  </span>
                  <span
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all duration-300 group-hover:shadow-[0_0_16px_-12px_rgba(79,142,247,0.6)] ${STATUS_STYLES[entry.status] ?? "text-text-secondary bg-white/8 border-white/14"}`}
                  >
                    {entry.status}
                  </span>
                  <span className="text-[11px] font-mono text-text-muted">{entry.date}</span>
                </div>

                <h2 className="font-display font-700 text-xl md:text-2xl text-text-primary mb-2.5">
                  {entry.title}
                </h2>
                <p className="text-base text-text-secondary leading-relaxed mb-5 max-w-4xl">
                  {entry.summary}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-3">
                  <div className="rounded-xl border border-white/8 bg-white/[0.015] p-4 md:p-4.5">
                    <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-muted mb-3">
                      Improvement Highlights
                    </p>
                    <div className="space-y-2.5">
                      {entry.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          <span className="text-sm text-text-secondary leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-accent/18 bg-accent/[0.05] p-4 md:p-4.5">
                    <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-muted mb-3">
                      Operational Impact
                    </p>
                    <p className="text-sm text-text-primary leading-relaxed">{entry.impact}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
