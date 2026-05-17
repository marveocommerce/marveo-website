import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Building2, ShoppingBag, MapPin, Heart, GraduationCap, Zap } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { SECTORS, TEMPLATE_PREVIEWS } from "@/constants";
import type { Metadata } from "next";

const ICONS: Record<string, React.ElementType> = {
  Building2, ShoppingBag, MapPin, Heart, GraduationCap, Zap,
};

const PAIN_POINTS: Record<string, string[]> = {
  corporate:    ["Generic templates that look like every other business", "Expensive agency builds with long timelines", "No easy way to update content without a developer"],
  ecommerce:    ["WooCommerce setups that take weeks to configure", "Disconnected payment and product management", "Poor mobile performance hurting conversions"],
  "real-estate":["Property listings that look outdated", "Inquiry forms that don't convert", "No easy way to manage multiple agent profiles"],
  healthcare:   ["Clinic websites that feel impersonal and outdated", "No integrated appointment booking flow", "Compliance concerns with generic templates"],
  education:    ["LMS setups that are complex and expensive", "Poor student onboarding experiences", "Disconnected course and instructor management"],
  landing:      ["Low-converting pages built by non-specialists", "Slow load times killing ad campaign ROI", "No WhatsApp or lead capture integrations"],
};

const SOLUTIONS: Record<string, string[]> = {
  corporate:    ["Deploy a polished corporate site in under an hour", "Full blog and content management through Marvéo", "Easy updates without touching code"],
  ecommerce:    ["WooCommerce-ready templates with pre-built product flows", "Centralised inventory, checkout and order management", "Conversion-optimised layouts built on real data"],
  "real-estate":["Dynamic property listing engine with filters", "Agent profile management from your dashboard", "Inquiry routing and CRM-ready contact forms"],
  healthcare:   ["Appointment booking flows built-in from day one", "Provider profiles and service page templates", "HIPAA-conscious architecture and data handling"],
  education:    ["LMS-ready templates with course and module layouts", "Student onboarding flows and instructor pages", "Integration-ready for Teachable, LearnDash, and more"],
  landing:      ["High-conversion single-page layouts by specialists", "WhatsApp chat, lead forms, and booking integrations", "Lightning-fast load times optimised for paid ads"],
};

export async function generateStaticParams() {
  return SECTORS.map((s) => ({ sector: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sector: string }>;
}): Promise<Metadata> {
  const { sector } = await params;
  const found = SECTORS.find((s) => s.id === sector);
  if (!found) return {};
  return {
    title: `${found.label} Website Templates`,
    description: found.description,
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ sector: string }>;
}) {
  const { sector } = await params;
  const sectorData = SECTORS.find((s) => s.id === sector);
  if (!sectorData) notFound();

  const Icon = ICONS[sectorData.icon];
  const templates = TEMPLATE_PREVIEWS.filter((t) => t.sector === sectorData.label);
  const pains     = PAIN_POINTS[sector]    || [];
  const solutions = SOLUTIONS[sector]      || [];

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label={sectorData.label}
          title={<>{sectorData.label} websites<br /><span className="text-gradient">built to convert.</span></>}
          description={sectorData.description}
        />

        {/* Pain points vs solutions */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {/* Pain */}
            <div className="card-surface rounded-2xl p-8">
              <div className="text-xs font-mono text-error mb-5 uppercase tracking-widest">The problem</div>
              <div className="space-y-4">
                {pains.map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-error mt-2 shrink-0" />
                    <p className="text-text-secondary text-sm leading-relaxed">{p}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Solution */}
            <div className="card-surface border-glow rounded-2xl p-8">
              <div className="text-xs font-mono text-success mb-5 uppercase tracking-widest">The Marvéo solution</div>
              <div className="space-y-4">
                {solutions.map((s) => (
                  <div key={s} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    <p className="text-text-secondary text-sm leading-relaxed">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-20">
            <div className="text-xs font-mono text-text-muted uppercase tracking-widest mb-5">Included features</div>
            <div className="flex flex-wrap gap-2">
              {sectorData.tags.map((tag) => (
                <span key={tag}
                  className="px-4 py-2 rounded-xl text-sm font-medium border"
                  style={{ color: sectorData.color, background: `${sectorData.color}10`, borderColor: `${sectorData.color}25` }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Templates */}
          {templates.length > 0 && (
            <div className="mb-20">
              <div className="text-xs font-mono text-text-muted uppercase tracking-widest mb-5">
                Templates for this sector
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {templates.map((tpl) => (
                  <div key={tpl.id} className="card-surface card-surface-hover rounded-2xl p-5">
                    <div className="h-28 rounded-xl mb-4 grid-bg relative overflow-hidden"
                      style={{ background: `${sectorData.color}08` }}>
                      <div className="absolute inset-x-3 bottom-3 space-y-1.5">
                        <div className="h-2.5 rounded bg-white/10 w-3/4" />
                        <div className="h-2 rounded bg-white/6 w-1/2" />
                      </div>
                    </div>
                    <div className="font-semibold text-text-primary text-sm mb-3">{tpl.name}</div>
                    <Link href={`/templates`}
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                      style={{ color: sectorData.color }}>
                      Deploy <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="relative card-surface border-glow rounded-3xl p-12 text-center overflow-hidden">
            <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="md"
              color={`${sectorData.color}15`} />
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                style={{ background: `${sectorData.color}15`, border: `1px solid ${sectorData.color}30` }}>
                {Icon && <Icon className="w-6 h-6" style={{ color: sectorData.color }} />}
              </div>
              <h2 className="font-display text-3xl font-700 text-text-primary mb-4">
                Ready to deploy your {sectorData.label.toLowerCase()} website?
              </h2>
              <p className="text-text-secondary mb-8 max-w-md mx-auto">
                Get online in minutes with a production-grade {sectorData.label.toLowerCase()} template, managed entirely through Marvéo.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/templates"
                  className="flex items-center gap-2 px-7 py-3 text-white font-semibold text-sm rounded-xl transition-all"
                  style={{ background: sectorData.color }}>
                  Browse {sectorData.label} Templates <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact"
                  className="flex items-center gap-2 px-7 py-3 bg-white/5 hover:bg-white/8 border border-white/10 text-text-secondary hover:text-text-primary font-semibold text-sm rounded-xl transition-all">
                  Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
