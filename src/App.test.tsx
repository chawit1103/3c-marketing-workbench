import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { App } from './App';
import { safetyLabels } from './product/safety/safetyLabels';

function renderAt(pathname: string) {
  vi.stubGlobal('location', { ...window.location, pathname });
  return render(<App />);
}

function renderWorkbench() {
  renderAt('/workbench');
  return screen.getByRole('form', { name: 'Product Launch setup' });
}

function renderCampaignMessageTest() {
  renderAt('/workbench/campaign-message-test');
  return screen.getByRole('form', { name: 'Campaign Message Test setup' });
}

function renderAbExperiment() {
  renderAt('/workbench/ab-experiment');
  return screen.getByRole('form', { name: 'A/B Experiment setup' });
}

function renderCreativeComparison() {
  renderAt('/workbench/creative-comparison');
  return screen.getByRole('form', { name: 'Creative Comparison setup' });
}

describe('App shell routes', () => {
  it.each([
    ['/', 'Compare campaign decisions safely before budget reviews.'],
    ['/workbench', 'Product Launch Simulation'],
    ['/campaign-workspace', 'Campaign Workspace'],
    ['/workbench/campaign-message-test', 'Campaign Message Test'],
    ['/workbench/ab-experiment', 'A/B Experiment'],
    ['/workbench/creative-comparison', 'Creative Comparison'],
    ['/runs/run-123', 'Run unavailable'],
    ['/exports/run-123', 'Export unavailable'],
    ['/health', 'M12 Campaign Workspace Trust & Validation'],
  ])('renders %s with safety labels', (pathname, heading) => {
    renderAt(pathname);

    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    const safetyPanel = screen.getByRole('region', { name: 'Safety boundaries' });
    for (const label of safetyLabels) {
      expect(within(safetyPanel).getByText(label)).toBeInTheDocument();
    }
  });

  it('renders simple shell navigation without changing the primary navigation model', () => {
    renderAt('/');

    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(within(nav).getByRole('link', { name: 'Workbench' })).toHaveAttribute('href', '/workbench');
    expect(within(nav).getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/runs/sample-run');
    expect(within(nav).getByRole('link', { name: 'Export review' })).toHaveAttribute('href', '/exports/sample-run');
    expect(within(nav).getByRole('link', { name: 'Health' })).toHaveAttribute('href', '/health');
    expect(within(nav).queryByRole('link', { name: /Campaign Workspace/i })).not.toBeInTheDocument();
    expect(within(nav).queryByRole('link', { name: /Campaign Message Test/i })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open Campaign Workspace' })).toHaveAttribute('href', '/campaign-workspace');
    expect(screen.getByRole('link', { name: 'Open Campaign Message Test' })).toHaveAttribute(
      'href',
      '/workbench/campaign-message-test',
    );
    expect(screen.getByRole('link', { name: 'Open A/B Experiment' })).toHaveAttribute('href', '/workbench/ab-experiment');
  });

  it('keeps internal platform terms out of visible primary UI', () => {
    const hiddenInternalTerms = [
      'provenance object',
      'sdk',
      'fixture runtime',
      'domain pack',
      'dashboard contract',
      'registry',
      'campaign_response',
    ];

    for (const pathname of ['/', '/workbench', '/campaign-workspace', '/workbench/campaign-message-test', '/workbench/ab-experiment', '/workbench/creative-comparison', '/runs/sample-run', '/exports/sample-run', '/health', '/unknown-route']) {
      const { unmount } = renderAt(pathname);
      const visibleText = document.body.textContent?.toLowerCase() ?? '';
      expect(visibleText).not.toContain('pr4');
      expect(visibleText).not.toContain('pr2');
      expect(visibleText).not.toContain('vertical slice');

      for (const term of hiddenInternalTerms) {
        expect(visibleText).not.toContain(term);
      }

      unmount();
    }
  });
});

describe('Creative Comparison workflow', () => {
  it('is available as a fourth workbench workflow with Creative A and Creative B text inputs', () => {
    const form = renderCreativeComparison();

    expect(screen.getByRole('heading', { name: 'Creative Comparison' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Current workflow' })).toHaveTextContent('Creative Comparison mode');
    expect(within(form).getByLabelText('Objective: Creative Comparison')).toHaveTextContent(
      'Review two text-only creative concepts with shared audience, platform, and safety assumptions.',
    );
    expect(within(form).getByLabelText('Creative A concept title')).toHaveValue('Speed-first lunch creative');
    expect(within(form).getByLabelText('Creative A visual idea / copy description')).toHaveValue('A clean desk scene with lunch options resolved quickly and a short benefit-led caption.');
    expect(within(form).getByLabelText('Creative B concept title')).toHaveValue('Trust-proof lunch creative');
    expect(within(form).getByLabelText('Creative B visual idea / copy description')).toHaveValue('A team lunch moment with nutrition proof points and dependable delivery reassurance.');
    for (const step of ['Creative A', 'Creative B', 'Review', 'Run', 'Creative Comparison Dashboard', 'Executive Summary', 'Export Review', 'Recommended Next Action']) {
      expect(screen.getByRole('region', { name: 'Reference workflow steps' })).toHaveTextContent(step);
    }
  });

  it('validates empty creative comparison inputs before running', () => {
    const form = renderCreativeComparison();

    for (const label of [
      'Creative A concept title',
      'Creative A visual idea / copy description',
      'Creative B concept title',
      'Creative B visual idea / copy description',
      'Key Message',
    ]) {
      fireEvent.change(within(form).getByLabelText(label), { target: { value: '' } });
    }
    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Creative A and Creative B titles are required because the comparison needs two named alternatives.');
    expect(screen.getByRole('alert')).toHaveTextContent('Creative A and Creative B descriptions are required because this MVP reviews text-only concepts.');
    expect(screen.getByRole('alert')).toHaveTextContent('Key Message is required because message clarity must be reviewed against an explicit message.');
    expect(screen.queryByRole('heading', { name: 'Offline creative comparison ready for executive review' })).not.toBeInTheDocument();
  });

  it('produces result preview, comparison dashboard, executive summary, export review link, and safety labels after run', () => {
    const form = renderCreativeComparison();

    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('status', { name: 'Run completion status' })).toHaveTextContent(
      'Run complete: generated sample results are visible below now.',
    );
    expect(screen.getByRole('heading', { name: 'Offline creative comparison ready for executive review' })).toBeInTheDocument();
    const dashboard = screen.getByRole('region', { name: 'Creative comparison dashboard' });
    for (const heading of [
      'Creative A summary',
      'Creative B summary',
      'Comparison highlights',
      'Differentiators',
      'Audience fit',
      'Brand fit',
      'Message clarity',
      'Risk / caveats',
      'Evidence notes',
      'Recommended next action',
    ]) {
      expect(dashboard).toHaveTextContent(heading);
    }
    expect(dashboard).toHaveTextContent('No winner selected');
    expect(dashboard).toHaveTextContent('inconclusive');
    expect(screen.getByRole('heading', { name: 'Creative Comparison executive summary' })).toBeInTheDocument();
    expect(screen.getByText('Open export-readiness preview')).toHaveAttribute('href', '/exports/3c-m15-creative-comparison-reference-workflow');
    expect(document.body.textContent).toContain('Safety: offline fixture for planning only');
  });

  it('routes Creative Comparison dashboard and reuses export review for the generated run id', () => {
    const runView = renderAt('/runs/3c-m15-creative-comparison-reference-workflow');
    expect(screen.getByRole('heading', { name: 'Creative Comparison Results' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Creative comparison dashboard' })).toHaveTextContent('No winner selected');
    runView.unmount();

    renderAt('/exports/3c-m15-creative-comparison-reference-workflow');
    expect(screen.getByRole('heading', { name: 'Creative Comparison executive-ready summary' })).toBeInTheDocument();
    expect(screen.getByText(/not a download action/i)).toBeInTheDocument();
  });
});

describe('Campaign Workspace MVP', () => {
  it('renders a campaign-centric workspace with the approved journey timeline and executive summary', () => {
    renderAt('/campaign-workspace');

    expect(screen.getByRole('heading', { name: 'Campaign Workspace' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Campaign Overview' })).toHaveTextContent('Nimbus Go');
    expect(screen.getByRole('region', { name: 'Current Journey Stage' })).toHaveTextContent('Executive Decision');
    expect(screen.getByRole('region', { name: 'Executive Summary' })).toHaveTextContent('next recommended action');

    const primaryAction = screen.getByRole('link', { name: 'Open executive handoff review' });
    expect(primaryAction).toHaveClass('button-primary');
    expect(primaryAction).toHaveAttribute('href', '/exports/3c-m15-creative-comparison-reference-workflow');
    expect(screen.queryByRole('link', { name: /Continue next workflow/i })).not.toBeInTheDocument();

    const journey = screen.getByRole('region', { name: 'Campaign journey timeline' });
    for (const stage of ['Completed: Campaign Definition', 'Completed: Campaign Message Test', 'Completed: A/B Experiment', 'Completed: Creative Comparison', 'Current: Executive Decision', 'Next: Export/Handoff']) {
      expect(journey).toHaveTextContent(stage);
    }
    expect(journey).toHaveTextContent('Handoff readiness: Ready for human review');
  });

  it('aggregates recent runs and evidence from existing fixtures only', () => {
    renderAt('/campaign-workspace');

    const recentRuns = screen.getByRole('region', { name: 'Recent Runs' });
    for (const objective of ['Product Launch', 'Campaign Message Test', 'A/B Experiment', 'Creative Comparison']) {
      expect(recentRuns).toHaveTextContent(objective);
    }

    const evidence = screen.getByRole('region', { name: 'Evidence Summary' });
    for (const fixtureHeadline of [
      'Offline product-launch simulation ready for executive review',
      'Offline campaign-message test ready for executive review',
      'Offline A/B experiment ready for executive review',
      'Offline creative comparison ready for executive review',
    ]) {
      expect(evidence).toHaveTextContent(fixtureHeadline);
    }
    expect(evidence).toHaveTextContent('Decision evidence quality');
    expect(evidence).toHaveTextContent('Low directional confidence');
    expect(evidence).toHaveTextContent('Evidence gaps');
    expect(evidence).toHaveTextContent('No approved field data or backtest evidence is attached to this bridge output.');
    expect(evidence).toHaveTextContent('Limitations / risks');
    expect(evidence).toHaveTextContent('Blocked actions');
    expect(evidence).toHaveTextContent('winner selection');
    expect(evidence).toHaveTextContent('Handoff readiness');
    expect(evidence).toHaveTextContent('Ready for human review');
    expect(evidence.textContent?.toLowerCase()).toContain('creative comparison');
    expect(evidence.textContent?.toLowerCase()).not.toContain('socialsense');
  });

  it('offers approved workflow actions including Creative Comparison without primary navigation changes', () => {
    renderAt('/campaign-workspace');

    const actions = screen.getByRole('region', { name: 'Available Workflow Actions' });
    expect(within(actions).getByRole('link', { name: 'Open Product Launch' })).toHaveAttribute('href', '/workbench');
    expect(within(actions).getByRole('link', { name: 'Open Campaign Message Test' })).toHaveAttribute('href', '/workbench/campaign-message-test');
    expect(within(actions).getByRole('link', { name: 'Open A/B Experiment' })).toHaveAttribute('href', '/workbench/ab-experiment');
    expect(within(actions).getByRole('link', { name: 'Open Creative Comparison' })).toHaveAttribute('href', '/workbench/creative-comparison');
    expect(document.body.textContent).toContain('Creative Comparison');
  });
});

describe('Product Launch workflow regression', () => {
  it('renders the guided Product Launch form with static Product Launch objective', () => {
    const form = renderWorkbench();

    expect(screen.getByRole('heading', { name: 'Product Launch Simulation' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Current workflow' })).toHaveTextContent('Product Launch mode');
    expect(within(form).getByLabelText('Objective: Product Launch')).toHaveTextContent(
      'Review launch message, offer, audience, and channel assumptions.',
    );
    expect(screen.queryByLabelText('Objective')).not.toBeInTheDocument();
    expect(within(form).getByLabelText('Campaign name or brand')).toHaveValue('Nimbus Go');
  });

  it('shows the run action in the quick-start area before the full form', () => {
    renderWorkbench();

    const quickStart = screen.getByRole('complementary', { name: 'Quick start run action' });
    expect(within(quickStart).getByRole('button', { name: 'Run offline simulation' })).toBeInTheDocument();
    expect(within(quickStart).getByText(/Defaults are prefilled/i)).toBeInTheDocument();
  });

  it('validates campaign name, campaign message, and platform requirements', () => {
    const form = renderWorkbench();

    fireEvent.change(within(form).getByLabelText('Campaign name or brand'), { target: { value: '' } });
    fireEvent.change(within(form).getByLabelText('Campaign Message'), { target: { value: '' } });
    for (const platform of ['Facebook', 'TikTok', 'LINE']) {
      fireEvent.click(within(form).getByLabelText(platform));
    }
    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Campaign name or brand is required because the review needs a campaign label. Add a brand or campaign name to continue.');
    expect(screen.getByRole('alert')).toHaveTextContent('Campaign Message is required because the fixture must be reviewed against a visible message. Add the message copy to continue.');
    expect(screen.getByRole('alert')).toHaveTextContent('Select at least one platform because channel context changes review interpretation. Choose one or more platform checkboxes.');
    expect(screen.queryByRole('heading', { name: 'Offline product-launch simulation ready for executive review' })).not.toBeInTheDocument();
  });

  it('updates platform mix selection and shows it in the assumptions preview', () => {
    const form = renderWorkbench();

    fireEvent.click(within(form).getByLabelText('Instagram'));

    expect(screen.getByRole('region', { name: 'Current assumptions' })).toHaveTextContent('Facebook, TikTok, LINE, Instagram');
  });

  it('renders marketing-friendly results after run', () => {
    const form = renderWorkbench();

    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('heading', { name: 'Offline product-launch simulation ready for executive review' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Recommended next action' })).toHaveTextContent(
      'Use this as a human review prompt',
    );
    for (const heading of [
      'Overall Reaction',
      'Message Acceptance',
      'Brand Perception',
      'Engagement Potential',
      'Synthetic Purchase Intent',
      'Platform Breakdown',
      'Audience Insights',
      'Risks / Caveats',
    ]) {
      expect(screen.getByText(heading)).toBeInTheDocument();
    }
    expect(screen.getAllByText('Executive Summary').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Open export-readiness preview')).toBeInTheDocument();
    expect(screen.getAllByText(/Fixture channel cue only/).length).toBeGreaterThanOrEqual(1);
    expect(document.body.textContent?.toLowerCase()).not.toContain('aggregate sample ' + 'interactions');
    expect(screen.getByText(/not recalculated from arbitrary browser-entered data/i)).toBeInTheDocument();
  });

  it('makes completion state visible immediately after running', () => {
    const form = renderWorkbench();

    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('status', { name: 'Run completion status' })).toHaveTextContent(
      'Run complete: generated sample results are visible below now.',
    );
    expect(screen.getByRole('link', { name: 'Jump to generated sample results' })).toHaveAttribute('href', '#results-title');
  });
});

describe('M12 Campaign Workspace trust and validation', () => {
  it.each([
    ['/runs/not-a-known-run', 'Run unavailable'],
    ['/exports/not-a-known-export', 'Export unavailable'],
  ])('does not fall back to the Product Launch fixture for unknown %s', (pathname, heading) => {
    renderAt(pathname);

    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    expect(screen.getByText(/We could not match this id to a reviewed reference fixture/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Return to Campaign Workspace' })).toHaveAttribute('href', '/campaign-workspace');
    expect(screen.getByRole('link', { name: 'Open Product Launch workbench' })).toHaveAttribute('href', '/workbench');
    expect(screen.queryByRole('heading', { name: 'Product Launch Results' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Offline product-launch simulation ready for executive review' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Product Launch executive-ready summary' })).not.toBeInTheDocument();
  });

  it.each([
    ['/runs/sample-run', 'Reference Fixture', 'User Review Session'],
    ['/exports/sample-run', 'Reference Fixture', 'User Review Session'],
  ])('clearly labels fixture provenance and user review assumptions for %s', (pathname, fixtureLabel, sessionLabel) => {
    renderAt(pathname);

    const transparency = screen.getByRole('region', { name: 'Fixture transparency' });
    expect(transparency).toHaveTextContent(fixtureLabel);
    expect(transparency).toHaveTextContent(sessionLabel);
    expect(transparency).toHaveTextContent('Synthetic generated sample');
    expect(transparency).toHaveTextContent('User-provided inputs are shown as review assumptions only');
    expect(transparency).toHaveTextContent('No live execution');
  });

  it('shows M12 health focus, baseline, and readiness KPIs without stale M7 wording', () => {
    renderAt('/health');

    expect(screen.getByRole('heading', { name: 'M12 Campaign Workspace Trust & Validation' })).toBeInTheDocument();
    expect(screen.getByText(/Product Health 7.4 baseline/i)).toBeInTheDocument();
    for (const kpi of [
      'Product Health',
      'UX Health',
      'Trust Score',
      'Transparency Score',
      'Validation Score',
      'Dashboard Clarity',
      'Overall Readiness',
      'Engineering KPI',
    ]) {
      expect(screen.getByRole('region', { name: 'M12 KPI dashboard' })).toHaveTextContent(kpi);
    }
    expect(document.body.textContent).not.toContain('M7 A/B Experiment workflow readiness');
  });
});

describe('Campaign Message Test workflow', () => {
  it('is available from the existing workbench area and follows the required step sequence', () => {
    const form = renderCampaignMessageTest();

    expect(screen.getByRole('heading', { name: 'Campaign Message Test' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Current workflow' })).toHaveTextContent('Campaign Message Test mode');
    expect(within(form).getByLabelText('Objective: Campaign Message Test')).toHaveTextContent(
      'Review campaign message clarity, tone, claim, audience, and platform assumptions.',
    );
    for (const step of ['Campaign Details', 'Audience', 'Platform Mix', 'Review', 'Run', 'Dashboard', 'Executive Summary', 'Export Review', 'Recommended Next Action']) {
      expect(screen.getByRole('region', { name: 'Reference workflow steps' })).toHaveTextContent(step);
    }
    expect(within(form).getByLabelText('Tone')).toHaveValue('helpful, practical, trust-first');
    expect(within(form).getByLabelText('Claim to review')).toHaveValue(
      'Under 10 minutes is a message assumption for review, not a verified production claim.',
    );
  });

  it('validates minimal required fields and reuses platform validation', () => {
    const form = renderCampaignMessageTest();

    fireEvent.change(within(form).getByLabelText('Campaign name or brand'), { target: { value: '' } });
    fireEvent.change(within(form).getByLabelText('Campaign Message'), { target: { value: '' } });
    for (const platform of ['Facebook', 'TikTok', 'LINE']) {
      fireEvent.click(within(form).getByLabelText(platform));
    }
    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Campaign name or brand is required because the review needs a campaign label. Add a brand or campaign name to continue.');
    expect(screen.getByRole('alert')).toHaveTextContent('Campaign Message is required because the fixture must be reviewed against a visible message. Add the message copy to continue.');
    expect(screen.getByRole('alert')).toHaveTextContent('Select at least one platform because channel context changes review interpretation. Choose one or more platform checkboxes.');
  });

  it('renders dashboard, safety labels, executive summary, export links, and recommended next action', () => {
    const form = renderCampaignMessageTest();

    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('heading', { name: 'Offline campaign-message test ready for executive review' })).toBeInTheDocument();
    for (const heading of ['Overall Reaction', 'Message Clarity', 'Tone Fit', 'Claim Readiness', 'Platform Fit']) {
      expect(screen.getByText(heading)).toBeInTheDocument();
    }
    expect(screen.getByRole('region', { name: 'Recommended next action' })).toHaveTextContent(
      'message-readiness test',
    );
    expect(screen.getByText('Open result dashboard')).toBeInTheDocument();
    expect(screen.getByText('Open export-readiness preview')).toBeInTheDocument();
    expect(document.body.textContent).toContain('Safety: offline fixture for planning only');
    expect(document.body.textContent?.toLowerCase()).not.toContain('socialsense');
    expect(document.body.textContent?.toLowerCase()).not.toContain('campaign_response');
  });

  it('routes Campaign Message Test dashboard and export review from the generated sample run id', () => {
    renderAt('/runs/3c-m5-campaign-message-test-reference-workflow');
    expect(screen.getByRole('heading', { name: 'Campaign Message Test Results' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Offline campaign-message test ready for executive review' })).toBeInTheDocument();
  });
});

describe('A/B Experiment workflow', () => {
  it('is available as the third workbench reference workflow with minimal variant inputs', () => {
    const form = renderAbExperiment();

    expect(screen.getByRole('heading', { name: 'A/B Experiment' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Current workflow' })).toHaveTextContent('A/B Experiment mode');
    expect(within(form).getByLabelText('Objective: A/B Experiment')).toHaveTextContent(
      'Review two campaign message variants with shared audience, platform, and safety assumptions.',
    );
    expect(within(form).getByLabelText('Variant A')).toHaveValue('Healthy lunch decisions in under 10 minutes for busy urban teams.');
    expect(within(form).getByLabelText('Variant B')).toHaveValue('Team lunch made simple with reviewed nutrition cues and dependable delivery windows.');
    expect(within(form).getByLabelText('Tone')).toHaveValue('helpful, practical, trust-first');
    for (const step of ['Variant A', 'Variant B', 'Review', 'Run', 'Comparison Dashboard', 'Executive Summary', 'Export Review', 'Recommended Next Action']) {
      expect(screen.getByRole('region', { name: 'Reference workflow steps' })).toHaveTextContent(step);
    }
    expect(screen.getByRole('region', { name: 'Current assumptions' })).toHaveTextContent('Variant A');
    expect(screen.getByRole('region', { name: 'Current assumptions' })).toHaveTextContent('Variant B');
  });

  it('requires both A/B variants before running', () => {
    const form = renderAbExperiment();

    fireEvent.change(within(form).getByLabelText('Variant A'), { target: { value: '' } });
    fireEvent.change(within(form).getByLabelText('Variant B'), { target: { value: '' } });
    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Both A/B variants are required because the comparison needs two visible alternatives. Add Variant A and Variant B copy to continue.');
    expect(screen.queryByRole('heading', { name: 'Offline A/B experiment ready for executive review' })).not.toBeInTheDocument();
  });

  it('renders comparison dashboard, reusable export links, and safety labels after run', () => {
    const form = renderAbExperiment();

    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('heading', { name: 'Offline A/B experiment ready for executive review' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('Variant decision frame');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('Inconclusive / needs evidence');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('Low directional confidence');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('Parity check');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('Shared Criteria');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('message clarity');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('Blocked Actions');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('winner selection');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('production launch');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('conversion optimization');
    expect(screen.getByRole('region', { name: 'Variant comparison' })).toHaveTextContent('automated targeting');
    for (const heading of ['Overall Reaction', 'Message Clarity', 'Tone Fit', 'Claim Readiness', 'Platform Fit', 'Decision Status']) {
      expect(screen.getByText(heading)).toBeInTheDocument();
    }
    expect(screen.getAllByText('Variant A').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Variant B').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('region', { name: 'Recommended next action' })).toHaveTextContent('A/B message-readiness test');
    expect(screen.getByText('Open result dashboard')).toBeInTheDocument();
    expect(screen.getByText('Open export-readiness preview')).toBeInTheDocument();
    expect(document.body.textContent).toContain('Safety: offline fixture for planning only');
  });

  it('routes A/B Experiment dashboard from the generated sample run id', () => {
    renderAt('/runs/3c-m7-ab-experiment-reference-workflow');
    expect(screen.getByRole('heading', { name: 'A/B Experiment Results' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Offline A/B experiment ready for executive review' })).toBeInTheDocument();
  });
});

describe('Export review', () => {
  it.each([
    ['/exports/sample-run', 'Product Launch executive-ready summary'],
    ['/exports/3c-m5-campaign-message-test-reference-workflow', 'Campaign Message Test executive-ready summary'],
    ['/exports/3c-m7-ab-experiment-reference-workflow', 'A/B Experiment executive-ready summary'],
    ['/exports/3c-m15-creative-comparison-reference-workflow', 'Creative Comparison executive-ready summary'],
  ])('renders supported formats, status, executive preview, and safety limitations for %s', (pathname, summaryHeading) => {
    renderAt(pathname);

    expect(screen.getByRole('heading', { name: 'Ready for human review' })).toBeInTheDocument();
    for (const format of ['Data preview (JSON)', 'Briefing preview (Markdown)', 'Executive summary preview']) {
      expect(screen.getByText(format)).toBeInTheDocument();
      expect(screen.getAllByText('Preview ready for review').length).toBeGreaterThanOrEqual(1);
    }
    expect(screen.getByText(/not a download action/i)).toBeInTheDocument();
    expect(document.body.textContent?.toLowerCase()).not.toContain('downloadable file is ready');
    expect(screen.getByRole('heading', { name: summaryHeading })).toBeInTheDocument();
    expect(screen.getByText(/Executive review:/)).toBeInTheDocument();
    expect(screen.getByText('Review Assumptions')).toBeInTheDocument();
    expect(screen.getByText('Evidence Gaps')).toBeInTheDocument();
    expect(screen.getByText('Limitations')).toBeInTheDocument();
    expect(screen.getByText('Offline sample basis')).toBeInTheDocument();
    expect(screen.getByText('Reviewed offline sample, no live data')).toBeInTheDocument();
    expect(document.body.textContent?.toLowerCase()).not.toContain('socialsense');
    expect(screen.getByText(/Directional synthetic aggregate sample/)).toBeInTheDocument();
    expect(screen.getByText(/Synthetic aggregate sample/)).toBeInTheDocument();
    expect(screen.getByText(/No PII, CRM lists, private messages, or voter lists/)).toBeInTheDocument();
  });
});
