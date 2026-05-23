"use client";

import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { cn } from "@/lib/utils";

type GeoRegion = "nigeria" | "global";

type PricingPlan = {
  id: string;
  name: string;
  price: Record<GeoRegion, string>;
  description: string;
  features: string[];
  cta: string;
  recommendedFor: string;
  badges: string[];
  href: string;
  featured?: boolean;
};

type ModuleCard = {
  title: string;
  description: string;
};

type EnvironmentType = "existing" | "new";
type StackType = "wordpress" | "headless" | "custom";
type ScopeType = "lean" | "standard" | "advanced";
type TeamType = "small" | "mid" | "large";

type CalculatorAnswers = {
  environment: EnvironmentType;
  stack: StackType;
  scope: ScopeType;
  team: TeamType;
};

const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Workspace",
    price: { nigeria: "₦25,000/month", global: "$49/month" },
    description: "For founders, creators, and growing businesses centralizing operational workflows.",
    features: [
      "1 operational workspace",
      "Website & infrastructure connection",
      "WordPress / headless connector",
      "Commerce management",
      "Lead capture support",
      "Basic operational analytics",
      "Deployment assistance",
      "Standard support",
    ],
    cta: "Launch Workspace",
    recommendedFor: "Small businesses, creators, beauty brands, startups",
    badges: ["Connected", "Operational"],
    href: "/setup/activate",
  },
  {
    id: "growth",
    name: "Growth Operations",
    price: { nigeria: "₦85,000/month", global: "$149/month" },
    description: "For businesses managing multiple workflows, teams, and operational systems.",
    features: [
      "5 operational workspaces",
      "Multi-site operations",
      "Deployment history",
      "Team permissions",
      "Advanced analytics",
      "GitHub sync",
      "Operational workflows",
      "Priority support",
      "Connected infrastructure modules",
    ],
    cta: "Scale Operations",
    recommendedFor: "Agencies, ecommerce brands, healthcare, real estate",
    badges: ["MOST POPULAR", "Infrastructure-ready"],
    href: "/setup/activate",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Infrastructure",
    price: { nigeria: "Custom", global: "Custom" },
    description: "For enterprise teams and agencies operating at scale across multiple operational environments.",
    features: [
      "Unlimited workspaces",
      "Deployment orchestration",
      "Dedicated infrastructure support",
      "SLA guarantees",
      "Custom integrations",
      "Audit logs",
      "Team access controls",
      "White-label options",
      "Enterprise onboarding",
    ],
    cta: "Talk to Enterprise",
    recommendedFor: "Agencies, enterprise commerce, multi-brand operations",
    badges: ["Enterprise-ready"],
    href: "/contact",
  },
];

const MODULES: ModuleCard[] = [
  {
    title: "Lead Management",
    description: "Capture, assign, track, and manage leads across operational workflows.",
  },
  {
    title: "Booking & Appointments",
    description: "Appointment scheduling, reminders, availability management, and operational coordination.",
  },
  {
    title: "Omnichannel Inbox",
    description: "Manage WhatsApp, Instagram, Telegram, TikTok, and Messenger conversations from one workspace.",
  },
  {
    title: "Invoicing & Billing",
    description: "Create invoices, track payments, generate receipts, and manage operational billing.",
  },
  {
    title: "Commerce Operations",
    description: "Products, orders, inventory, fulfillment, and operational visibility.",
  },
  {
    title: "Campaign & Ads Tracking",
    description: "Monitor campaigns, lead attribution, ROAS, and operational marketing performance.",
  },
  {
    title: "Client Portal",
    description: "Approvals, documents, communication, onboarding, and client collaboration.",
  },
  {
    title: "Tax & Reporting",
    description: "Operational tax records, exports, reports, and accounting support.",
  },
];

const SETUP_ITEMS = [
  "Existing website connection",
  "Guided onboarding",
  "Managed migration",
  "Operational setup assistance",
  "Infrastructure connection",
];

