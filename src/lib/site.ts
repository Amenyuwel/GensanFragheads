// Only development may fall back to localhost: a production build would bake it into the share-preview tags.
function siteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (url) return url;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not set. Set it to the site's public origin (e.g. https://example.com) before a production build.",
    );
  }
  return "http://localhost:3000";
}

export const site = {
  name: "GenSanFragheads",
  description:
    "Where to buy, test and decant fragrance in General Santos City.",
  subreddit: "r/GenSanFragheads",
  subredditUrl: "https://www.reddit.com/r/GenSanFragheads",
  /** Public origin, needed for absolute share-preview URLs. */
  url: siteUrl(),
  /** Brand ink (--ink in globals.css), used for the browser UI colour and the web manifest. */
  themeColor: "#231a2e",
};

/** The home page's sections. `id` is both the element id and the anchor the nav links to. */
export const sections = {
  scentMap: { id: "scent-map", label: "Scent Map" },
  community: { id: "community", label: "From the community" },
} as const;

/** Absolute so the link also works from other pages and the 404 page. */
export function sectionHref(id: string) {
  return `/#${id}`;
}

/** Ids of the sections on the home page, in scroll order. */
export const homeSectionIds = [sections.scentMap.id];

/** Nav order: home sections in scroll order. Each item scroll-spies on the home page via its `sectionId`. */
export const nav = [
  { label: sections.scentMap.label, href: sectionHref(sections.scentMap.id), sectionId: sections.scentMap.id },
];

/** Body text pre-filled into new subreddit posts, so submissions arrive in a consistent shape. */
export const postTemplates = {
  spot: "Name:\nLocation or where to order:\nBrands carried:\nTesters available?\nPrice range:",
};

/** Link that opens a new text post on the subreddit with the title and body filled in. */
export function submitUrl(title: string, text = "") {
  const params = new URLSearchParams({ title, text, selftext: "true" });
  return `${site.subredditUrl}/submit?${params}`;
}
