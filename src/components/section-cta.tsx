import { Button } from "@/components/button";

type Props = { prompt: string; label: string; href: string };

/** Closing call to action at the end of a page section. */
export function SectionCta({ prompt, label, href }: Props) {
  return (
    <div className="mt-12 flex flex-col items-center gap-4 text-center">
      <p className="text-lg text-muted">{prompt}</p>
      <Button href={href}>{label}</Button>
    </div>
  );
}
