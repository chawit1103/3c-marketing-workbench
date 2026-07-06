import { useMemo, useState } from 'react';
import { ObjectiveCard } from './components/product/ObjectiveCard';
import abExperimentFixture from './product/fixtures/abExperimentResult.json';
import campaignMessageFixture from './product/fixtures/campaignMessageTestResult.json';
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

type WorkflowKey = 'productLaunch' | 'campaignMessageTest' | 'abExperiment';

type LaunchForm = {
  brand: string;
  campaignMessage: string;
  variantA: string;
  variantB: string;
  offer: string;
  keyMessage: string;
  tone: string;
  claim: string;
  context: string;
  audiences: string[];
  platforms: string[];
};

type FixtureCard = {
  title: string;
  value: string;
  detail: string;
};

type ComparisonFixtureCard = FixtureCard;

type ReferenceFixture = typeof productLaunchFixture | typeof campaignMessageFixture | typeof abExperimentFixture;

type WorkflowConfig = {
  key: WorkflowKey;
  objective: string;
  modeLabel: string;
  heading: string;
  shortDescription: string;
  formLabel: string;
  objectiveDescription: string;
  defaultForm: LaunchForm;
  fixture: ReferenceFixture;
  workflowSteps: string[];
};

const productLaunchDefaultForm: LaunchForm = {
  brand: productLaunchFixture.sampleInput.brand,
  campaignMessage: productLaunchFixture.sampleInput.campaign_message,
  variantA: '',
  variantB: '',
  offer: productLaunchFixture.sampleInput.offer,
  keyMessage: productLaunchFixture.sampleInput.key_message,
  tone: 'Helpful and practical',
  claim: 'Launch offer and convenience benefits require review before external use.',
  context: productLaunchFixture.sampleInput.context,
  audiences: productLaunchFixture.sampleInput.audiences,
  platforms: productLaunchFixture.sampleInput.platforms,
};

const campaignMessageDefaultForm: LaunchForm = {
  brand: campaignMessageFixture.sampleInput.brand,
  campaignMessage: campaignMessageFixture.sampleInput.campaign_message,
  variantA: '',
  variantB: '',
  offer: '',
  keyMessage: campaignMessageFixture.sampleInput.key_message,
  tone: campaignMessageFixture.sampleInput.tone,
  claim: campaignMessageFixture.sampleInput.claim,
  context: campaignMessageFixture.sampleInput.context,
  audiences: campaignMessageFixture.sampleInput.audiences,
  platforms: campaignMessageFixture.sampleInput.platforms,
};

const abExperimentDefaultForm: LaunchForm = {
  brand: abExperimentFixture.sampleInput.brand,
  campaignMessage: abExperimentFixture.sampleInput.campaign_message,
  variantA: abExperimentFixture.sampleInput.variant_a,
  variantB: abExperimentFixture.sampleInput.variant_b,
  offer: '',
  keyMessage: abExperimentFixture.sampleInput.key_message,
  tone: abExperimentFixture.sampleInput.tone,
  claim: abExperimentFixture.sampleInput.claim,
  context: abExperimentFixture.sampleInput.context,
  audiences: abExperimentFixture.sampleInput.audiences,
  platforms: abExperimentFixture.sampleInput.platforms,
};

const workflowConfigs: Record<WorkflowKey, WorkflowConfig> = {
  productLaunch: {
    key: 'productLaunch',
    objective: 'Product Launch',
    modeLabel: 'Product Launch mode',
    heading: 'Product Launch Simulation',
    shortDescription:
      'Complete a reviewed offline Product Launch sample in under a minute. Your entries are review assumptions; the result comes from the generated product sample.',
    formLabel: 'Product Launch setup',
    objectiveDescription: 'Review launch message, offer, audience, and channel assumptions.',
    defaultForm: productLaunchDefaultForm,
    fixture: productLaunchFixture,
    workflowSteps: ['Campaign Details', 'Audience', 'Platform Mix', 'Review', 'Run', 'Dashboard', 'Executive Summary', 'Export Review', 'Recommended Next Action'],
  },
  campaignMessageTest: {
    key: 'campaignMessageTest',
    objective: 'Campaign Message Test',
    modeLabel: 'Campaign Message Test mode',
    heading: 'Campaign Message Test',
    shortDescription:
      'Review a campaign message, audience, and platform mix with the same offline result, dashboard, and export-review pattern used by Product Launch.',
    formLabel: 'Campaign Message Test setup',
    objectiveDescription: 'Review campaign message clarity, tone, claim, audience, and platform assumptions.',
    defaultForm: campaignMessageDefaultForm,
    fixture: campaignMessageFixture,
    workflowSteps: ['Campaign Details', 'Audience', 'Platform Mix', 'Review', 'Run', 'Dashboard', 'Executive Summary', 'Export Review', 'Recommended Next Action'],
  },
  abExperiment: {
    key: 'abExperiment',
    objective: 'A/B Experiment',
    modeLabel: 'A/B Experiment mode',
    heading: 'A/B Experiment',
    shortDescription:
      'Compare Variant A and Variant B with the approved Experiment Framework while reusing the same offline workbench pattern, dashboard, and export review.',
    formLabel: 'A/B Experiment setup',
    objectiveDescription: 'Review two campaign message variants with shared audience, platform, and safety assumptions.',
    defaultForm: abExperimentDefaultForm,
    fixture: abExperimentFixture,
    workflowSteps: ['Variant A', 'Variant B', 'Review', 'Run', 'Comparison Dashboard', 'Executive Summary', 'Export Review', 'Recommended Next Action'],
  },
};

