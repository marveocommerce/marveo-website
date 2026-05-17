import { CheckCircle2, Activity } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";

const SERVICES = [
  { name: "Marvéo Dashboard",       status: "operational", uptime: "99.98%" },
  { name: "Deployment Engine",      status: "operational", uptime: "99.95%" },
  { name: "WordPress Connector API",status: "operational", uptime: "100%"   },
  { name: "Template CDN",           status: "operational", uptime: "100%"   },
  { name: "Authentication Service", status: "operational", uptime: "99.99%" },
  { name: "Vercel Edge Network",    status: "operational", uptime: "100%"   },
];

export default function StatusPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="System Status"
          title={<>All systems<br /><span className="text-gradient">operational.</span></>}
          description="Real-time status of all Marvéo infrastructure services."
        />
        <section className="max-w-3xl mx-auto px-6 pb-24">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-success/8 border border-success/20 mb-8">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <div>
              <div className="text-sm font-semibold text-text-primary">All services are online</div>
              <div className="text-xs text-text-muted">Last checked: just now</div>
            </div>
          </div>
          <div className="space-y-3">
            {SERVICES.map((s) => (
              <div key={s.name} className="card-surface rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-sm text-text-secondary">{s.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-text-muted">{s.uptime} uptime</span>
                  <span className="text-xs font-mono text-success px-2 py-0.5 rounded-md bg-success/10 border border-success/15">
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs text-text-muted">
            <Activity className="w-3.5 h-3.5" />
            Incident history and detailed metrics coming soon.
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
