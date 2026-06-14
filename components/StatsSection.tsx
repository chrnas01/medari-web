import { Reveal } from "@/components/Reveal";

const STATS = [
  { value: "6 hrs", label: "saved per week on rostering admin, on average" },
  { value: "92%", label: "of open shifts filled before they ever go uncovered" },
  { value: "3 min", label: "median time to fill a shift with a broadcast" },
];

export function StatsSection() {
  return (
    <section className="py-[88px]">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-8">
        <Reveal>
          <div className="relative grid gap-6 overflow-hidden rounded-[22px] bg-[#1a212b] p-13 sm:grid-cols-3">
            <div className="absolute inset-0 brand-gradient opacity-[0.14]" />
            {STATS.map(({ value, label }) => (
              <div key={value} className="relative">
                <div
                  className="text-[52px] font-extrabold leading-none tracking-[-0.03em] text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(100deg,#5fd6f5,#fff)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  {value}
                </div>
                <div className="mt-3 text-[15px] text-white/70">{label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
