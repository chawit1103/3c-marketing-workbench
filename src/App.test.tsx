import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { App } from './App';
import { safetyLabels } from './product/safety/safetyLabels';

function renderAt(pathname: string) {
  vi.stubGlobal('location', { ...window.location, pathname });
  return render(<App />);
}

describe('App shell routes', () => {
  it.each([
    ['/', 'Compare marketing scenarios safely before budget decisions.'],
    ['/workbench', 'Workbench placeholder'],
    ['/runs/run-123', 'Executive dashboard placeholder'],
    ['/exports/run-123', 'Export review placeholder'],
    ['/health', 'Scaffold readiness'],
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
      'runtime',
      'domain pack',
      'dashboard contract',
      'registry',
    ];

    for (const pathname of ['/', '/workbench', '/runs/sample-run', '/exports/sample-run', '/health']) {
      const { unmount } = renderAt(pathname);
      const visibleText = document.body.textContent?.toLowerCase() ?? '';

      for (const term of hiddenInternalTerms) {
        expect(visibleText).not.toContain(term);
      }

      unmount();
    }
  });
});
