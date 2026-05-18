#!/usr/bin/env bash
# ============================================================
# MARVÉO — Fix site.ts + Move all content to constants
# Run from inside marveo-website folder:
#   chmod +x marveo-constants.sh && ./marveo-constants.sh
# ============================================================

set -e
GREEN='\033[0;32m'; BLUE='\033[0;34m'; BOLD='\033[1m'; NC='\033[0m'
log()  { echo -e "${GREEN}[✓]${NC} $1"; }
head() { echo -e "\n${BOLD}${BLUE}━━━ $1 ━━━${NC}\n"; }

echo -e "${BOLD}Marvéo — Fixing Config & Centralising All Content${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

[ ! -f "package.json" ] && echo "Run from inside marveo-website folder" && exit 1

# ══════════════════════════════════════════════════════════
# 1. FIX site.ts — restore nav array + add appUrl
# ══════════════════════════════════════════════════════════
head "Fixing src/config/site.ts"

cat > src/config/site.ts << 'EOF'
export const siteConfig = {
  name: "Marvéo",
  tagline: "The Website Operating System",
  description:
    "Deploy, manage, and scale modern websites without heavy technical complexity. Marvéo is the commerce OS for businesses that want more.",
  url: "https://marveo.co",
  ogImage: "/og.png",

  /*
   * appUrl — the external Marvéo application (Rapheal's Core Engine).
   * Update this once the app domain is live.
   * Used by: Navbar Login + Start Deployment CTAs
   */
  appUrl: "https://app.marveo.co",

  links: {
    github:  "https://github.com/marveocommerce",
    twitter: "https://twitter.com/marveo",
    docs:    "/docs",
    avario:  "https://avariodigitals.com/",
  },

  /*
   * nav — desktop + mobile navigation items.
   * Add, remove, or reorder here; Navbar picks them up automatically.
   */
  nav: [
    { label: "Product",   href: "/product"   },
    { label: "Templates", href: "/templates" },
    { label: "Solutions", href: "/solutions/corporate" },
    { label: "Docs",      href: "/docs"      },
    { label: "Pricing",   href: "/pricing"   },
  ],
};
EOF
log "site.ts fixed"

# ══════════════════════════════════════════════════════════
# 2. FULL constants/index.ts — ALL site content in one file
# ══════════════════════════════════════════════════════════
head "Writing src/constants/index.ts — all content centralised"

cat > src/constants/index.ts << 'EOF'
// ============================================================
// MARVÉO — Central Content Store
// ============================================================
// This is the single source of truth for ALL content on the
// Marvéo website. Edit here; pages read from here.
//
// When Rapheal's Core Engine API is ready, replace each
// export with an async fetch() call — no page files change.
// ============================================================


// ── Sectors ─────────────────────────────────────────────────
export const SECTORS = [
  {
    id: "corporate",
    label: "Corporate",
    description:
      "Professional presence for SMEs, agencies, and consulting firms. Built for trust, clarity, and conversion.",
    templates: 14,
    icon: "Building2",
    tags: ["Homepage", "About", "Services", "Blog"],
    color: "#4F8EF7",
  },
  {
    id: "ecommerce",
    label: "Ecommerce",
    description:
      "Full commerce infrastructure. Product pages, cart flows, WooCommerce compatibility, and promotional architecture.",
    templates: 21,
    icon: "ShoppingBag",
    tags: ["Product Pages", "Cart", "Checkout", "WooCommerce"],
    color: "#34D399",
  },
  {
    id: "real-estate",
    label: "Real Estate",
    description:
      "Property listing engines, agent profiles, inquiry flows, and location mapping for modern real estate brands.",
    templates: 11,
    icon: "MapPin",
    tags: ["Listings", "Inquiry", "Agent Profiles", "Maps"],
    color: "#F59E0B",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    description:
      "HIPAA-conscious clinic websites. Appointment booking, service pages, and provider profiles done right.",
    templates: 9,
    icon: "Heart",
    tags: ["Booking", "Providers", "Services", "Consultation"],
    color: "#EC4899",
  },
  {
    id: "education",
    label: "Education",
    description:
      "LMS-ready templates for schools, academies, and learning platforms. Course layouts and student onboarding.",
    templates: 8,
    icon: "GraduationCap",
    tags: ["Courses", "Instructors", "LMS", "Onboarding"],
    color: "#A78BFA",
  },
  {
    id: "landing",
    label: "Landing Pages",
    description:
      "High-conversion single-page experiences. Lead capture, campaign launches, WhatsApp integrations, and CTA-focused layouts.",
    templates: 32,
    icon: "Zap",
    tags: ["Lead Capture", "Campaigns", "WhatsApp", "Events"],
    color: "#FB923C",
  },
];


