// ============================================================
// MARVÉO — Central Content Store
// ============================================================
// This is the single source of truth for ALL content on the
// Marvéo website. Edit here; pages read from here.
//
// When Rapheal's Core Engine API is ready, replace each
// export with an async fetch() call — no page files change.
// ============================================================


// ── Sectors ─────────────────────────────────────────────────
export const SECTORS = [
  {
    id: "corporate",
    label: "Corporate",
    description:
      "Professional presence for SMEs, agencies, and consulting firms. Built for trust, clarity, and conversion.",
    templates: 14,
    icon: "Building2",
    tags: ["Homepage", "About", "Services", "Blog"],
    color: "#4F8EF7",
  },
  {
    id: "ecommerce",
    label: "Ecommerce",
    description:
      "Full commerce infrastructure. Product pages, cart flows, WooCommerce compatibility, and promotional architecture.",
    templates: 21,
    icon: "ShoppingBag",
    tags: ["Product Pages", "Cart", "Checkout", "WooCommerce"],
    color: "#34D399",
  },
  {
    id: "real-estate",
    label: "Real Estate",
    description:
      "Property listing engines, agent profiles, inquiry flows, and location mapping for modern real estate brands.",
    templates: 11,
    icon: "MapPin",
    tags: ["Listings", "Inquiry", "Agent Profiles", "Maps"],
    color: "#F59E0B",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    description:
      "HIPAA-conscious clinic websites. Appointment booking, service pages, and provider profiles done right.",
    templates: 9,
    icon: "Heart",
    tags: ["Booking", "Providers", "Services", "Consultation"],
    color: "#EC4899",
  },
  {
    id: "education",
    label: "Education",
    description:
      "LMS-ready templates for schools, academies, and learning platforms. Course layouts and student onboarding.",
    templates: 8,
    icon: "GraduationCap",
    tags: ["Courses", "Instructors", "LMS", "Onboarding"],
    color: "#A78BFA",
  },
  {
    id: "landing",
    label: "Landing Pages",
    description:
      "High-conversion single-page experiences. Lead capture, campaign launches, WhatsApp integrations, and CTA-focused layouts.",
    templates: 32,
    icon: "Zap",
    tags: ["Lead Capture", "Campaigns", "WhatsApp", "Events"],
    color: "#FB923C",
  },
];


// ── Ecosystem / Website Types ────────────────────────────────
export const ECOSYSTEM_TYPES = [
  {
    id: "wordpress",
    label: "Traditional WordPress",
    subtitle: "Plugin-powered sync",
    description:
      "Connect your existing WordPress website through our secure connector plugin. Zero migration required — Marvéo wraps around your existing infrastructure.",
    features: ["Secure plugin connection", "Token-based auth", "Live sync", "No migration needed"],
    icon: "Globe",
    forWho: "Existing WordPress businesses",
  },
  {
    id: "headless",
    label: "Headless WordPress + Next.js",
    subtitle: "Decoupled architecture",
    description:
      "Connect your headless frontend and WordPress backend into a unified Marvéo management workspace. Full editorial control without config hell.",
    features: ["Frontend + backend sync", "REST / GraphQL support", "ISR management", "Deployment orchestration"],
    icon: "Layers",
    forWho: "Developers and technical teams",
  },
  {
    id: "nextjs",
    label: "Full Next.js Ecosystems",
    subtitle: "API-first integration",
    description:
      "Integrate your custom Next.js deployment with Marvéo via clean API contracts. Manage deployments, environments, and content from one place.",
    features: ["API-first integration", "Vercel-native", "Environment management", "Deployment tracking"],
    icon: "Code2",
    forWho: "Engineering-led teams",
  },
  {
    id: "multi",
    label: "Multi-Business Deployments",
    subtitle: "Enterprise orchestration",
    description:
      "Run dozens of client websites from a single Marvéo workspace. Template provisioning, deployment monitoring, and client management at scale.",
    features: ["Multi-client workspace", "Template provisioning", "Centralised monitoring", "Rollback management"],
    icon: "Network",
    forWho: "Agencies and enterprise operators",
  },
];


