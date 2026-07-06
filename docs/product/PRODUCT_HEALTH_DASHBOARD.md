# Product Health Dashboard

Status: M6 Experiment Framework Planning complete and merged. Product Launch remains the first reference workflow; Campaign Message Test remains the second reference workflow; Experiment Framework is defined as the reusable business capability for future comparison workflows. A/B Message Comparison, Multivariate Testing, Creative Comparison, Promotion workflow, backend, runtime functionality, live APIs, private data, and SocialSense runtime changes are not authorized by M6.


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

- Closeout report: `docs/product/M2_3_CLOSEOUT_REPORT.md`
- PR: https://github.com/chawit1103/3c-marketing-workbench/pull/7
- Merge commit: `dbfd4f16fe931b6c9cc83d77cc1a2c4a91520cad`
- Scope: Product Launch UI/docs copy only; no new workflow.
- Platform wording: measured-sounding interaction counts replaced with fixture/offline channel cues.
- Lower-section density: dashboard risks/caveats and export evidence/limitations render fewer, more scannable items.
- Safety copy: global labels stay visible while the result preview uses a shorter safety note.
- Architecture Gate: not triggered.

## M2 Exit Review — Workflow Pattern Review

- PR: https://github.com/chawit1103/3c-marketing-workbench/pull/8
- Merge commit: `2710376ea134394cc5fc62b01b37000e7022f96f`
- Review: `docs/product/WORKFLOW_PATTERN_REVIEW.md`
- Guidelines: `docs/product/WORKFLOW_PATTERN_GUIDELINES.md`
- Decision: `docs/product/WORKFLOW_PATTERN_DECISION.md`
- Decision result: **GO**.
- Official reusable pattern: Input → Review → Run → Result Preview/Dashboard → Executive Summary → Export Review → Recommended Next Action.
- Product Review: GO.
- UX Review: GO.
- Research Review: GO.
- Engineering Review: GO.
- Future workflows: Campaign Message Test, Promotion, Campaign Response, and Brand Awareness are reusable; A/B Message Comparison and Product Feedback need extension, not redesign.
- Architecture Gate: not triggered.
- Next milestone recommendation: Campaign Message Test Planning only.

## M3 Campaign Domain Planning

- PR: https://github.com/chawit1103/3c-marketing-workbench/pull/9
- Merge commit: `1ac012c6c5a184f7786016419a10b42897711a8f`
- Domain analysis: `docs/product/CAMPAIGN_DOMAIN_ANALYSIS.md`
- Taxonomy: `docs/product/CAMPAIGN_TAXONOMY.md`
- Objectives: `docs/product/CAMPAIGN_OBJECTIVES.md`
- Data model: `docs/product/CAMPAIGN_DATA_MODEL.md`
- Workflow mapping: `docs/product/CAMPAIGN_WORKFLOW_MAPPING.md`
- Consumer mapping: `docs/product/CAMPAIGN_CONSUMER_MAPPING.md`
- Program decision: Campaign Domain defines the reusable business model for future marketing workflows.
- Business model completeness: Complete for planning.
- Workflow mapping completeness: Complete for planning.
- Domain boundary: 3C owns Campaign, Objective, Message, Audience, Offer, Evidence framing, and Recommendation UX; SocialSense remains a public dependency boundary and is not modified.
- Consumer mapping: 3C current; Corporate Communication, Healthcare Campaigns, Education Campaigns, and Consumer Research remain future consumers only.
- Architecture Gate: not triggered.
- Next milestone recommendation: Campaign Message Test Planning only after M3 receives GO.

## M4 Information Architecture & Design System Review