const DEFAULT_CALCULATOR: CalculatorAnswers = {
  environment: "existing",
  stack: "wordpress",
  scope: "standard",
  team: "small",
};

function formatMoney(region: GeoRegion, value: number) {
  const locale = region === "nigeria" ? "en-NG" : "en-US";
  const symbol = region === "nigeria" ? "₦" : "$";
  return `${symbol}${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value)}`;
}

function calculateCostRange(region: GeoRegion, answers: CalculatorAnswers) {
  const base =
    region === "nigeria"
      ? {
          starter: [260000, 720000],
          growth: [710000, 2100000],
        }
      : {
          starter: [420, 1180],
          growth: [1150, 3500],
        };

  let multiplier = 1;
  if (answers.environment === "new") multiplier += 0.18;
  if (answers.stack === "headless") multiplier += 0.1;
  if (answers.stack === "custom") multiplier += 0.18;
  if (answers.scope === "lean") multiplier -= 0.08;
  if (answers.scope === "advanced") multiplier += 0.2;
  if (answers.team === "mid") multiplier += 0.08;
  if (answers.team === "large") multiplier += 0.16;

  const starterMin = Math.round(base.starter[0] * multiplier);
  const starterMax = Math.round(base.starter[1] * multiplier);
  const growthMin = Math.round(base.growth[0] * multiplier);
  const growthMax = Math.round(base.growth[1] * multiplier);

  const notes = [
    answers.environment === "new"
      ? "New environment setup increases onboarding and infrastructure preparation effort."
      : "Existing environment lowers implementation overhead through direct operational connection.",
    answers.stack === "custom"
      ? "Custom stack integration adds additional deployment and validation work."
      : answers.stack === "headless"
        ? "Headless setup adds integration complexity across systems."
        : "WordPress-compatible stack keeps integration flow efficient.",
    answers.scope === "advanced"
      ? "Advanced operational scope includes deeper workflow and module activation work."
      : answers.scope === "lean"
        ? "Lean scope keeps launch configuration focused and faster."
        : "Standard scope balances launch depth and operational readiness.",
  ];

  return {
    starter: `${formatMoney(region, starterMin)} - ${formatMoney(region, starterMax)}`,
    growth: `${formatMoney(region, growthMin)} - ${formatMoney(region, growthMax)}`,
    notes,
  };
}