// ── Templates ────────────────────────────────────────────────
export const TEMPLATE_PREVIEWS = [
  { id: 1,  name: "Nexus Corporate",    sector: "Corporate",     tags: ["Business", "Agency"],     featured: true  },
  { id: 2,  name: "Cartify Pro",        sector: "Ecommerce",     tags: ["Retail", "Fashion"],      featured: true  },
  { id: 3,  name: "EstateView",         sector: "Real Estate",   tags: ["Property", "Listings"],   featured: false },
  { id: 4,  name: "MedFlow Clinic",     sector: "Healthcare",    tags: ["Clinic", "Booking"],      featured: false },
  { id: 5,  name: "AcademiX",           sector: "Education",     tags: ["LMS", "Courses"],         featured: true  },
  { id: 6,  name: "LaunchBlitz",        sector: "Landing Pages", tags: ["Campaign", "Lead Gen"],   featured: true  },
  { id: 7,  name: "AgencyOne",          sector: "Corporate",     tags: ["Agency", "Portfolio"],    featured: false },
  { id: 8,  name: "Prestige",           sector: "Corporate",     tags: ["Consulting", "B2B"],      featured: true  },
  { id: 9,  name: "ShopNova",           sector: "Ecommerce",     tags: ["Fashion", "Shopify"],     featured: false },
  { id: 10, name: "PropElite",          sector: "Real Estate",   tags: ["Luxury", "Listings"],     featured: true  },
  { id: 11, name: "HealthFirst",        sector: "Healthcare",    tags: ["Clinic", "HIPAA"],        featured: false },
  { id: 12, name: "EduSpark",           sector: "Education",     tags: ["Academy", "Online"],      featured: false },
  { id: 13, name: "BlitzPage",          sector: "Landing Pages", tags: ["Ads", "Conversion"],      featured: true  },
  { id: 14, name: "StoreFront Pro",     sector: "Ecommerce",     tags: ["Retail", "WooCommerce"],  featured: false },
  { id: 15, name: "ClinicPlus",         sector: "Healthcare",    tags: ["Hospital", "Booking"],    featured: false },
];


// ── Why Marvéo features ──────────────────────────────────────
export const WHY_FEATURES = [
  { icon: "Shield",    label: "Security First",       description: "Token-based validation and passwordless architecture. No credentials stored." },
  { icon: "Zap",       label: "Instant Deployments",  description: "Go from setup to live in minutes, not days. Automated provisioning from day one." },
  { icon: "RefreshCw", label: "Fast Rollbacks",        description: "Independent deployment pipelines mean you can roll back any environment without touching others." },
  { icon: "Layers",    label: "Modular by Design",    description: "Every component is reusable and CMS-ready. Build once, deploy anywhere." },
  { icon: "BarChart2", label: "Centralized Ops",      description: "One workspace for all clients, all environments, all deployments. No fragmentation." },
  { icon: "Globe",     label: "Multi-platform",       description: "WordPress, Headless, Next.js, or custom stacks. Marvéo meets your infrastructure where it is." },
];


// ── Deployment / Onboarding Steps ────────────────────────────
export const DEPLOYMENT_STEPS = [
  {
    step: "01",
    title: "New Website Users",
    description:
      "No existing website? Choose a sector template, configure your workspace, and Marvéo deploys a production-grade site in minutes.",
    cta: "Browse Templates",
    icon: "PlusCircle",
  },
  {
    step: "02",
    title: "Existing WordPress Users",
    description:
      "Install the Marvéo connector plugin. One token. One click. Your WordPress site is instantly manageable from the Marvéo dashboard.",
    cta: "Connect WordPress",
    icon: "PlugZap",
  },
  {
    step: "03",
    title: "Headless WordPress Users",
    description:
      "Connect your Next.js frontend and WordPress backend. Marvéo unifies them into a single editorial and deployment workspace.",
    cta: "Setup Headless",
    icon: "Layers",
  },
  {
    step: "04",
    title: "Custom Stack Users",
    description:
      "Using a bespoke backend? Connect via Marvéo's clean API. Manage deployments, track environments, and control releases centrally.",
    cta: "View API Docs",
    icon: "Code2",
  },
];


// ── Sector Pain Points ───────────────────────────────────────
// Edit per-sector pain points here. Shown on /solutions/[sector]
export const SECTOR_PAIN_POINTS: Record<string, string[]> = {
  corporate: [
    "Generic templates that look like every other business",
    "Expensive agency builds with long timelines",
    "No easy way to update content without a developer",
  ],
  ecommerce: [
    "WooCommerce setups that take weeks to configure",
    "Disconnected payment and product management",
    "Poor mobile performance hurting conversions",
  ],
  "real-estate": [
    "Property listings that look outdated",
    "Inquiry forms that don't convert",
    "No easy way to manage multiple agent profiles",
  ],
  healthcare: [
    "Clinic websites that feel impersonal and outdated",
    "No integrated appointment booking flow",
    "Compliance concerns with generic templates",
  ],
  education: [
    "LMS setups that are complex and expensive",
    "Poor student onboarding experiences",
    "Disconnected course and instructor management",
  ],
  landing: [
    "Low-converting pages built by non-specialists",
    "Slow load times killing ad campaign ROI",
    "No WhatsApp or lead capture integrations",
  ],
};


