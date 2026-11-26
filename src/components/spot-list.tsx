"use client";

import { OptionalLink } from "@/components/optional-link";
import { scentMap, spotKinds } from "@/lib/data";
import { directionsUrl } from "@/lib/directions";

/** Text-link look shared by both card actions; underline on hover and focus is the non-color cue. */
const actionClassName =
  "inline-flex min-h-11 items-center gap-1.5 text-sm whitespace-nowrap underline-offset-4 transition-ui hover:underline focus-visible:underline";

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  className: "size-4 shrink-0",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function PinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg {...iconProps} className="arrow-nudge size-4 shrink-0">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/** Spots as cards grouped by kind in the order the JSON lists the kinds. */
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

  return (
    <div className="space-y-12">
      {filled.map(({ kind, label, blurb, spots }) => (
        <div key={kind}>
          <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3">
            <h3 className="text-2xl">{label}</h3>
            <p className="text-lg text-muted">{blurb}</p>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {spots.map((spot) => {
              const isSelected = spot.name === selectedName;
              return (
                <li
                  key={spot.name}
                  className={`spot-card relative flex min-w-0 flex-col rounded-panel border-2 bg-subtle p-6 ${
                    isSelected ? "border-foreground" : "border-transparent"
                  }`}
                >
                  {isSelected && (
                    <span className="pointer-events-none absolute top-0 left-6 -translate-y-1/2 rounded-control bg-accent px-3 text-sm tracking-label text-ink uppercase">
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
                    <div className="mt-auto flex gap-x-5 pt-2">
                      <button
                        type="button"
                        onClick={() => onShowOnMap(spot.name)}
                        className={actionClassName}
                      >
                        <PinIcon />
                        <span>
                          Show on map
                          <span className="sr-only"> for {spot.name}</span>
                        </span>
                      </button>
                      <a
                        href={directionsUrl(spot.coords)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Get directions to ${spot.name}`}
                        className={actionClassName}
                      >
                        <span>Directions</span>
                        <ArrowIcon />
                      </a>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
