export const site = {
  name: "GenSanFragheads",
  description:
    "Where to buy, test and decant fragrance in General Santos City, and what the community says survives the heat.",
  subreddit: "r/GenSanFragheads",
  subredditUrl: "https://www.reddit.com/r/GenSanFragheads",
};

/** The page's sections. `id` is both the element id and the anchor the nav links to. */
export const sections = {
  scentMap: { id: "scent-map", label: "Scent Map" },
  heatProof: { id: "heat-proof-picks", label: "Heat-Proof Picks" },
} as const;

/** Nav order matches scroll order. */
export const nav = [sections.scentMap, sections.heatProof];

/** Absolute so the link also works from the 404 page. */
export function sectionHref(id: string) {
  return `/#${id}`;
}

/** Body text pre-filled into new subreddit posts, so submissions arrive in a consistent shape. */
export const postTemplates = {
  spot: "Name:\nLocation or where to order:\nBrands carried:\nTesters available?\nPrice range:",
  pick: "Fragrance:\nPrice paid (PHP):\nHours it lasts outdoors:\nWhere I wear it:",
};

/** Link that opens a new text post on the subreddit with the title and body filled in. */
export function submitUrl(title: string, text = "") {
  const params = new URLSearchParams({ title, text, selftext: "true" });
  return `${site.subredditUrl}/submit?${params}`;
}
