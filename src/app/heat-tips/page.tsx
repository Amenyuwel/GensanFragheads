import type { Metadata } from "next";
import { HeatTipsSection } from "@/components/heat-tips-section";
import { heatTipsPage, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${heatTipsPage.label} · ${site.name}`,
  description: "Simple habits that help your fragrance last through General Santos City's heat and humidity.",
};

export default function HeatTipsPage() {
  return <HeatTipsSection />;
}
