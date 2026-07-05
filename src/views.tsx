import { ObjectiveCard } from './components/product/ObjectiveCard';
import { PlaceholderResultCard } from './components/product/PlaceholderResultCard';

export function HomeView() {
  return (
    <section className="view-stack" aria-labelledby="home-title">
      <div className="hero card card-accent">
        <p className="eyebrow">M1 PR2 shell</p>
        <h1 id="home-title">Compare marketing scenarios safely before budget decisions.</h1>
        <p>
          Start from reviewed sample assumptions, keep outputs aggregate, and use plain executive
          language for human review.
        </p>
        <div className="button-row">
          <a className="button button-primary" href="/workbench">Open guided workbench</a>
          <a className="button button-secondary" href="/health">View product health</a>
        </div>
      </div>
      <div className="grid three-col">
        <ObjectiveCard
          title="Business question first"
          description="Frame the decision, scenario, audience segment, and channel mix before any result view."
          status="ready"
        />
        <ObjectiveCard
          title="Directional signals only"
          description="Use ranges, confidence language, limitations, and evidence gaps instead of outcome guarantees."
          status="review"
        />
        <ObjectiveCard
          title="Executive review path"
          description="Dashboard and export pages are placeholders until later reviewed implementation PRs."
          status="placeholder"
        />
      </div>
    </section>
  );
}

export function WorkbenchView() {
  const steps = [
    'Choose a safe sample scenario',
    'Describe the business question',
    'Select aggregate audience and channel assumptions',
    'Review safety and data boundaries',
    'Run offline simulation later',
    'Review executive dashboard later',
    'Review export package later',
  ];

  return (
    <section className="view-stack" aria-labelledby="workbench-title">
      <div className="card">
        <p className="eyebrow">Guided 7-step workflow</p>
        <h1 id="workbench-title">Workbench placeholder</h1>
        <p>This PR only creates the route and low-cognitive-load workflow skeleton.</p>
      </div>
      <ol className="step-list">
        {steps.map((step, index) => (
          <li className="card step-card" key={step}>
            <span className="step-number">{index + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function RunDashboardView({ runId }: { runId?: string }) {
  return (
    <section className="view-stack" aria-labelledby="dashboard-title">
      <div className="card">
        <p className="eyebrow">Run {runId ?? 'sample'}</p>
        <h1 id="dashboard-title">Executive dashboard placeholder</h1>
        <p>No real scenario result is produced in PR2. This page reserves space for later aggregate review.</p>
      </div>
      <div className="grid two-col">
        <PlaceholderResultCard
          title="What was tested"
          body="A concise scenario summary will appear here after a reviewed implementation PR."
        />
        <PlaceholderResultCard
          title="What still needs review"
          body="Limitations, confidence notes, and evidence gaps will remain visible before action."
        />
      </div>
    </section>
  );
}

export function ExportReviewView({ runId }: { runId?: string }) {
  return (
    <section className="view-stack" aria-labelledby="export-title">
      <div className="card">
        <p className="eyebrow">Run {runId ?? 'sample'}</p>
        <h1 id="export-title">Export review placeholder</h1>
        <p>
          Later exports will require human review of assumptions, limitations, and allowed formats before
          any file is prepared.
        </p>
      </div>
      <div className="form-card card">
        <label htmlFor="format">Planned format</label>
        <select id="format" disabled>
          <option>Executive summary package</option>
        </select>
        <button className="button button-primary" type="button" disabled>Export unavailable in PR2</button>
      </div>
    </section>
  );
}

export function HealthView() {
  return (
    <section className="view-stack" aria-labelledby="health-title">
      <div className="card">
        <p className="eyebrow">Product health</p>
        <h1 id="health-title">Scaffold readiness</h1>
        <p>PR2 provides a tested frontend shell, route placeholders, and design system foundation.</p>
      </div>
      <div className="grid three-col">
        <ObjectiveCard title="Routes" description="Five documented routes resolve without route sprawl." status="ready" />
        <ObjectiveCard title="Design system" description="Tokens, cards, badges, buttons, forms, and states are defined." status="ready" />
        <ObjectiveCard title="Integrations" description="No external data or simulation connection is included yet." status="placeholder" />
      </div>
    </section>
  );
}

export function NotFoundView() {
  return (
    <section className="view-stack" aria-labelledby="not-found-title">
      <div className="card error-state">
        <p className="eyebrow">Route not found</p>
        <h1 id="not-found-title">This page is not part of the PR2 shell.</h1>
        <p>Use the main navigation to return to a documented workbench route.</p>
      </div>
    </section>
  );
}
