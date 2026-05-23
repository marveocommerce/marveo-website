"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, LayoutTemplate } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import Link from "next/link";

const CATEGORIES = [
  {
    name: "Fashion and Lifestyle",
    subtext: "Commerce Ready • Multi-Store Support",
  },
  {
    name: "Electronics and Gadgets",
    subtext: "Inventory Driven • High-Performance Checkout",
  },
  {
    name: "Beauty and Wellness",
    subtext: "Subscription Ready • Customer Retention Flows",
  },
  {
    name: "Food and Grocery",
    subtext: "Fast Ordering • Delivery Workflows",
  },
  {
    name: "Real Estate",
    subtext: "Lead Pipelines • Listing Infrastructure",
  },
  {
    name: "Hospitality",
    subtext: "Bookings • Operational Automation",
  },
  {
    name: "Education",
    subtext: "Enrollment Systems • Structured Portals",
  },
  {
    name: "Healthcare",
    subtext: "Secure Workflows • Structured Operations",
  },
  {
    name: "B2B and Wholesale",
    subtext: "Bulk Commerce • Team Permissions",
  },
  {
    name: "Landing Pages",
    subtext: "High Conversion • Campaign Optimized",
  },
];

export function TemplateMarketplace() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} className="section-spacing relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-shell">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="mb-5"
            >
              <SectionLabel>Sector Accelerators</SectionLabel>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="heading-section text-text-primary"
            >
              Launch Faster With
              <br className="hidden md:block" />
              <span className="text-gradient">Commerce-Ready Operational Frameworks</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/templates"
              className="btn-base group bg-white/4 hover:bg-white/8 border border-white/16 hover:border-accent/40 text-text-primary hover:text-accent-bright shadow-[0_12px_34px_-24px_rgba(0,0,0,0.75)] hover:shadow-[0_18px_42px_-24px_rgba(79,142,247,0.45)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore Frameworks <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="max-w-4xl text-body text-text-secondary mb-8"
        >
          Marvéo frameworks combine frontend structure, operational workflows,
          deployment configuration, and commerce infrastructure designed for
          modern business sectors.
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.03 }}
              whileHover={{ y: -4 }}
              className="card-surface card-surface-hover rounded-2xl p-5"
            >
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/15 flex items-center justify-center mb-3">
                <LayoutTemplate className="w-4 h-4 text-accent" />
              </div>
              <p className="font-display font-700 text-lg leading-snug text-text-primary mb-2">
                {category.name}
              </p>
              <p className="text-helper text-text-secondary">{category.subtext}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
