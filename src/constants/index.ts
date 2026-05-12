export const SECTORS = [
  {
    id: "corporate",
    label: "Corporate",
    description: "Professional presence for SMEs, agencies, and consulting firms. Built for trust, clarity, and conversion.",
    templates: 14,
    icon: "Building2",
    tags: ["Homepage", "About", "Services", "Blog"],
    color: "#4F8EF7",
  },
  {
    id: "ecommerce",
    label: "Ecommerce",
    description: "Full commerce infrastructure. Product pages, cart flows, WooCommerce compatibility, and promotional architecture.",
    templates: 21,
    icon: "ShoppingBag",
    tags: ["Product Pages", "Cart", "Checkout", "WooCommerce"],
    color: "#34D399",
  },
  {
    id: "real-estate",
    label: "Real Estate",
    description: "Property listing engines, agent profiles, inquiry flows, and location mapping for modern real estate brands.",
    templates: 11,
    icon: "MapPin",
    tags: ["Listings", "Inquiry", "Agent Profiles", "Maps"],
    color: "#F59E0B",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    description: "HIPAA-conscious clinic websites. Appointment booking, service pages, and provider profiles done right.",
    templates: 9,
    icon: "Heart",
    tags: ["Booking", "Providers", "Services", "Consultation"],
    color: "#EC4899",
  },
  {
    id: "education",
    label: "Education",
    description: "LMS-ready templates for schools, academies, and learning platforms. Course layouts and student onboarding.",
    templates: 8,
    icon: "GraduationCap",
    tags: ["Courses", "Instructors", "LMS", "Onboarding"],
    color: "#A78BFA",
  },
  {
    id: "landing",
    label: "Landing Pages",
    description: "High-conversion single-page experiences. Lead capture, campaign launches, WhatsApp integrations, and CTA-focused layouts.",
    templates: 32,
    icon: "Zap",
    tags: ["Lead Capture", "Campaigns", "WhatsApp", "Events"],
    color: "#FB923C",
  },
];

export const ECOSYSTEM_TYPES = [
  {
    id: "wordpress",
    label: "Traditional WordPress",
    subtitle: "Plugin-powered sync",
    description: "Connect your existing WordPress website through our secure connector plugin. Zero migration required — Marvéo wraps around your existing infrastructure.",
    features: ["Secure plugin connection", "Token-based auth", "Live sync", "No migration needed"],
    icon: "Globe",
    forWho: "Existing WordPress businesses",
  },
  {
    id: "headless",
    label: "Headless WordPress + Next.js",
    subtitle: "Decoupled architecture",
    description: "Connect your headless frontend and WordPress backend into a unified Marvéo management workspace. Full editorial control without config hell.",
    features: ["Frontend + backend sync", "REST / GraphQL support", "ISR management", "Deployment orchestration"],
    icon: "Layers",
    forWho: "Developers and technical teams",
  },
  {
    id: "nextjs",
    label: "Full Next.js Ecosystems",
    subtitle: "API-first integration",
    description: "Integrate your custom Next.js deployment with Marvéo via clean API contracts. Manage deployments, environments, and content from one place.",
    features: ["API-first integration", "Vercel-native", "Environment management", "Deployment tracking"],
    icon: "Code2",
    forWho: "Engineering-led teams",
  },
  {
    id: "multi",
    label: "Multi-Business Deployments",
    subtitle: "Enterprise orchestration",
    description: "Run dozens of client websites from a single Marvéo workspace. Template provisioning, deployment monitoring, and client management at scale.",
    features: ["Multi-client workspace", "Template provisioning", "Centralized monitoring", "Rollback management"],
    icon: "Network",
    forWho: "Agencies and enterprise operators",
  },
];

export const WHY_FEATURES = [
  { icon: "Shield", label: "Security First", description: "Token-based validation and passwordless architecture. No credentials stored." },
  { icon: "Zap", label: "Instant Deployments", description: "Go from setup to live in minutes, not days. Automated provisioning from day one." },
  { icon: "RefreshCw", label: "Fast Rollbacks", description: "Independent deployment pipelines mean you can roll back any environment without touching others." },
  { icon: "Layers", label: "Modular by Design", description: "Every component is reusable and CMS-ready. Build once, deploy anywhere." },
  { icon: "BarChart2", label: "Centralized Ops", description: "One workspace for all clients, all environments, all deployments. No fragmentation." },
  { icon: "Globe", label: "Multi-platform", description: "WordPress, Headless, Next.js, or custom stacks. Marvéo meets your infrastructure where it is." },
];

export const DEPLOYMENT_STEPS = [
  {
    step: "01",
    title: "New Website Users",
    description: "No existing website? Choose a sector template, configure your workspace, and Marvéo deploys a production-grade site in minutes.",
    cta: "Browse Templates",
    icon: "PlusCircle",
  },
  {
    step: "02",
    title: "Existing WordPress Users",
    description: "Install the Marvéo connector plugin. One token. One click. Your WordPress site is instantly manageable from the Marvéo dashboard.",
    cta: "Connect WordPress",
    icon: "PlugZap",
  },
  {
    step: "03",
    title: "Headless WordPress Users",
    description: "Connect your Next.js frontend and WordPress backend. Marvéo unifies them into a single editorial and deployment workspace.",
    cta: "Setup Headless",
    icon: "Layers",
  },
  {
    step: "04",
    title: "Custom Stack Users",
    description: "Using a bespoke backend? Connect via Marvéo's clean API. Manage deployments, track environments, and control releases centrally.",
    cta: "View API Docs",
    icon: "Code2",
  },
];

export const TEMPLATE_PREVIEWS = [
  { id: 1, name: "Nexus Corporate", sector: "Corporate", tags: ["Business", "Agency"], featured: true },
  { id: 2, name: "Cartify Pro", sector: "Ecommerce", tags: ["Retail", "Fashion"], featured: true },
  { id: 3, name: "EstateView", sector: "Real Estate", tags: ["Property", "Listings"], featured: false },
  { id: 4, name: "MedFlow Clinic", sector: "Healthcare", tags: ["Clinic", "Booking"], featured: false },
  { id: 5, name: "AcademiX", sector: "Education", tags: ["LMS", "Courses"], featured: true },
  { id: 6, name: "LaunchBlitz", sector: "Landing Pages", tags: ["Campaign", "Lead Gen"], featured: true },
];
