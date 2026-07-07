import { type ReactNode, useMemo, useState } from 'react';
import { ObjectiveCard } from './components/product/ObjectiveCard';
import { translate } from './i18n/localize';
import type { Language } from './i18n/translations';
import { useI18n } from './i18n/useI18n';
import abExperimentFixture from './product/fixtures/abExperimentResult.json';
import campaignMessageFixture from './product/fixtures/campaignMessageTestResult.json';
import creativeComparisonFixture from './product/fixtures/creativeComparisonResult.json';
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

type WorkflowKey = 'productLaunch' | 'campaignMessageTest' | 'abExperiment' | 'creativeComparison';

type LaunchForm = {
  brand: string;
  campaignMessage: string;
  variantA: string;
  variantB: string;
  creativeATitle: string;
  creativeADescription: string;
  creativeBTitle: string;
  creativeBDescription: string;
  offer: string;
  keyMessage: string;
  tone: string;
  claim: string;
  context: string;
  audiences: string[];
  platforms: string[];
};

type LocalizedFormField = Exclude<keyof LaunchForm, 'audiences' | 'platforms'>;

const localizedFormFields: LocalizedFormField[] = [
  'brand',
  'campaignMessage',
  'variantA',
  'variantB',
  'creativeATitle',
  'creativeADescription',
  'creativeBTitle',
  'creativeBDescription',
  'offer',
  'keyMessage',
  'tone',
  'claim',
  'context',
];

function localizeDefaultForm(defaultForm: LaunchForm, language: Language): LaunchForm {
  const localizedForm: LaunchForm = {
    ...defaultForm,
    audiences: [...defaultForm.audiences],
    platforms: [...defaultForm.platforms],
  };

  for (const field of localizedFormFields) {
    localizedForm[field] = translate(defaultForm[field], language);
  }

  return localizedForm;
}

type FixtureCard = {
  title: string;
  value: string;
  detail: string;
};

type ComparisonFixtureCard = FixtureCard;

type ReferenceFixture = typeof productLaunchFixture | typeof campaignMessageFixture | typeof abExperimentFixture | typeof creativeComparisonFixture;

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
  creativeATitle: '',
  creativeADescription: '',
  creativeBTitle: '',
  creativeBDescription: '',
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
  creativeATitle: '',
  creativeADescription: '',
  creativeBTitle: '',
  creativeBDescription: '',
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
  creativeATitle: '',
  creativeADescription: '',
  creativeBTitle: '',
  creativeBDescription: '',
  offer: '',
  keyMessage: abExperimentFixture.sampleInput.key_message,
  tone: abExperimentFixture.sampleInput.tone,
  claim: abExperimentFixture.sampleInput.claim,
  context: abExperimentFixture.sampleInput.context,
  audiences: abExperimentFixture.sampleInput.audiences,
  platforms: abExperimentFixture.sampleInput.platforms,
};

const creativeComparisonDefaultForm: LaunchForm = {
  brand: creativeComparisonFixture.sampleInput.brand,
  campaignMessage: creativeComparisonFixture.sampleInput.campaign_message,
  variantA: '',
  variantB: '',
  creativeATitle: creativeComparisonFixture.sampleInput.creative_a_title,
  creativeADescription: creativeComparisonFixture.sampleInput.creative_a_description,
  creativeBTitle: creativeComparisonFixture.sampleInput.creative_b_title,
  creativeBDescription: creativeComparisonFixture.sampleInput.creative_b_description,
  offer: '',
  keyMessage: creativeComparisonFixture.sampleInput.key_message,
  tone: creativeComparisonFixture.sampleInput.tone,
  claim: creativeComparisonFixture.sampleInput.claim,
  context: creativeComparisonFixture.sampleInput.context,
  audiences: creativeComparisonFixture.sampleInput.audiences,
  platforms: creativeComparisonFixture.sampleInput.platforms,
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
      'Compare Variant A and Variant B with the approved comparison framework while reusing the same offline workbench pattern, dashboard, and export review.',
    formLabel: 'A/B Experiment setup',
    objectiveDescription: 'Review two campaign message variants with shared audience, platform, and safety assumptions.',
    defaultForm: abExperimentDefaultForm,
    fixture: abExperimentFixture,
    workflowSteps: ['Variant A', 'Variant B', 'Review', 'Run', 'Comparison Dashboard', 'Executive Summary', 'Export Review', 'Recommended Next Action'],
  },
  creativeComparison: {
    key: 'creativeComparison',
    objective: 'Creative Comparison',
    modeLabel: 'Creative Comparison mode',
    heading: 'Creative Comparison',
    shortDescription:
      'Compare two text-only creative concepts with the approved workflow, dashboard, export review, and safety boundaries. No image generation or uploads are used.',
    formLabel: 'Creative Comparison setup',
    objectiveDescription: 'Review two text-only creative concepts with shared audience, platform, and safety assumptions.',
    defaultForm: creativeComparisonDefaultForm,
    fixture: creativeComparisonFixture,
    workflowSteps: ['Creative A', 'Creative B', 'Review', 'Run', 'Creative Comparison Dashboard', 'Executive Summary', 'Export Review', 'Recommended Next Action'],
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
          <a className="button button-primary" href="/campaign-workspace">Open Campaign Workspace</a>
          <a className="button button-primary" href="/workbench">Open guided workbench</a>
          <a className="button button-secondary" href="/workbench/campaign-message-test">Open Campaign Message Test</a>
          <a className="button button-secondary" href="/workbench/ab-experiment">Open A/B Experiment</a>
          <a className="button button-secondary" href="/workbench/creative-comparison">Open Creative Comparison</a>
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
          description="A third reference workflow reuses the comparison framework, guided inputs, dashboard, export review, and safety labels."
          status="ready"
        />
        <ObjectiveCard
          title="Creative Comparison workflow"
          description="A fourth usable workflow compares text-only creative concepts with the same guided pattern, dashboard, export review, and safety labels."
          status="ready"
        />
      </div>
    </section>
  );
}

const campaignWorkspaceRuns = [
  { config: workflowConfigs.productLaunch, href: `/runs/${productLaunchFixture.runId}`, stage: 'Campaign Definition' },
  { config: workflowConfigs.campaignMessageTest, href: `/runs/${campaignMessageFixture.runId}`, stage: 'Campaign Message Test' },
  { config: workflowConfigs.abExperiment, href: `/runs/${abExperimentFixture.runId}`, stage: 'A/B Experiment' },
  { config: workflowConfigs.creativeComparison, href: `/runs/${creativeComparisonFixture.runId}`, stage: 'Creative Comparison' },
];

const campaignJourneyStages = [
  {
    stage: 'Campaign Definition',
    status: 'Completed',
    detail: 'Product-launch assumptions and executive summary are ready for review.',
  },
  {
    stage: 'Campaign Message Test',
    status: 'Completed',
    detail: 'Message-readiness evidence is available from the approved fixture.',
  },
  {
    stage: 'A/B Experiment',
    status: 'Completed',
    detail: 'A/B decision frame is ready, with no production winner selected.',
  },
  {
    stage: 'Creative Comparison',
    status: 'Completed',
    detail: 'Text-only creative comparison evidence is ready, with no production winner selected.',
  },
  {
    stage: 'Executive Decision',
    status: 'Current',
    detail: 'Review confidence, risks, gaps, and blocked actions before handoff.',
  },
  {
    stage: 'Export/Handoff',
    status: 'Next',
    detail: `Handoff readiness: ${creativeComparisonFixture.exports.readiness}.`,
  },
];

const campaignEvidenceGaps = [
  creativeComparisonFixture.reviewMetadata.assumptions.find((item) => item.includes('Creative Comparison MVP is text-only')),
  ...creativeComparisonFixture.reviewMetadata.evidenceGaps,
].filter((item): item is string => Boolean(item));

const campaignLimitationsRisks = Array.from(new Set([
  ...creativeComparisonFixture.reviewMetadata.limitations.slice(0, 2),
  ...creativeComparisonFixture.risksCaveats.slice(0, 2),
]));

const executiveFixtures = [
  productLaunchFixture,
  campaignMessageFixture,
  abExperimentFixture,
  creativeComparisonFixture,
];

