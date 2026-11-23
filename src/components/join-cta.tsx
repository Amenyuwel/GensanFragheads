import { Button } from "@/components/button";
import { site } from "@/lib/site";

/** Closing panel that sends readers to the subreddit. */
export function JoinCta() {
  return (
    <section className="page-width mt-24">
      <div className="bg-subtle px-6 py-12 text-center sm:py-14">
        <h2 className="text-3xl tracking-[0.04em]">Join the conversation</h2>
        <p className="mx-auto mt-3 max-w-lg text-lg text-muted">
          Scent of the Day posts, recommendations and meetups happen on {site.subreddit}.
        </p>
        <div className="mt-7">
          <Button href={site.subredditUrl}>Join the subreddit</Button>
        </div>
      </div>
    </section>
  );
}
