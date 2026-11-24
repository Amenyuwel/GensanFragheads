import { PageSection } from "@/components/page-section";
import { ScentMapExplorer } from "@/components/scent-map-explorer";
import { SectionCta } from "@/components/section-cta";
import { scentMap } from "@/lib/data";
import { postTemplates, sections, submitUrl } from "@/lib/site";

export function ScentMapSection() {
  return (
    <PageSection
      id={sections.scentMap.id}
      title="GenSan Scent Map"
      lead="Where to buy, test and decant in General Santos City. Entries come from members on the subreddit."
    >
      <ScentMapExplorer spots={scentMap.spots} />
      <SectionCta
        prompt="Know a spot we missed, like a decant seller or local maker? Post the place, the brands they carry, and whether they have testers."
        label="Suggest a spot"
        href={submitUrl("Scent Map suggestion: ", postTemplates.spot)}
      />
    </PageSection>
  );
}
