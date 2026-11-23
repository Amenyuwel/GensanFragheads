// Types for the JSON files in src/data. JSON can't carry types or comments, so they live here;
// the field notes below are the reference for anyone editing the JSON by hand.
import heatProofJson from "@/data/heat-proof.json";
import scentMapJson from "@/data/scent-map.json";

export type SpotKind = "counter" | "decant" | "local-maker";

export type Spot = {
  name: string;
  kind: SpotKind;
  /** Mall, street or barangay. */
  location: string;
  /** [latitude, longitude]. Omit for online-only sellers; they are listed but not pinned. */
  coords?: [number, number];
  /** Brands carried, tester availability, price range. Leave out until someone has checked. */
  notes?: string;
  /** Subreddit thread or seller page. */
  link?: string;
};

export type ScentMapData = {
  /** Map center when no spot has coordinates. */
  center: [number, number];
  /** Heading and one-line description for each group in the list, in display order. */
  kinds: Record<SpotKind, { label: string; blurb: string }>;
  spots: Spot[];
};

export type Tier = { id: string; label: string };

export type Pick = {
  name: string;
  brand: string;
  /** Must match a tier `id`. */
  tier: string;
  /** Why members say it holds up in GenSan heat and humidity. */
  why: string;
  /** Subreddit thread where it was recommended. */
  link?: string;
};

export type HeatProofData = { tiers: Tier[]; picks: Pick[] };

export const scentMap = scentMapJson as ScentMapData;
export const heatProof = heatProofJson as HeatProofData;

export const spotKinds = Object.keys(scentMap.kinds) as SpotKind[];

// TypeScript can't see inside JSON, so check the references by hand. A typo fails the build with
// this message instead of rendering an empty group or crashing on an undefined label.
for (const spot of scentMap.spots) {
  if (!spotKinds.includes(spot.kind)) {
    throw new Error(`scent-map.json: "${spot.name}" has kind "${spot.kind}". Use one of: ${spotKinds.join(", ")}.`);
  }
}
const tierIds = heatProof.tiers.map((tier) => tier.id);
for (const pick of heatProof.picks) {
  if (!tierIds.includes(pick.tier)) {
    throw new Error(`heat-proof.json: "${pick.name}" has tier "${pick.tier}". Use one of: ${tierIds.join(", ")}.`);
  }
}
