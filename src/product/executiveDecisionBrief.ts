import type { ExecutiveInsightForm, ExecutiveInsights } from './executiveInsights';
import type { PlatformEngagementResult } from './platformEngagement';
import { PLATFORM_LABELS, type SimulationConfiguration } from './simulationConfig';

type ExecutiveDecisionBriefFixture = {
  summary: {
    headline: string;
    text: string;
  };
  cards: Array<{
    title: string;
    value: string;
    detail: string;
  }>;
  exports: {
    readiness: string;
    executiveSummaryPreview: string;
  };
  reviewMetadata: {
    limitations: string[];
    evidenceGaps: string[];
    uncertainty: string;
  };
  recommendedNextTest: string;
};

export type BriefField = {
  label: string;
  value: string;
};

export type BriefParticipantAllocation = {
  platform: string;
  syntheticParticipants: number;
};

export type ExecutiveDecisionOption = {
  label: 'Proceed with review' | 'Revise message/creative' | 'Run another experiment' | 'Hold for more evidence';
  evidenceBasis: string;
  confidence: string;
  limitations: string[];
  blockedActions: string[];
};

export type ExecutiveDecisionBrief = {
  modelVersion: 'm19-pr5-executive-decision-brief-v1';
  campaignContext: {
    userInputs: BriefField[];
    selectedPlatforms: string[];
    simulationProfile: SimulationConfiguration['simulationProfile'];
    evidenceDepth: SimulationConfiguration['evidenceDepth'];
    configurationSource: SimulationConfiguration['configurationSource'];
    runtimeStatus: 'configuration_only';
    participantAllocations: BriefParticipantAllocation[];
  };
  currentSituation: {
    headline: string;
    narrative: string;
  };
  platformFindings: Array<{
    platform: string;
    directionalFit: number;
    syntheticParticipants: number;
    evidenceBasis: string;
  }>;
  syntheticEngagementSummary: {
    totalSyntheticParticipants: number;
    averageSyntheticReactionIndex: number;
    totalSyntheticComments: number;
    strongestDirectionalFit: { platform: string; score: number };
    weakestDirectionalFit: { platform: string; score: number };
    topThemes: string[];
    topConcerns: string[];
  };
  executiveKpiSnapshot: Array<{
    title: string;
    value: string;
    detail: string;
  }>;
  evidence: {
    items: string[];
    confidence: string;
    limitations: string[];
  };
  risks: string[];
  limitations: string[];
  decisionOptions: ExecutiveDecisionOption[];
  decisionBlockers: string[];
  recommendedNextAction: {
    action: string;
    nextReviewStep: string;
  };
  notices: {
    synthetic: string;
    offline: string;
  };
};

const blockedActions = [
  'launch approval',
  'winner selection',
  'conversion guarantee claims',
  'budget approval from this brief alone',
  'production campaign activation',
];

