import { describe, expect, it } from 'vitest';
import {
  DEFAULT_SIMULATION_PROFILE,
  EVIDENCE_DEPTHS,
  PLATFORM_ALLOCATION_LIMITS,
  SIMULATION_PROFILES,
  calculateSelectedParticipantTotal,
  createDefaultSimulationConfiguration,
  updatePlatformAllocationDraft,
  validateSimulationConfiguration,
} from './simulationConfig';

describe('M19 PR2 simulation configuration model', () => {
  it('defaults to Balanced with deterministic selected-platform allocations and configuration-only runtime status', () => {
    const config = createDefaultSimulationConfiguration(['Facebook', 'TikTok', 'LINE']);

    expect(DEFAULT_SIMULATION_PROFILE).toBe('balanced');
    expect(config.simulationProfile).toBe('balanced');
    expect(config.evidenceDepth).toBe('standard');
    expect(config.configurationSource).toBe('preset');
    expect(config.runtimeStatus).toBe('configuration_only');
    expect(config.selectedPlatforms).toEqual(['facebook', 'tiktok', 'line']);
    expect(config.platformAllocations.facebook).toBe(80);
    expect(config.platformAllocations.tiktok).toBe(80);
    expect(config.platformAllocations.line).toBe(80);
    expect(calculateSelectedParticipantTotal(config)).toBe(240);
  });

  it('documents all deterministic profile presets without claiming higher participant counts improve accuracy', () => {
    expect(Object.keys(SIMULATION_PROFILES)).toEqual(['quick', 'balanced', 'deep', 'research', 'custom']);
    expect(SIMULATION_PROFILES.quick.allocations.facebook).toBe(30);
    expect(SIMULATION_PROFILES.balanced.allocations.line).toBe(80);
    expect(SIMULATION_PROFILES.deep.allocations.youtube).toBe(150);
    expect(SIMULATION_PROFILES.research.allocations.x).toBe(250);
    expect(SIMULATION_PROFILES.custom.description.en).toContain('Manual');
    expect(SIMULATION_PROFILES.research.description.en.toLowerCase()).not.toContain('accur');
    expect(SIMULATION_PROFILES.research.description.en.toLowerCase()).not.toContain('confidence');
    expect(EVIDENCE_DEPTHS).toEqual(['light', 'standard', 'deep', 'research']);
  });

  it('excludes unselected platforms from totals even when allocation values exist', () => {
    const config = createDefaultSimulationConfiguration(['Facebook', 'LINE']);
    const totalWithUnselectedTikTokPresent = calculateSelectedParticipantTotal({
      ...config,
      platformAllocations: {
        ...config.platformAllocations,
        tiktok: 999,
        youtube: 999,
      },
    });

    expect(totalWithUnselectedTikTokPresent).toBe(160);
  });

  it.each([
    ['negative', '-1', 'Allocation must be at least 10 synthetic participants.'],
    ['non-numeric text', 'abc', 'Use whole numbers only for synthetic participant allocation.'],
    ['decimal', '10.5', 'Use whole numbers only for synthetic participant allocation.'],
    ['below minimum', '9', 'Allocation must be at least 10 synthetic participants.'],
    ['above maximum', '501', 'Allocation must be no more than 500 synthetic participants.'],
  ])('rejects invalid custom allocation: %s', (_caseName, draftValue, error) => {
    const config = createDefaultSimulationConfiguration(['Facebook']);
    const updated = updatePlatformAllocationDraft(config, 'facebook', draftValue);

    expect(updated.simulationProfile).toBe('custom');
    expect(updated.configurationSource).toBe('custom');
    expect(validateSimulationConfiguration(updated)).toContain(error);
  });

  it('accepts integer custom allocation within safe min and max', () => {
    const config = updatePlatformAllocationDraft(
      createDefaultSimulationConfiguration(['Facebook']),
      'facebook',
      '250',
    );

    expect(config.platformAllocations.facebook).toBe(250);
    expect(calculateSelectedParticipantTotal(config)).toBe(250);
    expect(validateSimulationConfiguration(config)).toEqual([]);
    expect(PLATFORM_ALLOCATION_LIMITS).toEqual({ min: 10, max: 500 });
  });
});
