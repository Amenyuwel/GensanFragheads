import { PageSection } from "@/components/page-section";
import { heatTips } from "@/lib/data";
import { heatTipsPage } from "@/lib/site";

export function HeatTipsSection() {
  return (
    <PageSection
      id={heatTipsPage.id}
      title="Heat Tips"
      lead="Simple habits that help your fragrance last through GenSan's heat and humidity."
    >
      <ul className="mx-auto grid max-w-5xl gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {heatTips.tips.map((tip) => (
          <li key={tip.heading} className="text-center">
            <h3 className="border-b border-border pb-3 text-lg tracking-[0.08em] uppercase">{tip.heading}</h3>
            <p className="mt-3 text-lg text-muted">{tip.text}</p>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
