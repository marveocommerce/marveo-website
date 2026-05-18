export const siteConfig = {
  name: "Marvéo",
  tagline: "The Website Operating System",
  description:
    "Deploy, manage, and scale modern websites without heavy technical complexity. Marvéo is the commerce OS for businesses that want more.",
  url: "https://marveo.co",
  ogImage: "/og.png",

  /*
   * appUrl — the external Marvéo application (Rapheal's Core Engine).
   * Update this once the app domain is live.
   * Used by: Navbar Login + Start Deployment CTAs
   */
  appUrl: "https://app.marveo.co",

  links: {
    github:  "https://github.com/marveocommerce",
    twitter: "https://twitter.com/marveo",
    docs:    "/docs",
    avario:  "https://avariodigitals.com/",
  },

  /*
   * nav — desktop + mobile navigation items.
   * Add, remove, or reorder here; Navbar picks them up automatically.
   */
  nav: [
    { label: "Product",   href: "/product"   },
    { label: "Templates", href: "/templates" },
    { label: "Solutions", href: "/solutions/corporate" },
    { label: "Docs",      href: "/docs"      },
    { label: "Pricing",   href: "/pricing"   },
  ],
};
