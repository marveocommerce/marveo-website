import Link from "next/link";
import { ArrowRight, Blocks, Radar, Rocket, Workflow } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";

const OPERATIONAL_CAPABILITIES = [
  {
    icon: Workflow,
    title: "Connected Workspaces",
    description:
      "Operate commerce, content, infrastructure, and deployments through one structured operational environment.",
    bullets: ["Unified operational visibility", "Cross-team workflows", "Centralized management"],
    color: "#4F8EF7",
  },
  {
    icon: Rocket,
    title: "Deployment Infrastructure",
    description:
      "Launch operational environments and modern storefront experiences without rebuilding existing systems.",
    bullets: [
      "Existing infrastructure compatibility",
      "Operational deployment workflows",
      "Launch acceleration systems",
    ],
    color: "#34D399",
  },
  {
    icon: Radar,
    title: "Operational Visibility",
    description:
      "Track workflows, environments, deployments, and connected systems through one operational control layer.",
    bullets: ["Workspace visibility", "Operational monitoring", "Activity tracking"],
    color: "#F59E0B",
  },
  {
    icon: Blocks,
    title: "Scalable Commerce Frameworks",
    description:
      "Accelerate launches using structured operational frameworks designed for modern commerce businesses.",
    bullets: [
      "Industry-ready frameworks",
      "Commerce operational systems",
      "Deployment-ready environments",
    ],
    color: "#A78BFA",
  },
] as const;

export default function ProductPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Unified Commerce Operations"
          title={<>One Platform.<br /><span className="text-gradient">Multiple Operational Capabilities.</span></>}
          description="Marvéo centralizes commerce operations, deployment workflows, connected infrastructure, and operational visibility into one scalable operational platform."
        />
        <section className="max-w-5xl mx-auto px-6 pb-24 space-y-6">
          {OPERATIONAL_CAPABILITIES.map((capability) => {
            const Icon = capability.icon;
            return (
              <div key={capability.title}
                className="card-surface card-surface-hover rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${capability.color}15`, border: `1px solid ${capability.color}25` }}>
                      <Icon className="w-5 h-5" style={{ color: capability.color }} />
                    </div>
                    <span className="font-mono text-xs text-text-muted">Capability</span>
                  </div>
                  <h3 className="font-display text-xl font-700 text-text-primary mb-2">{capability.title}</h3>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-lg"
                    style={{ color: capability.color, background: `${capability.color}10`, border: `1px solid ${capability.color}20` }}>
                    Operational outcome
                  </span>
                </div>
                <div className="md:col-span-2">
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">{capability.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {capability.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-center gap-2 text-xs text-text-muted">
                        <div className="w-1 h-1 rounded-full shrink-0" style={{ background: capability.color }} />
                        {bullet}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="text-center pt-8">
            <Link href="/deployments"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-bright text-white font-semibold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(79,142,247,0.3)]">
              Explore The Platform <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
