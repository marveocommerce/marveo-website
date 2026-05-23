"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
// import { ThemeSwitch } from "@/components/layout/ThemeSwitch";

/*
 * LOGIN + START SETUP BUTTON BEHAVIOUR
 * ─────────────────────────────────────────
 * Controlled entirely by `appUrl` in src/config/site.ts.
 *
 * appUrl is empty (""):
 *   Login            → /login    (internal information page)
 *   Start Setup      → /pricing  (pricing and checkout first)
 *
 * appUrl is set (e.g. "https://app.marveo.co"):
 *   Login            → https://app.marveo.co/login          (external, new tab)
 *   Start Setup      → /pricing (marketing checkout flow)
 *
 * To switch to live: update appUrl in src/config/site.ts only.
 * No other file needs to change.
 */
const loginHref      = siteConfig.appUrl ? `${siteConfig.appUrl}/login`          : "/login";
const deploymentHref = "/pricing";
const loginExternal  = !!siteConfig.appUrl;
const deploymentExternal = false;

const NAV_ITEMS = [
  { id: "platform", label: "Platform" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "capabilities", label: "Capabilities" },
  { id: "integrations", label: "Integrations" },
  { id: "enterprise", label: "Enterprise" },
] as const;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function smoothScrollTo(targetY: number, duration = 700) {
  const startY = window.scrollY;
  const delta = targetY - startY;
  const startTime = performance.now();

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    window.scrollTo(0, startY + delta * eased);
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen,  setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<(typeof NAV_ITEMS)[number]["id"]>("platform");

  const navLookup = useMemo<Set<string>>(() => new Set(NAV_ITEMS.map((item) => item.id)), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const elements = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;

        const id = visible[0].target.id;
        if (navLookup.has(id)) {
          setActiveSection(id as (typeof NAV_ITEMS)[number]["id"]);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.45, 0.7],
        rootMargin: "-25% 0px -45% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isHome, navLookup]);

  useEffect(() => {
    if (!mobileOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  const goToSection = (id: (typeof NAV_ITEMS)[number]["id"]) => {
    setMobileOpen(false);

    if (!isHome) {
      router.push(`/#${id}`);
      return;
    }

    const target = document.getElementById(id);
    if (!target) return;

    const navOffset = scrolled ? 84 : 96;
    const y = target.getBoundingClientRect().top + window.scrollY - navOffset;
    smoothScrollTo(Math.max(y, 0));
    setActiveSection(id);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-400",
          scrolled
            ? "bg-bg-primary/55 backdrop-blur-2xl border-b border-accent/14 shadow-[0_16px_40px_-30px_rgba(0,0,0,0.85),0_0_0_1px_rgba(79,142,247,0.08)]"
            : "bg-transparent"
        )}
      >
        <div
          className={cn(
            "container-shell flex items-center justify-between transition-all duration-400",
            scrolled ? "h-[4.3rem]" : "h-[5rem]"
          )}
        >

          {/* ── Logo ─────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-[1.02]">
              <div className="absolute inset-0 rounded-lg border border-accent/28 bg-accent/8" />
              <div className="absolute inset-[6px] rounded-[6px] border border-accent/38" />
              <div className="absolute left-1/2 top-1.5 h-2.5 w-px -translate-x-1/2 bg-accent/50" />
              <div className="absolute left-1/2 bottom-1.5 h-2.5 w-px -translate-x-1/2 bg-accent/50" />
              <div className="absolute left-1.5 top-1/2 h-px w-2.5 -translate-y-1/2 bg-accent/50" />
              <div className="absolute right-1.5 top-1/2 h-px w-2.5 -translate-y-1/2 bg-accent/50" />
              <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/85" />
            </div>
            <span className="font-display font-700 text-[1.08rem] text-text-primary tracking-tight transition-colors duration-200 group-hover:text-accent-bright">
              Marvéo
            </span>
          </Link>

          {/* ── Desktop nav links ─────────────────────────── */}
          <div className="hidden lg:flex items-center gap-1 p-1.5 rounded-2xl border border-white/7 bg-bg-secondary/35 backdrop-blur-xl">
            {NAV_ITEMS.map((item) => {
              const isActive = isHome && activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => goToSection(item.id)}
                  className={cn(
                    "relative px-3.5 py-2 rounded-xl text-[14px] font-medium tracking-[0.01em] transition-colors duration-250",
                    isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-xl border border-accent/18 bg-accent/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.35 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── Desktop CTAs ──────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={loginHref}
              {...(loginExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="btn-base bg-white/4 hover:bg-white/8 border border-white/14 text-text-secondary hover:text-text-primary"
            >
              Sign In
            </Link>
            <Link
              href={deploymentHref}
              {...(deploymentExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="btn-base group bg-accent/88 hover:bg-accent text-white border border-accent/35 shadow-[0_10px_28px_-18px_rgba(79,142,247,0.85),inset_0_1px_0_rgba(255,255,255,0.15)] hover:-translate-y-0.5 transition-all duration-250"
            >
              Launch Workspace
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* ── Mobile trigger ────────────────────────────── */}
          <button
            className="md:hidden p-2.5 rounded-xl text-text-secondary hover:text-text-primary border border-white/10 bg-bg-secondary/40 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile full-screen overlay ───────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-bg-primary/86 backdrop-blur-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(79,142,247,0.16),transparent_35%),radial-gradient(circle_at_78%_80%,rgba(79,142,247,0.1),transparent_40%)]" />

            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative h-full pt-28 pb-8 px-7 flex flex-col"
            >
              <nav className="space-y-1">
                {/* ThemeSwitch removed */}
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = isHome && activeSection === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * idx }}
                      onClick={() => goToSection(item.id)}
                      className={cn(
                        "w-full text-left py-3 text-[1.8rem] leading-tight font-display tracking-[-0.02em] transition-colors",
                        isActive ? "text-text-primary" : "text-text-secondary"
                      )}
                    >
                      <span className={cn(isActive ? "text-gradient" : "")}>{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>

              <div className="mt-auto space-y-3 pt-8 border-t border-white/10">
                <Link
                  href={loginHref}
                  {...(loginExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => setMobileOpen(false)}
                  className="btn-base w-full bg-white/4 border border-white/12 text-text-secondary hover:text-text-primary"
                >
                  Sign In
                </Link>
                <Link
                  href={deploymentHref}
                  {...(deploymentExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => setMobileOpen(false)}
                  className="btn-base w-full bg-accent/90 text-white border border-accent/35 shadow-[0_14px_32px_-20px_rgba(79,142,247,0.8)]"
                >
                  Launch Workspace
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}