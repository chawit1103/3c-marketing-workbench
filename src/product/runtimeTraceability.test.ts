import { describe, expect, it } from 'vitest';
import { buildRuntimeTraceability, type RuntimeEvidence } from './runtimeTraceability';
import { createDefaultSimulationConfiguration, updatePlatformAllocationDraft } from './simulationConfig';

const verifiedFixtureEvidence: RuntimeEvidence = {
  status: 'ok',
  runStatus: 'completed',
  runtimeStatus: 'consumed_by_runtime',
  runtimeConsumed: true,
  runtimeContract: {
    simulationProfile: 'product_launch',
    selectedPlatforms: ['LINE', 'Facebook'],
    perPlatformParticipantAllocation: { Facebook: 80, LINE: 80 },
    totalSyntheticParticipants: 160,
    evidenceDepth: 'standard',
    evidenceTier: 'fixture_offline_aggregate_only',
    confidenceLevel: 'not_calibrated',
  },
  provenance: {
    fixtureOnly: true,
    liveApiAccess: false,
    credentialsRequired: false,
  },
};

describe('M20 PR5 runtime traceability', () => {
  it('promotes status and traces submitted configuration through verified fixture runtime evidence only', () => {
    const config = createDefaultSimulationConfiguration(['Facebook', 'LINE']);

    expect(buildRuntimeTraceability(config, verifiedFixtureEvidence)).toEqual({
      runtimeStatus: 'consumed_by_runtime',
      statusLabel: 'runtime-consumed',
      source: 'verified fixture/offline runtime contract',
      steps: [
        { key: 'input', status: 'available' },
        { key: 'configuration', status: 'matched' },
        { key: 'runtime', status: 'verified' },
        { key: 'result', status: 'available' },
      ],
    });
  });

  it('fails closed to configuration-only when executable evidence does not match the submitted allocation', () => {
    const config = updatePlatformAllocationDraft(
      createDefaultSimulationConfiguration(['Facebook', 'LINE']),
      'facebook',
      '120',
    );

    expect(buildRuntimeTraceability(config, verifiedFixtureEvidence)).toEqual({
      runtimeStatus: 'configuration_only',
      statusLabel: 'configuration-only',
      source: 'configuration-only fallback',
      steps: [
        { key: 'input', status: 'available' },
        { key: 'configuration', status: 'available' },
        { key: 'runtime', status: 'not_verified' },
        { key: 'result', status: 'offline_fixture' },
      ],
    });
  });
});
