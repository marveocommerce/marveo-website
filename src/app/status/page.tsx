import { CheckCircle2, Activity } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { STATUS_SERVICES } from "@/constants";

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
            {STATUS_SERVICES.map((s) => (
              <div key={s.name} className="card-surface rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    s.status === "operational" ? "bg-success" :
                    s.status === "degraded"    ? "bg-warning animate-pulse" : "bg-error animate-pulse"
                  }`} />
                  <span className="text-sm text-text-secondary">{s.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-text-muted">{s.uptime} uptime</span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-md border ${
                    s.status === "operational"
                      ? "text-success bg-success/10 border-success/15"
                      : "text-warning bg-warning/10 border-warning/15"
                  }`}>
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
