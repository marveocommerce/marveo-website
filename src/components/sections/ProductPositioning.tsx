"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Globe, Layers, Code2, Network, Cpu, GitBranch } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";

const CAPABILITIES = [
  { icon: Globe, label: "Website Deployment", desc: "From template to live production in minutes, not days." },
  { icon: GitBranch, label: "Plugin Synchronization", desc: "Connect WordPress sites through secure, token-based connectors." },
  { icon: Layers, label: "Template Provisioning", desc: "Deploy sector-optimised templates across any client workspace." },
  { icon: Network, label: "Multi-business Management", desc: "One workspace to orchestrate dozens of client deployments." },
  { icon: Code2, label: "Headless Support", desc: "Unified management for decoupled WordPress and Next.js architectures." },
  { icon: Cpu, label: "Deployment Orchestration", desc: "Automated CI/CD, rollbacks, and environment management." },
];

export function ProductPositioning() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-spacing relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-5"
          >
            <SectionLabel>Core Platform</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-700 text-gradient-subtle mb-5"
          >
            Everything you need to
            <br />
            run modern web infrastructure.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-xl mx-auto text-text-secondary"
          >
            Marvéo replaces the fragmented stack of tools businesses use to
            manage websites. One OS. All operations.
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
                <h3 className="font-display font-600 text-text-primary mb-2">{cap.label}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{cap.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
