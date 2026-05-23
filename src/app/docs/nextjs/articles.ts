export type NextJsArticle = {
  slug: string;
  title: string;
  description: string;
  category: "Setup" | "Operations" | "Troubleshooting";
  readTime: string;
  overview: string;
  whenToUse: string[];
  steps: string[];
  expectedResult: string;
  troubleshooting: string[];
  relatedSlugs: string[];
};

export const NEXTJS_ARTICLES: NextJsArticle[] = [
  {
    slug: "install-adapter",
    title: "Install Next.js Adapter",
    description: "Set up the Marveo adapter so your Next.js project can connect to workspace operations.",
    category: "Setup",
    readTime: "4 min read",
    overview:
      "Use the adapter to connect your frontend project to Marveo without changing how your team builds and ships the site.",
    whenToUse: [
      "You have a Next.js site that needs Marveo-managed operations.",
      "You are onboarding a headless or frontend-led stack.",
    ],
    steps: [
      "Confirm the project is running in a supported Next.js environment.",
      "Add the Marveo adapter package from your onboarding instructions.",
      "Apply the required adapter settings from the onboarding checklist.",
      "Run a local validation pass before connecting the workspace.",
      "Connect the project to the correct Marveo workspace.",
    ],
    expectedResult:
      "The adapter is detected by Marveo and the workspace can track core operational state for the site.",
    troubleshooting: [
      "Build errors after install usually point to package version mismatch.",
      "If the adapter is not detected, re-check the config path and environment values.",
      "If runtime behavior looks inconsistent, validate Node and Next.js versions with support.",
    ],
    relatedSlugs: ["connect-site", "adapter-troubleshooting"],
  },
  {
    slug: "connect-site",
    title: "Connect Next.js Site",
    description: "Map your project to the right workspace so connection health and rollout checks can begin.",
    category: "Setup",
    readTime: "5 min read",
    overview:
      "Once the adapter is in place, connect the project to Marveo so onboarding, launch checks, and operational visibility all live in one workspace.",
    whenToUse: [
      "You are onboarding a production Next.js site.",
      "You need support-assisted setup for a frontend-led workflow.",
    ],
    steps: [
      "Prepare the target workspace in Marveo.",
      "Confirm adapter installation and baseline configuration.",
      "Start the connection flow inside Marveo.",
      "Validate the connection status and first sync.",
      "Complete the operational handoff checklist.",
    ],
    expectedResult:
      "The site appears connected and healthy in Marveo, and your team can move into rollout and launch readiness.",
    troubleshooting: [
      "If the connection stays pending, check adapter registration and workspace mapping.",
      "If sync fails, verify environment variables and deployment health.",
      "If the status is unstable, collect logs with timestamps before escalating.",
    ],
    relatedSlugs: ["install-adapter", "deployment-checklist", "adapter-troubleshooting"],
  },
  {
    slug: "editable-content",
    title: "Editable Content Guide",
    description: "Decide what non-technical teams can update safely without pushing code for every change.",
    category: "Operations",
    readTime: "4 min read",
    overview:
      "Set clear content boundaries so operators can make routine updates while developers retain control over structure and logic.",
    whenToUse: [
      "Content owners need controlled updates without code releases.",
      "You are preparing an operational ownership handoff.",
    ],
    steps: [
      "Identify which pages and sections should be operator-editable.",
      "Separate content fields from structural code.",
      "Define ownership rules for who can edit what.",
      "Document approval flow for high-impact content changes.",
      "Validate the update path in staging before rollout.",
    ],
    expectedResult:
      "Operators can safely update approved content areas and developers are not pulled into every routine change.",
    troubleshooting: [
      "If content is not updating, inspect cache and revalidation behavior.",
      "If the wrong section changes, tighten content ownership mapping.",
      "If publishing feels slow, review approval and release sequencing.",
    ],
    relatedSlugs: ["revalidation", "forms-enquiries"],
  },
  {
    slug: "forms-enquiries",
    title: "Forms and Enquiries Guide",
    description: "Set up a predictable path for contact forms and inbound enquiries so nothing disappears into a gap.",
    category: "Operations",
    readTime: "4 min read",
    overview:
      "Treat forms as operational workflows, not just site elements, so every submission reaches the right person with the right timing.",
    whenToUse: [
      "You are setting up lead capture or contact forms.",
      "Support needs a clear handoff path for incoming enquiries.",
    ],
    steps: [
      "List each form and the workflow it should trigger.",
      "Define required fields and validation rules.",
      "Assign response ownership and target response times.",
      "Confirm the acknowledgement message shown to the end user.",
      "Test the full form flow end-to-end in staging.",
    ],
    expectedResult:
      "Form submissions are captured consistently and the operational owner can track and respond reliably.",
    troubleshooting: [
      "If submissions are missing, verify the workflow destination mapping.",
      "If duplicates appear, review retry behavior and client-side submit handling.",
      "If responses are delayed, review ownership and SLA setup.",
    ],
    relatedSlugs: ["editable-content", "deployment-checklist"],
  },
  {
    slug: "revalidation",
    title: "Revalidation Guide",
    description: "Keep content freshness predictable so teams know when updates will appear in production.",
    category: "Operations",
    readTime: "3 min read",
    overview:
      "Define a clear refresh strategy before teams start editing content, especially on pages where timing matters operationally.",
    whenToUse: [
      "Content appears stale after updates.",
      "Teams need clear expectations for refresh behavior.",
    ],
    steps: [
      "Identify which pages need frequent refresh.",
      "Set a target freshness expectation by page type.",
      "Choose a revalidation approach that matches your deployment model.",
      "Test update propagation in staging.",
      "Document rollback behavior for failed updates.",
    ],
    expectedResult:
      "Content freshness becomes predictable and teams understand when updates should appear in production.",
    troubleshooting: [
      "If content stays stale, validate cache behavior and revalidation triggers.",
      "If pages over-refresh, review the strategy for high-traffic routes.",
      "If environments differ, compare staging and production parity.",
    ],
    relatedSlugs: ["editable-content", "deployment-checklist"],
  },
  {
    slug: "adapter-troubleshooting",
    title: "Adapter Troubleshooting",
    description: "Work through the most common adapter and connection issues before escalating to support.",
    category: "Troubleshooting",
    readTime: "5 min read",
    overview:
      "Use this guide when the adapter appears to be installed correctly but connection health still looks wrong inside Marveo.",
    whenToUse: [
      "The adapter appears installed but the workspace remains disconnected.",
      "Deployments succeed but operational status is unhealthy.",
    ],
    steps: [
      "Confirm the adapter version is compatible with the project.",
      "Confirm required environment variables are set correctly.",
      "Confirm workspace mapping points to the intended project.",
      "Confirm deployment health and runtime parity.",
      "Retry verification and capture logs before escalation.",
    ],
    expectedResult:
      "The root cause is either resolved locally or isolated with enough detail for a fast escalation.",
    troubleshooting: [
      "If builds pass but status fails, suspect mapping or runtime config mismatch.",
      "If health is intermittent, look for deployment instability or environment drift.",
      "If the disconnect is persistent, confirm adapter registration reached the target environment.",
    ],
    relatedSlugs: ["install-adapter", "connect-site", "deployment-checklist"],
  },
  {
    slug: "deployment-checklist",
    title: "Deployment Environment Checklist",
    description: "Check staging and production parity before onboarding, verification, or launch sign-off.",
    category: "Troubleshooting",
    readTime: "4 min read",
    overview:
      "Most onboarding issues come from environment drift. Use this checklist before final verification so staging and production behave the same way.",
    whenToUse: [
      "Before final connection verification.",
      "Before launch-readiness sign-off.",
      "After major environment changes.",
    ],
    steps: [
      "Align Node, Next.js, and adapter versions across environments.",
      "Confirm required environment variables are present everywhere.",
      "Verify domains, routing, build commands, and start commands.",
      "Confirm observability and log access for each environment.",
      "Run connection, content, forms, and rollback validation before sign-off.",
    ],
    expectedResult:
      "Deployment behavior is predictable and environment-related surprises are reduced before launch.",
    troubleshooting: [
      "If staging and production drift, align runtime and config first.",
      "If staging works but production fails, compare environment variables and routing.",
      "If failures are intermittent, review deployment events and platform logs.",
    ],
    relatedSlugs: ["connect-site", "revalidation", "adapter-troubleshooting"],
  },
];

export function getNextJsArticle(slug: string) {
  return NEXTJS_ARTICLES.find((article) => article.slug === slug);
}
