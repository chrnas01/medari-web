import { Check, Send } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const CHECKS = [
  "See availability and contracted hours at a glance",
  "Staff accept from a text — no app login required",
  "The roster updates and notifies everyone automatically",
];

const CANDIDATES = [
  { initials: "MP", bg: "var(--violet-500)", name: "Dr. Mark Patel", meta: "GP · 12h left this week" },
  { initials: "AK", bg: "var(--pink-500)", name: "Dr. Aisha Khan", meta: "GP · 6h left this week" },
];

export function FillShiftsSection() {
  return (
    <section id="how" className="bg-muted py-[88px]">
      <div className="mx-auto grid max-w-[1160px] items-center gap-14 px-6 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <div>
            <div className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.07em] text-accent">
              Fill shifts faster
            </div>
            <h2 className="mb-[18px] text-[28px] font-extrabold leading-[1.12] tracking-[-0.025em] text-foreground sm:text-[34px]">
              Turn an open shift into a covered one — in under a minute.
            </h2>
            <p className="text-[17px] leading-[1.6] text-muted-foreground">
              When someone calls in sick, Medari instantly shows you who&apos;s free,
              qualified and within their hours. Offer the shift to one person or
              broadcast to the whole pool.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {CHECKS.map((c) => (
                <div key={c} className="flex items-start gap-3 text-[15px] text-foreground/90">
                  <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#15835a]" strokeWidth={2.5} />
                  {c}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="left">
          <div className="rounded-xl bg-card p-5 shadow-[0_4px_8px_rgba(20,33,51,0.06),0_12px_24px_rgba(20,33,51,0.10)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-[15px] font-bold text-foreground">Fill open shift</div>
              <span className="status status--open">Open · Fri 13:00–17:00</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {CANDIDATES.map((c) => (
                <div
                  key={c.initials}
                  className="flex items-center gap-3 rounded-lg border border-border p-3"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                    style={{ background: c.bg }}
                  >
                    {c.initials}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-foreground">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.meta}</div>
                  </div>
                  <span className="status status--confirmed">Available</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c71765]"
            >
              <Send className="h-4 w-4" strokeWidth={2} />
              Broadcast to all available
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
