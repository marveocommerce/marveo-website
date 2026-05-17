import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";

const ROLES = [
  { title: "Senior Frontend Engineer",  team: "Engineering", location: "Remote",  type: "Full-time" },
  { title: "Full-Stack Engineer",        team: "Engineering", location: "Remote",  type: "Full-time" },
  { title: "Product Designer",          team: "Design",      location: "Remote",  type: "Full-time" },
  { title: "DevOps Engineer",           team: "Infrastructure", location: "Remote", type: "Contract" },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Careers"
          title={<>Build the future<br /><span className="text-gradient">of the web with us.</span></>}
          description="We're a small, focused team building infrastructure that will power thousands of business websites. We move fast, ship quality, and work remotely."
        />
        <section className="max-w-3xl mx-auto px-6 pb-24">
          <div className="text-xs font-mono text-text-muted uppercase tracking-widest mb-5">Open Roles</div>
          <div className="space-y-3 mb-12">
            {ROLES.map((role) => (
              <div key={role.title} className="card-surface card-surface-hover rounded-2xl p-5 flex items-center justify-between group">
                <div>
                  <div className="font-display font-600 text-text-primary mb-1">{role.title}</div>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span>{role.team}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{role.location}</span>
                    <span>·</span>
                    <span>{role.type}</span>
                  </div>
                </div>
                <Link href="/contact"
                  className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-bright transition-colors font-medium opacity-0 group-hover:opacity-100">
                  Apply <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
          <div className="card-surface rounded-2xl p-8 text-center">
            <p className="text-text-secondary text-sm mb-4">Don&apos;t see a role that fits? We&apos;re always interested in exceptional people.</p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/8 border border-white/10 text-text-secondary hover:text-text-primary font-medium text-sm rounded-xl transition-all">
              Send us a message <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