export default function PricingPage() {
  const detectedRegion = useSyncExternalStore<GeoRegion>(
    () => () => {},
    () => {
      const locale = typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "";
      const timeZone = typeof Intl !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase()
        : "";

      return locale.includes("ng") || timeZone.includes("lagos") || timeZone.includes("abuja")
        ? "nigeria"
        : "global";
    },
    () => "global"
  );
  const region = detectedRegion;
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [answers, setAnswers] = useState<CalculatorAnswers>(DEFAULT_CALCULATOR);
  const estimate = calculateCostRange(region, answers);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Operational Pricing"
          title={<>One platform.<br /><span className="text-gradient">Scaled to your operations.</span></>}
          description="Start with a connected operational workspace, then expand into commerce management, deployment systems, communication workflows, invoicing, lead operations, bookings, and infrastructure modules as your business grows."
        />

        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="max-w-3xl mx-auto text-center mb-7">
            <p className="text-sm text-text-secondary">
              Built for businesses operating across commerce, communication, infrastructure, and operational workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 xl:gap-8 mb-16 items-stretch">
            {PRICING_PLANS.map((plan, index) => {
              const priceLabel = plan.price[region];

              return (
                <motion.article
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "group relative flex h-full flex-col rounded-[1.85rem] border p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_24px_60px_-36px_rgba(79,142,247,0.38)]",
                    plan.featured
                      ? "bg-accent/10 border-accent/30 shadow-[0_0_45px_rgba(79,142,247,0.08)]"
                      : "bg-white/[0.02] border-white/10"
                  )}
                >
                  <div className="absolute inset-0 rounded-[1.85rem] bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative mb-5 flex flex-wrap items-center gap-2">
                    {plan.badges.map((badge) => (
                      <span
                        key={badge}
                        className={cn(
                          "text-[11px] font-mono uppercase tracking-[0.14em] px-2.5 py-1 rounded-lg border",
                          badge === "MOST POPULAR"
                            ? "bg-accent text-white border-accent/35"
                            : badge === "Enterprise-ready"
                              ? "bg-white/6 text-text-primary border-white/14"
                              : badge === "Infrastructure-ready"
                                ? "bg-accent/10 text-accent-bright border-accent/20"
                                : "bg-success/10 text-success border-success/20"
                        )}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="relative mb-6">
                    <div className="font-display font-700 text-text-primary text-xl mb-2">
                      {plan.name}
                    </div>
                    {plan.id !== "enterprise" && (
                      <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-muted mb-1.5">
                        Starting from
                      </p>
                    )}
                    <div className="mb-3 flex items-end gap-1.5">
                      <span className="font-display text-4xl font-800 text-text-primary">
                        {priceLabel}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      {plan.description}
                    </p>
                    <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-muted">
                      Recommended for
                    </div>
                    <p className="mt-1 text-sm text-text-primary/90 leading-relaxed">
                      {plan.recommendedFor}
                    </p>
                  </div>

                  <div className="relative space-y-2.5 flex-1 mb-7">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm text-text-secondary leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={plan.href}
                    className={cn(
                      "relative flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all mt-auto",
                      plan.featured
                        ? "bg-accent text-white shadow-[0_0_24px_rgba(79,142,247,0.32)] hover:bg-accent-bright"
                        : "bg-white/5 border border-white/10 text-text-secondary hover:text-text-primary hover:bg-white/9 hover:shadow-[0_16px_36px_-28px_rgba(79,142,247,0.45)]"
                    )}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </motion.article>
              );
            })}
          </div>

          <div className="mb-12 rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-text-muted mb-1.5">
                Pricing guide
              </p>
              <p className="text-sm text-text-secondary">
                Need a realistic implementation range? Use the calculator for a case-based estimate.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCalculatorOpen(true)}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-bright transition-colors"
            >
              Open Cost Range Calculator
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <section className="mb-14 rounded-[1.85rem] border border-white/10 bg-white/[0.025] p-5 md:p-7 backdrop-blur-sm">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.16em] text-accent-bright mb-4">
                  <Sparkles className="h-3.5 w-3.5" />
                  Optional Setup & Migration
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-800 tracking-tight text-text-primary">
                  Already have a website or operational setup?
                </h2>
                <p className="mt-3 text-body text-text-secondary max-w-xl">
                  Marvéo connects to existing WordPress, WooCommerce, and headless environments without forcing a rebuild.
                </p>
                <Link
                  href="/contact?intent=guided-onboarding"
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-bright transition-colors"
                >
                  Request Guided Setup
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="flex flex-wrap gap-2.5 lg:max-w-xl">
                {SETUP_ITEMS.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>

            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-text-muted mb-2">
                  Module Expansion
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-800 tracking-tight text-text-primary">
                  Expand your operations as you grow.
                </h2>
                <p className="mt-3 text-body text-text-secondary max-w-2xl">
                  Start with one workspace. Add operational modules based on your business needs.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {MODULES.map((module, index) => (
                <motion.article
                  key={module.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index }}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/25 hover:shadow-[0_18px_44px_-34px_rgba(79,142,247,0.35)]"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <span className="rounded-full border border-accent/18 bg-accent/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-accent-bright">
                      Optional Module
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-text-muted">
                      Activated separately
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-700 text-text-primary mb-2">{module.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5">
                    {module.description}
                  </p>
                  <div className="pt-4 border-t border-white/8">
                    <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-text-muted mb-1.5">
                      Available as operational expansion modules.
                    </p>
                    <p className="text-xs text-text-secondary">Can be added anytime.</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="rounded-[1.85rem] border border-white/10 bg-white/[0.02] p-5 md:p-7">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-text-muted mb-2">
                  Need custom onboarding?
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-800 tracking-tight text-text-primary">
                  Already have a website or operational setup?
                </h2>
                <p className="mt-3 text-body text-text-secondary max-w-2xl">
                  Marvéo connects to existing WordPress, WooCommerce, and headless environments without forcing a rebuild.
                </p>
                <Link
                  href="/contact?intent=guided-onboarding"
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-bright transition-colors"
                >
                  Request Guided Setup
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </section>
        </section>
      </main>
      <div className="opacity-80 saturate-90">
        <Footer />
      </div>

      <AnimatePresence>
        {calculatorOpen && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close calculator"
              className="absolute inset-0 bg-bg-primary/78 backdrop-blur-sm"
              onClick={() => setCalculatorOpen(false)}
            />

            <motion.div
              initial={{ y: 22, opacity: 0, scale: 0.985 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.985 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-4xl rounded-[1.6rem] border border-white/12 bg-bg-secondary/95 p-5 md:p-7"
            >
              <button
                type="button"
                onClick={() => setCalculatorOpen(false)}
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-muted hover:text-text-primary hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-text-muted mb-2">
                    Cost Range Calculator
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-800 tracking-tight text-text-primary mb-3">
                    Estimate your operational setup range
                  </h3>
                  <p className="text-sm text-text-secondary mb-6">
                    Choose your operational context and Marvéo will generate a realistic setup range in your regional pricing currency.
                  </p>

                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-muted">Environment</span>
                      <select
                        value={answers.environment}
                        onChange={(e) => setAnswers((prev) => ({ ...prev, environment: e.target.value as EnvironmentType }))}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-accent/40"
                      >
                        <option value="existing">Existing operational environment</option>
                        <option value="new">New operational environment</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-muted">Stack type</span>
                      <select
                        value={answers.stack}
                        onChange={(e) => setAnswers((prev) => ({ ...prev, stack: e.target.value as StackType }))}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-accent/40"
                      >
                        <option value="wordpress">WordPress / WooCommerce (Available)</option>
                        <option value="headless">Headless (Next.js / React) (Available)</option>
                        <option value="custom">Custom infrastructure (Available)</option>
                        <option value="" disabled>Magento (In progress)</option>
                        <option value="" disabled>Shopify (In progress)</option>
                        <option value="" disabled>OpenCart (In progress)</option>
                        <option value="" disabled>Wix (In progress)</option>
                        <option value="" disabled>BigCommerce (In progress)</option>
                        <option value="" disabled>Squarespace (In progress)</option>
                        <option value="" disabled>PrestaShop (In progress)</option>
                      </select>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block">
                        <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-muted">Scope</span>
                        <select
                          value={answers.scope}
                          onChange={(e) => setAnswers((prev) => ({ ...prev, scope: e.target.value as ScopeType }))}
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-accent/40"
                        >
                          <option value="lean">Lean</option>
                          <option value="standard">Standard</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </label>

                      <label className="block">
                        <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-muted">Team size</span>
                        <select
                          value={answers.team}
                          onChange={(e) => setAnswers((prev) => ({ ...prev, team: e.target.value as TeamType }))}
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-accent/40"
                        >
                          <option value="small">Small team</option>
                          <option value="mid">Mid-size team</option>
                          <option value="large">Large team</option>
                        </select>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
                  <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-muted mb-2">
                    Estimated implementation range
                  </p>
                  <div className="space-y-3 mb-5">
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                      <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-muted mb-1">Starter Workspace</p>
                      <p className="text-sm text-text-primary">{estimate.starter}</p>
                    </div>
                    <div className="rounded-xl border border-accent/20 bg-accent/[0.08] p-3.5">
                      <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-muted mb-1">Growth Operations</p>
                      <p className="text-sm text-text-primary">{estimate.growth}</p>
                    </div>
                  </div>

                  <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-muted mb-2">Breakdown rationale</p>
                  <div className="space-y-2.5">
                    {estimate.notes.map((line) => (
                      <div key={line} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                        <p className="text-sm text-text-secondary leading-relaxed">{line}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}