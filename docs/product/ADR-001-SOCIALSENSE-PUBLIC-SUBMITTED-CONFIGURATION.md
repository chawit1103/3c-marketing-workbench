# ADR-001: Canonical Submitted Simulation Configuration Uses the SocialSense Public Contract

Status: Accepted for M20 PR4 fixture/offline integration review.

## Context

The 3C Simulation Configuration workspace needs one submitted configuration contract that can be validated by the product and passed to the public SocialSense SDK without translating legacy UI-only profile, evidence, or platform names. The browser remains fixture/offline only and does not call SocialSense, a backend, or live APIs.

## Decision

3C uses the following canonical submitted values:

- `simulationProfile`: public marketing scenario name: `product_launch`, `brand_awareness`, `campaign_response`, `product_feedback`, or `promotion_response`.
- `selectedPlatforms`: `facebook`, `tiktok`, `line`, `youtube`, or `x`; the executable display label for `x` is `X`.
- `platformAllocations`: selected-platform integer allocations from 10 through 500.
- `evidenceDepth`: `minimal`, `standard`, or `expanded`.

The product-owned adapter validates this vocabulary, maps the selected labels and allocation total to the public runtime contract, and invokes the same canonical scenario as the submitted profile. A caller may not override the submitted scenario with a conflicting value.

`configurationSource` and `runtimeStatus` remain product provenance fields. `consumed_by_runtime` is reported only when the public runtime contract echoes every mapped configuration field, fixture/offline safety provenance, the exact `fixture_offline_aggregate_only` evidence tier, and explicit `not_calibrated` confidence. Otherwise the adapter fails closed to `configuration_only` with only an allowlisted submitted-configuration snapshot and explicit provenance, limitations, and evidence gaps.

## Consequences

Legacy aliases such as `quick`, `balanced`, `deep`, `research`, `custom`, `light`, `Instagram`, and `X / Twitter` are not accepted submitted-contract values. Existing generated fixtures remain historical offline artifacts; this ADR does not revise their source data or claim that SocialSense consumed them.

This decision does not add persistence, a backend, live APIs, credentials, SocialSense changes, production automation, or any claim of live measurement. It preserves aggregate-only, synthetic/offline, human-review-oriented use.

## Validation

The contract is covered by TypeScript product tests, Python adapter tests, the public-SDK smoke script, and documentation smoke. The implementation must keep using only the public SocialSense facade.
