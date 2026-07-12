export type SimulationProfile = 'product_launch' | 'brand_awareness' | 'campaign_response' | 'product_feedback' | 'promotion_response';
export type PlatformKey = 'facebook' | 'tiktok' | 'line' | 'youtube' | 'x';
export type EvidenceDepth = 'minimal' | 'standard' | 'expanded';
export type RuntimeStatus = 'configuration_only' | 'consumed_by_runtime';
export type ConfigurationSource = 'preset' | 'custom';

export const DEFAULT_SIMULATION_PROFILE: SimulationProfile = 'product_launch';
export const EVIDENCE_DEPTHS: EvidenceDepth[] = ['minimal', 'standard', 'expanded'];
export const PLATFORM_ALLOCATION_LIMITS = { min: 10, max: 500 } as const;

export function normalizePlatformAllocation(value: unknown, fallback: number = PLATFORM_ALLOCATION_LIMITS.min): number {
  const fallbackValue = typeof fallback === 'number' && Number.isFinite(fallback)
    ? Math.round(fallback)
    : PLATFORM_ALLOCATION_LIMITS.min;
  const normalizedFallback = clampPlatformAllocation(fallbackValue);
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return normalizedFallback;
  }
  return clampPlatformAllocation(Math.round(value));
}

export const PLATFORM_LABELS: Record<PlatformKey, string> = {
  facebook: 'Facebook',
  tiktok: 'TikTok',
  line: 'LINE',
  youtube: 'YouTube',
  x: 'X',
};

const platformKeyByLabel: Record<string, PlatformKey> = Object.fromEntries(
  Object.entries(PLATFORM_LABELS).map(([key, label]) => [label, key as PlatformKey]),
) as Record<string, PlatformKey>;

export type PlatformAllocations = Record<PlatformKey, number>;
export type PlatformAllocationDrafts = Record<PlatformKey, string>;

export type SimulationConfiguration = {
  simulationProfile: SimulationProfile;
  selectedPlatforms: PlatformKey[];
  platformAllocations: PlatformAllocations;
  platformAllocationDrafts: PlatformAllocationDrafts;
  evidenceDepth: EvidenceDepth;
  configurationSource: ConfigurationSource;
  runtimeStatus: RuntimeStatus;
};

type ProfileDefinition = {
  label: string;
  description: { th: string; en: string };
  evidenceDepth: EvidenceDepth;
  allocations: PlatformAllocations;
};

export const SIMULATION_PROFILES: Record<SimulationProfile, ProfileDefinition> = {
  product_launch: {
    label: 'Product Launch',
    description: {
      th: 'สถานการณ์เปิดตัวผลิตภัณฑ์สำหรับการตรวจทานสมมติฐานแบบออฟไลน์',
      en: 'Product-launch scenario for fixture/offline assumption review.',
    },
    evidenceDepth: 'standard',
    allocations: { facebook: 80, tiktok: 80, line: 80, youtube: 80, x: 80 },
  },
  brand_awareness: {
    label: 'Brand Awareness',
    description: {
      th: 'สถานการณ์การรับรู้แบรนด์สำหรับการตรวจทานแบบออฟไลน์',
      en: 'Brand-awareness scenario for fixture/offline review.',
    },
    evidenceDepth: 'standard',
    allocations: { facebook: 80, tiktok: 80, line: 80, youtube: 80, x: 80 },
  },
  campaign_response: {
    label: 'Campaign Response',
    description: {
      th: 'สถานการณ์การตอบสนองต่อแคมเปญสำหรับการตรวจทานแบบออฟไลน์',
      en: 'Campaign-response scenario for fixture/offline review.',
    },
    evidenceDepth: 'standard',
    allocations: { facebook: 150, tiktok: 150, line: 150, youtube: 150, x: 150 },
  },
  product_feedback: {
    label: 'Product Feedback',
    description: {
      th: 'สถานการณ์ความคิดเห็นต่อผลิตภัณฑ์สำหรับการตรวจทานแบบออฟไลน์',
      en: 'Product-feedback scenario for fixture/offline review.',
    },
    evidenceDepth: 'expanded',
    allocations: { facebook: 150, tiktok: 150, line: 150, youtube: 150, x: 150 },
  },
  promotion_response: {
    label: 'Promotion Response',
    description: {
      th: 'สถานการณ์การตอบสนองต่อข้อเสนอสำหรับการตรวจทานแบบออฟไลน์',
      en: 'Promotion-response scenario for fixture/offline review.',
    },
    evidenceDepth: 'expanded',
    allocations: { facebook: 250, tiktok: 250, line: 250, youtube: 250, x: 250 },
  },
};

