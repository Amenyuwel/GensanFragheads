type Props = { message: string; actionLabel: string; actionHref: string };

/** Shown in place of an empty list, with a link that lets the reader fill it. */
export function EmptyNotice({ message, actionLabel, actionHref }: Props) {
  return (
    <p className="rounded-panel bg-subtle p-6 text-lg text-muted">
      {message}{" "}
      <a href={actionHref} className="text-foreground underline">
        {actionLabel}
      </a>
    </p>
  );
}
