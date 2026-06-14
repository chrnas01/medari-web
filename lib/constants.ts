import { type LucideIcon, Linkedin, Twitter } from "lucide-react";

export const SITE_NAME = "Medari";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://medari.com.au";

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "For practices", href: "#features" },
];

export interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
];

export const FOOTER_LINKS = {
  product: [
    { label: "Rostering", href: "#features" },
    { label: "Open shifts", href: "#features" },
    { label: "Timesheets", href: "#features" },
    { label: "Payroll export", href: "#features" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#pricing" },
    { label: "Security", href: "#" },
  ],
  resources: [
    { label: "Help centre", href: "#" },
    { label: "Award rates guide", href: "#" },
    { label: "Status", href: "#" },
  ],
} as const;
