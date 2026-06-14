import { Reveal } from "@/components/Reveal";
import type { Step } from "@/lib/content/types";

export function StepList({ steps }: { steps: Step[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <Reveal key={step.title} delay={i * 0.08}>
          <div className="h-full rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {i + 1}
            </div>
            <h3 className="mb-1.5 text-[17px] font-bold text-foreground">{step.title}</h3>
            <p className="text-[14px] leading-[1.5] text-muted-foreground">{step.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
