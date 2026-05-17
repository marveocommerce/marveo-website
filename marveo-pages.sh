#!/usr/bin/env bash
# ============================================================
# MARVÉO — Pages Builder Script
# Run from inside your marveo-website folder:
#   chmod +x marveo-pages.sh && ./marveo-pages.sh
# ============================================================

set -e
GREEN='\033[0;32m'; BLUE='\033[0;34m'; BOLD='\033[1m'; NC='\033[0m'
log()  { echo -e "${GREEN}[✓]${NC} $1"; }
info() { echo -e "${BLUE}[→]${NC} $1"; }
head() { echo -e "\n${BOLD}${BLUE}━━━ $1 ━━━${NC}\n"; }

echo -e "${BOLD}Marvéo — Building All Missing Pages${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── Verify we're in the right folder ──────────────────────
[ ! -f "package.json" ] && echo "Run this from inside marveo-website folder" && exit 1

# ── Create page directories ────────────────────────────────
head "Creating Page Directories"
mkdir -p src/app/{templates,pricing,contact,about,product,deployments,changelog,status,blog,careers,privacy,login}
mkdir -p src/app/solutions/\[sector\]
mkdir -p src/app/docs/{api,plugin}
log "Directories created"

# ══════════════════════════════════════════════════════════
# SHARED PAGE WRAPPER
# ══════════════════════════════════════════════════════════
head "Shared Components"

cat > src/components/shared/PageHero.tsx << 'EOF'
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";

