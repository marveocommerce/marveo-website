"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AlertTriangle } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";

const PAIN_POINTS = [
  "Tool fragmentation",
  "Operational bottlenecks",
  "Poor operational visibility",
  "Disconnected systems",
  "Scaling complexity",
  "Repetitive workflows",
  "Developer dependency",
  "Limited operational control",
];

export function SectorSolutions() {
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
            <SectionLabel>The Problem</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="heading-section text-text-primary mb-5"
          >
            Modern Commerce Operations
            <br className="hidden md:block" />
            <span className="text-gradient">Have Become Fragmented.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="max-w-3xl mx-auto text-body text-text-secondary"
          >
            Businesses today manage content, commerce, analytics, deployments,
            customer workflows, and operational tools across disconnected
            systems that slow growth and increase technical dependency.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {PAIN_POINTS.map((point, i) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.05 }}
              whileHover={{ y: -5, rotateX: 6, rotateY: -6, transition: { duration: 0.22 } }}
              className="group relative card-surface rounded-2xl p-5 border border-white/8 hover:border-accent/30 hover:bg-accent/10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/8 group-hover:to-accent/2 transition-all duration-200" />
              <div className="w-9 h-9 rounded-lg bg-warning/10 border border-warning/20 flex items-center justify-center mb-4">
                <AlertTriangle className="w-4 h-4 text-warning" />
              </div>
              <p className="relative text-base md:text-[1.05rem] font-semibold text-text-primary leading-snug">
                {point}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="text-center max-w-4xl mx-auto text-body text-text-secondary"
        >
          Marvéo centralizes modern commerce operations into one scalable
          operating system without disrupting your existing infrastructure.
        </motion.p>
      </div>
    </section>
  );
}
