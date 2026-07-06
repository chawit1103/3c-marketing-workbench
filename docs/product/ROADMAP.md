# Roadmap

Status: M16 Feature Freeze and Demo Readiness is in progress. PR1-PR4 and M2-M15 are complete; Feature Freeze v0.1 is declared for Product Launch, Campaign Message Test, A/B Experiment, Creative Comparison, Campaign Workspace, Executive Summary, Export Review, Safety Labels, Product Health Dashboard, and the SocialSense public adapter boundary. M16 is release readiness only: no new workflow, backend, SocialSense capability, live API, persistence, auth, CRM/customer data, PII/private data, production automation, workflow redesign, or workspace redesign.

## Program

Program: 3C Marketing Workbench M1 — product architecture and safe fixture/offline workbench foundation.

Program goals:

- Establish 3C as the official product app.
- Keep SocialSense as the platform dependency.
- Define UX principles, architecture boundaries, dependency map, roadmap, health dashboard, and agent instructions.
- Deliver a minimal safe frontend shell, SocialSense public-adapter smoke, and Product Launch vertical slice before broader workflows.

Program non-goals:

- No backend in M1.
- No live SocialSense calls from the browser.
- No arbitrary browser-input simulation until a later reviewed architecture gate.
- No live APIs, scraping, credentials, PII, CRM/customer lists, private messages/groups, voter lists, microtargeting, persuasion optimization, misinformation workflow, conversion guarantees, or production campaign claims.

## M1 PR sequence

| PR | Branch | Theme | Scope | Exit criteria |
|---|---|---|---|---|
| PR1 | `m1-pr1-product-architecture-ux-audit` | Product architecture + UX audit + roadmap docs | Docs only. Define product principles, architecture, dependency map, roadmap, health dashboard, README, AGENTS. | Required docs exist, README links resolve, `git diff --check` passes, docs smoke passes, committed. |
| PR2 | `m1-pr2-frontend-shell-design-system` | Safe frontend shell + design system | Complete. React/Vite/TypeScript shell, route placeholders, safety labels, initial design system, tests/build/docs smoke. No backend, no real simulation. | `npm run test`, `npm run typecheck`, `npm run lint`, `npm run build`, docs smoke, and `git diff --check` pass; core routes render; safety banner visible. |
| PR3 | `m1-pr3-socialsense-adapter-smoke` | SocialSense adapter smoke | Complete. Isolated product-owned adapter using public SDK/runtime only, Python unit tests, docs smoke checks, and local `product_launch` fixture smoke. | Adapter tests prove no private imports; local smoke runs SocialSense Marketing Domain Pack and exports JSON/Markdown/Executive Summary; provenance/safety preserved. |
| PR4 | `m1-pr4-product-launch-vertical-slice` | Product Launch vertical slice | Complete. Generated an offline product-launch fixture through the PR3 adapter and rendered `/workbench`, `/runs/:runId`, and `/exports/:runId` as a usable UX slice. | Workflow usable, result cards render, export review shows JSON/Markdown/Executive Summary readiness, safety labels visible, all gates pass. |

## PR2 epics, features, tasks

### Epic 1: Safe app scaffold

Feature: Minimal React/Vite/TypeScript frontend shell.

Tasks:

- Add npm package metadata and lockfile.
- Add Vite/React/TypeScript entrypoints.
- Add route resolver and app shell.
- Keep all behavior frontend-only and fixture/offline.

Acceptance criteria:

- Install/build/test commands are real and documented.
- No backend, auth, live API, credential, SocialSense adapter, or real simulation code exists.

### Epic 2: Routes and low-complexity UX

Feature: Initial route placeholders.

Tasks:

- Implement `/`, `/workbench`, `/runs/:runId`, `/exports/:runId`, and `/health`.
- Render not-found state for route sprawl.
- Keep copy executive-facing and avoid internal platform terms in primary UI.

Acceptance criteria:

- Core routes render in tests.
- Safety boundaries are visible on shell routes.
- Dashboard/export pages clearly state placeholder status.

### Epic 3: Design system foundation

Feature: Lightweight product UI primitives.

Tasks:

- Add CSS tokens, cards, badges, buttons, forms, responsive grids, and states.
- Add product cards and placeholder result cards.

Acceptance criteria:

- Shell is readable and consistent.
- Design system remains local and does not copy old MarketingSimulation implementation.

### Epic 4: PR2 operations

Feature: Docs, smoke, and quality gates.

Tasks:

