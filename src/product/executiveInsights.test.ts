import { describe, expect, it } from 'vitest';
import productLaunchFixture from './fixtures/productLaunchResult.json';
import { buildExecutiveInsights } from './executiveInsights';
import { buildPlatformEngagementResult } from './platformEngagement';
import {
  createDefaultSimulationConfiguration,
  updateEvidenceDepth,
  updatePlatformAllocationDraft,
  updateSelectedPlatforms,
} from './simulationConfig';

const forbiddenGuidanceFragments = [
  'predict',
  'prediction',
  'guarantee',
  'guaranteed',
  'accurate',
  'accuracy',
  'approve launch',
  'launch approval',
  'winner',
  'optimize persuasion',
  'persuasion optimization',
];

describe('M19 PR4 executive insight dashboard model', () => {
  it('derives executive insight cards from PR1 assumptions, PR2 configuration, and PR3 platform engagement inputs', () => {
    const withCustomFacebook = updatePlatformAllocationDraft(
      createDefaultSimulationConfiguration(['Facebook', 'LINE']),
      'facebook',
      '120',
    );
    const config = updateEvidenceDepth(updatePlatformAllocationDraft(withCustomFacebook, 'line', '60'), 'deep');
    const platformEngagement = buildPlatformEngagementResult(config);

    const result = buildExecutiveInsights({
      fixture: productLaunchFixture,
      form: {
        brand: 'Acme Halo',
        campaignMessage: 'A reviewed message entered by the user.',
        audiences: ['Working Adults', 'SME Owners'],
        platforms: ['Facebook', 'LINE'],
      },
      simulationConfig: config,
      platformEngagement,
    });

    expect(result.insightCards).toEqual([
      expect.objectContaining({
        title: 'Review assumption snapshot',
        value: 'Acme Halo',
        detail: 'A reviewed message entered by the user.',
        source: 'reviewed user assumptions + offline fixture summary',
      }),
      expect.objectContaining({
        title: 'Configuration scope',
        value: '2 platforms / 180 synthetic participants',
        detail: 'Evidence depth: deep; configuration source: custom.',
        source: 'submitted simulation configuration',
      }),
      expect.objectContaining({
        title: 'Platform planning cue',
        value: 'LINE leads synthetic reaction index',
        detail: 'Average synthetic reaction index 68/100 across selected platforms only.',
        source: 'synthetic platform engagement result model',
      }),
      expect.objectContaining({
        title: 'Review readiness',
        value: 'Ready for human review',
        detail: 'Use as an executive review prompt only; next step remains reviewed evidence gathering.',
        source: 'offline fixture export readiness',
      }),
    ]);
    expect(result.sourceSummary.inputs).toEqual([
      'reviewed user assumptions',
      'submitted simulation configuration',
      'synthetic platform engagement result model',
      'offline fixture',
    ]);
  });

  it('builds platform comparison from selected PR3 platforms only and submitted configuration snapshot values', () => {
    const withHiddenInstagram = updatePlatformAllocationDraft(
      createDefaultSimulationConfiguration(['Facebook', 'TikTok', 'LINE', 'Instagram']),
      'instagram',
      '500',
    );
    const submittedConfig = updateSelectedPlatforms(withHiddenInstagram, ['Facebook', 'LINE']);
    const platformEngagement = buildPlatformEngagementResult(submittedConfig);

    const result = buildExecutiveInsights({
      fixture: productLaunchFixture,
      form: {
        brand: 'Nimbus Go',
        campaignMessage: 'Reviewed message',
        audiences: ['Working Adults'],
        platforms: ['Facebook', 'LINE'],
      },
      simulationConfig: submittedConfig,
      platformEngagement,
    });

    expect(result.platformComparison.map((platform) => platform.platform)).toEqual(['Facebook', 'LINE']);
    expect(result.platformComparison.map((platform) => platform.syntheticParticipants)).toEqual([80, 80]);
    expect(JSON.stringify(result.platformComparison)).not.toContain('Instagram');
    expect(JSON.stringify(result)).not.toContain('500');
    expect(result.platformComparison[0].basis).toBe('submitted configuration snapshot');
  });

  it('states synthetic offline provenance, limitations, and configuration status without live API or runtime claims', () => {
    const config = createDefaultSimulationConfiguration(['Facebook', 'LINE']);
    const resultText = JSON.stringify(buildExecutiveInsights({
      fixture: productLaunchFixture,
      form: {
        brand: 'Nimbus Go',
        campaignMessage: 'Reviewed message',
        audiences: ['Working Adults'],
        platforms: ['Facebook', 'LINE'],
      },
      simulationConfig: config,
      platformEngagement: buildPlatformEngagementResult(config),
    })).toLowerCase();

    for (const required of ['synthetic/offline', 'provenance', 'limitations', 'configuration-only', 'offline fixture']) {
      expect(resultText).toContain(required);
    }
    for (const forbidden of ['live api access', 'runtime consumption', 'consumed by runtime', 'real-user', 'real user', 'measured engagement']) {
      expect(resultText).not.toContain(forbidden);
    }
  });

  it('frames decision guidance as reviewed next-step guidance without performance prediction or launch approval', () => {
    const config = createDefaultSimulationConfiguration(['Facebook', 'LINE']);
    const result = buildExecutiveInsights({
      fixture: productLaunchFixture,
      form: {
        brand: 'Nimbus Go',
        campaignMessage: 'Reviewed message',
        audiences: ['Working Adults'],
        platforms: ['Facebook', 'LINE'],
      },
      simulationConfig: config,
      platformEngagement: buildPlatformEngagementResult(config),
    });

    const guidanceText = result.decisionGuidance.map((item) => `${item.title} ${item.guidance} ${item.reviewStatus}`).join(' ').toLowerCase();
    expect(guidanceText).toContain('reviewed next step');
    expect(guidanceText).toContain('human review');
    expect(guidanceText).toContain('not a launch decision');
    for (const fragment of forbiddenGuidanceFragments) {
      expect(guidanceText).not.toContain(fragment);
    }
  });
});