// ── Sector Solutions ─────────────────────────────────────────
// Edit per-sector Marvéo solutions here. Shown on /solutions/[sector]
export const SECTOR_SOLUTIONS: Record<string, string[]> = {
  corporate: [
    "Deploy a polished corporate site in under an hour",
    "Full blog and content management through Marvéo",
    "Easy updates without touching code",
  ],
  ecommerce: [
    "WooCommerce-ready templates with pre-built product flows",
    "Centralised inventory, checkout and order management",
    "Conversion-optimised layouts built on real data",
  ],
  "real-estate": [
    "Dynamic property listing engine with filters",
    "Agent profile management from your dashboard",
    "Inquiry routing and CRM-ready contact forms",
  ],
  healthcare: [
    "Appointment booking flows built-in from day one",
    "Provider profiles and service page templates",
    "HIPAA-conscious architecture and data handling",
  ],
  education: [
    "LMS-ready templates with course and module layouts",
    "Student onboarding flows and instructor pages",
    "Integration-ready for Teachable, LearnDash, and more",
  ],
  landing: [
    "High-conversion single-page layouts by specialists",
    "WhatsApp chat, lead forms, and booking integrations",
    "Lightning-fast load times optimised for paid ads",
  ],
};


// ── Pricing Plans ────────────────────────────────────────────
// Edit plan names, prices, and features here.
// Shown on /pricing
export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: { monthly: 29, annual: 23 },
    description: "For small businesses and solo operators launching their first site.",
    features: [
      "1 website workspace",
      "Up to 3 template deployments",
      "WordPress connector plugin",
      "Basic analytics",
      "Standard support",
      "Marvéo subdomain",
    ],
    cta: "Start Free Trial",
    highlighted: false,
    badge: null,
  },
  {
    id: "growth",
    name: "Growth",
    price: { monthly: 79, annual: 63 },
    description: "For growing businesses managing multiple sites and deployments.",
    features: [
      "5 website workspaces",
      "Unlimited template deployments",
      "WordPress + Headless connector",
      "Advanced analytics",
      "Priority support",
      "Custom domain support",
      "GitHub sync",
      "Deployment history & rollbacks",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: { monthly: null, annual: null },
    description: "For agencies and enterprises managing dozens of client deployments.",
    features: [
      "Unlimited workspaces",
      "Unlimited deployments",
      "All connector types",
      "White-label options",
      "Dedicated account manager",
      "SLA guarantee",
      "Custom integrations",
      "Team access controls",
      "Audit logs",
    ],
    cta: "Contact Sales",
    highlighted: false,
    badge: null,
  },
];


// ── Changelog Entries ────────────────────────────────────────
// Add new releases here. Shown on /changelog
export const CHANGELOG_ENTRIES = [
  {
    version: "v1.0.0",
    date: "May 2026",
    tag: "Launch",
    changes: [
      "Initial Marvéo platform launch",
      "WordPress Connector Plugin v1.0",
      "Corporate, Ecommerce, Real Estate templates",
      "Vercel deployment integration",
      "Token-based authentication system",
    ],
  },
  {
    version: "v0.9.0",
    date: "Apr 2026",
    tag: "Beta",
    changes: [
      "Private beta with select agencies",
      "Headless WordPress support added",
      "Template marketplace architecture",
      "GitHub sync integration",
    ],
  },
  {
    version: "v0.5.0",
    date: "Mar 2026",
    tag: "Alpha",
    changes: [
      "Core Engine scaffolded",
      "Initial plugin connection flow",
      "Dashboard UI foundation",
    ],
  },
];


// ── Career Roles ─────────────────────────────────────────────
// Add, edit, or remove open roles here. Shown on /careers
export const CAREER_ROLES = [
  { title: "Senior Frontend Engineer", team: "Engineering",    location: "Remote", type: "Full-time" },
  { title: "Full-Stack Engineer",      team: "Engineering",    location: "Remote", type: "Full-time" },
  { title: "Product Designer",         team: "Design",         location: "Remote", type: "Full-time" },
  { title: "DevOps Engineer",          team: "Infrastructure", location: "Remote", type: "Contract"  },
];


