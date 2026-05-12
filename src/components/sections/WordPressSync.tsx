"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, GitBranch, Key, RefreshCw, Zap, Lock } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";

const SYNC_FEATURES = [
  { icon: Key, label: "Token-based Auth", desc: "One-time validation token. No usernames, no passwords handed over." },
  { icon: GitBranch, label: "GitHub Sync", desc: "Connector plugin auto-updates on every push to your GitHub repo." },
  { icon: RefreshCw, label: "Live Synchronisation", desc: "Changes in WordPress reflect in Marvéo in real-time." },
  { icon: Lock, label: "Passwordless Direction", desc: "Roadmapping to full cPanel passwordless login. Security-first architecture." },
  { icon: Shield, label: "Enterprise Auth", desc: "Token rotation, expiry controls, and access management built-in." },
  { icon: Zap, label: "Instant Activation", desc: "One click on the activation link and your site is live in Marvéo." },
];

export function WordPressSync() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} className="section-spacing relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <GlowOrb className="top-1/2 -translate-y-1/2 -left-40" size="lg" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="mb-5"
            >
              <SectionLabel>Plugin Synchronisation</SectionLabel>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-700 text-text-primary mb-5 leading-tight"
            >
              Enterprise-grade sync.
              <br />
              <span className="text-gradient">Zero complexity.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="text-text-secondary mb-10 leading-relaxed"
            >
              Connect your WordPress site through the Marvéo Connector Plugin.
              Secure, token-validated, and always in sync with your GitHub
              codebase. No credentials stored. No config hell.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SYNC_FEATURES.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-text-primary mb-0.5">{feat.label}</div>
                      <div className="text-xs text-text-secondary leading-relaxed">{feat.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="card-surface rounded-2xl overflow-hidden border-glow">
              {/* Header */}
              <div className="px-5 py-4 border-b border-white/6 flex items-center justify-between bg-bg-secondary/40">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-glow-pulse" />
                  <span className="text-sm font-mono text-text-secondary">marveo-connector</span>
                </div>
                <span className="text-xs font-mono text-text-muted px-2.5 py-1 bg-success/10 border border-success/20 rounded-md text-success">
                  Connected
                </span>
              </div>

              {/* Connection diagram */}
              <div className="p-6 space-y-3">
                {[
                  { label: "WordPress Site", sub: "yourdomain.com", status: "live", col: "text-accent" },
                  { label: "Marvéo Connector Plugin", sub: "v1.2.0 · auto-update enabled", status: "sync", col: "text-success" },
                  { label: "GitHub Repository", sub: "marveocommerce/your-site", status: "watching", col: "text-warning" },
                  { label: "Marvéo Dashboard", sub: "app.marveo.co/workspace", status: "live", col: "text-accent" },
                ].map((node, i) => (
                  <div key={node.label}>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-bg-card border border-white/5">
                      <div>
                        <div className={`text-sm font-semibold mb-0.5 ${node.col}`}>{node.label}</div>
                        <div className="text-xs text-text-muted font-mono">{node.sub}</div>
                      </div>
                      <span
                        className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${
                          node.status === "live"
                            ? "text-success bg-success/10 border-success/20"
                            : node.status === "sync"
                            ? "text-accent bg-accent/10 border-accent/20"
                            : "text-warning bg-warning/10 border-warning/20"
                        }`}
                      >
                        {node.status}
                      </span>
                    </div>
                    {i < 3 && (
                      <div className="flex justify-center py-1">
                        <div className="w-px h-4 bg-gradient-to-b from-accent/30 to-transparent" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Token display */}
              <div className="mx-5 mb-5 p-4 rounded-xl bg-bg-card border border-accent/12">
                <div className="text-xs text-text-muted font-mono mb-2">Activation token</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-accent tracking-widest">
                    mvt_••••••••••••••••7f3a
                  </span>
                  <span className="text-xs text-success font-mono">validated</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