export function HomeView() {
  return (
    <section className="view-stack" aria-labelledby="home-title">
      <div className="hero card card-accent">
        <p className="eyebrow">Marketing Decision Workbench</p>
        <h1 id="home-title">Compare campaign decisions safely before budget reviews.</h1>
        <p>
          Start from reviewed sample assumptions, keep outputs aggregate, and use plain executive
          language for human review.
        </p>
        <div className="button-row">
          <a className="button button-primary" href="/workbench">Open guided workbench</a>
          <a className="button button-secondary" href="/workbench/campaign-message-test">Open Campaign Message Test</a>
          <a className="button button-secondary" href="/workbench/ab-experiment">Open A/B Experiment</a>
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
          title="Campaign Message Test workflow"
          description="A second reference workflow reuses the same guided pattern, dashboard cards, export review, and safety labels."
          status="ready"
        />
        <ObjectiveCard
          title="A/B Experiment workflow"
          description="A third reference workflow reuses Experiment Framework, guided inputs, comparison dashboard, export review, and safety labels."
          status="ready"
        />
      </div>
    </section>
  );
}

export function WorkbenchView({ workflow = 'productLaunch' }: { workflow?: WorkflowKey }) {
  const config = workflowConfigs[workflow];
  const [form, setForm] = useState<LaunchForm>(config.defaultForm);
  const [hasRun, setHasRun] = useState(false);
  const [submittedForm, setSubmittedForm] = useState<LaunchForm>(config.defaultForm);
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
    const nextErrors = validateForm(form, config.key);
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
    : 'Defaults are prefilled. Run now, or edit the visible inputs first.';
  const alternateWorkflow = config.key === 'abExperiment' ? workflowConfigs.productLaunch : workflowConfigs.abExperiment;
  const alternateWorkflowHref = config.key === 'abExperiment' ? '/workbench' : '/workbench/ab-experiment';

  return (
    <section className="view-stack" aria-labelledby="workbench-title">
      <div className="card card-accent quick-start">
        <div>
          <p className="eyebrow">Marketing Decision Workbench</p>
          <h1 id="workbench-title">{config.heading}</h1>
          <p>{config.shortDescription}</p>
          <section className="mode-chip" aria-label="Current workflow">
            <span className="badge badge-ready">Current workflow</span>
            <strong>{config.modeLabel}</strong>
            <span>Reusable guided workflow pattern with offline review results.</span>
          </section>
          <div className="button-row" aria-label="Switch workflow">
            <a className="button button-secondary" href={alternateWorkflowHref}>
              Switch to {alternateWorkflow.objective}
            </a>
          </div>
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

      <section className="card" aria-label="Reference workflow steps">
        <p className="eyebrow">Reference workflow</p>
        <ol className="step-list workflow-step-list">
          {config.workflowSteps.map((step, index) => (
            <li className="step-card" key={step}>
              <span className="step-number">{index + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid two-col align-start">
        <form className="card form-stack" aria-label={config.formLabel} onSubmit={(event) => event.preventDefault()}>
          <fieldset>
            <legend>1. Campaign Details</legend>
            <div className="objective-static" aria-label={`Objective: ${config.objective}`}>
              <span className="badge badge-ready">{config.modeLabel}</span>
              <strong>{config.objectiveDescription}</strong>
              <p className="help-text">This uses a reviewed offline sample so you can reach results quickly.</p>
            </div>
          </fieldset>

          <fieldset>
            <legend>2. Inputs you can edit</legend>
            <label htmlFor="brand">Campaign name or brand</label>
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
            {config.key === 'abExperiment' ? (
              <>
                <label htmlFor="variant-a">Variant A</label>
                <textarea id="variant-a" value={form.variantA} onChange={(event) => updateField('variantA', event.target.value)} rows={3} />
                <label htmlFor="variant-b">Variant B</label>
                <textarea id="variant-b" value={form.variantB} onChange={(event) => updateField('variantB', event.target.value)} rows={3} />
              </>
            ) : null}
            {config.key === 'productLaunch' ? (
              <>
                <label htmlFor="offer">Offer/Promotion</label>
                <input id="offer" value={form.offer} onChange={(event) => updateField('offer', event.target.value)} />
              </>
            ) : null}
            <label htmlFor="key-message">Key Message</label>
            <input
              id="key-message"
              value={form.keyMessage}
              onChange={(event) => updateField('keyMessage', event.target.value)}
            />
            {config.key === 'campaignMessageTest' || config.key === 'abExperiment' ? (
              <>
                <label htmlFor="tone">Tone</label>
                <input id="tone" value={form.tone} onChange={(event) => updateField('tone', event.target.value)} />
                <label htmlFor="claim">Claim to review</label>
                <input id="claim" value={form.claim} onChange={(event) => updateField('claim', event.target.value)} />
              </>
            ) : null}
            <label htmlFor="context">Context notes</label>
            <textarea
              id="context"
              value={form.context}
              onChange={(event) => updateField('context', event.target.value)}
              rows={3}
            />
          </fieldset>

          <fieldset>
            <legend>3. Audience</legend>
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
            <legend>4. Platform Mix</legend>
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
          <p className="eyebrow">Review</p>
          <h2>What will appear in review</h2>
          <dl>
            <dt>Objective</dt>
            <dd>{config.objective}</dd>
            <dt>Campaign name or brand</dt>
            <dd>{form.brand || 'Required'}</dd>
            {config.key === 'abExperiment' ? (
              <>
                <dt>Variant A</dt>
                <dd>{form.variantA || 'Required'}</dd>
                <dt>Variant B</dt>
                <dd>{form.variantB || 'Required'}</dd>
              </>
            ) : null}
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

      {hasRun ? <ReferenceResults form={submittedForm} config={config} fixture={config.fixture} showActions /> : null}
    </section>
  );
}

export function RunDashboardView({ runId }: { runId?: string }) {
  const config = configForRunId(runId);
  return (
    <section className="view-stack" aria-labelledby="dashboard-title">
      <div className="card card-accent">
        <p className="eyebrow">Run {runId ?? config.fixture.runId}</p>
        <h1 id="dashboard-title">{config.objective} Results</h1>
        <p>Marketing-friendly decision dashboard for a reviewed offline campaign workflow.</p>
      </div>
      <ReferenceResults form={config.defaultForm} config={config} fixture={config.fixture} />
    </section>
  );
}

export function ExportReviewView({ runId }: { runId?: string }) {
  const config = configForRunId(runId);
  return (
    <section className="view-stack" aria-labelledby="export-title">
      <div className="card card-accent">
        <p className="eyebrow">Run {runId ?? config.fixture.runId}</p>
        <h1 id="export-title">Export Readiness Preview</h1>
        <p>Preview format readiness and review notes only. No downloadable file is generated here.</p>
      </div>
      <ExportReview fixture={config.fixture} objective={config.objective} />
    </section>
  );
}

export function HealthView() {
  return (
    <section className="view-stack" aria-labelledby="health-title">
      <div className="card">
        <p className="eyebrow">Product health</p>
        <h1 id="health-title">M7 A/B Experiment workflow readiness</h1>
        <p>Product Launch, Campaign Message Test, and A/B Experiment provide tested offline workflows, generated sample results, dashboard reuse, and export review.</p>
      </div>
      <div className="grid three-col">
        <ObjectiveCard title="Routes" description="Workbench, Campaign Message Test, A/B Experiment, results, export review, and health routes resolve without primary navigation changes." status="ready" />
        <ObjectiveCard title="Component reuse" description="A/B Experiment reuses the approved workflow pattern, cards, export review, and safety labels with minimal comparison cards." status="ready" />
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
        <h1 id="not-found-title">This page is not part of the guided campaign review.</h1>
        <p>Use the main navigation to return to a documented workbench route.</p>
      </div>
    </section>
  );
}

function ReferenceResults({
  form,
  fixture,
  config,
  showActions = false,
}: {
  form: LaunchForm;
  fixture: ReferenceFixture;
  config: WorkflowConfig;
  showActions?: boolean;
}) {
  const assumptionRows = useMemo(
    () => [
      ['Campaign name or brand', form.brand],
      ['Campaign Message', form.campaignMessage],
      ...(form.variantA ? [['Variant A', form.variantA]] : []),
      ...(form.variantB ? [['Variant B', form.variantB]] : []),
      ...(form.offer ? [['Offer/Promotion', form.offer]] : []),
      ['Key Message', form.keyMessage],
      ...(form.tone ? [['Tone', form.tone]] : []),
      ...(form.claim ? [['Claim to review', form.claim]] : []),
      ['Audience', form.audiences.join(', ') || 'General Consumers'],
      ['Platform mix', form.platforms.join(', ')],
      ['Context', form.context || 'No additional context'],
    ],
    [form],
  );

  const comparisonMethod = 'comparisonMethod' in fixture ? fixture.comparisonMethod : undefined;

  return (
    <section className="view-stack" aria-labelledby="results-title">
      <div className="card result-hero">
        <p className="eyebrow">Dashboard</p>
        <h2 id="results-title">{fixture.summary.headline}</h2>
        <p>{fixture.summary.text}</p>
        <section className="next-action-card" aria-label="Recommended next action">
          <p className="eyebrow">Recommended next action</p>
          <strong>Use this as a human review prompt, then approve a small evidence-gathering test.</strong>
          <p>{fixture.recommendedNextTest}</p>
        </section>
        <p className="help-text">Safety: offline fixture for planning only; review before using externally.</p>
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

      {'comparisonCards' in fixture ? (
        <section className="card" aria-label="Variant comparison">
          <p className="eyebrow">A/B comparison</p>
          <h3>Variant decision frame</h3>
          {comparisonMethod ? (
            <div>
              <p>
                {comparisonMethod.decisionStatus}: {comparisonMethod.rationale} Confidence: {comparisonMethod.confidenceLevel}.
              </p>
              <p className="help-text">Parity check: {comparisonMethod.parityCheck}</p>
              <div className="grid two-col align-start">
                <InsightList title="Shared Criteria" items={comparisonMethod.sharedCriteria} />
                <InsightList title="Blocked Actions" items={comparisonMethod.blockedActions} />
              </div>
            </div>
          ) : null}
          <div className="grid three-col">
            {fixture.comparisonCards.map((card: ComparisonFixtureCard) => (
              <MetricCard key={card.title} card={card} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="grid three-col">
        {fixture.cards.map((card: FixtureCard) => (
          <MetricCard key={card.title} card={card} />
        ))}
      </div>

      <div className="grid two-col align-start">
        <InsightList title="Platform Breakdown" items={fixture.platformBreakdown.map((item) => `${item.platform}: ${item.signal}. ${item.detail}`)} />
        <InsightList title="Audience Insights" items={fixture.audienceInsights} />
        <InsightList title="Risks / Caveats" items={fixture.risksCaveats.slice(0, 4)} />
        <div className="card">
          <p className="eyebrow">Executive Summary</p>
          <h3>{config.objective} executive summary</h3>
          <p>{fixture.exports.executiveSummaryPreview}</p>
        </div>
      </div>
    </section>
  );
}

function ExportReview({ fixture, objective }: { fixture: ReferenceFixture; objective: string }) {
  const formatLabels: Record<string, string> = {
    JSON: 'Data preview (JSON)',
    Markdown: 'Briefing preview (Markdown)',
    'Executive Summary': 'Executive summary preview',
  };

  return (
    <div className="view-stack">
      <div className="card">
        <p className="eyebrow">Export review</p>
        <h2>{fixture.exports.readiness}</h2>
        <p>{fixture.exports.status} This screen confirms JSON, Markdown, and Executive Summary preview readiness; it is not a download action.</p>
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
        <h2>{objective} executive-ready summary</h2>
        <p>{fixture.exports.executiveSummaryPreview}</p>
      </div>
      <div className="grid two-col align-start">
        <InsightList title="Review Assumptions" items={fixture.reviewMetadata.assumptions} />
        <InsightList title="Evidence Gaps" items={fixture.reviewMetadata.evidenceGaps.slice(0, 3)} />
        <InsightList title="Limitations" items={fixture.reviewMetadata.limitations.slice(0, 3)} />
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

function validateForm(form: LaunchForm, workflow: WorkflowKey): string[] {
  const errors: string[] = [];
  if (!form.brand.trim()) {
    errors.push('Campaign name or brand is required.');
  }
  if (!form.campaignMessage.trim()) {
    errors.push('Campaign Message is required.');
  }
  if (workflow === 'abExperiment' && (!form.variantA.trim() || !form.variantB.trim())) {
    errors.push('Both A/B variants are required.');
  }
  if (workflow !== 'abExperiment' && (form.variantA || form.variantB) && (!form.variantA.trim() || !form.variantB.trim())) {
    errors.push('Both A/B variants are required.');
  }
  if (form.platforms.length === 0) {
    errors.push('Select at least one platform.');
  }
  return errors;
}

function configForRunId(runId?: string): WorkflowConfig {
  if (runId === campaignMessageFixture.runId || runId?.includes('campaign-message')) {
    return workflowConfigs.campaignMessageTest;
  }
  if (runId === abExperimentFixture.runId || runId?.includes('ab-experiment')) {
    return workflowConfigs.abExperiment;
  }
  return workflowConfigs.productLaunch;
}
