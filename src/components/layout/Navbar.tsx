"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/*
 * LOGIN + START DEPLOYMENT BUTTON BEHAVIOUR
 * ─────────────────────────────────────────
 * Controlled entirely by `appUrl` in src/config/site.ts.
 *
 * appUrl is empty (""):
 *   Login            → /login    (internal information page)
 *   Start Deployment → /contact  (book a demo)
 *
 * appUrl is set (e.g. "https://app.marveo.co"):
 *   Login            → https://app.marveo.co/login          (external, new tab)
 *   Start Deployment → https://app.marveo.co/setup/activate (external, new tab)
 *
 * To switch to live: update appUrl in src/config/site.ts only.
 * No other file needs to change.
 */
const loginHref      = siteConfig.appUrl ? `${siteConfig.appUrl}/login`          : "/login";
const deploymentHref = siteConfig.appUrl ? `${siteConfig.appUrl}/setup/activate` : "/contact";
const isExternal     = !!siteConfig.appUrl;

export function Navbar() {
  const [scrolled,    setScrolled]   = useState(false);
  const [mobileOpen,  setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-bg-primary/80 backdrop-blur-xl border-b border-white/6 shadow-[0_1px_40px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* ── Logo ─────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-7 h-7">
              <div className="absolute inset-0 rounded-lg bg-accent/20 border border-accent/30 group-hover:bg-accent/30 transition-colors" />
              <div className="absolute inset-1 rounded-[5px] bg-accent/80 group-hover:bg-accent transition-colors" />
            </div>
            <span className="font-display font-700 text-lg text-text-primary tracking-tight">
              Marvéo
            </span>
          </Link>

          {/* ── Desktop nav links ─────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* ── Desktop CTAs ──────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={loginHref}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors font-medium"
            >
              Login
            </Link>

            <Link
              href={deploymentHref}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent-bright text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(79,142,247,0.3)]"
            >
              Start Deployment
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* ── Mobile hamburger ──────────────────────────── */}
          <button
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile menu ───────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-bg-secondary/95 backdrop-blur-xl border-b border-white/7 md:hidden"
          >
            <div className="p-4 space-y-1">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-white/7 space-y-2">
                <Link
                  href={loginHref}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center px-4 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href={deploymentHref}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 px-4 py-3 bg-accent text-white text-sm font-semibold rounded-xl"
                >
                  Start Deployment <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}