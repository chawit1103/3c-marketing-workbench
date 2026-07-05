import { useMemo, useState } from 'react';
import { ObjectiveCard } from './components/product/ObjectiveCard';
import productLaunchFixture from './product/fixtures/productLaunchResult.json';

const audiencePresets = [
  'Gen Z',
  'Working Adults',
  'Urban Consumers',
  'SME Owners',
  'Parents',
  'General Consumers',
];
const platformOptions = ['Facebook', 'TikTok', 'LINE', 'YouTube', 'Instagram', 'X / Twitter'];

type LaunchForm = {
  brand: string;
  campaignMessage: string;
  offer: string;
  keyMessage: string;
  context: string;
  audiences: string[];
  platforms: string[];
};

type FixtureCard = {
  title: string;
  value: string;
  detail: string;
};

type ProductLaunchFixture = typeof productLaunchFixture;

const defaultForm: LaunchForm = {
  brand: productLaunchFixture.sampleInput.brand,
  campaignMessage: productLaunchFixture.sampleInput.campaign_message,
  offer: productLaunchFixture.sampleInput.offer,
  keyMessage: productLaunchFixture.sampleInput.key_message,
  context: productLaunchFixture.sampleInput.context,
  audiences: productLaunchFixture.sampleInput.audiences,
  platforms: productLaunchFixture.sampleInput.platforms,
};

export function HomeView() {
  return (
    <section className="view-stack" aria-labelledby="home-title">
      <div className="hero card card-accent">
        <p className="eyebrow">Marketing Decision Workbench</p>
        <h1 id="home-title">Compare product launch decisions safely before budget reviews.</h1>
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
          title="Product Launch workflow"
          description="A guided form, local run action, results dashboard, and export review are usable without live data."
          status="ready"
        />
        <ObjectiveCard
          title="Directional signals only"
          description="Use synthetic aggregate signals, confidence language, limitations, and evidence gaps instead of outcome guarantees."
          status="review"
        />
        <ObjectiveCard
          title="Executive review path"
          description="Dashboard and export review show a generated sample summary with safety boundaries visible."
          status="ready"
        />
      </div>
    </section>
  );
}

