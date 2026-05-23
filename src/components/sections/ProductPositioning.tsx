"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BarChart3, Boxes, Building2, ChartLine, LayoutPanelTop, Zap } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";

const CAPABILITIES = [
  {
    icon: Boxes,
    label: "Commerce Operations",
    desc: "Manage products, orders, pricing, inventory, payments, and fulfillment workflows from a cleaner operating layer.",
  },
  {
    icon: LayoutPanelTop,
    label: "Content and Website Control",
    desc: "Update pages, menus, banners, landing pages, SEO content, and media without digging through the WordPress backend.",
  },
  {
    icon: Building2,
    label: "Customer and Lead Management",
    desc: "Centralize customer data, enquiries, form submissions, and growth opportunities in one place.",
  },
  {
    icon: BarChart3,
    label: "Analytics and Performance",
    desc: "Track store health, content performance, traffic insights, and operational activity from one dashboard.",
  },
  {
    icon: Zap,
    label: "Headless Ready",
    desc: "Keep WordPress as your backend while powering a fast Next.js frontend when needed.",
  },
  {
    icon: ChartLine,
    label: "Multi-Site Management",
    desc: "Manage multiple brands, storefronts, or client websites from a structured Marvéo workspace.",
  },
];

export function ProductPositioning() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-spacing relative">
      <div className="container-shell">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-5"
          >
            <SectionLabel>What Marvéo Does</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-section text-text-primary mb-5"
          >
            One Workspace for Commerce,
            <br className="hidden md:block" />
            <span className="text-gradient">Content, and Growth</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-3xl mx-auto text-body text-text-secondary"
          >
            Marvéo is positioned around operational outcomes. Teams get cleaner
            control over commerce execution, content velocity, and growth
            decisions while WordPress and WooCommerce continue powering the core engine.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                className="card-surface card-surface-hover p-6 rounded-2xl group"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-700 text-lg md:text-xl leading-snug text-text-primary mb-2">
                  {cap.label}
                </h3>
                <p className="text-base text-text-secondary leading-relaxed">{cap.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
