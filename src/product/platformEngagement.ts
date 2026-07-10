import {
  PLATFORM_LABELS,
  normalizePlatformAllocation,
  type EvidenceDepth,
  type PlatformKey,
  type SimulationConfiguration,
} from './simulationConfig';

export type PlatformEngagementMetric = {
  platformKey: PlatformKey;
  platform: string;
  syntheticParticipants: number;
  syntheticReachIndex: number;
  syntheticReactionIndex: number;
  syntheticCommentCount: number;
  syntheticShareIntentIndex: number;
  evidenceDepth: EvidenceDepth;
  safetyStatus: 'synthetic_offline';
};

export type SyntheticComment = {
  platformKey: PlatformKey;
  platform: string;
  comment: string;
  theme: string;
  safetyStatus: 'synthetic_offline';
};

export type EngagementTheme = {
  label: string;
  detail: string;
  safetyStatus: 'synthetic_offline';
};

export type CrossPlatformSummary = {
  platformCount: number;
  totalSyntheticParticipants: number;
  averageSyntheticReachIndex: number;
  averageSyntheticReactionIndex: number;
  totalSyntheticComments: number;
  leadingSyntheticPlatform: string;
  status: 'offline_configuration_owned_model';
  interpretation: string;
};

export type PlatformEngagementSource = {
  provenance: 'configuration_owned_offline_fixture';
  runtimeStatus: 'configuration_only';
  safetyStatus: 'synthetic_offline_not_live_measurement';
  configurationSource: SimulationConfiguration['configurationSource'];
  evidenceDepth: EvidenceDepth;
  disclaimer: string;
};

export type PlatformEngagementResult = {
  modelVersion: 'm19-pr3-platform-engagement-result-v1';
  platforms: PlatformEngagementMetric[];
  syntheticComments: SyntheticComment[];
  themes: EngagementTheme[];
  crossPlatformSummary: CrossPlatformSummary;
  source: PlatformEngagementSource;
};

const platformOffsets: Record<PlatformKey, { reach: number; reaction: number; share: number; commentDivisor: number }> = {
  facebook: { reach: 12, reaction: 7, share: 8, commentDivisor: 12 },
  tiktok: { reach: 17, reaction: 9, share: 11, commentDivisor: 10 },
  line: { reach: 10, reaction: 13, share: 15, commentDivisor: 12 },
  youtube: { reach: 14, reaction: 6, share: 9, commentDivisor: 14 },
  instagram: { reach: 15, reaction: 8, share: 10, commentDivisor: 11 },
  x: { reach: 9, reaction: 5, share: 7, commentDivisor: 16 },
};

const themeDetails: EngagementTheme[] = [
  {
    label: 'Message clarity',
    detail: 'Synthetic comments indicate whether the reviewed message is easy to understand in each configured platform context.',
    safetyStatus: 'synthetic_offline',
  },
  {
    label: 'Trust proof needed',
    detail: 'Synthetic comments keep proof-point needs visible before any external review or small evidence test.',
    safetyStatus: 'synthetic_offline',
  },
  {
    label: 'Channel fit hypothesis',
    detail: 'Platform differences are configuration-owned planning cues from selected platforms, not field observations.',
    safetyStatus: 'synthetic_offline',
  },
];

const commentsByPlatform: Record<PlatformKey, string> = {
  facebook: 'Clear benefit, but quality proof should be reviewed before public copy.',
  tiktok: 'Short-form hook feels easy to scan; proof point still needs review.',
  line: 'Chat-friendly reminder works if the offer and timing stay clear.',
  youtube: 'Explainer framing may help, but keep evidence needs visible.',
  instagram: 'Visual-first framing could work as a small reviewed creative test.',
  x: 'Concise claim needs careful review before broader posting.',
};

export function buildPlatformEngagementResult(config: SimulationConfiguration): PlatformEngagementResult {
  const platforms = config.selectedPlatforms.map((platformKey, index) => {
    const allocation = normalizePlatformAllocation(config.platformAllocations[platformKey]);
    const offsets = platformOffsets[platformKey];
    return {
      platformKey,
      platform: PLATFORM_LABELS[platformKey],
      syntheticParticipants: allocation,
      syntheticReachIndex: clampScore(50 + Math.round(allocation / 4) + offsets.reach - index * 3),
      syntheticReactionIndex: clampScore(50 + Math.round(allocation / 12) + offsets.reaction + index),
      syntheticCommentCount: Math.max(1, Math.round(allocation / offsets.commentDivisor)),
      syntheticShareIntentIndex: clampScore(30 + Math.round(allocation / 12) + offsets.share + index),
      evidenceDepth: config.evidenceDepth,
      safetyStatus: 'synthetic_offline' as const,
    };
  });
  const syntheticComments = platforms.map((platform, index) => ({
    platformKey: platform.platformKey,
    platform: platform.platform,
    comment: commentsByPlatform[platform.platformKey],
    theme: themeDetails[index % themeDetails.length].label,
    safetyStatus: 'synthetic_offline' as const,
  }));
  const leadingSyntheticPlatform = [...platforms].sort(
    (left, right) => right.syntheticReactionIndex - left.syntheticReactionIndex || right.syntheticParticipants - left.syntheticParticipants,
  )[0]?.platform ?? 'None';

  return {
    modelVersion: 'm19-pr3-platform-engagement-result-v1',
    platforms,
    syntheticComments,
    themes: themeDetails,
    crossPlatformSummary: {
      platformCount: platforms.length,
      totalSyntheticParticipants: platforms.reduce((total, platform) => total + platform.syntheticParticipants, 0),
      averageSyntheticReachIndex: average(platforms.map((platform) => platform.syntheticReachIndex)),
      averageSyntheticReactionIndex: average(platforms.map((platform) => platform.syntheticReactionIndex)),
      totalSyntheticComments: platforms.reduce((total, platform) => total + platform.syntheticCommentCount, 0),
      leadingSyntheticPlatform,
      status: 'offline_configuration_owned_model',
      interpretation: 'Synthetic/offline configuration-owned planning cue; not live, not measured, and not a forecast.',
    },
    source: {
      provenance: 'configuration_owned_offline_fixture',
      runtimeStatus: 'configuration_only',
      safetyStatus: 'synthetic_offline_not_live_measurement',
      configurationSource: config.configurationSource,
      evidenceDepth: config.evidenceDepth,
      disclaimer: 'Built from selected platform configuration and synthetic participants only; synthetic/offline, not live, not measured, and not a forecast.',
    },
  };
}

function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }
  return Math.round(values.reduce((total, value) => total + value, 0) / values.length);
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, value));
}
