import type { ReactNode } from "react";
import { SectionTitle } from "@/components/section-title";

type Props = { id: string; title: string; lead: string; children: ReactNode };

/** One section of the single-page site, reachable from the nav at `#id`. */
export function PageSection({ id, title, lead, children }: Props) {
  return (
    // From md up the sticky header (~115px) overlaps the top padding, so the offset only covers the difference.
    <section id={id} aria-labelledby={`${id}-title`} className="page-width pt-20 md:scroll-mt-10 md:pt-28">
      <SectionTitle id={`${id}-title`}>{title}</SectionTitle>
      <p className="mx-auto mt-5 max-w-2xl text-center text-xl text-muted">{lead}</p>
      <div className="mt-12">{children}</div>
    </section>
  );
}
