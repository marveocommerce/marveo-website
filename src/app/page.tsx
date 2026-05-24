"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Bot, CreditCard, MessageCircle } from "lucide-react";

const WAITLIST_STORAGE_KEY = "marveo_waitlist_state";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kind: "waitlist",
          email: trimmedEmail,
          source: "parked-homepage",
          pagePath: "/",
        }),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Unable to join the waiting list right now.");
      }

      setSubmittedEmail(trimmedEmail);
      setEmail("");

      if (typeof window !== "undefined") {
        window.localStorage.setItem(WAITLIST_STORAGE_KEY, "submitted");
      }
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Submission failed. Please retry.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    // Temporary parked homepage. Full website composition is preserved in
    // src/components/marketing/FullWebsiteHomeBackup.tsx for easy restore.
    <main className="relative min-h-screen overflow-hidden bg-[#060b1e] text-text-primary">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_10%,rgba(57,127,255,0.42),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(43,103,226,0.28),transparent_34%),radial-gradient(circle_at_75%_85%,rgba(40,189,255,0.2),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-35" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 py-12 sm:px-8 md:px-10 lg:px-12">
        <div className="w-full rounded-[2rem] border border-white/12 bg-[linear-gradient(132deg,rgba(8,14,36,0.94),rgba(7,13,31,0.9))] p-6 shadow-[0_45px_120px_-48px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-8 md:p-10 lg:p-12">
          <div className="mb-10 flex items-center justify-center gap-4">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/marveow.png"
                alt="Marveo"
                width={660}
                height={126}
                className="h-auto w-[min(72vw,320px)] saturate-125"
                priority
              />
            </Link>
          </div>

          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(10,18,42,0.72),rgba(7,13,30,0.55))] px-5 py-8 text-center sm:px-8">
            <div className="mx-auto mb-4 h-[2px] w-36 rounded-full bg-gradient-to-r from-transparent via-[#4f8ef7] to-transparent" />
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#8dbdff]">Spotlight</p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
              className="heading-hero mt-3 mb-0"
            >
              One Workspace.
              <br className="hidden sm:block" />
              <span className="text-gradient">Every Operation.</span>
            </motion.h1>
            <p className="mx-auto mt-6 max-w-4xl text-[1.02rem] leading-8 text-[#b6c2dd] sm:text-[1.12rem]">
              Marveo is building the operating system for modern commerce. From your website to bookings, enquiries, WhatsApp follow-up, payments, and reports, you run everything from one secure workspace.
            </p>
          </div>

          <div className="mx-auto mt-10 h-px max-w-5xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="mt-10 rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(8,20,48,0.7),rgba(7,14,34,0.55))] px-4 py-6 sm:px-6">
            <div className="mx-auto mb-5 h-[2px] w-28 rounded-full bg-gradient-to-r from-transparent via-[#62b0ff] to-transparent" />
            <p className="mb-4 text-center text-[11px] font-mono uppercase tracking-[0.18em] text-[#8dbdff]">Use Cases</p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Fashion Stylists",
                  subtitle: "Lead capture and lookbook bookings",
                  image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
                },
                {
                  title: "Beauty Professionals",
                  subtitle: "Appointments, enquiries, and client records",
                  image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80",
                },
                {
                  title: "Boutique Brands",
                  subtitle: "Orders, WhatsApp sales, and payments",
                  image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className="overflow-hidden rounded-2xl border border-white/12 bg-[#0c1738]"
                >
                  <div
                    className="h-44 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <div className="p-4 text-left">
                    <p className="text-sm font-semibold text-[#e2ecff]">{item.title}</p>
                    <p className="mt-1 text-xs text-[#aac0e6]">{item.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-10 h-px max-w-5xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="mt-12 rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(7,16,39,0.75),rgba(6,12,30,0.6))] px-4 py-7 text-center sm:px-6">
            <div className="mx-auto mb-4 h-[2px] w-28 rounded-full bg-gradient-to-r from-transparent via-[#6ea9ff] to-transparent" />
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#8dbdff]">Flow Preview</p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="heading-hero mt-2"
            >
              Operational Flow.
              <br className="hidden sm:block" />
              <span className="text-gradient">Live Simulation.</span>
            </motion.h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#c8d5ef] sm:text-[0.98rem]">
              A live preview of how a makeup artist moves from chaos to control when Marveo runs bookings, enquiries, payments, and follow-up from one workspace.
            </p>

            <div className="mt-10">
              <div className="relative mx-auto max-w-5xl px-2 py-2 sm:px-3">
                <div className="relative grid grid-cols-1 gap-4 text-left md:grid-cols-4 md:gap-4">
                  <div className="pointer-events-none absolute bottom-6 left-[13px] top-6 w-px bg-gradient-to-b from-[#4f8ef7]/70 via-[#4f8ef7]/40 to-[#4f8ef7]/10 md:hidden" />

                  <div className="relative mx-auto w-full max-w-none pl-9 md:max-w-[245px] md:pl-0">
                    <span className="absolute left-0 top-4 z-10 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[#4f8ef7]/70 bg-[#4f8ef7]/25 text-[11px] font-semibold text-[#d7e7ff] md:hidden">
                      1
                    </span>
                    <div className="w-full rounded-2xl border border-white/22 bg-white/[0.09] px-5 py-4 backdrop-blur-md md:px-4 md:py-3">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-3.5 w-3.5 text-[#8dc0ff]" />
                        <span className="h-3.5 w-[2px] rounded-full bg-[#8dc0ff]/90 md:hidden" />
                        <p className="text-[11px] font-mono uppercase tracking-[0.13em] text-[#8dc0ff]">Enquiry</p>
                      </div>
                      <span className="text-[10px] text-[#a9bee6]">10:02 AM</span>
                    </div>
                    <p className="text-sm font-medium text-[#e4edff]">Hi, I need bridal makeup for Saturday at 10am. Are you available?</p>
                  </div>
                  </div>

                  <div className="relative mx-auto w-full max-w-none pl-9 md:max-w-[245px] md:pl-0">
                    <span className="absolute left-0 top-4 z-10 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[#4f8ef7]/70 bg-[#4f8ef7]/25 text-[11px] font-semibold text-[#d7e7ff] md:hidden">
                      2
                    </span>
                    <div className="w-full rounded-2xl border border-[#4f8ef7]/40 bg-[#4f8ef7]/14 px-5 py-4 md:px-4 md:py-3">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bot className="h-3.5 w-3.5 text-[#8dc0ff]" />
                        <span className="h-3.5 w-[2px] rounded-full bg-[#8dc0ff]/90 md:hidden" />
                        <p className="text-[11px] font-mono uppercase tracking-[0.13em] text-[#8dc0ff]">Auto Reply</p>
                      </div>
                      <span className="text-[10px] text-[#bad0f5]">10:02 AM</span>
                    </div>
                    <p className="text-sm font-medium text-[#e4edff]">Yes, the slot is open. A deposit link is ready to secure your booking.</p>
                    <p className="mt-2 text-[10px] text-[#bad0f5]">Delivered • AI Assistant</p>
                  </div>
                  </div>

                  <div className="relative mx-auto w-full max-w-none pl-9 md:max-w-[245px] md:pl-0">
                    <span className="absolute left-0 top-4 z-10 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[#4f8ef7]/70 bg-[#4f8ef7]/25 text-[11px] font-semibold text-[#d7e7ff] md:hidden">
                      3
                    </span>
                    <div className="w-full rounded-2xl ring-1 ring-white/18 bg-white/[0.05] px-5 py-4 md:px-4 md:py-3">
                    <div className="mb-2 flex items-center gap-2">
                      <CreditCard className="h-3.5 w-3.5 text-[#8dc0ff]" />
                      <span className="h-3.5 w-[2px] rounded-full bg-[#8dc0ff]/90 md:hidden" />
                      <p className="text-[11px] font-mono uppercase tracking-[0.13em] text-[#8dc0ff]">Payment</p>
                    </div>
                    <p className="text-sm text-[#d7e4ff]">Deposit request sent: NGN 25,000.</p>
                    <div className="mt-2 inline-flex items-center rounded-full bg-amber-300/15 px-2 py-0.5 text-[10px] text-amber-200">
                      Awaiting payment
                    </div>
                  </div>
                  </div>

                  <div className="relative mx-auto w-full max-w-none pl-9 md:max-w-[245px] md:pl-0">
                    <span className="absolute left-0 top-4 z-10 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-emerald-300/70 bg-emerald-300/20 text-[11px] font-semibold text-[#d9fff1] md:hidden">
                      4
                    </span>
                    <div className="w-full rounded-2xl border border-emerald-300/25 bg-emerald-400/10 px-5 py-4 md:px-4 md:py-3">
                    <div className="mb-2 flex items-center gap-2">
                      <BadgeCheck className="h-3.5 w-3.5 text-emerald-200" />
                      <span className="h-3.5 w-[2px] rounded-full bg-emerald-200/90 md:hidden" />
                      <p className="text-[11px] font-mono uppercase tracking-[0.13em] text-emerald-200">Booked</p>
                    </div>
                    <p className="text-sm font-medium text-[#e7fff6]">Booking confirmed. Client notified. Team calendar updated.</p>
                  </div>
                  </div>
                </div>

                <div className="relative mt-5 hidden px-2 py-2 md:block md:px-4">
                  <div className="absolute left-4 right-4 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-[#4f8ef7]/28 via-[#4f8ef7] to-[#4f8ef7]/28" />
                  <div className="relative grid grid-cols-4">
                    {[
                      { label: "Enquiry", icon: MessageCircle },
                      { label: "Auto Reply", icon: Bot },
                      { label: "Payment", icon: CreditCard },
                      { label: "Booked", icon: BadgeCheck },
                    ].map(({ label, icon: Icon }) => (
                      <div key={label} className="flex flex-col items-center gap-1">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4f8ef7] shadow-[0_0_20px_rgba(79,142,247,0.9)]">
                          <Icon className="h-6 w-6 text-white" />
                        </span>
                        <span className="text-lg font-bold tracking-[0.01em] text-[#d3e2fb]">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="mx-auto mt-4 max-w-3xl text-base font-medium leading-7 text-[#c9daf8] sm:text-lg">
              Pain solved: missed bookings, repeated enquiries, payment confusion, and WhatsApp overload. Marveo replaces manual back-and-forth with one connected flow.
            </p>
          </div>

          <div className="mx-auto mt-10 h-px max-w-5xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(10,18,44,0.7),rgba(7,12,28,0.5))] px-4 py-7 text-center sm:px-8">
              <div className="mx-auto mb-4 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-[#74b3ff] to-transparent" />
              <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#8dc0ff]">Early access</p>
              {submittedEmail ? (
                <div className="flex min-h-[20rem] flex-col items-center justify-center text-center">
                  <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-success">You are in</p>
                  <h2 className="mt-3 font-display text-2xl font-700 text-text-primary">Welcome to the early list.</h2>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-[#b6c2dd]">
                    Thank you. We will send early access invites, pilot offers, and launch updates to {submittedEmail}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mx-auto mt-2 max-w-xl space-y-5">
                  <div>
                    <h2 className="heading-hero mt-1">
                      <span className="text-gradient">Join Waiting List.</span>
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[#b6c2dd]">
                      Marveo is not fully open yet. Join the waiting list to secure priority onboarding, pilot pricing, and launch updates.
                    </p>
                  </div>

                  <label className="block text-left">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="name@business.com"
                      className="w-full rounded-2xl bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none ring-1 ring-white/12 transition-colors placeholder:text-[#8ca0c8] focus:bg-white/[0.07] focus:ring-[#4f8ef7]/55"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-base mx-auto w-full sm:w-[78%] border border-[#4f8ef7]/45 bg-[#2e73e6] text-white shadow-[0_20px_48px_-22px_rgba(46,115,230,0.96)] transition-all hover:-translate-y-0.5 hover:bg-[#3c82f2] disabled:cursor-not-allowed disabled:opacity-65"
                  >
                    {submitting ? "Submitting..." : "Join the Waiting List"}
                  </button>

                  {error ? <p className="text-center text-xs text-warning">{error}</p> : null}

                  <p className="text-center text-[11px] text-[#94a7cc]">
                    No spam. Only meaningful launch updates.
                  </p>
                </form>
              )}
          </div>
        </div>
      </section>
    </main>
  );
}
