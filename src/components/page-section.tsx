import type { ReactNode } from "react";
import { SectionTitle } from "@/components/section-title";

type Props = { id: string; title: string; lead: ReactNode; children: ReactNode; band?: boolean };

/**
 * One section of the single-page site, reachable from the nav at `#id`.
 * With `band`, the section sits on a full-width saffron band; the id is on the band so the anchor lands above its padding.
 */
export function PageSection({ id, title, lead, children, band = false }: Props) {
  const content = (
    <>
      <SectionTitle id={`${id}-title`}>{title}</SectionTitle>
      <p className={`mt-5 max-w-2xl text-xl ${band ? "text-ink" : "text-muted"}`}>{lead}</p>
      <div className="mt-12">{children}</div>
    </>
  );

  if (band) {
    return (
      <section id={id} aria-labelledby={`${id}-title`} className="wave-band mt-section bg-accent py-section text-ink">
        <div className="page-section page-width">{content}</div>
      </section>
    );
  }

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="page-section page-width pt-section">
      {content}
    </section>
  );
}
