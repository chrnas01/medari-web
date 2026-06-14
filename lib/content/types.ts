import type { LucideIcon } from "lucide-react";

export interface CtaLink {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: CtaLink[];
}

export interface Capability {
  icon: LucideIcon;
  /** CSS colour for the icon tile, e.g. "var(--brand-blue)" */
  tile: string;
  title: string;
  body: string;
}

export interface Step {
  title: string;
  body: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ComparisonContent {
  traditionalHeading: string;
  medariHeading: string;
  traditional: string[];
  medari: string[];
}

/** Long-form legal documents (privacy, terms) rendered by LegalPage. */
export type LegalBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string; lead?: string }
  | { type: "ul"; items: string[] }
  | { type: "contact"; entity: string; email: string; url: string };

export interface LegalDoc {
  title: string;
  updated: string;
  blocks: LegalBlock[];
}
