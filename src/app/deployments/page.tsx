"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Eye, Layers3, Sparkles, Volume2, VolumeX } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/shared/GlowOrb";

const STORY_PANELS = [
  {
    title: "Workspace Shift",
    status: "Live sync",
    description: "Switch between operational workspaces with continuity across commerce and deployment workflows.",
  },
  {
    title: "Deployment State",
    status: "In progress",
    description: "Track staged launches through one control layer with clear visibility from draft to production.",
  },
  {
    title: "Operational Stream",
    status: "Updated 4s ago",
    description: "Follow infrastructure, workflow, and team activity in one continuously updated operational timeline.",
  },
] as const;

const SCENARIOS = [
  {
    title: "Existing Ecommerce Business",
    description: "Modernize operations without rebuilding infrastructure.",
  },
  {
    title: "Multi-Brand Operations",
    description: "Operate multiple commerce environments through one workspace.",
  },
  {
    title: "Agency Infrastructure",
    description: "Centralize deployments, workflows, and operational systems.",
  },
  {
    title: "Enterprise Expansion",
    description: "Scale operational visibility across teams and infrastructure.",
  },
] as const;

const EXPANSION = [
  "Operational Automation",
  "Deployment Monitoring",
  "Workspace Federation",
  "Infrastructure Recovery",
  "AI Operational Insights",
] as const;

const HOTSPOTS = [
  { label: "Operational Timeline", top: "21%", left: "16%" },
  { label: "Workspace Context", top: "38%", left: "62%" },
  { label: "Deployment Overlay", top: "63%", left: "34%" },
  { label: "Infrastructure Health", top: "71%", left: "72%" },
] as const;

const STACK_MONITOR_SEGMENTS = [
  {
    stack: "WordPress / WooCommerce",
    checks: [
      { label: "Plugin updates", value: "2 outdated", status: "warning" },
      { label: "WooCommerce version", value: "Current", status: "healthy" },
      { label: "Theme compatibility", value: "Verified", status: "healthy" },
    ],
  },
  {
    stack: "Headless Next.js",
    checks: [
      { label: "Next.js runtime", value: "v16.3.0", status: "healthy" },
      { label: "Dependency drift", value: "1 package", status: "warning" },
      { label: "Build integrity", value: "Stable", status: "healthy" },
    ],
  },
  {
    stack: "Full Next.js",
    checks: [
      { label: "Framework version", value: "Update available", status: "warning" },
      { label: "Route health", value: "All passing", status: "healthy" },
      { label: "Deployment status", value: "Synced", status: "healthy" },
    ],
  },
  {
    stack: "Custom API Stack",
    checks: [
      { label: "API schema sync", value: "In sync", status: "healthy" },
      { label: "Connector heartbeat", value: "Healthy", status: "healthy" },
      { label: "Operational alerts", value: "1 active", status: "warning" },
    ],
  },
] as const;

const INSTALL_STEPS = ["Plan", "Profile", "Website", "Details", "Review", "Install", "Ready"] as const;

const FLOW_PHASES = [
  {
    title: "Choose your plan",
    description: "Pick a baseline. You can adjust plan details after workspace provisioning.",
    chips: ["Secure onboarding contract", "Support handoff automation", "Launch checklist verification"],
    focusPlan: 0,
  },
  {
    title: "Set workspace profile",
    description: "Define team context, workspace ownership, and operational defaults for launch readiness.",
    chips: ["Team profile set", "Business context captured", "Governance defaults enabled"],
    focusPlan: 1,
  },
  {
    title: "Connect commerce website",
    description: "Link existing commerce surfaces while preserving current production environments.",
    chips: ["Domain verification", "Infrastructure mapping", "Safe migration checks"],
    focusPlan: 1,
  },
  {
    title: "Configure operational details",
    description: "Apply workflows, permissions, and visibility preferences for day-one operation.",
    chips: ["Access controls", "Workflow templates", "Notification routing"],
    focusPlan: 1,
  },
  {
    title: "Review configuration",
    description: "Inspect plan, workflows, and launch settings before production activation.",
    chips: ["Control checks", "Operational validation", "Readiness summary"],
    focusPlan: 2,
  },
  {
    title: "Install workspace",
    description: "Provision your workspace environment and activate operational surfaces.",
    chips: ["Provisioning in progress", "Deployment sequencing", "Activation pipeline"],
    focusPlan: 2,
  },
  {
    title: "Workspace ready",
    description: "Your operational workspace is live and ready for commerce execution.",
    chips: ["Workspace ready", "Handoff complete", "Launch unlocked"],
    focusPlan: 2,
  },
] as const;

