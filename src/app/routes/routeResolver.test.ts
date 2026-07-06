import { describe, expect, it } from 'vitest';
import { resolveRoute } from './routeResolver';

describe('resolveRoute', () => {
  it.each([
    ['/', 'home', undefined],
    ['/workbench', 'workbench', undefined],
    ['/workbench/', 'workbench', undefined],
    ['/campaign-workspace', 'campaignWorkspace', undefined],
    ['/campaign-workspace/', 'campaignWorkspace', undefined],
    ['/workbench/campaign-message-test', 'campaignMessageTest', undefined],
    ['/workbench/ab-experiment', 'abExperiment', undefined],
    ['/health', 'health', undefined],
    ['/runs/sample-run', 'runDashboard', 'sample-run'],
    ['/exports/run%201', 'exportReview', 'run 1'],
  ])('resolves %s', (pathname, name, runId) => {
    const route = resolveRoute(pathname);

    expect(route.name).toBe(name);
    expect(route.runId).toBe(runId);
  });

  it('returns notFound for route sprawl or unknown paths', () => {
    expect(resolveRoute('/settings').name).toBe('notFound');
    expect(resolveRoute('/runs/a/b').name).toBe('notFound');
    expect(resolveRoute('/exports').name).toBe('notFound');
  });
});
