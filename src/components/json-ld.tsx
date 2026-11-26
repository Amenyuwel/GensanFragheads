import { scentMap } from "@/lib/data";
import { site } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: site.name,
      description: site.description,
      url: site.url,
    },
    {
      "@type": "ItemList",
      name: "Scent Map",
      itemListElement: scentMap.spots.map((spot, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Place",
          name: spot.name,
          address: spot.location,
          ...(spot.coords && {
            geo: { "@type": "GeoCoordinates", latitude: spot.coords[0], longitude: spot.coords[1] },
          }),
          ...(spot.link && { url: spot.link }),
        },
      })),
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // "<" is escaped so no string in the data can close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
    />
  );
}
