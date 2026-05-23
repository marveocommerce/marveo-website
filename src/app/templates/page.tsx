"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Star, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { cn } from "@/lib/utils";

type TemplateManifest = {
  tagline?: string;
  palette: { primary: string; secondary: string; accent: string; background: string; text: string };
  typography: { heading: string; body: string };
  routes: { path: string; label: string; description: string }[];
};

type PublicTemplate = {
  templateId: string;
  name: string;
  businessType: string;
  description: string;
  slug: string;
  featureModules: string[];
  planAvailability: string[];
  requiresSupport: boolean;
  manifest?: TemplateManifest;
};

// SVG template mockup — renders a coloured browser-frame representation of each page
function TemplateMockupSVG({
  palette,
  page,
}: {
  palette: TemplateManifest["palette"];
  page: "home" | "services" | "gallery" | "contact";
}) {
  const { primary, secondary, accent, background, text } = palette;
  const bg = background;

  const pages = {
    home: (
      <g>
        {/* Hero */}
        <rect x="2" y="70" width="596" height="130" fill={secondary} opacity="0.7" />
        <rect x="22" y="90" width="110" height="6" rx="3" fill={accent} opacity="0.5" />
        <rect x="22" y="105" width="280" height="16" rx="6" fill={text} opacity="0.55" />
        <rect x="22" y="127" width="220" height="12" rx="5" fill={text} opacity="0.35" />
        <rect x="22" y="148" width="200" height="7" rx="3" fill={text} opacity="0.2" />
        <rect x="22" y="162" width="160" height="7" rx="3" fill={text} opacity="0.15" />
        <rect x="22" y="178" width="96" height="20" rx="10" fill={primary} opacity="0.8" />
        <rect x="126" y="178" width="96" height="20" rx="10" fill="none" stroke={primary} strokeWidth="1.5" opacity="0.5" />
        {/* Cards */}
        <rect x="2" y="200" width="596" height="100" fill={bg} />
        <rect x="22" y="212" width="70" height="9" rx="4" fill={text} opacity="0.4" />
        <rect x="22" y="230" width="182" height="60" rx="8" fill={secondary} opacity="0.85" />
        <rect x="212" y="230" width="182" height="60" rx="8" fill={secondary} opacity="0.85" />
        <rect x="402" y="230" width="182" height="60" rx="8" fill={secondary} opacity="0.85" />
        <rect x="34" y="244" width="80" height="7" rx="3" fill={text} opacity="0.45" />
        <rect x="34" y="257" width="130" height="5" rx="2" fill={text} opacity="0.2" />
        <rect x="34" y="268" width="55" height="5" rx="2" fill={accent} opacity="0.5" />
      </g>
    ),
    services: (
      <g>
        {/* Hero banner */}
        <rect x="2" y="70" width="596" height="70" fill={secondary} opacity="0.7" />
        <rect x="22" y="86" width="90" height="6" rx="3" fill={accent} opacity="0.5" />
        <rect x="22" y="100" width="200" height="14" rx="6" fill={text} opacity="0.5" />
        {/* Service rows */}
        <rect x="22" y="155" width="552" height="1" fill={text} opacity="0.08" />
        {[155, 190, 225, 260].map((y) => (
          <g key={y}>
            <rect x="22" y={y + 8} width="556" height="28" rx="6" fill={secondary} opacity="0.7" />
            <rect x="34" y={y + 16} width="100" height="7" rx="3" fill={text} opacity="0.45" />
            <rect x="34" y={y + 26} width="160" height="5" rx="2" fill={text} opacity="0.2" />
            <rect x="510" y={y + 14} width="60" height="8" rx="4" fill={accent} opacity="0.5" />
          </g>
        ))}
      </g>
    ),
    gallery: (
      <g>
        {/* Header */}
        <rect x="2" y="70" width="596" height="60" fill={secondary} opacity="0.6" />
        <rect x="22" y="84" width="80" height="6" rx="3" fill={accent} opacity="0.4" />
        <rect x="22" y="98" width="140" height="13" rx="5" fill={text} opacity="0.45" />
        {/* 3x3 image grid */}
        {[0, 1, 2].map((col) =>
          [0, 1, 2].map((row) => (
            <rect
              key={`${col}-${row}`}
              x={22 + col * 192}
              y={148 + row * 52}
              width="184"
              height="46"
              rx="8"
              fill={secondary}
              opacity="0.75"
            />
          ))
        )}
      </g>
    ),
    contact: (
      <g>
        {/* Hero */}
        <rect x="2" y="70" width="596" height="70" fill={secondary} opacity="0.6" />
        <rect x="22" y="84" width="80" height="6" rx="3" fill={accent} opacity="0.4" />
        <rect x="22" y="98" width="180" height="13" rx="5" fill={text} opacity="0.45" />
        {/* Form left */}
        {[150, 182, 214, 248].map((y) => (
          <rect key={y} x="22" y={y} width="270" height="24" rx="6" fill={secondary} opacity="0.7" />
        ))}
        <rect x="22" y="282" width="270" height="50" rx="6" fill={secondary} opacity="0.6" />
        <rect x="22" y="342" width="270" height="22" rx="11" fill={primary} opacity="0.8" />
        {/* Info right */}
        <rect x="312" y="152" width="120" height="6" rx="3" fill={accent} opacity="0.4" />
        <rect x="312" y="164" width="180" height="7" rx="3" fill={text} opacity="0.35" />
        <rect x="312" y="194" width="100" height="6" rx="3" fill={accent} opacity="0.4" />
        <rect x="312" y="206" width="150" height="7" rx="3" fill={text} opacity="0.35" />
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 600 370" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Browser window */}
      <rect x="0" y="0" width="600" height="370" rx="10" fill={bg} />
      {/* Title bar */}
      <rect x="0" y="0" width="600" height="32" rx="10" fill="rgba(0,0,0,0.07)" />
      <rect x="0" y="22" width="600" height="10" fill="rgba(0,0,0,0.07)" />
      <circle cx="14" cy="16" r="4.5" fill="#FF5F56" opacity="0.8" />
      <circle cx="29" cy="16" r="4.5" fill="#FFBD2E" opacity="0.8" />
      <circle cx="44" cy="16" r="4.5" fill="#27C93F" opacity="0.8" />
      <rect x="60" y="9" width="320" height="14" rx="7" fill="rgba(0,0,0,0.1)" />
      {/* Navbar */}
      <rect x="2" y="32" width="596" height="38" fill={primary} opacity="0.12" />
      <rect x="14" y="44" width="80" height="10" rx="5" fill={primary} opacity="0.55" />
      <rect x="370" y="46" width="40" height="7" rx="3" fill={text} opacity="0.22" />
      <rect x="420" y="46" width="40" height="7" rx="3" fill={text} opacity="0.22" />
      <rect x="470" y="46" width="40" height="7" rx="3" fill={text} opacity="0.22" />
      <rect x="524" y="40" width="62" height="18" rx="9" fill={primary} opacity="0.75" />
      {/* Page-specific content */}
      {pages[page]}
      {/* Footer */}
      <rect x="0" y="310" width="600" height="60" rx="0" fill={text} opacity="0.88" />
      <rect x="0" y="310" width="600" height="6" fill={text} />
      <rect x="14" y="326" width="80" height="8" rx="4" fill="white" opacity="0.25" />
      <rect x="14" y="340" width="150" height="5" rx="2" fill="white" opacity="0.12" />
      <rect x="250" y="326" width="60" height="5" rx="2" fill="white" opacity="0.12" />
      <rect x="250" y="336" width="50" height="5" rx="2" fill="white" opacity="0.1" />
      <rect x="250" y="346" width="55" height="5" rx="2" fill="white" opacity="0.1" />
    </svg>
  );
}

const FALLBACK_TEMPLATES: PublicTemplate[] = [
  {
    templateId: "template-business-pro",
    name: "Business Pro Landing",
    businessType: "Landing Pages",
    description: "High-converting service-business landing template for lead capture and appointment-ready workflows.",
    slug: "business-pro",
    featureModules: ["lead-management", "bookings", "analytics", "client-portal"],
    planAvailability: ["starter", "growth", "enterprise"],
    requiresSupport: false,
  },
  {
    templateId: "template-makeup-artist",
    name: "Makeup Artist Studio",
    businessType: "Beauty",
    description: "Luxury beauty template with service showcase, portfolio gallery, and booking flow support. Built for solo makeup artists and beauty studios.",
    slug: "makeup-artist",
    featureModules: ["pages.core", "booking.widget", "gallery.portfolio"],
    planAvailability: ["starter", "growth", "enterprise", "all"],
    requiresSupport: false,
    manifest: {
      tagline: "Luxury makeup artistry for brides, editorials, and special occasions.",
      palette: { primary: "#C2847A", secondary: "#F7EDE9", accent: "#8C5E57", background: "#FDFAF9", text: "#2A1A14" },
      typography: { heading: "Cormorant Garamond", body: "Nunito Sans" },
      routes: [
        { path: "/", label: "Home", description: "Hero, services preview, testimonials, booking CTA" },
        { path: "/services", label: "Services", description: "Full service menu with pricing tiers" },
        { path: "/gallery", label: "Gallery", description: "Portfolio showcase and work samples" },
        { path: "/contact", label: "Contact & Book", description: "Booking enquiry form and contact information" },
      ],
    },
  },
  {
    templateId: "template-salon",
    name: "Salon Operations",
    businessType: "Beauty",
    description: "Modern salon template with service menu, team profiles, and appointment booking. Designed for full-service hair and beauty salons.",
    slug: "salon",
    featureModules: ["pages.core", "booking.widget", "team.profile"],
    planAvailability: ["starter", "growth", "enterprise"],
    requiresSupport: false,
    manifest: {
      tagline: "A modern salon experience built around craft, community, and care.",
      palette: { primary: "#2B4E42", secondary: "#EEF5F0", accent: "#C8A96E", background: "#F9FBF9", text: "#192720" },
      typography: { heading: "Playfair Display", body: "Inter" },
      routes: [
        { path: "/", label: "Home", description: "Hero, services preview, team intro, booking CTA" },
        { path: "/services", label: "Services & Pricing", description: "Full service list with pricing" },
        { path: "/team", label: "Our Team", description: "Stylist profiles and specialties" },
        { path: "/contact", label: "Book Now", description: "Booking enquiry form and salon details" },
      ],
    },
  },
];

const COLORS: Record<string, string> = {
  Corporate: "#4F8EF7",
  Ecommerce: "#34D399",
  "Real Estate": "#F59E0B",
  Healthcare: "#EC4899",
  Education: "#A78BFA",
  "Landing Pages": "#FB923C",
};

// ─── Envato-style preview modal ──────────────────────────────────────────────

type PreviewPage = "home" | "services" | "gallery" | "contact";

function EnvatoPreviewModal({
  template,
  onClose,
}: {
  template: PublicTemplate;
  onClose: () => void;
}) {
  const [activePage, setActivePage] = useState<PreviewPage>("home");
  const manifest = template.manifest;

  const accentColor = COLORS[template.businessType] || "#4F8EF7";

  const pages: { id: PreviewPage; label: string }[] = manifest
    ? manifest.routes.slice(0, 4).map((r, i) => {
        const ids: PreviewPage[] = ["home", "services", "gallery", "contact"];
        return { id: ids[i] ?? "home", label: r.label };
      })
    : [
        { id: "home", label: "Home" },
        { id: "services", label: "Services" },
        { id: "gallery", label: "Gallery" },
        { id: "contact", label: "Contact" },
      ];

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center px-3 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close preview"
        className="absolute inset-0 bg-bg-primary/85 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ y: 24, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 16, opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl border border-white/10 bg-bg-secondary flex flex-col"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/6 text-text-muted hover:text-text-primary hover:bg-white/12 transition-colors"
          aria-label="Close"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="flex flex-col lg:flex-row overflow-hidden flex-1 min-h-0">
          {/* ── Left: visual preview ──────────────────────────────── */}
          <div className="flex flex-col flex-1 min-w-0 border-b lg:border-b-0 lg:border-r border-white/8">
            {/* Page tabs */}
            <div className="flex items-center gap-1 px-4 pt-4 pb-0 border-b border-white/8 overflow-x-auto scrollbar-none">
              {pages.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePage(p.id)}
                  className={cn(
                    "shrink-0 px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 -mb-px",
                    activePage === p.id
                      ? "text-text-primary border-accent bg-white/4"
                      : "text-text-muted border-transparent hover:text-text-secondary"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Mockup */}
            <div className="flex-1 p-4 min-h-[220px] max-h-[380px] overflow-hidden">
              {manifest ? (
                <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl">
                  <TemplateMockupSVG palette={manifest.palette} page={activePage} />
                </div>
              ) : (
                <div
                  className="w-full h-full rounded-xl flex flex-col items-center justify-center gap-3 border border-white/8"
                  style={{ background: `linear-gradient(135deg, ${accentColor}08, transparent)` }}
                >
                  <div className="grid-bg absolute inset-0 opacity-20 rounded-xl" />
                  <div className="text-text-muted text-sm">Visual preview not available for this template.</div>
                  <span className="text-[11px] font-mono px-2 py-1 rounded bg-white/5 text-text-muted">
                    {template.slug}.marveo.co
                  </span>
                </div>
              )}
            </div>

            {manifest && (
              <p className="px-4 pb-3 text-[11px] text-text-muted text-center">
                Visual mockup — colours and typography match the real template
              </p>
            )}
          </div>

          {/* ── Right: template details ───────────────────────────── */}
          <div className="w-full lg:w-[340px] shrink-0 flex flex-col overflow-y-auto max-h-[92vh]">
            <div className="p-5 space-y-5">
              {/* Header */}
              <div>
                <div className="flex items-start gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-text-primary leading-snug flex-1">{template.name}</h3>
                  <span
                    className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-md mt-0.5"
                    style={{ color: accentColor, background: `${accentColor}12`, border: `1px solid ${accentColor}25` }}
                  >
                    {template.businessType}
                  </span>
                </div>
                {manifest?.tagline && (
                  <p className="text-xs text-text-muted italic mb-2">&ldquo;{manifest.tagline}&rdquo;</p>
                )}
                <p className="text-[13px] text-text-secondary leading-relaxed">{template.description}</p>
              </div>

              {manifest && (
                <>
                  <div className="h-px bg-white/8" />

                  {/* Colour palette */}
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-2.5">
                      Colour palette
                    </p>
                    <div className="flex gap-2">
                      {Object.entries(manifest.palette).map(([key, hex]) => (
                        <div key={key} className="flex flex-col items-center gap-1">
                          <div
                            className="w-8 h-8 rounded-lg border border-white/10 shadow-sm"
                            style={{ background: hex }}
                            title={hex}
                          />
                          <span className="text-[9px] font-mono text-text-muted opacity-60 uppercase">{key.slice(0, 3)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Typography */}
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-2.5">
                      Typography
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] text-text-muted">Headings</span>
                        <span className="text-sm text-text-primary font-medium"
                          style={{ fontStyle: "italic", letterSpacing: "-0.01em" }}>
                          {manifest.typography.heading}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] text-text-muted">Body</span>
                        <span className="text-[13px] text-text-secondary">{manifest.typography.body}</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-white/8" />

                  {/* Pages */}
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-2.5">
                      {manifest.routes.length} pages included
                    </p>
                    <ul className="space-y-1.5">
                      {manifest.routes.map((r) => (
                        <li key={r.path} className="flex items-start gap-2">
                          <span className="mt-0.5 text-accent text-xs">↗</span>
                          <div>
                            <span className="text-[13px] font-medium text-text-primary">{r.label}</span>
                            <span className="ml-2 text-[11px] text-text-muted">{r.description}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="h-px bg-white/8" />
                </>
              )}

              {/* Feature modules */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-2.5">
                  Includes
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {template.featureModules.map((mod) => (
                    <span key={mod} className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-text-muted border border-white/8 font-mono">
                      {mod}
                    </span>
                  ))}
                </div>
              </div>

              {/* Plans */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-2.5">
                  Available on
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {template.planAvailability.map((plan) => (
                    <span
                      key={plan}
                      className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold capitalize"
                      style={{ color: accentColor, background: `${accentColor}14`, border: `1px solid ${accentColor}22` }}
                    >
                      {plan}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky CTA footer */}
            <div className="sticky bottom-0 p-4 border-t border-white/8 bg-bg-secondary/95 backdrop-blur-sm flex flex-col gap-2.5">
              <Link
                href={`/pricing?selectedTemplateId=${encodeURIComponent(template.templateId)}`}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white hover:bg-accent-bright transition-colors"
              >
                Use this template
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-2.5 text-sm font-medium text-text-secondary hover:bg-white/8 transition-colors"
              >
                Back to templates
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TemplatesPage() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [templates, setTemplates] = useState<PublicTemplate[]>([]);
  const [catalogMode, setCatalogMode] = useState<"live" | "fallback">("live");
  const [previewTemplate, setPreviewTemplate] = useState<PublicTemplate | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadTemplates() {
      try {
        const params = new URLSearchParams({
          status: "ACTIVE",
          visibility: "PUBLIC",
          websiteType: "NEW_WEBSITE",
        });

        const response = await fetch(`/api/commercial/templates?${params.toString()}`, { cache: "no-store" });
        const payload = await response.json().catch(() => null) as { templates?: PublicTemplate[] } | null;
        if (!response.ok || !Array.isArray(payload?.templates)) {
          throw new Error("Template catalog is unavailable");
        }

        if (!mounted) return;
        setTemplates(payload.templates);
        setCatalogMode("live");
      } catch {
        if (!mounted) return;
        setTemplates(FALLBACK_TEMPLATES);
        setCatalogMode("fallback");
      }
    }

    void loadTemplates();
    return () => {
      mounted = false;
    };
  }, []);

  const filters = useMemo(() => {
    const categories = Array.from(new Set(templates.map((item) => item.businessType).filter(Boolean))).sort();
    return ["All", ...categories];
  }, [templates]);

  const filtered = templates.filter((template) => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchCategory = active === "All" || template.businessType === active;
    const matchQuery = !normalizedQuery
      || template.name.toLowerCase().includes(normalizedQuery)
      || template.description.toLowerCase().includes(normalizedQuery)
      || template.featureModules.some((tag) => tag.toLowerCase().includes(normalizedQuery));
    return matchCategory && matchQuery;
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
                className="w-full pl-10 pr-4 py-3 bg-bg-card border border-white/8 rounded-xl text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 font-body"
              />
            </div>
            {/* Sector filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-[15px] font-semibold transition-all border",
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
          <div className="flex items-center gap-2 mb-3 text-base text-text-muted">
            <SlidersHorizontal className="w-4 h-4" />
            {filtered.length} template{filtered.length !== 1 ? "s" : ""} found
          </div>
          {catalogMode === "fallback" ? (
            <p className="mb-6 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm text-sky-100">
              Showing curated templates while live catalog sync completes.
            </p>
          ) : null}

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
                    key={tpl.templateId}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="card-surface card-surface-hover group rounded-2xl overflow-hidden"
                  >
                    {/* Preview */}
                    <div
                      className="relative h-48 overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${COLORS[tpl.businessType] || "#4F8EF7"}12, transparent)` }}
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
                        <div className="h-7 rounded-lg w-28 mt-1" style={{ background: `${COLORS[tpl.businessType] || "#4F8EF7"}35` }} />
                      </div>
                      {tpl.planAvailability.includes("all") && (
                        <div className="absolute top-12 right-4 flex items-center gap-1 px-2 py-0.5 rounded-md bg-warning/20 border border-warning/30 text-warning text-[10px] font-mono">
                          <Star className="w-2.5 h-2.5" /> All plans
                        </div>
                      )}
                      <div className="absolute inset-0 bg-bg-primary/0 group-hover:bg-bg-primary/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => setPreviewTemplate(tpl)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur border border-white/15 text-white text-xs font-medium rounded-lg"
                        >
                          Preview
                        </button>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="heading-card text-text-primary text-base">{tpl.name}</h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                          style={{ color: COLORS[tpl.businessType] || "#4F8EF7", background: `${COLORS[tpl.businessType] || "#4F8EF7"}12`, border: `1px solid ${COLORS[tpl.businessType] || "#4F8EF7"}25` }}>
                          {tpl.businessType}
                        </span>
                      </div>
                      <p className="mb-2 text-xs text-text-secondary leading-relaxed">{tpl.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {tpl.featureModules.slice(0, 4).map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-white/4 text-text-muted border border-white/6 font-mono">{tag}</span>
                        ))}
                      </div>
                      <Link href={`/pricing?selectedTemplateId=${encodeURIComponent(tpl.templateId)}`}
                        className="flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-bright transition-colors group/link">
                        Use template and continue to pricing
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

      <AnimatePresence>
        {previewTemplate ? (
          <EnvatoPreviewModal template={previewTemplate} onClose={() => setPreviewTemplate(null)} />
        ) : null}
      </AnimatePresence>

      <Footer />
    </>
  );
}
