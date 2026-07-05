# Product Health Dashboard

Status: M2.3 Product Launch copy/readability polish in review. UX Health remains **91/100 target — Green** after platform wording, lower-section density, and repeated safety-copy refinements. Product Launch remains the only workflow in scope.


## M1 PR4 closeout

- PR: https://github.com/chawit1103/3c-marketing-workbench/pull/4
- Merge commit: `3fe4300f44869e35c40a427ef8db8b1b5df3bd3d`
- Closeout report: `docs/product/M1_PR4_CLOSEOUT_REPORT.md`
- Post-merge validation: PASS on `main`.
- Architecture Gate: not triggered.
- Next milestone recommendation: M2 — Private Dogfooding and UX Friction Review.

## M2 dogfooding review

- Dogfooding report: `docs/product/M2_DOGFOODING_REPORT.md`
- UX friction backlog: `docs/product/UX_FRICTION_BACKLOG.md`
- Scope: existing Product Launch Simulation vertical slice only.
- Result: GO WITH FRICTION BACKLOG for private dogfooding.
- Task completion: default sample can complete in under 1 minute; thoughtful edited scenario estimated at 2–4 minutes.
- Key friction: below-fold run/result, disabled Objective select, dense dashboard/export copy, missing real export action.
- Safety clarity: Green; labels are trusted and explicit, but repetition should be tuned carefully.
- Architecture Gate: not triggered.

## M2.1 UX friction burn-down

- Burn-down report: `docs/product/M2_1_UX_FRICTION_BURNDOWN.md`
- Closeout report: `docs/product/M2_1_CLOSEOUT_REPORT.md`
- PR: https://github.com/chawit1103/3c-marketing-workbench/pull/6
- Merge commit: `e8bfbef16efa8b8e20041727229ef9933fd81716`
- Final UX Health score: **88/100 — Green/Yellow**
- Scope: Product Launch only; no new workflows.
- Positioning: visible copy now uses `Marketing Decision Workbench` while repo/package names remain unchanged.
- Run visibility: top quick-start panel exposes `Run offline simulation` before the full form.
- Objective clarity: disabled dropdown replaced by static Product Launch mode messaging.
- Result discoverability: first result includes a visible Recommended next action region.
- Export clarity: route is now `Export Readiness Preview` and explicitly says it is not a download action.
- UX KPI assumptions: first run is 1 click with defaults, <=5 visible text inputs, and <=3 top-screen decisions.
- Architecture Gate: not triggered.

## M2.3 copy/readability polish

- Scope: Product Launch UI/docs copy only; no new workflow.
- Platform wording: measured-sounding interaction counts replaced with fixture/offline channel cues.
- Lower-section density: dashboard risks/caveats and export evidence/limitations render fewer, more scannable items.
- Safety copy: global labels stay visible while the result preview uses a shorter safety note.
- Architecture Gate: not triggered.

## Summary

| Area | Current status | Current target | Notes |
|---|---|---|---|
| UX simplicity | Green/Yellow after M2.1 burn-down | M2.1 validation | Product Launch flow is easier to start; top quick-start action reduces below-fold run friction. |
| Workflow completion | Green for default sample | M2.1 validation | Default sample is one click to first result; edited scenario remains bounded by <=5 visible text inputs. |
| Onboarding clarity | Green/Yellow | M2.1 validation | Static Product Launch mode clarifies the current workflow; fixed-sample explanation remains visible. |
| SocialSense integration health | Green for PR3 smoke | Green by PR3 | Product-owned adapter exists, uses SocialSense public SDK only, and local smoke runs `product_launch`. |
| Export readiness | Green for PR4 sample | Green by PR4 | `/exports/:runId` shows JSON, Markdown, and Executive Summary readiness/status from the generated fixture. |
| Dashboard readiness | Green for PR4 sample | Green by PR4 | `/runs/:runId` renders marketing-friendly Product Launch cards and caveats from the generated fixture. |
| Design system readiness | Green for PR2 | Green every PR | Tokens, cards, badges, buttons, forms, states, and responsive layout exist. |
| Test/build status | Green for PR4 | Green every PR | Unit tests, typecheck, lint, build, docs smoke, Python adapter/fixture tests, fixture generation, local smoke, and diff check pass. |
| Safety posture | Green for PR4 | Green every PR | Frontend shell plus generated offline sample only; no backend, live APIs, credentials, PII, auth, private data, or production campaign workflow. |

## KPI baseline

| KPI | PR4 value | Measurement method | Next target |
|---|---:|---|---:|
| Documented route patterns | 5 | Route resolver and README route list | <=5 until workflow need is proven |
| Implemented backend endpoints | 0 | Code/docs smoke review | 0 in PR4 |
| SocialSense adapter modules | 2 | Code/docs smoke review | Adapter package + public SDK smoke in PR3 |
| Local adapter smoke paths | 1 | Code/smoke review | `product_launch` fixture through public SDK plus generated UI fixture in PR4 |
| Required docs complete | 9/9 | Docs smoke | 9/9 |
| README doc links valid | 100% | Docs smoke | 100% |
| Visible safety labels | 7 labels | Unit test | Present on every shell route |
| Live API usage | 0 | Code review/tests | 0 |
| PII/CRM/private-data input paths | 0 | Code review/tests | 0 |
| Production/conversion guarantee claims | 0 intended | Copy review/tests | 0 |
| Dogfood task completion estimate | <60 sec target / 1-click default | M2.1 UI structure | Top quick-start action supports first result with defaults before scrolling |
| Dashboard readability score | 4/5 target | M2.3 polish | Lower sections are more scannable; accessibility dogfood remains future work |
| Safety clarity score | 4.5/5 maintained | M2.3 polish | Safety labels remain visible; repeated result/caveat wording is reduced |
| Export review usefulness score | 3/5 baseline | M2.1 burn-down | Export route now says readiness preview and not a download action |

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

