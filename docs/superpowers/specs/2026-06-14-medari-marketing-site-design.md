# Medari Marketing Site — Design Spec

_Date: 2026-06-14 · Status: approved for planning_

## 1. Context

The repo is a Next.js 16 / React 19 / Tailwind v4 + shadcn template. An initial Medari
landing page was already built from a Claude Design handoff bundle (the `.mds-*` design
system: cyan→blue→violet→magenta brand gradient, Hanken Grotesk + IBM Plex Mono + Gabarito
wordmark). That first pass framed Medari as **rostering + SMS open-shift broadcasts + GP
shift-filling + timesheets/payroll**.

The client then supplied five PDFs of real product copy (About Us, Home, Product, Pricing,
Book a Demo). They reposition Medari as a **demand-driven workforce *planning* and
operational-intelligence platform** — explicitly **not** a GP roster tool:

> "Traditional rostering software answers 'Who is working?' Medari answers 'Do I have the
> right people, in the right place, at the right time?'"
> "Does Medari roster doctors? **No.** Medari does not treat GPs as employees or create GP
> rosters." (Pricing FAQ)

This spec realigns the site to the real positioning and expands it from one landing page to
a five-page marketing site, reusing the existing design system.

## 2. Goals & non-goals

**Goals**
- Realign all messaging to demand-driven workforce planning; remove GP-rostering and
  SMS-broadcast framing.
- Build five pages: Home, Product, Pricing, About, Book a Demo.
- Keep the existing visual system (gradient, fonts, tokens, nav/footer shells).
- Make copy maintainable via a typed content layer.
- A working demo-request form (Resend), with a slot for a future Cal/Calendly embed.
- Zero fabricated content — no fake testimonials; any derived numbers labelled.

**Non-goals**
- No app/product UI (this is the marketing site only).
- No real scheduler integration yet (form now; embed later when a link is provided).
- No CMS — content lives in typed TS modules.
- No blog/help-centre/status pages this round (footer links may point to `#` placeholders).

## 3. Key decisions (locked with the client)

| # | Decision | Choice |
|---|----------|--------|
| 1 | Positioning | **Realign** to the planning story; drop GP rostering + SMS broadcasts |
| 2 | Scope | **Full site** — Home, Product, Pricing, About, Book a Demo |
| 3 | Hero visual | **Option A — "demand + coverage" panel** (weekday demand bar + coverage state) |
| 4 | Social proof | **Credibility band** from About Us ("Built with healthcare, not just for it"); no fake quotes; layout is quote-ready for a real testimonial later |
| 5 | Demo booking | **Custom Resend form now** + clearly-marked slot for a Cal/Calendly embed later |
| 6 | Code structure | **Content-driven components** — shared section kit + typed content modules; pages are thin compositions |
| 7 | Build order | Shared kit + Home first, then Pricing → Book a Demo → Product → About |

## 4. Information architecture

Routes (App Router, one folder per page):

```
app/page.tsx            → Home
app/product/page.tsx    → Product
app/pricing/page.tsx    → Pricing
app/about/page.tsx      → About
app/book-demo/page.tsx  → Book a Demo
```

- Each page exports its own `metadata` (title/description from real copy).
- Nav: `Product · Pricing · About` links (real routes) + **Book a Demo** primary button.
- Primary CTA across the site: **Book a Demo** → `/book-demo`. Secondary: **Start Free
  Trial**.
- **CTA destinations** (no self-serve signup/app exists yet): every **Book a Demo** →
  `/book-demo`; every **Start Free Trial** → `/pricing` (where the trial terms + tier
  buttons live); the per-tier **Start Free Trial** buttons on Pricing also → `/book-demo`
  (a demo is the real entry point until a signup flow exists). This keeps every CTA landing
  on a real page — no dead `#` CTAs. Revisit when a signup/trial flow is built.
- Footer: Product / Company / Resources columns + tagline + "© Medari. Made in Australia."
  Unknown *footer* link destinations use `#` placeholders (flagged, not invented).

## 5. Shared component kit (`components/marketing/`)

Each unit has one purpose and a typed prop contract. All consume design tokens; none hold
page copy (copy comes from the content layer).

- **`Section`** — page section wrapper. Props: `eyebrow?`, `title?`, `lead?`,
  `variant: "white" | "tint"`, `align: "center" | "start"`, `children`. Owns vertical
  rhythm (88px) and the eyebrow/heading block.
