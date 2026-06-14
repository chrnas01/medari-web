import type { Metadata } from "next";
import { Section } from "@/components/marketing/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ABOUT } from "@/lib/content/about";
import { PRIMARY_CTA } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Medari was built from real conversations with Australian healthcare teams — workforce planning developed alongside the Practices that use it.",
};

export default function AboutPage() {
  return (
    <>
      <Section eyebrow={ABOUT.hero.eyebrow} title={ABOUT.hero.title} lead={ABOUT.hero.lead} align="start" className="pt-28" />

      <Section variant="tint" eyebrow={ABOUT.problem.eyebrow} title={ABOUT.problem.title} lead={ABOUT.problem.lead} align="start">
        <div className="grid gap-4 sm:grid-cols-2">
          {ABOUT.problem.roles.map((r) => (
            <div key={r.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-1.5 text-[16px] font-bold text-foreground">{r.title}</h3>
              <p className="text-[14px] leading-[1.5] text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow={ABOUT.why.eyebrow} title={ABOUT.why.title} lead={ABOUT.why.body} align="start" />

      <Section variant="tint" eyebrow={ABOUT.believe.eyebrow} title={ABOUT.believe.title} align="start">
        <ul className="flex flex-col gap-4">
          {ABOUT.believe.items.map((item) => (
            <li key={item} className="border-l-2 border-primary pl-4 text-[17px] leading-[1.55] text-foreground">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow={ABOUT.how.eyebrow} title={ABOUT.how.title} lead={ABOUT.how.lead} align="start">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT.how.outcomes.map((o) => (
            <div key={o.who} className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="text-[17px] font-bold text-foreground">{o.who}</div>
              <div className="mt-1 text-[14px] text-muted-foreground">{o.what}</div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        heading="If you believe healthcare teams deserve better tools, we'd love to hear from you."
        body="Whether you're a practice manager, owner, or someone who's felt this problem firsthand — get in touch."
        primary={PRIMARY_CTA}
      />
    </>
  );
}
