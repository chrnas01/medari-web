import { Reveal } from "@/components/Reveal";

export interface CredibilityBandProps {
  heading: string;
  body: string;
  quote?: { text: string; name: string; role: string };
}

export function CredibilityBand({ heading, body, quote }: CredibilityBandProps) {
  return (
    <section className="py-[88px]">
      <div className="mx-auto max-w-[820px] px-6 text-center sm:px-8">
        <Reveal>
          {quote ? (
            <>
              <blockquote className="text-[22px] font-semibold leading-[1.4] tracking-[-0.015em] text-foreground sm:text-[27px]">
                &ldquo;{quote.text}&rdquo;
              </blockquote>
              <div className="mt-6 text-[15px] font-bold text-foreground">{quote.name}</div>
              <div className="text-sm text-muted-foreground">{quote.role}</div>
            </>
          ) : (
            <>
              <h2 className="text-[28px] font-extrabold tracking-[-0.02em] text-foreground sm:text-[34px]">
                {heading}
              </h2>
              <p className="mx-auto mt-4 max-w-[620px] text-[18px] leading-[1.6] text-muted-foreground">
                {body}
              </p>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
