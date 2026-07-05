# Product Health Dashboard

Status: M1 PR2 scaffold readiness. This dashboard tracks the current safe frontend shell and keeps later workflow, SocialSense integration, dashboard, and export claims explicitly out of scope until reviewed PRs.

## Summary

| Area | Current status | Target for M1 | Notes |
|---|---|---|---|
| UX simplicity | Green for PR2 shell | Green by PR4 | Five route patterns only; low-cognitive-load placeholders. |
| Workflow completion | Not implemented | Measured by PR4 | `/workbench` shows a 7-step skeleton only; no real run. |
| Onboarding clarity | Yellow/Green | Green by PR4 | Home and safety labels explain fixture/offline and aggregate-only boundaries. |
| SocialSense integration health | Not started | Green by PR3 | No adapter exists in PR2. Public boundary remains documented only. |
| Export readiness | Not started | Green by PR4 | `/exports/:runId` is a disabled placeholder; no files are prepared. |
| Dashboard readiness | Scaffolded placeholder | Green by PR4 | `/runs/:runId` reserves page structure only; no real result. |
| Design system readiness | Green for PR2 | Green every PR | Tokens, cards, badges, buttons, forms, states, and responsive layout exist. |
| Test/build status | Green for PR2 | Green every PR | Unit tests, typecheck, lint, build, docs smoke, and diff check pass. |
| Safety posture | Green for PR2 | Green every PR | Frontend shell only; no backend, live APIs, credentials, PII, auth, or SocialSense adapter. |

## KPI baseline

| KPI | PR2 value | Measurement method | Next target |
|---|---:|---|---:|
| Documented route patterns | 5 | Route resolver and README route list | <=5 until workflow need is proven |
| Implemented backend endpoints | 0 | Code/docs smoke review | 0 in PR2 |
| SocialSense adapter modules | 0 | Code/docs smoke review | PR3 only |
| Real simulation paths | 0 | Code/UI review | PR3+ only after review |
| Required docs complete | 8/8 | Docs smoke | 8/8 |
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

Current PR2 baseline:

- No SocialSense adapter exists.
- No SocialSense imports exist in frontend shell code.
- SocialSense remains a documented dependency boundary only.

Future health checks for PR3:

- Adapter has no private imports.
- Contract tests use fixture/offline data only.
- Provenance, limitations, assumptions, and evidence gaps are preserved.
- Missing metadata fails closed.

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

PR2 required and verified:

- `npm run test`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `python3 scripts/docs_smoke.py`
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

Current PR2 debt:

- No real workflow state yet by design.
- No adapter contract tests yet by design.
- No accessibility automation beyond current render tests.
- No manual browser QA record in docs yet.

Future debt to watch:

- Duplicated platform contract models in frontend.
- Dashboard over-rendering raw platform fields.
- Export format drift from approved contract.
- Route sprawl.

## Next milestone

Next milestone: PR3 SocialSense adapter fixture contract.

PR3 should deliver:

- isolated adapter over public surfaces only;
- deterministic fixture/offline contract tests;
- no private imports;
- no live APIs, credentials, customer data, or production claims;
- no visible UI overclaiming real simulation readiness.

PR4 should then deliver the executive dashboard and export review workflow.

## PR2 acceptance criteria

- Health dashboard reflects scaffold readiness, not completed workflows.
- Route count, tests/build status, design system readiness, and safety posture are explicit.
- Dashboard is honest that SocialSense integration, real simulation, and export generation are not implemented.
