"use client";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { scentMap, type Spot } from "@/lib/data";

// Leaflet's default marker images break under bundlers, so the pin is inline SVG.
// Bright blue so it stands out from the grey tiles and the map's own dark POI icons.
const pin = L.divIcon({
  className: "scent-pin",
  html: `<svg viewBox="0 0 32 42" width="32" height="42" aria-hidden="true">
    <path d="M16 1C7.7 1 1 7.7 1 16c0 10.6 15 25 15 25s15-14.4 15-25C31 7.7 24.3 1 16 1z" fill="#1565ff" stroke="#fff" stroke-width="2"/>
    <circle cx="16" cy="16" r="6" fill="#fff"/>
  </svg>`,
  iconSize: [32, 42],
  iconAnchor: [16, 41],
  popupAnchor: [0, -38],
});

type PinnedSpot = Spot & { coords: [number, number] };

export default function ScentMapView({ spots }: { spots: Spot[] }) {
  const pinned = spots.filter((s): s is PinnedSpot => s.coords !== undefined);
  // With two or more pins, fit them all in view; otherwise center on the one pin or the city.
  const bounds = pinned.length > 1 ? L.latLngBounds(pinned.map((s) => s.coords)).pad(0.3) : undefined;

  return (
    <MapContainer
      center={pinned[0]?.coords ?? scentMap.center}
      zoom={15}
      bounds={bounds}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pinned.map((spot) => (
        <Marker key={spot.name} position={spot.coords} icon={pin} title={spot.name}>
          {/* Without a minimum width Leaflet sizes the popup to its longest word and wraps every line. */}
          <Popup minWidth={240} maxWidth={300}>
            {/* Right padding keeps the first line clear of the close button. */}
            <p className="pr-6 text-sm tracking-[0.12em] text-muted uppercase">{scentMap.kinds[spot.kind].label}</p>
            <p className="mt-1 text-lg tracking-[0.06em] uppercase">{spot.name}</p>
            <p className="mt-1 text-base text-muted">{spot.location}</p>
            {spot.notes && <p className="mt-1 text-base text-muted">{spot.notes}</p>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
