import { postTemplates, submitUrl } from "@/lib/site";

/** Unboxed, centered note that invites readers to suggest a missing scent map spot. */
export function SuggestSpot() {
  return (
    <section aria-labelledby="suggest-spot-title" className="page-width mt-section">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <svg
          viewBox="0 0 24 24"
          className="size-16 shrink-0 sm:size-20 text-accent"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
        </svg>
        <h2 id="suggest-spot-title" className="mt-8 text-display font-bold break-words">
          Know a spot we missed?
        </h2>
        <p className="mt-4 max-w-3xl text-xl text-foreground sm:text-2xl">
          Like a decant seller or local maker? Post the place, the brands they carry, and whether they have testers.
        </p>
        <a
          href={submitUrl("Scent Map suggestion: ", postTemplates.spot)}
          className="mt-6 inline-flex min-h-14 items-center px-2 text-xl font-semibold sm:text-2xl underline decoration-accent decoration-4 underline-offset-8 transition-ui hover:decoration-accent-bright"
        >
          Suggest a spot <span aria-hidden="true">&nbsp;&rarr;</span>
        </a>
      </div>
    </section>
  );
}
