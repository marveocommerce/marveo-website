"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Cloud, KeyRound, Lock, Network, Shield, ShieldCheck, UserCog } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";

const SECURITY_POINTS = [
  { icon: Network, label: "Centralized workspace management" },
  { icon: UserCog, label: "Role-based operational access" },
  { icon: ShieldCheck, label: "Scalable deployment workflows" },
  { icon: KeyRound, label: "Connected commerce infrastructure" },
  { icon: Shield, label: "Audit visibility and activity tracking" },
  { icon: Cloud, label: "Multi-environment support" },
  { icon: Lock, label: "Isolated business workspaces" },
  { icon: Network, label: "Cloud-ready architecture" },
];

export function DeploymentFlow() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="security" ref={ref} className="section-spacing relative scroll-mt-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/20 to-transparent" />

      <div className="relative container-shell">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-5"
          >
            <SectionLabel>Operational Infrastructure</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="heading-section text-text-primary mb-5"
          >
            Infrastructure Designed
            <br className="hidden md:block" />
            <span className="text-gradient">for Modern Commerce Operations</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="max-w-3xl mx-auto text-body text-text-secondary"
          >
            Marvéo provides the operational layer businesses need to manage
            workflows, deployments, visibility, permissions, and scalability
            through one centralized platform.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECURITY_POINTS.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.05 + i * 0.04 }}
                className="card-surface rounded-2xl p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center mt-0.5">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <p className="font-display font-700 text-base md:text-lg leading-snug text-text-primary">
                    {point.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
