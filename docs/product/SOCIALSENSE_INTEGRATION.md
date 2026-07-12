# SocialSense Integration

Status: M20 PR4 adds fixture/offline runtime-contract evidence for submitted Simulation Configuration settings while preserving the M1 PR4 generated Product Launch UI fixture path.

## Scope

3C Marketing Workbench has an isolated adapter at `integrations/socialsense/adapter.py` that consumes SocialSense through the public SDK/runtime facade only:

```python
from socialsense import create_research_session, export_run, load_domain_pack, run_scenario
```

The adapter loads the Marketing Domain Pack with `load_domain_pack('marketing')`, creates a fixture/offline public SDK session, calls `run_scenario(...)`, and uses `export_run(...)` for exports.

It does not modify SocialSense, copy SocialSense internals, import `app.civicsense`, or import private SocialSense modules.

For the verified PR3 public SDK signatures, runtime-evidence promotion rule, deterministic hooks, supported fail-closed behavior, and the resolved adapter-ordering regression history, see [M20 PR3 SocialSense Public SDK Integration Boundary](M20_PR3_SOCIALSENSE_SDK_INTEGRATION_BOUNDARY.md).

## PR4 fixture flow

PR4 uses this cross-repository flow:

```text
SocialSense public SDK
↓
integrations/socialsense/adapter.py
↓
scripts/generate_product_launch_fixture.py
↓
src/product/fixtures/productLaunchResult.json
↓
React Product Launch workflow, dashboard, and export review
```

The browser does not call SocialSense, live APIs, or a backend. It renders a reproducible offline sample generated locally from the adapter.

## Exposed adapter functions

- `run_product_launch_simulation(...)`
- `run_campaign_message_test(...)`
- `run_message_comparison(...)`
- `run_submitted_simulation_configuration(...)`
- `export_executive_report(...)`

`run_product_launch_simulation(...)` is the Product Launch smoke and PR4 fixture-generation path. Campaign and comparison helpers remain adapter-shaped wrappers for later reviewed workflow PRs.

## Input mapping

3C product inputs remain aggregate and non-sensitive. The adapter maps only these fields to SocialSense:

- `scenario`
- `platform_mix`
- `seed`
- `assumptions`
- `notes`

M20 PR4 defines the canonical submitted configuration in [ADR-001](ADR-001-SOCIALSENSE-PUBLIC-SUBMITTED-CONFIGURATION.md) and maps it to the additive public runtime contract:

- `simulationProfile` (`product_launch`, `brand_awareness`, `campaign_response`, `product_feedback`, or `promotion_response`) → matching `scenario_name` and `simulation_profile`;
- `selectedPlatforms` → canonical aggregate `platform_mix` labels;
- `platformAllocations` → `participant_allocation`;
- selected allocation total → `total_participants`;
- `evidenceDepth` (`minimal`, `standard`, or `expanded`) → `evidence_depth`.

Canonical platform keys are `facebook`, `tiktok`, `line`, `youtube`, and `x`; their public labels are Facebook, TikTok, LINE, YouTube, and X. A caller cannot override the submitted scenario with a conflicting runtime scenario.

The adapter marks a result `consumed_by_runtime` only when the executable public runtime contract echoes every mapped value, fixture/offline safety provenance, `evidence_tier: fixture_offline_aggregate_only`, and explicit `confidence.level: not_calibrated`. Invalid configuration, missing or mismatched runtime evidence, or ambiguous confidence returns the fail-closed `configuration_only` fallback with only an allowlisted submitted-configuration snapshot plus provenance, limitations, and evidence gaps; the adapter does not synthesize runtime results or echo arbitrary caller fields.

No CRM/customer lists, PII, private messages/groups, voter lists, credentials, scraping, live APIs, microtargeting, persuasion optimization, conversion guarantees, or production campaign claims are introduced.

## Output preservation

Adapter view models and the PR4 fixture preserve SocialSense metadata rather than stripping it:

- provenance;
- safety labels and boundaries;
- dashboard/export status;
- limitations;
- evidence gaps;
- human review questions;
- export status for JSON, Markdown, and Executive Summary.

The UI converts those into marketing-friendly language and must not expose internal platform terms as primary user copy.

## Local commands

Run Python adapter and fixture tests:

```bash
python3 -m unittest discover -s tests -p 'test_*.py'
```

Regenerate the Product Launch UI fixture through the PR3 adapter:

```bash
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/generate_product_launch_fixture.py
```

Run actual local SocialSense smoke:

```bash
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py
```

Expected smoke/fixture summary includes:

- `status: ok`
- `scenario: product_launch`
- export status for `json`, `markdown`, and `executive_json`
- safety boundaries such as fixture/offline execution and no live/private/PII/CRM/voter access
- `public_sdk_only: true`
- a submitted configuration result with `runtime_status: consumed_by_runtime` only after runtime-contract echo verification

## Resolved historical context

The former adapter false negative caused by comparing submitted platform-label order with the SocialSense canonical platform order was resolved in `cd3be65`. It is not a current integration limitation; the adapter now normalizes the documented runtime order before evaluating the public SDK fixture/offline evidence.

## Current limitations

- PR4 renders one Product Launch vertical slice only.
- Browser-entered form values are shown as review assumptions beside the generated offline sample; they are not sent to a live SocialSense service.
- This adapter evidence is local fixture/offline runtime consumption only; it is not live platform measurement, production execution, or a forecast.
- Runtime evidence is limited to the public SDK fixture/offline contract and remains aggregate-only; it does not establish live platform or production consumption.
- No backend service, auth, persistence, live API, credentials, customer data, or production campaign workflow.
- A/B comparison, campaign message test, real workspace persistence, and downloadable report packaging remain future gated work.