// ── Ecosystem / Website Types ────────────────────────────────
export const ECOSYSTEM_TYPES = [
  {
    id: "wordpress",
    label: "Traditional WordPress",
    subtitle: "Plugin-powered sync",
    description:
      "Connect your existing WordPress website through our secure connector plugin. Zero migration required — Marvéo wraps around your existing infrastructure.",
    features: ["Secure plugin connection", "Token-based auth", "Live sync", "No migration needed"],
    icon: "Globe",
    forWho: "Existing WordPress businesses",
  },
  {
    id: "headless",
    label: "Headless WordPress + Next.js",
    subtitle: "Decoupled architecture",
    description:
      "Connect your headless frontend and WordPress backend into a unified Marvéo management workspace. Full editorial control without config hell.",
    features: ["Frontend + backend sync", "REST / GraphQL support", "ISR management", "Deployment orchestration"],
    icon: "Layers",
    forWho: "Developers and technical teams",
  },
  {
    id: "nextjs",
    label: "Full Next.js Ecosystems",
    subtitle: "API-first integration",
    description:
      "Integrate your custom Next.js deployment with Marvéo via clean API contracts. Manage deployments, environments, and content from one place.",
    features: ["API-first integration", "Vercel-native", "Environment management", "Deployment tracking"],
    icon: "Code2",
    forWho: "Engineering-led teams",
  },
  {
    id: "multi",
    label: "Multi-Business Deployments",
    subtitle: "Enterprise orchestration",
    description:
      "Run dozens of client websites from a single Marvéo workspace. Template provisioning, deployment monitoring, and client management at scale.",
    features: ["Multi-client workspace", "Template provisioning", "Centralised monitoring", "Rollback management"],
    icon: "Network",
    forWho: "Agencies and enterprise operators",
  },
];


// ── Templates ────────────────────────────────────────────────
export const TEMPLATE_PREVIEWS = [
  { id: 1,  name: "Nexus Corporate",    sector: "Corporate",     tags: ["Business", "Agency"],     featured: true  },
  { id: 2,  name: "Cartify Pro",        sector: "Ecommerce",     tags: ["Retail", "Fashion"],      featured: true  },
  { id: 3,  name: "EstateView",         sector: "Real Estate",   tags: ["Property", "Listings"],   featured: false },
  { id: 4,  name: "MedFlow Clinic",     sector: "Healthcare",    tags: ["Clinic", "Booking"],      featured: false },
  { id: 5,  name: "AcademiX",           sector: "Education",     tags: ["LMS", "Courses"],         featured: true  },
  { id: 6,  name: "LaunchBlitz",        sector: "Landing Pages", tags: ["Campaign", "Lead Gen"],   featured: true  },
  { id: 7,  name: "AgencyOne",          sector: "Corporate",     tags: ["Agency", "Portfolio"],    featured: false },
  { id: 8,  name: "Prestige",           sector: "Corporate",     tags: ["Consulting", "B2B"],      featured: true  },
  { id: 9,  name: "ShopNova",           sector: "Ecommerce",     tags: ["Fashion", "Shopify"],     featured: false },
  { id: 10, name: "PropElite",          sector: "Real Estate",   tags: ["Luxury", "Listings"],     featured: true  },
  { id: 11, name: "HealthFirst",        sector: "Healthcare",    tags: ["Clinic", "HIPAA"],        featured: false },
  { id: 12, name: "EduSpark",           sector: "Education",     tags: ["Academy", "Online"],      featured: false },
  { id: 13, name: "BlitzPage",          sector: "Landing Pages", tags: ["Ads", "Conversion"],      featured: true  },
  { id: 14, name: "StoreFront Pro",     sector: "Ecommerce",     tags: ["Retail", "WooCommerce"],  featured: false },
  { id: 15, name: "ClinicPlus",         sector: "Healthcare",    tags: ["Hospital", "Booking"],    featured: false },
];


