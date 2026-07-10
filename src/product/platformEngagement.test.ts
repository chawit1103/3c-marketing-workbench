import { describe, expect, it } from 'vitest';
import {
  createDefaultSimulationConfiguration,
  updatePlatformAllocationDraft,
  updateSelectedPlatforms,
} from './simulationConfig';
import { buildPlatformEngagementResult } from './platformEngagement';

const forbiddenClaimFragments = [
  'live platform users',
  'live api access',
  'measured engagement',
  'real users',
  'demographic truth',
  'prediction',
  'accuracy guarantee',
  'confidence guarantee',
  'guaranteed accuracy',
  'guaranteed confidence',
];

describe('M19 PR3 platform engagement result model', () => {
  it('derives deterministic platform metrics from selected PR2 platform configuration', () => {
    const base = createDefaultSimulationConfiguration(['Facebook', 'LINE']);
    const customFacebook = updatePlatformAllocationDraft(base, 'facebook', '120');
    const config = updatePlatformAllocationDraft(customFacebook, 'line', '60');

    const first = buildPlatformEngagementResult(config);
    const second = buildPlatformEngagementResult(config);

    expect(first).toEqual(second);
    expect(first.platforms.map((platform) => platform.platform)).toEqual(['Facebook', 'LINE']);
    expect(first.platforms[0]).toMatchObject({
      platformKey: 'facebook',
      platform: 'Facebook',
      syntheticParticipants: 120,
      syntheticReachIndex: 92,
      syntheticReactionIndex: 67,
      syntheticCommentCount: 10,
      syntheticShareIntentIndex: 48,
      evidenceDepth: 'standard',
    });
    expect(first.platforms[1]).toMatchObject({
      platformKey: 'line',
      platform: 'LINE',
      syntheticParticipants: 60,
      syntheticReachIndex: 72,
      syntheticReactionIndex: 69,
      syntheticCommentCount: 5,
      syntheticShareIntentIndex: 51,
      evidenceDepth: 'standard',
    });
    expect(first.crossPlatformSummary.totalSyntheticParticipants).toBe(180);
    expect(first.crossPlatformSummary.averageSyntheticReactionIndex).toBe(68);
  });

  it('excludes unselected platforms even when allocation values exist', () => {
    const withHiddenAllocation = updatePlatformAllocationDraft(
      createDefaultSimulationConfiguration(['Facebook', 'TikTok', 'LINE']),
      'instagram',
      '500',
    );
    const config = updateSelectedPlatforms(withHiddenAllocation, ['Facebook']);

    const result = buildPlatformEngagementResult(config);

    expect(result.platforms.map((platform) => platform.platform)).toEqual(['Facebook']);
    expect(JSON.stringify(result)).not.toContain('Instagram');
    expect(result.crossPlatformSummary.totalSyntheticParticipants).toBe(80);
  });

  it('includes synthetic comments, themes, cross-platform summary, and offline provenance safety status', () => {
    const result = buildPlatformEngagementResult(createDefaultSimulationConfiguration(['TikTok', 'YouTube']));

    expect(result.syntheticComments.length).toBeGreaterThanOrEqual(2);
    expect(result.syntheticComments[0]).toMatchObject({ platform: 'TikTok', safetyStatus: 'synthetic_offline' });
    expect(result.themes.map((theme) => theme.label)).toEqual([
      'Message clarity',
      'Trust proof needed',
      'Channel fit hypothesis',
    ]);
    expect(result.crossPlatformSummary.platformCount).toBe(2);
    expect(result.source.provenance).toBe('configuration_owned_offline_fixture');
    expect(result.source.runtimeStatus).toBe('configuration_only');
    expect(result.source.safetyStatus).toBe('synthetic_offline_not_live_measurement');
    expect(result.source.disclaimer).toContain('synthetic/offline');
  });

  it('does not claim live users, live APIs, measured engagement, demographic truth, prediction, accuracy, or confidence guarantees', () => {
    const resultText = JSON.stringify(
      buildPlatformEngagementResult(createDefaultSimulationConfiguration(['Facebook', 'LINE'])),
    ).toLowerCase();

    for (const fragment of forbiddenClaimFragments) {
      expect(resultText).not.toContain(fragment);
    }
    expect(resultText).toContain('not live');
    expect(resultText).toContain('not measured');
    expect(resultText).toContain('not a forecast');
  });
});
