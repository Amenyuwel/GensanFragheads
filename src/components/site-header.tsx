"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { homeSectionIds, nav } from "@/lib/nav";
import { site } from "@/lib/site";

// Module-level so the hook gets the same array on every render.
const noSectionIds: string[] = [];

// Modified clicks open a new tab and must not scroll this one.
function isPlainClick(event: MouseEvent<HTMLAnchorElement>) {
  const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
  return !isModified && event.button === 0;
}

export function SiteHeader() {
  const pathname = usePathname();
  // Home sections only exist on the home page.
  const isHome = pathname === "/";
  const active = useActiveSection(isHome ? homeSectionIds : noSectionIds);

  function handleNameClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!isPlainClick(event)) return;
    if (!isHome) {
      // Instant: a smooth scroll is cut short when another page (e.g. the 404 page) swaps to home.
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    // Already home: skip Next's same-page navigation, which would jump or interrupt the scroll.
    // "auto" follows the CSS scroll-behavior, which is smooth unless reduced motion is requested.
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "auto" });
    // Drop a section hash such as #scent-map so the URL matches the top of the page.
    if (window.location.hash) window.history.replaceState(null, "", "/");
  }

  return (
    <header className="z-30 border-b border-foreground bg-background md:sticky md:top-0">
      <div className="page-width flex flex-wrap items-center justify-between gap-x-6 gap-y-0 py-2 sm:py-3">
        <Link href="/" onClick={handleNameClick} className="font-display text-xl font-medium sm:text-2xl">
          {site.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center gap-x-2 text-base font-medium">
            {nav.map((item) => {
              const current = active === item.sectionId;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={current ? "location" : undefined}
                    className={`inline-flex min-h-11 items-center rounded-control px-3 whitespace-nowrap transition-ui sm:px-4 ${
                      current ? "bg-foreground text-background" : "text-muted hover:bg-subtle hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li>
              <a href={site.subredditUrl} className="inline-flex min-h-11 items-center rounded-control bg-accent px-3 whitespace-nowrap text-ink transition-ui motion-lift hover:bg-accent-bright sm:px-4">
                Join
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <span aria-hidden="true" className="scroll-progress" />
    </header>
  );
}
