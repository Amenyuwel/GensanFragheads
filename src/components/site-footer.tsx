import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-section rounded-t-panel bg-ink text-white">
      <div className="page-width grid gap-10 py-12 sm:grid-cols-3 sm:gap-y-0 sm:py-14">
        <div className="min-w-0 sm:row-span-2 sm:grid sm:grid-rows-subgrid sm:items-baseline">
          <p className="font-display text-2xl font-medium break-words sm:text-3xl">{site.name}</p>
          <p className="mt-4 max-w-xs text-lg text-white/75">
            By and for perfume lovers in General Santos City.
          </p>
        </div>
        <div className="min-w-0 sm:row-span-2 sm:grid sm:grid-rows-subgrid sm:items-baseline">
          <h2 className="text-base tracking-label uppercase">Explore</h2>
          <ul className="mt-4 space-y-2 text-lg text-white/75">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-accent-bright hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 sm:row-span-2 sm:grid sm:grid-rows-subgrid sm:items-baseline">
          <h2 className="text-base tracking-label uppercase">Community</h2>
          <a href={site.subredditUrl} className="mt-4 inline-block text-lg text-white/75 hover:text-accent-bright hover:underline">
            {site.subreddit}
          </a>
        </div>
      </div>
    </footer>
  );
}
