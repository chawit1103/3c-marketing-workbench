import { safetyLabels } from '../../product/safety/safetyLabels';
import { useI18n } from '../../i18n/useI18n';

export function SafetyLabels() {
  const { t } = useI18n();
  return (
    <section className="safety-panel" aria-label={t('Safety boundaries')} aria-labelledby="safety-labels-title">
      <div>
        <p className="eyebrow">{t('Safe scenario review only')}</p>
        <h2 id="safety-labels-title">{t('Safety boundaries')}</h2>
      </div>
      <ul className="badge-list" aria-label={t('Visible safety labels')}>
        {safetyLabels.map((label) => (
          <li className="badge badge-safe" key={label}>
            {t(label)}
          </li>
        ))}
      </ul>
    </section>
  );
}
