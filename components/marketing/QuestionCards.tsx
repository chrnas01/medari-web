import { Reveal } from "@/components/Reveal";
import { HelpCircle } from "lucide-react";

export function QuestionCards({ questions }: { questions: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {questions.map((q, i) => (
        <Reveal key={q} delay={i * 0.05}>
          <div className="flex h-full items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(20,33,51,0.06)]">
            <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={2} />
            <p className="text-[15px] font-medium text-foreground">{q}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
