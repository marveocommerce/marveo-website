"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { Badge } from "@/components/shared/Badge";

const TRUST_ITEMS = [
  "WordPress sync",
  "Headless ready",
  "Multi-site ops",
  "Template provisioning",
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-100" />
      <div className="absolute inset-0 bg-radial-glow" />
      <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" size="xl" />
      <GlowOrb className="top-1/3 -right-32" size="md" color="rgba(52,211,153,0.06)" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
          className="flex justify-center mb-8"
        >
          <Badge variant="accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Marvéo v1 — Now in Early Access
            <ArrowRight className="w-3 h-3" />
          </Badge>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-800 leading-[0.95] tracking-tight mb-6"
        >
          <span className="text-gradient">Deploy. Manage.</span>
          <br />
          <span className="text-text-primary">Scale. Control.</span>
        </motion.h1>

        {/* Sub headline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-text-secondary leading-relaxed mb-10"
        >
          Marvéo is the website operating system for modern businesses.
          Connect any stack — WordPress, Headless, Next.js — and manage
          everything from one intelligent deployment workspace.
        </motion.p>

        {/* Trust items */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {TRUST_ITEMS.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 text-xs text-text-muted font-mono"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              {item}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link
            href="/setup/activate"
            className="group flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-bright text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(79,142,247,0.35)] hover:shadow-[0_0_40px_rgba(79,142,247,0.5)]"
          >
            Start Deployment
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/templates"
            className="flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 text-text-primary font-semibold text-sm rounded-xl transition-all duration-200"
          >
            <Play className="w-3.5 h-3.5" />
            Explore Templates
          </Link>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="relative"
        >
          {/* Fade out bottom */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg-primary to-transparent z-10" />
          {/* Glow behind mockup */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-transparent to-accent/10 rounded-2xl blur-lg opacity-50" />

          <div className="relative card-surface rounded-2xl overflow-hidden border border-white/8 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6 bg-bg-secondary/60">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-error/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-bg-card rounded-md border border-white/6 text-xs text-text-muted font-mono">
                  marveo.co/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="grid grid-cols-4 min-h-[380px]">
              {/* Sidebar */}
              <div className="col-span-1 border-r border-white/5 bg-bg-secondary/40 p-4 space-y-1 hidden md:block">
                {["Overview", "Deployments", "Templates", "Workspaces", "Sync", "Settings"].map(
                  (item, i) => (
                    <div
                      key={item}
                      className={`px-3 py-2 rounded-lg text-xs font-medium ${
                        i === 0
                          ? "bg-accent/15 text-accent border border-accent/20"
                          : "text-text-muted"
                      }`}
                    >
                      {item}
                    </div>
                  )
                )}
              </div>

              {/* Main panel */}
              <div className="col-span-4 md:col-span-3 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-text-primary mb-1">
                      Workspace Overview
                    </div>
                    <div className="text-xs text-text-muted">
                      3 active deployments · Last sync 2m ago
                    </div>
                  </div>
                  <div className="px-3 py-1.5 bg-success/10 border border-success/20 rounded-lg text-xs text-success font-mono">
                    All systems operational
                  </div>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Deployments", value: "12", trend: "+3 today" },
                    { label: "Sites Live", value: "8", trend: "100% uptime" },
                    { label: "Templates", value: "24", trend: "6 sectors" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="p-3 rounded-xl bg-bg-card border border-white/5"
                    >
                      <div className="text-lg font-display font-700 text-text-primary">
                        {stat.value}
                      </div>
                      <div className="text-xs text-text-muted">{stat.label}</div>
                      <div className="text-xs text-success mt-1">{stat.trend}</div>
                    </div>
                  ))}
                </div>

                {/* Activity rows */}
                <div className="space-y-2">
                  {[
                    { name: "Nexus Corporate", status: "live", time: "2m ago", env: "production" },
                    { name: "Cartify Ecommerce", status: "deploying", time: "8m ago", env: "staging" },
                    { name: "EstateView Pro", status: "live", time: "1h ago", env: "production" },
                  ].map((row) => (
                    <div
                      key={row.name}
                      className="flex items-center justify-between p-3 rounded-xl bg-bg-card/60 border border-white/4"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            row.status === "live"
                              ? "bg-success"
                              : "bg-warning animate-pulse"
                          }`}
                        />
                        <span className="text-xs font-medium text-text-secondary">
                          {row.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-text-muted">{row.env}</span>
                        <span className="text-xs text-text-muted">{row.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}