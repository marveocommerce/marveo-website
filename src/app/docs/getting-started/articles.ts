export type GettingStartedArticle = {
  slug: string;
  title: string;
  description: string;
  category: "Getting Started" | "Verification" | "Launch";
  readTime: string;
  overview: string;
  whenToUse: string[];
  steps: string[];
  expectedResult: string;
  troubleshooting: string[];
  relatedLinks: Array<{ label: string; href: string }>;
};

export const GETTING_STARTED_ARTICLES: GettingStartedArticle[] = [
  {
    slug: "choose-your-connection-path",
    title: "Choose Your Connection Path",
    description: "Decide whether your setup should start from WordPress, Next.js, or troubleshooting based on your current stack.",
    category: "Getting Started",
    readTime: "3 min read",
    overview:
      "Start by choosing the right setup path for your team. This avoids sending WordPress teams into frontend steps or Next.js teams into plugin-based instructions.",
    whenToUse: [
      "You are new to Marveo and need to know where to begin.",
      "You are helping a client team choose the right onboarding path.",
    ],
    steps: [
      "Identify whether the current site runs on WordPress or Next.js.",
      "If the site is already live on WordPress, begin with the WordPress help path.",
      "If the site is frontend-led or headless, begin with the Next.js help path.",
      "If setup is already blocked, move directly to troubleshooting.",
    ],
    expectedResult:
      "Your team starts from the correct help path and avoids mismatched setup steps.",
    troubleshooting: [
      "If you are unsure which stack is live, confirm with the team managing deployment.",
      "If the project uses multiple surfaces, start with the production-facing stack first.",
    ],
    relatedLinks: [
      { label: "WordPress Help", href: "/docs/wordpress" },
      { label: "Next.js Help", href: "/docs/nextjs" },
      { label: "Troubleshooting", href: "/docs/troubleshooting" },
    ],
  },
  {
    slug: "connect-your-workspace",
    title: "Connect Your Website to a Workspace",
    description: "Create or open the right Marveo workspace and connect your website before moving into checks and handoff.",
    category: "Getting Started",
    readTime: "4 min read",
    overview:
      "The workspace is the operating layer for onboarding, verification, and launch readiness. Connection should be complete before operational setup begins.",
    whenToUse: [
      "You have chosen your setup path and are ready to connect.",
      "You need to confirm the right workspace is being used before verification.",
    ],
    steps: [
      "Create or open the target Marveo workspace.",
      "Confirm the workspace name and ownership are correct.",
      "Use the relevant WordPress or Next.js connection flow.",
      "Wait for the initial status check to complete.",
    ],
    expectedResult:
      "The site is mapped to the correct workspace and ready for verification checks.",
    troubleshooting: [
      "If the workspace stays pending, confirm you connected the correct site.",
      "If multiple workspaces exist, align on one production workspace before proceeding.",
    ],
    relatedLinks: [
      { label: "Connect Existing WordPress Site", href: "/docs/wordpress/connect-existing-site" },
      { label: "Connect Next.js Site", href: "/docs/nextjs/connect-site" },
    ],
  },
  {
    slug: "run-verification-checks",
    title: "Run Verification and Health Checks",
    description: "Verify the connection, health status, and basic sync behavior before your team moves into operations.",
    category: "Verification",
    readTime: "4 min read",
    overview:
      "Verification is the point where onboarding becomes reliable. Use it to confirm the workspace, connection health, and first sync all behave as expected.",
    whenToUse: [
      "Immediately after the site is connected.",
      "Before support handoff or launch-readiness review.",
    ],
    steps: [
      "Open the workspace status panel.",
      "Confirm the site status shows connected or verified.",
      "Run the basic sync or health check available in the onboarding flow.",
      "Record any warnings before moving to launch readiness.",
    ],
    expectedResult:
      "Your team has a verified setup with enough confidence to proceed into launch preparation.",
    troubleshooting: [
      "If verification fails, move to the troubleshooting section before retrying repeatedly.",
      "If sync is inconsistent, capture timestamps and environment details.",
    ],
    relatedLinks: [
      { label: "Verify WordPress Connection", href: "/docs/wordpress/verify-connection" },
      { label: "Deployment Environment Checklist", href: "/docs/nextjs/deployment-checklist" },
      { label: "Troubleshooting", href: "/docs/troubleshooting" },
    ],
  },
  {
    slug: "prepare-for-launch-readiness",
    title: "Prepare for Launch Readiness",
    description: "Complete the final checks, ownership handoff, and escalation readiness before rollout.",
    category: "Launch",
    readTime: "4 min read",
    overview:
      "Launch readiness is not just a technical check. It also confirms ownership, response paths, and confidence in the environment before rollout.",
    whenToUse: [
      "After verification passes.",
      "Before guided onboarding is marked complete.",
    ],
    steps: [
      "Confirm the site is connected and verified.",
      "Confirm who owns updates, approvals, and support response.",
      "Review launch risks and known blockers.",
      "Escalate anything unresolved before rollout.",
    ],
    expectedResult:
      "The team enters launch with clear ownership, fewer surprises, and a workable escalation path.",
    troubleshooting: [
      "If launch is blocked, do not bypass the blocker with assumptions.",
      "If ownership is unclear, resolve that before rollout.",
    ],
    relatedLinks: [
      { label: "Request Guided Onboarding", href: "/contact?intent=guided-onboarding" },
      { label: "Fix Common Setup Issues", href: "/docs/troubleshooting" },
    ],
  },
];

export function getGettingStartedArticle(slug: string) {
  return GETTING_STARTED_ARTICLES.find((article) => article.slug === slug);
}
