# Cross-Repository Dependency Map

Status: M1 PR1 dependency foundation. This document defines repository responsibilities and allowed dependency directions before 3C app code exists.

## Repositories

| Repository | Role | PR1 status |
|---|---|---|
| `/Users/chawit/Projects/3c-marketing-workbench` | Official 3C product app. Owns UX, workflows, product docs, future adapters, executive dashboard/report experience. | Modified in PR1 docs only. |
| `/Users/chawit/Projects/socialsense` | Platform dependency. Owns simulation engine, Marketing Domain Pack, ConsumerSDK, dashboard/export/safety/provenance contracts. | Reference only in PR1. Do not modify. |
| `/Users/chawit/Projects/MarketingSimulation` | Old/reference product. Used only for pain-point audit. | Reference only. Do not modify or copy. |

## Dependency chain

```text
SocialSense
  -> Marketing Domain Runtime
    -> 3C Integration Adapter
      -> 3C UX Workflow
        -> Dashboard
          -> Executive Report
```

Meaning:

1. SocialSense provides stable fixture/offline platform capabilities.
2. Marketing Domain Runtime provides scenario execution and contracts through public SocialSense SDK/runtime.
3. 3C Integration Adapter maps public SocialSense outputs to 3C product view models.
4. 3C UX Workflow guides users through safe scenario setup, run, review, and export.
5. Dashboard renders executive-facing interpretation with provenance and limitations.
6. Executive Report exports reviewed artifacts through SocialSense-supported export formats.

## Allowed dependency directions

Allowed:

- 3C reads SocialSense docs and public consumer contract.
- 3C imports/uses only SocialSense public SDK/runtime in future implementation.
- 3C maps SocialSense dashboard/export contracts into 3C view models.
- 3C references old MarketingSimulation files in docs for UX audit evidence only.

Not allowed:

- SocialSense importing 3C app code.
- MarketingSimulation importing 3C app code.
- 3C importing MarketingSimulation components, routes, CSS, API helpers, or architecture.
- 3C importing SocialSense internals or legacy CivicSense compatibility modules.
- 3C modifying SocialSense public API/runtime in PR1.
- 3C modifying MarketingSimulation or SocialSense repositories in PR1.

## SocialSense responsibilities

SocialSense owns:

- ConsumerSDK.
- Domain Pack loading/discovery.
- Marketing Domain Pack runtime.
- Fixture/offline scenario execution.
- Safety validators.
- Provenance/runtime annotations.
- Dashboard contract.
- Export contract and export safety.
- Determinism/runtime confidence evidence.

SocialSense does not own:

- 3C frontend UX.
- 3C routing.
- 3C onboarding.
- 3C executive copywriting.
- 3C product health dashboard.
- 3C roadmap/PR sequencing.

## 3C responsibilities

3C owns:

- Product positioning and user experience.
- Scenario setup workflow.
- UX language and safe onboarding.
- Integration adapter over SocialSense public SDK/runtime.
- Executive dashboard presentation.
- Export review screen and product-side export flow.
- Product health KPIs.
- Repo-local docs and future app tests.

3C does not own:

- SocialSense runtime behavior.
- SocialSense Marketing Domain Pack scenario logic.
- SocialSense safety validators.
- SocialSense public API compatibility.
- Old MarketingSimulation maintenance.

## Old MarketingSimulation responsibilities

Old MarketingSimulation is reference-only.

Allowed use:

- Inspect files/views to identify UX pain points.
- Cite evidence in audit docs.
- Derive “what not to repeat” principles.

Disallowed use:

- Copy UI, routes, state model, API helpers, CSS, components, or dashboard implementation.
- Treat old route/workflow architecture as migration source.
- Modify the old repository from this PR.

## Public SDK/runtime contract used by 3C

Current consumer-facing SocialSense contract evidence lists these as supported surfaces:

- `from socialsense import load_domain_pack`
- `from socialsense import ConsumerSDK`
- `DomainPack.run(...)`
- `DomainPack.export(...)`
- `DomainPack.runtime_annotation`
- `DomainPack.dashboard_contract`

3C must raise a dependency issue if it needs anything beyond these surfaces.

## Safety dependency boundary

SocialSense rejects or does not support live APIs, scraping, credentials, private social data, PII, CRM/customer data, voter lists, private messages, individual profiling, persuasion optimization, microtargeting, misinformation generation, and conversion guarantees.

3C must not weaken this boundary in UX copy, dashboard labels, export text, or product roadmap.

## Dependency health checks

PR1 checks:

- 3C docs exist and link to local docs.
- README documents boundaries.
- No file changes in SocialSense or MarketingSimulation.

Future checks:

- Adapter contract tests use SocialSense public SDK/runtime only.
- Dashboard mapping tests confirm provenance/limitations are preserved.
- Export review tests confirm unsupported formats are blocked.
- Dependency map is updated when SocialSense public consumer contract changes.

## Acceptance criteria

- Repository responsibilities are explicit.
- Allowed and disallowed dependency directions are documented.
- The dependency chain from SocialSense to Executive Report is visible.
- PR1 remains docs-only in 3C and does not modify SocialSense or MarketingSimulation.
