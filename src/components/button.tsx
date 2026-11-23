import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  solid: "bg-green text-white hover:bg-green/90",
  outline: "border border-foreground hover:bg-foreground hover:text-background",
};

type Props = { href: string; children: ReactNode; variant?: keyof typeof variants };

/** Square, uppercase link styled as a button. Internal paths use next/link. */
export function Button({ href, children, variant = "solid" }: Props) {
  const className = `inline-block px-6 py-3 text-sm tracking-[0.16em] uppercase transition-colors ${variants[variant]}`;
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
