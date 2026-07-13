import type { RuntimeTraceability } from './runtimeTraceability';

export function runtimeTraceabilityHelpText(
  traceability: Pick<RuntimeTraceability, 'runtimeStatus' | 'referenceFixtureContractMatch'>,
): string {
  if (traceability.runtimeStatus === 'consumed_by_runtime') {
    return 'Runtime consumption confirms an offline configuration echo only; it does not indicate live measurement, field evidence, or production readiness.';
  }
  if (traceability.referenceFixtureContractMatch) {
    return 'This browser result is configuration-only. Its submitted configuration matches a reference fixture, but runtime consumption is not verified.';
  }
  return 'This browser result is configuration-only. Runtime consumption is not verified.';
}