Current PR4 target:

- One primary product concept: executive marketing scenario workbench.
- One proposed core flow: a guided Product Launch review flow.
- Five route patterns and no settings/admin/auth route sprawl.
- Technical platform concepts are not primary UX copy.

Risks:

- Later dashboard work could become too dense.
- PR3 adapter work could leak platform terms into user-facing copy.

Mitigation:

- Keep product principles as PR3/PR4 gates.
- Preserve executive language: assumptions, limitations, confidence, evidence gaps, and human review.

## Workflow completion tracker

Current state: PR4 Product Launch sample workflow is usable end-to-end for a generated offline fixture.

Current measurement:

- User starts the safe Product Launch sample.
- User completes required form fields.
- User runs the local offline review action.
- User reaches dashboard and export review.
- User sees supported JSON, Markdown, and Executive Summary readiness.

Future target:

- Private dogfooding completion rate >=80% for safe sample workflow before expanding features.

## Onboarding clarity tracker

Current PR4 baseline:

- README explains product purpose and boundaries.
- Home page starts from safe scenario comparison language.
- Safety labels appear globally.
- Upload/customer-list flows do not exist.

Future target:

- First screen explains fixture/offline, synthetic aggregate mode before run.
- User can start with a reviewed sample scenario without uploading data.

## SocialSense integration health

Current PR4 baseline:

- Product-owned adapter exists at `integrations/socialsense/adapter.py`.
- Adapter imports only `from socialsense import load_domain_pack` from the SocialSense public SDK facade.
- Adapter maps only aggregate `scenario`, `platform_mix`, `seed`, `assumptions`, and `notes`.
- Local smoke executes SocialSense Marketing Domain Pack `product_launch` and verifies `json`, `markdown`, and `executive_json` export statuses.
- Provenance, limitations, evidence gaps, human review questions, and safety boundaries are preserved.
- UI workflow integration is implemented for the Product Launch generated fixture only.

## Export readiness

Current PR4 baseline:

- Export route renders JSON, Markdown, and Executive Summary readiness/status from the generated offline fixture.
- No downloadable report package is generated yet; this is a reviewed export-readiness view.
- No unsupported format is presented as available.

Future health checks:

- Export button disabled until run and required review data are available.
- Export review shows boundaries and limitations.
- Unsupported formats are not shown.
- No client-side fallback bypasses platform export safety.

## Dashboard readiness

Current PR4 baseline:

- Dashboard route renders the generated Product Launch sample with directional synthetic aggregate signals.
- The dashboard shows assumptions, source/review context, limitations, evidence gaps, caveats, and recommended next test.
- Copy states the result is an offline sample, not production prediction evidence.

Future dashboard acceptance:

- Shows what was tested.
- Shows scenario result as directional/synthetic aggregate evidence.
- Shows source/review context and fixture/offline mode.
- Shows assumptions, limitations, evidence gaps, and human review questions.
- Avoids conversion guarantees, live campaign claims, and production certainty.

## Test status

PR4 required and verified:

- `npm run test`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `python3 scripts/docs_smoke.py`
- `python3 -m unittest discover -s tests -p 'test_*.py'`
- `PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/generate_product_launch_fixture.py`
- `PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py`
- `git diff --check`

Future required:

- Private dogfooding walkthroughs in M2.
- Workflow timing and confusion metrics in M2.
- Broader campaign/A-B workflow tests in later PRs.
- Accessibility checks for core pages.

## Known risks

| Risk | Severity | Owner | Mitigation |
|---|---|---|---|
| Product copies old MarketingSimulation UX complexity | High | 3C | Audit and principles explicitly ban copying old UI/architecture. |
| Adapter needs SocialSense API not currently public | High | 3C + SocialSense | Stop and open dependency review; do not import internals. |
| Dashboard implies production prediction | High | 3C | Use directional language and review labels; block unsafe claims. |
| Export bypasses safety review | High | 3C | Export review is visible in PR4; keep unsupported formats blocked. |
| PR4 sample overclaims predictive readiness | Medium | 3C | Copy states generated offline sample and no production prediction. |
| Limited dogfooding metrics | Reduced in M2 | Product | M2 report captures proxy timing estimates, readability scores, safety clarity, and export usefulness; real private-user timed walkthroughs remain future validation. |

## Technical debt register

Current PR4 debt:

- Workflow state is client-only and sample-only by design.
- Browser-entered values are review assumptions beside the generated fixture, not arbitrary live simulation inputs.
- No accessibility automation beyond current render tests.
- No persistent workspace or downloadable report package yet.

Future debt to watch:

- Duplicated platform contract models in frontend.
- Dashboard over-rendering raw platform fields.
- Export format drift from approved contract.
- Route sprawl.

## Next milestone

Next milestone: Product Launch private walkthrough validation.

Next step should deliver:

- one timed private Product Launch walkthrough using the merged M2.1 quick-start flow;
- confirmation that no P1 friction remains in run visibility, objective clarity, result discoverability, safety clarity, or export-readiness wording;
- a recommendation on whether to plan the next workflow.

Do not start Campaign Message Test or A/B Message Comparison until Product Launch stabilization is explicitly accepted.

Backlog source: `docs/product/UX_FRICTION_BACKLOG.md`.

## PR4 acceptance criteria

- Health dashboard reflects Product Launch vertical slice readiness.
- Route count, tests/build status, generated fixture readiness, and safety posture are explicit.
- Dashboard is honest that outputs are generated offline samples, not production predictions.
