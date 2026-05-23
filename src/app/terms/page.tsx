import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Legal"
          title={<>Terms of Use</>}
          description="Terms and conditions for using Marvéo Commerce OS."
        />
        <section className="max-w-3xl mx-auto px-6 pb-24">
          <div className="card-surface rounded-2xl p-8 md:p-10 space-y-8 text-text-secondary text-sm leading-relaxed">
            <p className="text-text-muted text-xs font-mono">Last updated: May 2026</p>
            {[
              {
                title: "1. Platform Access",
                body: "Marvéo provides access to a commerce operations workspace for teams managing WordPress and WooCommerce businesses. Access may be suspended for abuse, unauthorized access attempts, or violation of these terms.",
              },
              {
                title: "2. Account Responsibility",
                body: "You are responsible for the security of your workspace credentials, connector tokens, and user permissions. Tokens should never be shared publicly and should be rotated when needed.",
              },
              {
                title: "3. Acceptable Use",
                body: "You agree not to use Marvéo to distribute malware, abuse APIs, or engage in unlawful activity. We may restrict access to protect platform integrity and customer systems.",
              },
              {
                title: "4. Service Availability",
                body: "Marvéo is provided on an ongoing basis with regular updates. While we aim for high availability, occasional maintenance windows and service interruptions may occur.",
              },
              {
                title: "5. Contact",
                body: "For legal or usage questions, contact support@marveo.co through the contact page.",
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="font-display font-700 text-text-primary mb-3">{section.title}</h2>
                <p>{section.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
