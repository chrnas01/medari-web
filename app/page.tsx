import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";
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
import { MediaPlaceholder } from "@/components/marketing/MediaPlaceholder";
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

      {/* Best Practice integration */}
      <Section variant="white">
        <Reveal>
          <div className="grid items-center gap-8 rounded-2xl border border-border bg-card p-7 shadow-[0_1px_2px_rgba(20,33,51,0.06)] lg:grid-cols-[0.8fr_1fr] lg:gap-12 lg:p-10">
            <MediaPlaceholder kind="logo" label={HOME.integration.logoLabel} aspect="3/2" />
            <div>
              <div className="mb-3 text-[13px] font-bold uppercase tracking-[0.07em] text-accent">
                {HOME.integration.eyebrow}
              </div>
              <h2 className="text-[26px] font-extrabold leading-[1.12] tracking-[-0.02em] text-foreground sm:text-[30px]">
                {HOME.integration.title}
              </h2>
              <p className="mt-3 text-[16px] leading-[1.6] text-muted-foreground">
                {HOME.integration.lead}
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {HOME.integration.points.map((p) => (
                  <li key={p} className="inline-flex items-center gap-2 text-[14px] text-foreground/90">
                    <Check className="h-[18px] w-[18px] shrink-0 text-[#15835a]" strokeWidth={2.5} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

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

      {/* Product preview */}
      <Section
        variant="tint"
        eyebrow={HOME.preview.eyebrow}
        title={HOME.preview.title}
        lead={HOME.preview.lead}
      >
        <Reveal>
          <div className="mx-auto max-w-[960px] rounded-2xl border border-border bg-card p-2 shadow-[0_8px_16px_rgba(20,33,51,0.08),0_24px_48px_rgba(20,33,51,0.14)]">
            <MediaPlaceholder
              kind="image"
              label={HOME.preview.imageLabel}
              note={HOME.preview.imageNote}
              aspect="16/9"
              className="rounded-xl border-0 bg-muted"
            />
          </div>
        </Reveal>
      </Section>

      {/* Capabilities */}
      <Section eyebrow={HOME.capabilities.eyebrow} title={HOME.capabilities.title}>
        <div className="grid gap-5 md:grid-cols-3">
          {HOME.capabilities.items.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <FeatureCard {...c} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Comparison */}
      <Section variant="tint" eyebrow={HOME.comparison.eyebrow} title={HOME.comparison.title}>
        <ComparisonTable content={HOME.comparison.content} />
      </Section>

      {/* How it works */}
      <Section eyebrow={HOME.how.eyebrow} title={HOME.how.title}>
        <StepList steps={HOME.how.steps} />
      </Section>

      {/* Demo video */}
      <Section
        variant="tint"
        eyebrow={HOME.video.eyebrow}
        title={HOME.video.title}
        lead={HOME.video.lead}
      >
        <Reveal>
          <div className="mx-auto max-w-[860px]">
            <MediaPlaceholder
              kind="video"
              label={HOME.video.videoLabel}
              note={HOME.video.videoNote}
              aspect="16/9"
            />
          </div>
        </Reveal>
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
