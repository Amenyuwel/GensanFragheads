import type { ReactNode } from "react";

/** Wraps `children` in a link when `href` is set, otherwise renders them as plain text. */
export function OptionalLink({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) return children;
  return (
    <a href={href} className="hover:underline">
      {children}
    </a>
  );
}
