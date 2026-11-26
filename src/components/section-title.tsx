import type { ReactNode } from "react";

type Props = { children: ReactNode; as?: "h1" | "h2"; id?: string };

/** Left-aligned display heading. */
export function SectionTitle({ children, as: Tag = "h2", id }: Props) {
  return (
    <Tag id={id} className="text-title">
      {children}
    </Tag>
  );
}
