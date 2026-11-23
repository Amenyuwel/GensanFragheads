import { site } from "@/lib/site";

/** Thin green strip above the header that points visitors to the subreddit. */
export function AnnouncementBar() {
  return (
    <div className="bg-green px-4 py-2 text-center text-sm tracking-[0.12em] text-white/85 uppercase">
      <a href={site.subredditUrl} className="hover:text-white">
        <span className="sm:hidden">Post your SOTD on {site.subreddit}</span>
        <span className="hidden sm:inline">Post your Scent of the Day on {site.subreddit}</span>
      </a>
    </div>
  );
}
