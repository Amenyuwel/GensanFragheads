import { Button } from "@/components/button";
import { site } from "@/lib/site";

/** Closing panel that sends readers to the subreddit. */
export function JoinCta() {
  return (
    <section className="page-width mt-section">
      <div className="relative flex flex-col gap-8 overflow-hidden rounded-panel bg-ink p-8 text-white sm:p-12 md:flex-row md:items-center md:justify-between">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span className="join-shape -top-16 -left-12 size-64" />
          <span className="join-shape join-shape-reverse top-1/3 right-1/4 size-48" />
          <span className="join-shape -right-16 -bottom-20 size-72" />
        </div>
        <div className="relative max-w-xl">
          <h2 className="text-title">Join the conversation</h2>
          <p className="mt-4 text-xl text-white/85">
            Scent of the Day posts, recommendations and meetups happen on Reddit.
          </p>
        </div>
        <div className="relative shrink-0">
          <Button href={site.subredditUrl}>Join the subreddit</Button>
        </div>
      </div>
    </section>
  );
}
