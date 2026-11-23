export const site = {
  name: "GenSanFragheads",
  description:
    "Where to buy, test and decant fragrance in General Santos City, and what the community says survives the heat.",
  subreddit: "r/GenSanFragheads",
  subredditUrl: "https://www.reddit.com/r/GenSanFragheads",
};

/** The home page's sections. `id` is both the element id and the anchor the nav links to. */
export const sections = {
  scentMap: { id: "scent-map", label: "Scent Map" },
  heatProof: { id: "heat-proof-picks", label: "Heat-Proof Picks" },
} as const;

/** Heat Tips is its own page; `id` is the id of its section element. */
export const heatTipsPage = { id: "heat-tips", label: "Heat Tips", path: "/heat-tips" } as const;

/** Absolute so the link also works from other pages and the 404 page. */
export function sectionHref(id: string) {
  return `/#${id}`;
}

/** Ids of the sections on the home page, in scroll order. */
export const homeSectionIds = [sections.scentMap.id, sections.heatProof.id];

/** Nav order: home sections in scroll order, then other pages. Items with a `sectionId` scroll-spy on the home page. */
export const nav = [
  { label: sections.scentMap.label, href: sectionHref(sections.scentMap.id), sectionId: sections.scentMap.id },
  { label: sections.heatProof.label, href: sectionHref(sections.heatProof.id), sectionId: sections.heatProof.id },
  { label: heatTipsPage.label, href: heatTipsPage.path },
];

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
