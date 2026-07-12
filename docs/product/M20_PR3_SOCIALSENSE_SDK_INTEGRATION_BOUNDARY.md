# M20 PR3 SocialSense Public SDK Integration Boundary

Status: Verified against SocialSense PR3 public-SDK compatibility evidence at `9b74ce0` and the 3C M20 PR4 adapter. This is an implementation-ready fixture/offline boundary note, not a new service or runtime design.

## Decision

3C remains a thin product consumer. SocialSense owns scenario execution, validation, canonical platform resolution, deterministic fixture behavior, runtime-contract generation, safety/provenance, dashboard contracts, and exports. 3C owns submitted UX configuration, product-side labels, review flow, and the adapter mapping.

The reviewed public import used by the existing 3C adapter is:

```python
from socialsense import create_research_session, export_run, load_domain_pack, run_scenario
```

`ConsumerSDK` exposes equivalent object methods and is public, but 3C should retain the existing function-based adapter call path rather than introduce a second path. 3C must not import `app.civicsense.*`, `socialsense.workbench`, `socialsense.domain_packs`, `socialsense.bridge`, plugins, scenario internals, or exporter internals.

## Public call flow

1. Validate the submitted 3C configuration in `run_submitted_simulation_configuration(...)`.
2. Load the reviewed Marketing Domain Pack with `load_domain_pack("marketing")`.
3. Create a session with `create_research_session(...)`, always passing `runtime_mode="fixture"` and `data_mode="fixture"`.
4. Run only through `run_scenario(session=session, domain_pack=marketing_domain)`.
5. Read the returned `runtime_contract`, provenance, limitations, evidence gaps, human-review questions, dashboard contract, and status as read-only SocialSense output.
6. Export a completed run only through `export_run(run_payload, format="json" | "markdown" | "executive_json")`.
7. Set the product field `runtimeStatus` to `consumed_by_runtime` only after the executable-evidence checks below pass; otherwise return the product-owned `configuration_only` fallback.

The browser does not import or call SocialSense. It renders a local fixture/offline artifact generated through the 3C adapter. No backend, runtime API, persistence, auth, credentials, external service, or live-platform connection is required.

## Submitted configuration mapping

| 3C submitted field | Accepted product values | Public SDK request field | Public runtime echo |
| --- | --- | --- | --- |
| `simulationProfile` | `product_launch`, `brand_awareness`, `campaign_response`, `product_feedback`, `promotion_response` | matching `scenario_name` and `simulation_profile` | `runtime_contract.simulation_profile` |
| `selectedPlatforms` | `facebook`, `tiktok`, `line`, `youtube`, `x` | canonical labels in `platform_mix`: `Facebook`, `TikTok`, `LINE`, `YouTube`, `X` | `runtime_contract.selected_platforms` |
| `platformAllocations` | selected keys with integer values 10–500 | `participant_allocation` keyed by canonical labels | `runtime_contract.per_platform_participant_allocation` |
| allocation sum | derived by the 3C adapter | `total_participants` | `runtime_contract.total_synthetic_participants` |
| `evidenceDepth` | `minimal`, `standard`, `expanded` | `evidence_depth` | `runtime_contract.evidence_depth` |
| local fixture seed | opaque deterministic text; never a secret, credential, or local path | `seed` | `runtime_contract.deterministic_seed_fingerprint` |

SocialSense validates that `simulation_profile` matches `scenario_name`, allocations cover exactly the selected active platforms, allocation values and totals are positive aggregate integers, and `evidence_depth` is an allowed fixture label. The active public labels are canonically ordered by the runtime: `LINE`, `Facebook`, `TikTok`, `YouTube`, `X`, `Reddit`.

## Executable runtime-evidence signal

The adapter may report `runtimeStatus: "consumed_by_runtime"` only when all of the following hold:

- the adapter-level run status is `ok` and the SocialSense run status is completed/ok;
- `simulation_profile`, selected platforms, per-platform allocation, total synthetic participants, and evidence depth all echo the submitted mapping;
- platform equality accounts for the documented SocialSense canonical active-platform ordering rather than treating submitted UI order as runtime evidence;
- provenance confirms `fixture_only: true`, `live_api_access: false`, and `credentials_required: false`;
- the returned `runtime_contract.evidence_tier` remains `fixture_offline_aggregate_only` and its confidence remains an explicit non-calibrated caveat.

This signal proves that the local public fixture runtime consumed the mapped settings. It does not prove live platform measurement, field evidence, customer behavior, calibrated confidence, production performance, or a forecast.

## Deterministic test hooks

The public SDK supplies deterministic fixture hooks without product-side simulation logic:

- A fixed `seed`, `scenario_name`, and `platform_mix` produce a stable session ID, creation time, seed fingerprint, and run output.
- `create_research_session(...)`, `run_scenario(...)`, and `ConsumerSDK.run(...)` preserve the additive M20 fields.
- SocialSense `tests/test_socialsense_m20_runtime_contract_audit.py` proves same-input determinism, field preservation, changed-allocation traceability, invalid-input fail-closed behavior, and public-signature availability.
- `PYTHONPATH=. python scripts/socialsense_consumer_smoke.py` exercises the public `public_sdk_m20_compatibility` check and reports 8/8 local fixture/offline checks.
- 3C `tests/test_socialsense_adapter.py` enforces public-facade-only imports and covers mapping, missing-runtime-contract fallback, invalid submitted settings, exports, and adapter wrappers.
- `PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py` is the real cross-repository adapter smoke.

## Supported errors and fail-closed behavior

| Condition | Public SDK behavior | 3C adapter behavior |
| --- | --- | --- |
| live API, scraping, private-message, PII, CRM, voter, or other private data mode | rejects with `SocialSenseUnavailable` | does not request these modes |
| unsupported consumer mode | raises `ValueError` | does not request unsupported modes |
| invalid scenario/profile, platform, allocation, total, or evidence depth | raises `ValueError` or `SocialSenseSafetyError` before/while executing the public runtime | returns `configuration_only` without promoting a runtime result |
| Marketing Domain Pack rejects the scenario | public domain validation fails closed | returns `configuration_only` |
| missing, malformed, or mismatched runtime contract/provenance, evidence tier, or confidence | no executable-evidence signal | returns `configuration_only` with `runtime_consumed: false`, reason `executable_runtime_evidence_absent`, and an allowlisted submitted-configuration snapshot with provenance, limitations, and evidence gaps |
| unsupported export format | `export_run(...)` raises `ValueError` | offer only JSON, Markdown, and Executive JSON |

The fallback is intentionally non-diagnostic to the product UI: it retains only the allowlisted submitted configuration fields and never fabricates a runtime result or echoes arbitrary caller fields.

## Verified current condition and resolved historical regression

The public SDK completes the submitted `product_launch` / Facebook + LINE + X fixture request and returns the full runtime contract. The former 3C adapter false negative caused by comparing submitted label order (`Facebook`, `LINE`, `X`) directly with the runtime canonical order (`LINE`, `Facebook`, `X`) was resolved in `cd3be65`.

Current adapter evidence comparison normalizes the documented platform order before promotion and still requires the exact fixture/offline aggregate evidence tier plus explicit non-calibrated confidence. This historical regression did not require and must not prompt a SocialSense change or duplicated simulation behavior in 3C.

## Architecture decision

Architecture Gate: Not triggered for this public SDK boundary. The verified public surface already supports the submitted profile, aggregate platform mix, allocation, total, evidence-depth, deterministic fixture, provenance, dashboard, and export requirements.

No SDK-breaking change, runtime redesign, new service, persistence, auth, live-platform access, or duplicated simulation logic is required. An Architecture Gate is mandatory if future work needs any of those capabilities, a non-public import, a new export format, or any weakening of fixture/offline aggregate-only safety boundaries.