- Information Architecture: `docs/product/INFORMATION_ARCHITECTURE.md`
- Navigation Model: `docs/product/NAVIGATION_MODEL.md`
- Workflow Organization: `docs/product/WORKFLOW_ORGANIZATION.md`
- Design System Review: `docs/product/DESIGN_SYSTEM_REVIEW.md`
- Design Tokens: `docs/product/DESIGN_TOKENS.md`
- Component Reuse Matrix: `docs/product/COMPONENT_REUSE_MATRIX.md`
- Executive UX Review: `docs/product/EXECUTIVE_UX_REVIEW.md`
- Program decision: long-term IA groups workflows under Campaigns, with Research and Comparison as secondary Campaigns groups; Reports, Templates, History, Health, and Settings remain product areas without adding routes now.
- Product Launch compatibility: preserved; no breaking changes to Product Launch or approved Workflow Pattern are required.
- Component strategy: reuse shell, safety labels, cards, forms, assumptions preview, result hero, dashboard panels, executive summary, and export review; define extension needs before A/B/feedback/research implementation.
- Executive UX: GO candidate; product remains understandable if future workflows are grouped and reports remain discoverable.
- Architecture Gate: not triggered.
- Next milestone recommendation: Campaign Message Test implementation only after IA, Navigation, Design System, and Component Reuse receive GO.

## M5 Campaign Message Test Reference Workflow

- Reference workflow: `docs/product/CAMPAIGN_REFERENCE_WORKFLOW.md`
- Component reuse audit: `docs/product/COMPONENT_REUSE_AUDIT.md`
- UI route: `/workbench/campaign-message-test`
- Dashboard/export route reuse: `/runs/:runId` and `/exports/:runId` select the generated Product Launch or Campaign Message Test offline fixture by run id.
- Program decision: Campaign Message Test validates the reusable workflow strategy as the second reference workflow.
- Workflow Pattern reuse: Input → Review → Run → Dashboard → Executive Summary → Export Review → Recommended Next Action.
- Campaign Domain reuse: campaign name/brand, message, audience, platform mix, assumptions, evidence, limitations, confidence, and recommendation.
- Information Architecture reuse: Campaign Message Test lives under the existing Workbench/Campaigns model without primary navigation changes.
- Design System reuse: forms, cards, badges, buttons, dashboard panels, executive summary, safety labels, and export review are reused.
- dashboard reuse >80%: M5 audit records 90% reuse.
- component reuse >80%: M5 audit records 92% reuse.
- Export reuse: 100%; no new export formats.
- Architecture Gate: not triggered.
- Next milestone recommendation: A/B Message Comparison planning only if M5 review gates approve reuse strategy; do not implement A/B automatically.

## M6 Experiment Framework Planning

- Domain analysis: `docs/product/EXPERIMENT_DOMAIN_ANALYSIS.md`
- Taxonomy: `docs/product/EXPERIMENT_TAXONOMY.md`
- Data model: `docs/product/EXPERIMENT_DATA_MODEL.md`
- Workflow mapping: `docs/product/EXPERIMENT_WORKFLOW_MAPPING.md`
- Consumer mapping: `docs/product/EXPERIMENT_CONSUMER_MAPPING.md`
- Workflow compatibility: `docs/product/EXPERIMENT_WORKFLOW_COMPATIBILITY.md`
- Program decision: Experiment is being defined as a reusable capability; A/B Message Comparison should be one future implementation/configuration, not a one-off workflow architecture.
- Workflow Pattern compatibility: GO candidate; Input → Review → Run → Result Preview / Dashboard → Executive Summary → Export Review → Recommended Next Action is sufficient for planning.
- Campaign Domain compatibility: preserved; Experiment extends Campaign with variants, hypothesis, evaluation, comparison, decision, evidence, confidence, and recommendation.
- Information Architecture: preserved; future Experiment workflows remain under Campaigns → Comparison without primary navigation changes.
- Design System: preserved; future variant inputs and side-by-side comparison cards are bounded extensions, not redesign triggers.
- SocialSense boundary: preserved; no runtime changes, no new scenario, no private imports, and no SocialSense modification.
- Architecture Gate: not triggered.
- Next milestone recommendation: A/B Message Comparison implementation only after M6 receives GO; do not implement A/B automatically.

## Summary

