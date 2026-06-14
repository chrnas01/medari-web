import {
  TrendingUp, CalendarClock, CalendarCheck, LayoutGrid,
  DoorOpen, Clock, BarChart3, Plug,
} from "lucide-react";
import type { Capability, ComparisonContent } from "@/lib/content/types";

export const PRODUCT = {
  hero: {
    eyebrow: "Product",
    title: "Workforce planning built around real demand",
    lead: "Medari helps healthcare organisations align workforce capacity, sessions and operational coverage with real demand. Stop relying on spreadsheets, guesswork and reactive decisions.",
  },
  problem: {
    eyebrow: "The problem",
    title: "Every Practice has systems — except for workforce planning",
    lead: "Most healthcare organisations have systems for appointments, billing, clinical records and patient communication. Very few have a system for workforce planning.",
    consequences: [
      "Reception teams become overwhelmed",
      "Nurses are stretched during peak periods",
      "Rooms sit idle while other areas are overloaded",
      "Managers spend hours adjusting schedules",
      "Staffing decisions are made on instinct",
    ],
  },
  what: {
    eyebrow: "What is Medari?",
    title: "A workforce planning and operational intelligence platform for healthcare",
    lead: "By analysing historical demand, workforce availability, sessions and operational capacity, Medari helps Practices make smarter staffing decisions before problems occur.",
  },
  capabilities: {
    eyebrow: "Core capabilities",
    title: "One platform for operational decision-making",
    items: [
      { icon: TrendingUp, tile: "var(--brand-blue)", title: "Demand forecasting", body: "Expected demand by day, week and month, with peak periods surfaced early." },
      { icon: CalendarClock, tile: "var(--violet-500)", title: "Workforce planning", body: "Recommendations from demand, availability and capacity — schedules in minutes." },
      { icon: CalendarCheck, tile: "var(--pink-500)", title: "Availability management", body: "Capture availability, preferred days, target and maximum hours." },
      { icon: LayoutGrid, tile: "var(--cyan-600)", title: "Session planning", body: "Align clinical sessions with workforce coverage." },
      { icon: DoorOpen, tile: "var(--green-600)", title: "Room allocation", body: "Match rooms to sessions so capacity is never the bottleneck." },
      { icon: Clock, tile: "var(--blue-700)", title: "Timesheet management", body: "Worked hours roll into approval-ready timesheets." },
      { icon: BarChart3, tile: "var(--violet-600)", title: "Dashboard & insights", body: "Real-time workforce visibility across the organisation." },
      { icon: Plug, tile: "var(--brand-blue)", title: "Best Practice integration", body: "Connected directly — no double handling or manual exports." },
    ] satisfies Capability[],
  },
  comparison: {
    eyebrow: "Why Medari is different",
    title: "More than scheduling",
    content: {
      traditionalHeading: "Traditional scheduling software",
      medariHeading: "Medari",
      traditional: ["Creates schedules", "Tracks attendance", "Manages timesheets"],
      medari: [
        "Forecasts demand",
        "Plans workforce requirements",
        "Identifies operational bottlenecks",
        "Aligns capacity with demand",
        "Supports healthcare-specific workflows",
      ],
    } satisfies ComparisonContent,
  },
  outcomes: {
    eyebrow: "The outcome",
    title: "With Medari, organisations can",
    items: [
      "Reduce workforce guesswork",
      "Improve workforce utilisation",
      "Identify coverage gaps earlier",
      "Improve operational efficiency",
      "Save time building schedules",
      "Increase visibility across the organisation",
      "Make better workforce decisions",
    ],
  },
  goal: {
    title: "Put the right people, in the right place, at the right time.",
    lead: "That's what Medari was built to do.",
  },
};
