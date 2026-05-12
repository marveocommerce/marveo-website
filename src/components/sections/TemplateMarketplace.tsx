"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, ExternalLink, Star } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { TEMPLATE_PREVIEWS, SECTORS } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const FILTERS = ["All", ...SECTORS.map((s) => s.label)];

export function TemplateMarketplace() {
  const [active, setActive] = useState("All");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const filtered =
    active === "All"
      ? TEMPLATE_PREVIEWS
      : TEMPLATE_PREVIEWS.filter((t) => t.sector === active);

  const COLORS: Record<string, string> = {
    Corporate: "#4F8EF7",
    Ecommerce: "#34D399",
    "Real Estate": "#F59E0B",
    Healthcare: "#EC4899",
    Education: "#A78BFA",
    "Landing Pages": "#FB923C",
  };

  return (
    <section ref={ref} className="section-spacing relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="mb-5"
            >
              <SectionLabel>Template Marketplace</SectionLabel>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-700 text-text-primary"
            >
              Production-grade templates.
              <br />
              <span className="text-gradient">One-click deployment.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/templates"
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors font-medium"
            >
              Browse all templates <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border",
                active === f
                  ? "bg-accent/15 text-accent border-accent/25"
                  : "bg-white/3 text-text-muted border-white/7 hover:text-text-secondary hover:bg-white/6"
              )}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Template grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((tpl, i) => (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="card-surface card-surface-hover group rounded-2xl overflow-hidden"
              >
                {/* Preview area */}
                <div
                  className="relative h-44 overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${COLORS[tpl.sector] || "#4F8EF7"}12, transparent)` }}
                >
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  {/* Fake browser chrome */}
                  <div className="absolute top-4 left-4 right-4 h-6 rounded-lg bg-bg-secondary/60 border border-white/8 flex items-center px-3 gap-2">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    </div>
                    <div className="flex-1 text-center text-[9px] text-text-muted font-mono truncate">
                      {tpl.name.toLowerCase().replace(/\s+/g, "-")}.marveo.co
                    </div>
                  </div>
                  {/* Content blocks */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <div className="h-3 rounded bg-white/10 w-3/4" />
                    <div className="h-2 rounded bg-white/6 w-1/2" />
                    <div className="h-6 rounded-lg w-24 mt-1" style={{ background: `${COLORS[tpl.sector] || "#4F8EF7"}40` }} />
                  </div>
                  {/* Featured badge */}
                  {tpl.featured && (
                    <div className="absolute top-12 right-4 flex items-center gap-1 px-2 py-0.5 rounded-md bg-warning/20 border border-warning/30 text-warning text-[10px] font-mono">
                      <Star className="w-2.5 h-2.5" />
                      Featured
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-bg-primary/0 group-hover:bg-bg-primary/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur border border-white/15 text-white text-xs font-medium rounded-lg">
                        <ExternalLink className="w-3 h-3" /> Preview
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-600 text-text-primary text-sm">{tpl.name}</h3>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                      style={{ color: COLORS[tpl.sector], background: `${COLORS[tpl.sector]}12`, border: `1px solid ${COLORS[tpl.sector]}25` }}
                    >
                      {tpl.sector}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tpl.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-white/4 text-text-muted border border-white/6 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/templates/${tpl.id}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-bright transition-colors group/link"
                  >
                    Deploy template
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
