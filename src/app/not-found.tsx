import type { Metadata } from "next";
import { Button } from "@/components/button";
import { SectionTitle } from "@/components/section-title";
import { sectionHref, sections } from "@/lib/site";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="page-width py-24 text-center sm:py-32">
      <SectionTitle as="h1">Page not found</SectionTitle>
      <p className="mx-auto mt-5 max-w-xl text-xl text-muted">
        This page doesn&apos;t exist. Everything on the site is on the home page.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Back to home</Button>
        <Button href={sectionHref(sections.scentMap.id)} variant="outline">
          {sections.scentMap.label}
        </Button>
      </div>
    </div>
  );
}
