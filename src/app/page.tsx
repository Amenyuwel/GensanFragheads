import { CommunitySection } from "@/components/community-section";
import { Hero } from "@/components/hero";
import { JoinCta } from "@/components/join-cta";
import { ScentMapSection } from "@/components/scent-map-section";

export default function Home() {
  return (
    <>
      <Hero />
      <ScentMapSection />
      <CommunitySection />
      <JoinCta />
    </>
  );
}
