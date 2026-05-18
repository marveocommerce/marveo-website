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