const STEP_UI = [
  {
    panel: "Plan selection",
    fields: ["Workspace baseline", "Operational package", "Governance profile", "Launch timeline"],
  },
  {
    panel: "Profile configuration",
    fields: ["Workspace name", "Primary operator", "Team size", "Operating region"],
  },
  {
    panel: "Website connection",
    fields: ["Primary domain", "Commerce endpoint", "Content source", "Sync readiness"],
  },
  {
    panel: "Operational details",
    fields: ["Role permissions", "Workflow defaults", "Notification routes", "Compliance profile"],
  },
  {
    panel: "Review and validation",
    fields: ["Configuration summary", "Environment checks", "Policy validation", "Approval gate"],
  },
  {
    panel: "Install sequence",
    fields: ["Workspace provisioning", "Deployment setup", "Operational handoff", "Activation checks"],
  },
  {
    panel: "Ready state",
    fields: ["Workspace live", "Team invited", "Controls active", "Launch confirmed"],
  },
] as const;

const FLOW_TOTAL_MS = 30000;
const STEP_MS = Math.floor(FLOW_TOTAL_MS / INSTALL_STEPS.length);

const STEP_CURSOR_POINTS = [
  { left: "7%", top: "39%" },
  { left: "21%", top: "39%" },
  { left: "35%", top: "39%" },
  { left: "49%", top: "39%" },
  { left: "63%", top: "39%" },
  { left: "77%", top: "39%" },
  { left: "91%", top: "39%" },
] as const;

function playStepClick(context: AudioContext, step: number) {
  const now = context.currentTime;

  // Primary tactile click transient.
  const osc = context.createOscillator();
  const oscGain = context.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(1680 + step * 22, now);
  osc.frequency.exponentialRampToValueAtTime(730 + step * 10, now + 0.038);
  oscGain.gain.setValueAtTime(0.0001, now);
  oscGain.gain.exponentialRampToValueAtTime(0.09, now + 0.004);
  oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
  osc.connect(oscGain);
  oscGain.connect(context.destination);
  osc.start(now);
  osc.stop(now + 0.055);

  // Short high-frequency tick for a crisp UI click finish.
  const tick = context.createOscillator();
  const tickGain = context.createGain();
  tick.type = "square";
  tick.frequency.setValueAtTime(2500 + step * 18, now + 0.012);
  tickGain.gain.setValueAtTime(0.0001, now + 0.012);
  tickGain.gain.exponentialRampToValueAtTime(0.035, now + 0.016);
  tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.036);
  tick.connect(tickGain);
  tickGain.connect(context.destination);
  tick.start(now + 0.012);
  tick.stop(now + 0.04);
}

