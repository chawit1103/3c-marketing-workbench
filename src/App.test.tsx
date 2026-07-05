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

describe('App shell routes', () => {
  it.each([
    ['/', 'Compare marketing scenarios safely before budget decisions.'],
    ['/workbench', 'Product Launch Simulation'],
    ['/runs/run-123', 'Product Launch Results'],
    ['/exports/run-123', 'Export Review'],
    ['/health', 'Product Launch readiness'],
  ])('renders %s with safety labels', (pathname, heading) => {
    renderAt(pathname);

    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    const safetyPanel = screen.getByRole('region', { name: 'Safety boundaries' });
    for (const label of safetyLabels) {
      expect(within(safetyPanel).getByText(label)).toBeInTheDocument();
    }
  });

  it('renders simple shell navigation', () => {
    renderAt('/');

    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(within(nav).getByRole('link', { name: 'Workbench' })).toHaveAttribute('href', '/workbench');
    expect(within(nav).getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/runs/sample-run');
    expect(within(nav).getByRole('link', { name: 'Export review' })).toHaveAttribute('href', '/exports/sample-run');
    expect(within(nav).getByRole('link', { name: 'Health' })).toHaveAttribute('href', '/health');
  });

  it('keeps internal platform terms out of visible primary UI', () => {
    const hiddenInternalTerms = [
      'provenance object',
      'sdk',
      'fixture runtime',
      'domain pack',
      'dashboard contract',
      'registry',
    ];

    for (const pathname of ['/', '/workbench', '/runs/sample-run', '/exports/sample-run', '/health', '/unknown-route']) {
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

describe('Product Launch workflow', () => {
  it('renders the guided Product Launch form with locked default objective', () => {
    const form = renderWorkbench();

    expect(screen.getByRole('heading', { name: 'Product Launch Simulation' })).toBeInTheDocument();
    const objective = within(form).getByLabelText('Objective');
    expect(objective).toHaveValue('Product Launch');
    expect(objective).toBeDisabled();
    expect(within(form).getByLabelText('Brand/Product')).toHaveValue('Nimbus Go');
  });

  it('validates brand, campaign message, and platform requirements', () => {
    const form = renderWorkbench();

    fireEvent.change(within(form).getByLabelText('Brand/Product'), { target: { value: '' } });
    fireEvent.change(within(form).getByLabelText('Campaign Message'), { target: { value: '' } });
    for (const platform of ['Facebook', 'TikTok', 'LINE']) {
      fireEvent.click(within(form).getByLabelText(platform));
    }
    fireEvent.click(within(form).getByRole('button', { name: 'Run offline simulation' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Brand/Product is required.');
    expect(screen.getByRole('alert')).toHaveTextContent('Campaign Message is required.');
    expect(screen.getByRole('alert')).toHaveTextContent('Select at least one platform.');
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
    for (const heading of [
      'Overall Reaction',
      'Message Acceptance',
      'Brand Perception',
      'Engagement Potential',
      'Synthetic Purchase Intent',
      'Platform Breakdown',
      'Audience Insights',
      'Risks / Caveats',
      'Recommended Next Test',
    ]) {
      expect(screen.getByText(heading)).toBeInTheDocument();
    }
    expect(screen.getByText('Open export review')).toBeInTheDocument();
    expect(screen.getByText(/not recalculated from arbitrary browser-entered data/i)).toBeInTheDocument();
  });
});

describe('Export review', () => {
  it('renders supported formats, status, executive preview, and safety limitations', () => {
    renderAt('/exports/sample-run');

    expect(screen.getByRole('heading', { name: 'Ready for human review' })).toBeInTheDocument();
    for (const format of ['JSON', 'Markdown', 'Executive Summary']) {
      expect(screen.getByText(format)).toBeInTheDocument();
      expect(screen.getAllByText('Available for review').length).toBeGreaterThanOrEqual(1);
    }
    expect(screen.getByRole('heading', { name: 'Executive-ready summary' })).toBeInTheDocument();
    expect(screen.getByText(/planning prompt for human review/)).toBeInTheDocument();
    expect(screen.getByText('Review Assumptions')).toBeInTheDocument();
    expect(screen.getByText('Evidence Gaps')).toBeInTheDocument();
    expect(screen.getByText('Limitations')).toBeInTheDocument();
    expect(screen.getByText('Offline sample basis')).toBeInTheDocument();
    expect(screen.getByText('Reviewed SocialSense sample, no live data')).toBeInTheDocument();
    expect(screen.getByText(/Directional synthetic aggregate sample only/)).toBeInTheDocument();
    expect(document.body.textContent?.toLowerCase()).not.toContain('socialsense_core_not_executed');
    expect(screen.getByText(/Synthetic aggregate sample/)).toBeInTheDocument();
    expect(screen.getByText(/No PII, CRM lists, private messages, or voter lists/)).toBeInTheDocument();
  });
});
