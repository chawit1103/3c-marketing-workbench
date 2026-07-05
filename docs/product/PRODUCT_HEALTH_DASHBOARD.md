# Product Health Dashboard

Status: M1 PR3 adapter smoke readiness. This dashboard tracks the current safe frontend shell plus product-owned SocialSense public SDK adapter smoke; UI workflow, dashboard wiring, and export review remain out of scope until PR4.

## Summary

| Area | Current status | Target for M1 | Notes |
|---|---|---|---|
| UX simplicity | Green for PR2 shell | Green by PR4 | Five route patterns only; low-cognitive-load placeholders. |
| Workflow completion | Not implemented | Measured by PR4 | `/workbench` shows a 7-step skeleton only; no real run. |
| Onboarding clarity | Yellow/Green | Green by PR4 | Home and safety labels explain fixture/offline and aggregate-only boundaries. |
| SocialSense integration health | Green for PR3 smoke | Green by PR3 | Product-owned adapter exists, uses SocialSense public SDK only, and local smoke runs `product_launch`. |
| Export readiness | Not started | Green by PR4 | `/exports/:runId` is a disabled placeholder; no files are prepared. |
| Dashboard readiness | Scaffolded placeholder | Green by PR4 | `/runs/:runId` reserves page structure only; no real result. |
| Design system readiness | Green for PR2 | Green every PR | Tokens, cards, badges, buttons, forms, states, and responsive layout exist. |
| Test/build status | Green for PR3 | Green every PR | Unit tests, typecheck, lint, build, docs smoke, Python adapter tests, local smoke, and diff check pass. |
| Safety posture | Green for PR3 | Green every PR | Frontend shell plus public-SDK adapter only; no backend, live APIs, credentials, PII, auth, private data, or production campaign workflow. |

## KPI baseline

| KPI | PR3 value | Measurement method | Next target |
|---|---:|---|---:|
| Documented route patterns | 5 | Route resolver and README route list | <=5 until workflow need is proven |
| Implemented backend endpoints | 0 | Code/docs smoke review | 0 in PR3 |
| SocialSense adapter modules | 2 | Code/docs smoke review | Adapter package + public SDK smoke in PR3 |
| Local adapter smoke paths | 1 | Code/smoke review | `product_launch` fixture through public SDK in PR3 |
| Required docs complete | 9/9 | Docs smoke | 9/9 |
| README doc links valid | 100% | Docs smoke | 100% |
| Visible safety labels | 7 labels | Unit test | Present on every shell route |
| Live API usage | 0 | Code review/tests | 0 |
| PII/CRM/private-data input paths | 0 | Code review/tests | 0 |
| Production/conversion guarantee claims | 0 intended | Copy review/tests | 0 |

## Scaffold readiness

PR2 delivered:

- React/Vite/TypeScript frontend shell;
- package metadata and npm lockfile;
- route resolver for `/`, `/workbench`, `/runs/:runId`, `/exports/:runId`, and `/health`;
- app shell navigation;
- global safety boundary labels;
- product cards and placeholder result cards;
- CSS design tokens for color, spacing, typography, cards, badges, forms, buttons, states, and responsive grids;
- unit tests for rendering, route resolution, safety labels, navigation, and visible UI copy boundaries.

PR2 intentionally did not deliver:

- backend;
- authentication;
- credentials or secret management;
- live APIs;
- SocialSense adapter;
- real simulation;
- persistence;
- real export generation.

## UX simplicity tracker

Current PR2 target:

- One primary product concept: executive marketing scenario workbench.
- One proposed core flow: seven steps, represented as a skeleton only.
- Five route patterns and no settings/admin/auth route sprawl.
- Technical platform concepts are not primary UX copy.

Risks:

- Later dashboard work could become too dense.
- PR3 adapter work could leak platform terms into user-facing copy.

Mitigation:

- Keep product principles as PR3/PR4 gates.
- Preserve executive language: assumptions, limitations, confidence, evidence gaps, and human review.

## Workflow completion tracker

Current state: PR2 route skeleton only. Workflow is not usable end-to-end.

Future measurement:

