import Link from "next/link";
import { ArrowRight, Cpu, Monitor, Settings, LayoutTemplate } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";

const LAYERS = [
  {
    icon: Cpu,
    number: "01",
    name: "Marvéo Core Engine",
    owner: "Infrastructure layer",
    color: "#4F8EF7",
    description: "The central brain of the entire ecosystem. Handles deployment orchestration, dynamic provisioning, multi-client architecture, API integrations, and automation workflows.",
    features: ["Deployment orchestration", "Multi-client architecture", "Environment generation", "API layer & integrations", "Template provisioning system", "Licensing & token architecture"],
  },
  {
    icon: Monitor,
    number: "02",
    name: "Marvéo Client Portal",
    owner: "Frontend platform",
    color: "#34D399",
    description: "The modern, lightweight frontend that clients use to manage their websites. Onboarding, workspace setup, content management, media handling, and launch controls.",
    features: ["Client onboarding flow", "Workspace setup", "Plugin connection flow", "Content management", "Media handling", "Launch controls"],
  },
  {
    icon: Settings,
    number: "03",
    name: "Owner / Admin Backend",
    owner: "Operations portal",
    color: "#F59E0B",
    description: "The internal command centre for managing all client deployments, subscriptions, templates, and platform-wide settings at scale.",
    features: ["Client management system", "Deployment monitoring", "Template management", "Subscription & license management", "Activity logs", "API monitoring"],
  },
  {
    icon: LayoutTemplate,
    number: "04",
    name: "Template Ecosystem",
    owner: "Design layer",
    color: "#A78BFA",
    description: "Sector-optimised templates built for real business use cases. Corporate, Ecommerce, Real Estate, Healthcare, Education, and Landing Pages — all deployment-ready.",
    features: ["Corporate templates", "Ecommerce templates", "Real Estate templates", "Healthcare templates", "Education templates", "Landing page templates"],
  },
];

export default function ProductPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="The Platform"
          title={<>Four layers.<br /><span className="text-gradient">One unified system.</span></>}
          description="Marvéo is a scalable Commerce OS and Website Operating System. Here is how the four layers work together to give you complete control."
        />

        <section className="max-w-5xl mx-auto px-6 pb-24 space-y-6">
          {LAYERS.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <div key={layer.number}
                className="card-surface card-surface-hover rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${layer.color}15`, border: `1px solid ${layer.color}25` }}>
                      <Icon className="w-5 h-5" style={{ color: layer.color }} />
                    </div>
                    <span className="font-mono text-xs text-text-muted">{layer.number}</span>
                  </div>
                  <h3 className="font-display text-xl font-700 text-text-primary mb-1">{layer.name}</h3>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-lg"
                    style={{ color: layer.color, background: `${layer.color}10`, border: `1px solid ${layer.color}20` }}>
                    {layer.owner}
                  </span>
                </div>
                <div className="md:col-span-2">
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">{layer.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {layer.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-text-muted">
                        <div className="w-1 h-1 rounded-full" style={{ background: layer.color }} />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="text-center pt-8">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-bright text-white font-semibold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(79,142,247,0.3)]">
              See it in action <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
