---
version: alpha
name: Medari
description: Workforce rostering and timesheeting for Australian medical practices. Calm, clinical, trustworthy — a blue primary with a magenta accent and a signature brand gradient reserved for brand moments.
colors:
  primary: "#1565B5"
  primary-foreground: "#FFFFFF"
  secondary: "#6B788C"
  secondary-foreground: "#FFFFFF"
  accent: "#E51E78"
  accent-foreground: "#FFFFFF"
  background: "#FFFFFF"
  foreground: "#1A212B"
  muted: "#F6F8FB"
  muted-foreground: "#6B788C"
  border: "#E4E9F0"
  input: "#D6DDE7"
  ring: "#2070C3"
  destructive: "#BE2B2A"
  destructive-foreground: "#FFFFFF"
  card: "#FFFFFF"
  card-foreground: "#1A212B"
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 3.8125rem
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: -0.03em
  h1:
    fontFamily: Hanken Grotesk
    fontSize: 3.0625rem
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.03em
  h2:
    fontFamily: Hanken Grotesk
    fontSize: 2.4375rem
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.025em
  h3:
    fontFamily: Hanken Grotesk
    fontSize: 1.3125rem
    fontWeight: 700
    lineHeight: 1.3
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 1.1875rem
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: Hanken Grotesk
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Hanken Grotesk
    fontSize: 0.8125rem
    fontWeight: 600
    lineHeight: 1.4
  eyebrow:
    fontFamily: Hanken Grotesk
    fontSize: 0.8125rem
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.07em
rounded:
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xl2: 48px
  xl3: 64px
  xl4: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: 12px 20px
  button-primary-hover:
    backgroundColor: "#114F90"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
    rounded: "{rounded.md}"
    padding: 12px 20px
  button-accent-hover:
    backgroundColor: "#C71765"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 11px 19px
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    rounded: "{rounded.md}"
  card-default:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.lg}"
    padding: 24px
  input-default:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: 10px 14px
---

## Overview

Medari is workforce rostering and timesheeting built for Australian medical practices. The design language is **calm, clinical and trustworthy** — cool slate neutrals, a dependable blue primary, and a magenta accent used sparingly. A signature **cyan → blue → violet → magenta gradient** (sampled from the logo) is reserved for brand moments only: the logo wordmark, the hero headline, the stats band wash, and the final CTA band.

## Colors

The palette is a cool-slate neutral system with a trustworthy blue primary and a vivid magenta accent.

- **Primary (#1565B5):** Trustworthy blue — primary actions, links, "Book a demo".
- **Accent (#E51E78):** Magenta — the second action and brand highlight. Use sparingly.
- **Foreground (#1A212B):** Near-black slate for headings and strong text.
- **Muted (#F6F8FB):** Soft cool off-white for alternating section backgrounds.
- **Border (#E4E9F0):** Hairline slate border for cards, nav, dividers.

The full brand gradient `linear-gradient(100deg, #15C6F2 0%, #1C68B9 30%, #7A44B2 64%, #E51E78 100%)` is a brand moment — never a decorative wash on UI chrome.

## Typography

**Hanken Grotesk** is the workhorse family — geometric-humanist, friendly and clinical-clean — used for everything from display headlines to body. **IBM Plex Mono** is used for numerics: shift times, hours, and timesheet figures. **Gabarito 700** typesets the "Medari" logo wordmark only.

- `display` / `h1` — hero and page headlines (800 weight, tight tracking)
- `h2` — section headings
- `h3` — card titles
- `body-lg` — lead paragraphs
- `body` / `body-sm` — running text, captions
- `eyebrow` — all-caps section labels above headings

## Layout

Content is contained to **1160px max-width** with **32px horizontal padding**. Standard sections use **88px** top/bottom rhythm. Alternate white (`background`) and tinted (`muted`) section backgrounds.

## Elevation & Depth

Cool-tinted, low-spread shadows — clinical software should feel light and flat. Elevation separates, it doesn't decorate.

- **Cards:** 1px `border` border, `rounded.lg`, whisper shadow.
- **Hero mock / floating cards:** larger ambient shadow, no border.

## Shapes

- **Buttons:** `rounded.md` (8px)
- **Cards:** `rounded.lg` (12px)
- **Bands (stats / CTA):** `rounded` 22px
- **Pills / status chips / avatars:** `rounded.full`

## Components

**Buttons:** `primary` (blue fill) is the default action. `accent` (magenta) and `brand` (gradient fill) are reserved highlights. `secondary` (white, bordered) and `ghost` for lower-emphasis actions.

**Status chips:** roster shift states — confirmed (green), open (amber, dashed), pending (blue), leave (violet), overtime (magenta). Pill-shaped with a leading dot.

**Sections:** Alternate white / muted backgrounds to separate content areas.

## Do's and Don'ts

**Do:**
- Use `primary` blue for the main action, `accent` magenta sparingly
- Reserve the brand gradient for brand moments (logo, hero headline, stats wash, CTA band)
- Use `eyebrow` labels above section headings
- Alternate white / muted section backgrounds
- Use IBM Plex Mono + tabular figures for all times and hours

**Don't:**
- Don't spray the brand gradient across UI chrome or decorative elements
- Don't introduce new colours outside the defined palette
- Don't stack shadows on a single element
- Don't animate layout properties — animate `transform` and `opacity` only
