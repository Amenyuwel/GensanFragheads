import { site } from "@/lib/site";

/** Thin saffron strip above the header that points visitors to the subreddit. */
export function AnnouncementBar() {
  return (
    <aside aria-label="Announcement" className="bg-accent px-4 py-1 text-center text-sm font-medium text-ink">
      <a href={site.subredditUrl} className="inline-block py-1.5 underline hover:no-underline">
        <span className="sm:hidden">Post your SOTD</span>
        <span className="hidden sm:inline">Post your Scent of the Day</span>
      </a>
    </aside>
  );
}
