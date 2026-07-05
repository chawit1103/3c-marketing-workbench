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
        <p className="eyebrow">Guided launch review</p>
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

  return (
    <section className="view-stack" aria-labelledby="workbench-title">
      <div className="card card-accent">
        <p className="eyebrow">Guided Product Launch workflow</p>
        <h1 id="workbench-title">Product Launch Simulation</h1>
        <p>
          Complete a reviewed offline sample in minutes. Your entries are shown as assumptions for
          the review screen; the result itself comes from the generated product sample.
        </p>
      </div>

      <div className="grid two-col align-start">
        <form className="card form-stack" aria-label="Product Launch setup" onSubmit={(event) => event.preventDefault()}>
          <fieldset>
            <legend>1. Objective</legend>
            <label htmlFor="objective">Objective</label>
            <select id="objective" value="Product Launch" disabled aria-label="Objective">
              <option>Product Launch</option>
            </select>
            <p className="help-text">Focused on Product Launch so a non-technical user can finish the review quickly.</p>
          </fieldset>

          <fieldset>
            <legend>2. Product and message details</legend>
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
            <label htmlFor="context">Optional context</label>
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
        <p>Marketing-friendly sample dashboard for a reviewed offline product-launch simulation.</p>
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
        <h1 id="export-title">Export Review</h1>
        <p>Review available formats, readiness, summary preview, and safety notes before sharing.</p>
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
        <p className="eyebrow">Marketing result</p>
        <h2 id="results-title">{fixture.summary.headline}</h2>
        <p>{fixture.summary.text}</p>
        <p className="help-text">Synthetic/aggregate/offline result only. Not predictive, not a conversion guarantee, and not production campaign evidence.</p>
        {showActions ? (
          <div className="button-row">
            <a className="button button-secondary" href={`/runs/${fixture.runId}`}>Open result dashboard</a>
            <a className="button button-secondary" href={`/exports/${fixture.runId}`}>Open export review</a>
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
          <p className="eyebrow">Recommended Next Test</p>
          <h3>Next reviewed experiment</h3>
          <p>{fixture.recommendedNextTest}</p>
        </div>
      </div>
    </section>
  );
}

function ExportReview({ fixture }: { fixture: ProductLaunchFixture }) {
  return (
    <div className="view-stack">
      <div className="card">
        <p className="eyebrow">Export status</p>
        <h2>{fixture.exports.readiness}</h2>
        <p>{fixture.exports.status}</p>
      </div>
      <div className="grid three-col">
        {fixture.exports.formats.map((format) => (
          <div className="card" key={format.label}>
            <p className="eyebrow">{format.label}</p>
            <h3>{format.status}</h3>
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
              <dd>{fixture.reviewMetadata.source.sourceLabel}</dd>
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
