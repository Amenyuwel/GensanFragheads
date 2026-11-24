import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-section bg-green text-white">
      <div className="page-width grid gap-10 py-12 sm:py-14 sm:grid-cols-3">
        <div className="min-w-0">
          <p className="text-xl tracking-brand break-words uppercase sm:text-2xl">{site.name}</p>
          <p className="mt-4 max-w-xs text-lg text-white/70">
            By and for perfume lovers in General Santos City.
          </p>
        </div>
        <div className="min-w-0">
          <h2 className="text-base tracking-label uppercase">Explore</h2>
          <ul className="mt-4 space-y-2 text-lg text-white/70">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <h2 className="text-base tracking-label uppercase">Community</h2>
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
