"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Zap, RefreshCw, Layers, BarChart2, Globe } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { WHY_FEATURES } from "@/constants";

const ICONS: Record<string, React.ElementType> = { Shield, Zap, RefreshCw, Layers, BarChart2, Globe };

export function WhyMarveo() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} className="section-spacing relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-5"
          >
            <SectionLabel>Why Marvéo</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-700 text-text-primary mb-5"
          >
            Built for scale.
            <br />
            <span className="text-gradient">Designed for operators.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="max-w-xl mx-auto text-text-secondary"
          >
            Everything in Marvéo is designed with one principle: operational
            simplicity at enterprise scale.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_FEATURES.map((feat, i) => {
            const Icon = ICONS[feat.icon];
            return (
              <motion.div
                key={feat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                className="card-surface card-surface-hover p-6 rounded-2xl group"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/8 border border-accent/12 flex items-center justify-center mb-5 group-hover:bg-accent/12 transition-colors">
                  {Icon && <Icon className="w-5 h-5 text-accent" />}
                </div>
                <h3 className="font-display font-700 text-text-primary mb-2">{feat.label}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
