"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { GlowOrb } from "@/components/shared/GlowOrb";

export function CTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const launchHref = "/pricing";
  const launchExternal = false;

  return (
    <section ref={ref} className="section-spacing relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-8 text-center">
        <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="xl" />

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="card-surface border-glow rounded-3xl p-10 sm:p-12 md:p-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-medium tracking-widest uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-glow-pulse" />
              Ready to Scale
            </div>

            <h2 className="heading-section text-text-primary mb-6">
              Ready to Scale Commerce Operations
              <br className="hidden md:block" />
              <span className="text-gradient">Without Rebuilding Your Business?</span>
            </h2>

            <p className="max-w-2xl mx-auto text-body text-text-secondary mb-10">
              Connect existing infrastructure, launch operational frameworks,
              and centralize workflows through a platform designed for modern
              commerce operations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center flex-wrap gap-3.5 sm:gap-4 md:gap-5">
              <Link
                href={launchHref}
                {...(launchExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="btn-base group min-w-[13.5rem] bg-accent hover:bg-accent-bright text-white border border-accent/35 shadow-[0_0_40px_rgba(79,142,247,0.35)] hover:shadow-[0_0_58px_rgba(79,142,247,0.42)] px-6 hover:-translate-y-0.5 transition-all duration-300"
              >
                Launch Workspace
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/deployments"
                className="btn-base min-w-[13.5rem] bg-white/3 hover:bg-white/8 border border-accent/24 hover:border-accent/45 text-text-primary/90 hover:text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:shadow-[0_0_28px_-16px_rgba(79,142,247,0.6)] px-6 hover:-translate-y-0.5 transition-all duration-300"
              >
                Connect Existing Infrastructure
              </Link>
            </div>

            <div className="mt-5 mb-2 text-center">
              <p className="text-sm text-text-muted">
                Need help planning your operational setup?
              </p>
              <Link
                href="/contact?intent=specialist-assist"
                className="inline-flex items-center gap-1.5 mt-1.5 text-sm font-semibold text-accent hover:text-accent-bright transition-colors group"
              >
                Speak With a Marvéo Specialist
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 text-helper text-text-muted">
              {["Existing infrastructure support", "Operational deployment frameworks", "Guided enterprise onboarding"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-text-muted" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
