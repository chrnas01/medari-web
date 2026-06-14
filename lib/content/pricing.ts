import { PRIMARY_CTA } from "@/lib/content/site";

export interface PriceTier {
  name: string;
  scale: string;
  monthly: number | null;   // null = custom
  annualMonthly: number | null;
  cta: { label: string; href: string };
  featured?: boolean;
}

export const PRICING = {
  eyebrow: "Pricing",
  title: "Simple pricing. Built for Practices.",
  lead: "No per-user fees. No hidden costs. No complicated setup. Medari is priced on the size of your Practice, because the value comes from improving workforce planning across the whole organisation.",
  trialNote: "Every plan includes a 30-day free trial. Credit card required. Cancel anytime before your trial ends.",
  annualNote: "Annual prices shown are derived from the stated \"save 20%\" and are indicative until confirmed.",
  tiers: [
    {
      name: "Growth Practice",
      scale: "1–3 GPs",
      monthly: 250,
      annualMonthly: 200,
      cta: { label: "Start Free Trial", href: "/book-demo" },
    },
    {
      name: "Scale Practice",
      scale: "4–8 GPs",
      monthly: 450,
      annualMonthly: 360,
      cta: { label: "Start Free Trial", href: "/book-demo" },
      featured: true,
    },
    {
      name: "Enterprise",
      scale: "8+ GPs / Multi-Site",
      monthly: null,
      annualMonthly: null,
      cta: PRIMARY_CTA,
    },
  ] satisfies PriceTier[],
  included: [
    "Demand forecasting",
    "Workforce planning",
    "Availability management",
    "Session planning",
    "Room allocation",
    "Staff scheduling",
    "Timesheet management",
    "Dashboard & insights",
    "Coverage gap alerts",
    "Mobile access",
    "Best Practice integration",
    "Email support",
    "Multi-location support",
    "Advanced reporting",
    "Team utilisation reporting",
    "Historical trend analysis",
    "Priority support",
    "Quarterly optimisation review",
  ],
  why: {
    title: "Why Medari?",
    lead: "Most workforce software tells you who is working. Medari helps you understand whether you have the right people, in the right place, at the right time.",
    questions: [
      "Do we have enough staff for expected demand?",
      "Are we overstaffed or understaffed?",
      "Do we have enough rooms available?",
      "Where are operational bottlenecks forming?",
      "How can we improve utilisation without increasing payroll?",
    ],
  },
  roi: {
    title: "One better staffing decision can pay for Medari",
    reduce: [
      "Overstaffing during quiet periods",
      "Understaffing during peak demand",
      "Time spent building schedules",
      "Last-minute staffing changes",
    ],
    improve: [
      "Workforce utilisation",
      "Patient flow",
      "Team productivity",
      "Practice profitability",
    ],
  },
};
