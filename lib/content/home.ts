import {
  TrendingUp,
  CalendarClock,
  Plug,
  Eye,
  Scale,
  Zap,
} from "lucide-react";
import type { Capability, Step, Stat, ComparisonContent } from "@/lib/content/types";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/content/site";

export const HOME = {
  hero: {
    titleLead: "Workforce planning built around ",
    titleGradient: "real demand.",
    subhead:
      "Stop guessing staffing levels. Start making workforce decisions with confidence.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
  },
  problem: {
    eyebrow: "The problem",
    title: "Most Practices don't have a staffing problem. They have a planning problem.",
    lead:
      "Every week, Practice Managers answer the same questions with spreadsheets, habit and experience. Medari gives you visibility before problems happen.",
    questions: [
      "Do I have enough staff tomorrow?",
      "Why is reception overwhelmed on some days and quiet on others?",
      "Do I need another nurse during peak periods?",
      "Are we overstaffed or understaffed?",
      "Why does the roster constantly change?",
    ],
  },
  meet: {
    eyebrow: "Meet Medari",
    title: "The workforce planning platform for healthcare",
    lead:
      "Medari connects directly to your practice management system and analyses historical activity, appointment demand, workforce availability and operational capacity — so you make smarter workforce decisions before problems occur. No spreadsheets. No guesswork. No reactive staffing. Just better planning.",
  },
  capabilities: {
    eyebrow: "What Medari helps you do",
    title: "Everything it takes to plan workforce around real demand",
    items: [
      {
        icon: TrendingUp,
        tile: "var(--brand-blue)",
        title: "Demand forecasting",
        body: "Understand expected demand by day, week and month, and identify peak periods before they happen.",
      },
      {
        icon: CalendarClock,
        tile: "var(--violet-500)",
        title: "Intelligent workforce planning",
        body: "Generate recommendations from demand, availability and capacity — and build schedules in minutes, not hours.",
      },
      {
        icon: Plug,
        tile: "var(--pink-500)",
        title: "Best Practice integration",
        body: "Connected directly to Best Practice Software. No double handling, no manual exports, no duplicate data entry.",
      },
      {
        icon: Eye,
        tile: "var(--cyan-600)",
        title: "Workforce visibility",
        body: "See coverage across your organisation in real time, and spot understaffing, overstaffing and gaps before they impact operations.",
      },
      {
        icon: Scale,
        tile: "var(--green-600)",
        title: "Fair team allocation",
        body: "Balance workloads across availability, preferred days, target and maximum hours, and skill requirements.",
      },
      {
        icon: Zap,
        tile: "var(--blue-700)",
        title: "Faster response to change",
        body: "When staff become unavailable or demand shifts, Medari surfaces the best coverage options immediately.",
      },
    ] satisfies Capability[],
  },
  comparison: {
    eyebrow: "Why Medari is different",
    title: "More than scheduling. It's workforce planning.",
    content: {
      traditionalHeading: "Traditional rostering software",
      medariHeading: "Medari",
      traditional: [
        "Manual scheduling",
        "Limited operational visibility",
        "Reactive staffing decisions",
        "Built for generic industries",
        'Answers “Who is working?”',
      ],
      medari: [
        "Demand-driven planning",
        "Workforce visibility and operational insights",
        "Proactive coverage before gaps appear",
        "Built for healthcare",
        'Answers “The right people, in the right place, at the right time?”',
      ],
    } satisfies ComparisonContent,
  },
  how: {
    eyebrow: "How it works",
    title: "From Practice data to an optimised plan",
    steps: [
      { title: "Connect your Practice", body: "Securely connect Medari to Best Practice Software." },
      { title: "Analyse demand", body: "Medari identifies operational patterns and workforce requirements." },
      { title: "Plan with confidence", body: "Generate workforce recommendations and optimise coverage." },
      { title: "Improve continuously", body: "Monitor workforce utilisation and operational performance over time." },
    ] satisfies Step[],
  },
  roi: {
    heading: "One better staffing decision can pay for Medari.",
    stats: [
      { value: "5+ hrs", label: "saved per week on workforce planning" },
      { value: "$10–30k+", label: "typical annual value for a mid-size Practice" },
      { value: "30 days", label: "free trial — credit card required, cancel anytime" },
    ] satisfies Stat[],
  },
  credibility: {
    heading: "Built with healthcare, not just for it.",
    body: "Medari is developed alongside the Practices that use it — we listen to what's working, fix what isn't, and build what's actually needed. We're early, we're deliberate, and we're building with organisations who believe healthcare teams deserve better tools.",
  },
  pricingTeaser: {
    eyebrow: "Pricing",
    title: "Simple pricing, built for Practices",
    lead: "No per-user fees. No hidden costs. Every plan includes a 30-day free trial.",
  },
  finalCta: {
    heading: "Ready to see Medari in action?",
    body: "See how demand-driven workforce planning helps your Practice operate more efficiently.",
    primary: PRIMARY_CTA,
    secondary: SECONDARY_CTA,
  },
};