export function platformLabelsToKeys(platforms: string[]): PlatformKey[] {
  return platforms.map((platform) => platformKeyByLabel[platform]).filter((platform): platform is PlatformKey => Boolean(platform));
}

export function createDefaultSimulationConfiguration(selectedPlatformLabels: string[]): SimulationConfiguration {
  const profile = SIMULATION_PROFILES[DEFAULT_SIMULATION_PROFILE];
  const selectedPlatforms = platformLabelsToKeys(selectedPlatformLabels);
  return {
    simulationProfile: DEFAULT_SIMULATION_PROFILE,
    selectedPlatforms: selectedPlatforms.length > 0 ? selectedPlatforms : Object.keys(PLATFORM_LABELS) as PlatformKey[],
    platformAllocations: { ...profile.allocations },
    platformAllocationDrafts: allocationDraftsFromValues(profile.allocations),
    evidenceDepth: profile.evidenceDepth,
    configurationSource: 'preset',
    runtimeStatus: 'configuration_only',
  };
}

export function applySimulationProfile(config: SimulationConfiguration, simulationProfile: SimulationProfile): SimulationConfiguration {
  const profile = SIMULATION_PROFILES[simulationProfile];
  return {
    ...config,
    simulationProfile,
    platformAllocations: { ...profile.allocations },
    platformAllocationDrafts: allocationDraftsFromValues(profile.allocations),
    evidenceDepth: profile.evidenceDepth,
    configurationSource: 'preset',
    runtimeStatus: 'configuration_only',
  };
}

export function updateSelectedPlatforms(config: SimulationConfiguration, selectedPlatformLabels: string[]): SimulationConfiguration {
  return {
    ...config,
    selectedPlatforms: platformLabelsToKeys(selectedPlatformLabels),
    runtimeStatus: 'configuration_only',
  };
}

export function updateEvidenceDepth(config: SimulationConfiguration, evidenceDepth: EvidenceDepth): SimulationConfiguration {
  return { ...config, evidenceDepth, configurationSource: 'custom', runtimeStatus: 'configuration_only' };
}

export function updatePlatformAllocationDraft(
  config: SimulationConfiguration,
  platform: PlatformKey,
  draftValue: string,
): SimulationConfiguration {
  const trimmed = draftValue.trim();
  const nextAllocations = { ...config.platformAllocations };
  if (/^\d+$/.test(trimmed)) {
    nextAllocations[platform] = Number(trimmed);
  }
  return {
    ...config,
    configurationSource: 'custom',
    platformAllocations: nextAllocations,
    platformAllocationDrafts: { ...config.platformAllocationDrafts, [platform]: draftValue },
    runtimeStatus: 'configuration_only',
  };
}

export function validateSimulationConfiguration(config: SimulationConfiguration): string[] {
  const errors: string[] = [];
  if (config.selectedPlatforms.length === 0) {
    errors.push('Select at least one platform because participant allocation only applies to selected platforms.');
  }
  for (const platform of config.selectedPlatforms) {
    const draft = config.platformAllocationDrafts[platform].trim();
    const value = Number(draft);
    if (/^-\d+$/.test(draft)) {
      errors.push(`Allocation must be at least ${PLATFORM_ALLOCATION_LIMITS.min} synthetic participants.`);
      continue;
    }
    if (!/^\d+$/.test(draft)) {
      errors.push('Use whole numbers only for synthetic participant allocation.');
      continue;
    }
    if (value < PLATFORM_ALLOCATION_LIMITS.min) {
      errors.push(`Allocation must be at least ${PLATFORM_ALLOCATION_LIMITS.min} synthetic participants.`);
    }
    if (value > PLATFORM_ALLOCATION_LIMITS.max) {
      errors.push(`Allocation must be no more than ${PLATFORM_ALLOCATION_LIMITS.max} synthetic participants.`);
    }
  }
  return Array.from(new Set(errors));
}

export function calculateSelectedParticipantTotal(config: SimulationConfiguration): number {
  return config.selectedPlatforms.reduce((total, platform) => total + config.platformAllocations[platform], 0);
}

function allocationDraftsFromValues(allocations: PlatformAllocations): PlatformAllocationDrafts {
  return Object.fromEntries(
    Object.entries(allocations).map(([platform, value]) => [platform, String(value)]),
  ) as PlatformAllocationDrafts;
}

function clampPlatformAllocation(value: number): number {
  return Math.max(PLATFORM_ALLOCATION_LIMITS.min, Math.min(PLATFORM_ALLOCATION_LIMITS.max, value));
}
