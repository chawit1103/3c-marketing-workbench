import { useI18n } from '../../i18n/useI18n';

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
  const { t } = useI18n();
  return (
    <article className="card objective-card">
      <span className={`badge badge-${status}`}>{t(statusText[status])}</span>
      <h3>{t(title)}</h3>
      <p>{t(description)}</p>
    </article>
  );
}