| Area | Current status | Current target | Notes |
|---|---|---|---|
| UX simplicity | Green after M2 Exit | Maintain Green | Product Launch is reusable pattern with P1 friction cleared; future workflows must preserve quick-start and low cognitive load. |
| Workflow completion | Green for Product Launch | Reuse pattern | Default Product Launch sample is one-click to first result; future workflows must preserve the Input → Review → Run → Result path. |
| Onboarding clarity | Green | Reuse pattern | Product Launch mode, assumptions preview, and export-readiness language define the onboarding pattern. |
| SocialSense integration health | Green | Preserve public boundary | Product-owned adapter exists, uses SocialSense public SDK only, and local smoke covers Product Launch plus Campaign Message Test fixture generation. |
| Export readiness | Green for preview pattern | Future real export gated | `/exports/:runId` shows readiness/status from the generated fixture and does not claim a download. |
| Dashboard readiness | Green for Product Launch and Campaign Message Test | Reuse pattern | `/runs/:runId` renders marketing-friendly cards, caveats, and recommendations from generated offline fixtures. |
| Component foundation | Green for PR2 | Green every PR | Tokens, cards, badges, buttons, forms, states, and responsive layout exist. |
| Test/build status | Green for M6 docs validation | Green every PR | Docs smoke, M6 docs-only diff guard, and diff check pass for planning; implementation regressions remain available for future implementation milestones. |
| Safety posture | Green | Green every PR | Frontend shell plus generated offline sample only; no backend, live APIs, credentials, PII, auth, private data, or production campaign workflow. |
| Workflow pattern readiness | GO | M2 Exit Review + M6 compatibility | Product Launch is official reusable pattern; Campaign Message Test is the second reference workflow; Experiment Framework compatibility is being reviewed before any A/B implementation. |
| Campaign Domain readiness | GO | M3 review gates | Business model, taxonomy, objectives, data model, workflow mapping, and consumer mapping are complete for planning. |
| Information Architecture readiness | GO | M4 review gates | Future product areas and workflow homes are defined; M5 reuses them without primary nav changes. |
| Design system readiness | GO | M4 review gates | Component inventory, token standards, and reuse matrix are reused by M5. |
| Campaign Message Test readiness | Complete | M5 review gates | Second reference workflow implemented with dashboard reuse >80% and component reuse >80%. |
| Experiment Framework readiness | In planning | M6 review gates | Experiment Domain, Taxonomy, Data Model, Workflow Mapping, Consumer Mapping, and Workflow Compatibility are being defined before A/B implementation. |

## KPI baseline

| KPI | Current value | Measurement method | Next target |
|---|---:|---|---:|
| Documented route patterns | 6 | Route resolver and README route list | Keep primary navigation unchanged while adding workflow routes only when approved |
| Implemented backend endpoints | 0 | Code/docs smoke review | 0 in M6 |
| SocialSense adapter modules | 2 | Code/docs smoke review | Adapter package + public SDK smoke in PR3 |
| Local adapter smoke paths | 2 | Code/smoke review | `product_launch` and Campaign Message Test fixture paths through public SDK/product adapter |
| Docs smoke checks | Passing | `scripts/docs_smoke.py` | Keep smoke-required docs and safety checks passing |
| README docs map links | 38 linked docs | README link scan in docs smoke | Keep all linked docs resolving |
| README doc links valid | 100% | Docs smoke | 100% |
| Visible safety labels | 7 labels | Unit test | Present on every shell route |
| Live API usage | 0 | Code review/tests | 0 |
| PII/CRM/private-data input paths | 0 | Code review/tests | 0 |
| Production/conversion guarantee claims | 0 intended | Copy review/tests | 0 |
| Dogfood task completion estimate | <60 sec target / 1-click default | M2.1 UI structure | Top quick-start action supports first result with defaults before scrolling |
| Dashboard readability score | 4/5 target | M2.3 polish | Lower sections are more scannable; accessibility dogfood remains future work |
| Safety clarity score | 4.5/5 maintained | M2.3 polish | Safety labels remain visible; repeated result/caveat wording is reduced |
| Export review usefulness score | 3/5 baseline | M2.1 burn-down | Export route now says readiness preview and not a download action |
| Workflow Reuse % | 91% | M5 component reuse audit | Target >80% |
| Component Reuse % | 92% | M5 component reuse audit | Target >80% |
| Dashboard Reuse % | 90% | M5 component reuse audit | Target >80% |
| Export Reuse % | 100% | M5 component reuse audit | No new export formats |

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