- User starts safe sample scenario.
- User completes 7-step workflow.
- User reaches dashboard.
- User opens export review.
- User exports a supported format.

Future target:

- Private dogfooding completion rate >=80% for safe sample workflow before expanding features.

## Onboarding clarity tracker

Current PR2 baseline:

- README explains product purpose and boundaries.
- Home page starts from safe scenario comparison language.
- Safety labels appear globally.
- Upload/customer-list flows do not exist.

Future target:

- First screen explains fixture/offline, synthetic aggregate mode before run.
- User can start with a reviewed sample scenario without uploading data.

## SocialSense integration health

Current PR3 baseline:

- Product-owned adapter exists at `integrations/socialsense/adapter.py`.
- Adapter imports only `from socialsense import load_domain_pack` from the SocialSense public SDK facade.
- Adapter maps only aggregate `scenario`, `platform_mix`, `seed`, `assumptions`, and `notes`.
- Local smoke executes SocialSense Marketing Domain Pack `product_launch` and verifies `json`, `markdown`, and `executive_json` export statuses.
- Provenance, limitations, evidence gaps, human review questions, and safety boundaries are preserved.
- UI workflow integration remains deferred to PR4.

## Export readiness

Current PR2 baseline:

- Export route exists only as a disabled review placeholder.
- No export file is generated.
- No unsupported format is presented as available.

Future health checks:

- Export button disabled until run and required review data are available.
- Export review shows boundaries and limitations.
- Unsupported formats are not shown.
- No client-side fallback bypasses platform export safety.

## Dashboard readiness

Current PR2 baseline:

- Dashboard route exists only as a placeholder.
- No real scenario result is produced.
- Placeholder copy states later aggregate review only.

Future dashboard acceptance:

- Shows what was tested.
- Shows scenario result as directional/synthetic aggregate evidence.
- Shows source/review context and fixture/offline mode.
- Shows assumptions, limitations, evidence gaps, and human review questions.
- Avoids conversion guarantees, live campaign claims, and production certainty.

## Test status

PR3 required and verified:

- `npm run test`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `python3 scripts/docs_smoke.py`
- `python3 -m unittest discover -s tests -p 'test_*.py'`
- `PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py`
- `git diff --check`

Future required:

- Adapter contract tests in PR3.
- Workflow tests for the 7-step flow in PR4.
- Export review blocking tests in PR4.
- Dashboard rendering tests in PR4.
- Accessibility checks for core pages.

## Known risks

| Risk | Severity | Owner | Mitigation |
|---|---|---|---|
| Product copies old MarketingSimulation UX complexity | High | 3C | Audit and principles explicitly ban copying old UI/architecture. |
| Adapter needs SocialSense API not currently public | High | 3C + SocialSense | Stop and open dependency review; do not import internals. |
| Dashboard implies production prediction | High | 3C | Use directional language and review labels; block unsafe claims. |
| Export bypasses safety review | High | 3C | Mandatory export review in PR4; no real export in PR2. |
| PR2 shell overclaims workflow readiness | Medium | 3C | Copy states placeholders and no real simulation. |
| No real dogfooding metrics yet | Medium | Product | Add after PR4 private walkthroughs. |

## Technical debt register

Current PR3 debt:

- No real workflow state yet by design.
- Adapter contract tests and local smoke exist; PR4 still needs UI-level adapter integration tests.
- No accessibility automation beyond current render tests.
- No manual browser QA record for adapter-driven UI yet.

Future debt to watch:

- Duplicated platform contract models in frontend.
- Dashboard over-rendering raw platform fields.
- Export format drift from approved contract.
- Route sprawl.

## Next milestone

Next milestone: PR4 executive dashboard and export review workflow.

PR4 should deliver:

- product launch workflow wiring over the PR3 adapter;
- executive dashboard rendering from approved SocialSense contracts;
- export review using SocialSense-supported formats only;
- provenance, limitations, and safety boundaries visible before export.

## PR3 acceptance criteria

- Health dashboard reflects adapter smoke readiness, not completed workflows.
- Route count, tests/build status, design system readiness, and safety posture are explicit.
- Dashboard is honest that UI workflow integration and export review are not implemented.
