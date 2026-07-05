# Product Architecture

Status: M1 PR1 architecture foundation. This is a docs-only architecture decision record for future scaffold work. No app code is created in PR1.

## Architecture goal

3C Marketing Workbench should be a thin, UX-first product application over the SocialSense public consumer surface. The product app owns user workflows and executive presentation. SocialSense owns simulation, domain runtime, safety, provenance, dashboard contracts, and export contracts.

## Non-negotiable boundary

3C may consume SocialSense only through public SDK/runtime surfaces:

- `from socialsense import load_domain_pack`
- `from socialsense import ConsumerSDK`
- `DomainPack.run(...)`
- `DomainPack.export(...)`
- `DomainPack.runtime_annotation`
- `DomainPack.dashboard_contract`

3C must not import SocialSense internals, legacy CivicSense compatibility modules, private workbench classes, exporter internals, validators, or implementation paths.

## Future frontend structure

Future scaffold PRs should keep the frontend organized by product responsibility, not by platform internals.

Proposed structure when app code is approved:

```text
src/
  app/
    routes/
    shell/
    providers/
  product/
    onboarding/
    scenario-setup/
    simulation-review/
    dashboard/
    export-review/
    safety/
  integrations/
    socialsense/
      adapter.ts
      contracts.ts
      mappers.ts
      fixtures.ts
  state/
    workflow-store.ts
    run-store.ts
    export-store.ts
  components/
    ui/
    product/
  tests/
    contract/
    workflow/
    accessibility/
```

Notes:

- `product/*` owns screens and user flow.
- `integrations/socialsense/*` owns the product adapter only. It maps SocialSense public outputs into 3C view models.
- `state/*` owns client state and should not duplicate SocialSense runtime state.
- No SocialSense implementation code is copied.

## SocialSense integration boundary

3C Integration Adapter responsibilities:

- Load the Marketing Domain Pack through `load_domain_pack("marketing")` or `ConsumerSDK().load_domain_pack("marketing")`.
- Submit fixture/offline scenario inputs through `DomainPack.run(...)`.
- Read `runtime_annotation` and `dashboard_contract`.
- Request exports through `DomainPack.export(run, format="json" | "markdown" | "executive_json")`.
- Convert SocialSense responses into product view models.
- Preserve provenance, assumptions, limitations, evidence gaps, and safety boundaries unchanged or stronger.

Adapter must not:

- Modify SocialSense runtime behavior.
- Patch SocialSense validators.
- Bypass export safety.
- Call private modules.
- Add live APIs or credentials.
- Store or process PII/CRM/customer lists/private messages/voter lists.

## API boundary

PR1 does not create an API.

Future API options:

1. Frontend-only local adapter for fixture/offline demos if SocialSense can be safely invoked in the selected runtime environment.
2. Thin backend-for-frontend that wraps only SocialSense public SDK/runtime calls.

API requirements when implemented:

- All endpoints are fixture/offline and local/private until a later reviewed gate.
- Every response includes provenance and safety metadata.
- Export endpoints call SocialSense `DomainPack.export(...)` and do not generate unsupported formats.
- Fail closed if SocialSense returns unsafe, unsupported, or missing metadata.
- No endpoint accepts credentials, CRM/customer lists, PII, private messages/groups, voter lists, or live platform handles for scraping.

## State management

Future state should be simple and workflow-oriented:

- Onboarding state: first-run acknowledgements and selected sample scenario.
- Scenario state: template, business question, aggregate assumptions, channel mix.
- Run state: run ID, loading status, SocialSense source/provenance, dashboard contract, limitations.
- Dashboard state: selected comparison, visible insight cards, audit panel visibility.
- Export state: export readiness, selected format, review confirmation.

State rules:

- Do not store raw SocialSense internals that are not required by the UX.
- Do not store generated individual-level profiles for targeting.
- Do not persist sensitive input because MVP should not accept sensitive input.
- Treat SocialSense run payload as read-only evidence.

## Routing model

Future routes should be minimal:

```text
/                 Product overview + start safe sample
/workbench         7-step scenario workflow
/runs/:runId       Executive dashboard and audit panel
/exports/:runId    Export review and export actions
/health            Product health/status during private dogfooding
```

Route rules:

- Do not create old-style route sprawl in PR2.
- Do not expose platform setup pages as primary routes.
- Do not add live/campaign-production routes before safety approval.

## Export flow

Supported SocialSense formats for initial 3C integration:

- JSON
- Markdown
- Executive JSON

Required flow:

1. User completes simulation run.
2. 3C reads dashboard contract and runtime annotation.
3. 3C renders executive dashboard with provenance, assumptions, limitations, and evidence gaps.
4. User opens Export Review.
5. Export Review checks:
   - fixture/offline provenance present;
   - aggregate-only label present;
   - production-ready is false or equivalent limitation is visible;
   - disallowed-use warnings are visible;
   - SocialSense export safety result is available.
6. 3C calls `DomainPack.export(...)` for the selected supported format.
7. Export artifact preserves SocialSense safety metadata.

Disallowed in M1/MVP:

- PPT/PDF/CSV claims unless SocialSense supports them through a reviewed public contract.
- Client-side fallback export that bypasses SocialSense export safety.
- Export before review.

## Testing strategy

PR1 docs-only validation:

- `git diff --check`
- docs smoke test verifying required files exist and README links resolve.

Future scaffold PR testing:

- Unit tests for SocialSense adapter mapping.
- Contract tests using fixture/offline SocialSense public SDK output.
- Workflow tests for the 7-step flow.
- Export review tests that block missing provenance/limitations.
- Accessibility checks for core workflow and dashboard.
- Snapshot or schema tests for executive report view models.

Test rules:

- No live network calls.
- No credentials.
- No scraping.
- No external dependencies unless separately approved.
- Deterministic fixture inputs only.

## Rollback strategy

PR1 rollback:

- Revert this docs commit.
- No code/runtime changes are involved.

Future app rollback:

- Keep SocialSense adapter isolated so product UI can be reverted without changing SocialSense.
- Feature-flag new routes/workflows during private dogfooding.
- Preserve last-known-good fixture scenario and dashboard contract mapping.
- If SocialSense public contract changes, stop integration work and create a dependency issue rather than patching around internals.

## Architecture gate triggers

Stop and require review if any future PR:

- Needs a SocialSense public API/runtime change.
- Imports SocialSense internal or legacy CivicSense modules.
- Adds app scaffold outside the approved PR sequence.
- Introduces live APIs, scraping, credentials, CRM/customer lists, PII, private messages/groups, voter lists, or private social data.
- Adds microtargeting, persuasion optimization, misinformation workflow, or conversion guarantees.
- Adds export formats outside SocialSense-supported JSON, Markdown, and executive JSON.
- Copies UI/architecture/components from old MarketingSimulation or SocialSense.
- Presents synthetic results as production campaign outcomes.

## PR1 acceptance criteria

- Architecture boundary is documented.
- Future frontend structure is proposed without creating app code.
- Export flow is tied to SocialSense public export contract.
- Rollback and architecture gate triggers are explicit.
- No changes are made to SocialSense or MarketingSimulation.
