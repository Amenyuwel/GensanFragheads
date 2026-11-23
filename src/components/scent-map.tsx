"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Spot } from "@/lib/data";

const placeholder = <div className="h-full w-full animate-pulse bg-subtle" />;

// Leaflet touches `window` on import, so the map only renders in the browser.
const ScentMapView = dynamic(() => import("@/components/scent-map-view"), {
  ssr: false,
  loading: () => placeholder,
});

// Negative: the box top is ~1069px down at 1920x1080, so a 0 or positive margin loads it on first paint.
const LOAD_MARGIN = "-100px";

export function ScentMap({ spots }: { spots: Spot[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setIsNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: LOAD_MARGIN },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-[420px] w-full border border-border sm:h-[520px]">
      {isNearViewport ? <ScentMapView spots={spots} /> : placeholder}
    </div>
  );
}
