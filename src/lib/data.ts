// Types for the JSON files in src/data. JSON can't carry types or comments, so they live here;
// the field notes below are the reference for anyone editing the JSON by hand.
import communityPostsJson from "@/data/community-posts.json";
import scentMapJson from "@/data/scent-map.json";
import { site } from "@/lib/site";

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

export const scentMap = scentMapJson as ScentMapData;

export const spotKinds = Object.keys(scentMap.kinds) as SpotKind[];

// TypeScript can't see inside JSON, so check the references by hand. A typo fails the build with
// this message instead of rendering an empty group or crashing on an undefined label.
for (const spot of scentMap.spots) {
  if (!spotKinds.includes(spot.kind)) {
    throw new Error(`scent-map.json: "${spot.name}" has kind "${spot.kind}". Use one of: ${spotKinds.join(", ")}.`);
  }
}

export type CommunityPost = {
  /** Shown as the link text if the Reddit embed can't load. */
  title: string;
  /** Full post address from the browser's address bar, not a /s/ share link. */
  url: string;
};

export const communityPosts = communityPostsJson as CommunityPost[];

/** The community section and its nav link are hidden while community-posts.json is empty. */
export const hasCommunityPosts = communityPosts.length > 0;

for (const post of communityPosts) {
  if (!post.url?.startsWith(`${site.subredditUrl}/comments/`)) {
    throw new Error(
      `community-posts.json: "${post.title}" has url "${post.url}". Use the full address, starting with ${site.subredditUrl}/comments/.`,
    );
  }
}
