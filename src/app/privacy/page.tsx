import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Legal"
          title={<>Privacy<br /><span className="text-gradient">Policy.</span></>}
          description="How Marvéo collects, uses, and protects your information."
        />
        <section className="max-w-3xl mx-auto px-6 pb-24">
          <div className="card-surface rounded-2xl p-8 md:p-10 space-y-8 text-text-secondary text-sm leading-relaxed">
            <p className="text-text-muted text-xs font-mono">Last updated: May 2026</p>
            {[
              { title: "1. Information We Collect", body: "We collect information you provide directly to us, such as your name, email address, company name, and payment information when you register for a Marvéo account. We also collect usage data, deployment logs, and technical information about your workspace activity to provide and improve the service." },
              { title: "2. How We Use Your Information", body: "We use your information to operate, maintain, and provide the Marvéo platform; process transactions; send service-related communications; and improve the platform. We do not sell your personal data to third parties." },
              { title: "3. WordPress Connector Plugin", body: "The Marvéo Connector Plugin uses one-time validation tokens for authentication. We do not store or access your WordPress admin credentials. Token access can be revoked at any time from your Marvéo dashboard." },
              { title: "4. Data Storage and Security", body: "Your data is stored on secure, encrypted infrastructure. We use industry-standard security practices including TLS encryption in transit and AES-256 encryption at rest. We undergo regular security reviews." },
              { title: "5. Cookies", body: "We use essential cookies to keep you logged in and remember your preferences. We also use analytics cookies (with your consent) to understand how the platform is used. You can manage cookie preferences in your account settings." },
              { title: "6. Third-Party Services", body: "We use Vercel for hosting, and may use other third-party services for analytics and support. These parties have their own privacy policies and we encourage you to review them." },
              { title: "7. Your Rights", body: "You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at privacy@marveo.co. We will respond within 30 days." },
              { title: "8. Contact", body: "If you have questions about this policy, contact us at privacy@marveo.co or through our contact form." },
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
