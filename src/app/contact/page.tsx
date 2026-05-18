"use client";

import { useState } from "react";
import { Send, Calendar, MessageSquare, Mail } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { GlowOrb } from "@/components/shared/GlowOrb";
import { CONTACT_OPTIONS } from "@/constants";

const ICONS: Record<string, React.ElementType> = { Calendar, MessageSquare, Mail };

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", type: "demo", message: "" });

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Contact"
          title={<>Let&apos;s get your<br /><span className="text-gradient">website deployed.</span></>}
          description="Book a product demo, ask a question, or get a consultation. Our team responds within 24 hours."
        />
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact options — from constants */}
            <div className="space-y-4">
              {CONTACT_OPTIONS.map((item) => {
                const Icon = ICONS[item.icon];
                return (
                  <div key={item.label} className="card-surface card-surface-hover rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center">
                        {Icon && <Icon className="w-4 h-4 text-accent" />}
                      </div>
                      <span className="font-display font-600 text-text-primary text-sm">{item.label}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed mb-3">{item.desc}</p>
                    <span className="text-xs font-medium text-accent">{item.action}</span>
                  </div>
                );
              })}
            </div>

            {/* Form */}
            <div className="lg:col-span-2 relative">
              <GlowOrb className="-top-10 right-0" size="sm" />
              <div className="card-surface border-glow rounded-2xl p-8 relative">
                {sent ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 rounded-2xl bg-success/15 border border-success/25 flex items-center justify-center mx-auto mb-5">
                      <Send className="w-6 h-6 text-success" />
                    </div>
                    <h3 className="font-display text-xl font-700 text-text-primary mb-2">Message sent!</h3>
                    <p className="text-text-secondary text-sm">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { key: "name",    label: "Full Name",     type: "text",  placeholder: "Your name",       span: false },
                        { key: "email",   label: "Email Address", type: "email", placeholder: "you@company.com", span: false },
                        { key: "company", label: "Company",       type: "text",  placeholder: "Company name",    span: true  },
                      ].map((field) => (
                        <div key={field.key} className={field.span ? "sm:col-span-2" : ""}>
                          <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                            {field.label}
                          </label>
                          <input type={field.type} placeholder={field.placeholder}
                            value={form[field.key as keyof typeof form]}
                            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                            className="w-full px-4 py-3 bg-bg-card border border-white/8 rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 font-body transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">I want to</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["demo", "question", "pricing", "partnership"].map((t) => (
                          <button key={t} onClick={() => setForm({ ...form, type: t })}
                            className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all capitalize ${
                              form.type === t
                                ? "bg-accent/15 text-accent border-accent/25"
                                : "bg-white/3 text-text-muted border-white/7 hover:text-text-secondary"
                            }`}>
                            {t === "demo" ? "Book a demo" : t === "question" ? "Ask something" : t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Message</label>
                      <textarea rows={4} placeholder="Tell us about your project..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 bg-bg-card border border-white/8 rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 font-body resize-none transition-colors"
                      />
                    </div>
                    <button onClick={() => setSent(true)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-bright text-white font-semibold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(79,142,247,0.3)]">
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