export function WorkbenchView() {
  const [form, setForm] = useState<LaunchForm>(defaultForm);
  const [hasRun, setHasRun] = useState(false);
  const [submittedForm, setSubmittedForm] = useState<LaunchForm>(defaultForm);
  const [errors, setErrors] = useState<string[]>([]);

  const selectedAudienceText = form.audiences.join(', ');
  const selectedPlatformText = form.platforms.join(', ');

  function updateField(field: keyof LaunchForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleList(field: 'audiences' | 'platforms', value: string) {
    setForm((current) => {
      const values = current[field].includes(value)
        ? current[field].filter((item) => item !== value)
        : [...current[field], value];
      return { ...current, [field]: values };
    });
  }

  function runSimulation() {
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (nextErrors.length > 0) {
      setHasRun(false);
      return;
    }
    setSubmittedForm(form);
    setHasRun(true);
  }

  const resultPreview = hasRun
    ? 'Result preview is ready below: open the dashboard or export-readiness preview after reviewing the top recommendation.'
    : 'Defaults are prefilled. Run now, or edit up to five visible inputs first.';

  return (
    <section className="view-stack" aria-labelledby="workbench-title">
      <div className="card card-accent quick-start">
        <div>
          <p className="eyebrow">Marketing Decision Workbench</p>
          <h1 id="workbench-title">Product Launch Simulation</h1>
          <p>
            Complete a reviewed offline Product Launch sample in under a minute. Your entries are
            review assumptions; the result comes from the generated product sample.
          </p>
          <section className="mode-chip" aria-label="Current workflow">
            <span className="badge badge-ready">Current workflow</span>
            <strong>Product Launch mode</strong>
            <span>Only Product Launch is available in this release.</span>
          </section>
        </div>
        <aside className="quick-start-panel" aria-label="Quick start run action">
          <p className="eyebrow">Quick start</p>
          <h2>Run with safe defaults</h2>
          <p>{resultPreview}</p>
          <button className="button button-primary" type="button" onClick={runSimulation}>
            Run offline simulation
          </button>
        </aside>
      </div>

      <div className="grid two-col align-start">
        <form className="card form-stack" aria-label="Product Launch setup" onSubmit={(event) => event.preventDefault()}>
          <fieldset>
            <legend>1. Workflow</legend>
            <div className="objective-static" aria-label="Objective: Product Launch">
              <span className="badge badge-ready">Product Launch mode</span>
              <strong>Review launch message, offer, audience, and channel assumptions.</strong>
              <p className="help-text">This is intentionally fixed so you can reach results quickly.</p>
            </div>
          </fieldset>

          <fieldset>
            <legend>2. Inputs you can edit</legend>
            <label htmlFor="brand">Brand/Product</label>
            <input
              id="brand"
              value={form.brand}
              onChange={(event) => updateField('brand', event.target.value)}
              placeholder="e.g. Nimbus Go"
            />
            <label htmlFor="campaign-message">Campaign Message</label>
            <textarea
              id="campaign-message"
              value={form.campaignMessage}
              onChange={(event) => updateField('campaignMessage', event.target.value)}
              rows={3}
            />
            <label htmlFor="offer">Offer/Promotion</label>
            <input id="offer" value={form.offer} onChange={(event) => updateField('offer', event.target.value)} />
            <label htmlFor="key-message">Key Message</label>
            <input
              id="key-message"
              value={form.keyMessage}
              onChange={(event) => updateField('keyMessage', event.target.value)}
            />
            <label htmlFor="context">Context notes</label>
            <textarea
              id="context"
              value={form.context}
              onChange={(event) => updateField('context', event.target.value)}
              rows={3}
            />
          </fieldset>

          <fieldset>
            <legend>3. Audience presets</legend>
            <div className="choice-grid" role="group" aria-label="Audience presets">
              {audiencePresets.map((audience) => (
                <label className="choice-pill" key={audience}>
                  <input
                    type="checkbox"
                    checked={form.audiences.includes(audience)}
                    onChange={() => toggleList('audiences', audience)}
                  />
                  {audience}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>4. Platform mix</legend>
            <div className="choice-grid" role="group" aria-label="Platform mix">
              {platformOptions.map((platform) => (
                <label className="choice-pill" key={platform}>
                  <input
                    type="checkbox"
                    checked={form.platforms.includes(platform)}
                    onChange={() => toggleList('platforms', platform)}
                  />
                  {platform}
                </label>
              ))}
            </div>
          </fieldset>

          {errors.length > 0 ? (
            <div className="error-state form-errors" role="alert">
              <strong>Complete required fields before running:</strong>
              <ul>
                {errors.map((error) => <li key={error}>{error}</li>)}
              </ul>
            </div>
          ) : null}

          <button className="button button-primary" type="button" onClick={runSimulation}>
            Run offline simulation
          </button>
        </form>

        <section className="card assumption-panel" aria-label="Current assumptions">
          <p className="eyebrow">Assumptions preview</p>
          <h2>What will appear in review</h2>
          <dl>
            <dt>Objective</dt>
            <dd>Product Launch</dd>
            <dt>Brand/Product</dt>
            <dd>{form.brand || 'Required'}</dd>
            <dt>Audience</dt>
            <dd>{selectedAudienceText || 'General Consumers'}</dd>
            <dt>Platform mix</dt>
            <dd>{selectedPlatformText || 'Required'}</dd>
          </dl>
          <p className="help-text">
            The browser does not call a live service. These entries are displayed as assumptions beside
            the generated offline sample result.
          </p>
        </section>
      </div>

      {hasRun ? <ProductLaunchResults form={submittedForm} fixture={productLaunchFixture} showActions /> : null}
    </section>
  );
}

export function RunDashboardView({ runId }: { runId?: string }) {
  return (
    <section className="view-stack" aria-labelledby="dashboard-title">
      <div className="card card-accent">
        <p className="eyebrow">Run {runId ?? productLaunchFixture.runId}</p>
        <h1 id="dashboard-title">Product Launch Results</h1>
        <p>Marketing-friendly decision dashboard for a reviewed offline product-launch simulation.</p>
      </div>
      <ProductLaunchResults form={defaultForm} fixture={productLaunchFixture} />
    </section>
  );
}

export function ExportReviewView({ runId }: { runId?: string }) {
  return (
    <section className="view-stack" aria-labelledby="export-title">
      <div className="card card-accent">
        <p className="eyebrow">Run {runId ?? productLaunchFixture.runId}</p>
        <h1 id="export-title">Export Readiness Preview</h1>
        <p>Preview format readiness and review notes only. No downloadable file is generated here.</p>
      </div>
      <ExportReview fixture={productLaunchFixture} />
    </section>
  );
}

export function HealthView() {
  return (
    <section className="view-stack" aria-labelledby="health-title">
      <div className="card">
        <p className="eyebrow">Product health</p>
        <h1 id="health-title">Product Launch readiness</h1>
        <p>Product Launch review provides a tested frontend workflow, generated offline sample result, dashboard, and export review.</p>
      </div>
      <div className="grid three-col">
        <ObjectiveCard title="Routes" description="Workbench, results, export review, and health routes resolve without route sprawl." status="ready" />
        <ObjectiveCard title="Product Launch workflow" description="Product Launch can be configured and run locally in the UI with safe assumptions." status="ready" />
        <ObjectiveCard title="Safety" description="No live data, credentials, private data, or production campaign claims are introduced." status="review" />
      </div>
    </section>
  );
}

export function NotFoundView() {
  return (
    <section className="view-stack" aria-labelledby="not-found-title">
      <div className="card error-state">
        <p className="eyebrow">Route not found</p>
        <h1 id="not-found-title">This page is not part of the guided Product Launch review.</h1>
        <p>Use the main navigation to return to a documented workbench route.</p>
      </div>
    </section>
  );
}

function ProductLaunchResults({
  form,
  fixture,
  showActions = false,
}: {
  form: LaunchForm;
  fixture: ProductLaunchFixture;
  showActions?: boolean;
}) {
  const assumptionRows = useMemo(
    () => [
      ['Brand/Product', form.brand],
      ['Campaign Message', form.campaignMessage],
      ['Offer/Promotion', form.offer],
      ['Key Message', form.keyMessage],
      ['Audience', form.audiences.join(', ') || 'General Consumers'],
      ['Platform mix', form.platforms.join(', ')],
      ['Context', form.context || 'No additional context'],
    ],
    [form],
  );

  return (
    <section className="view-stack" aria-labelledby="results-title">
      <div className="card result-hero">
        <p className="eyebrow">Result preview</p>
        <h2 id="results-title">{fixture.summary.headline}</h2>
        <p>{fixture.summary.text}</p>
        <section className="next-action-card" aria-label="Recommended next action">
          <p className="eyebrow">Recommended next action</p>
          <strong>Use this as a human review prompt, then approve a small evidence-gathering test.</strong>
          <p>{fixture.recommendedNextTest}</p>
        </section>
        <p className="help-text">Safety: synthetic aggregate offline result only; not predictive, not a conversion guarantee, and not production campaign evidence.</p>
        {showActions ? (
          <div className="button-row">
            <a className="button button-secondary" href={`/runs/${fixture.runId}`}>Open result dashboard</a>
            <a className="button button-secondary" href={`/exports/${fixture.runId}`}>Open export-readiness preview</a>
          </div>
        ) : null}
      </div>

      <div className="card assumption-panel">
        <p className="eyebrow">Your assumptions shown for review</p>
        <dl className="assumption-grid">
          {assumptionRows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="help-text">The generated sample result is not recalculated from arbitrary browser-entered data.</p>
      </div>

      <div className="grid three-col">
        {fixture.cards.map((card: FixtureCard) => (
          <MetricCard key={card.title} card={card} />
        ))}
      </div>

      <div className="grid two-col align-start">
        <InsightList title="Platform Breakdown" items={fixture.platformBreakdown.map((item) => `${item.platform}: ${item.signal}. ${item.detail}`)} />
        <InsightList title="Audience Insights" items={fixture.audienceInsights} />
        <InsightList title="Risks / Caveats" items={fixture.risksCaveats} />
        <div className="card">
          <p className="eyebrow">Decision support</p>
          <h3>Next reviewed experiment</h3>
          <p>{fixture.recommendedNextTest}</p>
        </div>
      </div>
    </section>
  );
}

function ExportReview({ fixture }: { fixture: ProductLaunchFixture }) {
  const formatLabels: Record<string, string> = {
    JSON: 'Data preview (JSON)',
    Markdown: 'Briefing preview (Markdown)',
    'Executive Summary': 'Executive summary preview',
  };

  return (
    <div className="view-stack">
      <div className="card">
        <p className="eyebrow">Export readiness only</p>
        <h2>{fixture.exports.readiness}</h2>
        <p>{fixture.exports.status} This screen confirms preview readiness; it is not a download action.</p>
      </div>
      <div className="grid three-col">
        {fixture.exports.formats.map((format) => (
          <div className="card" key={format.label}>
            <p className="eyebrow">{formatLabels[format.label] ?? format.label}</p>
            <h3>{format.status.replace('Available for review', 'Preview ready for review')}</h3>
            <p>{format.detail}</p>
          </div>
        ))}
      </div>
      <div className="card">
        <p className="eyebrow">Executive Summary preview</p>
        <h2>Executive-ready summary</h2>
        <p>{fixture.exports.executiveSummaryPreview}</p>
      </div>
      <div className="grid two-col align-start">
        <InsightList title="Review Assumptions" items={fixture.reviewMetadata.assumptions} />
        <InsightList title="Evidence Gaps" items={fixture.reviewMetadata.evidenceGaps} />
        <InsightList title="Limitations" items={fixture.reviewMetadata.limitations} />
        <div className="card">
          <p className="eyebrow">Review confidence</p>
          <h3>Offline sample basis</h3>
          <dl className="assumption-grid">
            <div>
              <dt>Review mode</dt>
              <dd>{fixture.reviewMetadata.source.reviewMode}</dd>
            </div>
            <div>
              <dt>Sample source</dt>
              <dd>Reviewed offline sample, no live data</dd>
            </div>
            <div>
              <dt>Confidence note</dt>
              <dd>{fixture.reviewMetadata.uncertainty}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="card safety-callout">
        <p className="eyebrow">Safety and limitations before export</p>
        <ul>
          {fixture.safetyLabels.map((label) => <li key={label}>{label}</li>)}
        </ul>
      </div>
    </div>
  );
}

function MetricCard({ card }: { card: FixtureCard }) {
  return (
    <article className="card metric-card">
      <p className="eyebrow">{card.title}</p>
      <h3>{card.value}</h3>
      <p>{card.detail}</p>
    </article>
  );
}

function InsightList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="card">
      <p className="eyebrow">Review signal</p>
      <h3>{title}</h3>
      <ul className="insight-list">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

function validateForm(form: LaunchForm): string[] {
  const errors: string[] = [];
  if (!form.brand.trim()) {
    errors.push('Brand/Product is required.');
  }
  if (!form.campaignMessage.trim()) {
    errors.push('Campaign Message is required.');
  }
  if (form.platforms.length === 0) {
    errors.push('Select at least one platform.');
  }
  return errors;
}
