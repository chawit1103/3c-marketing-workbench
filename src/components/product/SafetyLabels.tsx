import { safetyLabels } from '../../product/safety/safetyLabels';

export function SafetyLabels() {
  return (
    <section className="safety-panel" aria-label="Safety boundaries" aria-labelledby="safety-labels-title">
      <div>
        <p className="eyebrow">Safe scenario review only</p>
        <h2 id="safety-labels-title">Safety boundaries</h2>
      </div>
      <ul className="badge-list" aria-label="Visible safety labels">
        {safetyLabels.map((label) => (
          <li className="badge badge-safe" key={label}>
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}
