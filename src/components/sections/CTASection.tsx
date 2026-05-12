"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import { GlowOrb } from "@/components/shared/GlowOrb";

export function CTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-spacing relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <GlowOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size="xl" />

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="card-surface border-glow rounded-3xl p-12 md:p-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-medium tracking-widest uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-glow-pulse" />
              Ready to Deploy
            </div>

            <h2 className="font-display text-4xl md:text-6xl font-800 text-text-primary mb-6 leading-tight">
              Launch your website
              <br />
              <span className="text-gradient">infrastructure today.</span>
            </h2>

            <p className="max-w-xl mx-auto text-text-secondary mb-10 text-lg">
              Stop managing websites with tools built for developers.
              Marvéo gives your business the operating system it deserves.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/setup/activate"
                className="group flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-bright text-white font-semibold rounded-xl transition-all duration-200 shadow-[0_0_40px_rgba(79,142,247,0.4)] hover:shadow-[0_0_60px_rgba(79,142,247,0.5)] text-sm"
              >
                Start Free Deployment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/8 border border-white/12 hover:border-white/20 text-text-secondary hover:text-text-primary font-semibold rounded-xl transition-all duration-200 text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Book a Demo
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-text-muted">
              {["No credit card required", "Setup in under 5 minutes", "Cancel anytime"].map((item) => (
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
