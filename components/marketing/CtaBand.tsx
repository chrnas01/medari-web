import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import type { CtaLink } from "@/lib/content/types";

interface CtaBandProps {
  heading: string;
  body?: string;
  primary: CtaLink;
  secondary?: CtaLink;
}

export function CtaBand({ heading, body, primary, secondary }: CtaBandProps) {
  return (
    <section className="py-[88px]">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-8">
        <Reveal>
          <div className="brand-gradient rounded-[22px] px-8 py-15 text-center sm:px-14">
            <h2 className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.025em] text-white sm:text-[40px]">
              {heading}
            </h2>
            {body && (
              <p className="mx-auto mt-4 max-w-[520px] text-[18px] text-white/90">{body}</p>
            )}
            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
              <Link
                href={primary.href}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-[#114f90] transition-colors hover:bg-white/90"
              >
                {primary.label}
              </Link>
              {secondary && (
                <Link
                  href={secondary.href}
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
