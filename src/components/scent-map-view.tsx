"use client";

import L, { type Map as LeafletMap, type Marker as LeafletMarker } from "leaflet";
import { useEffect, useRef, useState, type RefObject } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import type { FocusRequest } from "@/components/scent-map";
import { scentMap, type Spot } from "@/lib/data";
import { directionsUrl } from "@/lib/directions";
import "./leaflet-layer.css";

// Leaflet's default marker images break under bundlers, so the pin is inline SVG.
// Colors come from globals.css: site ink with a white outline, saffron when selected.
const pinOptions = {
  html: `<svg viewBox="0 0 32 42" width="32" height="42" aria-hidden="true">
    <path class="scent-pin-body" d="M16 1C7.7 1 1 7.7 1 16c0 10.6 15 25 15 25s15-14.4 15-25C31 7.7 24.3 1 16 1z"/>
    <circle class="scent-pin-dot" cx="16" cy="16" r="6"/>
  </svg>`,
  iconSize: [32, 42] as [number, number],
  iconAnchor: [16, 41] as [number, number],
  popupAnchor: [0, -38] as [number, number],
};
const pin = L.divIcon({ ...pinOptions, className: "scent-pin" });
const selectedPin = L.divIcon({
  ...pinOptions,
  className: "scent-pin scent-pin-selected",
});

// Zoom control is 10px margin + 34px wide at top left; 52px leaves a small gap past its right edge.
const POPUP_PAN_PADDING_LEFT = 52;
const POPUP_PAN_PADDING_EDGE = 8;

// The popup is at least this wide (content minWidth plus margins and borders from globals.css). On a map
// too narrow to fit it beside the zoom control, the zoom clearance is dropped so the popup stays on screen.
const POPUP_MIN_WIDTH = 240;
const POPUP_CHROME_WIDTH = 43;
const NARROW_MAP_WIDTH =
  POPUP_PAN_PADDING_LEFT + POPUP_MIN_WIDTH + POPUP_CHROME_WIDTH + POPUP_PAN_PADDING_EDGE;

// Zoom control bottom edge: 10px margin plus two 34px buttons and their borders, with a small gap.
const ZOOM_CONTROL_BOTTOM = 88;

// Until the map is measured, assume narrow: a popup opened early must not land off screen.
function isNarrowMap(mapWidth: number | null) {
  return mapWidth === null || mapWidth < NARROW_MAP_WIDTH;
}

function leftPanPadding(mapWidth: number | null) {
  return isNarrowMap(mapWidth) ? POPUP_PAN_PADDING_EDGE : POPUP_PAN_PADDING_LEFT;
}

// Height of the one-line tile-failure banner pinned to the top of the map.
const TILE_BANNER_HEIGHT = 41;

// A narrow popup spans the zoom control's columns, so it must sit below the control instead of beside it.
// A wide popup only has to clear the tile-failure banner, when it is showing.
function topPanPadding(mapWidth: number | null, tilesFailed: boolean) {
  if (isNarrowMap(mapWidth)) return ZOOM_CONTROL_BOTTOM;
  return tilesFailed ? POPUP_PAN_PADDING_EDGE + TILE_BANNER_HEIGHT : POPUP_PAN_PADDING_EDGE;
}

// Popup height above the pin tip (anchor 38 + tip 7) plus a gap, for panning without animation.
const POPUP_PAN_PADDING_TOP_EXTRA = 50;

type Props = {
  spots: Spot[];
  selectedName: string | null;
  focusRequest: FocusRequest | null;
  onSelect: (name: string | null) => void;
  isLocked: boolean;
};

type PinnedSpot = Spot & { coords: [number, number] };

// Leaflet makes its container focusable (tabindex 0) but gives it no name.
function nameMapContainer(map: LeafletMap | null) {
  map?.getContainer().setAttribute("aria-label", "Map of perfume spots in General Santos City");
}

// Leaflet only handles Escape while the map container itself has focus, not a focused marker.
function CloseSpotPopupOnEscape() {
  const map = useMapEvents({
    keydown: (event) => {
      if (event.originalEvent.key === "Escape") map.closePopup();
    },
  });
  return null;
}

// Leaflet's drag handler cancels touchmove, so touch-action alone cannot let a swipe scroll the page.
// Dragging is off while locked; mouse users have no overlay button, so they are never locked.
function LockTouchDragging({ isLocked }: { isLocked: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (!isLocked || !window.matchMedia("(pointer: coarse)").matches) return;
    map.dragging.disable();
    return () => {
      map.dragging.enable();
    };
  }, [map, isLocked]);
  return null;
}

