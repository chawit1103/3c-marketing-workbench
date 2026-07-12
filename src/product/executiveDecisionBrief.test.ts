import { describe, expect, it } from 'vitest';
import productLaunchFixture from './fixtures/productLaunchResult.json';
import { buildExecutiveInsights } from './executiveInsights';
import { buildExecutiveDecisionBrief } from './executiveDecisionBrief';
import { buildPlatformEngagementResult } from './platformEngagement';
import {
  createDefaultSimulationConfiguration,
  updateEvidenceDepth,
  updatePlatformAllocationDraft,
  updateSelectedPlatforms,
} from './simulationConfig';

const forbiddenBriefClaims = [
  'runtime consumption',
  'socialsense consumption',
  'measured engagement',
  'real-user',
  'real user',
  'winner selected',
  'approved for launch',
  'conversion guaranteed',
  'download',
  'pdf',
  'ppt',
  'powerpoint',
];

describe('M19 PR5 executive decision brief model', () => {
  it('builds a narrative brief from submitted assumptions, submitted configuration snapshot, platform engagement, and executive insights', () => {
    const withFacebook = updatePlatformAllocationDraft(
      createDefaultSimulationConfiguration(['Facebook', 'LINE', 'TikTok']),
      'facebook',
      '120',
    );
    const withLine = updatePlatformAllocationDraft(withFacebook, 'line', '60');
    const submittedConfig = updateEvidenceDepth(updateSelectedPlatforms(withLine, ['Facebook', 'LINE']), 'expanded');
    const platformEngagement = buildPlatformEngagementResult(submittedConfig);
    const form = {
      brand: 'Acme Halo',
      campaignMessage: 'Reviewed executive campaign message.',
      audiences: ['Working Adults', 'SME Owners'],
      platforms: ['Facebook', 'LINE'],
    };
    const executiveInsights = buildExecutiveInsights({
      fixture: productLaunchFixture,
      form,
      simulationConfig: submittedConfig,
      platformEngagement,
    });

    const brief = buildExecutiveDecisionBrief({
      fixture: productLaunchFixture,
      form,
      simulationConfig: submittedConfig,
      platformEngagement,
      executiveInsights,
    });

    expect(brief.modelVersion).toBe('m19-pr5-executive-decision-brief-v1');
    expect(brief.campaignContext.userInputs).toEqual(expect.arrayContaining([
      { label: 'Campaign name or brand', value: 'Acme Halo' },
      { label: 'Campaign Message', value: 'Reviewed executive campaign message.' },
    ]));
    expect(brief.campaignContext.selectedPlatforms).toEqual(['Facebook', 'LINE']);
    expect(brief.campaignContext.simulationProfile).toBe('product_launch');
    expect(brief.campaignContext.participantAllocations).toEqual([
      { platform: 'Facebook', syntheticParticipants: 120 },
      { platform: 'LINE', syntheticParticipants: 60 },
    ]);
    expect(brief.syntheticEngagementSummary.totalSyntheticParticipants).toBe(180);
    expect(brief.syntheticEngagementSummary.strongestDirectionalFit.platform).toBe('LINE');
    expect(brief.syntheticEngagementSummary.weakestDirectionalFit.platform).toBe('Facebook');
    expect(brief.executiveKpiSnapshot).toEqual(expect.arrayContaining([
      expect.objectContaining({ title: 'Configuration scope' }),
      expect.objectContaining({ title: 'Platform planning cue' }),
      expect.objectContaining({ title: 'Review readiness' }),
    ]));
    expect(brief.evidence.items.join(' ')).toContain('submitted simulation configuration');
    expect(brief.recommendedNextAction.nextReviewStep).toContain('review');
  });

  it('provides exactly four cautious decision options with evidence, confidence, limitations, and blocked actions', () => {
    const config = createDefaultSimulationConfiguration(['Facebook', 'LINE']);
    const platformEngagement = buildPlatformEngagementResult(config);
    const form = {
      brand: 'Nimbus Go',
      campaignMessage: 'Reviewed message',
      audiences: ['Working Adults'],
      platforms: ['Facebook', 'LINE'],
    };
    const executiveInsights = buildExecutiveInsights({ fixture: productLaunchFixture, form, simulationConfig: config, platformEngagement });

    const brief = buildExecutiveDecisionBrief({ fixture: productLaunchFixture, form, simulationConfig: config, platformEngagement, executiveInsights });

    expect(brief.decisionOptions.map((option) => option.label)).toEqual([
      'Proceed with review',
      'Revise message/creative',
      'Run another experiment',
      'Hold for more evidence',
    ]);
    for (const option of brief.decisionOptions) {
      expect(option.evidenceBasis).toContain('E1 synthetic/offline');
      expect(option.confidence).toContain('Low directional');
      expect(option.limitations.length).toBeGreaterThan(0);
      expect(option.blockedActions).toEqual(expect.arrayContaining([
        'launch approval',
        'winner selection',
        'conversion guarantee claims',
      ]));
    }
  });

  it('keeps the brief synthetic/offline and excludes downloads, live/runtime, winner, launch, and guarantee claims', () => {
    const config = createDefaultSimulationConfiguration(['Facebook', 'LINE']);
    const platformEngagement = buildPlatformEngagementResult(config);
    const form = {
      brand: 'Nimbus Go',
      campaignMessage: 'Reviewed message',
      audiences: ['Working Adults'],
      platforms: ['Facebook', 'LINE'],
    };
    const executiveInsights = buildExecutiveInsights({ fixture: productLaunchFixture, form, simulationConfig: config, platformEngagement });

    const text = JSON.stringify(buildExecutiveDecisionBrief({ fixture: productLaunchFixture, form, simulationConfig: config, platformEngagement, executiveInsights })).toLowerCase();

    expect(text).toContain('synthetic/offline');
    expect(text).toContain('configuration-only');
    expect(text).toContain('human review');
    for (const forbidden of forbiddenBriefClaims) {
      expect(text).not.toContain(forbidden);
    }
  });
});
