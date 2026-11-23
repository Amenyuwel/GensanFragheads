import { PageSection } from "@/components/page-section";
import { PickTiers } from "@/components/pick-tiers";
import { SectionCta } from "@/components/section-cta";
import { postTemplates, sections, submitUrl } from "@/lib/site";

export function HeatProofSection() {
  return (
    <PageSection
      id={sections.heatProof.id}
      title="Heat-Proof Picks"
      lead="Fragrances the community says hold up in GenSan heat and humidity, grouped by budget. Built from member recommendations on the subreddit."
    >
      <PickTiers />
      <SectionCta
        prompt="Share your go-to, what you paid, and how many hours it lasts outdoors."
        label="Add your pick"
        href={submitUrl("What works in GenSan heat?", postTemplates.pick)}
      />
    </PageSection>
  );
}
