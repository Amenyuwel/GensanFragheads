import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  solid: "bg-accent text-ink hover:bg-accent-bright",
  outline: "border-2 border-foreground hover:bg-foreground hover:text-background",
  outlineOnDark: "border-2 border-white text-white hover:bg-white hover:text-ink",
};

type Props = { href: string; children: ReactNode; variant?: keyof typeof variants };

/** Pill-shaped link styled as a button. Internal paths use next/link. */
export function Button({ href, children, variant = "solid" }: Props) {
  const className = `inline-flex min-h-12 items-center justify-center rounded-control px-6 py-2 text-center text-base font-medium transition-ui motion-lift ${variants[variant]}`;
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
