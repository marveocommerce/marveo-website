import Link from "next/link";
import Image from "next/image";

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
            <Image
              src="/marveow.png"
              alt="Marveo"
              width={660}
              height={126}
              className="h-auto w-[min(92vw,540px)] transition-all duration-300 contrast-125 saturate-125 drop-shadow-[0_10px_30px_rgba(255,255,255,0.14)] group-hover:[filter:brightness(0)_saturate(100%)_invert(47%)_sepia(93%)_saturate(1840%)_hue-rotate(201deg)_brightness(101%)_contrast(101%)] group-hover:drop-shadow-[0_12px_34px_rgba(37,99,235,0.45)]"
              priority={false}
            />
          </Link>
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