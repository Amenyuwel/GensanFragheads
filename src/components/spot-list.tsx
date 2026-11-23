import { EmptyNotice } from "@/components/empty-notice";
import { OptionalLink } from "@/components/optional-link";
import { scentMap, spotKinds } from "@/lib/data";
import { postTemplates, submitUrl } from "@/lib/site";

/** Every spot, grouped by kind in the order the JSON lists the kinds. */
export function SpotList() {
  return (
    <div className="space-y-16">
      {spotKinds.map((kind) => {
        const { label, blurb } = scentMap.kinds[kind];
        const spots = scentMap.spots.filter((s) => s.kind === kind);
        return (
          <div key={kind}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-foreground pb-3">
              <h3 className="text-xl tracking-[0.1em] uppercase">{label}</h3>
              <p className="text-lg text-muted">{blurb}</p>
            </div>
            {spots.length === 0 ? (
              <EmptyNotice
                message="None listed yet."
                actionLabel="Suggest one on the subreddit"
                actionHref={submitUrl(`Scent Map suggestion (${label.toLowerCase()}): `, postTemplates.spot)}
              />
            ) : (
              <ul className="divide-y divide-border">
                {spots.map((spot) => (
                  <li key={spot.name} className="grid gap-1 py-6 sm:grid-cols-[1fr_1fr_2fr] sm:gap-8">
                    <h4 className="text-lg tracking-[0.08em] uppercase">
                      <OptionalLink href={spot.link}>{spot.name}</OptionalLink>
                    </h4>
                    <p className="text-lg text-muted">{spot.location}</p>
                    <p className="text-lg text-muted">{spot.notes ?? "Brands, testers and prices not checked yet."}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