// ── Why Marvéo features ──────────────────────────────────────
export const WHY_FEATURES = [
  { icon: "Shield",    label: "Security First",       description: "Token-based validation and passwordless architecture. No credentials stored." },
  { icon: "Zap",       label: "Instant Deployments",  description: "Go from setup to live in minutes, not days. Automated provisioning from day one." },
  { icon: "RefreshCw", label: "Fast Rollbacks",        description: "Independent deployment pipelines mean you can roll back any environment without touching others." },
  { icon: "Layers",    label: "Modular by Design",    description: "Every component is reusable and CMS-ready. Build once, deploy anywhere." },
  { icon: "BarChart2", label: "Centralized Ops",      description: "One workspace for all clients, all environments, all deployments. No fragmentation." },
  { icon: "Globe",     label: "Multi-platform",       description: "WordPress, Headless, Next.js, or custom stacks. Marvéo meets your infrastructure where it is." },
];


// ── Deployment / Onboarding Steps ────────────────────────────
export const DEPLOYMENT_STEPS = [
  {
    step: "01",
    title: "New Website Users",
    description:
      "No existing website? Choose a sector template, configure your workspace, and Marvéo deploys a production-grade site in minutes.",
    cta: "Browse Templates",
    icon: "PlusCircle",
  },
  {
    step: "02",
    title: "Existing WordPress Users",
    description:
      "Install the Marvéo connector plugin. One token. One click. Your WordPress site is instantly manageable from the Marvéo dashboard.",
    cta: "Connect WordPress",
    icon: "PlugZap",
  },
  {
    step: "03",
    title: "Headless WordPress Users",
    description:
      "Connect your Next.js frontend and WordPress backend. Marvéo unifies them into a single editorial and deployment workspace.",
    cta: "Setup Headless",
    icon: "Layers",
  },
  {
    step: "04",
    title: "Custom Stack Users",
    description:
      "Using a bespoke backend? Connect via Marvéo's clean API. Manage deployments, track environments, and control releases centrally.",
    cta: "View API Docs",
    icon: "Code2",
  },
];


// ── Sector Pain Points ───────────────────────────────────────
// Edit per-sector pain points here. Shown on /solutions/[sector]
export const SECTOR_PAIN_POINTS: Record<string, string[]> = {
  corporate: [
    "Generic templates that look like every other business",
    "Expensive agency builds with long timelines",
    "No easy way to update content without a developer",
  ],
  ecommerce: [
    "WooCommerce setups that take weeks to configure",
    "Disconnected payment and product management",
    "Poor mobile performance hurting conversions",
  ],
  "real-estate": [
    "Property listings that look outdated",
    "Inquiry forms that don't convert",
    "No easy way to manage multiple agent profiles",
  ],
  healthcare: [
    "Clinic websites that feel impersonal and outdated",
    "No integrated appointment booking flow",
    "Compliance concerns with generic templates",
  ],
  education: [
    "LMS setups that are complex and expensive",
    "Poor student onboarding experiences",
    "Disconnected course and instructor management",
  ],
  landing: [
    "Low-converting pages built by non-specialists",
    "Slow load times killing ad campaign ROI",
    "No WhatsApp or lead capture integrations",
  ],
};


// ── Sector Solutions ─────────────────────────────────────────
// Edit per-sector Marvéo solutions here. Shown on /solutions/[sector]
export const SECTOR_SOLUTIONS: Record<string, string[]> = {
  corporate: [
    "Deploy a polished corporate site in under an hour",
    "Full blog and content management through Marvéo",
    "Easy updates without touching code",
  ],
  ecommerce: [
    "WooCommerce-ready templates with pre-built product flows",
    "Centralised inventory, checkout and order management",
    "Conversion-optimised layouts built on real data",
  ],
  "real-estate": [
    "Dynamic property listing engine with filters",
    "Agent profile management from your dashboard",
    "Inquiry routing and CRM-ready contact forms",
  ],
  healthcare: [
    "Appointment booking flows built-in from day one",
    "Provider profiles and service page templates",
    "HIPAA-conscious architecture and data handling",
  ],
  education: [
    "LMS-ready templates with course and module layouts",
    "Student onboarding flows and instructor pages",
    "Integration-ready for Teachable, LearnDash, and more",
  ],
  landing: [
    "High-conversion single-page layouts by specialists",
    "WhatsApp chat, lead forms, and booking integrations",
    "Lightning-fast load times optimised for paid ads",
  ],
};


