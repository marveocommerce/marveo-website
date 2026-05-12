"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Globe, Layers, Code2, Network, ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { ECOSYSTEM_TYPES } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ICONS: Record<string, React.ElementType> = { Globe, Layers, Code2, Network };

const CARD_COLORS = [
  "from-accent/10 to-transparent border-accent/15",
  "from-purple-500/10 to-transparent border-purple-500/15",
  "from-success/10 to-transparent border-success/15",
  "from-warning/10 to-transparent border-warning/15",
];

export function WebsiteTypes() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-spacing relative">
      {/* Divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-5"
          >
            <SectionLabel>Ecosystem Support</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-700 text-text-primary mb-5"
          >
            Your stack. Your rules.
            <br />
            <span className="text-gradient">Marvéo adapts.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="max-w-xl mx-auto text-text-secondary"
          >
            Whether you&apos;re running classic WordPress, a decoupled architecture,
            or a fully custom Next.js stack — Marvéo integrates cleanly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ECOSYSTEM_TYPES.map((type, i) => {
            const Icon = ICONS[type.icon];
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
                className={cn(
                  "relative p-7 rounded-2xl bg-gradient-to-br border group cursor-pointer overflow-hidden",
                  CARD_COLORS[i]
                )}
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-30 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-3xl" />
                </div>

                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {Icon && <Icon className="w-5 h-5 text-text-secondary" />}
                  </div>
                  <span className="text-xs font-mono text-text-muted border border-white/8 px-2.5 py-1 rounded-lg bg-white/3">
                    {type.subtitle}
                  </span>
                </div>

                <h3 className="font-display font-700 text-xl text-text-primary mb-2">{type.label}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-5">{type.description}</p>

                <div className="space-y-1.5 mb-6">
                  {type.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-text-muted">
                      <div className="w-1 h-1 rounded-full bg-text-muted" />
                      {feat}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">For: {type.forWho}</span>
                  <Link
                    href={`/solutions/${type.id}`}
                    className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors font-medium group/link"
                  >
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
