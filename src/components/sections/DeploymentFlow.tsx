"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PlusCircle, PlugZap, Layers, Code2, ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { DEPLOYMENT_STEPS } from "@/constants";
import Link from "next/link";

const ICONS: Record<string, React.ElementType> = { PlusCircle, PlugZap, Layers, Code2 };

export function DeploymentFlow() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} className="section-spacing relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-5"
          >
            <SectionLabel>Onboarding Flow</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-700 text-text-primary mb-5"
          >
            Every website type.
            <br />
            <span className="text-gradient">One seamless flow.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="max-w-xl mx-auto text-text-secondary"
          >
            Marvéo meets you where your infrastructure already is. Choose your
            path and get operational in minutes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEPLOYMENT_STEPS.map((step, i) => {
            const Icon = ICONS[step.icon];
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                className="relative card-surface card-surface-hover rounded-2xl p-6"
              >
                {/* Connector line */}
                {i < DEPLOYMENT_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-px bg-gradient-to-r from-accent/30 to-transparent z-10" />
                )}

                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono text-text-muted">{step.step}</span>
                  <div className="w-9 h-9 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center">
                    {Icon && <Icon className="w-4 h-4 text-accent" />}
                  </div>
                </div>

                <h3 className="font-display font-700 text-text-primary mb-3 text-sm leading-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-5">
                  {step.description}
                </p>
                <Link
                  href="#"
                  className="flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-bright transition-colors group/link"
                >
                  {step.cta}
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
