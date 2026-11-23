/** Google Maps directions to a [latitude, longitude] pair. */
export function directionsUrl([latitude, longitude]: [number, number]) {
  return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
}
