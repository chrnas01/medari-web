import { Reveal } from "@/components/Reveal";

export function TestimonialSection() {
  return (
    <section className="bg-muted py-[88px]">
      <div className="mx-auto max-w-[820px] px-6 text-center sm:px-8">
        <Reveal>
          <blockquote className="text-[22px] font-semibold leading-[1.4] tracking-[-0.015em] text-foreground sm:text-[27px]">
            &ldquo;We went from a wall of sticky notes and group texts to a roster that
            just… works. When someone&apos;s away, Medari has it covered before
            I&apos;ve finished my coffee.&rdquo;
          </blockquote>
          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#15835a] text-xs font-semibold text-white">
              RM
            </span>
            <div className="text-left">
              <div className="text-[15px] font-bold text-foreground">Renee Mitchell</div>
              <div className="text-sm text-muted-foreground">
                Practice Manager · Brunswick Family Medical
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
