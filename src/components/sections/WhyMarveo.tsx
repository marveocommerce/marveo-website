"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle2, XCircle } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";

const TRADITIONAL_OPERATIONS = [
  "Designed primarily for content management",
  "Operational workflows become fragmented over time",
  "Limited visibility across business systems",
  "Difficult to scale across teams and environments",
  "Requires multiple disconnected tools",
];

const MARVEO = [
  "Structured operational workspace",
  "Centralized commerce visibility",
  "Connected business workflows",
  "Team-ready operational controls",
  "Deployment and infrastructure aware",
  "Works alongside existing commerce systems",
];

export function WhyMarveo() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} className="section-spacing relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-shell">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-5"
          >
            <SectionLabel>Built for Modern Operations</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="heading-section text-text-primary mb-5"
          >
            Built for Operations Beyond
            <br className="hidden md:block" />
            <span className="text-gradient">Traditional Admin Panels</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="max-w-3xl mx-auto text-body text-text-secondary"
          >
            Marvéo adds a structured operational layer above existing commerce
            and content systems - giving businesses clearer workflows,
            visibility, deployment control, and scalable operational
            infrastructure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="group card-surface rounded-2xl p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
          >
            <h3 className="font-display font-700 text-lg md:text-xl leading-snug text-text-primary mb-5">
              Traditional Website Operations
            </h3>
            <div className="space-y-3.5">
              {TRADITIONAL_OPERATIONS.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-base text-text-secondary">
                  <XCircle className="w-4 h-4 text-warning mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="group card-surface border-glow rounded-2xl p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_55px_-28px_rgba(14,165,233,0.5)]"
          >
            <h3 className="font-display font-700 text-lg md:text-xl leading-snug text-text-primary mb-5">
              Marvéo
            </h3>
            <div className="space-y-3.5">
              {MARVEO.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-base text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
