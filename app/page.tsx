import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/marketing/Section";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { QuestionCards } from "@/components/marketing/QuestionCards";
import { ComparisonTable } from "@/components/marketing/ComparisonTable";
import { StepList } from "@/components/marketing/StepList";
import { StatBand } from "@/components/marketing/StatBand";
import { CredibilityBand } from "@/components/marketing/CredibilityBand";
import { CtaBand } from "@/components/marketing/CtaBand";
import { DemandCoverageMock } from "@/components/marketing/DemandCoverageMock";
import { TRUST_NOTES } from "@/lib/content/site";
import { HOME } from "@/lib/content/home";

export const metadata: Metadata = {
  title: "Workforce planning built around real demand",
  description:
    "Medari helps Australian medical practices align workforce capacity with real demand — demand forecasting, workforce planning and Best Practice integration.",
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border brand-wash">
        <div className="mx-auto grid max-w-[1160px] items-center gap-14 px-6 py-20 sm:px-8 md:py-24 lg:grid-cols-2">
          <Reveal direction="none">
            <div>
              <h1 className="text-[42px] font-extrabold leading-[1.04] tracking-[-0.03em] text-foreground sm:text-[52px] lg:text-[56px]">
                {HOME.hero.titleLead}
                <span className="brand-gradient-text">{HOME.hero.titleGradient}</span>
              </h1>
              <p className="mt-5 max-w-[480px] text-[19px] leading-[1.55] text-muted-foreground">
                {HOME.hero.subhead}
              </p>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <Button asChild size="lg">
                  <Link href={HOME.hero.primaryCta.href}>{HOME.hero.primaryCta.label}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-input bg-background text-foreground shadow-xs hover:bg-muted hover:text-foreground"
                >
                  <Link href={HOME.hero.secondaryCta.href}>{HOME.hero.secondaryCta.label}</Link>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted-foreground">
                {TRUST_NOTES.map((note) => (
                  <span key={note} className="inline-flex items-center gap-1.5">
                    <span className="h-[7px] w-[7px] rounded-full brand-gradient" />
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <DemandCoverageMock />
        </div>
      </header>

      {/* Planning problem */}
      <Section
        variant="tint"
        eyebrow={HOME.problem.eyebrow}
        title={HOME.problem.title}
        lead={HOME.problem.lead}
      >
        <QuestionCards questions={HOME.problem.questions} />
      </Section>

      {/* Meet Medari */}
      <Section eyebrow={HOME.meet.eyebrow} title={HOME.meet.title} lead={HOME.meet.lead} />

      {/* Capabilities */}
      <Section variant="tint" eyebrow={HOME.capabilities.eyebrow} title={HOME.capabilities.title}>
        <div className="grid gap-5 md:grid-cols-3">
          {HOME.capabilities.items.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <FeatureCard {...c} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Comparison */}
      <Section eyebrow={HOME.comparison.eyebrow} title={HOME.comparison.title}>
        <ComparisonTable content={HOME.comparison.content} />
      </Section>

      {/* How it works */}
      <Section variant="tint" eyebrow={HOME.how.eyebrow} title={HOME.how.title}>
        <StepList steps={HOME.how.steps} />
      </Section>

      {/* ROI */}
      <StatBand heading={HOME.roi.heading} stats={HOME.roi.stats} />

      {/* Credibility */}
      <CredibilityBand heading={HOME.credibility.heading} body={HOME.credibility.body} />

      {/* Pricing teaser */}
      <Section
        variant="tint"
        eyebrow={HOME.pricingTeaser.eyebrow}
        title={HOME.pricingTeaser.title}
        lead={HOME.pricingTeaser.lead}
      >
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/pricing">See full pricing</Link>
          </Button>
        </div>
      </Section>

      {/* Final CTA */}
      <CtaBand
        heading={HOME.finalCta.heading}
        body={HOME.finalCta.body}
        primary={HOME.finalCta.primary}
        secondary={HOME.finalCta.secondary}
      />
    </>
  );
}