Historical PR4 target:

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

Current state: Product Launch and Campaign Message Test are usable end-to-end for generated offline fixtures; Product Launch remains the first reference workflow and Campaign Message Test is the second reference workflow.

Current measurement:

- User starts the safe Product Launch sample.
- User completes required form fields.
- User runs the local offline review action.
- User reaches dashboard and export review.
- User sees supported JSON, Markdown, and Executive Summary readiness.

Future target:

- Private dogfooding completion rate >=80% for safe sample workflow before expanding features.

## Onboarding clarity tracker

Historical PR4 baseline:

- README explains product purpose and boundaries.
- Home page starts from safe scenario comparison language.
- Safety labels appear globally.
- Upload/customer-list flows do not exist.

Future target:

- First screen explains fixture/offline, synthetic aggregate mode before run.
- User can start with a reviewed sample scenario without uploading data.

## SocialSense integration health

Historical PR4 baseline:

- Product-owned adapter exists at `integrations/socialsense/adapter.py`.
- Adapter imports only `from socialsense import load_domain_pack` from the SocialSense public SDK facade.
- Adapter maps only aggregate `scenario`, `platform_mix`, `seed`, `assumptions`, and `notes`.
- Local smoke executes SocialSense Marketing Domain Pack `product_launch` and verifies `json`, `markdown`, and `executive_json` export statuses.
- Provenance, limitations, evidence gaps, human review questions, and safety boundaries are preserved.
- UI workflow integration is implemented for the Product Launch generated fixture only.

## Export readiness

Historical PR4 baseline:

- Export route renders JSON, Markdown, and Executive Summary readiness/status from the generated offline fixture.
- No downloadable report package is generated yet; this is a reviewed export-readiness view.
- No unsupported format is presented as available.

Future health checks:

- Export button disabled until run and required review data are available.
- Export review shows boundaries and limitations.
- Unsupported formats are not shown.
- No client-side fallback bypasses platform export safety.

## Dashboard readiness

Historical PR4 baseline:

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

Current validation suite includes:

- `npm run test`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `python3 scripts/docs_smoke.py`
- `python3 -m unittest discover -s tests -p 'test_*.py'`
- `PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/generate_product_launch_fixture.py`
- `PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/generate_campaign_message_test_fixture.py`
- `PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py`
- `git diff --check`

Future required:

- A/B Message Comparison implementation only if M6 receives GO and confirms the reusable Experiment Framework.
- Shared loading/error/empty-state conventions before async or multi-variant implementation.
- Accessibility checks for core pages.
- Broader workflow tests only after a future implementation milestone is explicitly authorized.

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

Current Product Launch debt:

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

Next milestone: A/B Message Comparison implementation only if M6 receives GO.

Scope must remain blocked unless Experiment Framework validates the reusable Experiment Domain, Taxonomy, Data Model, Workflow Mapping, Consumer Mapping, and Workflow Compatibility.

Implementation should deliver:

- A/B Message Comparison as a configuration/implementation of Experiment Framework;
- Message A / Message B input, review, dashboard, export, and recommendation using Experiment objects;
- reuse of existing Workflow Pattern, Campaign Domain, IA, Navigation Model, Design System, dashboard, export review, safety labels, and public adapter boundary;
- validation and safety acceptance criteria from M6;
- no backend, live APIs, CRM/customer data, PII/private data, SocialSense changes, Promotion workflow, Multivariate Testing, Creative Comparison, production campaign optimization, or conversion guarantee claims.

Do not start A/B Message Comparison implementation from this dashboard alone.

Backlog source: `docs/product/UX_FRICTION_BACKLOG.md`.

## Historical PR4 acceptance criteria

- Health dashboard reflects Product Launch vertical slice readiness.
- Route count, tests/build status, generated fixture readiness, and safety posture are explicit.
- Dashboard is honest that outputs are generated offline samples, not production predictions.
