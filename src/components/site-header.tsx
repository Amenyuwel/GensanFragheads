"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { homeSectionIds, nav, site } from "@/lib/site";

// Module-level so the hook gets the same array on every render.
const noSectionIds: string[] = [];

export function SiteHeader() {
  const pathname = usePathname();
  // Home sections only exist on the home page.
  const active = useActiveSection(pathname === "/" ? homeSectionIds : noSectionIds);

  return (
    // Sticky only where there is room for it; on phones it would cover a sixth of the screen.
    <header className="z-30 border-b border-border bg-background md:sticky md:top-0">
      <div className="page-width grid grid-cols-[1fr_auto_1fr] items-center pt-5 pb-2">
        <span />
        <Link href="/" className="text-xl tracking-[0.28em] uppercase sm:text-3xl">
          {site.name}
        </Link>
        <a
          href={site.subredditUrl}
          className="hidden justify-self-end text-sm tracking-[0.14em] text-muted uppercase hover:text-foreground sm:block"
        >
          Join
        </a>
      </div>
      <nav aria-label="Main">
        <ul className="page-width flex flex-wrap justify-center gap-x-8 pb-2 text-sm tracking-[0.14em] uppercase">
          {nav.map((item) => {
            const current = active === item.sectionId;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={current ? "location" : undefined}
                  className={`inline-block py-2.5 transition-colors ${
                    current ? "underline decoration-1 underline-offset-[0.5em]" : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
