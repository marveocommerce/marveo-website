"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Building2, Link2, Rocket, ShieldCheck } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import Link from "next/link";

const launchWorkspaceHref = "/pricing";

const PATHS = [
  {
    icon: Rocket,
    title: "Launch New Commerce Experience",
    description:
      "Launch quickly with a Marvéo-powered operational infrastructure designed for modern commerce businesses.",
    cta: launchWorkspaceHref,
    ctaLabel: "Launch Workspace",
  },
  {
    icon: Link2,
    title: "Connect Existing Website",
    description:
      "Connect your existing website stack and centralize operations without rebuilding your infrastructure.",
    cta: "/contact?intent=connect-website",
    ctaLabel: "Connect Website",
  },
  {
    icon: Building2,
    title: "Connect Modern Infrastructure",
    description:
      "Integrate existing API-driven, headless, or custom frontend systems into Marvéo’s operational layer.",
    cta: "/contact?intent=connect-infrastructure",
    ctaLabel: "Connect Infrastructure",
  },
];

export function WebsiteTypes() {
  const [token, setToken] = useState("mvt_your_connector_token");
  const [isMasked, setIsMasked] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="how-it-works" ref={ref} className="section-spacing relative scroll-mt-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-shell">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="flex justify-center mb-5"
          >
            <SectionLabel>How It Works</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="heading-section text-text-primary mb-5"
          >
            Built for Every Stage of
            <br className="hidden md:block" />
            <span className="text-gradient">Commerce Infrastructure</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="max-w-3xl mx-auto text-body text-text-secondary"
          >
            Marvéo supports new launches, existing websites, and modern infrastructure
            stacks, centralizing operations above your current systems without forcing
            a full rebuild.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {PATHS.map((path, i) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
                className="card-surface card-surface-hover rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-700 text-lg md:text-xl leading-snug text-text-primary mb-2">
                  {path.title}
                </h3>
                <p className="text-base text-text-secondary leading-relaxed mb-5">{path.description}</p>
                <Link
                  href={path.cta}
                  className="btn-base text-accent hover:text-accent-bright border border-accent/20 hover:border-accent/40 px-3.5"
                >
                  {path.ctaLabel}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="card-surface rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-success" />
            <p className="font-display font-700 text-base md:text-lg leading-snug text-text-primary">
              Workspace Connection Token
            </p>
          </div>
          <label className="block text-helper text-text-muted font-mono mb-2" htmlFor="token-field">
            This secure token verifies and connects your existing infrastructure
            to the Marvéo operational platform.
          </label>
          <input
            id="token-field"
            type={isMasked ? "password" : "text"}
            value={token}
            onChange={(event) => {
              setToken(event.target.value);
              setIsMasked(false);
            }}
            onBlur={() => setIsMasked(true)}
            className="w-full rounded-xl border border-white/12 bg-bg-card px-4 py-3 text-sm text-text-primary outline-none focus:border-accent/40"
            aria-describedby="token-helper token-security"
          />
          <p id="token-helper" className="mt-2 text-helper text-text-secondary">
            Generated from the Marvéo Connector or integration layer.
          </p>
          <p id="token-security" className="mt-1 text-helper text-warning">
            Do not share this token publicly. One token must belong to one verified
            domain only. The token is hidden after input blur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {["Connect Infrastructure", "Verify Connection", "Configure Workspace", "Deploy Operations", "Launch"].map(
            (step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="flex-1 rounded-xl border border-white/8 bg-bg-card px-3 py-2 text-helper text-text-secondary text-center">
                  {step}
                </div>
                {i < 4 ? <ArrowRight className="hidden md:block w-4 h-4 text-text-muted" /> : null}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
