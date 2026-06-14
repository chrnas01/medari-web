import Link from "next/link";
import { Logo } from "@/components/Logo";
import { FOOTER_LINKS } from "@/lib/constants";

const COLUMNS = [
  { heading: "Product", links: FOOTER_LINKS.product },
  { heading: "Company", links: FOOTER_LINKS.company },
  { heading: "Resources", links: FOOTER_LINKS.resources },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pb-10 pt-13">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-8">
        <div className="grid gap-8 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo size={26} className="mb-3.5" />
            <p className="max-w-[260px] text-sm leading-[1.55] text-muted-foreground">
              Workforce rostering and timesheeting built for Australian medical
              practices.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-3.5 text-xs font-bold uppercase tracking-[0.06em] text-secondary">
                {col.heading}
              </h4>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="mb-2.5 block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-5 text-[13px] text-secondary sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Medari. Made in Australia.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}
