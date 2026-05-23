import Link from "next/link";

const FOOTER_LINKS = {
  Product: [
    { label: "Platform Overview", href: "/product" },
    { label: "Operational Infrastructure", href: "/deployments" },
    { label: "Connected Workspaces", href: "/docs" },
    { label: "Integrations", href: "/docs/api" },
  ],
  Company: [
    { label: "Contact", href: "/contact" },
    { label: "About Marvéo", href: "/about" },
    { label: "Request Demo", href: "/contact?intent=demo" },
  ],
  Resources: [
    { label: "Help Center", href: "/docs" },
    { label: "Deployment Guide", href: "/docs/plugin" },
    { label: "API Reference", href: "/docs/api" },
    { label: "Release Notes", href: "/changelog" },
    { label: "System Health", href: "/status" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/6 bg-bg-secondary/35 pt-16 md:pt-18 pb-10 md:pb-12">
      <div className="container-shell">
        <div className="mb-10 text-center">
          <Link href="/" className="inline-flex flex-col items-center group">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg border border-accent/28 bg-accent/8 shadow-[0_0_24px_rgba(79,142,247,0.18)]" />
                <div className="absolute inset-[6px] rounded-[6px] border border-accent/35" />
                <div className="absolute left-1/2 top-1.5 h-2.5 w-px -translate-x-1/2 bg-accent/50" />
                <div className="absolute left-1/2 bottom-1.5 h-2.5 w-px -translate-x-1/2 bg-accent/50" />
                <div className="absolute left-1.5 top-1/2 h-px w-2.5 -translate-y-1/2 bg-accent/50" />
                <div className="absolute right-1.5 top-1/2 h-px w-2.5 -translate-y-1/2 bg-accent/50" />
                <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/85" />
              </div>
              <h2 className="font-display text-[clamp(2rem,6vw,4.8rem)] leading-[0.95] tracking-[-0.045em] font-800 text-text-primary group-hover:text-accent-bright transition-colors">
                MARVEO
              </h2>
            </div>
            <span className="mt-3 text-helper font-mono text-text-muted">getmarveo.com</span>
          </Link>
          <p className="text-body text-text-secondary max-w-2xl mx-auto mt-4">
            Connected infrastructure for modern commerce operations.
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/18 to-transparent mb-9 md:mb-10" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 md:gap-y-11 mb-10 md:mb-12">
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} className="text-center md:text-left">
              <div className="text-helper font-mono font-medium text-text-muted uppercase tracking-widest mb-4">
                {group}
              </div>
              <div className="space-y-2.5">
                {links.map((link) => (
                  <Link
                    key={`${group}-${link.label}-${link.href}`}
                    href={link.href}
                    className="block text-[15px] text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 md:pt-6 border-t border-white/5">
          <div className="text-center sm:text-left">
            <p className="text-helper text-text-muted">
              &copy; {new Date().getFullYear()} Marvéo. All rights reserved.
            </p>
            <p className="text-helper text-text-muted/80 mt-1">
              Commerce Operations Infrastructure for Modern Businesses.
            </p>
          </div>
          <div className="flex items-center gap-5 text-helper text-text-muted">
            <a
              href="https://getmarveo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-bright transition-colors"
            >
              getmarveo.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}