import { Button } from "@/components/button";
import { site } from "@/lib/site";

/** Closing panel that sends readers to the subreddit. */
export function JoinCta() {
  return (
    <section className="page-width mt-section">
      <div className="flex flex-col gap-8 rounded-panel bg-ink p-8 text-white sm:p-12 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-title">Join the conversation</h2>
          <p className="mt-4 text-xl text-white/85">
            Scent of the Day posts, recommendations and meetups happen on Reddit.
          </p>
        </div>
        <div className="shrink-0">
          <Button href={site.subredditUrl}>Join the subreddit</Button>
        </div>
      </div>
    </section>
  );
}
