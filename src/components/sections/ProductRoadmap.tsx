"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionLabel } from "@/components/shared/SectionLabel";

type ModuleStatus = "Available" | "Expanding" | "In Development" | "Rolling Out";

type Module = {
  title: string;
  description: string;
  status: ModuleStatus;
};

const CLUSTERS: { title: string; summary: string; modules: Module[] }[] = [
  {
    title: "Core Operations",
    summary: "Foundational layers currently active across connected business environments.",
    modules: [
      {
        title: "Commerce Operations",
        description:
          "Unified operational management for products, inventory, pricing, orders, and commerce workflows.",
        status: "Available",
      },
      {
        title: "Operational Visibility",
        description:
          "Track deployments, workflows, infrastructure activity, permissions, and operational events centrally.",
        status: "Available",
      },
      {
        title: "Workspace & Team Operations",
        description:
          "Role-based operational access, multi-team visibility, and connected workspace management.",
        status: "Available",
      },
    ],
  },
  {
    title: "Expanding Ecosystem",
    summary: "Operational layers extending orchestration across clients, channels, and finance.",
    modules: [
      {
        title: "Client & Lead Operations",
        description:
          "Lead pipelines, appointment workflows, inquiry tracking, and operational client management systems.",
        status: "Expanding",
      },
      {
        title: "Communication Infrastructure",
        description:
          "Unified operational communication across WhatsApp, Instagram, TikTok, Telegram, and connected channels.",
        status: "Expanding",
      },
      {
        title: "Financial Operations",
        description:
          "Invoicing, payment workflows, tax operations, revenue tracking, and operational financial visibility.",
        status: "In Development",
      },
    ],
  },
];

export function ProductRoadmap() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} className="section-spacing relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-shell">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-5"
          >
            <SectionLabel>Operational Ecosystem</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="heading-section text-text-primary mb-5"
          >
            Connected Operational Infrastructure
            <br className="hidden md:block" />
            <span className="text-gradient">for Modern Businesses</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="max-w-3xl mx-auto text-body text-text-secondary"
          >
            Marvéo combines commerce operations, operational workflows, communication infrastructure,
            deployment systems, and business management capabilities into one connected operational
            environment.
          </motion.p>
        </div>

        <div className="space-y-8">
          {CLUSTERS.map((cluster, clusterIndex) => (
            <motion.div
              key={cluster.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.06 + clusterIndex * 0.08 }}
              className="rounded-3xl border border-white/10 bg-white/[0.015] p-5 md:p-6"
            >
              <div className="mb-5 md:mb-6">
                <p className="font-display font-600 text-sm tracking-[0.14em] uppercase text-text-secondary mb-2">
                  {cluster.title}
                </p>
                <p className="text-helper text-text-muted max-w-2xl">{cluster.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {cluster.modules.map((module, i) => (
                  <motion.article
                    key={module.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.45,
                      delay: 0.1 + clusterIndex * 0.06 + i * 0.05,
                    }}
                    className="group card-surface rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/28 hover:shadow-[0_20px_55px_-34px_rgba(79,142,247,0.45)]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display font-700 text-lg md:text-xl leading-snug text-text-primary">
                        {module.title}
                      </h3>
                      <span
                        className={`text-helper font-mono tracking-wide px-2.5 py-1 rounded-lg border transition-all duration-300 group-hover:shadow-[0_0_24px_-14px_rgba(79,142,247,0.65)] ${
                          module.status === "Available"
                            ? "text-success bg-success/10 border-success/20 group-hover:bg-success/15"
                            : module.status === "Expanding"
                              ? "text-accent-bright bg-accent/12 border-accent/28 group-hover:bg-accent/18"
                              : module.status === "In Development"
                                ? "text-warning bg-warning/10 border-warning/20 group-hover:bg-warning/15"
                                : "text-text-secondary bg-white/8 border-white/15 group-hover:bg-white/12"
                        }`}
                      >
                        {module.status}
                      </span>
                    </div>
                    <p className="text-base text-text-secondary leading-relaxed">{module.description}</p>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
