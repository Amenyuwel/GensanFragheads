import type { ReactNode } from "react";

type Props = { children: ReactNode; as?: "h1" | "h2"; id?: string };

/** Centered heading between two hairlines. */
export function SectionTitle({ children, as: Tag = "h2", id }: Props) {
  return (
    <div className="flex items-center gap-6">
      <span className="h-px flex-1 bg-border" />
      <Tag id={id} className="text-center text-3xl sm:text-4xl">
        {children}
      </Tag>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
