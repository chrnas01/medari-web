import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
  /** Mark height in px. Wordmark scales to match. */
  size?: number;
}

/**
 * Medari brand lockup — icon mark + Gabarito wordmark in the signature gradient.
 * The wordmark sits at weight 700 so it balances with the fine-stroked mark.
 */
export function Logo({ href = "/", className, size = 30 }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="Medari home"
      className={cn("inline-flex items-center gap-2", className)}
    >
      <Image
        src="/medari-mark.png"
        alt=""
        width={size}
        height={size}
        priority
        className="block"
        style={{ height: size, width: "auto" }}
      />
      <span
        className="brand-gradient-text font-bold leading-none font-(family-name:--font-gabarito)"
        style={{ fontSize: size * 0.95, letterSpacing: "-0.02em" }}
      >
        Medari
      </span>
    </Link>
  );
}
