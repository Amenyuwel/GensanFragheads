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
    <header className="z-30 border-b border-border bg-background md:sticky md:top-0">
      <div className="page-width flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3">
        <Link href="/" className="text-lg tracking-brand uppercase sm:text-2xl">
          {site.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-x-6 text-sm tracking-label uppercase">
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
            <li>
              <a href={site.subredditUrl} className="inline-block py-2.5 text-muted transition-colors hover:text-foreground">
                Join
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
