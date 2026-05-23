"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, Sparkles, X } from "lucide-react";
import { trackEvent, trackLead } from "@/lib/analytics";

const STORAGE_KEY = "marveo_waitlist_state";

type WaitlistState = "hidden" | "open" | "success";

export function WaitingListPopup() {
  const [state, setState] = useState<WaitlistState>("hidden");
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const emailLabel = useMemo(() => {
    if (submittedEmail) {
      return submittedEmail;
    }

    return "your email";
  }, [submittedEmail]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedState = window.localStorage.getItem(STORAGE_KEY);

    if (storedState === "dismissed" || storedState === "submitted") {
      return;
    }

    const timer = window.setTimeout(() => {
      setState("open");
    }, 2200);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state !== "open" || typeof document === "undefined") {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state]);

  function handleClose() {
    setState("hidden");

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "dismissed");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kind: "waitlist",
          email: trimmedEmail,
          source: "waiting-list-popup",
          pagePath: typeof window !== "undefined" ? window.location.pathname : "/",
        }),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Unable to submit waiting list request.");
      }

      trackLead("waitlist", { source: "popup" });
      trackEvent("waitlist_signup_submitted", { source: "popup" });

      setSubmittedEmail(trimmedEmail);
      setState("success");

      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, "submitted");
      }
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Submission failed. Please retry.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {state !== "hidden" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center px-4 py-4 sm:items-center sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            aria-label="Close waiting list popup"
            type="button"
            className="absolute inset-0 bg-bg-primary/72 backdrop-blur-md"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-title"
            aria-describedby="waitlist-description"
            initial={{ y: 28, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.985 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,15,30,0.96),rgba(10,10,20,0.92))] shadow-[0_30px_100px_-44px_rgba(0,0,0,0.92)]"
          >
            <div className="absolute inset-0 grid-bg opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-transparent" />
            <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-accent/12 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-success/10 blur-3xl" />

            <div className="relative grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 sm:p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.16em] text-accent-bright">
                  <Sparkles className="h-3.5 w-3.5" />
                  Early Access
                </div>

                <h2 id="waitlist-title" className="font-display text-3xl sm:text-4xl font-800 tracking-tight text-text-primary">
                  Join the waiting list
                </h2>
                <p id="waitlist-description" className="mt-4 max-w-md text-body text-text-secondary">
                  Be first to access Marvéo&apos;s operational platform as it opens up to more teams.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Launch access and product updates",
                    "Operational platform improvements as they ship",
                    "Priority access before the wider rollout",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                  <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-text-muted">
                    What you&apos;ll get
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    A direct path into the platform, with launch notes and access updates delivered as the system evolves.
                  </p>
                </div>
              </div>

              <div className="relative p-6 sm:p-8 md:p-10">
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-muted transition-colors hover:bg-white/10 hover:text-text-primary"
                  aria-label="Close popup"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="rounded-[1.5rem] border border-white/10 bg-bg-card/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                  {state === "open" ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-text-muted">
                          Email capture
                        </p>
                        <h3 className="mt-2 font-display text-xl font-700 text-text-primary">
                          Get on the list instantly.
                        </h3>
                      </div>

                      <label className="block">
                        <span className="mb-2 block text-sm text-text-secondary">Email address</span>
                        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 transition-colors focus-within:border-accent/35 focus-within:bg-white/[0.05]">
                          <Mail className="h-4 w-4 shrink-0 text-text-muted" />
                          <input
                            type="email"
                            required
                            autoFocus
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="name@company.com"
                            className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                          />
                        </div>
                      </label>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-base group w-full bg-accent hover:bg-accent-bright text-white border border-accent/35 shadow-[0_18px_42px_-26px_rgba(79,142,247,0.9)] hover:-translate-y-0.5"
                      >
                        {submitting ? "Submitting..." : "Join the waiting list"}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </button>

                      {error ? <p className="text-center text-xs text-warning">{error}</p> : null}

                      <p className="text-center text-xs text-text-muted">
                        No clutter. No spam. Just launch access.
                      </p>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex min-h-[18rem] flex-col justify-center text-center"
                    >
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-success/20 bg-success/10 text-success">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-text-muted">
                        Submitted
                      </p>
                      <h3 className="mt-3 font-display text-2xl font-700 text-text-primary">
                        You&apos;re on the list.
                      </h3>
                      <p className="mt-3 text-sm text-text-secondary">
                        We&apos;ll keep you updated at {emailLabel} as Marvéo opens access.
                      </p>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="btn-base mt-6 bg-white/5 hover:bg-white/10 border border-white/10 text-text-primary"
                      >
                        Close
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}