import { Button } from "@/components/button";

type Props = { prompt: string; label: string; href: string };

/** Closing call to action at the end of a page section. */
export function SectionCta({ prompt, label, href }: Props) {
  return (
    <div className="mt-12 flex flex-col gap-6 rounded-panel bg-subtle p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <p className="max-w-xl text-lg">{prompt}</p>
      <div className="shrink-0">
        <Button href={href}>{label}</Button>
      </div>
    </div>
  );
}
