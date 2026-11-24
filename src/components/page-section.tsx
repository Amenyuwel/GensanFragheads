import type { ReactNode } from "react";
import { SectionTitle } from "@/components/section-title";

type Props = { id: string; title: string; lead: string; children: ReactNode };

/** One section of the single-page site, reachable from the nav at `#id`. */
export function PageSection({ id, title, lead, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="page-width pt-section">
      <SectionTitle id={`${id}-title`}>{title}</SectionTitle>
      <p className="mt-5 max-w-2xl text-xl text-muted">{lead}</p>
      <div className="mt-12">{children}</div>
    </section>
  );
}
