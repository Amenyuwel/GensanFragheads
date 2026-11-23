"use client";

import dynamic from "next/dynamic";
import type { Spot } from "@/lib/data";

// Leaflet touches `window` on import, so the map only renders in the browser.
const ScentMapView = dynamic(() => import("@/components/scent-map-view"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-subtle" />,
});

export function ScentMap({ spots }: { spots: Spot[] }) {
  return (
    <div className="h-[420px] w-full border border-border sm:h-[520px]">
      <ScentMapView spots={spots} />
    </div>
  );
}
