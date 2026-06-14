import { Calendar } from "lucide-react";
import { Reveal } from "@/components/Reveal";

/** Static "this week's roster" product mock shown in the hero. */
export function RosterMock() {
  return (
    <Reveal delay={0.15}>
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_16px_rgba(20,33,51,0.08),0_24px_48px_rgba(20,33,51,0.14)]">
        {/* Bar */}
        <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
          <Calendar className="h-4 w-4 text-primary" strokeWidth={2} />
          <span className="text-[13px] font-bold text-foreground">This week&apos;s roster</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-[#e7f6ee] px-2 py-1 text-xs font-semibold text-[#0f6646]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#15835a]" />
            94% covered
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-[88px_1fr_1fr_1fr]">
          {["Staff", "Wed", "Thu", "Fri"].map((h) => (
            <div
              key={h}
              className="flex items-center border-b border-r border-border bg-muted px-2.5 py-2.5 text-[11px] font-bold text-muted-foreground last:border-r-0"
            >
              {h}
            </div>
          ))}

          {/* Row: Dr. Chen */}
          <NameCell name="Dr. Chen" dot="var(--brand-blue)" />
          <Cell>
            <Shift time="08:00–16:00" role="Room 3" />
          </Cell>
          <Cell>
            <Shift time="08:00–16:00" role="Room 3" />
          </Cell>
          <Cell last>
            <Shift time="13:00–17:00" open name="Open" />
          </Cell>

          {/* Row: T. Reilly */}
          <NameCell name="T. Reilly" dot="var(--cyan-600)" />
          <Cell>
            <Shift time="07:30–15:30" role="Clinic" />
          </Cell>
          <Cell>
            <Shift time="07:30–15:30" role="Clinic" pending />
          </Cell>
          <Cell last>
            <Shift time="07:30–15:30" role="Clinic" />
          </Cell>
        </div>
      </div>
    </Reveal>
  );
}

function Cell({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return (
    <div
      className={`min-h-[60px] border-b border-border p-2 ${last ? "" : "border-r"}`}
    >
      {children}
    </div>
  );
}

function NameCell({ name, dot }: { name: string; dot: string }) {
  return (
    <div className="flex min-h-[60px] items-center gap-2 border-b border-r border-border bg-muted px-2.5 text-xs font-semibold text-foreground">
      <span className="h-[7px] w-[7px] rounded-full" style={{ background: dot }} />
      {name}
    </div>
  );
}

function Shift({
  time,
  role,
  name,
  open,
  pending,
}: {
  time: string;
  role?: string;
  name?: string;
  open?: boolean;
  pending?: boolean;
}) {
  const cls = open ? "shift shift--open" : pending ? "shift shift--pending" : "shift";
  return (
    <div className={cls}>
      <span className="shift__time font-mono">{time}</span>
      {name ? (
        <span className="shift__name text-[#93600f]">{name}</span>
      ) : (
        <span className="shift__role">{role}</span>
      )}
    </div>
  );
}
