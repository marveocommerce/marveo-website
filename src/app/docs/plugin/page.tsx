import Link from "next/link";
import { PlugZap, Power, KeyRound, RefreshCw, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";

const STEPS = [
  {
    icon: Power,
    step: "01",
    title: "Activate Connector",
    desc: "Initialize a secure operational connection between your commerce environment and Marvéo.",
  },
  {
    icon: PlugZap,
    step: "02",
    title: "Connect Existing Environment",
    desc: "Link your existing operational environment into the Marvéo workspace securely.",
  },
  {
    icon: KeyRound,
    step: "03",
    title: "Verify Operational Access",
    desc: "Authorize secure infrastructure access through isolated token-based verification workflows.",
  },
  {
    icon: RefreshCw,
    step: "04",
    title: "Enable Deployment Sync",
    desc: "Enable synchronized deployment workflows and operational updates across connected environments.",
  },
];

export default function PluginDocsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Operational Onboarding"
          title={<>Connect Existing Infrastructure<br /><span className="text-gradient">in minutes.</span></>}
          description="Securely connect existing commerce environments into Marvéo using a token-based operational connection workflow designed for scalable infrastructure management."
        />
        <section className="max-w-3xl mx-auto px-6 pb-24">
          <div className="space-y-4 mb-12">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="group card-surface rounded-2xl p-6 flex items-start gap-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/24 hover:shadow-[0_16px_40px_-30px_rgba(79,142,247,0.7)]">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-text-muted mb-1">Step {step.step}</div>
                    <h3 className="font-display font-600 text-text-primary mb-1">{step.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="card-surface border-glow rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="font-semibold text-text-primary text-sm">Secure Operational Connection</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Marvéo uses isolated token-based verification workflows designed for secure infrastructure connection and operational access management.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Link href="/pricing"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-bright text-white font-semibold text-sm rounded-xl transition-all">
              Connect Infrastructure →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
