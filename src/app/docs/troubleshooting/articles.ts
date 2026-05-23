export type TroubleshootingArticle = {
  slug: string;
  title: string;
  description: string;
  category: "WordPress" | "Next.js" | "Verification" | "Launch";
  readTime: string;
  overview: string;
  whenToUse: string[];
  steps: string[];
  expectedResult: string;
  troubleshooting: string[];
  relatedLinks: Array<{ label: string; href: string }>;
};

export const TROUBLESHOOTING_ARTICLES: TroubleshootingArticle[] = [
  {
    slug: "wordpress-not-verifying",
    title: "WordPress Site Not Verifying",
    description: "Work through the common reasons a WordPress site stays pending or fails verification.",
    category: "WordPress",
    readTime: "4 min read",
    overview:
      "This is usually caused by connector status, workspace targeting, or environment restrictions that block verification from completing cleanly.",
    whenToUse: [
      "The WordPress site is connected but not verified.",
      "The workspace remains pending after setup appears complete.",
    ],
    steps: [
      "Confirm the connector is installed and active.",
      "Confirm the workspace is targeting the correct site.",
      "Confirm the environment allows required outbound requests.",
      "Retry verification after confirming site health.",
    ],
    expectedResult:
      "You either restore verification or isolate the actual blocker before escalation.",
    troubleshooting: [
      "If the status remains pending, review the full WordPress troubleshooting guide.",
      "If hosting restrictions are involved, capture the exact failure point before contacting support.",
    ],
    relatedLinks: [
      { label: "WordPress Connection Troubleshooting", href: "/docs/wordpress/connection-troubleshooting" },
      { label: "Verify WordPress Connection", href: "/docs/wordpress/verify-connection" },
    ],
  },
  {
    slug: "nextjs-pending-connection",
    title: "Next.js Connection Stuck in Pending",
    description: "Check the adapter, environment, and workspace mapping when a Next.js site will not move past pending status.",
    category: "Next.js",
    readTime: "4 min read",
    overview:
      "Pending status usually points to adapter detection issues, environment mismatch, or a workspace mapping problem rather than a UI issue.",
    whenToUse: [
      "The Next.js site never reaches connected or healthy status.",
      "The adapter appears installed but the workspace does not update.",
    ],
    steps: [
      "Confirm the adapter install and version compatibility.",
      "Confirm environment variables are present in the correct environment.",
      "Confirm the workspace is mapped to the intended project.",
      "Compare deployment health between staging and production.",
    ],
    expectedResult:
      "The pending state clears or the root cause is narrowed enough for a precise escalation.",
    troubleshooting: [
      "If builds pass but status stays pending, inspect mapping and runtime config.",
      "If the behavior differs between environments, review parity before retrying.",
    ],
    relatedLinks: [
      { label: "Adapter Troubleshooting", href: "/docs/nextjs/adapter-troubleshooting" },
      { label: "Deployment Environment Checklist", href: "/docs/nextjs/deployment-checklist" },
    ],
  },
  {
    slug: "sync-inconsistencies",
    title: "Sync Appears Inconsistent",
    description: "Handle cases where connection health or sync results appear unstable across checks or environments.",
    category: "Verification",
    readTime: "3 min read",
    overview:
      "Inconsistent sync usually means there is drift between environments, intermittent platform instability, or a retry sequence hiding the root cause.",
    whenToUse: [
      "A setup passes once and fails later.",
      "Checks behave differently between staging and production.",
    ],
    steps: [
      "Capture the exact time of each failed or unstable check.",
      "Compare staging and production settings.",
      "Check platform logs and deployment events around the failures.",
      "Retry only after you record what changed.",
    ],
    expectedResult:
      "The instability pattern becomes clear enough to fix locally or escalate with evidence.",
    troubleshooting: [
      "If the failures are intermittent, avoid repeated blind retries.",
      "If one environment is stable and the other is not, treat that as a parity problem first.",
    ],
    relatedLinks: [
      { label: "Deployment Environment Checklist", href: "/docs/nextjs/deployment-checklist" },
      { label: "Run Verification and Health Checks", href: "/docs/getting-started/run-verification-checks" },
    ],
  },
  {
    slug: "launch-readiness-blocked",
    title: "Launch Readiness Blocked",
    description: "Decide when to escalate instead of pushing forward with unresolved risks or unclear ownership.",
    category: "Launch",
    readTime: "3 min read",
    overview:
      "A blocked launch is usually not a signal to rush. It means a dependency, owner, or verification path still needs to be resolved before rollout.",
    whenToUse: [
      "Verification is incomplete but launch pressure is increasing.",
      "No one is clearly accountable for the blocker.",
    ],
    steps: [
      "List the unresolved blockers clearly.",
      "Identify who owns each blocker and what evidence is missing.",
      "Stop rollout until blockers are classified or accepted.",
      "Escalate with workspace, environment, timestamps, and screenshots.",
    ],
    expectedResult:
      "The team makes a deliberate launch decision instead of guessing through unresolved risk.",
    troubleshooting: [
      "If checks fail twice, escalate instead of normalizing the failure.",
      "If ownership is unclear, resolve responsibility before launch.",
    ],
    relatedLinks: [
      { label: "Prepare for Launch Readiness", href: "/docs/getting-started/prepare-for-launch-readiness" },
      { label: "Request Guided Onboarding", href: "/contact?intent=guided-onboarding" },
    ],
  },
];

export function getTroubleshootingArticle(slug: string) {
  return TROUBLESHOOTING_ARTICLES.find((article) => article.slug === slug);
}
