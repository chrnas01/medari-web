import type { Capability } from "@/lib/content/types";

export function FeatureCard({ icon: Icon, tile, title, body }: Capability) {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-7 shadow-[0_1px_2px_rgba(20,33,51,0.06)]">
      <div
        className="mb-[18px] flex h-[46px] w-[46px] items-center justify-center rounded-lg text-white"
        style={{ background: tile }}
      >
        <Icon className="h-[22px] w-[22px]" strokeWidth={2} />
      </div>
      <h3 className="mb-2 text-[19px] font-bold text-foreground">{title}</h3>
      <p className="text-[15px] leading-[1.55] text-muted-foreground">{body}</p>
    </div>
  );
}
