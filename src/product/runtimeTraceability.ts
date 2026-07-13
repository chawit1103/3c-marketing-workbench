import { PLATFORM_LABELS, type RuntimeStatus, type SimulationConfiguration } from './simulationConfig';

export type RuntimeEvidence = {
  status: string;
  runStatus: string;
  runtimeStatus: RuntimeStatus;
  runtimeConsumed: boolean;
  runtimeContract: {
    simulationProfile: string;
    selectedPlatforms: string[];
    perPlatformParticipantAllocation: Record<string, number>;
    totalSyntheticParticipants: number;
    evidenceDepth: string;
    evidenceTier: string;
    confidenceLevel: string;
  };
  provenance: {
    fixtureOnly: boolean;
    liveApiAccess: boolean;
    credentialsRequired: boolean;
  };
};

export type RuntimeTraceabilityStep = {
  key: 'input' | 'configuration' | 'runtime' | 'result';
  status: 'available' | 'matched' | 'verified' | 'not_verified' | 'offline_fixture';
};

export type RuntimeTraceability = {
  runtimeStatus: RuntimeStatus;
  statusLabel: 'runtime-consumed' | 'configuration-only';
  source: 'verified fixture/offline runtime contract' | 'configuration-only fallback';
  steps: RuntimeTraceabilityStep[];
};

export function buildRuntimeTraceability(
  config: SimulationConfiguration,
  evidence: RuntimeEvidence | undefined,
): RuntimeTraceability {
  if (hasVerifiedRuntimeEvidence(config, evidence)) {
    return {
      runtimeStatus: 'consumed_by_runtime',
      statusLabel: 'runtime-consumed',
      source: 'verified fixture/offline runtime contract',
      steps: [
        { key: 'input', status: 'available' },
        { key: 'configuration', status: 'matched' },
        { key: 'runtime', status: 'verified' },
        { key: 'result', status: 'available' },
      ],
    };
  }

  return {
    runtimeStatus: 'configuration_only',
    statusLabel: 'configuration-only',
    source: 'configuration-only fallback',
    steps: [
      { key: 'input', status: 'available' },
      { key: 'configuration', status: 'available' },
      { key: 'runtime', status: 'not_verified' },
      { key: 'result', status: 'offline_fixture' },
    ],
  };
}

function hasVerifiedRuntimeEvidence(config: SimulationConfiguration, evidence: RuntimeEvidence | undefined): boolean {
  if (!evidence) {
    return false;
  }

  const expectedPlatforms = config.selectedPlatforms.map((platform) => PLATFORM_LABELS[platform]);
  const expectedAllocations = Object.fromEntries(
    config.selectedPlatforms.map((platform) => [PLATFORM_LABELS[platform], config.platformAllocations[platform]]),
  );
  const expectedTotal = Object.values(expectedAllocations).reduce((total, allocation) => total + allocation, 0);

  return evidence.status === 'ok'
    && ['completed', 'ok'].includes(evidence.runStatus)
    && evidence.runtimeStatus === 'consumed_by_runtime'
    && evidence.runtimeConsumed === true
    && samePlatformSet(evidence.runtimeContract.selectedPlatforms, expectedPlatforms)
    && evidence.runtimeContract.simulationProfile === config.simulationProfile
    && sameAllocations(evidence.runtimeContract.perPlatformParticipantAllocation, expectedAllocations)
    && evidence.runtimeContract.totalSyntheticParticipants === expectedTotal
    && evidence.runtimeContract.evidenceDepth === config.evidenceDepth
    && evidence.runtimeContract.evidenceTier === 'fixture_offline_aggregate_only'
    && evidence.runtimeContract.confidenceLevel === 'not_calibrated'
    && evidence.provenance.fixtureOnly === true
    && evidence.provenance.liveApiAccess === false
    && evidence.provenance.credentialsRequired === false;
}

function samePlatformSet(actual: string[], expected: string[]): boolean {
  return actual.length === expected.length
    && new Set(actual).size === actual.length
    && actual.every((platform) => expected.includes(platform));
}

function sameAllocations(actual: Record<string, number>, expected: Record<string, number>): boolean {
  const expectedEntries = Object.entries(expected);
  return Object.keys(actual).length === expectedEntries.length
    && expectedEntries.every(([platform, allocation]) => actual[platform] === allocation);
}
