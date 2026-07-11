# M19 PR2 Simulation Configuration Workspace

Status: M19 PR2 configuration-only Simulation Configuration Workspace was merged in PR #34. M19 PR3 Platform Engagement Result Model is implemented as a product-owned synthetic/offline TypeScript result contract over this configuration. M19 PR4 Executive Insight Dashboard is implemented in the current PR branch; M19 PR5 Executive Decision Brief is implemented; PR6 closeout remains blocked/not started.

Architecture Gate: Not Triggered. This slice is frontend/product-owned TypeScript configuration only. It does not add backend endpoints, persistence, auth, external services, live platform APIs, scraping, SocialSense changes, or MarketingSimulation changes.

## Scope

M19 PR2 adds a reusable Simulation Configuration Workspace to the four approved Workbench workflows:

- Product Launch;
- Campaign Message Test;
- A/B Experiment;
- Creative Comparison.

The workspace lets users choose a simulation profile, review deterministic synthetic participant allocations, optionally adjust selected-platform allocations within safe local bounds, and review a compact Current Simulation Profile summary before running the existing offline fixture path.

## Product-owned configuration model

The product-owned TypeScript model lives in `src/product/simulationConfig.ts` and includes:

- `simulationProfile`: `quick`, `balanced`, `deep`, `research`, or `custom`;
- `selectedPlatforms`: `facebook`, `tiktok`, `line`, `youtube`, `instagram`, or `x`;
- `platformAllocations`: per-platform synthetic participant allocation values;
- `platformAllocationDrafts`: editable string drafts for inline validation;
- calculated total synthetic participants for selected platforms only;
- `evidenceDepth`: `light`, `standard`, `deep`, or `research`;
- `configurationSource`: `preset` or `custom`;
- `runtimeStatus`: `configuration_only` or `consumed_by_runtime`.

Current PR2 UI always shows `Configured for simulation` / configuration-only status. The reserved future label is `Consumed by runtime`, but it must not be shown unless a later implementation provides runtime evidence.

## Deterministic presets

| Profile | Evidence depth | Per selected platform allocation | Purpose |
|---|---:|---:|---|
| Quick | light | 30 | Fast assumption review with a small bounded synthetic participant set. |
| Balanced | standard | 80 | Default executive review configuration with bounded local workload. |
| Deep | deep | 150 | Deeper multi-platform review while remaining configuration-only. |
| Research | research | 250 | Research-oriented configuration for questions and evidence gaps. |
| Custom | standard by default | 80 until edited | Manual allocations inside safe min/max bounds. |

Higher participant counts do not mean higher accuracy, higher confidence, measured engagement, real platform-user evidence, or production readiness. They only change the local synthetic participant configuration shown to the reviewer.

## Advanced settings and validation

Advanced Simulation Settings are expandable and show only selected platforms in the calculated total. Unselected platform allocation values may still exist in state, but they are explicitly excluded from totals.

Validation rules:

- selected platform allocation must be an integer;
- negative values are rejected;
- decimal values are rejected;
- non-numeric values are rejected;
- below-min values are rejected;
- above-max values are rejected;
- safe local bounds are min `10`, max `500` per selected platform.

Invalid selected-platform allocations block the local Run action and show inline feedback. These limits prevent unbounded local workloads.

## Safety and copy boundaries

Visible UI copy must remain Thai-first with English secondary and must say:

- synthetic participants only;
- not live platform users;
- not real engagement measurement;
- no live API access;
- offline simulation configuration;
- configured for simulation unless runtime evidence exists.

Visible UI must not claim:

- likes, shares, comments, reactions, or sentiment result modeling;
- measured platform engagement;
- runtime recalculation or runtime consumption without evidence;
- SocialSense runtime consumption in PR2;
- production prediction, conversion guarantees, or launch/budget/winner readiness.

## SocialSense public API inspection outcome

Outcome: A/B/C = B — current public API is sufficient for PR2 configuration-only UI, but not sufficient to claim runtime consumption.

Inspection summary from `/Users/chawit/Projects/socialsense` public surfaces only:

- public facade exports `load_domain_pack` from `socialsense/__init__.py`;
- marketing domain pack can be loaded with `load_domain_pack("marketing")`;
- current marketing scenarios are `product_launch`, `brand_awareness`, `campaign_response`, `product_feedback`, and `promotion_response`;
- current public example calls `marketing.run(scenario="product_launch", platform_mix=[...], seed=..., assumptions=[...], notes=...)`;
- public metadata remains fixture/offline, synthetic aggregate, no live APIs, no private social access, no credentials, and not production-ready.

Decision: PR2 must keep configuration as product-owned frontend state and document it as `configuration_only`. A later runtime PR would need explicit evidence before changing `runtimeStatus` to `consumed_by_runtime`.

## Tests and acceptance evidence

Required regression coverage is in `src/product/simulationConfig.test.ts` and `src/App.test.tsx`:

- Balanced default;
- deterministic preset allocations;
- Custom editable allocations;
- unselected platforms excluded from totals;
- invalid/negative/decimal/non-numeric/below-min/above-max feedback;
- total calculation;
- Thai default and English localization;
- configuration surviving language switch;
- user assumptions intact through existing workflow behavior;
- no runtime-consumption claim without evidence;
- no live API, real-user, or real-engagement language;
- all four workflows render the shared safe configuration path.

## Non-goals preserved

M19 PR2 does not add a platform engagement result model, likes/shares/comments/reactions/sentiment result model, dashboard chart redesign, report upgrade, backend endpoint, persistence, auth, external service, live platform API, scraping, SocialSense changes, or MarketingSimulation changes.
