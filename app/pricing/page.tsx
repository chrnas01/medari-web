import type { Metadata } from "next";
import { Check, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/marketing/Section";
import { QuestionCards } from "@/components/marketing/QuestionCards";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PricingTiers, IncludedList } from "@/components/marketing/PricingTiers";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { PRICING } from "@/lib/content/pricing";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple pricing built for Practices — no per-user fees, every plan includes a 30-day free trial. Growth, Scale and Enterprise plans.",
};

export default function PricingPage() {
  return (
    <>
      <Section eyebrow={PRICING.eyebrow} title={PRICING.title} lead={PRICING.lead} className="pt-28">
        <PricingTiers />
      </Section>

      <Section variant="tint" title="Everything's included" align="center">
        <IncludedList />
      </Section>

      <Section eyebrow="Why Medari?" title={PRICING.why.title} lead={PRICING.why.lead}>
        <QuestionCards questions={PRICING.why.questions} />
      </Section>

      <Section variant="tint" title={PRICING.roi.title} align="center">
        <div className="mx-auto grid max-w-[820px] gap-5 md:grid-cols-2">
          <RoiCard heading="Reduce" items={PRICING.roi.reduce} icon="down" />
          <RoiCard heading="Improve" items={PRICING.roi.improve} icon="up" />
        </div>
      </Section>

      <Section title="Common questions" align="center">
        <FaqAccordion />
      </Section>

      <CtaBand
        heading="Start your 30-day free trial"
        body="See how Medari helps your Practice align workforce capacity with real demand."
        primary={PRIMARY_CTA}
        secondary={SECONDARY_CTA}
      />
    </>
  );
}

function RoiCard({ heading, items, icon }: { heading: string; items: string[]; icon: "up" | "down" }) {
  return (
    <div className="rounded-xl border border-border bg-card p-7">
      <h3 className="mb-4 text-[17px] font-bold text-foreground">{heading}</h3>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[15px] text-muted-foreground">
            {icon === "up" ? (
              <ArrowUpRight className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#15835a]" strokeWidth={2.5} />
            ) : (
              <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary" strokeWidth={2.5} />
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
