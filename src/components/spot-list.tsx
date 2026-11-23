import { OptionalLink } from "@/components/optional-link";
import { scentMap, spotKinds } from "@/lib/data";
import { directionsUrl } from "@/lib/directions";
import { postTemplates, submitUrl } from "@/lib/site";

/** "a", "a or b", "a, b or c". */
function joinWithOr(items: string[]) {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} or ${items[items.length - 1]}`;
}

/** Spots grouped by kind in the order the JSON lists the kinds; kinds with no spots collapse into one line. */
export function SpotList() {
  const groups = spotKinds.map((kind) => ({
    kind,
    ...scentMap.kinds[kind],
    spots: scentMap.spots.filter((s) => s.kind === kind),
  }));
  const filled = groups.filter((group) => group.spots.length > 0);
  const emptyLabels = groups
    .filter((group) => group.spots.length === 0)
    .map((group) => group.label.toLowerCase());

  return (
    <div className="space-y-12">
      {filled.map(({ kind, label, blurb, spots }) => (
        <div key={kind}>
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-foreground pb-3">
            <h3 className="text-xl tracking-[0.1em] uppercase">{label}</h3>
            <p className="text-lg text-muted">{blurb}</p>
          </div>
          <ul className="divide-y divide-border">
            {spots.map((spot) => (
              <li
                key={spot.name}
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-4"
              >
                <div className="min-w-0">
                  <h4 className="text-lg tracking-[0.08em] uppercase">
                    <OptionalLink href={spot.link}>{spot.name}</OptionalLink>
                  </h4>
                  <p className="text-lg text-muted">{spot.location}</p>
                  {spot.notes && (
                    <p className="text-lg text-muted">{spot.notes}</p>
                  )}
                </div>
                {spot.coords && (
                  <a
                    href={directionsUrl(spot.coords)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get directions to ${spot.name}`}
                    className="text-lg underline"
                  >
                    Get directions
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {emptyLabels.length > 0 && (
        <p className="text-center text-lg text-muted">
          No {joinWithOr(emptyLabels)} yet.{" "}
          <a
            href={submitUrl("Scent Map suggestion: ", postTemplates.spot)}
            className="text-foreground underline"
          >
            Suggest one
          </a>
        </p>
      )}
    </div>
  );
}
