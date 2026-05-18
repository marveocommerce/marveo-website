import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { CHANGELOG_ENTRIES } from "@/constants";

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Changelog"
          title={<>What&apos;s new<br /><span className="text-gradient">in Marvéo.</span></>}
          description="Every release, update, and improvement to the Marvéo platform."
        />
        <section className="max-w-3xl mx-auto px-6 pb-24">
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-white/8 to-transparent" />
            <div className="space-y-10">
              {CHANGELOG_ENTRIES.map((entry) => (
                <div key={entry.version} className="flex gap-6">
                  <div className="w-10 shrink-0 flex flex-col items-center pt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent border-2 border-bg-primary" />
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="font-display font-700 text-text-primary">{entry.version}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20">
                        {entry.tag}
                      </span>
                      <span className="text-xs text-text-muted">{entry.date}</span>
                    </div>
                    <div className="card-surface rounded-2xl p-5 space-y-2">
                      {entry.changes.map((c) => (
                        <div key={c} className="flex items-start gap-2.5">
                          <div className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                          <span className="text-sm text-text-secondary">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
