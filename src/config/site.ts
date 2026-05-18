export const siteConfig = {
  name: "Marvéo",
  tagline: "The Website Operating System",
  description:
    "Deploy, manage, and scale modern websites without heavy technical complexity. Marvéo is the commerce OS for businesses that want more.",
  url: "https://marveo.co",
  ogImage: "/og.png",

  /*
   * appUrl — the external Marvéo platform application.
   * Leave empty ("") while the platform is not yet deployed.
   * Once the platform domain is confirmed and live, update this value.
   *
   * Effect on Navbar:
   *   Empty  → Login goes to /login   | Start Deployment goes to /contact
   *   Set    → Both buttons open the live platform in a new tab
   *
   * Used by: src/components/layout/Navbar.tsx
   */
  appUrl: "",

  links: {
    github:  "https://github.com/marveocommerce",
    twitter: "https://twitter.com/marveo",
    docs:    "/docs",
    avario:  "https://avariodigitals.com/",
  },

  /*
   * nav — desktop and mobile navigation items.
   * Add, remove, or reorder entries here.
   * The Navbar component reads this array automatically.
   */
  nav: [
    { label: "Product",   href: "/product"            },
    { label: "Templates", href: "/templates"           },
    { label: "Solutions", href: "/solutions/corporate" },
    { label: "Docs",      href: "/docs"                },
    { label: "Pricing",   href: "/pricing"             },
  ],
};