// ── Pricing Plans ────────────────────────────────────────────
// Edit plan names, prices, and features here.
// Shown on /pricing
export const PRICING_PLANS = [
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
    badge: null,
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
    badge: null,
  },
];


// ── Changelog Entries ────────────────────────────────────────
// Add new releases here. Shown on /changelog
export const CHANGELOG_ENTRIES = [
  {
    version: "v1.0.0",
    date: "May 2026",
    tag: "Launch",
    changes: [
      "Initial Marvéo platform launch",
      "WordPress Connector Plugin v1.0",
      "Corporate, Ecommerce, Real Estate templates",
      "Vercel deployment integration",
      "Token-based authentication system",
    ],
  },
  {
    version: "v0.9.0",
    date: "Apr 2026",
    tag: "Beta",
    changes: [
      "Private beta with select agencies",
      "Headless WordPress support added",
      "Template marketplace architecture",
      "GitHub sync integration",
    ],
  },
  {
    version: "v0.5.0",
    date: "Mar 2026",
    tag: "Alpha",
    changes: [
      "Core Engine scaffolded",
      "Initial plugin connection flow",
      "Dashboard UI foundation",
    ],
  },
];


// ── Career Roles ─────────────────────────────────────────────
// Add, edit, or remove open roles here. Shown on /careers
export const CAREER_ROLES = [
  { title: "Senior Frontend Engineer", team: "Engineering",    location: "Remote", type: "Full-time" },
  { title: "Full-Stack Engineer",      team: "Engineering",    location: "Remote", type: "Full-time" },
  { title: "Product Designer",         team: "Design",         location: "Remote", type: "Full-time" },
  { title: "DevOps Engineer",          team: "Infrastructure", location: "Remote", type: "Contract"  },
];


// ── Status Services ──────────────────────────────────────────
// Update statuses here when incidents occur. Shown on /status
export const STATUS_SERVICES = [
  { name: "Marvéo Dashboard",        status: "operational", uptime: "99.98%" },
  { name: "Deployment Engine",       status: "operational", uptime: "99.95%" },
  { name: "WordPress Connector API", status: "operational", uptime: "100%"   },
  { name: "Template CDN",            status: "operational", uptime: "100%"   },
  { name: "Authentication Service",  status: "operational", uptime: "99.99%" },
  { name: "Vercel Edge Network",     status: "operational", uptime: "100%"   },
];


// ── About Page Values ────────────────────────────────────────
// Edit company values here. Shown on /about
export const ABOUT_VALUES = [
  {
    icon: "Target",
    label: "Simplicity first",
    desc: "Every feature exists to remove complexity, not add it. Business owners should not need a developer to update their website.",
  },
  {
    icon: "Zap",
    label: "Speed is a feature",
    desc: "Fast deployment, fast performance, fast iteration. Speed compounds into competitive advantage.",
  },
  {
    icon: "Globe",
    label: "Built for scale",
    desc: "Whether you manage one site or one thousand, the architecture should hold without fragmentation.",
  },
];


