import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  solid: "bg-brass text-white hover:bg-green",
  outline: "border border-foreground hover:bg-foreground hover:text-background",
  outlineOnDark: "border border-white text-white hover:bg-white hover:text-green",
};

type Props = { href: string; children: ReactNode; variant?: keyof typeof variants };

/** Square, uppercase link styled as a button. Internal paths use next/link. */
export function Button({ href, children, variant = "solid" }: Props) {
  const className = `inline-block px-6 py-3 text-center text-sm tracking-label uppercase transition-colors ${variants[variant]}`;
  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
