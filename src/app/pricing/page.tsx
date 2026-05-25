"use client";

import { Suspense, useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { cn } from "@/lib/utils";

type GeoRegion = "nigeria" | "global";
type BillingInterval = "MONTHLY" | "ANNUAL";
type PaymentProvider = "PAYSTACK" | "STRIPE";

type IntervalPrice = {
  amount: number;
  setupFee: number;
};

type PricingPlan = {
  id: string;
  name: string;
  pricing: {
    monthly: IntervalPrice;
    annual: IntervalPrice;
    currency: string;
    annualDiscountPercent?: number;
  };
  description: string;
  features: string[];
  cta: string;
  recommendedFor: string;
  badges: string[];
  href: string;
  paymentProvider?: PaymentProvider;
  trialAvailable?: boolean;
  trialDurationDays?: number;
  featured?: boolean;
};

type PlanApiResponse = {
  country: string;
  currency: string;
  plans: Array<{
    planId: string;
    name: string;
    description: string;
    paymentProvider: PaymentProvider;
    pricing: {
      country: string;
      currency: string;
      monthly: IntervalPrice;
      annual: IntervalPrice;
      annualDiscountPercent?: number;
    };
    trial: {
      available: boolean;
      durationDays: number;
    };
    workspaceLimits: {
      maxWorkspaces: number;
    };
    featureEntitlements: string[];
  }>;
};

type CheckoutForm = {
  email: string;
  name: string;
  phone: string;
  company: string;
  selectedTemplateId: string;
  paymentMode: "TRIAL" | "PAID";
  paymentReference: string;
};

type RecoveryLookup = {
  email: string;
  sessionId: string;
  paymentReference: string;
};

type RecoveryResponse = {
  ok: true;
  sessionId: string;
  redirectUrl: string;
  subscriptionStatus: "TRIAL" | "TRIAL_EXPIRED" | "EXPIRED" | "ACTIVE" | "PAST_DUE" | "CANCELLED";
  billingInterval: BillingInterval;
  intendedBillingInterval: BillingInterval;
  paymentVerificationStatus?: string;
  recoveryStatus: "RECOVERED" | "REFRESHED";
};

type UpgradePreparationResponse = {
  ok: true;
  subscriptionId: string;
  organizationId: string;
  selectedPlanId: string;
  billingInterval: BillingInterval;
  intendedBillingInterval: BillingInterval;
  provider: PaymentProvider;
  currency: string;
  amount: number;
  paymentVerificationStatus: string;
  redirectUrl: string;
  requiresPaymentVerification: boolean;
};

type PaymentVerificationResponse = {
  ok: true;
  redirectUrl: string;
  error?: string;
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
  // Fallback-only pricing. The UI should prefer backend values from /api/commercial/plans.
  {
    id: "starter",
    name: "Starter Workspace",
    pricing: {
      currency: "NGN",
      monthly: { amount: 25000, setupFee: 0 },
      annual: { amount: 250000, setupFee: 0 },
      annualDiscountPercent: 17,
    },
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
    href: "#checkout",
    paymentProvider: "PAYSTACK",
    trialAvailable: true,
    trialDurationDays: 14,
  },
  {
    id: "growth",
    name: "Growth Operations",
    pricing: {
      currency: "NGN",
      monthly: { amount: 85000, setupFee: 0 },
      annual: { amount: 850000, setupFee: 0 },
      annualDiscountPercent: 17,
    },
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
    href: "#checkout",
    paymentProvider: "PAYSTACK",
    trialAvailable: true,
    trialDurationDays: 14,
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Infrastructure",
    pricing: {
      currency: "USD",
      monthly: { amount: 0, setupFee: 0 },
      annual: { amount: 0, setupFee: 0 },
    },
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
    paymentProvider: "STRIPE",
    trialAvailable: false,
    trialDurationDays: 0,
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

const DEFAULT_CHECKOUT_FORM: CheckoutForm = {
  email: "",
  name: "",
  phone: "",
  company: "",
  selectedTemplateId: "",
  paymentMode: "TRIAL",
  paymentReference: "",
};

const DEFAULT_RECOVERY_LOOKUP: RecoveryLookup = {
  email: "",
  sessionId: "",
  paymentReference: "",
};

function formatBackendPrice(currency: string, amount: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

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

function PricingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
  const [plans, setPlans] = useState<PricingPlan[]>(PRICING_PLANS);
  const [plansSource, setPlansSource] = useState<"backend" | "fallback">("fallback");
  const [billingInterval, setBillingInterval] = useState<BillingInterval>("MONTHLY");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("starter");
  const [checkout, setCheckout] = useState<CheckoutForm>(DEFAULT_CHECKOUT_FORM);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string>("");
  const [plansError, setPlansError] = useState<string>("");
  const [recoveryLookup, setRecoveryLookup] = useState<RecoveryLookup>(DEFAULT_RECOVERY_LOOKUP);
  const [recoveryBusy, setRecoveryBusy] = useState(false);
  const [upgradeBusy, setUpgradeBusy] = useState(false);
  const [recoveryError, setRecoveryError] = useState<string>("");
  const [recoveryResult, setRecoveryResult] = useState<RecoveryResponse | null>(null);
  const estimate = calculateCostRange(region, answers);
  const countryCode = region === "nigeria" ? "NG" : "US";

  useEffect(() => {
    let mounted = true;

    async function loadPlans() {
      try {
        setPlansError("");
        // Backend pricing is the commercial source of truth. Static pricing below is fallback-only.
        const response = await fetch(`/api/commercial/plans?country=${countryCode}`, { cache: "no-store" });
        if (!response.ok) throw new Error("Could not load live plan data");

        const payload = (await response.json()) as PlanApiResponse;
        if (!payload?.plans?.length) throw new Error("No plans returned");

        const mapped: PricingPlan[] = payload.plans.map((plan) => {
          return {
            id: plan.planId,
            name: plan.name,
            pricing: {
              currency: plan.pricing.currency,
              monthly: plan.pricing.monthly,
              annual: plan.pricing.annual,
              annualDiscountPercent: plan.pricing.annualDiscountPercent,
            },
            description: plan.description,
            features: plan.featureEntitlements,
            cta: plan.trial.available ? `Start ${plan.trial.durationDays}-day trial` : "Start paid onboarding",
            recommendedFor: `${plan.workspaceLimits.maxWorkspaces === 999 ? "Unlimited" : plan.workspaceLimits.maxWorkspaces} workspace${plan.workspaceLimits.maxWorkspaces === 1 ? "" : "s"}`,
            badges: [plan.trial.available ? "Trial available" : "Paid onboarding"],
            href: "#checkout",
            paymentProvider: plan.paymentProvider,
            trialAvailable: plan.trial.available,
            trialDurationDays: plan.trial.durationDays,
            featured: plan.planId === "growth",
          };
        });

        if (!mounted) return;
        setPlans(mapped);
        setPlansSource("backend");
      } catch {
        if (!mounted) return;
        setPlans(PRICING_PLANS);
        setPlansSource("fallback");
        setPlansError("Live pricing is temporarily unavailable. Showing fallback pricing.");
      }
    }

    void loadPlans();

    return () => {
      mounted = false;
    };
  }, [countryCode]);

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId) ?? plans[0];
  const selectedTemplateIdFromQuery = String(searchParams.get("selectedTemplateId") || "").trim();
  const effectiveSelectedTemplateId = checkout.selectedTemplateId || selectedTemplateIdFromQuery;
  const recoveredCanResume = recoveryResult?.subscriptionStatus === "TRIAL" || recoveryResult?.subscriptionStatus === "ACTIVE";
  const recoveredNeedsPayment = Boolean(
    recoveryResult && (
      recoveryResult.subscriptionStatus === "TRIAL_EXPIRED"
      || recoveryResult.subscriptionStatus === "EXPIRED"
      || recoveryResult.subscriptionStatus === "PAST_DUE"
      || recoveryResult.paymentVerificationStatus === "PENDING"
    )
  );

  function continueToRedirect(redirectUrl: string) {
    const resolvedRedirectUrl = new URL(redirectUrl, window.location.origin);
    if (resolvedRedirectUrl.origin === window.location.origin) {
      router.push(`${resolvedRedirectUrl.pathname}${resolvedRedirectUrl.search}${resolvedRedirectUrl.hash}`);
      return;
    }

    window.open(resolvedRedirectUrl.toString(), "_self", "noopener,noreferrer");
  }

  async function verifyPaymentAndResolveRedirect(payload: {
    provider: PaymentProvider;
    paymentReference: string;
    selectedPlanId?: string;
    billingInterval?: BillingInterval;
    organizationId?: string;
    customerEmail?: string;
    country?: string;
    currency?: string;
    amount?: number;
  }) {
    const verifyResponse = await fetch("/api/commercial/payment/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const verifyPayload = await verifyResponse.json().catch(() => null) as PaymentVerificationResponse | null;
    if (!verifyResponse.ok || !verifyPayload?.redirectUrl) {
      throw new Error(verifyPayload?.error || "Payment verification failed");
    }

    return verifyPayload.redirectUrl;
  }

  async function recoverExistingOnboarding() {
    if (!recoveryLookup.email.trim() && !recoveryLookup.sessionId.trim()) {
      setRecoveryError("Enter your work email or onboarding session ID.");
      return;
    }

    try {
      setRecoveryBusy(true);
      setRecoveryError("");

      const params = new URLSearchParams();
      if (recoveryLookup.email.trim()) params.set("email", recoveryLookup.email.trim());
      if (recoveryLookup.sessionId.trim()) params.set("sessionId", recoveryLookup.sessionId.trim());

      const response = await fetch(`/api/commercial/onboarding/session?${params.toString()}`, {
        method: "GET",
        cache: "no-store",
      });

      const payload = await response.json().catch(() => null) as (RecoveryResponse & { error?: string }) | null;
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error || "Unable to recover onboarding session.");
      }

      setRecoveryResult(payload);
      setBillingInterval(payload.intendedBillingInterval || payload.billingInterval);
      if (recoveryLookup.email.trim()) {
        setCheckout((prev) => ({
          ...prev,
          email: prev.email || recoveryLookup.email.trim(),
          paymentMode: payload.subscriptionStatus === "TRIAL_EXPIRED" ? "PAID" : prev.paymentMode,
        }));
      }
    } catch (err) {
      setRecoveryResult(null);
      setRecoveryError(err instanceof Error ? err.message : "Unable to recover onboarding session.");
    } finally {
      setRecoveryBusy(false);
    }
  }

  async function prepareRecoveredUpgrade() {
    if (!recoveryResult) {
      setRecoveryError("Recover an onboarding session before upgrading.");
      return;
    }

    if (!recoveryLookup.paymentReference.trim()) {
      setRecoveryError("Payment reference is required to verify the upgrade.");
      return;
    }

    try {
      setUpgradeBusy(true);
      setRecoveryError("");

      const upgradeResponse = await fetch("/api/commercial/subscription/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: recoveryResult.sessionId,
          email: recoveryLookup.email.trim() || undefined,
          selectedPlanId: selectedPlan?.id,
          billingInterval,
          paymentReference: recoveryLookup.paymentReference.trim(),
        }),
      });

      const upgradePayload = await upgradeResponse.json().catch(() => null) as (UpgradePreparationResponse & { error?: string }) | null;
      if (!upgradeResponse.ok || !upgradePayload?.ok) {
        throw new Error(upgradePayload?.error || "Unable to prepare subscription upgrade.");
      }

      const redirectUrl = await verifyPaymentAndResolveRedirect({
        provider: upgradePayload.provider,
        paymentReference: recoveryLookup.paymentReference.trim(),
        selectedPlanId: upgradePayload.selectedPlanId,
        billingInterval: upgradePayload.billingInterval,
        organizationId: upgradePayload.organizationId,
        customerEmail: recoveryLookup.email.trim() || checkout.email.trim() || undefined,
        country: countryCode,
        currency: upgradePayload.currency,
        amount: upgradePayload.amount,
      });

      continueToRedirect(redirectUrl || upgradePayload.redirectUrl);
    } catch (err) {
      setRecoveryError(err instanceof Error ? err.message : "Unable to prepare or verify the upgrade.");
    } finally {
      setUpgradeBusy(false);
    }
  }

  async function startCommercialOnboarding() {
    if (!selectedPlan) {
      setCheckoutError("Please select a plan.");
      return;
    }

    if (!checkout.email.trim()) {
      setCheckoutError("Email is required to start onboarding.");
      return;
    }

    if (checkout.paymentMode === "PAID" && !checkout.paymentReference.trim()) {
      setCheckoutError("Payment reference is required for paid onboarding.");
      return;
    }

    try {
      setCheckoutBusy(true);
      setCheckoutError("");

      const response = await fetch("/api/commercial/onboarding/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedPlanId: selectedPlan.id,
          selectedTemplateId: effectiveSelectedTemplateId || undefined,
          country: countryCode,
          billingInterval,
          customer: {
            email: checkout.email,
            name: checkout.name,
            phone: checkout.phone,
            company: checkout.company,
          },
          paymentMode: checkout.paymentMode,
          paymentReference: checkout.paymentMode === "PAID" ? checkout.paymentReference : undefined,
          source: "marketing_website",
        }),
      });

      const payload = await response.json().catch(() => null) as {
        redirectUrl?: string;
        error?: string;
        organizationId?: string;
        paymentVerificationStatus?: string;
      } | null;
      if (!response.ok || !payload) {
        throw new Error(payload?.error || "Failed to start onboarding");
      }

      let redirectUrl = payload.redirectUrl;
      const verificationProvider = plansSource === "backend"
        ? (selectedPlan.paymentProvider || (countryCode === "NG" ? "PAYSTACK" : "STRIPE"))
        : (countryCode === "NG" ? "PAYSTACK" : "STRIPE");
      const verificationCurrency = plansSource === "backend" ? selectedPlan.pricing.currency : undefined;
      const verificationAmount = plansSource === "backend"
        ? (billingInterval === "ANNUAL" ? selectedPlan.pricing.annual.amount : selectedPlan.pricing.monthly.amount)
        : undefined;

      if (checkout.paymentMode === "PAID") {
        redirectUrl = await verifyPaymentAndResolveRedirect({
          provider: verificationProvider,
          paymentReference: checkout.paymentReference,
          selectedPlanId: selectedPlan.id,
          billingInterval,
          organizationId: payload.organizationId,
          customerEmail: checkout.email,
          country: countryCode,
          currency: verificationCurrency,
          amount: verificationAmount,
        });
      }

      if (!redirectUrl) {
        throw new Error("Onboarding redirect URL is missing");
      }

      continueToRedirect(redirectUrl);
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Unable to start onboarding right now.");
    } finally {
      setCheckoutBusy(false);
    }
  }

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
            <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
              {(["MONTHLY", "ANNUAL"] as BillingInterval[]).map((interval) => (
                <button
                  key={interval}
                  type="button"
                  onClick={() => setBillingInterval(interval)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    billingInterval === interval ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {interval === "MONTHLY" ? "Monthly" : "Annual"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 xl:gap-8 mb-16 items-stretch">
            {plans.map((plan, index) => {
              const isEnterpriseCustom = plan.id === "enterprise" && plan.pricing.monthly.amount === 0 && plan.pricing.annual.amount === 0;
              const activePrice = billingInterval === "ANNUAL" ? plan.pricing.annual : plan.pricing.monthly;
              const priceLabel = isEnterpriseCustom ? "Custom" : formatBackendPrice(plan.pricing.currency, activePrice.amount);
              const priceSuffix = isEnterpriseCustom ? "" : billingInterval === "ANNUAL" ? "/year" : "/month";

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
                      {priceSuffix && <span className="pb-1 text-sm text-text-muted">{priceSuffix}</span>}
                    </div>
                    {billingInterval === "ANNUAL" && plan.pricing.annualDiscountPercent ? (
                      <p className="mb-3 text-xs font-mono uppercase tracking-[0.14em] text-success">
                        Save {plan.pricing.annualDiscountPercent}% annually
                      </p>
                    ) : null}
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

                  <div className="relative mt-auto flex flex-col gap-2.5">
                    {plan.trialAvailable && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPlanId(plan.id);
                          setCheckout((prev) => ({ ...prev, paymentMode: "TRIAL" }));
                          const section = document.getElementById("checkout");
                          section?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className="flex items-center justify-center gap-2 rounded-xl bg-success/15 border border-success/30 px-5 py-3 text-sm font-semibold text-success hover:bg-success/25 transition-all"
                      >
                        <Sparkles className="h-4 w-4" />
                        Start {plan.trialDurationDays}-day free trial
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPlanId(plan.id);
                        setCheckout((prev) => ({ ...prev, paymentMode: plan.trialAvailable ? prev.paymentMode : "PAID" }));
                        const section = document.getElementById("checkout");
                        section?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all",
                        plan.featured
                          ? "bg-accent text-white shadow-[0_0_24px_rgba(79,142,247,0.32)] hover:bg-accent-bright"
                          : "bg-white/5 border border-white/10 text-text-secondary hover:text-text-primary hover:bg-white/9 hover:shadow-[0_16px_36px_-28px_rgba(79,142,247,0.45)]"
                      )}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {plansSource === "fallback" && (
            <p className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
              {plansError || "Showing fallback pricing while live pricing is unavailable."}
            </p>
          )}

          <section id="checkout" className="mb-12 rounded-[1.85rem] border border-white/10 bg-white/[0.03] p-5 md:p-7">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-text-muted mb-2">
                  Commercial Onboarding
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-800 tracking-tight text-text-primary">
                  Create account, start trial or payment, continue onboarding.
                </h2>
                <p className="mt-3 text-body text-text-secondary max-w-xl">
                  One Marvéo identity is used for pricing, billing, and MarvéoOS onboarding. No separate website-only account is created.
                </p>
                <div className="mt-5 rounded-xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-text-primary">
                  Selected plan: <span className="font-semibold">{selectedPlan?.name || "-"}</span> · <span className="font-semibold">{billingInterval === "ANNUAL" ? "Annual" : "Monthly"}</span>
                  {effectiveSelectedTemplateId ? (
                    <span> · Template: <span className="font-semibold">{effectiveSelectedTemplateId}</span></span>
                  ) : null}
                </div>
              </div>

              <div className="space-y-3">
                <input
                  value={checkout.email}
                  onChange={(e) => setCheckout((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="Work email"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-accent/40"
                />
                <input
                  value={checkout.name}
                  onChange={(e) => setCheckout((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Full name"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-accent/40"
                />
                <input
                  value={checkout.phone}
                  onChange={(e) => setCheckout((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="Phone"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-accent/40"
                />
                <input
                  value={checkout.company}
                  onChange={(e) => setCheckout((prev) => ({ ...prev, company: e.target.value }))}
                  placeholder="Company"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-accent/40"
                />
                <select
                  value={checkout.paymentMode}
                  onChange={(e) => setCheckout((prev) => ({ ...prev, paymentMode: e.target.value as "TRIAL" | "PAID" }))}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-accent/40"
                >
                  <option value="TRIAL">Start free trial</option>
                  <option value="PAID">Proceed with paid onboarding</option>
                </select>
                {checkout.paymentMode === "PAID" && (
                  <input
                    value={checkout.paymentReference}
                    onChange={(e) => setCheckout((prev) => ({ ...prev, paymentReference: e.target.value }))}
                    placeholder="Payment reference"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-accent/40"
                  />
                )}

                {checkoutError && <p className="text-sm text-red-300">{checkoutError}</p>}

                <button
                  type="button"
                  onClick={startCommercialOnboarding}
                  disabled={checkoutBusy}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-bright disabled:opacity-60"
                >
                  {checkoutBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                  {checkout.paymentMode === "TRIAL" ? "Start trial and continue" : "Continue after payment"}
                </button>

                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-text-muted mb-1.5">
                        Resume Existing Onboarding
                      </p>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        Recover a previous trial or paid onboarding by work email or session ID, then continue or upgrade from here.
                      </p>
                    </div>
                    {recoveryResult && (
                      <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-accent-bright">
                        {recoveryResult.recoveryStatus}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 space-y-3">
                    <input
                      value={recoveryLookup.email}
                      onChange={(e) => setRecoveryLookup((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="Recover with work email"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-accent/40"
                    />
                    <input
                      value={recoveryLookup.sessionId}
                      onChange={(e) => setRecoveryLookup((prev) => ({ ...prev, sessionId: e.target.value }))}
                      placeholder="Or paste onboarding session ID"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-accent/40"
                    />
                    <button
                      type="button"
                      onClick={recoverExistingOnboarding}
                      disabled={recoveryBusy}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-white/10 disabled:opacity-60"
                    >
                      {recoveryBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                      Recover existing onboarding
                    </button>
                  </div>

                  {recoveryResult && (
                    <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-text-secondary">
                      <p className="text-text-primary">
                        Status: <span className="font-semibold">{recoveryResult.subscriptionStatus.replaceAll("_", " ")}</span>
                      </p>
                      <p className="mt-1">
                        Billing interval: <span className="font-semibold">{recoveryResult.intendedBillingInterval === "ANNUAL" ? "Annual" : "Monthly"}</span>
                      </p>
                      {recoveredCanResume && (
                        <button
                          type="button"
                          onClick={() => continueToRedirect(recoveryResult.redirectUrl)}
                          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
                        >
                          <ArrowRight className="h-4 w-4" />
                          Continue recovered onboarding
                        </button>
                      )}

                      {recoveredNeedsPayment && (
                        <div className="mt-4 space-y-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
                          <p className="text-sm text-amber-100 leading-relaxed">
                            This onboarding needs a verified paid subscription before setup can continue. Keep your selected plan and interval above, then verify with your payment reference.
                          </p>
                          <input
                            value={recoveryLookup.paymentReference}
                            onChange={(e) => setRecoveryLookup((prev) => ({ ...prev, paymentReference: e.target.value }))}
                            placeholder="Payment reference for upgrade or outstanding payment"
                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-accent/40"
                          />
                          <button
                            type="button"
                            onClick={prepareRecoveredUpgrade}
                            disabled={upgradeBusy}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-bright disabled:opacity-60"
                          >
                            {upgradeBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                            Upgrade and continue onboarding
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {recoveryError && <p className="mt-3 text-sm text-red-300">{recoveryError}</p>}
                </div>
              </div>
            </div>
          </section>

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

export default function PricingPage() {
  return (
    <Suspense fallback={null}>
      <PricingPageContent />
    </Suspense>
  );
}