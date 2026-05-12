"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Building2, ShoppingBag, MapPin, Heart, GraduationCap, Zap, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { SECTORS } from "@/constants";

const ICONS: Record<string, React.ElementType> = {
  Building2, ShoppingBag, MapPin, Heart, GraduationCap, Zap,
};

export function SectorSolutions() {
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
            <SectionLabel>Sector Solutions</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-700 text-text-primary mb-5"
          >
            Built for your industry.
            <br />
            <span className="text-gradient">Ready to deploy.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="max-w-xl mx-auto text-text-secondary"
          >
            Every sector comes with battle-tested templates, CTA structures,
            and integrations optimised for real conversion.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTORS.map((sector, i) => {
            const Icon = ICONS[sector.icon];
            return (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.07 }}
                className="card-surface card-surface-hover group rounded-2xl p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${sector.color}15`, border: `1px solid ${sector.color}30` }}
                  >
                    {Icon && <Icon className="w-5 h-5" style={{ color: sector.color }} />}
                  </div>
                  <span className="text-xs font-mono text-text-muted">
                    {sector.templates} templates
                  </span>
                </div>

                <h3 className="font-display font-700 text-text-primary mb-2">{sector.label}</h3>
                <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-5">
                  {sector.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {sector.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-white/4 border border-white/7 rounded-lg text-text-muted font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/solutions/${sector.id}`}
                  className="flex items-center gap-1.5 text-sm font-medium transition-colors group/link"
                  style={{ color: sector.color }}
                >
                  View templates
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
