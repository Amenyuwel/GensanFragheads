"use client";

import { OptionalLink } from "@/components/optional-link";
import { scentMap, spotKinds } from "@/lib/data";
import { directionsUrl } from "@/lib/directions";
import { postTemplates, submitUrl } from "@/lib/site";

/** "a", "a or b", "a, b or c". */
function joinWithOr(items: string[]) {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} or ${items[items.length - 1]}`;
}

/** Spots as cards grouped by kind in the order the JSON lists the kinds; kinds with no spots collapse into one line. */
type Props = {
  selectedName: string | null;
  onShowOnMap: (name: string) => void;
};

export function SpotList({ selectedName, onShowOnMap }: Props) {
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
            <h3 className="text-2xl">{label}</h3>
            <p className="text-lg text-muted">{blurb}</p>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {spots.map((spot) => {
              const isSelected = spot.name === selectedName;
              return (
                <li
                  key={spot.name}
                  className={`relative flex min-w-0 flex-col border border-l-4 bg-subtle p-5 ${
                    isSelected ? "border-brass" : "border-border border-l-border"
                  }`}
                >
                  {isSelected && (
                    <span className="mb-2 self-start bg-brass px-2 text-sm tracking-label text-white uppercase">
                      On the map
                    </span>
                  )}
                  <div className="space-y-1">
                    <h4 className="text-xl break-words">
                      <OptionalLink href={spot.link}>{spot.name}</OptionalLink>
                    </h4>
                    <p className="text-lg text-muted">{spot.location}</p>
                    {spot.notes && <p className="text-lg text-muted">{spot.notes}</p>}
                  </div>
                  {spot.coords && (
                    <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-4">
                      <button
                        type="button"
                        onClick={() => onShowOnMap(spot.name)}
                        className="min-h-11 border border-foreground px-6 text-sm tracking-label uppercase transition-colors hover:bg-foreground hover:text-background"
                      >
                        Show on map<span className="sr-only"> for {spot.name}</span>
                      </button>
                      <a
                        href={directionsUrl(spot.coords)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Get directions to ${spot.name}`}
                        className="inline-flex min-h-11 items-center text-lg underline"
                      >
                        Get directions
                      </a>
                    </div>
                  )}
                </li>
              );
            })}
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
