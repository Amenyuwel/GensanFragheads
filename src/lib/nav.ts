// Separate from site.ts because it depends on data.ts, which imports site.ts.
import { hasCommunityPosts } from "@/lib/data";
import { sectionHref, sections } from "@/lib/site";

// A section is listed only when it renders, so the nav never links to a missing anchor.
const homeSections = hasCommunityPosts ? [sections.scentMap, sections.community] : [sections.scentMap];

/** Ids of the sections on the home page, in scroll order. */
export const homeSectionIds = homeSections.map((section) => section.id);

/** Nav order: home sections in scroll order. Each item scroll-spies on the home page via its `sectionId`. */
export const nav = homeSections.map((section) => ({
  label: section.label,
  href: sectionHref(section.id),
  sectionId: section.id,
}));
