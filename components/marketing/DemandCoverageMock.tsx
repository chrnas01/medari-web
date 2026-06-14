import { Calendar } from "lucide-react";
import { Reveal } from "@/components/Reveal";

type Coverage = "covered" | "gap" | "spare";

const ROWS: { day: string; width: number; state: Coverage; label: string }[] = [
  { day: "Mon", width: 64, state: "covered", label: "Covered" },
  { day: "Tue", width: 116, state: "gap", label: "Gap · +1 nurse" },
  { day: "Wed", width: 128, state: "gap", label: "Gap · +1 reception" },
  { day: "Thu", width: 60, state: "spare", label: "Overstaffed" },
  { day: "Fri", width: 88, state: "covered", label: "Covered" },
];

const PILL: Record<Coverage, string> = {
  covered: "bg-[#e7f6ee] text-[#0f6646]",
  gap: "bg-[#fcf1dd] text-[#93600f]",
  spare: "bg-[#edf4fb] text-[#114f90]",
};

export function DemandCoverageMock() {
  return (
    <Reveal delay={0.15}>
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_16px_rgba(20,33,51,0.08),0_24px_48px_rgba(20,33,51,0.14)]">
        <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
          <Calendar className="h-4 w-4 text-primary" strokeWidth={2} />
          <span className="text-[13px] font-bold text-foreground">Week ahead · demand vs coverage</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-[#fcf1dd] px-2 py-1 text-xs font-semibold text-[#93600f]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#be7a12]" />
            2 gaps flagged
          </span>
        </div>
        <div className="flex flex-col">
          {ROWS.map((r) => (
            <div
              key={r.day}
              className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0"
            >
              <span className="w-9 text-xs font-semibold text-muted-foreground">{r.day}</span>
              <span
                className="h-2 rounded-full"
                style={{
                  width: r.width,
                  background: "linear-gradient(100deg,#15c6f2,#1c68b9)",
                }}
              />
              <span className={`ml-auto rounded-full px-2.5 py-1 text-[11px] font-bold ${PILL[r.state]}`}>
                {r.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
