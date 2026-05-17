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
