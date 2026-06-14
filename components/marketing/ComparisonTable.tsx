import { Check, Minus } from "lucide-react";
import type { ComparisonContent } from "@/lib/content/types";

export function ComparisonTable({ content }: { content: ComparisonContent }) {
  return (
    <div className="mx-auto grid max-w-[920px] gap-5 md:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-7">
        <h3 className="mb-4 text-[17px] font-bold text-muted-foreground">
          {content.traditionalHeading}
        </h3>
        <ul className="flex flex-col gap-3">
          {content.traditional.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px] text-muted-foreground">
              <Minus className="mt-0.5 h-[18px] w-[18px] shrink-0 text-neutral-400" strokeWidth={2} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-primary bg-[#edf4fb] p-7">
        <h3 className="mb-4 text-[17px] font-bold text-primary">{content.medariHeading}</h3>
        <ul className="flex flex-col gap-3">
          {content.medari.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px] font-medium text-foreground">
              <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#15835a]" strokeWidth={2.5} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
