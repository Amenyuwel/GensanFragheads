import type { ReactNode } from "react";

type Props = { children: ReactNode; as?: "h1" | "h2"; id?: string };

/** Centered uppercase heading between two hairlines. */
export function SectionTitle({ children, as: Tag = "h2", id }: Props) {
  return (
    <div className="flex items-center gap-6">
      <span className="h-px flex-1 bg-border" />
      <Tag id={id} className="text-center text-2xl tracking-[0.08em] uppercase sm:text-3xl">
        {children}
      </Tag>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
