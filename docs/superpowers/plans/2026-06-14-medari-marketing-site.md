# Medari Marketing Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Realign the existing Medari landing page to the demand-driven workforce-planning positioning and expand it into a 5-page marketing site (Home, Product, Pricing, About, Book a Demo) built from a shared, content-driven component kit.

**Architecture:** A `components/marketing/` kit of presentational section primitives consumes typed copy from `lib/content/*`. Each route is a thin composition of primitives + content. The demo form posts to a Resend-backed server action (mirrors the existing `contact.ts`). The existing design system (DESIGN.md tokens, brand gradient + status CSS in `globals.css`, Hanken Grotesk / IBM Plex Mono / Gabarito fonts) is reused unchanged.

**Tech Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 · shadcn/ui · react-hook-form + zod · Resend · botid · lucide-react · framer-motion (existing `Reveal`).

**Spec:** `docs/superpowers/specs/2026-06-14-medari-marketing-site-design.md`

---

## Conventions for this plan

**Testing approach (read first):** This repo has **no test runner** and the site is presentational, so we do not add one (YAGNI). The verification gate after each task is:

```bash
npx tsc --noEmit        # types pass
npm run lint            # eslint clean
```

At the end of each phase, additionally run a build + served smoke-test:

```bash
npm run build           # all routes compile + static-generate
# then, in one shell:
(npm run start -- -p 3131 >/tmp/medari.log 2>&1 &) ; sleep 4
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3131/<route>
curl -s http://localhost:3131/<route> | grep -o "<expected copy>"
pkill -f "next start"
```

**Commits:** Conventional Commits are enforced (commitlint + husky). Use `feat:`/`refactor:`/`chore:` prefixes. Every commit step lists exact files.

**Git note:** The working directory is **not currently a git repo**. Task 0 initialises one. If the user declines git, skip every `git ...` step but keep doing the typecheck/lint/build gates.

**Australian spelling and capital-P "Practice" everywhere. No emoji in shipped UI. No fabricated quotes/logos/metrics.**

---

## File map

**Created**
```
lib/content/types.ts          shared content types
lib/content/site.ts           nav, footer, CTA labels, trust line
lib/content/home.ts           Home copy
lib/content/product.ts        Product copy
lib/content/pricing.ts        Pricing copy
lib/content/about.ts          About copy
lib/content/demo.ts           Book-a-Demo copy
lib/content/faq.ts            FAQ items (used on Pricing)
components/marketing/Section.tsx
components/marketing/FeatureCard.tsx
components/marketing/QuestionCards.tsx
components/marketing/ComparisonTable.tsx
components/marketing/StepList.tsx
components/marketing/StatBand.tsx
components/marketing/CredibilityBand.tsx
components/marketing/CtaBand.tsx
components/marketing/DemandCoverageMock.tsx
components/marketing/PricingTiers.tsx        (client)
components/marketing/FaqAccordion.tsx        (client)
components/marketing/DemoRequestForm.tsx     (client)
lib/validations/demo.ts
lib/actions/demo.ts
app/product/page.tsx
app/pricing/page.tsx
app/about/page.tsx
app/book-demo/page.tsx
```

**Modified**
```
app/page.tsx                  recompose from kit
components/Header.tsx         nav from site content
components/Footer.tsx         columns from site content
```

**Deleted**
```
components/HeroSection.tsx        (replaced by marketing kit + home.ts)
components/FeaturesSection.tsx
components/FillShiftsSection.tsx
components/StatsSection.tsx
components/TestimonialSection.tsx
components/CtaSection.tsx
components/RosterMock.tsx
components/ContactFormSection.tsx
lib/actions/contact.ts
lib/validations/contact.ts
```
(`lib/constants.ts` is superseded by `lib/content/site.ts`; remove after Header/Footer migrate.)

---

## Phase 1 — Foundations + Home

### Task 0: Initialise git (needs user go-ahead)

**Files:** none (repo init)

- [ ] **Step 1: Confirm with the user**, then initialise:

```bash
git init
git add -A
git commit -m "chore: snapshot existing template before Medari rebuild"
```

Expected: a baseline commit. If the user declines git, skip and ignore all later commit steps.

---

### Task 1: Content types + site content

**Files:**
- Create: `lib/content/types.ts`
- Create: `lib/content/site.ts`

- [ ] **Step 1: Write `lib/content/types.ts`** (every content module imports from here)

```ts
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
```

- [ ] **Step 2: Write `lib/content/site.ts`**

```ts
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
```

- [ ] **Step 3: Verify** — `npx tsc --noEmit` then `npm run lint`. Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add lib/content/types.ts lib/content/site.ts
git commit -m "feat: add marketing content types and site content module"
```

---

### Task 2: `Section` primitive

**Files:**
- Create: `components/marketing/Section.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  variant?: "white" | "tint";
  align?: "center" | "start";
  className?: string;
  children?: React.ReactNode;
}

