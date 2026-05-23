import { SectionLabel } from "@/components/shared/SectionLabel";
import { GlowOrb } from "@/components/shared/GlowOrb";

interface PageHeroProps {
  label: string;
  title: React.ReactNode;
  description: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-radial-glow" />
      <GlowOrb className="-top-20 left-1/2 -translate-x-1/2" size="lg" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <SectionLabel>{label}</SectionLabel>
        </div>
        <h1 className="heading-section text-text-primary mb-6">
          {title}
        </h1>
        <p className="text-body text-text-secondary max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
}
