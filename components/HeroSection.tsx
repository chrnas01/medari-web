import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { RosterMock } from "@/components/RosterMock";

const NOTES = ["No setup fees", "Award-rate aware", "Cancel anytime"];

export function HeroSection() {
  return (
    <header className="relative overflow-hidden border-b border-border brand-wash">
      <div className="mx-auto grid max-w-[1160px] items-center gap-14 px-6 py-20 sm:px-8 md:py-24 lg:grid-cols-2">
        <Reveal direction="none">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.04em] text-[#66369a]">
              <span className="h-[7px] w-[7px] rounded-full brand-gradient" />
              Built for Australian medical practices
            </span>

            <h1 className="text-[42px] font-extrabold leading-[1.04] tracking-[-0.03em] text-foreground sm:text-[52px] lg:text-[56px]">
              Cover every shift,
              <br />
              <span className="brand-gradient-text">without the scramble.</span>
            </h1>

            <p className="mt-5 max-w-[480px] text-[19px] leading-[1.55] text-muted-foreground">
              Medari builds your roster, fills open shifts in a tap, and turns worked
              hours into payroll-ready timesheets — so your practice runs on rhythm,
              not last-minute texts.
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <Button
                asChild
                size="lg"
                className="brand-gradient border-0 text-white shadow-[0_8px_24px_rgba(123,68,178,0.22)] transition-[filter] hover:brightness-[1.04] hover:saturate-[1.08]"
              >
                <Link href="#pricing">Book a demo</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-input bg-background text-foreground shadow-xs hover:bg-muted hover:text-foreground"
              >
                <Link href="#how">See the product</Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted-foreground">
              {NOTES.map((note) => (
                <span key={note} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#15835a]" strokeWidth={2.5} />
                  {note}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <RosterMock />
      </div>
    </header>
  );
}