export default function DeploymentsPage() {
  const [activeInstallStep, setActiveInstallStep] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const activePhase = FLOW_PHASES[activeInstallStep];
  const activeStepUi = STEP_UI[activeInstallStep];
  const stepProgress = ((activeInstallStep + 1) / INSTALL_STEPS.length) * 100;
  const activeStackIndex = activeInstallStep % STACK_MONITOR_SEGMENTS.length;
  const activeStack = STACK_MONITOR_SEGMENTS[activeStackIndex];

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveInstallStep((prev) => (prev + 1) % INSTALL_STEPS.length);
    }, STEP_MS);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!soundEnabled) return;

    const context = audioCtxRef.current;
    if (!context) return;

    playStepClick(context, activeInstallStep);
  }, [activeInstallStep, soundEnabled]);

  const toggleSound = async () => {
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (Ctx) {
        audioCtxRef.current = new Ctx();
      }
    }

    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      await audioCtxRef.current.resume();
    }

    setSoundEnabled((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        <section className="relative min-h-screen pt-28 md:pt-36 pb-20">
          <div className="absolute inset-0 grid-bg opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(79,142,247,0.2),transparent_34%),radial-gradient(circle_at_82%_78%,rgba(79,142,247,0.12),transparent_42%)]" />
          <GlowOrb className="-top-16 -left-28" size="lg" />
          <GlowOrb className="top-10 right-[-120px]" size="lg" color="rgba(79,142,247,0.1)" />

          <div className="relative container-shell grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[72vh]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono uppercase tracking-widest mb-7">
                <Sparkles className="w-3.5 h-3.5" /> Platform Experience
              </div>
              <h1 className="heading-hero text-text-primary mb-6">
                Commerce Operations,
                <br />
                <span className="text-gradient">Reimagined.</span>
              </h1>
              <p className="text-body text-text-secondary max-w-2xl mb-9">
                See how Marveo centralizes infrastructure, workflows,
                deployments, and commerce operations through one operational platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-3.5">
                <Link
                  href="https://app.getmarveo.com/setup/mvp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-base bg-accent hover:bg-accent-bright border border-accent/30 text-white shadow-[0_14px_38px_-22px_rgba(79,142,247,0.82)]"
                >
                  Explore Workspace <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#platform-flow"
                  className="btn-base bg-white/4 hover:bg-white/8 border border-white/15 text-text-primary"
                >
                  Watch Platform Flow
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative h-[420px]"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-10 top-12 card-surface rounded-2xl p-5 border-glow"
              >
                <p className="text-xs font-mono text-text-muted mb-2">Workspace Alpha</p>
                <p className="text-sm text-text-primary mb-4">Operational command active</p>
                <div className="space-y-2.5">
                  <div className="h-2 rounded bg-white/8" />
                  <div className="h-2 rounded bg-white/8 w-4/5" />
                  <div className="h-2 rounded bg-accent/35 w-2/3" />
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 7.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute left-0 top-44 w-[52%] card-surface rounded-2xl p-4"
              >
                <p className="text-[11px] text-text-muted font-mono mb-2">Deployment Visibility</p>
                <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                  <motion.div
                    className="h-full bg-accent"
                    animate={{ width: ["22%", "74%", "46%"] }}
                    transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6.9, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                className="absolute right-3 top-56 w-[42%] card-surface rounded-2xl p-4"
              >
                <p className="text-[11px] text-text-muted font-mono mb-2">Activity Stream</p>
                <div className="space-y-2">
                  <div className="h-2 rounded bg-white/8" />
                  <div className="h-2 rounded bg-white/8 w-11/12" />
                  <div className="h-2 rounded bg-white/8 w-9/12" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="platform-flow" className="section-spacing relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="container-shell">
            <div className="text-center mb-12">
              <h2 className="heading-section text-text-primary mb-4">
                Platform Flow,
                <span className="text-gradient"> Operationally Alive</span>
              </h2>
              <p className="text-body text-text-secondary max-w-3xl mx-auto">
                Motion-based storytelling demonstrates how workspace context,
                deployment momentum, infrastructure syncing, and operational
                visibility work together in one refined platform experience.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
              className="relative card-surface border-glow rounded-3xl p-6 md:p-8 mb-10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(79,142,247,0.14),transparent_38%),radial-gradient(circle_at_84%_88%,rgba(79,142,247,0.08),transparent_44%)]" />
              <motion.div
                className="absolute z-30 pointer-events-none"
                style={{ left: STEP_CURSOR_POINTS[0].left, top: STEP_CURSOR_POINTS[0].top }}
                animate={{
                  left: STEP_CURSOR_POINTS[activeInstallStep].left,
                  top: STEP_CURSOR_POINTS[activeInstallStep].top,
                }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-white drop-shadow-[0_0_10px_rgba(79,142,247,0.5)]" />
                  <motion.span
                    key={activeInstallStep}
                    className="absolute -left-3 -top-3 w-7 h-7 rounded-full border border-accent/35"
                    animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.2, 0.55, 0.2] }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                  />
                </div>
              </motion.div>

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent">Marveo OS Installation</p>
                  <button
                    onClick={toggleSound}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-text-secondary hover:text-text-primary border border-white/15 bg-white/5 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    {soundEnabled ? "Sound On" : "Enable Sound"}
                  </button>
                </div>
                <h3 className="font-display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.04] font-800 text-text-primary mb-4 max-w-4xl">
                  Installing Marveo OS for your
                  <br className="hidden md:block" />
                  business
                </h3>
                <p className="text-base md:text-lg text-text-secondary mb-3 max-w-3xl">
                  A premium guided install with secure handoff, production-safe defaults, and launch readiness checks.
                </p>
                <p className="text-sm text-text-muted mb-8">
                  Estimated setup time: 3-5 minutes. You can pause and resume from this browser at any point.
                </p>

                <div className="relative mb-7">
                  <div className="absolute left-0 right-0 top-5 h-px bg-white/12" />
                  <motion.div
                    className="absolute left-0 top-5 h-px bg-accent/70"
                    animate={{ width: `${stepProgress}%` }}
                    transition={{ duration: STEP_MS / 1000, ease: "easeInOut" }}
                  />
                  <div className="grid grid-cols-7 gap-2">
                    {INSTALL_STEPS.map((step, index) => {
                      const done = index < activeInstallStep;
                      const active = index === activeInstallStep;

                      return (
                        <div key={step} className="text-center">
                          <motion.div
                            animate={active ? { scale: [1, 1.08, 1] } : {}}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                            className={`relative z-10 w-9 h-9 mx-auto rounded-full border flex items-center justify-center text-sm font-semibold font-mono ${
                              done
                                ? "bg-accent text-white border-accent/60"
                                : active
                                ? "bg-accent/18 text-accent border-accent/40"
                                : "bg-bg-card text-text-muted border-white/20"
                            }`}
                          >
                            {index + 1}
                          </motion.div>
                          <p className={`mt-2 text-[11px] uppercase tracking-wider font-mono ${done || active ? "text-text-primary" : "text-text-muted"}`}>
                            {step}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeInstallStep}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                      {activePhase.chips.map((item, index) => (
                        <div
                          key={item}
                          className={`rounded-full border px-4 py-2 text-sm ${
                            index === 0
                              ? "border-accent/38 bg-accent/10 text-accent-bright"
                              : index === 1
                              ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-300"
                              : "border-emerald-500/35 bg-emerald-500/10 text-emerald-300"
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                      <div className="flex-1">
                        <h4 className="font-display text-3xl md:text-4xl font-700 text-text-primary mb-3">{activePhase.title}</h4>
                        <p className="text-base text-text-secondary mb-4">{activePhase.description}</p>
                        {activeInstallStep !== INSTALL_STEPS.length - 1 ? (
                          <>
                            <div className="mb-3 text-xs font-mono uppercase tracking-widest text-accent">{activeStepUi.panel}</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {activeStepUi.fields.map((field, idx) => (
                                <motion.div
                                  key={field}
                                  initial={{ opacity: 0.5 }}
                                  animate={{ opacity: [0.5, 1, 0.5] }}
                                  transition={{ duration: 2.1, delay: idx * 0.15, repeat: Infinity, ease: "easeInOut" }}
                                  className="rounded-xl border border-white/14 bg-bg-card/70 px-4 py-3"
                                >
                                  <div className="text-sm text-text-secondary">{field}</div>
                                </motion.div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                            className="rounded-2xl border border-success/35 bg-[radial-gradient(circle_at_30%_25%,rgba(52,211,153,0.2),transparent_45%),rgba(10,26,22,0.9)] p-6"
                          >
                            <p className="text-xs font-mono uppercase tracking-widest text-success mb-2">Workspace Ready</p>
                            <h5 className="font-display text-2xl md:text-3xl font-700 text-text-primary mb-2">
                              Welcome to your Marveo Workspace
                            </h5>
                            <p className="text-sm md:text-base text-text-secondary mb-4">
                              Your operational environment is live with workflows, infrastructure visibility, and launch controls activated.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {activeStepUi.fields.map((item) => (
                                <div key={item} className="rounded-lg border border-success/25 bg-success/10 px-3 py-2 text-sm text-success">
                                  {item}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                      <div className="flex md:block items-center gap-3">
                        <motion.div
                          animate={{ opacity: [0.55, 1, 0.55] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                          className={`text-xs font-mono border rounded-full px-3 py-1.5 ${
                            activeInstallStep === INSTALL_STEPS.length - 1
                              ? "text-success border-success/30 bg-success/10"
                              : "text-text-secondary border-white/20 bg-white/5"
                          }`}
                        >
                          {activeInstallStep === INSTALL_STEPS.length - 1 ? "Workspace ready" : `Step ${activeInstallStep + 1} active`}
                        </motion.div>
                        <Link
                          href={activeInstallStep === INSTALL_STEPS.length - 1 ? "/contact?intent=launch-workspace" : "/contact?intent=start-setup"}
                          className="btn-base bg-accent hover:bg-accent-bright text-white px-7 shadow-[0_16px_36px_-24px_rgba(79,142,247,0.9)]"
                        >
                          {activeInstallStep === INSTALL_STEPS.length - 1 ? "Launch" : "Continue"}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {STORY_PANELS.map((panel, index) => (
                <motion.article
                  key={panel.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="card-surface rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-700 text-lg text-text-primary">{panel.title}</h3>
                    <span className="text-helper font-mono text-accent px-2 py-1 rounded-md border border-accent/25 bg-accent/10">
                      {panel.status}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5">{panel.description}</p>
                  <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                    <motion.div
                      className="h-full bg-accent"
                      animate={{ width: ["15%", "85%", "40%"] }}
                      transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing relative">
          <div className="container-shell">
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-helper font-mono text-accent uppercase tracking-widest mb-2">Operational Scenarios</p>
                <h2 className="heading-section text-text-primary">Operational Scenarios</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SCENARIOS.map((scenario, index) => (
                <motion.article
                  key={scenario.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="group card-surface rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/24 hover:shadow-[0_22px_50px_-34px_rgba(79,142,247,0.72)]"
                >
                  <p className="text-helper font-mono text-text-muted mb-2">Scenario {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="font-display text-[1.42rem] leading-tight font-700 text-text-primary mb-3">{scenario.title}</h3>
                  <p className="text-base text-text-secondary leading-relaxed">{scenario.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-secondary/20 to-transparent" />
          <div className="relative container-shell">
            <div className="text-center mb-10">
              <p className="text-helper font-mono text-accent uppercase tracking-widest mb-2">Interactive Workspace Preview</p>
              <h2 className="heading-section text-text-primary mb-4">A Living Operational Surface</h2>
              <p className="text-body text-text-secondary max-w-3xl mx-auto">
                Layered workspace depth, operational overlays, and evolving control states show how Marveo feels in motion, without exposing internal implementation.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
              className="relative card-surface border-glow rounded-3xl p-6 md:p-8 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(79,142,247,0.13),transparent_36%),radial-gradient(circle_at_80%_78%,rgba(79,142,247,0.08),transparent_42%)]" />
              <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[390px]">
                <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-bg-card/70 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-helper font-mono text-text-muted">Workspace Operations View</span>
                    <span className="text-helper font-mono text-success">Operationally live</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 h-[300px]">
                    <div className="rounded-xl bg-white/4 border border-white/8 p-3">
                      <p className="text-[11px] font-mono text-text-muted mb-2">Commerce Workloads</p>
                      <motion.div animate={{ opacity: [0.35, 1, 0.35] }} transition={{ duration: 4.8, repeat: Infinity }} className="h-2 rounded bg-accent/40 mb-2" />
                      <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 5.3, repeat: Infinity }} className="h-2 rounded bg-white/10 w-11/12" />
                    </div>
                    <div className="rounded-xl bg-white/4 border border-white/8 p-3">
                      <p className="text-[11px] font-mono text-text-muted mb-2">Environment State</p>
                      <div className="space-y-2">
                        <div className="h-2 rounded bg-white/10" />
                        <div className="h-2 rounded bg-accent/30 w-3/4" />
                      </div>
                    </div>
                    <div className="rounded-xl bg-white/4 border border-white/8 p-3 col-span-2">
                      <p className="text-[11px] font-mono text-text-muted mb-2">Operational Timeline</p>
                      <div className="space-y-2">
                        {[0, 1, 2, 3].map((line) => (
                          <motion.div
                            key={line}
                            animate={{ opacity: [0.35, 1, 0.35] }}
                            transition={{ duration: 4.2, delay: line * 0.3, repeat: Infinity }}
                            className="h-2 rounded bg-white/10"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-bg-card/70 p-4">
                  <p className="text-helper font-mono text-text-muted mb-3">Stack-Aware Monitoring</p>
                  <div className="grid grid-cols-2 gap-1.5 mb-3">
                    {STACK_MONITOR_SEGMENTS.map((segment, index) => (
                      <div
                        key={segment.stack}
                        className={`rounded-lg border px-2.5 py-1.5 text-[10px] font-mono ${
                          index === activeStackIndex
                            ? "border-accent/40 bg-accent/12 text-accent-bright"
                            : "border-white/10 bg-white/4 text-text-muted"
                        }`}
                      >
                        {segment.stack}
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/3 p-3 mb-3">
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Connected websites are monitored by stack, so operational checks adapt to each technology environment.
                    </p>
                  </div>
                  <div className="space-y-2.5">
                    {activeStack.checks.map((check) => (
                      <motion.div
                        key={check.label}
                        initial={{ opacity: 0.65 }}
                        animate={{ opacity: [0.65, 1, 0.65] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        className="rounded-xl border border-white/8 bg-white/4 px-3 py-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm text-text-secondary">{check.label}</span>
                          <span
                            className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${
                              check.status === "healthy"
                                ? "text-success border-success/30 bg-success/10"
                                : "text-warning border-warning/30 bg-warning/10"
                            }`}
                          >
                            {check.value}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {HOTSPOTS.map((spot, index) => (
                <motion.div
                  key={spot.label}
                  className="absolute"
                  style={{ top: spot.top, left: spot.left }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.18 + index * 0.06 }}
                >
                  <div className="group relative">
                    <motion.span
                      animate={{ scale: [1, 1.18, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      className="block w-2.5 h-2.5 rounded-full bg-accent"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-accent/20 bg-bg-primary/90 px-2.5 py-1 text-[11px] text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                      {spot.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section-spacing relative">
          <div className="container-shell">
            <div className="text-center mb-10">
              <p className="text-helper font-mono text-accent uppercase tracking-widest mb-2">Platform Expansion</p>
              <h2 className="heading-section text-text-primary mb-4">Platform Expansion</h2>
              <p className="text-body text-text-secondary max-w-3xl mx-auto">
                Forward-looking capabilities designed to expand operational intelligence, resilience, and execution quality as commerce environments scale.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {EXPANSION.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="card-surface rounded-2xl p-4 text-center"
                >
                  <div className="w-8 h-8 mx-auto mb-3 rounded-lg border border-accent/20 bg-accent/10 flex items-center justify-center">
                    <Layers3 className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-sm font-display font-700 text-text-primary leading-snug">{item}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="https://app.getmarveo.com/setup/mvp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-bright text-sm font-semibold"
              >
                View Operational Capabilities <Eye className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
