"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "@/components/Logo";
import { NAV_ITEMS, PRIMARY_CTA, SECONDARY_CTA } from "@/lib/content/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1160px] items-center gap-8 px-6 sm:px-8">
        <Logo size={28} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[15px] font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

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

        {/* Mobile menu */}
        <div className="ml-auto md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-2 flex flex-col gap-6">
                <Logo size={28} href="/" />
                <nav className="flex flex-col gap-4">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-base font-medium text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-3 pt-2">
                  <Button asChild variant="secondary">
                    <Link href={SECONDARY_CTA.href} onClick={() => setOpen(false)}>{SECONDARY_CTA.label}</Link>
                  </Button>
                  <Button asChild>
                    <Link href={PRIMARY_CTA.href} onClick={() => setOpen(false)}>{PRIMARY_CTA.label}</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
