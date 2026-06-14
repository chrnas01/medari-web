import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Section } from "@/components/marketing/Section";
import { StepList } from "@/components/marketing/StepList";
import { DemoRequestForm } from "@/components/marketing/DemoRequestForm";
import { DEMO } from "@/lib/content/demo";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "Book a 30-minute Medari demo and see how demand-driven workforce planning helps your Practice operate more efficiently.",
};

export default function BookDemoPage() {
  return (
    <>
      <Section eyebrow={DEMO.eyebrow} title={DEMO.title} lead={DEMO.lead} align="start" className="pt-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(380px,460px)]">
          {/* Left: what you'll see + ideal for */}
          <div>
            <h3 className="mb-4 text-[17px] font-bold text-foreground">What you&apos;ll see in 30 minutes</h3>
            <div className="flex flex-col gap-4">
              {DEMO.whatYoullSee.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#15835a]" strokeWidth={2.5} />
                  <div>
                    <div className="text-[15px] font-semibold text-foreground">{item.title}</div>
                    <div className="text-[14px] text-muted-foreground">{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="mb-3 mt-8 text-[17px] font-bold text-foreground">Medari is ideal for</h3>
            <div className="flex flex-wrap gap-2">
              {[...DEMO.idealFor.types, ...DEMO.idealFor.roles].map((tag) => (
                <span key={tag} className="rounded-full border border-border bg-muted px-3 py-1 text-[13px] text-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: booking. Cal/Calendly embed goes here when a link is provided — replace the form below. */}
          <div>
            {/* Cal.com / Calendly embed goes here when a link is provided — replace the form below. */}
            <DemoRequestForm />
          </div>
        </div>
      </Section>

      <Section variant="tint" title="What happens next" align="center">
        <StepList steps={DEMO.next} />
      </Section>
    </>
  );
}
