import { Calendar, Repeat, Clock } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const FEATURES = [
  {
    icon: Calendar,
    bg: "var(--brand-blue)",
    title: "Smart rostering",
    body: "Drag-and-drop shifts across GPs, nurses and reception. Medari flags gaps, double-bookings and award-rate breaches before you publish.",
  },
  {
    icon: Repeat,
    bg: "var(--violet-500)",
    title: "Open-shift broadcasts",
    body: "One unfilled session? Broadcast it to every available, qualified staff member by SMS and let them claim it from their phone.",
  },
  {
    icon: Clock,
    bg: "var(--pink-500)",
    title: "Timesheets & payroll",
    body: "Worked hours roll straight into approval-ready timesheets with breaks and overtime calculated — then export to payroll in a click.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-[88px]">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-8">
        <Reveal>
          <div className="mx-auto mb-13 max-w-[640px] text-center">
            <div className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.07em] text-accent">
              One platform
            </div>
            <h2 className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[40px]">
              Everything it takes to keep the practice covered
            </h2>
            <p className="mt-4 text-[18px] leading-[1.55] text-muted-foreground">
              From building next month&apos;s roster to signing off this week&apos;s
              hours — Medari handles the operational grind so your team can focus on
              patients.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, bg, title, body }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-border bg-card p-7 shadow-[0_1px_2px_rgba(20,33,51,0.06)]">
                <div
                  className="mb-[18px] flex h-[46px] w-[46px] items-center justify-center rounded-lg text-white"
                  style={{ background: bg }}
                >
                  <Icon className="h-[22px] w-[22px]" strokeWidth={2} />
                </div>
                <h3 className="mb-2 text-[19px] font-bold text-foreground">{title}</h3>
                <p className="text-[15px] leading-[1.55] text-muted-foreground">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
