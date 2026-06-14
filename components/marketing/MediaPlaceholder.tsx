import { Image as ImageIcon, PlayCircle, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaKind = "image" | "video" | "logo";

interface MediaPlaceholderProps {
  /** Describes the real asset that will replace this slot (used as the accessible label). */
  label: string;
  kind?: MediaKind;
  /** CSS aspect-ratio string, e.g. "16/9", "4/3", "1/1". Reserves space to avoid layout shift. */
  aspect?: string;
  /** Optional secondary line, e.g. dimensions or duration guidance for whoever supplies the asset. */
  note?: string;
  className?: string;
}

const KIND_META: Record<MediaKind, { icon: typeof ImageIcon; tag: string }> = {
  image: { icon: ImageIcon, tag: "Image" },
  video: { icon: PlayCircle, tag: "Video" },
  logo: { icon: Building2, tag: "Logo" },
};

/**
 * A clearly-marked slot where a real image / video / logo will go.
 * Reserves its aspect ratio (CLS-safe), carries an accessible label, and uses
 * no motion so it stays calm and on-brand. Swap for a real asset later.
 */
export function MediaPlaceholder({
  label,
  kind = "image",
  aspect = "16/9",
  note,
  className,
}: MediaPlaceholderProps) {
  const { icon: Icon, tag } = KIND_META[kind];
  return (
    <div
      role="img"
      aria-label={`${tag} placeholder: ${label}`}
      style={{ aspectRatio: aspect }}
      className={cn(
        "relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-dashed border-border bg-muted/60 text-center",
        className,
      )}
    >
      <span className="absolute left-3 top-3 rounded-md bg-background/85 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
        {tag} placeholder
      </span>
      <span
        className={cn(
          "flex items-center justify-center",
          kind === "video" &&
            "h-14 w-14 rounded-full bg-background/85 shadow-[0_1px_2px_rgba(20,33,51,0.06)]",
        )}
      >
        <Icon
          className={cn(
            "text-muted-foreground/60",
            kind === "video" ? "h-8 w-8 text-primary/70" : "h-10 w-10",
          )}
          strokeWidth={1.5}
          aria-hidden
        />
      </span>
      <div className="px-6">
        <div className="text-sm font-semibold text-foreground/70">{label}</div>
        {note ? <div className="mt-1 text-xs text-muted-foreground">{note}</div> : null}
      </div>
    </div>
  );
}
