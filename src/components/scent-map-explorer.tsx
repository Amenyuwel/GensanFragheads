"use client";

import { useState } from "react";
import { ScentMap, type FocusRequest } from "@/components/scent-map";
import { SpotList } from "@/components/spot-list";
import type { Spot } from "@/lib/data";

type View = "map" | "list";

const viewLabels: Record<View, string> = { list: "List", map: "Map" };

/** Owns what the map and the list share: the selected spot, the pending "show on map" request and the phone view. */
export function ScentMapExplorer({ spots }: { spots: Spot[] }) {
  // List first on phones: it is the one view that works before the map has loaded.
  const [view, setView] = useState<View>("list");
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [focusRequest, setFocusRequest] = useState<FocusRequest | null>(null);

  const showOnMap = (name: string) => {
    setView("map");
    // The counter lets a second click on the same spot reopen a popup the visitor closed.
    setFocusRequest((previous) => ({ name, count: (previous?.count ?? 0) + 1 }));
  };

  return (
    <>
      <div role="group" aria-label="Choose a view" className="mb-6 flex rounded-control border-2 border-foreground md:hidden">
        {(["list", "map"] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={view === option}
            onClick={() => setView(option)}
            className={`min-h-11 flex-1 rounded-control text-sm tracking-label uppercase transition-ui ${
              view === option ? "bg-foreground text-background" : ""
            }`}
          >
            {viewLabels[option]}
          </button>
        ))}
      </div>
      <div className={view === "map" ? "" : "hidden md:block"}>
        <ScentMap spots={spots} selectedName={selectedName} focusRequest={focusRequest} onSelect={setSelectedName} />
      </div>
      <div className={`md:mt-12 ${view === "list" ? "" : "hidden md:block"}`}>
        <SpotList selectedName={selectedName} onShowOnMap={showOnMap} />
      </div>
    </>
  );
}