interface PageHeroProps {
  label: string;
  title: React.ReactNode;
  description: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-radial-glow" />
      <GlowOrb className="-top-20 left-1/2 -translate-x-1/2" size="lg" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <SectionLabel>{label}</SectionLabel>
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-800 text-text-primary mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
EOF

cat > src/components/shared/ComingSoon.tsx << 'EOF'
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/shared/GlowOrb";

interface ComingSoonProps {
  title: string;
  description: string;
  label: string;
}

export function ComingSoon({ title, description, label }: ComingSoonProps) {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-radial-glow" />
        <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="lg" />
        <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warning/10 border border-warning/20 text-warning text-xs font-mono mb-8">
            <Clock className="w-3 h-3" />
            {label}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-800 text-text-primary mb-5">
            {title}
          </h1>
          <p className="text-text-secondary mb-10 leading-relaxed">{description}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/8 border border-white/10 text-text-secondary hover:text-text-primary rounded-xl transition-all text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
EOF
log "Shared components written"

# ══════════════════════════════════════════════════════════
# /templates — Full Marketplace Page
# ══════════════════════════════════════════════════════════
head "Building /templates"

cat > src/app/templates/page.tsx << 'EOF'
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, ArrowRight, Star, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { SECTORS, TEMPLATE_PREVIEWS } from "@/constants";
import { cn } from "@/lib/utils";

const ALL_TEMPLATES = [
  ...TEMPLATE_PREVIEWS,
  { id: 7,  name: "AgencyOne",      sector: "Corporate",     tags: ["Agency", "Portfolio"],  featured: false },
  { id: 8,  name: "Prestige",       sector: "Corporate",     tags: ["Consulting", "B2B"],    featured: true  },
  { id: 9,  name: "ShopNova",       sector: "Ecommerce",     tags: ["Fashion", "Shopify"],   featured: false },
  { id: 10, name: "PropElite",      sector: "Real Estate",   tags: ["Luxury", "Listings"],   featured: true  },
  { id: 11, name: "HealthFirst",    sector: "Healthcare",    tags: ["Clinic", "HIPAA"],      featured: false },
  { id: 12, name: "EduSpark",       sector: "Education",     tags: ["Academy", "Online"],    featured: false },
  { id: 13, name: "BlitzPage",      sector: "Landing Pages", tags: ["Ads", "Conversion"],    featured: true  },
  { id: 14, name: "StoreFront Pro", sector: "Ecommerce",     tags: ["Retail", "WooCommerce"],featured: false },
  { id: 15, name: "ClinicPlus",     sector: "Healthcare",    tags: ["Hospital", "Booking"],  featured: false },
];

const FILTERS = ["All", ...SECTORS.map((s) => s.label)];

const COLORS: Record<string, string> = {
  Corporate: "#4F8EF7",
  Ecommerce: "#34D399",
  "Real Estate": "#F59E0B",
  Healthcare: "#EC4899",
  Education: "#A78BFA",
  "Landing Pages": "#FB923C",
};

export default function TemplatesPage() {
  const [active, setActive]   = useState("All");
  const [query, setQuery]     = useState("");

  const filtered = ALL_TEMPLATES.filter((t) => {
    const matchSector = active === "All" || t.sector === active;
    const matchQuery  = t.name.toLowerCase().includes(query.toLowerCase()) ||
                        t.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
    return matchSector && matchQuery;
  });

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Template Marketplace"
          title={<>Production-grade templates.<br /><span className="text-gradient">One-click deployment.</span></>}
          description="Every template is sector-optimised, mobile-first, and ready to deploy through Marvéo. Choose your industry, preview the design, and go live in minutes."
        />

        {/* Filters */}
        <section className="max-w-7xl mx-auto px-6 pb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search templates..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-bg-card border border-white/8 rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 font-body"
              />
            </div>
            {/* Sector filters */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all border",
                    active === f
                      ? "bg-accent/15 text-accent border-accent/25"
                      : "bg-white/3 text-text-muted border-white/7 hover:text-text-secondary hover:bg-white/6"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center gap-2 mb-6 text-sm text-text-muted">
            <SlidersHorizontal className="w-4 h-4" />
            {filtered.length} template{filtered.length !== 1 ? "s" : ""} found
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active + query}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-24"
            >
              {filtered.length === 0 ? (
                <div className="col-span-3 text-center py-20 text-text-muted">
                  No templates found for &quot;{query}&quot;
                </div>
              ) : (
                filtered.map((tpl, i) => (
                  <motion.div
                    key={tpl.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="card-surface card-surface-hover group rounded-2xl overflow-hidden"
                  >
                    {/* Preview */}
                    <div
                      className="relative h-48 overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${COLORS[tpl.sector] || "#4F8EF7"}12, transparent)` }}
                    >
                      <div className="absolute inset-0 grid-bg opacity-30" />
                      <div className="absolute top-4 left-4 right-4 h-6 rounded-lg bg-bg-secondary/60 border border-white/8 flex items-center px-3 gap-2">
                        <div className="flex gap-1">
                          {[0,1,2].map(d => <div key={d} className="w-1.5 h-1.5 rounded-full bg-white/20" />)}
                        </div>
                        <div className="flex-1 text-center text-[9px] text-text-muted font-mono">
                          {tpl.name.toLowerCase().replace(/\s+/g, "-")}.marveo.co
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 space-y-2">
                        <div className="h-3 rounded bg-white/10 w-3/4" />
                        <div className="h-2 rounded bg-white/6 w-1/2" />
                        <div className="h-7 rounded-lg w-28 mt-1" style={{ background: `${COLORS[tpl.sector]}35` }} />
                      </div>
                      {tpl.featured && (
                        <div className="absolute top-12 right-4 flex items-center gap-1 px-2 py-0.5 rounded-md bg-warning/20 border border-warning/30 text-warning text-[10px] font-mono">
                          <Star className="w-2.5 h-2.5" /> Featured
                        </div>
                      )}
                      <div className="absolute inset-0 bg-bg-primary/0 group-hover:bg-bg-primary/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur border border-white/15 text-white text-xs font-medium rounded-lg">
                          <ExternalLink className="w-3 h-3" /> Preview
                        </button>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-display font-600 text-text-primary text-sm">{tpl.name}</h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                          style={{ color: COLORS[tpl.sector], background: `${COLORS[tpl.sector]}12`, border: `1px solid ${COLORS[tpl.sector]}25` }}>
                          {tpl.sector}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {tpl.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-white/4 text-text-muted border border-white/6 font-mono">{tag}</span>
                        ))}
                      </div>
                      <Link href={`/templates/${tpl.id}`}
                        className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-bright transition-colors group/link">
                        Deploy template
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
      <Footer />
    </>
  );
}
EOF
log "/templates built"

# ══════════════════════════════════════════════════════════
# /solutions/[sector] — Dynamic Sector Pages
# ══════════════════════════════════════════════════════════
head "Building /solutions/[sector]"

cat > "src/app/solutions/[sector]/page.tsx" << 'EOF'
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
EOF
log "/solutions/[sector] built"

# ══════════════════════════════════════════════════════════
# /pricing
# ══════════════════════════════════════════════════════════
head "Building /pricing"

cat > src/app/pricing/page.tsx << 'EOF'
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: { monthly: 29, annual: 23 },
    description: "For small businesses and solo operators launching their first site.",
    features: [
      "1 website workspace",
      "Up to 3 template deployments",
      "WordPress connector plugin",
      "Basic analytics",
      "Standard support",
      "Marvéo subdomain",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: { monthly: 79, annual: 63 },
    description: "For growing businesses managing multiple sites and deployments.",
    features: [
      "5 website workspaces",
      "Unlimited template deployments",
      "WordPress + Headless connector",
      "Advanced analytics",
      "Priority support",
      "Custom domain support",
      "GitHub sync",
      "Deployment history & rollbacks",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: { monthly: null, annual: null },
    description: "For agencies and enterprises managing dozens of client deployments.",
    features: [
      "Unlimited workspaces",
      "Unlimited deployments",
      "All connector types",
      "White-label options",
      "Dedicated account manager",
      "SLA guarantee",
      "Custom integrations",
      "Team access controls",
      "Audit logs",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Pricing"
          title={<>Simple pricing.<br /><span className="text-gradient">No surprises.</span></>}
          description="Start free, scale when you need to. Every plan includes the core Marvéo deployment engine."
        />

        {/* Toggle */}
        <div className="flex justify-center mb-14">
          <div className="flex items-center gap-4 p-1.5 bg-bg-card border border-white/8 rounded-xl">
            <button
              onClick={() => setAnnual(false)}
              className={cn("px-5 py-2 rounded-lg text-sm font-medium transition-all",
                !annual ? "bg-accent text-white" : "text-text-muted hover:text-text-secondary")}
            >Monthly</button>
            <button
              onClick={() => setAnnual(true)}
              className={cn("px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                annual ? "bg-accent text-white" : "text-text-muted hover:text-text-secondary")}
            >
              Annual
              <span className="text-[10px] px-1.5 py-0.5 bg-success/20 text-success rounded-md font-mono">-20%</span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative rounded-2xl p-7 flex flex-col",
                  plan.highlighted
                    ? "bg-accent/8 border border-accent/30 shadow-[0_0_40px_rgba(79,142,247,0.1)]"
                    : "card-surface"
                )}
              >
                {plan.highlighted && (
                  <GlowOrb className="-top-10 left-1/2 -translate-x-1/2" size="sm" />
                )}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                    {plan.badge}
                  </div>
                )}
                <div className="mb-6">
                  <div className="font-display font-700 text-text-primary text-lg mb-2">{plan.name}</div>
                  <div className="mb-3">
                    {plan.price.monthly ? (
                      <div className="flex items-end gap-1">
                        <span className="font-display text-4xl font-800 text-text-primary">
                          ${annual ? plan.price.annual : plan.price.monthly}
                        </span>
                        <span className="text-text-muted text-sm mb-1.5">/month</span>
                      </div>
                    ) : (
                      <div className="font-display text-3xl font-700 text-text-primary">Custom</div>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{plan.description}</p>
                </div>
                <div className="space-y-3 flex-1 mb-7">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary">{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={plan.id === "enterprise" ? "/contact" : "/setup/activate"}
                  className={cn(
                    "flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all",
                    plan.highlighted
                      ? "bg-accent hover:bg-accent-bright text-white shadow-[0_0_20px_rgba(79,142,247,0.3)]"
                      : "bg-white/5 hover:bg-white/8 border border-white/10 text-text-secondary hover:text-text-primary"
                  )}
                >
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* FAQ note */}
          <div className="text-center">
            <p className="text-text-muted text-sm mb-4">All plans include a 14-day free trial. No credit card required.</p>
            <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-bright transition-colors">
              <Zap className="w-3.5 h-3.5" />
              Have questions? Talk to our team
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
EOF
log "/pricing built"

# ══════════════════════════════════════════════════════════
# /contact
# ══════════════════════════════════════════════════════════
head "Building /contact"

cat > src/app/contact/page.tsx << 'EOF'
"use client";

import { useState } from "react";
import { Send, MessageSquare, Calendar, Mail } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { GlowOrb } from "@/components/shared/GlowOrb";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", type: "demo", message: "" });

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Contact"
          title={<>Let&apos;s get your<br /><span className="text-gradient">website deployed.</span></>}
          description="Book a product demo, ask a question, or get a consultation. Our team responds within 24 hours."
        />

        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Contact options */}
            <div className="space-y-4">
              {[
                { icon: Calendar, label: "Book a Demo", desc: "30-minute walkthrough of the Marvéo platform tailored to your use case.", action: "Schedule →" },
                { icon: MessageSquare, label: "General Enquiry", desc: "Ask us anything about pricing, integrations, or deployment.", action: "Chat →" },
                { icon: Mail, label: "Email Us", desc: "hello@marveo.co — we reply within one business day.", action: "Email →" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="card-surface card-surface-hover rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-accent" />
                      </div>
                      <span className="font-display font-600 text-text-primary text-sm">{item.label}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed mb-3">{item.desc}</p>
                    <span className="text-xs font-medium text-accent">{item.action}</span>
                  </div>
                );
              })}
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-2 relative">
              <GlowOrb className="-top-10 right-0" size="sm" />
              <div className="card-surface border-glow rounded-2xl p-8 relative">
                {sent ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 rounded-2xl bg-success/15 border border-success/25 flex items-center justify-center mx-auto mb-5">
                      <Send className="w-6 h-6 text-success" />
                    </div>
                    <h3 className="font-display text-xl font-700 text-text-primary mb-2">Message sent!</h3>
                    <p className="text-text-secondary text-sm">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { key: "name",    label: "Full Name",     type: "text",  placeholder: "Your name" },
                        { key: "email",   label: "Email Address", type: "email", placeholder: "you@company.com" },
                        { key: "company", label: "Company",       type: "text",  placeholder: "Company name" },
                      ].map((field) => (
                        <div key={field.key} className={field.key === "company" ? "sm:col-span-2" : ""}>
                          <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={form[field.key as keyof typeof form]}
                            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                            className="w-full px-4 py-3 bg-bg-card border border-white/8 rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 font-body transition-colors"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                        I want to
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["demo", "question", "pricing", "partnership"].map((t) => (
                          <button key={t} onClick={() => setForm({ ...form, type: t })}
                            className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all capitalize ${
                              form.type === t
                                ? "bg-accent/15 text-accent border-accent/25"
                                : "bg-white/3 text-text-muted border-white/7 hover:text-text-secondary"
                            }`}>
                            {t === "demo" ? "Book a demo" : t === "question" ? "Ask a question" : t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your project..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 bg-bg-card border border-white/8 rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 font-body resize-none transition-colors"
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-bright text-white font-semibold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(79,142,247,0.3)]"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
EOF
log "/contact built"

# ══════════════════════════════════════════════════════════
# /about
# ══════════════════════════════════════════════════════════
head "Building /about"

cat > src/app/about/page.tsx << 'EOF'
import Link from "next/link";
import { ArrowRight, Target, Zap, Globe } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { GlowOrb } from "@/components/shared/GlowOrb";

const VALUES = [
  { icon: Target, label: "Simplicity first", desc: "Every feature exists to remove complexity, not add it. Business owners should not need a developer to update their website." },
  { icon: Zap, label: "Speed is a feature", desc: "Fast deployment, fast performance, fast iteration. Speed compounds into competitive advantage." },
  { icon: Globe, label: "Built for scale", desc: "Whether you manage one site or one thousand, the architecture should hold without fragmentation." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="About Marvéo"
          title={<>We&apos;re building the<br /><span className="text-gradient">OS for the web.</span></>}
          description="Marvéo was built because managing websites for modern businesses was still unnecessarily complex. We're changing that — one deployment at a time."
        />

        {/* Mission */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="card-surface border-glow rounded-3xl p-10 md:p-14 text-center relative overflow-hidden mb-20">
            <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="md" />
            <div className="relative">
              <div className="text-xs font-mono text-accent uppercase tracking-widest mb-5">Our Mission</div>
              <blockquote className="font-display text-2xl md:text-3xl font-600 text-text-primary leading-snug">
                &ldquo;Any website content or business platform should be dynamically importable into Marvéo and editable without requiring heavy technical expertise.&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Story */}
          <div className="prose-custom mb-20">
            <h2 className="font-display text-3xl font-700 text-text-primary mb-6">The story</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>Marvéo started as a product line within <a href="https://avariodigitals.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-bright transition-colors">Avario Digitals</a> — a digital agency that spent years building websites for businesses across multiple sectors.</p>
              <p>We saw the same problem repeating: businesses would pay significant sums to have websites built, then struggle to manage them without calling a developer every time something needed updating. WordPress helped, but its admin interface was designed for publishers, not operators.</p>
              <p>Marvéo is our answer. A clean, modern operating system for website deployment and management that meets businesses where they are — whether they&apos;re running traditional WordPress, a headless architecture, or a full custom Next.js stack.</p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="font-display text-3xl font-700 text-text-primary mb-10">What we believe</h2>
            <div className="space-y-5">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.label} className="card-surface card-surface-hover rounded-2xl p-6 flex items-start gap-5">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display font-700 text-text-primary mb-1">{v.label}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-display text-3xl font-700 text-text-primary mb-4">Ready to see it in action?</h2>
            <p className="text-text-secondary mb-8">Book a demo and we&apos;ll walk you through what Marvéo can do for your business.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact"
                className="flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-bright text-white font-semibold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(79,142,247,0.3)]">
                Book a Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/templates"
                className="flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/8 border border-white/10 text-text-secondary hover:text-text-primary font-semibold text-sm rounded-xl transition-all">
                Browse Templates
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
EOF
log "/about built"

# ══════════════════════════════════════════════════════════
# /product
# ══════════════════════════════════════════════════════════
head "Building /product"

cat > src/app/product/page.tsx << 'EOF'
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
EOF
log "/product built"

# ══════════════════════════════════════════════════════════
# PLACEHOLDER PAGES
# ══════════════════════════════════════════════════════════
head "Building Placeholder Pages"

# /status
cat > src/app/status/page.tsx << 'EOF'
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
EOF

# /docs
cat > src/app/docs/page.tsx << 'EOF'
import Link from "next/link";
import { BookOpen, Code2, PlugZap, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";

const DOC_SECTIONS = [
  { icon: BookOpen, title: "Getting Started", desc: "Set up your first workspace, connect your site, and deploy in under 10 minutes.", href: "/docs/getting-started", label: "New to Marvéo" },
  { icon: PlugZap,  title: "Connector Plugin", desc: "Install and configure the WordPress connector plugin. Token setup, GitHub sync, and validation.", href: "/docs/plugin", label: "WordPress users" },
  { icon: Code2,    title: "API Reference",  desc: "Full REST API documentation. Authentication, endpoints, webhooks, and examples.", href: "/docs/api", label: "Developers" },
];

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Documentation"
          title={<>Everything you need<br /><span className="text-gradient">to get started.</span></>}
          description="Comprehensive guides, API references, and integration documentation for the Marvéo platform."
        />
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {DOC_SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.title} href={s.href}
                  className="card-surface card-surface-hover rounded-2xl p-6 group block">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-2">{s.label}</div>
                  <h3 className="font-display font-700 text-text-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{s.desc}</p>
                  <span className="flex items-center gap-1.5 text-xs text-accent font-medium group-hover/link:gap-2 transition-all">
                    Read docs <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="card-surface rounded-2xl p-8 text-center">
            <div className="text-sm text-text-muted mb-3">Full documentation is being finalised.</div>
            <Link href="/contact" className="text-sm text-accent hover:text-accent-bright transition-colors">
              Contact us for early access →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
EOF

# /docs/api
cat > src/app/docs/api/page.tsx << 'EOF'
import { ComingSoon } from "@/components/shared/ComingSoon";
export default function ApiDocsPage() {
  return <ComingSoon title="API Reference" description="Full REST API documentation including authentication, endpoints, rate limits, webhooks, and code examples. Available soon." label="In progress" />;
}
EOF

# /docs/plugin
cat > src/app/docs/plugin/page.tsx << 'EOF'
import Link from "next/link";
import { PlugZap, Download, Key, GitBranch, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";

const STEPS = [
  { icon: Download, step: "01", title: "Download the plugin",  desc: "Download the Marvéo Connector Plugin from your Marvéo dashboard or the activation page." },
  { icon: PlugZap,  step: "02", title: "Install on WordPress", desc: "Upload and activate the plugin from your WordPress Plugins page. No configuration needed yet." },
  { icon: Key,      step: "03", title: "Enter your token",     desc: "Navigate to the activation URL. Enter your one-time validation token from the Marvéo dashboard." },
  { icon: GitBranch,step: "04", title: "GitHub sync (optional)", desc: "Connect your repository to enable auto-updates whenever you push to GitHub." },
];

export default function PluginDocsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Connector Plugin"
          title={<>Connect WordPress<br /><span className="text-gradient">in four steps.</span></>}
          description="The Marvéo Connector Plugin links your existing WordPress site to the Marvéo dashboard securely, using a one-time validation token. No credentials required."
        />
        <section className="max-w-3xl mx-auto px-6 pb-24">
          <div className="space-y-4 mb-12">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="card-surface rounded-2xl p-6 flex items-start gap-5">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-text-muted mb-1">Step {step.step}</div>
                    <h3 className="font-display font-600 text-text-primary mb-1">{step.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="card-surface border-glow rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="font-semibold text-text-primary text-sm">Security note</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Marvéo uses a one-time validation token system. We never store or ask for your WordPress username or password. Tokens can be revoked from your dashboard at any time.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Link href="/setup/activate"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-bright text-white font-semibold text-sm rounded-xl transition-all">
              Get your activation token →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
EOF

# /deployments
cat > src/app/deployments/page.tsx << 'EOF'
import { ComingSoon } from "@/components/shared/ComingSoon";
export default function DeploymentsPage() {
  return <ComingSoon title="Deployment Manager" description="The live deployment management console — monitor active deployments, trigger rollbacks, and manage environments across all your workspaces. Coming with the full platform launch." label="Coming soon" />;
}
EOF

# /changelog
cat > src/app/changelog/page.tsx << 'EOF'
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";

const ENTRIES = [
  { version: "v1.0.0", date: "May 2026",  tag: "Launch",       changes: ["Initial Marvéo platform launch", "WordPress Connector Plugin v1.0", "Corporate, Ecommerce, Real Estate templates", "Vercel deployment integration", "Token-based authentication system"] },
  { version: "v0.9.0", date: "Apr 2026",  tag: "Beta",         changes: ["Private beta with select agencies", "Headless WordPress support added", "Template marketplace architecture", "GitHub sync integration"] },
  { version: "v0.5.0", date: "Mar 2026",  tag: "Alpha",        changes: ["Core Engine scaffolded", "Initial plugin connection flow", "Dashboard UI foundation"] },
];

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
              {ENTRIES.map((entry) => (
                <div key={entry.version} className="flex gap-6">
                  <div className="w-10 shrink-0 flex flex-col items-center pt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent border-2 border-bg-primary" />
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-display font-700 text-text-primary">{entry.version}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20">{entry.tag}</span>
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
EOF

# /blog
cat > src/app/blog/page.tsx << 'EOF'
import { ComingSoon } from "@/components/shared/ComingSoon";
export default function BlogPage() {
  return <ComingSoon title="Marvéo Blog" description="Insights on website deployment, headless architecture, WordPress operations, and building modern business infrastructure. Launching soon." label="Coming soon" />;
}
EOF

# /careers
cat > src/app/careers/page.tsx << 'EOF'
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
EOF

# /privacy
cat > src/app/privacy/page.tsx << 'EOF'
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Legal"
          title={<>Privacy<br /><span className="text-gradient">Policy.</span></>}
          description="How Marvéo collects, uses, and protects your information."
        />
        <section className="max-w-3xl mx-auto px-6 pb-24">
          <div className="card-surface rounded-2xl p-8 md:p-10 space-y-8 text-text-secondary text-sm leading-relaxed">
            <p className="text-text-muted text-xs font-mono">Last updated: May 2026</p>
            {[
              { title: "1. Information We Collect", body: "We collect information you provide directly to us, such as your name, email address, company name, and payment information when you register for a Marvéo account. We also collect usage data, deployment logs, and technical information about your workspace activity to provide and improve the service." },
              { title: "2. How We Use Your Information", body: "We use your information to operate, maintain, and provide the Marvéo platform; process transactions; send service-related communications; and improve the platform. We do not sell your personal data to third parties." },
              { title: "3. WordPress Connector Plugin", body: "The Marvéo Connector Plugin uses one-time validation tokens for authentication. We do not store or access your WordPress admin credentials. Token access can be revoked at any time from your Marvéo dashboard." },
              { title: "4. Data Storage and Security", body: "Your data is stored on secure, encrypted infrastructure. We use industry-standard security practices including TLS encryption in transit and AES-256 encryption at rest. We undergo regular security reviews." },
              { title: "5. Cookies", body: "We use essential cookies to keep you logged in and remember your preferences. We also use analytics cookies (with your consent) to understand how the platform is used. You can manage cookie preferences in your account settings." },
              { title: "6. Third-Party Services", body: "We use Vercel for hosting, and may use other third-party services for analytics and support. These parties have their own privacy policies and we encourage you to review them." },
              { title: "7. Your Rights", body: "You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at privacy@marveo.co. We will respond within 30 days." },
              { title: "8. Contact", body: "If you have questions about this policy, contact us at privacy@marveo.co or through our contact form." },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="font-display font-700 text-text-primary mb-3">{section.title}</h2>
                <p>{section.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
EOF

# /login — redirect to app
cat > src/app/login/page.tsx << 'EOF'
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/shared/GlowOrb";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-radial-glow" />
        <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="lg" />
        <div className="relative z-10 max-w-sm mx-auto px-6 text-center">
          <div className="card-surface border-glow rounded-3xl p-10">
            <div className="text-xs font-mono text-accent uppercase tracking-widest mb-6">Marvéo Platform</div>
            <h1 className="font-display text-2xl font-700 text-text-primary mb-3">Sign in to Marvéo</h1>
            <p className="text-sm text-text-secondary mb-8">
              The Marvéo dashboard lives on our app platform. Click below to sign in or create your account.
            </p>
            <Link
              href="https://app.marveo.co/login"
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-accent hover:bg-accent-bright text-white font-semibold text-sm rounded-xl transition-all mb-4 shadow-[0_0_20px_rgba(79,142,247,0.3)]"
            >
              <ExternalLink className="w-4 h-4" />
              Go to Marvéo App
            </Link>
            <Link href="/contact"
              className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Need help? Contact support →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
EOF
log "All placeholder pages built"

# ══════════════════════════════════════════════════════════
# 404 PAGE
# ══════════════════════════════════════════════════════════
head "Building 404 Page"

cat > src/app/not-found.tsx << 'EOF'
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/shared/GlowOrb";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-radial-glow" />
        <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="lg" />
        <div className="relative z-10 max-w-lg mx-auto px-6 text-center">
          <div className="font-display text-[120px] font-800 leading-none text-gradient opacity-20 mb-4">404</div>
          <h1 className="font-display text-3xl font-700 text-text-primary mb-4">Page not found</h1>
          <p className="text-text-secondary mb-8">
            This page doesn&apos;t exist or hasn&apos;t been built yet. Head back to the homepage.
          </p>
          <Link href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-bright text-white font-semibold text-sm rounded-xl transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Marvéo
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
EOF
log "404 page built"

# ══════════════════════════════════════════════════════════
# GIT COMMIT
# ══════════════════════════════════════════════════════════
head "Committing Pages"
git add -A
git commit -m "feat: build all missing pages — templates, solutions, pricing, contact, about, product, docs, status, changelog, careers, privacy, 404" -q
log "Committed"

echo ""
echo -e "${BOLD}${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${GREEN}  All pages built ✓${NC}"
echo -e "${BOLD}${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Pages created:"
echo "  /templates         Full marketplace with search + filters"
echo "  /solutions/[sector] Dynamic pages for all 6 sectors"
echo "  /pricing           3-tier pricing page"
echo "  /contact           Contact + demo booking form"
echo "  /about             About Marvéo + mission"
echo "  /product           4-layer platform overview"
echo "  /docs              Documentation hub"
echo "  /docs/plugin       Connector plugin guide"
echo "  /docs/api          API reference (coming soon)"
echo "  /status            Live status page"
echo "  /changelog         Version history"
echo "  /blog              Coming soon"
echo "  /careers           Open roles"
echo "  /privacy           Privacy policy"
echo "  /login             Redirect to app"
echo "  /[anything else]   Custom 404 page"
echo ""
echo "Restart dev server: npm run dev"
echo ""
