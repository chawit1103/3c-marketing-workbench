interface ObjectiveCardProps {
  title: string;
  description: string;
  status: 'ready' | 'placeholder' | 'review';
}

const statusText: Record<ObjectiveCardProps['status'], string> = {
  ready: 'Ready for review',
  placeholder: 'Placeholder',
  review: 'Human review',
};

export function ObjectiveCard({ title, description, status }: ObjectiveCardProps) {
  return (
    <article className="card objective-card">
      <span className={`badge badge-${status}`}>{statusText[status]}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