// Leaflet's popup auto-pan always animates, so with reduced motion the popup pans itself without it.
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function PanPopupIntoViewWithoutAnimation({
  paddingLeft,
  paddingTop,
}: {
  paddingLeft: number;
  paddingTop: number;
}) {
  const map = useMapEvents({
    popupopen: ({ popup }) => {
      const element = popup.getElement();
      const latLng = popup.getLatLng();
      if (!element || !latLng) return;
      const halfWidth = element.offsetWidth / 2;
      map.panInside(latLng, {
        paddingTopLeft: [
          Math.max(paddingLeft, halfWidth),
          element.offsetHeight + POPUP_PAN_PADDING_TOP_EXTRA + paddingTop - POPUP_PAN_PADDING_EDGE,
        ],
        paddingBottomRight: [Math.max(POPUP_PAN_PADDING_EDGE, halfWidth), POPUP_PAN_PADDING_EDGE],
        animate: false,
      });
    },
  });
  return null;
}

// The map container is display:none while the phone shows the list, so Leaflet needs telling when it appears.
function KeepMapSized({ onWidthChange }: { onWidthChange: (width: number) => void }) {
  const map = useMap();
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
      const { x: width } = map.getSize();
      if (width > 0) onWidthChange(width);
    });
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map, onWidthChange]);
  return null;
}

function OpenRequestedPopup({
  request,
  markers,
}: {
  request: FocusRequest | null;
  markers: RefObject<Map<string, LeafletMarker>>;
}) {
  const map = useMap();
  useEffect(() => {
    if (!request) return;
    map.invalidateSize({ animate: false });
    markers.current.get(request.name)?.openPopup();
  }, [map, request, markers]);
  return null;
}

export default function ScentMapView({ spots, selectedName, focusRequest, onSelect, isLocked }: Props) {
  const markers = useRef(new Map<string, LeafletMarker>());
  const [reducedMotion] = useState(prefersReducedMotion);
  const [tilesFailed, setTilesFailed] = useState(false);
  const [mapWidth, setMapWidth] = useState<number | null>(null);
  const panPaddingLeft = leftPanPadding(mapWidth);
  const panPaddingTop = topPanPadding(mapWidth, tilesFailed);
  const pinned = spots.filter((s): s is PinnedSpot => s.coords !== undefined);
  // With two or more pins, fit them all in view; otherwise center on the one pin or the city.
  const bounds =
    pinned.length > 1 ? L.latLngBounds(pinned.map((s) => s.coords)).pad(0.3) : undefined;

  return (
    <>
      <MapContainer
        ref={nameMapContainer}
        center={pinned[0]?.coords ?? scentMap.center}
        zoom={15}
        bounds={bounds}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          eventHandlers={{ tileerror: () => setTilesFailed(true) }}
        />
        <CloseSpotPopupOnEscape />
        <KeepMapSized onWidthChange={setMapWidth} />
        <LockTouchDragging isLocked={isLocked} />
        {reducedMotion && (
          <PanPopupIntoViewWithoutAnimation paddingLeft={panPaddingLeft} paddingTop={panPaddingTop} />
        )}
        {pinned.map((spot) => (
          <Marker
            key={spot.name}
            position={spot.coords}
            icon={spot.name === selectedName ? selectedPin : pin}
            title={spot.name}
            ref={(marker) => {
              if (marker) markers.current.set(spot.name, marker);
              else markers.current.delete(spot.name);
            }}
            eventHandlers={{
              popupopen: () => onSelect(spot.name),
              popupclose: () => onSelect(null),
            }}
          >
            {/* Without a minimum width Leaflet sizes the popup to its longest word and wraps every line. */}
            {/* Left padding pans the popup clear of the zoom control, or top padding below it on narrow maps. */}
            {/* react-leaflet applies popup options once, so the padding is refreshed on every render. */}
            <Popup
              ref={(popup) => {
                if (popup) popup.options.autoPanPaddingTopLeft = [panPaddingLeft, panPaddingTop];
              }}
              autoPan={!reducedMotion}
              minWidth={POPUP_MIN_WIDTH}
              maxWidth={300}
              autoPanPaddingTopLeft={[panPaddingLeft, panPaddingTop]}
              autoPanPaddingBottomRight={[POPUP_PAN_PADDING_EDGE, POPUP_PAN_PADDING_EDGE]}
            >
              {/* Right padding keeps the first line clear of the close button. */}
              <p className="pr-6 text-sm tracking-label text-muted uppercase">
                {scentMap.kinds[spot.kind].label}
              </p>
              <p className="text-lg">{spot.name}</p>
              <p className="text-base text-muted">{spot.location}</p>
              {spot.notes && <p className="text-base text-muted">{spot.notes}</p>}
              <a
                href={directionsUrl(spot.coords)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get directions to ${spot.name}`}
                className="mt-3 inline-flex min-h-11 items-center rounded-control bg-accent px-5 text-base font-medium hover:bg-accent-bright"
              >
                Get directions
              </a>
            </Popup>
          </Marker>
        ))}
        <OpenRequestedPopup request={focusRequest} markers={markers} />
      </MapContainer>
      {tilesFailed && (
        <p
          role="status"
          className="absolute inset-x-0 top-0 z-[1000] border-b border-border bg-background px-4 py-2 text-center text-base"
        >
          The map could not load. Use the list instead.
        </p>
      )}
    </>
  );
}
