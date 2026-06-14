import { Reveal } from "@/components/Reveal";
import type { Stat } from "@/lib/content/types";

export function StatBand({ heading, stats }: { heading: string; stats: Stat[] }) {
  return (
    <section className="py-[88px]">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[22px] bg-[#1a212b] p-13">
            <div className="absolute inset-0 brand-gradient opacity-[0.14]" />
            <div className="relative">
              <h2 className="mb-10 text-[26px] font-extrabold tracking-[-0.02em] text-white sm:text-[30px]">
                {heading}
              </h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div
                      className="text-[44px] font-extrabold leading-none tracking-[-0.03em] text-transparent sm:text-[52px]"
                      style={{
                        backgroundImage: "linear-gradient(100deg,#5fd6f5,#fff)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                      }}
                    >
                      {s.value}
                    </div>
                    <div className="mt-3 text-[15px] text-white/70">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
