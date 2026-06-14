import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/lib/content/faq";

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="mx-auto max-w-[760px]">
      {FAQ.map((item, i) => (
        <AccordionItem key={item.q} value={`item-${i}`}>
          <AccordionTrigger className="text-left text-[16px] font-semibold text-foreground">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-[15px] leading-[1.6] text-muted-foreground">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
