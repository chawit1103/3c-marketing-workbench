interface PlaceholderResultCardProps {
  title: string;
  body: string;
}

export function PlaceholderResultCard({ title, body }: PlaceholderResultCardProps) {
  return (
    <article className="card placeholder-card" aria-label={title}>
      <div className="empty-state" aria-hidden="true">—</div>
      <h3>{title}</h3>
      <p>{body}</p>
      <p className="muted">Sample content only. No real result is generated in PR2.</p>
    </article>
  );
}
