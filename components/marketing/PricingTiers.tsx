"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING, type PriceTier } from "@/lib/content/pricing";

export function PricingTiers() {
  const [annual, setAnnual] = useState(false);
  return (
    <div>
      <div className="mb-10 flex items-center justify-center gap-3">
        <Toggle annual={annual} setAnnual={setAnnual} />
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {PRICING.tiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} annual={annual} />
        ))}
      </div>
      <p className="mt-6 text-center text-[13px] text-muted-foreground">{PRICING.trialNote}</p>
      {annual && (
        <p className="mt-1 text-center text-[12px] text-muted-foreground/80">{PRICING.annualNote}</p>
      )}
    </div>
  );
}

function Toggle({ annual, setAnnual }: { annual: boolean; setAnnual: (v: boolean) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-muted p-1 text-sm font-semibold">
      <button
        type="button"
        onClick={() => setAnnual(false)}
        className={`rounded-full px-4 py-1.5 transition-colors ${!annual ? "bg-card text-foreground shadow-xs" : "text-muted-foreground"}`}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => setAnnual(true)}
        className={`rounded-full px-4 py-1.5 transition-colors ${annual ? "bg-card text-foreground shadow-xs" : "text-muted-foreground"}`}
      >
        Annual <span className="text-accent">·20%</span>
      </button>
    </div>
  );
}

function TierCard({ tier, annual }: { tier: PriceTier; annual: boolean }) {
  const price = annual ? tier.annualMonthly : tier.monthly;
  return (
    <div
      className={`flex flex-col rounded-xl border bg-card p-7 ${tier.featured ? "border-primary shadow-[0_8px_24px_rgba(20,33,51,0.10)]" : "border-border"}`}
    >
      <h3 className="text-[19px] font-bold text-foreground">{tier.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{tier.scale}</p>
      <div className="mt-5 mb-6">
        {price === null ? (
          <span className="text-[28px] font-extrabold text-foreground">Custom</span>
        ) : (
          <>
            <span className="font-mono text-[36px] font-extrabold tracking-tight text-foreground">
              ${price}
            </span>
            <span className="text-sm text-muted-foreground"> /month incl GST</span>
          </>
        )}
      </div>
      <Button
        asChild
        className="mt-auto w-full"
        variant={tier.featured ? "default" : "outline"}
      >
        <Link href={tier.cta.href}>{tier.cta.label}</Link>
      </Button>
    </div>
  );
}

export function IncludedList() {
  return (
    <ul className="mx-auto grid max-w-[820px] gap-3 sm:grid-cols-2">
      {PRICING.included.map((item) => (
        <li key={item} className="flex items-center gap-2.5 text-[15px] text-foreground">
          <Check className="h-[18px] w-[18px] shrink-0 text-[#15835a]" strokeWidth={2.5} />
          {item}
        </li>
      ))}
    </ul>
  );
}
