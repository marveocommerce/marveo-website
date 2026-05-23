"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { Badge } from "@/components/shared/Badge";

const OPERATIONAL_SIGNALS = [
  { label: "Active Workspaces", value: "96" },
  { label: "Operational Health", value: "98.7%" },
  { label: "Active Workflows", value: "312" },
];

const ACTIVITY_STREAM = [
  "Client request triaged to Team Operations",
  "Infrastructure sync completed across 4 channels",
  "Revenue operation reconciliation finished",
  "Workflow automation approved for deployment",
  "Unified inbox routed 12 priority conversations",
  "Deployment status transitioned to healthy",
];

const CHANNELS = [
  "WhatsApp",
  "Instagram",
  "TikTok",
  "Telegram",
  "Email",
  "Web Chat",
];

export function Hero() {
  const [activeEvent, setActiveEvent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % ACTIVITY_STREAM.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-24">
      <div className="absolute inset-0 grid-bg opacity-100" />
      <div className="absolute inset-0 bg-radial-glow" />
      <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" size="lg" />
      <GlowOrb className="top-20 -right-28" size="md" color="rgba(79,142,247,0.12)" />

      <div className="relative z-10 container-shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6"
            >
              <Badge variant="accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Marvéo Operational Ecosystem
                <ArrowRight className="w-3 h-3" />
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="heading-hero mb-6"
            >
              One Workspace.
              <br />
              <span className="text-gradient">Every Operation.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="text-body text-text-secondary mb-8 max-w-2xl"
            >
              Marvéo centralizes operational workflows, communication infrastructure,
              revenue operations, team coordination, and deployment systems into one
              connected workspace for modern businesses.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6"
            >
              <Link
                href="/contact?intent=guided-onboarding"
                className="btn-base group bg-accent hover:bg-accent-bright text-white shadow-[0_0_28px_rgba(79,142,247,0.35)]"
              >
                Book a Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/product"
                className="btn-base bg-white/5 hover:bg-white/8 border border-white/12 hover:border-white/20 text-text-primary"
              >
                Explore Platform
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
              className="flex items-center gap-2 text-helper text-text-muted font-mono"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              Built for commerce teams, agencies, clinics, consultants, and service businesses.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-accent/18 via-transparent to-accent/8 blur-2xl" />

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 right-6 z-20 rounded-2xl border border-white/12 bg-bg-card/70 backdrop-blur-md px-4 py-3 shadow-[0_12px_32px_-20px_rgba(0,0,0,0.8)]"
            >
              <p className="text-[11px] font-mono text-text-muted mb-1">Connected Channels</p>
              <div className="flex flex-wrap gap-1.5 max-w-[220px]">
                {CHANNELS.slice(0, 4).map((channel) => (
                  <span
                    key={channel}
                    className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/5 px-2 py-0.5 text-[10px] text-text-secondary"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    {channel}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute -bottom-7 left-6 z-20 rounded-2xl border border-white/12 bg-bg-card/70 backdrop-blur-md px-4 py-3 shadow-[0_12px_32px_-20px_rgba(0,0,0,0.8)]"
            >
              <p className="text-[11px] font-mono text-text-muted mb-1">Deployment Status</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-text-primary">Rolling out workflow updates</span>
              </div>
            </motion.div>

            <div className="relative card-surface rounded-3xl border border-white/10 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 bg-bg-secondary/60">
                <div>
                  <p className="text-xs font-mono text-text-muted">Marvéo Mission Control</p>
                  <p className="text-sm font-semibold text-text-primary">Connected Operational Infrastructure</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono px-2.5 py-1 rounded-lg bg-success/10 border border-success/20 text-success">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  Live
                </div>
              </div>

              <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {OPERATIONAL_SIGNALS.map((stat) => (
                  <motion.div
                    key={stat.label}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="p-3 rounded-xl bg-bg-card border border-white/6"
                  >
                    <p className="text-[11px] text-text-muted font-mono mb-1">{stat.label}</p>
                    <p className="text-base font-display font-700 text-text-primary">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              <div className="px-5 pb-5 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-white/8 bg-bg-card/75">
                    <p className="text-[11px] font-mono text-text-muted mb-2">Revenue Operations</p>
                    <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                      <motion.div
                        initial={{ width: "62%" }}
                        animate={{ width: ["62%", "78%", "70%"] }}
                        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                        className="h-full bg-gradient-to-r from-accent/80 to-accent-bright"
                      />
                    </div>
                    <p className="text-[11px] text-text-muted mt-2">Settlements and approvals synchronizing</p>
                  </div>

                  <div className="p-3 rounded-xl border border-white/8 bg-bg-card/75">
                    <p className="text-[11px] font-mono text-text-muted mb-2">Unified Inbox</p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] text-text-secondary">
                        <span>Client Requests</span>
                        <span className="text-text-primary">14 active</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-text-secondary">
                        <span>Pending Approvals</span>
                        <span className="text-warning">3 pending</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-text-secondary">
                        <span>Team Activity</span>
                        <span className="text-success">Operational</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-accent/20 bg-accent/8">
                  <p className="text-[11px] font-mono text-text-muted mb-2">Live Activity Stream</p>
                  <div className="space-y-1.5">
                    {ACTIVITY_STREAM.slice(0, 4).map((event, index) => {
                      const isActive = index === activeEvent % 4;
                      return (
                        <div
                          key={event}
                          className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 border transition-all duration-300 ${
                            isActive
                              ? "border-accent/35 bg-accent/10"
                              : "border-white/6 bg-white/[0.02]"
                          }`}
                        >
                          <span className="text-[11px] text-text-secondary">{event}</span>
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? "bg-success animate-pulse" : "bg-white/30"
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}