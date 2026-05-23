export type WordPressArticle = {
  slug: string;
  title: string;
  description: string;
  category: "Setup" | "Verification" | "Troubleshooting";
  readTime: string;
  overview: string;
  whenToUse: string[];
  steps: string[];
  expectedResult: string;
  troubleshooting: string[];
  relatedSlugs: string[];
};

export const WORDPRESS_ARTICLES: WordPressArticle[] = [
  {
    slug: "connect-existing-site",
    title: "Connect Existing WordPress Site",
    description: "Connect a live WordPress site to Marveo without rebuilding the site or disrupting current operations.",
    category: "Setup",
    readTime: "5 min read",
    overview:
      "Use this guide when your site already runs on WordPress and you want centralized operational visibility in Marveo with minimal disruption.",
    whenToUse: [
      "You already run WordPress in production.",
      "You want centralized operational visibility in Marveo.",
      "You want support-assisted onboarding with minimal disruption.",
    ],
    steps: [
      "Confirm you have WordPress admin access.",
      "Confirm your environment allows approved plugin installation.",
      "Create or open the target workspace in Marveo.",
      "Follow the connector onboarding prompts in Marveo.",
      "Install and activate the Marveo connector in WordPress.",
      "Complete verification in Marveo.",
    ],
    expectedResult:
      "The site appears as connected in Marveo, the workspace status changes to verified, and operational setup can continue.",
    troubleshooting: [
      "If you do not have admin rights, request temporary plugin install access.",
      "If plugin install is blocked, ask the hosting provider to allow plugin deployment.",
      "If verification times out, confirm the site can reach outbound services and retry.",
    ],
    relatedSlugs: ["install-connector", "verify-connection"],
  },
  {
    slug: "install-connector",
    title: "Install Marveo Connector",
    description: "Install and activate the connector that allows WordPress to participate in workspace operations.",
    category: "Setup",
    readTime: "4 min read",
    overview:
      "The connector is the bridge between WordPress and the Marveo workspace. Once active, verification and onboarding can move forward.",
    whenToUse: [
      "You are onboarding WordPress for the first time.",
      "You are moving from manual processes to connected workflows.",
    ],
    steps: [
      "Sign in to WordPress admin.",
      "Open the plugin installation screen.",
      "Upload or install the Marveo connector package from your onboarding flow.",
      "Activate the plugin.",
      "Return to Marveo and continue the connection flow.",
      "Confirm connector status shows active.",
    ],
    expectedResult:
      "The connector is active in WordPress and Marveo can detect it for verification.",
    troubleshooting: [
      "If activation fails, check PHP and WordPress version compatibility.",
      "If the plugin is not visible after install, clear plugin cache and refresh admin.",
      "If permission is denied, verify write access for the plugins directory.",
    ],
    relatedSlugs: ["connect-existing-site", "verify-connection", "connection-troubleshooting"],
  },
  {
    slug: "verify-connection",
    title: "Verify Connection",
    description: "Confirm WordPress and Marveo are connected reliably before operational rollout begins.",
    category: "Verification",
    readTime: "4 min read",
    overview:
      "Run this verification immediately after connector install so your team can move into workflows, permissions, and launch readiness with confidence.",
    whenToUse: [
      "Immediately after connector install.",
      "Before support handoff and launch-readiness checks.",
    ],
    steps: [
      "Open the workspace connection status panel.",
      "Confirm connector status is active.",
      "Confirm workspace status reads verified.",
      "Run a basic sync test from the onboarding flow.",
      "Confirm no critical warnings appear in connection logs.",
    ],
    expectedResult:
      "The connection status is verified, sync checks pass, and the team can proceed to workflows and launch readiness.",
    troubleshooting: [
      "If verified status is missing, re-run the connection step from the workspace.",
      "If sync checks fail, confirm site health and firewall or outbound rules.",
      "If failures are intermittent, capture timestamps and escalate to support.",
    ],
    relatedSlugs: ["install-connector", "connection-troubleshooting"],
  },
  {
    slug: "connection-troubleshooting",
    title: "Connection Troubleshooting",
    description: "Resolve the most common WordPress connection issues before you escalate to support.",
    category: "Troubleshooting",
    readTime: "5 min read",
    overview:
      "Use this when installation looks complete but the workspace does not move to verified status or sync checks are inconsistent.",
    whenToUse: [
      "Connector installation fails.",
      "Workspace does not move to verified state.",
      "Sync checks are inconsistent.",
    ],
    steps: [
      "Confirm the connector is installed and active.",
      "Confirm the workspace target is correct.",
      "Confirm the environment can make outbound requests.",
      "Confirm no plugin conflict is blocking connector actions.",
      "Re-run verification and capture logs.",
    ],
    expectedResult:
      "The root cause is identified and the connection is either verified or escalated with clear diagnostics.",
    troubleshooting: [
      "If status stays pending, the workspace may be mapped incorrectly.",
      "If activation errors appear, check hosting restrictions or environment compatibility.",
      "If sync times out, inspect outbound network policy or provider instability.",
    ],
    relatedSlugs: ["verify-connection", "install-connector"],
  },
];

export function getWordPressArticle(slug: string) {
  return WORDPRESS_ARTICLES.find((article) => article.slug === slug);
}
