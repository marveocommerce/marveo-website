import Link from "next/link";
import { ArrowRight, Cpu, Monitor, Settings, LayoutTemplate } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { PRODUCT_LAYERS } from "@/constants";

const ICONS: Record<string, React.ElementType> = { Cpu, Monitor, Settings, LayoutTemplate };

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
          {PRODUCT_LAYERS.map((layer) => {
            const Icon = ICONS[layer.icon];
            return (
              <div key={layer.number}
                className="card-surface card-surface-hover rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${layer.color}15`, border: `1px solid ${layer.color}25` }}>
                      {Icon && <Icon className="w-5 h-5" style={{ color: layer.color }} />}
                    </div>
                    <span className="font-mono text-xs text-text-muted">{layer.number}</span>
                  </div>
                  <h3 className="font-display text-xl font-700 text-text-primary mb-2">{layer.name}</h3>
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
                        <div className="w-1 h-1 rounded-full shrink-0" style={{ background: layer.color }} />
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
