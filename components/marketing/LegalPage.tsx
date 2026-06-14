import { Reveal } from "@/components/Reveal";
import type { LegalBlock, LegalDoc } from "@/lib/content/types";

/** Renders a long-form legal document (privacy, terms) from structured blocks. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <section className="py-[88px] pt-28">
      <div className="mx-auto max-w-[820px] px-6 sm:px-8">
        <Reveal>
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.07em] text-accent">Legal</p>
          <h1 className="text-[34px] font-extrabold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[40px]">
            {doc.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: {doc.updated}</p>
        </Reveal>
        <div className="mt-10">
          {doc.blocks.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlockView({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mb-3 mt-10 text-[22px] font-bold tracking-[-0.01em] text-foreground">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">{block.text}</h3>;
    case "p":
      return (
        <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">
          {block.lead ? (
            <strong className="font-semibold text-foreground">{block.lead} </strong>
          ) : null}
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
          {block.items.map((item, i) => (
            <li key={i} className="text-[15px] leading-[1.6] text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      );
    case "contact":
      return (
        <div className="mt-4 text-[15px] leading-[1.8] text-muted-foreground">
          <div className="font-semibold text-foreground">{block.entity}</div>
          <a
            href={`mailto:${block.email}`}
            className="text-primary underline-offset-2 hover:underline"
          >
            {block.email}
          </a>
          <br />
          <a
            href={block.url}
            className="text-primary underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {block.url}
          </a>
        </div>
      );
  }
}