// ── Product Layers ───────────────────────────────────────────
// Edit the four Marvéo platform layers here. Shown on /product
export const PRODUCT_LAYERS = [
  {
    icon: "Cpu",
    number: "01",
    name: "Marvéo Core Engine",
    owner: "Infrastructure layer",
    color: "#4F8EF7",
    description:
      "The central brain of the entire ecosystem. Handles deployment orchestration, dynamic provisioning, multi-client architecture, API integrations, and automation workflows.",
    features: [
      "Deployment orchestration",
      "Multi-client architecture",
      "Environment generation",
      "API layer & integrations",
      "Template provisioning system",
      "Licensing & token architecture",
    ],
  },
  {
    icon: "Monitor",
    number: "02",
    name: "Marvéo Client Portal",
    owner: "Frontend platform",
    color: "#34D399",
    description:
      "The modern, lightweight frontend that clients use to manage their websites. Onboarding, workspace setup, content management, media handling, and launch controls.",
    features: [
      "Client onboarding flow",
      "Workspace setup",
      "Plugin connection flow",
      "Content management",
      "Media handling",
      "Launch controls",
    ],
  },
  {
    icon: "Settings",
    number: "03",
    name: "Owner / Admin Backend",
    owner: "Operations portal",
    color: "#F59E0B",
    description:
      "The internal command centre for managing all client deployments, subscriptions, templates, and platform-wide settings at scale.",
    features: [
      "Client management system",
      "Deployment monitoring",
      "Template management",
      "Subscription & license management",
      "Activity logs",
      "API monitoring",
    ],
  },
  {
    icon: "LayoutTemplate",
    number: "04",
    name: "Template Ecosystem",
    owner: "Design layer",
    color: "#A78BFA",
    description:
      "Sector-optimised templates built for real business use cases. Corporate, Ecommerce, Real Estate, Healthcare, Education, and Landing Pages — all deployment-ready.",
    features: [
      "Corporate templates",
      "Ecommerce templates",
      "Real Estate templates",
      "Healthcare templates",
      "Education templates",
      "Landing page templates",
    ],
  },
];


// ── Docs Sections ────────────────────────────────────────────
// Edit documentation categories here. Shown on /docs
export const DOC_SECTIONS = [
  {
    icon: "BookOpen",
    title: "Getting Started",
    desc: "Set up your first workspace, connect your site, and deploy in under 10 minutes.",
    href: "/docs/getting-started",
    label: "New to Marvéo",
  },
  {
    icon: "PlugZap",
    title: "Connector Plugin",
    desc: "Install and configure the WordPress connector plugin. Token setup, GitHub sync, and validation.",
    href: "/docs/plugin",
    label: "WordPress users",
  },
  {
    icon: "Code2",
    title: "API Reference",
    desc: "Full REST API documentation. Authentication, endpoints, webhooks, and code examples.",
    href: "/docs/api",
    label: "Developers",
  },
];


// ── Contact Options ──────────────────────────────────────────
// Edit contact card options here. Shown on /contact
export const CONTACT_OPTIONS = [
  {
    icon: "Calendar",
    label: "Book a Demo",
    desc: "30-minute walkthrough of the Marvéo platform tailored to your use case.",
    action: "Schedule →",
  },
  {
    icon: "MessageSquare",
    label: "General Enquiry",
    desc: "Ask us anything about pricing, integrations, or deployment.",
    action: "Chat →",
  },
  {
    icon: "Mail",
    label: "Email Us",
    desc: "hello@marveo.co — we reply within one business day.",
    action: "Email →",
  },
];
EOF
log "constants/index.ts written — all content centralised"