- **`FeatureCard`** — icon tile (token colour) + title + body. Used by capabilities grids.
- **`QuestionCards`** — grid of plain question chips (the "Do I have enough staff
  tomorrow?" list).
- **`ComparisonTable`** — two columns (Traditional vs Medari), Medari column emphasised.
- **`StepList`** — numbered steps (how-it-works / what-happens-next). Props: `steps[]`.
- **`StatBand`** — dark gradient-wash band, 3 gradient-text stats. Reuses current
  `StatsSection` styling.
- **`PricingTiers`** — 3 tier cards + Monthly/Annual toggle (client component for toggle
  state). Props: `tiers[]`, `billing`.
- **`FaqAccordion`** — wraps existing `components/ui/accordion`. Props: `items[]`.
- **`CredibilityBand`** — centered message band; optional `quote`/`attribution` props so a
  real testimonial drops in later without layout change.
- **`CtaBand`** — gradient band, heading + two CTAs.
- **`DemandCoverageMock`** — the hero panel (replaces `RosterMock`): weekday rows, each a
  predicted-demand bar + a coverage status pill (Covered / Gap +N role / Overstaffed),
  header badge "N gaps flagged". Static, presentational.

Reused as-is: `Reveal`, `Logo`, `Header`, `Footer` (Header/Footer updated for real nav/links).

## 6. Content layer (`lib/content/`)

Typed modules; pages/sections import from here. One edit point per concern.

- `site.ts` — nav items, footer columns, CTA labels, trust line.
- `home.ts`, `product.ts`, `pricing.ts`, `about.ts`, `demo.ts` — per-page copy.
- `faq.ts` — shared FAQ items (used on Pricing).

## 7. Page specifications

Copy is sourced verbatim/condensed from the client PDFs. AU spelling; capital-P "Practice".

### 7.1 Home (`app/page.tsx`)
1. **Hero** — H1 "Workforce planning built around **real demand.**" ("real demand" in
   gradient). Subhead: "Stop guessing staffing levels. Start making workforce decisions with
   confidence." CTAs: Book a Demo / Start Free Trial. Trust line: "Built for Australian
   healthcare · Integrated with Best Practice Software." Right: `DemandCoverageMock`.
2. **Planning problem** (tint) — "Most Practices don't have a staffing problem. They have a
   **planning problem.**" + `QuestionCards` (the 5 questions).
3. **Meet Medari** — "The workforce planning platform for healthcare" + "No spreadsheets. No
   guesswork. No reactive staffing. Just better planning."
4. **What Medari helps you do** (tint) — 6 `FeatureCard`s: Demand Forecasting, Intelligent
   Workforce Planning, Best Practice Integration, Workforce Visibility, Fair Team Allocation,
   Faster Response to Change.
5. **Why Medari is different** — `ComparisonTable`.
6. **How it works** (tint) — `StepList`: Connect → Analyse demand → Plan with confidence →
   Improve continuously.
7. **ROI** — `StatBand`: "5+ hrs/week saved", "$10–30k+/yr typical value", "30-day free
   trial". Heading "One better staffing decision can pay for Medari."
8. **Credibility** — `CredibilityBand`: "Built with healthcare, not just for it."
9. **Pricing teaser** (tint) — 3 tiers summary → link to /pricing; "Every plan includes a
   30-day free trial."
10. **Final CTA** — `CtaBand`: "Ready to see Medari in action?" Book a Demo / Start Free Trial.

### 7.2 Product (`app/product/page.tsx`)
Hero ("Workforce Planning Built Around Real Demand" + video placeholder slot) → The Problem
(systems for appointments/billing/records/comms but none for workforce → consequences) →
What Is Medari? → **8 Core Capabilities** (Demand Forecasting, Workforce Planning,
Availability Management, Session Planning, Room Allocation, Timesheet Management, Dashboard &
Insights, Best Practice Integration) → Why Different (`ComparisonTable`) → The Outcome (7 ✓)
→ "Put the right people, in the right place, at the right time." → `CtaBand`.

### 7.3 Pricing (`app/pricing/page.tsx`)
Heading + "No per-user fees. No hidden costs." → Monthly/Annual toggle (Save 20%) →
`PricingTiers`:
- **Growth Practice** — 1–3 GPs — $250/mo (incl GST) — Start Free Trial
- **Scale Practice** — 4–8 GPs — $450/mo (incl GST) — Start Free Trial
- **Enterprise** — 8+ GPs / Multi-Site — Custom Pricing — Book Demo

Trial note: "30-day free trial. Credit card required. Cancel anytime before your trial ends."
→ **Included** features list (17 items) → Why Medari? → ROI (Reduce / Improve lists) →
`FaqAccordion` (faq.ts) → trial CTA.

**Derived figure (assumption):** annual prices are not in the PDF (only "Save 20%"). Derive
Growth $200/mo and Scale $360/mo when billed annually, and label them as derived. Replace if
the client provides real annual numbers.

### 7.4 Book a Demo (`app/book-demo/page.tsx`)
Hero ("See how Medari helps you align workforce capacity with real demand") → **What you'll
see in 30 min** (Workforce Planning, Demand Forecasting, Session & Room Planning, Dashboard &
Insights, Best Practice Integration) → "Medari is ideal for" (practice types + roles) →
**What happens next** `StepList` (Book → Meet a specialist → See real workflows → Start
30-day trial) → **demo form** with a commented Cal/Calendly embed slot above it.

### 7.5 About (`app/about/page.tsx`)
Hero ("Built from real conversations. Not a boardroom.") → The Problem ("deserves better than
spreadsheets or guesswork" + 4 roles: Practice managers, Nursing teams, Reception staff,
Practice owners) → Why We Built This ("We kept asking the same question") → What We Believe
(belief list) → How We Work ("Built with healthcare, not just for it" + Patients / Staff /
Managers / Owners outcome strip) → Get in touch CTA.

## 8. Demo request form

- **Component:** `components/marketing/DemoRequestForm.tsx` (client, react-hook-form + zod).
- **Fields:** Name*, Work email*, Practice name*, Practice size (Growth 1–3 / Scale 4–8 /
  Enterprise 8+), Phone (optional), Message (optional).
- **Validation:** `lib/validations/demo.ts` (zod schema; email format; required fields).
- **Server action:** `lib/actions/demo.ts` — `"use server"` → `checkBotId()` (bot guard) →
  zod `safeParse` → Resend email to `SMTP_TO` (from `SMTP_FROM`) → returns
  `{ success: boolean, error?: string }`. Mirrors existing `lib/actions/contact.ts`; reuses
  `RESEND_API_KEY` / `SMTP_FROM` / `SMTP_TO` env vars (already documented in env.example).
- **States:** inline zod field errors; submitting spinner; success panel ("We'll be in touch
  to book your 30-minute demo"); root-level error fallback on action failure.
- **Cal slot:** `{/* Cal.com / Calendly embed — replace form when link provided */}` block
  directly above the form.

## 9. Design system (already in place — reuse)

- Tokens: `DESIGN.md` → `tailwind.theme.css` (blue `#1565B5` primary, magenta `#E51E78`
  accent, cool-slate neutrals).
- Brand extras in `app/globals.css`: `--brand-gradient`, `--brand-wash`, status palette,
  `.brand-gradient-text`, status pill/chip classes.
- Fonts: Hanken Grotesk (UI), IBM Plex Mono (numerics), Gabarito (logo wordmark) via
  `next/font`.
- No new colours or fonts introduced. Gradient reserved for brand moments (logo, hero
  headline, ROI band wash, CTA band).

## 10. Content-integrity rules

- Australian spelling (organisation, utilisation, optimise); capital-P "Practice".
- No emoji in shipped UI.
- No fabricated testimonials, logos, or metrics. ROI band uses the PDF's real figures.
- Any derived value (e.g. annual prices) is labelled and listed in §12.

## 11. Retired / reworked from the current build

- `HeroSection` → reworked (new headline + `DemandCoverageMock`).
- `FeaturesSection` → 6-capability grid via `FeatureCard`.
- `FillShiftsSection` → **removed**; its narrative space becomes Comparison + How-it-works.
- `StatsSection` → `StatBand` with real ROI numbers.
- `TestimonialSection` → `CredibilityBand` (no fake quote).
- `CtaSection` → `CtaBand`.
- `RosterMock` → `DemandCoverageMock`.
- `ContactFormSection` → repurposed into `DemoRequestForm`, then deleted.
- `lib/constants.ts` nav/footer → moved into `lib/content/site.ts` (or updated in place).

## 12. Assumptions / open items

1. **Annual prices derived** (Growth $200/mo, Scale $360/mo) from "Save 20%" — confirm or
   replace.
2. **Booking link** not yet provided — form ships now; Cal/Calendly embed slot awaits a URL.
3. **No real customer quote** yet — `CredibilityBand` ships message-only, quote-ready.
4. **Footer secondary links** (Careers, Security, Help centre, Status, Privacy, Terms) have
   no destinations yet — `#` placeholders until provided.
5. **Product page "video"** — placeholder slot until an asset is supplied.

## 13. Verification

- `npm run lint` clean; TypeScript passes; `npm run build` succeeds (all 5 routes static).
- Served smoke-test: each route returns 200 and contains its key heading copy.
- Demo form: zod validation enforced; server action bot-checked; success/error states render.
- Manual: no GP-roster/SMS-broadcast language remains anywhere; derived prices labelled.

## 14. Build sequencing (for writing-plans)

1. **Phase 1** — Shared kit + content layer + Home (proves the primitives end-to-end).
2. **Phase 2** — Pricing (tiers, toggle, included list, FAQ).
3. **Phase 3** — Book a Demo (form + server action + Cal slot).
4. **Phase 4** — Product.
5. **Phase 5** — About.
6. **Phase 6** — Nav/footer/metadata polish + full verification pass.
