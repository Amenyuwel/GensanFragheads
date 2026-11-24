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

/** Asks the map to open a spot's popup. `count` changes on every request so repeats are noticed. */
export type FocusRequest = { name: string; count: number };

type Props = {
  spots: Spot[];
  selectedName: string | null;
  focusRequest: FocusRequest | null;
  onSelect: (name: string | null) => void;
};

export function ScentMap({ spots, selectedName, focusRequest, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  // A "show on map" request loads the map even if the visitor has not scrolled to it.
  const shouldLoad = isNearViewport || focusRequest !== null;
  const [isTouchActive, setIsTouchActive] = useState(false);

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

  useEffect(() => {
    if (focusRequest) containerRef.current?.scrollIntoView({ block: "nearest" });
  }, [focusRequest]);

  // Once active, a touch outside the map hands scrolling back to the page.
  useEffect(() => {
    if (!isTouchActive) return;

    const deactivateOnOutsideTouch = (event: PointerEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return;
      setIsTouchActive(false);
    };
    document.addEventListener("pointerdown", deactivateOnOutsideTouch);
    return () => document.removeEventListener("pointerdown", deactivateOnOutsideTouch);
  }, [isTouchActive]);

  return (
    <div ref={containerRef} className={`relative h-[420px] w-full scroll-mt-24 border border-border sm:h-[520px] ${isTouchActive ? "" : "map-touch-locked"}`}>
      {shouldLoad ? (
        <ScentMapView spots={spots} selectedName={selectedName} focusRequest={focusRequest} onSelect={onSelect} />
      ) : (
        placeholder
      )}
      {/* Touch screens only: until tapped, the map lets swipes scroll the page (see .map-touch-locked). */}
      {/* The button is small so popup links and pins stay tappable. z-index sits above Leaflet's controls (1000). */}
      {!isTouchActive && (
        <button
          type="button"
          onClick={() => setIsTouchActive(true)}
          className="absolute bottom-4 left-1/2 z-[1100] hidden -translate-x-1/2 bg-background px-3 py-2 text-sm tracking-label whitespace-nowrap uppercase pointer-coarse:block"
        >
          Tap to use the map
        </button>
      )}
    </div>
  );
}
