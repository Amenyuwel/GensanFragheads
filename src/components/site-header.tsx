"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { homeSectionIds, nav, site } from "@/lib/site";

// Module-level so the hook gets the same array on every render.
const noSectionIds: string[] = [];

// Next keeps the scroll position when the target page is already visible in the viewport, so a
// same-page "/" navigation would otherwise leave the visitor scrolled down. Modified clicks open
// a new tab and must not scroll this one. Instant, because a smooth scroll is cut short when the 404 page swaps to home.
function scrollToTopOnPlainClick(event: MouseEvent<HTMLAnchorElement>) {
  const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
  if (isModified || event.button !== 0) return;
  window.scrollTo({ top: 0, behavior: "instant" });
}

export function SiteHeader() {
  const pathname = usePathname();
  // Home sections only exist on the home page.
  const active = useActiveSection(pathname === "/" ? homeSectionIds : noSectionIds);

  return (
    <header className="z-30 border-b border-foreground bg-background md:sticky md:top-0">
      <div className="page-width flex flex-wrap items-center justify-between gap-x-6 gap-y-0 py-2 sm:py-3">
        <Link href="/" onClick={scrollToTopOnPlainClick} className="font-display text-xl font-medium sm:text-2xl">
          {site.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-x-2 text-base font-medium">
            {nav.map((item) => {
              const current = active === item.sectionId;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={current ? "location" : undefined}
                    className={`inline-flex min-h-11 items-center rounded-control px-4 transition-ui ${
                      current ? "bg-foreground text-background" : "text-muted hover:bg-subtle hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li>
              <a href={site.subredditUrl} className="inline-flex min-h-11 items-center rounded-control bg-accent px-4 text-ink transition-ui hover:bg-accent-bright">
                Join
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
