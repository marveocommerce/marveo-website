import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProductPositioning } from "@/components/sections/ProductPositioning";
import { WebsiteTypes } from "@/components/sections/WebsiteTypes";
import { SectorSolutions } from "@/components/sections/SectorSolutions";
import { TemplateMarketplace } from "@/components/sections/TemplateMarketplace";
import { DeploymentFlow } from "@/components/sections/DeploymentFlow";
import { WordPressSync } from "@/components/sections/WordPressSync";
import { WhyMarveo } from "@/components/sections/WhyMarveo";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ProductPositioning />
      <WebsiteTypes />
      <SectorSolutions />
      <TemplateMarketplace />
      <DeploymentFlow />
      <WordPressSync />
      <WhyMarveo />
      <CTASection />
      <Footer />
    </main>
  );
}
