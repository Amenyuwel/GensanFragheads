import { PageSection } from "@/components/page-section";
import { ScentMap } from "@/components/scent-map";
import { SectionCta } from "@/components/section-cta";
import { SpotList } from "@/components/spot-list";
import { scentMap } from "@/lib/data";
import { postTemplates, sections, submitUrl } from "@/lib/site";

export function ScentMapSection() {
  return (
    <PageSection
      id={sections.scentMap.id}
      title="GenSan Scent Map"
      lead="Where to buy, test and decant in General Santos City. Entries come from members on the subreddit."
    >
      <ScentMap spots={scentMap.spots} />
      <div className="mt-16">
        <SpotList />
      </div>
      <SectionCta
        prompt="Know a spot we missed? Post the place, the brands they carry, and whether they have testers."
        label="Suggest a spot"
        href={submitUrl("Scent Map suggestion: ", postTemplates.spot)}
      />
    </PageSection>
  );
}