/** Marketing section wrapper: owns vertical rhythm, background, and the
 *  eyebrow/title/lead header block. Copy comes from content modules. */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  variant = "white",
  align = "center",
  className,
  children,
}: SectionProps) {
  const hasHeader = eyebrow || title || lead;
  return (
    <section
      id={id}
      className={cn("py-[88px]", variant === "tint" && "bg-muted", className)}
    >
      <div className="mx-auto max-w-[1160px] px-6 sm:px-8">
        {hasHeader && (
          <Reveal>
            <div
              className={cn(
                "mb-13 max-w-[660px]",
                align === "center" ? "mx-auto text-center" : "text-left",
              )}
            >
              {eyebrow && (
                <div className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.07em] text-accent">
                  {eyebrow}
                </div>
              )}
              {title && (
                <h2 className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[40px]">
                  {title}
                </h2>
              )}
              {lead && (
                <p className="mt-4 text-[18px] leading-[1.55] text-muted-foreground">
                  {lead}
                </p>
              )}
            </div>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify** — `npx tsc --noEmit && npm run lint`. Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add components/marketing/Section.tsx
git commit -m "feat: add Section marketing primitive"
```

---

### Task 3: Presentational primitives (FeatureCard, QuestionCards, ComparisonTable, StepList, StatBand, CredibilityBand, CtaBand)

**Files:**
- Create: `components/marketing/FeatureCard.tsx`
- Create: `components/marketing/QuestionCards.tsx`
- Create: `components/marketing/ComparisonTable.tsx`
- Create: `components/marketing/StepList.tsx`
- Create: `components/marketing/StatBand.tsx`
- Create: `components/marketing/CredibilityBand.tsx`
- Create: `components/marketing/CtaBand.tsx`

- [ ] **Step 1: `FeatureCard.tsx`**

```tsx
import type { Capability } from "@/lib/content/types";

export function FeatureCard({ icon: Icon, tile, title, body }: Capability) {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-7 shadow-[0_1px_2px_rgba(20,33,51,0.06)]">
      <div
        className="mb-[18px] flex h-[46px] w-[46px] items-center justify-center rounded-lg text-white"
        style={{ background: tile }}
      >
        <Icon className="h-[22px] w-[22px]" strokeWidth={2} />
      </div>
      <h3 className="mb-2 text-[19px] font-bold text-foreground">{title}</h3>
      <p className="text-[15px] leading-[1.55] text-muted-foreground">{body}</p>
    </div>
  );
}
```

- [ ] **Step 2: `QuestionCards.tsx`**

```tsx
import { Reveal } from "@/components/Reveal";
import { HelpCircle } from "lucide-react";

export function QuestionCards({ questions }: { questions: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {questions.map((q, i) => (
        <Reveal key={q} delay={i * 0.05}>
          <div className="flex h-full items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(20,33,51,0.06)]">
            <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={2} />
            <p className="text-[15px] font-medium text-foreground">{q}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: `ComparisonTable.tsx`**

```tsx
import { Check, Minus } from "lucide-react";
import type { ComparisonContent } from "@/lib/content/types";

export function ComparisonTable({ content }: { content: ComparisonContent }) {
  return (
    <div className="mx-auto grid max-w-[920px] gap-5 md:grid-cols-2">
      <div className="rounded-xl border border-border bg-card p-7">
        <h3 className="mb-4 text-[17px] font-bold text-muted-foreground">
          {content.traditionalHeading}
        </h3>
        <ul className="flex flex-col gap-3">
          {content.traditional.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px] text-muted-foreground">
              <Minus className="mt-0.5 h-[18px] w-[18px] shrink-0 text-neutral-400" strokeWidth={2} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-primary bg-[#edf4fb] p-7">
        <h3 className="mb-4 text-[17px] font-bold text-primary">{content.medariHeading}</h3>
        <ul className="flex flex-col gap-3">
          {content.medari.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px] font-medium text-foreground">
              <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#15835a]" strokeWidth={2.5} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: `StepList.tsx`**

```tsx
import { Reveal } from "@/components/Reveal";
import type { Step } from "@/lib/content/types";

export function StepList({ steps }: { steps: Step[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <Reveal key={step.title} delay={i * 0.08}>
          <div className="h-full rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {i + 1}
            </div>
            <h3 className="mb-1.5 text-[17px] font-bold text-foreground">{step.title}</h3>
            <p className="text-[14px] leading-[1.5] text-muted-foreground">{step.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: `StatBand.tsx`**

```tsx
import { Reveal } from "@/components/Reveal";
import type { Stat } from "@/lib/content/types";

export function StatBand({ heading, stats }: { heading: string; stats: Stat[] }) {
  return (
    <section className="py-[88px]">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[22px] bg-[#1a212b] p-13">
            <div className="absolute inset-0 brand-gradient opacity-[0.14]" />
            <div className="relative">
              <h2 className="mb-10 text-[26px] font-extrabold tracking-[-0.02em] text-white sm:text-[30px]">
                {heading}
              </h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div
                      className="text-[44px] font-extrabold leading-none tracking-[-0.03em] text-transparent sm:text-[52px]"
                      style={{
                        backgroundImage: "linear-gradient(100deg,#5fd6f5,#fff)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                      }}
                    >
                      {s.value}
                    </div>
                    <div className="mt-3 text-[15px] text-white/70">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: `CredibilityBand.tsx`** (quote-ready: renders a quote if provided, else the message)

```tsx
import { Reveal } from "@/components/Reveal";

interface CredibilityBandProps {
  heading: string;
  body: string;
  quote?: { text: string; name: string; role: string };
}

export function CredibilityBand({ heading, body, quote }: CredibilityBandProps) {
  return (
    <section className="py-[88px]">
      <div className="mx-auto max-w-[820px] px-6 text-center sm:px-8">
        <Reveal>
          {quote ? (
            <>
              <blockquote className="text-[22px] font-semibold leading-[1.4] tracking-[-0.015em] text-foreground sm:text-[27px]">
                &ldquo;{quote.text}&rdquo;
              </blockquote>
              <div className="mt-6 text-[15px] font-bold text-foreground">{quote.name}</div>
              <div className="text-sm text-muted-foreground">{quote.role}</div>
            </>
          ) : (
            <>
              <h2 className="text-[28px] font-extrabold tracking-[-0.02em] text-foreground sm:text-[34px]">
                {heading}
              </h2>
              <p className="mx-auto mt-4 max-w-[620px] text-[18px] leading-[1.6] text-muted-foreground">
                {body}
              </p>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: `CtaBand.tsx`**

```tsx
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import type { CtaLink } from "@/lib/content/types";

interface CtaBandProps {
  heading: string;
  body?: string;
  primary: CtaLink;
  secondary?: CtaLink;
}

export function CtaBand({ heading, body, primary, secondary }: CtaBandProps) {
  return (
    <section className="py-[88px]">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-8">
        <Reveal>
          <div className="brand-gradient rounded-[22px] px-8 py-15 text-center sm:px-14">
            <h2 className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.025em] text-white sm:text-[40px]">
              {heading}
            </h2>
            {body && (
              <p className="mx-auto mt-4 max-w-[520px] text-[18px] text-white/90">{body}</p>
            )}
            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
              <Link
                href={primary.href}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-[#114f90] transition-colors hover:bg-white/90"
              >
                {primary.label}
              </Link>
              {secondary && (
                <Link
                  href={secondary.href}
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 8: Verify** — `npx tsc --noEmit && npm run lint`. Expected: clean.

- [ ] **Step 9: Commit**

```bash
git add components/marketing/
git commit -m "feat: add marketing section primitives"
```

---

### Task 4: `DemandCoverageMock` (hero panel)

**Files:**
- Create: `components/marketing/DemandCoverageMock.tsx`

- [ ] **Step 1: Write the component** (hero option A — weekday demand bar + coverage pill)

```tsx
import { Calendar } from "lucide-react";
import { Reveal } from "@/components/Reveal";

type Coverage = "covered" | "gap" | "spare";

const ROWS: { day: string; width: number; state: Coverage; label: string }[] = [
  { day: "Mon", width: 64, state: "covered", label: "Covered" },
  { day: "Tue", width: 116, state: "gap", label: "Gap · +1 nurse" },
  { day: "Wed", width: 128, state: "gap", label: "Gap · +1 reception" },
  { day: "Thu", width: 60, state: "spare", label: "Overstaffed" },
  { day: "Fri", width: 88, state: "covered", label: "Covered" },
];

const PILL: Record<Coverage, string> = {
  covered: "bg-[#e7f6ee] text-[#0f6646]",
  gap: "bg-[#fcf1dd] text-[#93600f]",
  spare: "bg-[#edf4fb] text-[#114f90]",
};

export function DemandCoverageMock() {
  return (
    <Reveal delay={0.15}>
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_16px_rgba(20,33,51,0.08),0_24px_48px_rgba(20,33,51,0.14)]">
        <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
          <Calendar className="h-4 w-4 text-primary" strokeWidth={2} />
          <span className="text-[13px] font-bold text-foreground">Week ahead · demand vs coverage</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-[#fcf1dd] px-2 py-1 text-xs font-semibold text-[#93600f]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#be7a12]" />
            2 gaps flagged
          </span>
        </div>
        <div className="flex flex-col">
          {ROWS.map((r) => (
            <div
              key={r.day}
              className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0"
            >
              <span className="w-9 text-xs font-semibold text-muted-foreground">{r.day}</span>
              <span
                className="h-2 rounded-full"
                style={{
                  width: r.width,
                  background: "linear-gradient(100deg,#15c6f2,#1c68b9)",
                }}
              />
              <span className={`ml-auto rounded-full px-2.5 py-1 text-[11px] font-bold ${PILL[r.state]}`}>
                {r.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
```

- [ ] **Step 2: Verify** — `npx tsc --noEmit && npm run lint`. Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add components/marketing/DemandCoverageMock.tsx
git commit -m "feat: add demand-coverage hero mock"
```

---

### Task 5: Home content module

**Files:**
- Create: `lib/content/home.ts`

- [ ] **Step 1: Write `lib/content/home.ts`** (all Home copy; icons from lucide)

```ts
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
        "Answers “Who is working?”",
      ],
      medari: [
        "Demand-driven planning",
        "Workforce visibility and operational insights",
        "Proactive coverage before gaps appear",
        "Built for healthcare",
        "Answers “The right people, in the right place, at the right time?”",
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
```

- [ ] **Step 2: Verify** — `npx tsc --noEmit && npm run lint`. Expected: clean (confirms every icon import and `satisfies` type matches).

- [ ] **Step 3: Commit**

```bash
git add lib/content/home.ts
git commit -m "feat: add Home content module"
```

---

### Task 6: Home page composition + metadata

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`** with the composed page

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/marketing/Section";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { QuestionCards } from "@/components/marketing/QuestionCards";
import { ComparisonTable } from "@/components/marketing/ComparisonTable";
import { StepList } from "@/components/marketing/StepList";
import { StatBand } from "@/components/marketing/StatBand";
import { CredibilityBand } from "@/components/marketing/CredibilityBand";
import { CtaBand } from "@/components/marketing/CtaBand";
import { DemandCoverageMock } from "@/components/marketing/DemandCoverageMock";
import { TRUST_NOTES } from "@/lib/content/site";
import { HOME } from "@/lib/content/home";

export const metadata: Metadata = {
  title: "Workforce planning built around real demand",
  description:
    "Medari helps Australian medical practices align workforce capacity with real demand — demand forecasting, workforce planning and Best Practice integration.",
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border brand-wash">
        <div className="mx-auto grid max-w-[1160px] items-center gap-14 px-6 py-20 sm:px-8 md:py-24 lg:grid-cols-2">
          <Reveal direction="none">
            <div>
              <h1 className="text-[42px] font-extrabold leading-[1.04] tracking-[-0.03em] text-foreground sm:text-[52px] lg:text-[56px]">
                {HOME.hero.titleLead}
                <span className="brand-gradient-text">{HOME.hero.titleGradient}</span>
              </h1>
              <p className="mt-5 max-w-[480px] text-[19px] leading-[1.55] text-muted-foreground">
                {HOME.hero.subhead}
              </p>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <Button asChild size="lg">
                  <Link href={HOME.hero.primaryCta.href}>{HOME.hero.primaryCta.label}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-input bg-background text-foreground shadow-xs hover:bg-muted hover:text-foreground"
                >
                  <Link href={HOME.hero.secondaryCta.href}>{HOME.hero.secondaryCta.label}</Link>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted-foreground">
                {TRUST_NOTES.map((note) => (
                  <span key={note} className="inline-flex items-center gap-1.5">
                    <span className="h-[7px] w-[7px] rounded-full brand-gradient" />
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <DemandCoverageMock />
        </div>
      </header>

      {/* Planning problem */}
      <Section
        variant="tint"
        eyebrow={HOME.problem.eyebrow}
        title={HOME.problem.title}
        lead={HOME.problem.lead}
      >
        <QuestionCards questions={HOME.problem.questions} />
      </Section>

      {/* Meet Medari */}
      <Section eyebrow={HOME.meet.eyebrow} title={HOME.meet.title} lead={HOME.meet.lead} />

      {/* Capabilities */}
      <Section variant="tint" eyebrow={HOME.capabilities.eyebrow} title={HOME.capabilities.title}>
        <div className="grid gap-5 md:grid-cols-3">
          {HOME.capabilities.items.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <FeatureCard {...c} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Comparison */}
      <Section eyebrow={HOME.comparison.eyebrow} title={HOME.comparison.title}>
        <ComparisonTable content={HOME.comparison.content} />
      </Section>

      {/* How it works */}
      <Section variant="tint" eyebrow={HOME.how.eyebrow} title={HOME.how.title}>
        <StepList steps={HOME.how.steps} />
      </Section>

      {/* ROI */}
      <StatBand heading={HOME.roi.heading} stats={HOME.roi.stats} />

      {/* Credibility */}
      <CredibilityBand heading={HOME.credibility.heading} body={HOME.credibility.body} />

      {/* Pricing teaser */}
      <Section
        variant="tint"
        eyebrow={HOME.pricingTeaser.eyebrow}
        title={HOME.pricingTeaser.title}
        lead={HOME.pricingTeaser.lead}
      >
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/pricing">See full pricing</Link>
          </Button>
        </div>
      </Section>

      {/* Final CTA */}
      <CtaBand
        heading={HOME.finalCta.heading}
        body={HOME.finalCta.body}
        primary={HOME.finalCta.primary}
        secondary={HOME.finalCta.secondary}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify** — `npx tsc --noEmit && npm run lint`. Expected: clean. (Build comes after Header/Footer in Task 8.)

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: recompose Home from marketing kit"
```

---

### Task 7: Update Header + Footer to site content

**Files:**
- Modify: `components/Header.tsx`
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Update `Header.tsx`** — import nav + CTAs from content, link to real routes

Replace the import of `NAV_ITEMS` from `@/lib/constants` with:

```tsx
import { NAV_ITEMS, PRIMARY_CTA, SECONDARY_CTA } from "@/lib/content/site";
```

Replace the desktop actions block so the labels/hrefs come from content:

```tsx
{/* Desktop actions */}
<div className="ml-auto hidden items-center gap-3 md:flex">
  <Button
    asChild
    variant="ghost"
    size="sm"
    className="text-foreground/80 hover:bg-muted hover:text-foreground"
  >
    <Link href={SECONDARY_CTA.href}>{SECONDARY_CTA.label}</Link>
  </Button>
  <Button asChild size="sm">
    <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Link>
  </Button>
</div>
```

And in the mobile sheet, replace the two buttons with the same `SECONDARY_CTA` / `PRIMARY_CTA` links (secondary uses `variant="secondary"`). Keep the existing `Logo`, `Sheet`, and `NAV_ITEMS.map(...)` structure.

- [ ] **Step 2: Update `Footer.tsx`** — drive columns from `FOOTER_COLUMNS`

```tsx
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { FOOTER_COLUMNS, FOOTER_TAGLINE } from "@/lib/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pb-10 pt-13">
      <div className="mx-auto max-w-[1160px] px-6 sm:px-8">
        <div className="grid gap-8 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo size={26} className="mb-3.5" />
            <p className="max-w-[260px] text-sm leading-[1.55] text-muted-foreground">
              {FOOTER_TAGLINE}
            </p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-3.5 text-xs font-bold uppercase tracking-[0.06em] text-secondary">
                {col.heading}
              </h4>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="mb-2.5 block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-5 text-[13px] text-secondary sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Medari. Made in Australia.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verify** — `npx tsc --noEmit && npm run lint`. Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add components/Header.tsx components/Footer.tsx
git commit -m "refactor: drive Header and Footer from site content"
```

---

### Task 8: Remove obsolete components + Phase 1 verification

**Files:**
- Delete: `components/HeroSection.tsx`, `components/FeaturesSection.tsx`, `components/FillShiftsSection.tsx`, `components/StatsSection.tsx`, `components/TestimonialSection.tsx`, `components/CtaSection.tsx`, `components/RosterMock.tsx`
- Modify: `app/layout.tsx` (update `metadata` defaults to Medari — already set; confirm `SITE_NAME` import resolves)
- Modify: `lib/constants.ts` (delete once nothing imports it)

- [ ] **Step 1: Confirm nothing imports the obsolete files**

```bash
grep -rn "HeroSection\|FeaturesSection\|FillShiftsSection\|StatsSection\|TestimonialSection\|CtaSection\|RosterMock" app components --include=*.tsx | grep -v "components/marketing"
```
Expected: no results (Home no longer references them).

- [ ] **Step 2: Delete the files**

```bash
rm components/HeroSection.tsx components/FeaturesSection.tsx components/FillShiftsSection.tsx components/StatsSection.tsx components/TestimonialSection.tsx components/CtaSection.tsx components/RosterMock.tsx
```

- [ ] **Step 3: Migrate `layout.tsx` imports** — it imports `SITE_NAME`/`SITE_URL` from `@/lib/constants`. Repoint to `@/lib/content/site`:

```tsx
import { SITE_NAME, SITE_URL } from "@/lib/content/site";
```
Then `grep -rn "@/lib/constants" app components lib` — if zero results, `rm lib/constants.ts`.

- [ ] **Step 4: Build + smoke-test**

```bash
npx tsc --noEmit && npm run lint && npm run build
(npm run start -- -p 3131 >/tmp/medari.log 2>&1 &) ; sleep 4
curl -s -o /dev/null -w "home %{http_code}\n" http://localhost:3131/
curl -s http://localhost:3131/ | grep -o -E "real demand|planning problem|Best Practice|One better staffing decision"
pkill -f "next start"
```
Expected: `home 200` and all four phrases present.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: remove obsolete landing sections after Home rebuild"
```

---

## Phase 2 — Pricing

### Task 9: Pricing + FAQ content

**Files:**
- Create: `lib/content/pricing.ts`
- Create: `lib/content/faq.ts`

- [ ] **Step 1: Write `lib/content/pricing.ts`**

```ts
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
  annualNote: "Annual prices shown are derived from the stated “save 20%” and are indicative until confirmed.",
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
```

- [ ] **Step 2: Write `lib/content/faq.ts`**

```ts
export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ: FaqItem[] = [
  { q: "Do I need to be using Best Practice?", a: "Currently, Medari integrates with Best Practice Software. Additional practice management system integrations are planned in future releases." },
  { q: "How does the 30-day free trial work?", a: "Start your free trial with a valid credit card. You won't be charged during the trial period and can cancel any time before your trial ends." },
  { q: "Is there a lock-in contract?", a: "No. All plans are month-to-month unless you choose annual billing." },
  { q: "How long does setup take?", a: "Most Practices can be up and running within minutes. Connect your Practice, import your team, and Medari begins analysing historical activity to generate workforce insights." },
  { q: "Does Medari roster doctors?", a: "No. Medari does not treat GPs as employees or create GP rosters. Instead, it helps Practices manage GP availability, clinical sessions, room allocation and workforce capacity — so planning aligns with how Practices actually operate." },
  { q: "What staff can Medari help manage?", a: "Receptionists, nurses, Practice Managers, administration teams, allied health professionals, specialists, contractors and support staff." },
  { q: "How does demand forecasting work?", a: "Medari analyses historical Practice activity and appointment patterns to predict future demand, helping identify peak periods, quiet periods, staffing gaps and capacity constraints before problems occur." },
  { q: "What happens if I have no historical data?", a: "Medari supports both cold-start and warm-start Practices. For new Practices, you can enter workforce preferences, availability, operational rules and target hours. As Medari collects data, forecasting and recommendations become increasingly accurate." },
  { q: "Can Medari manage multiple locations?", a: "Yes — multi-location workforce planning and reporting." },
  { q: "Can staff access Medari on mobile?", a: "Yes. Staff can view schedules, update availability, submit timesheets and receive notifications from any device." },
  { q: "Is my data secure?", a: "Yes. Medari follows industry security standards and only accesses the data required to provide workforce planning and forecasting. Data remains owned by the Practice." },
  { q: "Can I cancel anytime?", a: "Yes. You can cancel any time before your next billing cycle. There are no lock-in contracts." },
];
```

- [ ] **Step 3: Verify** — `npx tsc --noEmit && npm run lint`. Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add lib/content/pricing.ts lib/content/faq.ts
git commit -m "feat: add Pricing and FAQ content modules"
```

---

### Task 10: PricingTiers + FaqAccordion components

**Files:**
- Create: `components/marketing/PricingTiers.tsx`
- Create: `components/marketing/FaqAccordion.tsx`

- [ ] **Step 1: Write `PricingTiers.tsx`** (client — Monthly/Annual toggle)

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING, type PriceTier } from "@/lib/content/pricing";

export function PricingTiers() {
  const [annual, setAnnual] = useState(false);
  return (
    <div>
      <div className="mb-10 flex items-center justify-center gap-3">
        <Toggle annual={annual} setAnnual={setAnnual} />
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {PRICING.tiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} annual={annual} />
        ))}
      </div>
      <p className="mt-6 text-center text-[13px] text-muted-foreground">{PRICING.trialNote}</p>
      {annual && (
        <p className="mt-1 text-center text-[12px] text-muted-foreground/80">{PRICING.annualNote}</p>
      )}
    </div>
  );
}

function Toggle({ annual, setAnnual }: { annual: boolean; setAnnual: (v: boolean) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-muted p-1 text-sm font-semibold">
      <button
        type="button"
        onClick={() => setAnnual(false)}
        className={`rounded-full px-4 py-1.5 transition-colors ${!annual ? "bg-card text-foreground shadow-xs" : "text-muted-foreground"}`}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => setAnnual(true)}
        className={`rounded-full px-4 py-1.5 transition-colors ${annual ? "bg-card text-foreground shadow-xs" : "text-muted-foreground"}`}
      >
        Annual <span className="text-accent">·20%</span>
      </button>
    </div>
  );
}

function TierCard({ tier, annual }: { tier: PriceTier; annual: boolean }) {
  const price = annual ? tier.annualMonthly : tier.monthly;
  return (
    <div
      className={`flex flex-col rounded-xl border bg-card p-7 ${tier.featured ? "border-primary shadow-[0_8px_24px_rgba(20,33,51,0.10)]" : "border-border"}`}
    >
      <h3 className="text-[19px] font-bold text-foreground">{tier.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{tier.scale}</p>
      <div className="mt-5 mb-6">
        {price === null ? (
          <span className="text-[28px] font-extrabold text-foreground">Custom</span>
        ) : (
          <>
            <span className="font-mono text-[36px] font-extrabold tracking-tight text-foreground">
              ${price}
            </span>
            <span className="text-sm text-muted-foreground"> /month incl GST</span>
          </>
        )}
      </div>
      <Button
        asChild
        className="mt-auto w-full"
        variant={tier.featured ? "default" : "outline"}
      >
        <Link href={tier.cta.href}>{tier.cta.label}</Link>
      </Button>
    </div>
  );
}

export function IncludedList() {
  return (
    <ul className="mx-auto grid max-w-[820px] gap-3 sm:grid-cols-2">
      {PRICING.included.map((item) => (
        <li key={item} className="flex items-center gap-2.5 text-[15px] text-foreground">
          <Check className="h-[18px] w-[18px] shrink-0 text-[#15835a]" strokeWidth={2.5} />
          {item}
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 2: Write `FaqAccordion.tsx`** (wraps existing shadcn accordion)

```tsx
"use client";

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
```

- [ ] **Step 3: Verify** — `npx tsc --noEmit && npm run lint`. (If the `accordion` shadcn component is missing, add it: `npx shadcn@latest add accordion`. It is already present at `components/ui/accordion.tsx`.) Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add components/marketing/PricingTiers.tsx components/marketing/FaqAccordion.tsx
git commit -m "feat: add PricingTiers and FaqAccordion components"
```

---

### Task 11: Pricing page

**Files:**
- Create: `app/pricing/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from "next";
import { Check, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/marketing/Section";
import { QuestionCards } from "@/components/marketing/QuestionCards";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PricingTiers, IncludedList } from "@/components/marketing/PricingTiers";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { PRICING } from "@/lib/content/pricing";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple pricing built for Practices — no per-user fees, every plan includes a 30-day free trial. Growth, Scale and Enterprise plans.",
};

export default function PricingPage() {
  return (
    <>
      <Section eyebrow={PRICING.eyebrow} title={PRICING.title} lead={PRICING.lead} className="pt-28">
        <PricingTiers />
      </Section>

      <Section variant="tint" title="Everything's included" align="center">
        <IncludedList />
      </Section>

      <Section eyebrow="Why Medari?" title={PRICING.why.title} lead={PRICING.why.lead}>
        <QuestionCards questions={PRICING.why.questions} />
      </Section>

      <Section variant="tint" title={PRICING.roi.title} align="center">
        <div className="mx-auto grid max-w-[820px] gap-5 md:grid-cols-2">
          <RoiCard heading="Reduce" items={PRICING.roi.reduce} icon="down" />
          <RoiCard heading="Improve" items={PRICING.roi.improve} icon="up" />
        </div>
      </Section>

      <Section title="Common questions" align="center">
        <FaqAccordion />
      </Section>

      <CtaBand
        heading="Start your 30-day free trial"
        body="See how Medari helps your Practice align workforce capacity with real demand."
        primary={PRIMARY_CTA}
        secondary={SECONDARY_CTA}
      />
    </>
  );
}

function RoiCard({ heading, items, icon }: { heading: string; items: string[]; icon: "up" | "down" }) {
  return (
    <div className="rounded-xl border border-border bg-card p-7">
      <h3 className="mb-4 text-[17px] font-bold text-foreground">{heading}</h3>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[15px] text-muted-foreground">
            {icon === "up" ? (
              <ArrowUpRight className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#15835a]" strokeWidth={2.5} />
            ) : (
              <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary" strokeWidth={2.5} />
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Build + smoke-test**

```bash
npx tsc --noEmit && npm run lint && npm run build
(npm run start -- -p 3131 >/tmp/medari.log 2>&1 &) ; sleep 4
curl -s -o /dev/null -w "pricing %{http_code}\n" http://localhost:3131/pricing
curl -s http://localhost:3131/pricing | grep -o -E "Built for Practices|\\\$250|30-day free trial|Does Medari roster doctors"
pkill -f "next start"
```
Expected: `pricing 200` and the phrases present (the FAQ "Does Medari roster doctors" confirms the planning positioning is reinforced).

- [ ] **Step 3: Commit**

```bash
git add app/pricing/page.tsx
git commit -m "feat: add Pricing page"
```

---

## Phase 3 — Book a Demo

### Task 12: Demo zod schema + server action

**Files:**
- Create: `lib/validations/demo.ts`
- Create: `lib/actions/demo.ts`

- [ ] **Step 1: Write `lib/validations/demo.ts`**

```ts
import { z } from "zod";

export const PRACTICE_SIZES = ["Growth (1–3 GPs)", "Scale (4–8 GPs)", "Enterprise (8+ GPs)"] as const;

export const demoSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  practice: z.string().min(2, "Please enter your Practice name."),
  size: z.enum(PRACTICE_SIZES, { message: "Please select your Practice size." }),
  phone: z.string().optional(),
  message: z.string().max(2000).optional(),
});

export type DemoFormValues = z.infer<typeof demoSchema>;
```

- [ ] **Step 2: Write `lib/actions/demo.ts`** (mirror existing `contact.ts`: bot-check → validate → Resend)

```ts
"use server";

import { checkBotId } from "botid/server";
import { Resend } from "resend";
import { demoSchema } from "@/lib/validations/demo";

export async function submitDemoRequest(input: unknown) {
  const verification = await checkBotId();
  if (verification.isBot) return { success: false, error: "Access denied." };

  const parsed = demoSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Invalid input." };

  const { name, email, practice, size, phone, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.SMTP_FROM;
  const to = process.env.SMTP_TO;
  if (!apiKey || !from || !to) {
    return { success: false, error: "Email is not configured." };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Demo request — ${practice} (${size})`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Practice: ${practice}`,
        `Size: ${size}`,
        `Phone: ${phone ?? "—"}`,
        "",
        message ?? "(no message)",
      ].join("\n"),
    });
    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
```

- [ ] **Step 3: Verify** — `npx tsc --noEmit && npm run lint`. Expected: clean. (Cross-check `lib/actions/contact.ts` for the exact Resend call signature/imports the repo already uses and match it.)

- [ ] **Step 4: Commit**

```bash
git add lib/validations/demo.ts lib/actions/demo.ts
git commit -m "feat: add demo request schema and server action"
```

---

### Task 13: DemoRequestForm

**Files:**
- Create: `components/marketing/DemoRequestForm.tsx`

- [ ] **Step 1: Write the form** (react-hook-form + zod, success/error states)

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { demoSchema, type DemoFormValues, PRACTICE_SIZES } from "@/lib/validations/demo";
import { submitDemoRequest } from "@/lib/actions/demo";

export function DemoRequestForm() {
  const form = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: { name: "", email: "", practice: "", phone: "", message: "" },
  });
  const { isSubmitting, isSubmitSuccessful } = form.formState;

  async function onSubmit(data: DemoFormValues) {
    const result = await submitDemoRequest(data);
    if (!result.success) {
      form.setError("root", { message: result.error ?? "Something went wrong. Please try again." });
    }
  }

  if (isSubmitSuccessful && !form.formState.errors.root) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#15835a]" />
        <h3 className="mt-3 text-[20px] font-bold text-foreground">Request received</h3>
        <p className="mt-1 text-muted-foreground">
          We&apos;ll be in touch to book your 30-minute demo.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 rounded-xl border border-border bg-card p-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl><Input placeholder="Jane Smith" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Work email *</FormLabel>
              <FormControl><Input type="email" placeholder="jane@practice.com.au" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField control={form.control} name="practice" render={({ field }) => (
            <FormItem>
              <FormLabel>Practice name *</FormLabel>
              <FormControl><Input placeholder="Brunswick Family Medical" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="size" render={({ field }) => (
            <FormItem>
              <FormLabel>Practice size *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PRACTICE_SIZES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel>Phone (optional)</FormLabel>
            <FormControl><Input placeholder="(03) 9000 0000" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <FormLabel>Anything we should know? (optional)</FormLabel>
            <FormControl><Textarea className="min-h-28 resize-none" placeholder="Tell us about your Practice…" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        {form.formState.errors.root && (
          <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
        )}
        <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
          {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending…</>) : "Book my demo"}
        </Button>
      </form>
    </Form>
  );
}
```

- [ ] **Step 2: Verify** — `npx tsc --noEmit && npm run lint`. (Confirm `components/ui/select` exists — it does. If not: `npx shadcn@latest add select`.) Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add components/marketing/DemoRequestForm.tsx
git commit -m "feat: add demo request form"
```

---

### Task 14: Demo content + Book a Demo page

**Files:**
- Create: `lib/content/demo.ts`
- Create: `app/book-demo/page.tsx`

- [ ] **Step 1: Write `lib/content/demo.ts`**

```ts
export const DEMO = {
  eyebrow: "Book a demo",
  title: "See how Medari helps you align workforce capacity with real demand",
  lead: "In 30 minutes we'll show you how demand-driven workforce planning works for a Practice like yours. No obligation.",
  whatYoullSee: [
    { title: "Workforce planning", body: "Plan staffing based on expected demand rather than guesswork." },
    { title: "Demand forecasting", body: "How historical activity identifies peak periods and workforce requirements." },
    { title: "Session & room planning", body: "Align workforce coverage with operational capacity." },
    { title: "Dashboard & insights", body: "The visibility Practice Managers have been missing." },
    { title: "Best Practice integration", body: "How Medari connects directly with Best Practice Software." },
  ],
  idealFor: {
    types: ["General Practices", "Allied Health Clinics", "Specialist Clinics", "Multi-site Healthcare Organisations"],
    roles: ["Practice Owners", "Practice Managers", "Operations Leaders"],
  },
  next: [
    { title: "Book your demo", body: "Pick a time that suits you." },
    { title: "Meet a specialist", body: "Talk with a Medari specialist about your Practice." },
    { title: "See real workflows", body: "Watch Medari work using real healthcare workflows." },
    { title: "Start your free trial", body: "Begin your 30-day free trial. No obligation." },
  ],
};
```

- [ ] **Step 2: Write `app/book-demo/page.tsx`** (Cal/Calendly slot marked above the form)

```tsx
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Section } from "@/components/marketing/Section";
import { StepList } from "@/components/marketing/StepList";
import { DemoRequestForm } from "@/components/marketing/DemoRequestForm";
import { DEMO } from "@/lib/content/demo";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "Book a 30-minute Medari demo and see how demand-driven workforce planning helps your Practice operate more efficiently.",
};

export default function BookDemoPage() {
  return (
    <>
      <Section eyebrow={DEMO.eyebrow} title={DEMO.title} lead={DEMO.lead} align="start" className="pt-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(380px,460px)]">
          {/* Left: what you'll see + ideal for */}
          <div>
            <h3 className="mb-4 text-[17px] font-bold text-foreground">What you&apos;ll see in 30 minutes</h3>
            <div className="flex flex-col gap-4">
              {DEMO.whatYoullSee.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#15835a]" strokeWidth={2.5} />
                  <div>
                    <div className="text-[15px] font-semibold text-foreground">{item.title}</div>
                    <div className="text-[14px] text-muted-foreground">{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="mb-3 mt-8 text-[17px] font-bold text-foreground">Medari is ideal for</h3>
            <div className="flex flex-wrap gap-2">
              {[...DEMO.idealFor.types, ...DEMO.idealFor.roles].map((tag) => (
                <span key={tag} className="rounded-full border border-border bg-muted px-3 py-1 text-[13px] text-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: booking. Cal/Calendly embed slot, then the fallback form. */}
          <div>
            {/* Cal.com / Calendly embed goes here when a link is provided — replace the form below. */}
            <DemoRequestForm />
          </div>
        </div>
      </Section>

      <Section variant="tint" title="What happens next" align="center">
        <StepList steps={DEMO.next} />
      </Section>
    </>
  );
}
```

- [ ] **Step 3: Build + smoke-test**

```bash
npx tsc --noEmit && npm run lint && npm run build
(npm run start -- -p 3131 >/tmp/medari.log 2>&1 &) ; sleep 4
curl -s -o /dev/null -w "book-demo %{http_code}\n" http://localhost:3131/book-demo
curl -s http://localhost:3131/book-demo | grep -o -E "What you.ll see|Book my demo|What happens next"
pkill -f "next start"
```
Expected: `book-demo 200` and the phrases present.

- [ ] **Step 4: Commit**

```bash
git add lib/content/demo.ts app/book-demo/page.tsx
git commit -m "feat: add Book a Demo page with demo form and Cal slot"
```

---

## Phase 4 — Product

### Task 15: Product content

**Files:**
- Create: `lib/content/product.ts`

- [ ] **Step 1: Write `lib/content/product.ts`**

```ts
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
```

- [ ] **Step 2: Verify** — `npx tsc --noEmit && npm run lint`. Expected: clean (validates all 8 lucide icon names resolve).

- [ ] **Step 3: Commit**

```bash
git add lib/content/product.ts
git commit -m "feat: add Product content module"
```

---

### Task 16: Product page

**Files:**
- Create: `app/product/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/marketing/Section";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { ComparisonTable } from "@/components/marketing/ComparisonTable";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PRODUCT } from "@/lib/content/product";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Medari is a workforce planning and operational intelligence platform for healthcare — demand forecasting, workforce planning, session and room planning, and Best Practice integration.",
};

export default function ProductPage() {
  return (
    <>
      <Section eyebrow={PRODUCT.hero.eyebrow} title={PRODUCT.hero.title} lead={PRODUCT.hero.lead} className="pt-28" />

      <Section variant="tint" eyebrow={PRODUCT.problem.eyebrow} title={PRODUCT.problem.title} lead={PRODUCT.problem.lead}>
        <div className="mx-auto grid max-w-[820px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT.problem.consequences.map((c) => (
            <div key={c} className="rounded-xl border border-border bg-card p-5 text-[15px] text-muted-foreground">
              {c}
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow={PRODUCT.what.eyebrow} title={PRODUCT.what.title} lead={PRODUCT.what.lead} />

      <Section variant="tint" eyebrow={PRODUCT.capabilities.eyebrow} title={PRODUCT.capabilities.title}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT.capabilities.items.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <FeatureCard {...c} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow={PRODUCT.comparison.eyebrow} title={PRODUCT.comparison.title}>
        <ComparisonTable content={PRODUCT.comparison.content} />
      </Section>

      <Section variant="tint" eyebrow={PRODUCT.outcomes.eyebrow} title={PRODUCT.outcomes.title}>
        <ul className="mx-auto grid max-w-[820px] gap-3 sm:grid-cols-2">
          {PRODUCT.outcomes.items.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-[15px] text-foreground">
              <Check className="h-[18px] w-[18px] shrink-0 text-[#15835a]" strokeWidth={2.5} />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={PRODUCT.goal.title} lead={PRODUCT.goal.lead} align="center" />

      <CtaBand
        heading="See Medari on your Practice's data"
        body="Book a 20-minute demo — no obligation."
        primary={PRIMARY_CTA}
        secondary={SECONDARY_CTA}
      />
    </>
  );
}
```

- [ ] **Step 2: Build + smoke-test**

```bash
npx tsc --noEmit && npm run lint && npm run build
(npm run start -- -p 3131 >/tmp/medari.log 2>&1 &) ; sleep 4
curl -s -o /dev/null -w "product %{http_code}\n" http://localhost:3131/product
curl -s http://localhost:3131/product | grep -o -E "operational intelligence|Core capabilities|right people, in the right place"
pkill -f "next start"
```
Expected: `product 200` and phrases present.

- [ ] **Step 3: Commit**

```bash
git add app/product/page.tsx
git commit -m "feat: add Product page"
```

---

## Phase 5 — About

### Task 17: About content

**Files:**
- Create: `lib/content/about.ts`

- [ ] **Step 1: Write `lib/content/about.ts`**

```ts
export const ABOUT = {
  hero: {
    eyebrow: "About Medari",
    title: "Built from real conversations. Not a boardroom.",
    lead: "We spent years working inside healthcare organisations before we built a single line of code. What we kept seeing convinced us something had to change.",
  },
  problem: {
    eyebrow: "The problem",
    title: "Workforce planning deserves better than spreadsheets or guesswork",
    lead: "Despite enormous advances in clinical technology, workforce planning has been left behind — still held together by spreadsheets, whiteboards and reactive decision-making. Not because people aren't capable. Because nobody built the right tools.",
    roles: [
      { title: "Practice managers", body: "Absorbing constant roster changes without the data to stay ahead of them." },
      { title: "Nursing teams", body: "Stretched during peak periods while capacity sits idle elsewhere." },
      { title: "Reception staff", body: "Fielding pressure from every direction without operational visibility." },
      { title: "Practice owners", body: "Making major workforce decisions without the data to support them." },
    ],
  },
  why: {
    eyebrow: "Why we built this",
    title: "We kept asking the same question",
    body: "We've worked alongside healthcare organisations across Australia for years. Organisations were making some of their biggest operational decisions without reliable data, and talented teams were working incredibly hard with no visibility into what was coming. That's where Medari began — not from a funding round or a whiteboard session, but from those conversations.",
  },
  believe: {
    eyebrow: "What we believe",
    title: "Better operations create better outcomes for everyone",
    items: [
      "Healthcare organisations should see demand before it arrives, not scramble after it does.",
      "Managers should spend less time fighting operational fires and more time leading their teams.",
      "Workforce planning should be proactive. The data already exists — it just needs to be surfaced.",
      "Technology should reduce operational stress, not layer more complexity on top of it.",
    ],
  },
  how: {
    eyebrow: "How we work",
    title: "Built with healthcare, not just for it",
    lead: "Medari is developed alongside the organisations that use it. We listen to what's working, fix what isn't, and build what's actually needed — not what looks good in a demo.",
    outcomes: [
      { who: "Patients", what: "Better experience" },
      { who: "Staff", what: "Less pressure" },
      { who: "Managers", what: "More confidence" },
      { who: "Owners", what: "Stronger business" },
    ],
  },
};
```

- [ ] **Step 2: Verify** — `npx tsc --noEmit && npm run lint`. Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add lib/content/about.ts
git commit -m "feat: add About content module"
```

---

### Task 18: About page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from "next";
import { Section } from "@/components/marketing/Section";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ABOUT } from "@/lib/content/about";
import { PRIMARY_CTA } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Medari was built from real conversations with Australian healthcare teams — workforce planning developed alongside the Practices that use it.",
};

export default function AboutPage() {
  return (
    <>
      <Section eyebrow={ABOUT.hero.eyebrow} title={ABOUT.hero.title} lead={ABOUT.hero.lead} align="start" className="pt-28" />

      <Section variant="tint" eyebrow={ABOUT.problem.eyebrow} title={ABOUT.problem.title} lead={ABOUT.problem.lead} align="start">
        <div className="grid gap-4 sm:grid-cols-2">
          {ABOUT.problem.roles.map((r) => (
            <div key={r.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-1.5 text-[16px] font-bold text-foreground">{r.title}</h3>
              <p className="text-[14px] leading-[1.5] text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow={ABOUT.why.eyebrow} title={ABOUT.why.title} lead={ABOUT.why.body} align="start" />

      <Section variant="tint" eyebrow={ABOUT.believe.eyebrow} title={ABOUT.believe.title} align="start">
        <ul className="flex flex-col gap-4">
          {ABOUT.believe.items.map((item) => (
            <li key={item} className="border-l-2 border-primary pl-4 text-[17px] leading-[1.55] text-foreground">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow={ABOUT.how.eyebrow} title={ABOUT.how.title} lead={ABOUT.how.lead} align="start">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT.how.outcomes.map((o) => (
            <div key={o.who} className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="text-[17px] font-bold text-foreground">{o.who}</div>
              <div className="mt-1 text-[14px] text-muted-foreground">{o.what}</div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        heading="If you believe healthcare teams deserve better tools, we'd love to hear from you."
        body="Whether you're a practice manager, owner, or someone who's felt this problem firsthand — get in touch."
        primary={PRIMARY_CTA}
      />
    </>
  );
}
```

- [ ] **Step 2: Build + smoke-test**

```bash
npx tsc --noEmit && npm run lint && npm run build
(npm run start -- -p 3131 >/tmp/medari.log 2>&1 &) ; sleep 4
curl -s -o /dev/null -w "about %{http_code}\n" http://localhost:3131/about
curl -s http://localhost:3131/about | grep -o -E "real conversations|Better operations|Built with healthcare"
pkill -f "next start"
```
Expected: `about 200` and phrases present.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: add About page"
```

---

## Phase 6 — Sitewide polish + final verification

### Task 19: Metadata, sitemap, content-integrity sweep, full build

**Files:**
- Modify: `app/sitemap.ts`
- Modify: `app/layout.tsx` (confirm title template + base description reflect Medari)

- [ ] **Step 1: Update `app/sitemap.ts`** to list all five routes

```ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/product", "/pricing", "/about", "/book-demo"];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
```

- [ ] **Step 2: Content-integrity sweep** — no GP-rostering / SMS-broadcast language leaked into shipped pages/components

```bash
grep -rniE "broadcast|open shift|fill (open )?shift|sms" app components lib/content || echo "clean: no rostering/broadcast language"
```
Expected: `clean: ...`. (If anything matches, remove it — that copy belongs to the retired framing.)

- [ ] **Step 3: Full build + all-routes smoke-test**

```bash
npx tsc --noEmit && npm run lint && npm run build
(npm run start -- -p 3131 >/tmp/medari.log 2>&1 &) ; sleep 4
for r in "" product pricing about book-demo; do
  curl -s -o /dev/null -w "/$r %{http_code}\n" "http://localhost:3131/$r"
done
pkill -f "next start"
```
Expected: every route returns `200`.

- [ ] **Step 4: Manual check (browser)** — `npm run dev`, then walk all 5 routes: nav links resolve, every CTA lands on a real page (no `#` CTAs), the demo form validates (submit empty → field errors) and shows the success panel on a valid submit when env vars are set, fonts/gradient render. Confirm no fabricated testimonial appears.

- [ ] **Step 5: Commit**

```bash
git add app/sitemap.ts app/layout.tsx
git commit -m "chore: sitewide metadata, sitemap and content-integrity pass"
```

---

## Self-review (completed during authoring)

- **Spec coverage:** every spec section maps to a task — IA/routes (Tasks 6,11,14,16,18), shared kit (Tasks 2–4,10,13), content layer (Tasks 1,5,9,15,17 + faq/demo), demo form + data flow + states (Tasks 12–14), credibility band quote-ready (Task 3/6), derived annual prices labelled (Task 9 `annualNote`), retired components (Task 8), CTA routing no-dead-ends (site.ts + tiers → /book-demo), verification (Tasks 8,11,14,16,18,19).
- **Placeholder scan:** no "TBD"/"TODO"; the only intentional placeholders are the documented Cal-embed slot (Task 14) and `#` footer links for pages that don't exist yet (Task 1) — both flagged in the spec's assumptions.
- **Type consistency:** `Capability`, `Step`, `Stat`, `ComparisonContent`, `CtaLink`, `PriceTier`, `FaqItem`, `DemoFormValues` are each defined once and consumed with matching shapes; `submitDemoRequest`/`demoSchema`/`PRACTICE_SIZES` names match across Tasks 12–13.

## Open items carried from the spec (need client input, not blockers)

1. Real annual prices (currently derived 20% off, labelled).
2. Cal.com/Calendly booking link (form ships; embed slot ready).
3. Real customer quote (CredibilityBand is quote-ready).
4. Footer secondary link destinations (Careers, Security, Help centre, Status) — `#` until provided.
5. Product-page demo video asset (omitted until supplied).