- Update README, AGENTS, product health dashboard, and roadmap for PR2.
- Update docs smoke to expect scaffold files and forbid backend/live/auth/credential files.
- Run and record validation commands.

Acceptance criteria:

- README/AGENTS are no longer stale PR1-only docs.
- Docs smoke passes with scaffold expected.
- All validation commands pass.

## Quality gates by PR

### PR1 quality gates

- `git status --short --branch` confirms correct branch.
- `git diff --check` passes.
- Docs smoke confirms required files and README links exist.
- No app code or external dependencies added.
- No modifications in SocialSense or MarketingSimulation.

### PR2 quality gates

- `npm install` has generated/updated `package-lock.json`.
- `npm run test` passes.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run build` passes.
- `python3 scripts/docs_smoke.py` passes.
- `git diff --check` passes.
- Minimal routes render.
- Safety banner appears on initial shell.
- App code remains independent from SocialSense internals.
- No backend, live APIs, auth, credentials, or real simulation.

### PR3 quality gates

- Adapter imports only `from socialsense import load_domain_pack` from the SocialSense public facade.
- Contract tests cover input mapping, export wrapper behavior, static forbidden-import checks, and deterministic comparison wrappers.
- Local smoke runs `product_launch` through SocialSense Marketing Domain Pack with fixture/offline aggregate inputs.
- Local smoke verifies export status for `json`, `markdown`, and `executive_json`.
- Adapter view models preserve provenance, safety boundaries, limitations, evidence gaps, and human review questions.
- No changes to SocialSense public runtime without separate dependency review.

### PR4 quality gates

- 7-step workflow completion test passes.
- Dashboard shows provenance, assumptions, limitations, evidence gaps, and human review questions.
- Export review is mandatory.
- Supported formats are JSON, Markdown, and executive JSON unless approved contract changes.
- No conversion guarantee or production claim appears in product copy.

## Milestone history and forward roadmap

### M2: Product Launch dogfooding and UX stabilization — Complete

- Product Launch was reviewed as the reference workflow.
- UX friction was triaged, burned down, and polished through M2.1/M2.3.
- M2 Exit Review approved Product Launch as the reusable workflow pattern.

### M3: Campaign Domain Planning — Complete

- Defined Campaign Domain Analysis, Taxonomy, Objectives, Data Model, Workflow Mapping, and Consumer Mapping.
- Kept scope documentation-only.
- Did not implement Campaign Message Test, A/B Message Comparison, frontend workflows, backend behavior, runtime behavior, or SocialSense changes.

### M4: Information Architecture & Design System Review — Complete

- Define long-term product areas, navigation, workflow grouping, design-system inventory, design tokens, component reuse, and executive UX review.
- Keep scope documentation-only.
- Do not implement Campaign Message Test, A/B Message Comparison, Promotion workflows, backend behavior, runtime behavior, or SocialSense changes.

### M5: Campaign Message Test Reference Workflow — Complete

- Implement Campaign Message Test as the second reference workflow.
- Reuse Workflow Pattern, Campaign Domain, Information Architecture, Navigation Model, Design System, existing dashboard/result/export patterns, safety labels, and public SocialSense adapter boundary.
- Track dashboard reuse >80%, component reuse >80%, export reuse, navigation consistency, operator learning time, workflow completion time, executive readability, and product consistency.
- Do not implement A/B Message Comparison, Promotion workflows, backend behavior, runtime behavior, live APIs, private data, or SocialSense runtime changes.

### M6: Experiment Framework Planning — Complete

- Define Experiment as a reusable capability for future comparison workflows.
- Create Experiment Domain Analysis, Taxonomy, Data Model, Workflow Mapping, Consumer Mapping, and Workflow Compatibility docs.
- Keep scope documentation-only.
- Do not implement A/B Message Comparison, Multivariate Testing, Creative Comparison, frontend workflows, backend behavior, runtime functionality, live APIs, private data, or SocialSense changes.

### M7: A/B Experiment Reference Workflow — Complete

- Implement A/B Experiment as the third reference workflow at `/workbench/ab-experiment`.
- Reuse the approved Experiment Framework as an implementation/configuration, not a new architecture.
- Generate `src/product/fixtures/abExperimentResult.json` through product-owned fixture generation and the existing SocialSense adapter `run_message_comparison` path.
- Reuse dashboard and export review; add only minimal Variant A / Variant B comparison cards.
- Reuse existing JSON, Markdown, and Executive Summary export readiness formats with export reuse 100%.
- Keep primary navigation unchanged.
- Reuse audit: `docs/product/AB_EXPERIMENT_REUSE_AUDIT.md` records workflow reuse: 92%, component reuse: 93%, dashboard reuse: 91%, export reuse: 100%, navigation: unchanged.

### M8: Marketing Journey Framework — Complete

- Define the Marketing Journey that connects Product Launch, Campaign Message Test, and A/B Experiment into one coherent marketing decision platform.
- Create Marketing Journey Analysis, Marketing Journey Model, Journey Workflow Mapping, Workspace Model, Executive Journey, and Future Workflow Placement docs.
- Keep scope documentation-only.
- Do not implement Creative Comparison, additional workflows, frontend implementation, backend behavior, runtime functionality, live APIs, private data, or SocialSense changes.
- Architecture Gate is not triggered if Journey composes existing Workflow Pattern, Campaign Domain, IA, Navigation, Design System, Experiment Framework, and SocialSense boundary.

### M9: Campaign Workspace Foundation — Complete

- Define Campaign Workspace as the campaign-centric foundation that makes workflows tools inside a campaign workspace.
- Create Campaign Workspace Analysis, Model, Navigation, Dashboard, Journey, Executive Workspace, and Placement docs.
- Keep scope documentation-only.
- Do not implement Creative Comparison, additional workflows, frontend implementation, backend behavior, runtime functionality, persistence, live APIs, private data, or SocialSense changes.
- Architecture Gate is not triggered if Campaign Workspace composes the existing Workflow Pattern, Campaign Domain, IA, Navigation, Design System, Experiment Framework, Marketing Journey Framework, and SocialSense boundary.

### M10: Campaign Workspace MVP — Complete

- Implement `/campaign-workspace` as a secondary/workbench route without changing the primary navigation model.
- Surface Campaign Overview, Current Journey Stage, Recent Runs, Evidence Summary, Executive Summary, Recommended Next Action, and Available Workflow Actions.
- Visualize the journey timeline: Campaign Definition → Campaign Message Test → A/B Experiment → Executive Decision → Export/Handoff.
- Aggregate evidence only from existing Product Launch, Campaign Message Test, and A/B Experiment fixtures already imported by the frontend.
- Keep Creative Comparison, additional workflows, backend endpoints, new marketing workflows, SocialSense changes, persistence, and live APIs out of scope.

### M11: Continuous Product Validation & Synthetic Dogfooding — Complete

- Validate Product Launch, Campaign Message Test, A/B Experiment, and Campaign Workspace through six persona reviews.
- Create Product Validation Report, UX Friction Register, Product Backlog, and Executive Product Review.
- Treat M11 as validation/reporting only: no new workflows, no Creative Comparison, no runtime changes, no backend endpoints, no product redesign, and no SocialSense changes.
- Architecture Gate is not triggered; findings become backlog and remediation recommendations.
- Overall Product Health Score: 7.4 / 10.

### M12: Campaign Workspace Trust & Validation — Complete

- Resolved M11 P1/P2 trust findings before adding any future workflow.
- Implemented remediation: unsupported run/export unavailable states, visible validation feedback, run-complete/result visibility, fixture-reference versus user-review-session labeling, and in-app `/health` route wording.
- M12 KPIs: Product Health, UX Health, Trust Score, Transparency Score, Validation Score, Dashboard Clarity, Overall Readiness, and Engineering KPI.
- Optional registry extraction was deferred to avoid redesign; exact fixture matching stayed minimal and in-place.
- Creative Comparison remains gated and must be separately planned after evidence-backed remediation.
- No backend, live APIs, private data, persistence, product redesign, new workflows, MarketingSimulation changes, or SocialSense changes were added.

### M13: Product Trust Readiness & Next Capability Gate — Complete

- Verified M12 trust behavior remained stable on `main`: unknown run/export unavailable states, `/health` freshness, run completion visibility, and fixture transparency.
- Audited README, AGENTS, Roadmap, Product Health Dashboard, M12 Trust Validation Report, and M11 Executive Product Review.
- Created `docs/product/M13_PRODUCT_TRUST_READINESS_GATE.md` with explicit Product Trust, UX Clarity, Research Transparency, Regression Stability, and Creative Comparison Planning decisions.
- Scope was governance/reporting only; Creative Comparison and new capability implementation remained blocked.
- Creative Comparison Planning is GO; Creative Comparison Implementation remains HOLD.

### M14: Creative Comparison Product Discovery & Specification — Complete

- Created six Creative Comparison discovery/specification docs: Discovery, User Stories, UX Flow, Information Architecture, Acceptance Criteria, and Implementation Plan.
- Kept scope documentation/discovery only: no runtime implementation, frontend components, backend endpoints, APIs, persistence, auth, Campaign Workspace redesign, SocialSense changes, or MarketingSimulation changes.
- Defined problem statement, goals, non-goals, personas, journey, UX/navigation flow, IA, screen inventory, conceptual data model, comparison dimensions, trust boundaries, transparency rules, research constraints, fixture requirements, error/empty states, accessibility notes, success metrics, acceptance criteria, and future API/persistence considerations as conceptual only.
- Architecture Gate remained not triggered.
- M14 completed after validation, QA, Code Review, Safety Review, Product Review, UX Review, Research Review, PR merge, post-merge KPI commit, and full main validation.

### M15: Creative Comparison Vertical Slice — Complete

- Implemented `/workbench/creative-comparison` as a text-only Creative A versus Creative B workflow.
- Reused existing workbench route pattern, workflow steps, dashboard, executive summary, export review, safety labels, and product-owned SocialSense adapter boundary.
- Added deterministic offline fixture generation through `scripts/generate_creative_comparison_fixture.py` using the closest existing public adapter path, `run_message_comparison`, because no creative-specific SocialSense runtime scenario is exposed.
- Reused `/runs/:runId` and `/exports/:runId` for Creative Comparison dashboards and export review.
- Preserved primary navigation; Creative Comparison is exposed through Home/Workbench/Campaign Workspace flow.
- Created `docs/product/M15_CREATIVE_COMPARISON_CLOSEOUT_REPORT.md`.
- Architecture Gate remained not triggered.
- PR #21 merged at `b6bd9a447c475c3fd47f802bc627e90bcc06c7b7`.

### M16: Feature Freeze and Demo Readiness — Current branch

- Declares Feature Freeze v0.1 for the four usable workflows and product shell.
- Creates release-readiness artifacts: Feature Freeze, 5-minute demo script, Demo Workspace, Human Dogfooding Plan, Feedback Capture Template, and Release Candidate Checklist.
- Keeps scope release-readiness only: demo readiness, UX/copy polish, bug/trust fixes, docs, test coverage, demo data, dogfooding preparation, and release checks.
- Blocks new workflows, backend, SocialSense capability, live APIs, persistence, auth, CRM/customer data, PII/private data, production automation, workflow redesign, and workspace redesign.
- Architecture Gate remains not triggered unless release readiness requires blocked architecture or data changes.

### Future: Governance and implementation readiness review

- Define private pilot criteria.
- Review security/privacy posture.
- Confirm no live data/credentials/customer-data scope unless separately approved.
- Decide whether any SocialSense public contract additions are necessary.

## Backlog parking lot

Do not implement until separate review:

- Additional export formats such as PDF/PPT.
- Live integrations.
- Customer data ingestion.
- Upload workflows.
- Authentication/tenant model.
- Long-term persistence.
- Production campaign workflow.
- Recommendation automation.

## Roadmap acceptance criteria

- Completed PR1-PR4 sequencing remains explicit.
- M2 and M2 Exit Review are marked complete.
- M3 Campaign Domain Planning is marked complete.
- M4 Information Architecture & Design System Review is marked complete.
- M5 Campaign Message Test Reference Workflow is marked complete.
- M6 Experiment Framework Planning is marked complete.
- M7 A/B Experiment Reference Workflow is marked complete.
- M8 Marketing Journey Framework is marked complete.
- M9 Campaign Workspace Foundation is marked complete.
- M10 Campaign Workspace MVP is marked complete.
- M11 Continuous Product Validation & Synthetic Dogfooding is marked complete.
- M12 Campaign Workspace Trust & Validation is marked complete and merged.
- M13 Product Trust Readiness & Next Capability Gate is marked complete and Creative Comparison Planning is GO.
- M14 Creative Comparison Product Discovery & Specification is marked complete and merged.
- M15 Creative Comparison Vertical Slice is marked complete and merged.
- M16 Feature Freeze and Demo Readiness is current and must pass validation plus QA, Code Review, Safety Review, Product Review, UX Review, and Research Review before release-candidate readiness is reported.
- Additional workflows beyond Creative Comparison remain blocked during Feature Freeze v0.1 until evidence supports them and the user explicitly authorizes scope.
- Each PR/milestone has acceptance criteria and quality gates.
- Future milestones preserve safety boundaries.
- Roadmap does not require credentials, live APIs, SocialSense changes, backend, or arbitrary browser-input simulation.
