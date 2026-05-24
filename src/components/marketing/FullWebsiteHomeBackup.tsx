import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProductPositioning } from "@/components/sections/ProductPositioning";
import { WebsiteTypes } from "@/components/sections/WebsiteTypes";
import { SectorSolutions } from "@/components/sections/SectorSolutions";
import { TemplateMarketplace } from "@/components/sections/TemplateMarketplace";
import { DeploymentFlow } from "@/components/sections/DeploymentFlow";
import { WordPressSync } from "@/components/sections/WordPressSync";
import { ProductRoadmap } from "@/components/sections/ProductRoadmap";
import { WhyMarveo } from "@/components/sections/WhyMarveo";
import { CTASection } from "@/components/sections/CTASection";

// Temporary backup of the full public homepage while parked mode is active.
export function FullWebsiteHomeBackup() {
  return (
    <main className="relative">
      <Navbar />
      <section id="platform" className="scroll-mt-28">
        <Hero />
      </section>
      <SectorSolutions />
      <ProductPositioning />
      <section id="integrations" className="scroll-mt-28">
        <WebsiteTypes />
      </section>
      <section id="infrastructure" className="scroll-mt-28">
        <DeploymentFlow />
      </section>
      <TemplateMarketplace />
      <WordPressSync />
      <section id="capabilities" className="scroll-mt-28">
        <ProductRoadmap />
      </section>
      <WhyMarveo />
      <section id="enterprise" className="scroll-mt-28">
        <CTASection />
      </section>
      <Footer />
    </main>
  );
}