export function buildExecutiveDecisionBrief({
  fixture,
  form,
  simulationConfig,
  platformEngagement,
  executiveInsights,
}: {
  fixture: ExecutiveDecisionBriefFixture;
  form: ExecutiveInsightForm;
  simulationConfig: SimulationConfiguration;
  platformEngagement: PlatformEngagementResult;
  executiveInsights: ExecutiveInsights;
}): ExecutiveDecisionBrief {
  const selectedPlatforms = simulationConfig.selectedPlatforms.map((platform) => PLATFORM_LABELS[platform]);
  const participantAllocations = simulationConfig.selectedPlatforms.map((platform) => ({
    platform: PLATFORM_LABELS[platform],
    syntheticParticipants: simulationConfig.platformAllocations[platform],
  }));
  const sortedByReaction = [...platformEngagement.platforms].sort(
    (left, right) => right.syntheticReactionIndex - left.syntheticReactionIndex || right.syntheticParticipants - left.syntheticParticipants,
  );
  const strongest = sortedByReaction[0];
  const weakest = sortedByReaction[sortedByReaction.length - 1];
  const limitations = boundedList(fixture.reviewMetadata.limitations, [
    'Synthetic/offline evidence only; approved field evidence is not attached.',
  ], 4);
  const evidenceGaps = boundedList(fixture.reviewMetadata.evidenceGaps, [
    'Human review evidence gap remains open before external use.',
  ], 3);
  const confidence = 'Low directional confidence; E1 synthetic/offline fixture evidence only.';
  const evidenceBasis = 'E1 synthetic/offline fixture plus submitted simulation configuration snapshot.';

  return {
    modelVersion: 'm19-pr5-executive-decision-brief-v1',
    campaignContext: {
      userInputs: [
        { label: 'Campaign name or brand', value: form.brand || 'Review assumption required' },
        { label: 'Campaign Message', value: form.campaignMessage || fixture.summary.text },
        { label: 'Audience', value: form.audiences.join(', ') || 'General Consumers' },
      ],
      selectedPlatforms,
      simulationProfile: simulationConfig.simulationProfile,
      evidenceDepth: simulationConfig.evidenceDepth,
      configurationSource: simulationConfig.configurationSource,
      runtimeStatus: 'configuration_only',
      participantAllocations,
    },
    currentSituation: {
      headline: fixture.summary.headline,
      narrative: fixture.exports.executiveSummaryPreview,
    },
    platformFindings: platformEngagement.platforms.map((platform) => ({
      platform: platform.platform,
      directionalFit: platform.syntheticReactionIndex,
      syntheticParticipants: platform.syntheticParticipants,
      evidenceBasis: 'Submitted configuration snapshot; synthetic/offline selected-platform planning cue.',
    })),
    syntheticEngagementSummary: {
      totalSyntheticParticipants: platformEngagement.crossPlatformSummary.totalSyntheticParticipants,
      averageSyntheticReactionIndex: platformEngagement.crossPlatformSummary.averageSyntheticReactionIndex,
      totalSyntheticComments: platformEngagement.crossPlatformSummary.totalSyntheticComments,
      strongestDirectionalFit: {
        platform: strongest?.platform ?? 'None',
        score: strongest?.syntheticReactionIndex ?? 0,
      },
      weakestDirectionalFit: {
        platform: weakest?.platform ?? 'None',
        score: weakest?.syntheticReactionIndex ?? 0,
      },
      topThemes: platformEngagement.themes.slice(0, 3).map((theme) => theme.label),
      topConcerns: evidenceGaps,
    },
    executiveKpiSnapshot: executiveInsights.insightCards.map((card) => ({
      title: card.title,
      value: card.value,
      detail: card.detail,
    })),
    evidence: {
      items: [
        'reviewed user assumptions',
        'submitted simulation configuration',
        'synthetic platform engagement result model',
        'executive insights from offline fixture',
      ],
      confidence,
      limitations,
    },
    risks: [
      'Evidence remains directional and requires human review before external use.',
      'Market, compliance, and production performance risks are unmeasured.',
      'Platform differences are configuration-owned planning cues, not field observations.',
    ],
    limitations,
    decisionOptions: buildDecisionOptions(evidenceBasis, confidence, limitations),
    decisionBlockers: [
      ...evidenceGaps,
      'Approved comparable field evidence is not attached.',
      'Human review is required before budget, external, or production use.',
    ],
    recommendedNextAction: {
      action: fixture.recommendedNextTest,
      nextReviewStep: 'Proceed to a small human review step and collect approved evidence before any external action.',
    },
    notices: {
      synthetic: 'Synthetic/offline aggregate brief only; not field evidence.',
      offline: 'Configuration-only offline review; no live service or production campaign system is invoked.',
    },
  };
}

function buildDecisionOptions(evidenceBasis: string, confidence: string, limitations: string[]): ExecutiveDecisionOption[] {
  return [
    {
      label: 'Proceed with review',
      evidenceBasis,
      confidence,
      limitations,
      blockedActions,
    },
    {
      label: 'Revise message/creative',
      evidenceBasis: `${evidenceBasis} Use concerns and themes as revision prompts only.`,
      confidence,
      limitations,
      blockedActions,
    },
    {
      label: 'Run another experiment',
      evidenceBasis: `${evidenceBasis} Use only as input for the next small reviewed evidence step.`,
      confidence,
      limitations,
      blockedActions,
    },
    {
      label: 'Hold for more evidence',
      evidenceBasis: `${evidenceBasis} Hold when gaps are unacceptable for review stakeholders.`,
      confidence,
      limitations,
      blockedActions,
    },
  ];
}

function boundedList(values: string[], fallback: string[], limit: number): string[] {
  const source = values.length > 0 ? values : fallback;
  return source.slice(0, limit);
}