// ── Status Services ──────────────────────────────────────────
// Update statuses here when incidents occur. Shown on /status
export const STATUS_SERVICES = [
  { name: "Marvéo Dashboard",        status: "operational", uptime: "99.98%" },
  { name: "Deployment Engine",       status: "operational", uptime: "99.95%" },
  { name: "WordPress Connector API", status: "operational", uptime: "100%"   },
  { name: "Template CDN",            status: "operational", uptime: "100%"   },
  { name: "Authentication Service",  status: "operational", uptime: "99.99%" },
  { name: "Vercel Edge Network",     status: "operational", uptime: "100%"   },
];


// ── About Page Values ────────────────────────────────────────
// Edit company values here. Shown on /about
export const ABOUT_VALUES = [
  {
    icon: "Target",
    label: "Simplicity first",
    desc: "Every feature exists to remove complexity, not add it. Business owners should not need a developer to update their website.",
  },
  {
    icon: "Zap",
    label: "Speed is a feature",
    desc: "Fast deployment, fast performance, fast iteration. Speed compounds into competitive advantage.",
  },
  {
    icon: "Globe",
    label: "Built for scale",
    desc: "Whether you manage one site or one thousand, the architecture should hold without fragmentation.",
  },
];


// ── Product Layers ───────────────────────────────────────────
// Edit the four Marvéo platform layers here. Shown on /product
export const PRODUCT_LAYERS = [
  {
    icon: "Cpu",
    number: "01",
    name: "Marvéo Core Engine",
    owner: "Infrastructure layer",
    color: "#4F8EF7",
    description:
      "The central brain of the entire ecosystem. Handles deployment orchestration, dynamic provisioning, multi-client architecture, API integrations, and automation workflows.",
    features: [
      "Deployment orchestration",
      "Multi-client architecture",
      "Environment generation",
      "API layer & integrations",
      "Template provisioning system",
      "Licensing & token architecture",
    ],
  },
  {
    icon: "Monitor",
    number: "02",
    name: "Marvéo Client Portal",
    owner: "Frontend platform",
    color: "#34D399",
    description:
      "The modern, lightweight frontend that clients use to manage their websites. Onboarding, workspace setup, content management, media handling, and launch controls.",
    features: [
      "Client onboarding flow",
      "Workspace setup",
      "Plugin connection flow",
      "Content management",
      "Media handling",
      "Launch controls",
    ],
  },
  {
    icon: "Settings",
    number: "03",
    name: "Owner / Admin Backend",
    owner: "Operations portal",
    color: "#F59E0B",
    description:
      "The internal command centre for managing all client deployments, subscriptions, templates, and platform-wide settings at scale.",
    features: [
      "Client management system",
      "Deployment monitoring",
      "Template management",
      "Subscription & license management",
      "Activity logs",
      "API monitoring",
    ],
  },
  {
    icon: "LayoutTemplate",
    number: "04",
    name: "Template Ecosystem",
    owner: "Design layer",
    color: "#A78BFA",
    description:
      "Sector-optimised templates built for real business use cases. Corporate, Ecommerce, Real Estate, Healthcare, Education, and Landing Pages — all deployment-ready.",
    features: [
      "Corporate templates",
      "Ecommerce templates",
      "Real Estate templates",
      "Healthcare templates",
      "Education templates",
      "Landing page templates",
    ],
  },
];


// ── Docs Sections ────────────────────────────────────────────
// Edit documentation categories here. Shown on /docs
export const DOC_SECTIONS = [
  {
    icon: "BookOpen",
    title: "Getting Started",
    desc: "Set up your first workspace, connect your site, and deploy in under 10 minutes.",
    href: "/docs/getting-started",
    label: "New to Marvéo",
  },
  {
    icon: "PlugZap",
    title: "Connector Plugin",
    desc: "Install and configure the WordPress connector plugin. Token setup, GitHub sync, and validation.",
    href: "/docs/plugin",
    label: "WordPress users",
  },
  {
    icon: "Code2",
    title: "API Reference",
    desc: "Full REST API documentation. Authentication, endpoints, webhooks, and code examples.",
    href: "/docs/api",
    label: "Developers",
  },
];


// ── Contact Options ──────────────────────────────────────────
// Edit contact card options here. Shown on /contact
export const CONTACT_OPTIONS = [
  {
    icon: "Calendar",
    label: "Book a Demo",
    desc: "30-minute walkthrough of the Marvéo platform tailored to your use case.",
    action: "Schedule →",
  },
  {
    icon: "MessageSquare",
    label: "General Enquiry",
    desc: "Ask us anything about pricing, integrations, or deployment.",
    action: "Chat →",
  },
  {
    icon: "Mail",
    label: "Email Us",
    desc: "hello@marveo.co — we reply within one business day.",
    action: "Email →",
  },
];
