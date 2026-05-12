import Link from "next/link";
import { siteConfig } from "@/config/site";

const FOOTER_LINKS = {
  Product: [
    { label: "Overview", href: "/product" },
    { label: "Templates", href: "/templates" },
    { label: "Deployments", href: "/deployments" },
    { label: "Changelog", href: "/changelog" },
    { label: "Pricing", href: "/pricing" },
  ],
  Solutions: [
    { label: "Corporate", href: "/solutions/corporate" },
    { label: "Ecommerce", href: "/solutions/ecommerce" },
    { label: "Real Estate", href: "/solutions/real-estate" },
    { label: "Healthcare", href: "/solutions/healthcare" },
    { label: "Education", href: "/solutions/education" },
  ],
  Developers: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/docs/api" },
    { label: "Connector Plugin", href: "/docs/plugin" },
    { label: "GitHub", href: siteConfig.links.github },
    { label: "Status", href: "/status" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/6 bg-bg-secondary/20 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 rounded-md bg-accent/20 border border-accent/30" />
                <div className="absolute inset-0.5 rounded-[4px] bg-accent/80" />
              </div>
              <span className="font-display font-700 text-text-primary">Marvéo</span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed mb-5">
              The website operating system for modern businesses.
            </p>
            <div className="flex items-center gap-1 text-xs font-mono text-text-muted">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              All systems operational
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <div className="text-xs font-mono font-medium text-text-muted uppercase tracking-widest mb-4">
                {group}
              </div>
              <div className="space-y-2.5">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Marvéo. All rights reserved. Built by Avario.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-xs text-text-muted hover:text-text-secondary transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
