import { site } from "@/lib/site";

/** Thin green strip above the header that points visitors to the subreddit. */
export function AnnouncementBar() {
  return (
    <aside aria-label="Announcement" className="bg-green px-4 py-1 text-center text-sm tracking-label text-white/85 uppercase">
      <a href={site.subredditUrl} className="inline-block py-1.5 hover:text-white">
        <span className="sm:hidden">Post your SOTD on {site.subreddit}</span>
        <span className="hidden sm:inline">Post your Scent of the Day on {site.subreddit}</span>
      </a>
    </aside>
  );
}
