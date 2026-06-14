import type { NavItem, FooterColumn, CtaLink } from "@/lib/content/types";

export const SITE_NAME = "Medari";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://medari.com.au";

export const PRIMARY_CTA: CtaLink = { label: "Book a Demo", href: "/book-demo" };
export const SECONDARY_CTA: CtaLink = { label: "Start Free Trial", href: "/pricing" };

export const NAV_ITEMS: NavItem[] = [
  { label: "Product", href: "/product" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const TRUST_NOTES = [
  "Built for Australian healthcare",
  "Integrated with Best Practice Software",
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Product overview", href: "/product" },
      { label: "Pricing", href: "/pricing" },
      { label: "Book a demo", href: "/book-demo" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/book-demo" },
      { label: "Careers", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Help centre", href: "#" },
      { label: "Best Practice integration", href: "/product" },
      { label: "Status", href: "#" },
    ],
  },
];

export const FOOTER_TAGLINE =
  "Workforce planning built around real demand — for Australian medical practices.";
