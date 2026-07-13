import type { PlatformEngagementResult } from './platformEngagement';
import { PLATFORM_LABELS, type SimulationConfiguration } from './simulationConfig';
import { buildRuntimeTraceability, type RuntimeEvidence, type RuntimeTraceability } from './runtimeTraceability';

export type ExecutiveInsightForm = {
  brand: string;
  campaignMessage: string;
  audiences: string[];
  platforms: string[];
};

type ExecutiveInsightFixture = {
  summary: {
    headline: string;
    text: string;
  };
  exports: {
    readiness: string;
  };
  reviewMetadata: {
    provenance?: unknown;
    limitations: string[];
    evidenceGaps: string[];
  };
  recommendedNextTest: string;
};

export type ExecutiveInsightCard = {
  title: string;
  value: string;
  detail: string;
  source: string;
};

export type ExecutivePlatformComparison = {
  platformKey: string;
  platform: string;
  syntheticParticipants: number;
  syntheticReactionIndex: number;
  syntheticReachIndex: number;
  basis: 'submitted configuration snapshot';
  interpretation: string;
};

export type ExecutiveEvidenceItem = {
  title: string;
  status: string;
  detail: string;
  detailFragments?: string[];
  detailType?: 'configurationStatus';
  selectedPlatformLabels?: string[];
};

export type ExecutiveDecisionGuidance = {
  title: string;
  reviewStatus: string;
  guidance: string;
};

export type ExecutiveInsights = {
  modelVersion: 'm20-pr5-executive-insight-dashboard-v1';
  insightCards: ExecutiveInsightCard[];
  platformComparison: ExecutivePlatformComparison[];
  evidenceVisualization: ExecutiveEvidenceItem[];
  decisionGuidance: ExecutiveDecisionGuidance[];
  sourceSummary: {
    inputs: string[];
    status: 'synthetic_offline_configuration_only' | 'synthetic_offline_runtime_consumed';
    limitations: string[];
  };
  traceability: RuntimeTraceability;
};

export function buildExecutiveInsights({
  fixture,
  form,
  simulationConfig,
  platformEngagement,
  runtimeEvidence,
}: {
  fixture: ExecutiveInsightFixture;
  form: ExecutiveInsightForm;
  simulationConfig: SimulationConfiguration;
  platformEngagement: PlatformEngagementResult;
  runtimeEvidence?: RuntimeEvidence;
}): ExecutiveInsights {
  const configuredLabels = simulationConfig.selectedPlatforms.map((platform) => PLATFORM_LABELS[platform]);
  const totalParticipants = platformEngagement.crossPlatformSummary.totalSyntheticParticipants;
  const leadingPlatform = platformEngagement.crossPlatformSummary.leadingSyntheticPlatform;
  const averageReaction = platformEngagement.crossPlatformSummary.averageSyntheticReactionIndex;
  const firstLimitation = fixture.reviewMetadata.limitations[0] ?? 'Synthetic/offline limitation remains visible for executive review.';
  const firstEvidenceGap = fixture.reviewMetadata.evidenceGaps[0] ?? 'Human review evidence gap remains open.';
  const traceability = buildRuntimeTraceability(simulationConfig, runtimeEvidence);
  const runtimeConsumed = traceability.runtimeStatus === 'consumed_by_runtime';

  return {
    modelVersion: 'm20-pr5-executive-insight-dashboard-v1',
    insightCards: [
      {
        title: 'Review assumption snapshot',
        value: form.brand || 'Review assumption required',
        detail: form.campaignMessage || fixture.summary.text,
        source: 'reviewed user assumptions + offline fixture summary',
      },
      {
        title: 'Configuration scope',
        value: `${simulationConfig.selectedPlatforms.length} platforms / ${totalParticipants} synthetic participants`,
        detail: `Evidence depth: ${simulationConfig.evidenceDepth}; configuration source: ${simulationConfig.configurationSource}; runtime status: ${runtimeConsumed ? 'consumed by verified offline configuration check' : 'configuration-only fallback'}.`,
        source: runtimeConsumed ? 'submitted simulation configuration + verified offline configuration contract' : 'submitted simulation configuration',
      },
      {
        title: 'Platform planning cue',
        value: `${leadingPlatform} leads synthetic reaction index`,
        detail: `Average synthetic reaction index ${averageReaction}/100 across selected platforms only.`,
        source: 'synthetic platform engagement result model',
      },
      {
        title: 'Review readiness',
        value: fixture.exports.readiness,
        detail: 'Use as an executive review prompt only; next step remains reviewed evidence gathering.',
        source: 'offline fixture export readiness',
      },
    ],
    platformComparison: platformEngagement.platforms.map((platform) => ({
      platformKey: platform.platformKey,
      platform: platform.platform,
      syntheticParticipants: platform.syntheticParticipants,
      syntheticReactionIndex: platform.syntheticReactionIndex,
      syntheticReachIndex: platform.syntheticReachIndex,
      basis: 'submitted configuration snapshot' as const,
      interpretation: 'Synthetic/offline selected-platform planning cue only; not measured platform performance.',
    })),
    evidenceVisualization: [
      {
        title: 'Provenance',
        status: 'synthetic/offline provenance',
        detail: 'Derived from offline fixture, reviewed assumptions, submitted simulation configuration, and synthetic platform engagement results.',
      },
      {
        title: 'Configuration status',
        status: runtimeConsumed ? 'runtime-consumed' : 'configuration-only',
        detail: runtimeConsumed ? 'Selected platforms match the verified offline configuration contract.' : 'Selected platforms remain configuration-only.',
        detailType: 'configurationStatus',
        selectedPlatformLabels: configuredLabels,
      },
      {
        title: 'Limitations',
        status: 'limitations visible',
        detail: `${firstLimitation} Synthetic/offline only; no live data or field evidence is implied.`,
        detailFragments: [
          firstLimitation,
          'Synthetic/offline only; no live data or field evidence is implied.',
        ],
      },
      {
        title: 'Evidence gaps',
        status: 'review required',
        detail: `${firstEvidenceGap} Treat provenance and limitations as blockers before external use.`,
        detailFragments: [
          firstEvidenceGap,
          'Treat provenance and limitations as blockers before external use.',
        ],
      },
    ],
    decisionGuidance: [
      {
        title: 'Reviewed next step',
        reviewStatus: 'human review required',
        guidance: 'Use this as reviewed next step guidance for a small evidence-gathering review; not a launch decision.',
      },
      {
        title: 'Configuration review',
        reviewStatus: runtimeConsumed ? 'runtime-consumed' : 'configuration-only',
        guidance: runtimeConsumed
          ? 'Verified offline configuration check consumed the submitted profile, platforms, allocation, and evidence depth; keep limitations visible before any budget discussion.'
          : 'Check selected platforms, participant allocation, evidence depth, and assumptions before any budget discussion.',
      },
      {
        title: 'Evidence review',
        reviewStatus: 'limitations visible',
        guidance: 'Resolve evidence gaps with approved, human-reviewed feedback before external use.',
      },
    ],
    sourceSummary: {
      inputs: ['reviewed user assumptions', 'submitted simulation configuration', ...(runtimeConsumed ? ['verified offline configuration contract'] : []), 'synthetic platform engagement result model', 'offline fixture'],
      status: runtimeConsumed ? 'synthetic_offline_runtime_consumed' : 'synthetic_offline_configuration_only',
      limitations: [
        'synthetic/offline provenance only',
        runtimeConsumed ? 'runtime consumed by verified offline configuration contract only' : 'configuration-only status',
        'limitations and evidence gaps remain visible',
      ],
    },
    traceability,
  };
}
