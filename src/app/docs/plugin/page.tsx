import Link from "next/link";
import { PlugZap, Download, Key, GitBranch, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";

const STEPS = [
  { icon: Download, step: "01", title: "Download the plugin",  desc: "Download the Marvéo Connector Plugin from your Marvéo dashboard or the activation page." },
  { icon: PlugZap,  step: "02", title: "Install on WordPress", desc: "Upload and activate the plugin from your WordPress Plugins page. No configuration needed yet." },
  { icon: Key,      step: "03", title: "Enter your token",     desc: "Navigate to the activation URL. Enter your one-time validation token from the Marvéo dashboard." },
  { icon: GitBranch,step: "04", title: "GitHub sync (optional)", desc: "Connect your repository to enable auto-updates whenever you push to GitHub." },
];

export default function PluginDocsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Connector Plugin"
          title={<>Connect WordPress<br /><span className="text-gradient">in four steps.</span></>}
          description="The Marvéo Connector Plugin links your existing WordPress site to the Marvéo dashboard securely, using a one-time validation token. No credentials required."
        />
        <section className="max-w-3xl mx-auto px-6 pb-24">
          <div className="space-y-4 mb-12">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="card-surface rounded-2xl p-6 flex items-start gap-5">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
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
              <span className="font-semibold text-text-primary text-sm">Security note</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Marvéo uses a one-time validation token system. We never store or ask for your WordPress username or password. Tokens can be revoked from your dashboard at any time.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Link href="/setup/activate"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-bright text-white font-semibold text-sm rounded-xl transition-all">
              Get your activation token →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