function clampScore(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

function scoreFromDelta(delta: number) {
  return clampScore(50 + delta * 100);
}

function average(values: number[]) {
  return values.length === 0 ? 0 : values.reduce((sum, value) => sum + value, 0) / values.length;
}

function findCard(fixture: ReferenceFixture, title: string) {
  return fixture.cards.find((card) => card.title === title);
}

const totalWorkflowCount = campaignWorkspaceRuns.length;
const completedWorkflowCount = campaignJourneyStages.filter((stage) => stage.status === 'Completed').length;
const completedWorkflowCoverageScore = clampScore((completedWorkflowCount / totalWorkflowCount) * 100);
const readyExportCount = executiveFixtures.filter((fixture) => fixture.exports.readiness === 'Ready for human review').length;
const liveDataExcluded = executiveFixtures.every((fixture) => !fixture.sourceChecks.liveApiAccess && fixture.sourceChecks.productionReady === false);
const averageSentimentScore = average(executiveFixtures.map((fixture) => scoreFromDelta(fixture.summary.sentimentDelta)));
const averageTrustScore = average(executiveFixtures.map((fixture) => scoreFromDelta(fixture.summary.trustDelta)));
const averageReachScore = average(executiveFixtures.map((fixture) => scoreFromDelta(fixture.summary.diffusionReach)));
const overallCampaignScore = clampScore(average([
  averageSentimentScore,
  averageTrustScore,
  averageReachScore,
  completedWorkflowCoverageScore,
]));
const averageRiskScore = clampScore(average(executiveFixtures.map((fixture) => fixture.summary.riskScore * 100)));
const lowConfidenceScore = creativeComparisonFixture.comparisonMethod.confidenceLevel.toLowerCase().includes('low') ? 40 : 60;
const reviewReadinessScore = clampScore((readyExportCount / executiveFixtures.length) * 100);
const journeyReadyStages = campaignJourneyStages.filter((stage) => stage.status === 'Completed' || stage.status === 'Current').length;
const journeyProgressScore = clampScore((journeyReadyStages / campaignJourneyStages.length) * 100);
const lowConfidenceDowngradeRationale = 'Low confidence / E1 downgrade rationale: non-measured directional KPI from synthetic/offline fixture, not observed market behavior.';

const executiveKpis = [
  {
    title: 'Overall Campaign Score',
    value: `${overallCampaignScore} / 100`,
    detail: 'Directional campaign health from reviewed response, trust, reach, and workflow coverage signals.',
    metadata: [
      'Formula: average sentiment/trust/reach scores plus completed workflow coverage.',
      'Source: summary fixture scores + completed workflow coverage.',
      'Evidence: E1 synthetic/offline fixture; not live social data or production prediction.',
      'Confidence: Low directional; downgraded because evidence is synthetic/offline and not comparable measured field data.',
    ],
  },
  {
    title: 'Message Acceptance',
    value: findCard(productLaunchFixture, 'Message Acceptance')?.value ?? 'Review required',
    detail: 'Message is clear enough for internal executive review.',
    metadata: [
      'Source: Product Launch fixture card “Message Acceptance”.',
      'Evidence: E1 synthetic/offline fixture; human review required before external use.',
    ],
  },
  {
    title: 'Brand Perception',
    value: findCard(productLaunchFixture, 'Brand Perception')?.value ?? 'Review required',
    detail: 'Light positive brand signal; proof points still need human review.',
    metadata: [
      'Source: Product Launch fixture card “Brand Perception”.',
      'Evidence: E1 synthetic/offline fixture; offline directional signal only; quality, delivery, and proof remain review evidence needs.',
      lowConfidenceDowngradeRationale,
    ],
  },
  {
    title: 'Audience Engagement',
    value: findCard(productLaunchFixture, 'Engagement Potential')?.value ?? 'Review required',
    detail: 'Strong directional planning cue for the reviewed audience mix.',
    metadata: [
      'Source: Product Launch fixture card “Engagement Potential”.',
      'Evidence: E1 synthetic/offline fixture; synthetic planning cue, not measured audience engagement or live social activity.',
      lowConfidenceDowngradeRationale,
    ],
  },
  {
    title: 'Synthetic Purchase Intent',
    value: findCard(productLaunchFixture, 'Synthetic Purchase Intent')?.value ?? 'Directional only',
    detail: 'Directional purchase-interest input; do not treat as forecast.',
    metadata: [
      'Source: Product Launch fixture card “Synthetic Purchase Intent”.',
      'Evidence: E1 synthetic/offline fixture; directional planning input only; not a sales forecast or conversion guarantee.',
      lowConfidenceDowngradeRationale,
    ],
  },
  {
    title: 'Evidence Coverage',
    value: `${completedWorkflowCount} / ${totalWorkflowCount} workflows`,
    detail: 'Completed approved offline workflow fixtures represented in the executive view.',
    metadata: [
      'Formula: completedWorkflowCount / totalWorkflowCount from completed campaign journey stages and approved workflow fixtures.',
      'Source: productLaunchFixture.sourceChecks, campaignMessageFixture.sourceChecks, abExperimentFixture.sourceChecks, and creativeComparisonFixture.sourceChecks confirm completed fixture coverage.',
      'Evidence: E1 synthetic/offline fixture; no live APIs, CRM, private, or platform data.',
    ],
  },
  {
    title: 'Review Readiness',
    value: `${readyExportCount} / ${executiveFixtures.length} exports ready`,
    detail: 'All export previews are ready for human handoff review.',
    metadata: [
      'Formula: fixtures whose exports.readiness equals “Ready for human review”.',
      'Source: productLaunchFixture.exports.readiness, campaignMessageFixture.exports.readiness, abExperimentFixture.exports.readiness, and creativeComparisonFixture.exports.readiness.',
      'Evidence: preview/handoff review only, not downloadable production export.',
    ],
  },
  {
    title: 'Confidence',
    value: creativeComparisonFixture.comparisonMethod.confidenceLevel,
    detail: 'Use as a caution signal until approved comparable field evidence exists.',
    metadata: [
      'Formula: Creative Comparison comparisonMethod.confidenceLevel maps Low directional confidence to 40/100 caution cue.',
      'Source: Creative Comparison comparisonMethod.confidenceLevel.',
      'Evidence: E1 synthetic/offline fixture; confidence stays low until comparable approved field evidence exists.',
      'Confidence: Low directional; downgraded because evidence is synthetic/offline and not comparable measured field data.',
    ],
  },
  {
    title: 'Risk Level',
    value: 'Low implementation risk; market risk unmeasured',
    detail: 'Review-controlled risk only: this dashboard excludes live data and production campaign systems.',
    metadata: [
      `Formula: average fixture riskScore = ${averageRiskScore}/100 across all four fixtures.`,
      'Source: fixture riskScore is not a production risk model.',
      'Evidence: E1 synthetic/offline fixture; market, compliance, and production performance risk are unmeasured.',
    ],
  },
  {
    title: 'Recommendation',
    value: 'Approve small reviewed evidence test',
    detail: creativeComparisonFixture.recommendedNextTest,
    metadata: [
      'Source: Creative Comparison recommendedNextTest.',
      'Evidence: E1 synthetic/offline fixture; Recommendation is unsupported for launch approval and is only a next evidence step.',
      'Confidence: Low directional; downgraded because evidence is synthetic/offline and not comparable measured field data.',
      'Limitation / next evidence step: run a small reviewed evidence test before any budget, launch, or winner decision.',
    ],
  },
];

const platformComparison = productLaunchFixture.platformBreakdown.map((item, index) => ({
  label: item.platform,
  value: clampScore(100 - index * 12),
  cue: 'Fixture-rank cue',
  detail: `Higher bar means earlier fixture rank, not measured engagement. ${item.detail}`,
}));

const audienceComparison = productLaunchFixture.sampleInput.audiences.map((audience, index) => ({
  label: audience,
  value: clampScore(100 - index * 12),
  cue: 'Fixture-rank cue',
  detail: `Higher bar means earlier fixture rank, not measured audience engagement. ${productLaunchFixture.audienceInsights[index] ?? 'Review audience assumptions before use.'}`,
}));

const confidenceRiskSignals = [
  {
    label: 'Confidence',
    value: lowConfidenceScore,
    cue: 'Caution signal',
    detail: `${creativeComparisonFixture.comparisonMethod.confidenceLevel} maps to ${lowConfidenceScore}/100. Confidence evidence tier: E1 synthetic/offline fixture; Low directional confidence.`,
  },
  {
    label: 'Readiness',
    value: reviewReadinessScore,
    cue: 'Readiness signal',
    detail: `${readyExportCount} / ${executiveFixtures.length} fixtures are ready for human review. Readiness evidence tier: E1 synthetic/offline fixture; review readiness only.`,
  },
  {
    label: 'Risk',
    value: averageRiskScore,
    cue: 'Risk signal',
    detail: `Fixture riskScore average only; live data excluded = ${liveDataExcluded ? 'yes' : 'no'}. Risk evidence tier: E1 synthetic/offline fixture; market risk remains unmeasured.`,
  },
];

const sentimentComparison = campaignWorkspaceRuns.map(({ config }) => ({
  label: config.objective,
  value: scoreFromDelta(config.fixture.summary.sentimentDelta),
  cue: findCard(config.fixture, 'Overall Reaction')?.value ?? config.fixture.summary.headline,
  detail: config.fixture.summary.text,
}));

const evidenceTierItems = [
  {
    label: 'E1 synthetic/offline fixture',
    status: 'Current tier',
    detail: 'All current visuals use generated offline fixtures, aggregate sample fields, and human-review copy only.',
  },
  {
    label: 'E2 reviewed field feedback or backtest',
    status: 'Next evidence step',
    detail: 'Needed before raising confidence above Low directional or supporting budget, launch, or winner decisions.',
  },
  {
    label: 'Unsupported evidence',
    status: 'Unavailable',
    detail: 'Unsupported: live social measurement, CRM/customer data, private data, and production prediction are unavailable in this dashboard.',
  },
];

const visualEvidenceLimitations = [
  ...campaignEvidenceGaps.slice(0, 3),
  'Not measured social platform engagement; not production prediction; not a conversion guarantee.',
];

const humanReviewChecklist = [
  'Have claims been reviewed against approved proof points?',
  'Are evidence gaps acceptable before the next small reviewed test?',
  'Has an executive accepted that this is synthetic/offline fixture evidence, not live social data?',
  'Is the next evidence step small, reviewed, and non-production before any launch or budget decision?',
];

const decisionBlockersBeforeAction = [
  `Evidence gap: ${campaignEvidenceGaps[0] ?? 'Evidence gap review is required before action.'}`,
  `Human review required: ${humanReviewChecklist[0]}`,
  `Blocked action: ${creativeComparisonFixture.comparisonMethod.blockedActions[0] ?? 'launch approval'}`,
];

export function CampaignWorkspaceView() {
  const campaignName = productLaunchFixture.sampleInput.brand;
  const campaignMessage = campaignMessageFixture.sampleInput.campaign_message;
  const recommendedAction = creativeComparisonFixture.recommendedNextTest;

  return (
    <section className="view-stack" aria-labelledby="campaign-workspace-title">
      <div className="card card-accent hero">
        <p className="eyebrow">Campaign Workspace</p>
        <h1 id="campaign-workspace-title">Campaign Workspace</h1>
        <p>
          Manage one campaign from definition through message testing, A/B evidence review,
          Creative Comparison, executive decision, and handoff using the existing offline workflow results.
        </p>
        <div className="button-row">
          <a className="button button-primary" href={`/exports/${creativeComparisonFixture.runId}`}>Open executive handoff review</a>
          <a className="button button-secondary" href={`/runs/${creativeComparisonFixture.runId}`}>Review creative evidence</a>
        </div>
      </div>

      <div className="grid two-col align-start">
        <section className="card" aria-label="Campaign Overview">
          <p className="eyebrow">Campaign Overview</p>
          <h2>{campaignName}</h2>
          <dl className="assumption-grid">
            <div>
              <dt>Campaign message</dt>
              <dd>{campaignMessage}</dd>
            </div>
            <div>
              <dt>Audience</dt>
              <dd>{campaignMessageFixture.sampleInput.audiences.join(', ')}</dd>
            </div>
            <div>
              <dt>Platform mix</dt>
              <dd>{campaignMessageFixture.sampleInput.platforms.join(', ')}</dd>
            </div>
          </dl>
          <p className="help-text">Offline fixture-based workspace; no persistence, live data, or new workflow execution.</p>
        </section>

        <section className="card next-action-card" aria-label="Current Journey Stage">
          <p className="eyebrow">Current Journey Stage</p>
          <h2>Executive Decision</h2>
          <p>Definition, message readiness, A/B comparison evidence, and Creative Comparison evidence are ready for human review.</p>
          <section aria-label="Recommended Next Action">
            <p className="eyebrow">Recommended Next Action</p>
            <strong>{recommendedAction}</strong>
          </section>
        </section>
      </div>

      <DecisionBlockersBeforeAction />

      <ExecutiveDashboard />

      <section className="card" aria-label="Campaign journey timeline">
        <p className="eyebrow">Journey timeline</p>
        <ol className="step-list workflow-step-list journey-timeline">
          {campaignJourneyStages.map(({ stage, status, detail }, index) => (
            <li className={`step-card journey-step journey-step-${status.toLowerCase()}`} key={stage}>
              <span className="step-number">{index + 1}</span>
              <div>
                <strong>{status}: {stage}</strong>
                <p>{detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid two-col align-start">
        <section className="card" aria-label="Recent Runs">
          <p className="eyebrow">Recent Runs</p>
          <div className="run-list">
            {campaignWorkspaceRuns.map(({ config, href, stage }) => (
              <article className="run-row" key={config.key}>
                <div>
                  <h3>{config.objective}</h3>
                  <p>{stage} · {config.fixture.exports.readiness}</p>
                </div>
                <a className="button button-secondary" href={href}>Open run</a>
              </article>
            ))}
          </div>
        </section>

        <section className="card" aria-label="Evidence Summary">
          <p className="eyebrow">Evidence Summary</p>
          <div className="evidence-stack">
            {campaignWorkspaceRuns.map(({ config }) => (
              <article className="evidence-item" key={config.key}>
                <h3>{config.fixture.summary.headline}</h3>
                <p>{config.fixture.exports.executiveSummaryPreview}</p>
                <p className="help-text">Handoff readiness: {config.fixture.exports.readiness}</p>
              </article>
            ))}
          </div>
          <div className="evidence-critical-grid">
            <section className="evidence-critical-card" aria-label="Decision evidence quality">
              <p className="eyebrow">Decision evidence quality</p>
              <h3>{creativeComparisonFixture.comparisonMethod.decisionStatus}</h3>
              <p>{creativeComparisonFixture.comparisonMethod.rationale}</p>
              <p><strong>Confidence:</strong> {creativeComparisonFixture.comparisonMethod.confidenceLevel}</p>
            </section>
            <InsightList title="Evidence gaps" items={campaignEvidenceGaps.slice(0, 4)} />
            <InsightList title="Limitations / risks" items={campaignLimitationsRisks} />
            <InsightList title="Blocked actions" items={creativeComparisonFixture.comparisonMethod.blockedActions} />
            <section className="evidence-critical-card" aria-label="Handoff readiness">
              <p className="eyebrow">Handoff readiness</p>
              <h3>{creativeComparisonFixture.exports.readiness}</h3>
              <p>{creativeComparisonFixture.exports.status}</p>
              <p className="help-text">Open executive handoff review before using this directional evidence externally.</p>
            </section>
          </div>
        </section>
      </div>

      <div className="grid two-col align-start">
        <section className="card" aria-label="Executive Summary">
          <p className="eyebrow">Executive Summary</p>
          <h2>Campaign status and next recommended action</h2>
          <p>
            {campaignName} has a reviewed campaign definition, a message-readiness signal, an
            A/B comparison frame, and Creative Comparison evidence. Treat the evidence as directional planning input only.
          </p>
          <p><strong>Recommended next action:</strong> {recommendedAction}</p>
          <p className="help-text">
            Recommendation basis: E1 synthetic/offline fixture, Low directional confidence; use only as a next evidence step before budget or launch decisions.
          </p>
        </section>

        <section className="card" aria-label="Available Workflow Actions">
          <p className="eyebrow">Available Workflow Actions</p>
          <h2>Use existing workflows</h2>
          <div className="button-row stacked-actions">
            <a className="button button-secondary" href="/workbench">Open Product Launch</a>
            <a className="button button-secondary" href="/workbench/campaign-message-test">Open Campaign Message Test</a>
            <a className="button button-secondary" href="/workbench/ab-experiment">Open A/B Experiment</a>
            <a className="button button-secondary" href="/workbench/creative-comparison">Open Creative Comparison</a>
          </div>
          <p className="help-text">Only approved existing workflows are available in this reviewed prototype.</p>
        </section>
      </div>
    </section>
  );
}

function DecisionBlockersBeforeAction() {
  return (
    <section className="card decision-blockers-card" aria-label="Decision blockers before action">
      <p className="eyebrow">Decision blockers before action</p>
      <h2>Evidence gaps + human review required before action</h2>
      <p>
        Do not approve launch, budget, or winner decisions from these visuals until evidence gaps and human review are cleared.
      </p>
      <div className="decision-blocker-grid">
        <section className="evidence-critical-card" aria-label="Top evidence confidence blocker">
          <p className="eyebrow">Confidence gate</p>
          <h3>{creativeComparisonFixture.comparisonMethod.confidenceLevel}</h3>
          <p>{creativeComparisonFixture.comparisonMethod.rationale}</p>
        </section>
        <ul className="insight-list decision-blocker-list">
          {decisionBlockersBeforeAction.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </section>
  );
}

function ExecutiveDashboard() {
  return (
    <section className="card executive-dashboard" aria-label="Executive KPI dashboard">
      <p className="eyebrow">M17 Executive Dashboard</p>
      <h2>Executive KPI cards and decision visuals</h2>
      <p>
        Synthetic/offline fixture-backed dashboard for executive review only; not live social data,
        not production prediction, and not connected to campaign systems.
      </p>

      <div className="grid four-col executive-kpi-grid">
        {executiveKpis.map((card) => (
          <article className="executive-kpi-card" key={card.title}>
            <p className="eyebrow">{card.title}</p>
            <h3>{card.value}</h3>
            <p>{card.detail}</p>
            <div className="kpi-metadata" aria-label={`${card.title} source and evidence`}>
              {card.metadata.map((metadata) => (
                <p key={metadata}>{metadata}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="grid two-col align-start">
        <BarList title="Sentiment comparison" items={sentimentComparison} />
        <EvidenceTierVisualization />
        <BarList title="Platform comparison" items={platformComparison} />
        <BarList title="Audience comparison" items={audienceComparison} />
        <BarList title="Confidence / risk" items={confidenceRiskSignals} />
        <section className="executive-visual-card" aria-label="Journey progress">
          <p className="eyebrow">Journey progress</p>
          <h3>{journeyReadyStages} of {campaignJourneyStages.length} review stages ready</h3>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${journeyProgressScore}%` }} />
          </div>
          <ol className="mini-step-list">
            {campaignJourneyStages.map(({ stage, status }) => (
              <li key={stage}>
                <span className={`status-dot status-dot-${status.toLowerCase()}`} />
                <span>{status}: {stage}</span>
              </li>
            ))}
          </ol>
          <div className="kpi-metadata" aria-label="Journey progress formula and source">
            <p>Formula: ready stages = Completed or Current campaignJourneyStages / total stages. Source: existing campaignJourneyStages fixture-derived workspace state. Evidence tier: E1 synthetic/offline fixture; not production prediction.</p>
          </div>
        </section>
        <VisualEvidenceGaps />
        <HumanReviewChecklist />
      </div>
    </section>
  );
}

function EvidenceTierVisualization() {
  return (
    <section className="executive-visual-card" aria-label="Evidence tier visualization">
      <p className="eyebrow">Evidence tier visualization</p>
      <h3>Notice: current evidence is E1 only; E2 evidence is required before budget or launch decisions.</h3>
      <ol className="tier-list">
        {evidenceTierItems.map((item) => (
          <li key={item.label}>
            <strong>{item.status}: {item.label}</strong>
            <p>{item.detail}</p>
          </li>
        ))}
      </ol>
      <div className="kpi-metadata" aria-label="Evidence tier formula and source">
        <p>Formula: evidence tier is E1 when sourceChecks confirm offlineExecution=true, liveApiAccess=false, credentialsRequired=false, and productionReady=false across all fixtures.</p>
        <p>Source: productLaunchFixture.sourceChecks, campaignMessageFixture.sourceChecks, abExperimentFixture.sourceChecks, and creativeComparisonFixture.sourceChecks.</p>
        <p>Evidence tier: E1 synthetic/offline fixture; not live social data, not measured social platform engagement, not production prediction.</p>
        <p>Confidence/limitation/next evidence step: Low directional; compare against approved field feedback or backtest before any launch, budget, or winner decision.</p>
      </div>
    </section>
  );
}

function VisualEvidenceGaps() {
  return (
    <section className="executive-visual-card" aria-label="Visual evidence gaps and limitations">
      <p className="eyebrow">Visual evidence gaps and limitations</p>
      <h3>Gaps stay visible beside the charts</h3>
      <ul className="insight-list">
        {visualEvidenceLimitations.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <div className="kpi-metadata" aria-label="Visual gaps formula and source">
        <p>Formula: show first reviewMetadata.evidenceGaps plus required blocked-claim limitation near visual summaries.</p>
        <p>Source: creativeComparisonFixture.reviewMetadata.evidenceGaps and approved safety boundaries.</p>
        <p>Evidence tier: E1 synthetic/offline fixture; unsupported evidence is treated as a blocker, not hidden.</p>
        <p>Confidence/limitation/next evidence step: Low directional; collect approved field feedback or backtest evidence before external use.</p>
      </div>
    </section>
  );
}

function HumanReviewChecklist() {
  return (
    <section className="executive-visual-card" aria-label="Human review checklist">
      <p className="eyebrow">Human review checklist</p>
      <h3>Questions before action</h3>
      <ul className="insight-list">
        {humanReviewChecklist.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <div className="kpi-metadata" aria-label="Human review formula and source">
        <p>Formula: checklist questions are required when confidence is Low directional and evidence tier is E1.</p>
        <p>Source: M17 evidence/confidence methodology plus fixture reviewMetadata limitations and evidence gaps.</p>
        <p>Evidence tier: E1 synthetic/offline fixture; not live social data, not measured social platform engagement, not production prediction.</p>
        <p>Confidence: Low directional; limitation is synthetic fixture evidence only.</p>
      </div>
    </section>
  );
}

function BarList({ title, items }: { title: string; items: { label: string; value: number; cue: string; detail: string }[] }) {
  const legend = title === 'Confidence / risk'
    ? 'Legend: Confidence = caution; Readiness = readiness; Risk = review-controlled risk. Higher readiness bars are better; lower risk bars do not mean no risk.'
    : title === 'Sentiment comparison'
      ? 'Legend: Sentiment bar shows transformed summary.sentimentDelta only; higher bars are directional fixture sentiment, not measured social platform engagement.'
      : 'Legend: Fixture-rank cue; higher bars show directional strength within the offline fixture rank, not measured market performance.';
  const executiveSignal = title === 'Sentiment comparison'
    ? 'Notice: sentiment is directionally positive, but still synthetic.'
    : title === 'Platform comparison'
      ? 'Notice: LINE leads the fixture rank; treat it as a channel hypothesis.'
      : title === 'Audience comparison'
        ? 'Notice: Working Adults are first-ranked; validate before segmentation.'
        : title === 'Confidence / risk'
          ? 'Notice: confidence remains low even though review readiness is complete.'
          : 'Notice the strongest directional signal before reviewing source metadata.';
  const sourceMapping = title === 'Sentiment comparison'
    ? [
      'Formula: sentiment bar = clampScore(50 + summary.sentimentDelta × 100).',
      'Source: summary.sentimentDelta and fixture summary/card fields from Product Launch, Campaign Message Test, A/B Experiment, and Creative Comparison offline fixtures.',
      'Evidence tier: E1 synthetic/offline fixture; not live social data, not measured social platform engagement, not production prediction.',
      'Confidence/limitation: Low directional; transformed sentiment is a visual review cue only, not measured public opinion.',
      'Next evidence step: compare against approved field feedback or backtest before any launch, budget, or winner decision.',
    ]
    : title === 'Platform comparison'
    ? [
      'Formula: platform bar value = clampScore(100 - fixture rank index × 12); earlier productLaunchFixture.platformBreakdown rows receive higher bars.',
      'Source: productLaunchFixture.platformBreakdown fields platform, signal, and detail; fixture rank only, not measured engagement.',
      'Evidence tier: E1 synthetic/offline fixture; not live social data, not measured social platform engagement, not production prediction.',
      'Confidence/limitation/next evidence step: Low directional; validate with approved field feedback before channel investment decisions.',
    ]
    : title === 'Audience comparison'
      ? [
        'Formula: audience bar value = clampScore(100 - fixture rank index × 12); earlier productLaunchFixture.sampleInput.audiences rows receive higher bars.',
        'Source: productLaunchFixture.sampleInput.audiences provides labels and productLaunchFixture.audienceInsights provides detail copy; fixture rank only, not measured audience engagement.',
        'Evidence tier: E1 synthetic/offline fixture; not live social data, not measured social platform engagement, not production prediction.',
        'Confidence/limitation/next evidence step: Low directional; validate with approved audience feedback before segmentation or budget decisions.',
      ]
      : title === 'Confidence / risk'
        ? [
          'Formula: Confidence maps Low directional confidence to 40/100; Readiness = exports ready / fixture count; Risk = average fixture riskScore × 100.',
          'Source: Confidence from creativeComparisonFixture.comparisonMethod.confidenceLevel; Readiness from fixture exports.readiness; Risk from fixture summary.riskScore.',
          'Evidence: E1 synthetic/offline fixture; Low confidence downgrade because no comparable measured field evidence, live data, or production risk model is used.',
          'Confidence/limitation/next evidence step: Low directional; collect comparable approved field evidence before treating confidence, readiness, or risk as decision-grade.',
        ]
        : [];

  return (
    <section className="executive-visual-card" aria-label={title}>
      <p className="eyebrow">{title}</p>
      <h3>{executiveSignal}</h3>
      <div className="bar-list">
        {items.map((item) => (
          <article className="bar-item" key={item.label}>
            <div className="bar-label-row">
              <strong>{item.label}</strong>
              <span>{item.value}/100</span>
            </div>
            <p className={`semantic-cue semantic-cue-${item.cue.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{item.cue}</p>
            <div className="progress-track" aria-hidden="true">
              <span style={{ width: `${item.value}%` }} />
            </div>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
      {sourceMapping.length > 0 ? (
        <div className="kpi-metadata" aria-label={`${title} formula and source`}>
          <p className="bar-legend">{legend}</p>
          {sourceMapping.map((metadata) => (
            <p key={metadata}>{metadata}</p>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ReviewValue({ value, fallback = 'Required' }: { value: string; fallback?: string }) {
  if (!value) {
    return <>{fallback}</>;
  }
  return <span data-i18n-preserve="true">{value}</span>;
}

export function WorkbenchView({ workflow = 'productLaunch' }: { workflow?: WorkflowKey }) {
  const { language, t } = useI18n();
  const config = workflowConfigs[workflow];
  const localizedDefaultForm = useMemo(
    () => localizeDefaultForm(config.defaultForm, language),
    [config.defaultForm, language],
  );
  const [formOverrides, setFormOverrides] = useState<Partial<LaunchForm>>({});
  const [hasRun, setHasRun] = useState(false);
  const [submittedForm, setSubmittedForm] = useState<LaunchForm>(localizedDefaultForm);
  const [submittedEditedFields, setSubmittedEditedFields] = useState<Set<keyof LaunchForm>>(new Set());
  const [errors, setErrors] = useState<string[]>([]);
  const form = useMemo<LaunchForm>(() => ({
    ...localizedDefaultForm,
    ...formOverrides,
    audiences: formOverrides.audiences ?? localizedDefaultForm.audiences,
    platforms: formOverrides.platforms ?? localizedDefaultForm.platforms,
  }), [formOverrides, localizedDefaultForm]);
  const editedFields = useMemo(
    () => new Set(Object.keys(formOverrides) as Array<keyof LaunchForm>),
    [formOverrides],
  );

  const selectedAudienceText = form.audiences
    .map((audience) => (audiencePresets.includes(audience) ? translate(audience, language) : audience))
    .join(', ');
  const selectedPlatformText = form.platforms.join(', ');

  function updateField(field: keyof LaunchForm, value: string) {
    setFormOverrides((current) => ({ ...current, [field]: value }));
  }

  function toggleList(field: 'audiences' | 'platforms', value: string) {
    setFormOverrides((current) => {
      const currentValues = current[field] ?? localizedDefaultForm[field];
      const values = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
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
    setSubmittedEditedFields(new Set(editedFields));
    setHasRun(true);
  }

  const resultPreview = translate(
    hasRun
      ? 'Run complete: generated sample results are visible below now.'
      : 'Defaults are prefilled. Run now, or edit the visible inputs first.',
    language,
  );
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
              {`Switch to ${alternateWorkflow.objective}`}
            </a>
          </div>
        </div>
        <aside className="quick-start-panel" aria-label="Quick start run action">
          <p className="eyebrow">Quick start</p>
          <h2>Run with safe defaults</h2>
          <p aria-label={translate('Run completion status', language)} data-i18n-rendered="true" role={hasRun ? 'status' : undefined}>{resultPreview}</p>
          {hasRun ? (
            <a className="button button-secondary" href="#results-title">
              {translate('Jump to generated sample results', language)}
            </a>
          ) : null}
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
            <legend>2. {t('Inputs you can edit')}</legend>
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
            {config.key === 'creativeComparison' ? (
              <>
                <label htmlFor="creative-a-title">Creative A concept title</label>
                <input id="creative-a-title" value={form.creativeATitle} onChange={(event) => updateField('creativeATitle', event.target.value)} />
                <label htmlFor="creative-a-description">Creative A visual idea / copy description</label>
                <textarea id="creative-a-description" value={form.creativeADescription} onChange={(event) => updateField('creativeADescription', event.target.value)} rows={3} />
                <label htmlFor="creative-b-title">Creative B concept title</label>
                <input id="creative-b-title" value={form.creativeBTitle} onChange={(event) => updateField('creativeBTitle', event.target.value)} />
                <label htmlFor="creative-b-description">Creative B visual idea / copy description</label>
                <textarea id="creative-b-description" value={form.creativeBDescription} onChange={(event) => updateField('creativeBDescription', event.target.value)} rows={3} />
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
                  {t(audience)}
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
              <strong>{translate('Complete required fields before running:', language)}</strong>
              <ul>
                {errors.map((error) => <li key={error}>{translate(error, language)}</li>)}
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
            <dd><ReviewValue value={form.brand} /></dd>
            {config.key === 'abExperiment' ? (
              <>
                <dt>Variant A</dt>
                <dd><ReviewValue value={form.variantA} /></dd>
                <dt>Variant B</dt>
                <dd><ReviewValue value={form.variantB} /></dd>
              </>
            ) : null}
            {config.key === 'creativeComparison' ? (
              <>
                <dt>Creative A</dt>
                <dd><ReviewValue value={form.creativeATitle} /> — <ReviewValue value={form.creativeADescription} /></dd>
                <dt>Creative B</dt>
                <dd><ReviewValue value={form.creativeBTitle} /> — <ReviewValue value={form.creativeBDescription} /></dd>
              </>
            ) : null}
            <dt>Audience</dt>
            <dd data-i18n-rendered="true">{selectedAudienceText || translate('General Consumers', language)}</dd>
            <dt>Platform mix</dt>
            <dd>{selectedPlatformText || 'Required'}</dd>
          </dl>
          <p className="help-text">
            The browser does not call a live service. These entries are displayed as assumptions beside
            the generated offline sample result.
          </p>
        </section>
      </div>

      {hasRun ? (
        <ReferenceResults
          form={submittedForm}
          config={config}
          fixture={config.fixture}
          editedFields={submittedEditedFields}
          showActions
        />
      ) : null}
    </section>
  );
}

export function RunDashboardView({ runId }: { runId?: string }) {
  const config = configForRunId(runId);
  if (!config) {
    return <UnavailableReferenceView kind="Run" id={runId} />;
  }
  return (
    <section className="view-stack" aria-labelledby="dashboard-title">
      <div className="card card-accent">
        <p className="eyebrow">Run {runId ?? config.fixture.runId}</p>
        <h1 id="dashboard-title">{`${config.objective} Results`}</h1>
        <p>Marketing-friendly decision dashboard for a reviewed offline campaign workflow.</p>
      </div>
      <ReferenceResults form={config.defaultForm} config={config} fixture={config.fixture} />
    </section>
  );
}

export function ExportReviewView({ runId }: { runId?: string }) {
  const config = configForRunId(runId);
  if (!config) {
    return <UnavailableReferenceView kind="Export" id={runId} />;
  }
  return (
    <section className="view-stack" aria-labelledby="export-title">
      <div className="card card-accent">
        <p className="eyebrow">Run {runId ?? config.fixture.runId}</p>
        <h1 id="export-title">Export Readiness Preview</h1>
        <p>Preview format readiness and review notes only. No downloadable file is generated here.</p>
      </div>
      <FixtureTransparency />
      <ExportReview fixture={config.fixture} objective={config.objective} />
    </section>
  );
}

function UnavailableReferenceView({ kind, id }: { kind: 'Run' | 'Export'; id?: string }) {
  return (
    <section className="view-stack" aria-labelledby="unavailable-title">
      <div className="card error-state">
        <p className="eyebrow">{kind} unavailable</p>
        <h1 id="unavailable-title">{kind} unavailable</h1>
        <p>
          We could not match this id to a reviewed reference fixture: {id ?? 'missing id'}.
          No Product Launch sample is shown as a fallback.
        </p>
        <div className="button-row">
          <a className="button button-primary" href="/campaign-workspace">Return to Campaign Workspace</a>
          <a className="button button-secondary" href="/workbench">Open Product Launch workbench</a>
        </div>
      </div>
    </section>
  );
}

export function HealthView() {
  const kpis = [
    ['Translation Completeness', 'Reviewed core UI copy is translated for the M18 screens; remaining mixed-language fragments stay visible for review rather than being claimed complete.'],
    ['Glossary Consistency', 'Product terms follow the M18 glossary for Campaign, Evidence, Confidence, Recommendation, Journey, Dashboard, Report, Export, and Review.'],
    ['Thai UX Quality', 'Thai copy is short, professional, executive-readable, and avoids unnecessary technical language.'],
    ['English UX Quality', 'English remains the fallback language and preserves existing product meaning for review users.'],
    ['Executive Readability', 'Dashboard, executive summary, and export copy remain readable for management review.'],
    ['Safety Copy Quality', 'Synthetic, evidence, confidence, limitation, and human-review warnings keep their original safety meaning in both languages.'],
    ['Terminology Consistency', 'Language switching keeps terminology stable across Home, Workbench, Dashboard, Executive Summary, Export Review, and Health screens.'],
    ['Language Coverage', 'Default language is Thai; English is available during use, and known mixed-language fragments remain visible for review; no backend, persistence, SocialSense, or workflow changes.'],
    ['Engineering KPI', 'No Architecture Gate; no SocialSense, backend, persistence, auth, external service, live API, IA, workflow, or design-system redesign. M19 has not begun.'],
  ];

  return (
    <section className="view-stack" aria-labelledby="health-title">
      <div className="card">
        <p className="eyebrow">Product health</p>
        <h1 id="health-title">M18 Thai-first Internationalization</h1>
        <p>M18 makes Thai the default UI language, keeps English available with fallback behavior, and tracks remaining mixed-language review gaps without backend or SocialSense changes.</p>
      </div>
      <section className="grid two-col" aria-label="M18 KPI dashboard">
        {kpis.map(([title, description]) => (
          <ObjectiveCard key={title} title={title} description={description} status={title === 'Engineering KPI' ? 'review' : 'ready'} />
        ))}
      </section>
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
  editedFields,
  showActions = false,
}: {
  form: LaunchForm;
  fixture: ReferenceFixture;
  config: WorkflowConfig;
  editedFields?: Set<keyof LaunchForm>;
  showActions?: boolean;
}) {
  const { language, t } = useI18n();
  const localizeTrustedAssumptionValue = (field: keyof LaunchForm, value: string) => {
    if (language === 'en') {
      return value;
    }
    if (field === 'audiences') {
      return value
        .split(', ')
        .map((audience) => (audiencePresets.includes(audience) ? t(audience) : audience))
        .join(', ');
    }
    if (field === 'platforms' || editedFields?.has(field)) {
      return value;
    }
    return t(value);
  };
  const assumptionRows = useMemo<Array<[string, string, keyof LaunchForm]>>(
    () => [
      ['Campaign name or brand', form.brand, 'brand'],
      ['Campaign Message', form.campaignMessage, 'campaignMessage'],
      ...(form.variantA ? ([['Variant A', form.variantA, 'variantA']] as Array<[string, string, keyof LaunchForm]>) : []),
      ...(form.variantB ? ([['Variant B', form.variantB, 'variantB']] as Array<[string, string, keyof LaunchForm]>) : []),
      ...(form.creativeATitle ? ([['Creative A concept title', form.creativeATitle, 'creativeATitle']] as Array<[string, string, keyof LaunchForm]>) : []),
      ...(form.creativeADescription ? ([['Creative A visual idea / copy description', form.creativeADescription, 'creativeADescription']] as Array<[string, string, keyof LaunchForm]>) : []),
      ...(form.creativeBTitle ? ([['Creative B concept title', form.creativeBTitle, 'creativeBTitle']] as Array<[string, string, keyof LaunchForm]>) : []),
      ...(form.creativeBDescription ? ([['Creative B visual idea / copy description', form.creativeBDescription, 'creativeBDescription']] as Array<[string, string, keyof LaunchForm]>) : []),
      ...(form.offer ? ([['Offer/Promotion', form.offer, 'offer']] as Array<[string, string, keyof LaunchForm]>) : []),
      ['Key Message', form.keyMessage, 'keyMessage'],
      ...(form.tone ? ([['Tone', form.tone, 'tone']] as Array<[string, string, keyof LaunchForm]>) : []),
      ...(form.claim ? ([['Claim to review', form.claim, 'claim']] as Array<[string, string, keyof LaunchForm]>) : []),
      ['Audience', form.audiences.join(', ') || 'General Consumers', 'audiences'],
      ['Platform mix', form.platforms.join(', '), 'platforms'],
      ['Context', form.context || 'No additional context', 'context'],
    ],
    [form],
  );

  const comparisonMethod = 'comparisonMethod' in fixture ? fixture.comparisonMethod : undefined;

  return (
    <section className="view-stack" aria-labelledby="results-title" data-i18n-rendered="true">
      <div className="card result-hero">
        <p className="eyebrow">{t('Dashboard')}</p>
        <h2 id="results-title">{t(fixture.summary.headline)}</h2>
        <p>{t(fixture.summary.text)}</p>
        <section className="next-action-card" aria-label={t('Recommended next action')}>
          <p className="eyebrow">{t('Recommended next action')}</p>
          <strong>{t('Use this as a human review prompt, then approve a small evidence-gathering test.')}</strong>
          <p>{t(fixture.recommendedNextTest)}</p>
        </section>
        <p className="help-text">{t('Safety: offline fixture for planning only; review before using externally.')}</p>
        {showActions ? (
          <div className="button-row">
            <a className="button button-secondary" href={`/runs/${fixture.runId}`}>{t('Open result dashboard')}</a>
            <a className="button button-secondary" href={`/exports/${fixture.runId}`}>{t('Open export-readiness preview')}</a>
          </div>
        ) : null}
      </div>

      <div className="card assumption-panel">
        <p className="eyebrow">{t('Your assumptions shown for review')}</p>
        <dl className="assumption-grid">
          {assumptionRows.map(([label, value, field]) => (
            <div key={label}>
              <dt>{t(label)}</dt>
              <dd>{localizeTrustedAssumptionValue(field, value)}</dd>
            </div>
          ))}
        </dl>
        <p className="help-text">{t('The generated sample result is not recalculated from arbitrary browser-entered data.')}</p>
      </div>

      <FixtureTransparency />

      {'creativeSummaries' in fixture && 'comparisonDashboard' in fixture ? (
        <section className="card" aria-label={t('Creative comparison dashboard')}>
          <p className="eyebrow">{t('Creative Comparison Dashboard')}</p>
          <h3>{t('Creative Comparison Dashboard')}</h3>
          <div className="grid two-col align-start">
            {fixture.creativeSummaries.map((card: FixtureCard) => (
              <MetricCard key={card.title} card={card} />
            ))}
          </div>
          <div className="grid two-col align-start">
            {fixture.comparisonDashboard.map((item: { title: string; detail: string }) => (
              <section className="evidence-critical-card" key={item.title}>
                <p className="eyebrow">{t('Review signal')}</p>
                <h3>{t(item.title)}</h3>
                <p>{t(item.detail)}</p>
              </section>
            ))}
          </div>
          {'comparisonMethod' in fixture ? (
            <p className="help-text">
              {t(fixture.comparisonMethod.decisionStatus)}: {t(fixture.comparisonMethod.rationale)} {t('Confidence')}: {t(fixture.comparisonMethod.confidenceLevel)}.
            </p>
          ) : null}
        </section>
      ) : null}

      {'comparisonCards' in fixture && !('creativeSummaries' in fixture) ? (
        <section className="card" aria-label={t('Variant comparison')}>
          <p className="eyebrow">{t('A/B comparison')}</p>
          <h3>{t('Variant decision frame')}</h3>
          {comparisonMethod ? (
            <div>
              <p>
                {t(comparisonMethod.decisionStatus)}: {t(comparisonMethod.rationale)} {t('Confidence')}: {t(comparisonMethod.confidenceLevel)}.
              </p>
              <p className="help-text">{t('Parity check')}: {t(comparisonMethod.parityCheck)}</p>
              <div className="grid two-col align-start">
                <InsightList title="Shared Criteria" items={comparisonMethod.sharedCriteria} localize />
                <InsightList title="Blocked Actions" items={comparisonMethod.blockedActions} localize />
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
        <InsightList title="Platform Breakdown" items={fixture.platformBreakdown.map((item) => `${item.platform}: ${item.signal}. ${item.detail}`)} localize />
        <InsightList title="Audience Insights" items={fixture.audienceInsights} localize />
        <InsightList title="Risks / Caveats" items={fixture.risksCaveats.slice(0, 4)} localize />
        <div className="card">
          <p className="eyebrow">{t('Executive Summary')}</p>
          <h3>{t(`${config.objective} executive summary`)}</h3>
          <p>{t(fixture.exports.executiveSummaryPreview)}</p>
        </div>
      </div>
    </section>
  );
}

function ExportReview({ fixture, objective }: { fixture: ReferenceFixture; objective: string }) {
  const { language, t } = useI18n();
  const supportedFormats = fixture.exports.formats
    .filter((format) => format.label === 'JSON' || format.label === 'Markdown')
    .map((format) => {
      const label = format.label === 'JSON' ? 'Executive JSON preview' : 'Markdown briefing preview';
      return { ...format, label };
    });
  const unsupportedFormats = [
    {
      label: 'Planning only: PDF',
      detail: 'Unsupported now; no PDF is generated or downloadable in this frontend-only preview.',
    },
    {
      label: 'Planning only: PowerPoint',
      detail: 'Unsupported now; no PowerPoint/PPT file is generated or downloadable in this frontend-only preview.',
    },
  ];
  const inputRows = reportInputRows(fixture);
  const decisionConfidence = 'comparisonMethod' in fixture
    ? fixture.comparisonMethod.confidenceLevel
    : 'Low directional confidence';
  const decisionStatus = 'comparisonMethod' in fixture
    ? fixture.comparisonMethod.decisionStatus
    : 'Ready for human review';
  const reviewMode = language === 'th' ? 'ตัวอย่างออฟไลน์' : fixture.reviewMetadata.source.reviewMode;
  const executionMode = language === 'th' ? 'ข้อมูลตัวอย่างออฟไลน์' : fixture.reviewMetadata.provenance.runtime_mode;
  const productionReady = language === 'th' ? 'ยังไม่พร้อมใช้งานจริง' : 'no';
  const parametersCopy = language === 'th'
    ? `โหมดตรวจทาน: ${reviewMode}; รูปแบบการทำงาน: ${executionMode}; ความพร้อมใช้งานจริง: ${productionReady}.`
    : `Review mode: ${reviewMode}; execution mode: ${executionMode}; production ready: ${productionReady}.`;
  const dashboardSnapshotCopy = `${fixture.cards
    .map((card) => `${t(card.title)}: ${t(card.value)}`)
    .join('; ')}.`;
  const confidenceSummaryCopy = language === 'th'
    ? `${t(decisionStatus)}. ${t('Confidence')}: ${t(decisionConfidence)}. ช่องว่างหลักฐานต้องแสดงให้เห็นก่อนดำเนินการ.`
    : `${decisionStatus}. Confidence: ${decisionConfidence}. Evidence gaps remain visible before action.`;

  return (
    <div className="view-stack">
      <div className="card executive-report-hero">
        <p className="eyebrow">Export review</p>
        <h2>{fixture.exports.readiness}</h2>
        <p>
          {fixture.exports.status} This screen previews Executive JSON and Markdown briefing content
          for human review only; it is not a download action.
        </p>
        <div className="kpi-metadata" aria-label="Export readiness formula and source">
          <p>Formula: supported previews filter fixture.exports.formats to JSON and Markdown only.</p>
          <p>Source: fixture export payload for run {fixture.runId}.</p>
          <p>Evidence tier: E1 synthetic/offline fixture; preview/handoff review only.</p>
          <p>Confidence: Low directional; unsupported formats remain planning-only until separately approved.</p>
        </div>
      </div>

      <section className="card" aria-label="Export format readiness">
        <p className="eyebrow">Export format readiness</p>
        <h2>Supported previews and unsupported future formats</h2>
        <div className="grid three-col export-format-grid">
          {supportedFormats.map((format) => (
            <article className="format-card" key={format.label}>
              <p className="eyebrow">{format.label}</p>
              <h3>{format.status.replace('Available for review', 'Preview ready for review')}</h3>
              <p>{format.detail}</p>
              <p className="help-text">Evidence tier: E1 synthetic/offline fixture; Source: fixture.exports.formats.</p>
            </article>
          ))}
          {unsupportedFormats.map((format) => (
            <article className="format-card format-card-unsupported" key={format.label}>
              <p className="eyebrow">{format.label}</p>
              <h3>Unsupported now</h3>
              <p>{format.detail}</p>
              <p className="help-text">Evidence tier: unavailable; Confidence: None because this frontend does not generate this format.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card executive-report-preview" aria-label="Executive report preview">
        <p className="eyebrow">Executive report preview</p>
        <h2>{objective} executive handoff report</h2>
        <p>
          Decision readiness: human review required before launch, budget, or winner decisions.
        </p>
        <p>
          Formula: report sections are assembled from fixture metadata, synthetic evidence, and deterministic calculations.
          Evidence tier: E1 synthetic/offline fixture; Confidence: {decisionConfidence}.
        </p>
        <div className="report-section-grid">
          <ReportSection title="Executive Summary">
            <p>{fixture.exports.executiveSummaryPreview}</p>
            <p className="help-text">Source: fixture.exports.executiveSummaryPreview. Evidence tier: E1 synthetic/offline fixture. Confidence: {decisionConfidence}.</p>
          </ReportSection>
          <ReportSection title="Objectives">
            <p>Objective: {objective}. Use the report for executive handoff and human review, not production approval.</p>
            <p className="help-text">Source: fixture objective/config. Evidence tier: E1 synthetic/offline fixture. Confidence: Low directional.</p>
          </ReportSection>
          <ReportSection title="Scenario">
            <p>{fixture.summary.headline}: {fixture.summary.text}</p>
            <p className="help-text">Source: fixture.summary. Evidence tier: E1 synthetic/offline fixture; no live social or measured market data.</p>
          </ReportSection>
          <ReportSection title="Inputs">
            <dl className="assumption-grid compact-dl">
              {inputRows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="help-text">Source: fixture.sampleInput; displayed as review assumptions only.</p>
          </ReportSection>
          <ReportSection title="Parameters">
            <p data-i18n-rendered="true">{parametersCopy}</p>
            <p className="help-text">Formula: source checks must keep offlineExecution=true, liveApiAccess=false, credentialsRequired=false, productionReady=false.</p>
          </ReportSection>
          <ReportSection title="Audience">
            <p>{fixture.sampleInput.audiences.join(', ')}</p>
            <p className="help-text">Source: fixture.sampleInput.audiences and audience insights. Evidence tier: E1; not measured audience engagement.</p>
          </ReportSection>
          <ReportSection title="Platform Mix">
            <p>{fixture.sampleInput.platforms.join(', ')}</p>
            <p className="help-text">Source: fixture.sampleInput.platforms and platformBreakdown. Evidence tier: E1; not live platform measurement.</p>
          </ReportSection>
          <ReportSection title="Dashboard / KPI snapshot">
            <p data-i18n-rendered="true">{dashboardSnapshotCopy}</p>
            <p className="help-text">Formula: snapshot lists fixture cards as reported, with no recalculation from browser inputs. Source: fixture.cards.</p>
          </ReportSection>
          <ReportSection title="Charts / Evidence / Confidence summary">
            <p data-i18n-rendered="true">{confidenceSummaryCopy}</p>
            <p className="help-text">Evidence tier: E1 synthetic/offline fixture; no live social data, measured platform engagement, production prediction, conversion guarantee, persuasion optimization, or microtargeting.</p>
          </ReportSection>
          <ReportSection title="Recommendations">
            <p>{fixture.recommendedNextTest}</p>
            <p className="help-text">Next review step: {fixture.recommendedNextTest}</p>
          </ReportSection>
          <ReportSection title="Next review step">
            <p>{fixture.recommendedNextTest}</p>
            <p className="help-text">Evidence tier: E1 synthetic/offline fixture; Confidence: Low directional; review step only, not a launch or budget decision.</p>
          </ReportSection>
          <ReportSection title="Assumptions">
            <ul className="insight-list">
              {fixture.reviewMetadata.assumptions.slice(0, 5).map((item) => <li key={item}>{item}</li>)}
            </ul>
          </ReportSection>
          <ReportSection title="Limitations">
            <ul className="insight-list">
              {fixture.reviewMetadata.limitations.slice(0, 4).map((item) => <li key={item}>{item}</li>)}
            </ul>
          </ReportSection>
          <ReportSection title="Synthetic-data notice">
            <p>All report content is generated from a synthetic aggregate offline fixture. It is not field evidence, live social data, measured engagement, or production prediction.</p>
          </ReportSection>
          <ReportSection title="Safety notice">
            <ul className="insight-list">
              {fixture.safetyLabels.map((label) => <li key={label}>{label}</li>)}
            </ul>
          </ReportSection>
        </div>
      </section>

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
              <dd data-i18n-rendered="true">{reviewMode}</dd>
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

function ReportSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="report-section-card">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function reportInputRows(fixture: ReferenceFixture): string[][] {
  const rows = [
    ['Campaign name or brand', fixture.sampleInput.brand],
    ['Campaign Message', fixture.sampleInput.campaign_message],
    ['Key Message', fixture.sampleInput.key_message],
    ['Context', fixture.sampleInput.context],
  ];
  if ('offer' in fixture.sampleInput) {
    rows.splice(2, 0, ['Offer/Promotion', fixture.sampleInput.offer]);
  }
  if ('variant_a' in fixture.sampleInput) {
    rows.splice(2, 0, ['Variant A', fixture.sampleInput.variant_a], ['Variant B', fixture.sampleInput.variant_b]);
  }
  if ('creative_a_title' in fixture.sampleInput) {
    rows.splice(
      2,
      0,
      ['Creative A', `${fixture.sampleInput.creative_a_title} — ${fixture.sampleInput.creative_a_description}`],
      ['Creative B', `${fixture.sampleInput.creative_b_title} — ${fixture.sampleInput.creative_b_description}`],
    );
  }
  if ('tone' in fixture.sampleInput) {
    rows.push(['Tone', fixture.sampleInput.tone]);
  }
  if ('claim' in fixture.sampleInput) {
    rows.push(['Claim to review', fixture.sampleInput.claim]);
  }
  return rows;
}

function FixtureTransparency() {
  const { t } = useI18n();
  return (
    <section className="card" aria-label={t('Fixture transparency')}>
      <p className="eyebrow">{t('Fixture transparency')}</p>
      <h2>{t('Reference Fixture vs User Review Session')}</h2>
      <dl className="assumption-grid">
        <div>
          <dt>{t('Reference Fixture')}</dt>
          <dd>{t('Synthetic generated sample, reviewed offline, and not live execution.')}</dd>
        </div>
        <div>
          <dt>{t('User Review Session')}</dt>
          <dd>{t('User-provided inputs are shown as review assumptions only; they do not recalculate the generated sample.')}</dd>
        </div>
        <div>
          <dt>{t('No live execution')}</dt>
          <dd>{t('No backend run, live API, persistence, credential, or production campaign system is invoked.')}</dd>
        </div>
      </dl>
    </section>
  );
}

function MetricCard({ card }: { card: FixtureCard }) {
  const { t } = useI18n();
  return (
    <article className="card metric-card">
      <p className="eyebrow">{t(card.title)}</p>
      <h3>{t(card.value)}</h3>
      <p>{t(card.detail)}</p>
    </article>
  );
}

function InsightList({ title, items, localize = false }: { title: string; items: string[]; localize?: boolean }) {
  const { t } = useI18n();
  const renderText = (text: string) => (localize ? t(text) : text);
  return (
    <section className="card">
      <p className="eyebrow">{renderText('Review signal')}</p>
      <h3>{renderText(title)}</h3>
      <ul className="insight-list">
        {items.map((item) => <li key={item}>{renderText(item)}</li>)}
      </ul>
    </section>
  );
}

function validateForm(form: LaunchForm, workflow: WorkflowKey): string[] {
  const errors: string[] = [];
  if (!form.brand.trim()) {
    errors.push('Campaign name or brand is required because the review needs a campaign label. Add a brand or campaign name to continue.');
  }
  if (!form.campaignMessage.trim()) {
    errors.push('Campaign Message is required because the fixture must be reviewed against a visible message. Add the message copy to continue.');
  }
  if (workflow === 'abExperiment' && (!form.variantA.trim() || !form.variantB.trim())) {
    errors.push('Both A/B variants are required because the comparison needs two visible alternatives. Add Variant A and Variant B copy to continue.');
  }
  if (workflow === 'creativeComparison' && (!form.creativeATitle.trim() || !form.creativeBTitle.trim())) {
    errors.push('Creative A and Creative B titles are required because the comparison needs two named alternatives.');
  }
  if (workflow === 'creativeComparison' && (!form.creativeADescription.trim() || !form.creativeBDescription.trim())) {
    errors.push('Creative A and Creative B descriptions are required because this reviewed prototype uses text-only concepts.');
  }
  if (workflow === 'creativeComparison' && !form.keyMessage.trim()) {
    errors.push('Key Message is required because message clarity must be reviewed against an explicit message.');
  }
  if (workflow !== 'abExperiment' && workflow !== 'creativeComparison' && (form.variantA || form.variantB) && (!form.variantA.trim() || !form.variantB.trim())) {
    errors.push('Both A/B variants are required because partial variants would make comparison context unclear. Add both variants or leave both blank.');
  }
  if (form.platforms.length === 0) {
    errors.push('Select at least one platform because channel context changes review interpretation. Choose one or more platform checkboxes.');
  }
  return errors;
}

function configForRunId(runId?: string): WorkflowConfig | undefined {
  if (!runId || runId === 'sample-run' || runId === productLaunchFixture.runId) {
    return workflowConfigs.productLaunch;
  }
  if (runId === campaignMessageFixture.runId || runId === '3c-m5-campaign-message-test-reference-workflow') {
    return workflowConfigs.campaignMessageTest;
  }
  if (runId === abExperimentFixture.runId) {
    return workflowConfigs.abExperiment;
  }
  if (runId === creativeComparisonFixture.runId) {
    return workflowConfigs.creativeComparison;
  }
  return undefined;
}
