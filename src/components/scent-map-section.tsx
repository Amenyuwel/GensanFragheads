import { PageSection } from "@/components/page-section";
import { ScentMapExplorer } from "@/components/scent-map-explorer";
import { scentMap } from "@/lib/data";
import { sections } from "@/lib/site";

export function ScentMapSection() {
  return (
    <PageSection
      id={sections.scentMap.id}
      title="GenSan Scent Map"
      lead="Where to buy, test and decant in General Santos City. Entries come from members on the subreddit."
    >
      <ScentMapExplorer spots={scentMap.spots} />
    </PageSection>
  );
}
