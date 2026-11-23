import { EmptyNotice } from "@/components/empty-notice";
import { OptionalLink } from "@/components/optional-link";
import { heatProof } from "@/lib/data";
import { postTemplates, submitUrl } from "@/lib/site";

/** One column per budget tier, each listing the picks in that tier. */
export function PickTiers() {
  return (
    <div className="grid gap-12 md:grid-cols-3 md:gap-8">
      {heatProof.tiers.map((tier) => {
        const picks = heatProof.picks.filter((p) => p.tier === tier.id);
        return (
          <div key={tier.id}>
            <h3 className="border-b border-foreground pb-3 text-center text-xl tracking-[0.1em] uppercase">
              {tier.label}
            </h3>
            {picks.length === 0 ? (
              <EmptyNotice
                message="No picks yet."
                actionLabel="Add the first one"
                actionHref={submitUrl(`Heat-proof pick (${tier.label}): `, postTemplates.pick)}
              />
            ) : (
              <ul className="divide-y divide-border">
                {picks.map((pick) => (
                  <li key={`${pick.brand}-${pick.name}`} className="py-5 text-center">
                    <p className="text-lg tracking-[0.08em] uppercase">
                      <OptionalLink href={pick.link}>{pick.name}</OptionalLink>
                    </p>
                    <p className="mt-1 text-base text-muted">{pick.brand}</p>
                    <p className="mt-2 text-lg">{pick.why}</p>
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
