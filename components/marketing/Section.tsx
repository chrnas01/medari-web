import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  variant?: "white" | "tint";
  align?: "center" | "start";
  className?: string;
  children?: React.ReactNode;
}

/** Marketing section wrapper: owns vertical rhythm, background, and the
 *  eyebrow/title/lead header block. Copy comes from content modules. */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  variant = "white",
  align = "center",
  className,
  children,
}: SectionProps) {
  const hasHeader = eyebrow || title || lead;
  return (
    <section
      id={id}
      className={cn("py-[88px]", variant === "tint" && "bg-muted", className)}
    >
      <div className="mx-auto max-w-[1160px] px-6 sm:px-8">
        {hasHeader && (
          <Reveal>
            <div
              className={cn(
                "mb-13 max-w-[660px]",
                align === "center" ? "mx-auto text-center" : "text-left",
              )}
            >
              {eyebrow && (
                <div className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.07em] text-accent">
                  {eyebrow}
                </div>
              )}
              {title && (
                <h2 className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[40px]">
                  {title}
                </h2>
              )}
              {lead && (
                <p className="mt-4 text-[18px] leading-[1.55] text-muted-foreground">
                  {lead}
                </p>
              )}
            </div>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
