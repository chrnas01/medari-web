import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/marketing/Section";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { ComparisonTable } from "@/components/marketing/ComparisonTable";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PRODUCT } from "@/lib/content/product";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Medari is a workforce planning and operational intelligence platform for healthcare — demand forecasting, workforce planning, session and room planning, and Best Practice integration.",
};

export default function ProductPage() {
  return (
    <>
      <Section eyebrow={PRODUCT.hero.eyebrow} title={PRODUCT.hero.title} lead={PRODUCT.hero.lead} className="pt-28" />

      <Section variant="tint" eyebrow={PRODUCT.problem.eyebrow} title={PRODUCT.problem.title} lead={PRODUCT.problem.lead}>
        <div className="mx-auto grid max-w-[820px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT.problem.consequences.map((c) => (
            <div key={c} className="rounded-xl border border-border bg-card p-5 text-[15px] text-muted-foreground">
              {c}
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow={PRODUCT.what.eyebrow} title={PRODUCT.what.title} lead={PRODUCT.what.lead} />

      <Section variant="tint" eyebrow={PRODUCT.capabilities.eyebrow} title={PRODUCT.capabilities.title}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT.capabilities.items.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <FeatureCard {...c} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow={PRODUCT.comparison.eyebrow} title={PRODUCT.comparison.title}>
        <ComparisonTable content={PRODUCT.comparison.content} />
      </Section>

      <Section variant="tint" eyebrow={PRODUCT.outcomes.eyebrow} title={PRODUCT.outcomes.title}>
        <ul className="mx-auto grid max-w-[820px] gap-3 sm:grid-cols-2">
          {PRODUCT.outcomes.items.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-[15px] text-foreground">
              <Check className="h-[18px] w-[18px] shrink-0 text-[#15835a]" strokeWidth={2.5} />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={PRODUCT.goal.title} lead={PRODUCT.goal.lead} align="center" />

      <CtaBand
        heading="See Medari on your Practice's data"
        body="Book a 20-minute demo — no obligation."
        primary={PRIMARY_CTA}
        secondary={SECONDARY_CTA}
      />
    </>
  );
}
