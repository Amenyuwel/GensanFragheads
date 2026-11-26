import type { Metadata } from "next";
import { CommunitySection } from "@/components/community-section";
import { Hero } from "@/components/hero";
import { JoinCta } from "@/components/join-cta";
import { JsonLd } from "@/components/json-ld";
import { ScentMapSection } from "@/components/scent-map-section";
import { SuggestSpot } from "@/components/suggest-spot";
import { site } from "@/lib/site";

// Canonical and share-preview URLs are set here, not in the layout, so the 404 page does not claim to be the home page.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: site.homeTitle,
    description: site.description,
    url: "/",
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.homeTitle,
    description: site.description,
  },
};

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <ScentMapSection />
      <CommunitySection />
      <SuggestSpot />
      <JoinCta />
    </>
  );
}