# ══════════════════════════════════════════════════════════
# 3. UPDATE ALL PAGES to import from constants
# ══════════════════════════════════════════════════════════
head "Updating /pricing"

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
import { PRICING_PLANS } from "@/constants";
import { cn } from "@/lib/utils";

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
          <div className="flex items-center gap-0 p-1.5 bg-bg-card border border-white/8 rounded-xl">
            <button
              onClick={() => setAnnual(false)}
              className={cn("px-5 py-2 rounded-lg text-sm font-medium transition-all",
                !annual ? "bg-accent text-white" : "text-text-muted hover:text-text-secondary")}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn("px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                annual ? "bg-accent text-white" : "text-text-muted hover:text-text-secondary")}
            >
              Annual
              <span className="text-[10px] px-1.5 py-0.5 bg-success/20 text-success rounded-md font-mono">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans — pulled from constants/index.ts */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {PRICING_PLANS.map((plan, i) => (
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
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-semibold rounded-full whitespace-nowrap">
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

          <div className="text-center">
            <p className="text-text-muted text-sm mb-4">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-bright transition-colors">
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
log "/pricing updated"

head "Updating /solutions/[sector]"

cat > "src/app/solutions/[sector]/page.tsx" << 'EOF'
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Building2, ShoppingBag, MapPin, Heart, GraduationCap, Zap } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { GlowOrb } from "@/components/shared/GlowOrb";
import {
  SECTORS,
  TEMPLATE_PREVIEWS,
  SECTOR_PAIN_POINTS,
  SECTOR_SOLUTIONS,
} from "@/constants";
import type { Metadata } from "next";

const ICONS: Record<string, React.ElementType> = {
  Building2, ShoppingBag, MapPin, Heart, GraduationCap, Zap,
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

  const Icon      = ICONS[sectorData.icon];
  const templates = TEMPLATE_PREVIEWS.filter((t) => t.sector === sectorData.label);
  const pains     = SECTOR_PAIN_POINTS[sector]   ?? [];
  const solutions = SECTOR_SOLUTIONS[sector]     ?? [];

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label={sectorData.label}
          title={<>{sectorData.label} websites<br /><span className="text-gradient">built to convert.</span></>}
          description={sectorData.description}
        />

        <section className="max-w-7xl mx-auto px-6 py-16">
          {/* Pain vs Solution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
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
                <span key={tag} className="px-4 py-2 rounded-xl text-sm font-medium border"
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
                    <Link href="/templates"
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
log "/solutions/[sector] updated"

head "Updating /changelog"

cat > src/app/changelog/page.tsx << 'EOF'
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
EOF
log "/changelog updated"

head "Updating /careers"

cat > src/app/careers/page.tsx << 'EOF'
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { CAREER_ROLES } from "@/constants";

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
            {CAREER_ROLES.map((role) => (
              <div key={role.title}
                className="card-surface card-surface-hover rounded-2xl p-5 flex items-center justify-between group">
                <div>
                  <div className="font-display font-600 text-text-primary mb-1">{role.title}</div>
                  <div className="flex items-center gap-3 text-xs text-text-muted flex-wrap">
                    <span>{role.team}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{role.location}
                    </span>
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
            <p className="text-text-secondary text-sm mb-4">
              Don&apos;t see a role that fits? We&apos;re always interested in exceptional people.
            </p>
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
log "/careers updated"

head "Updating /status"

cat > src/app/status/page.tsx << 'EOF'
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
EOF
log "/status updated"

head "Updating /about"

cat > src/app/about/page.tsx << 'EOF'
import Link from "next/link";
import { ArrowRight, Target, Zap, Globe } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { ABOUT_VALUES } from "@/constants";
import { siteConfig } from "@/config/site";

const ICONS: Record<string, React.ElementType> = { Target, Zap, Globe };

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

        <section className="max-w-4xl mx-auto px-6 py-16">
          {/* Mission quote */}
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
          <div className="mb-20">
            <h2 className="font-display text-3xl font-700 text-text-primary mb-6">The story</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed text-sm">
              <p>
                Marvéo started as a product line within{" "}
                <a href={siteConfig.links.avario} target="_blank" rel="noopener noreferrer"
                  className="text-accent hover:text-accent-bright transition-colors">
                  Avario Digitals
                </a>{" "}
                — a digital agency that spent years building websites for businesses across multiple sectors.
              </p>
              <p>
                We saw the same problem repeating: businesses would pay significant sums to have websites built, then struggle to manage them without calling a developer every time something needed updating. WordPress helped, but its admin interface was designed for publishers, not operators.
              </p>
              <p>
                Marvéo is our answer. A clean, modern operating system for website deployment and management that meets businesses where they are — whether they&apos;re running traditional WordPress, a headless architecture, or a full custom Next.js stack.
              </p>
            </div>
          </div>

          {/* Values — from constants */}
          <div className="mb-20">
            <h2 className="font-display text-3xl font-700 text-text-primary mb-10">What we believe</h2>
            <div className="space-y-5">
              {ABOUT_VALUES.map((v) => {
                const Icon = ICONS[v.icon];
                return (
                  <div key={v.label} className="card-surface card-surface-hover rounded-2xl p-6 flex items-start gap-5">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center shrink-0">
                      {Icon && <Icon className="w-5 h-5 text-accent" />}
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
            <h2 className="font-display text-3xl font-700 text-text-primary mb-4">
              Ready to see it in action?
            </h2>
            <p className="text-text-secondary mb-8">
              Book a demo and we&apos;ll walk you through what Marvéo can do for your business.
            </p>
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
log "/about updated"

head "Updating /product"

cat > src/app/product/page.tsx << 'EOF'
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
EOF
log "/product updated"

head "Updating /docs"

cat > src/app/docs/page.tsx << 'EOF'
import Link from "next/link";
import { BookOpen, Code2, PlugZap, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { DOC_SECTIONS } from "@/constants";

const ICONS: Record<string, React.ElementType> = { BookOpen, Code2, PlugZap };

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
              const Icon = ICONS[s.icon];
              return (
                <Link key={s.title} href={s.href}
                  className="card-surface card-surface-hover rounded-2xl p-6 group block">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors">
                    {Icon && <Icon className="w-5 h-5 text-accent" />}
                  </div>
                  <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-2">{s.label}</div>
                  <h3 className="font-display font-700 text-text-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{s.desc}</p>
                  <span className="flex items-center gap-1.5 text-xs text-accent font-medium">
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
log "/docs updated"

head "Updating /contact"

cat > src/app/contact/page.tsx << 'EOF'
"use client";

import { useState } from "react";
import { Send, Calendar, MessageSquare, Mail } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { CONTACT_OPTIONS } from "@/constants";

const ICONS: Record<string, React.ElementType> = { Calendar, MessageSquare, Mail };

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", type: "demo", message: "" });

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
            {/* Contact options — from constants */}
            <div className="space-y-4">
              {CONTACT_OPTIONS.map((item) => {
                const Icon = ICONS[item.icon];
                return (
                  <div key={item.label} className="card-surface card-surface-hover rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center">
                        {Icon && <Icon className="w-4 h-4 text-accent" />}
                      </div>
                      <span className="font-display font-600 text-text-primary text-sm">{item.label}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed mb-3">{item.desc}</p>
                    <span className="text-xs font-medium text-accent">{item.action}</span>
                  </div>
                );
              })}
            </div>

            {/* Form */}
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
                        { key: "name",    label: "Full Name",     type: "text",  placeholder: "Your name",       span: false },
                        { key: "email",   label: "Email Address", type: "email", placeholder: "you@company.com", span: false },
                        { key: "company", label: "Company",       type: "text",  placeholder: "Company name",    span: true  },
                      ].map((field) => (
                        <div key={field.key} className={field.span ? "sm:col-span-2" : ""}>
                          <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                            {field.label}
                          </label>
                          <input type={field.type} placeholder={field.placeholder}
                            value={form[field.key as keyof typeof form]}
                            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                            className="w-full px-4 py-3 bg-bg-card border border-white/8 rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 font-body transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">I want to</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["demo", "question", "pricing", "partnership"].map((t) => (
                          <button key={t} onClick={() => setForm({ ...form, type: t })}
                            className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all capitalize ${
                              form.type === t
                                ? "bg-accent/15 text-accent border-accent/25"
                                : "bg-white/3 text-text-muted border-white/7 hover:text-text-secondary"
                            }`}>
                            {t === "demo" ? "Book a demo" : t === "question" ? "Ask something" : t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Message</label>
                      <textarea rows={4} placeholder="Tell us about your project..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 bg-bg-card border border-white/8 rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 font-body resize-none transition-colors"
                      />
                    </div>
                    <button onClick={() => setSent(true)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-bright text-white font-semibold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(79,142,247,0.3)]">
                      <Send className="w-4 h-4" /> Send Message
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
log "/contact updated"

# ══════════════════════════════════════════════════════════
# GIT COMMIT
# ══════════════════════════════════════════════════════════
head "Committing Everything"
git add -A
git commit -m "fix: restore site.ts nav + centralise all content in constants — no more hardcoded page content" -q
log "Committed"

echo ""
echo -e "${BOLD}${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${GREEN}  Done. All content now lives in constants ✓${NC}"
echo -e "${BOLD}${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "One file to edit for ALL content:"
echo "  src/constants/index.ts"
echo ""
echo "One file to edit for site config / URLs:"
echo "  src/config/site.ts"
echo ""
echo "Restart dev server: npm run dev"
echo ""
