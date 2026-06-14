# CLAUDE.md — Agent Guidance

This is a Next.js website template. Read this file before writing any code.

## Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS 4 + shadcn/ui (CSS variables, `@custom-variant dark`)
- **Forms:** `react-hook-form` + `zod` (via `@hookform/resolvers/zod`)
- **Animations:** `framer-motion` + `react-intersection-observer` (scroll reveals via `<Reveal>`)
- **Hooks:** `usehooks-ts` — use this for all common hooks (localStorage, media query, debounce, etc.)
- **Email:** Resend (`RESEND_API_KEY`, `SMTP_FROM`, `SMTP_TO`)
- **Bot protection:** `botid` (client: `instrumentation-client.ts`, server: `checkBotId()`)
- **Analytics:** `@vercel/analytics` + `@vercel/speed-insights`
- **Design system:** `DESIGN.md` → `tailwind.theme.css` (run `npm run design:build` after editing DESIGN.md)
- **Commits:** Conventional commits enforced via commitlint + husky

## Project Structure

```
app/
  layout.tsx              — root layout (Header, Footer, fonts, analytics, metadata)
  page.tsx                — homepage
components/
  Header.tsx              — site navigation
  Footer.tsx              — site footer
  Reveal.tsx              — scroll-triggered fade-in wrapper
  ui/                     — shadcn/ui primitives (never edit directly)
lib/
  utils.ts                — cn() helper
  constants.ts            — nav items, social links, site config
  actions/                — server actions ("use server")
    contact.ts            — contact form submission
```

## Key Conventions

### Forms — always use react-hook-form + zod

```tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const schema = z.object({ email: z.string().email() });
type FormData = z.infer<typeof schema>;

export function MyForm() {
  const form = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = async (data: FormData) => {
    const result = await myServerAction(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </form>
    </Form>
  );
}
```

### Server Actions — always in `lib/actions/`, always validate + bot-check

```ts
"use server";
import { checkBotId } from "botid/server";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function myAction(input: unknown) {
  const verification = await checkBotId();
  if (verification.isBot) return { success: false, error: "Access denied." };

  const parsed = schema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Invalid input." };

  // ... do work ...
  return { success: true };
}
```

### Scroll Animations — use `<Reveal>`

```tsx
import { Reveal } from "@/components/Reveal";

<Reveal>
  <p>This fades in on scroll</p>
</Reveal>

<Reveal delay={0.1}>
  <p>Staggered sibling</p>
</Reveal>
```

### Design System

Edit `DESIGN.md` to define your brand tokens, then run:

```bash
npm run design:lint   # validate DESIGN.md
npm run design:build  # export tokens → tailwind.theme.css (@theme {} block)
```

`app/globals.css` imports `tailwind.theme.css` directly. There is no `tailwind.config.ts` — Tailwind v4 is configured entirely in CSS. All design tokens (including colours) are driven by DESIGN.md — a single `design:build` updates everything.

### Hooks — always use usehooks-ts

Don't write custom hooks for common browser APIs. Use [`usehooks-ts`](https://usehooks-ts.com) instead:

```tsx
import { useLocalStorage, useMediaQuery, useDebounce, useEventListener, useIsClient } from "usehooks-ts";

// localStorage with SSR safety
const [theme, setTheme] = useLocalStorage("theme", "light");

// responsive breakpoints
const isMobile = useMediaQuery("(max-width: 767px)");

// debounce a value
const debouncedSearch = useDebounce(searchQuery, 300);
```

Only add custom hooks to `lib/hooks/` for project-specific logic not covered by `usehooks-ts`.

### Import Paths

Always use the `@/` alias. Never use relative `../` imports across feature boundaries.

### shadcn/ui

Add new components with:
```bash
npx shadcn@latest add <component-name>
```

Never manually edit files in `components/ui/` — regenerate them via the CLI instead.

### Lucide Icons

Import icons directly to avoid barrel-file overhead:

```tsx
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
```

Or configure `optimizePackageImports` in `next.config.ts` (already set) and use named imports safely:

```tsx
import { ArrowRight } from "lucide-react";
```

### Commit Messages

This repo enforces conventional commits:

```
feat: add contact form validation
fix: correct mobile nav z-index
chore: update dependencies
docs: update CLAUDE.md
```

## Environment Variables

See `env.example` for all required variables. Required for contact form:
- `RESEND_API_KEY`
- `SMTP_FROM`
- `SMTP_TO`
- `NEXT_PUBLIC_SITE_URL`
