"use client";

import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  const pathname = usePathname();

  return (
    <footer className="mt-24 bg-green text-white">
      <div className="page-width grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <p className="text-2xl tracking-[0.22em] uppercase">{site.name}</p>
          <p className="mt-4 max-w-xs text-lg text-white/70">
            A fragrance guide by and for perfume lovers in General Santos City.
          </p>
        </div>
        <div>
          <h2 className="text-base tracking-[0.16em] uppercase">Explore</h2>
          <ul className="mt-4 space-y-2 text-lg text-white/70">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={!item.sectionId && pathname === item.href ? "page" : undefined}
                  className="hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-base tracking-[0.16em] uppercase">Community</h2>
          <a href={site.subredditUrl} className="mt-4 inline-block text-lg text-white/70 hover:text-white">
            {site.subreddit}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="page-width py-5 text-base text-white/60">{site.name} · General Santos City</p>
      </div>
    </footer>
  );
}
