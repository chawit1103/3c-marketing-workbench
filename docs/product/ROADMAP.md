# Roadmap

Status: M1 PR1 roadmap for product architecture, UX audit, and future implementation sequencing. PR1 is docs-only.

## Program

Program: 3C Marketing Workbench M1 — product architecture and safe fixture/offline workbench foundation.

Program goals:

- Establish 3C as the official product app.
- Keep SocialSense as the platform dependency.
- Define UX principles, architecture boundaries, dependency map, roadmap, health dashboard, and agent instructions.
- Avoid app code until scaffold scope is approved.

Program non-goals:

- No app scaffold in PR1.
- No SocialSense public API/runtime change.
- No live APIs, scraping, credentials, PII, CRM/customer lists, private messages/groups, voter lists, microtargeting, persuasion optimization, misinformation workflow, conversion guarantees, or production campaign claims.

## M1 PR sequence

| PR | Branch | Theme | Scope | Exit criteria |
|---|---|---|---|---|
| PR1 | `m1-pr1-product-architecture-ux-audit` | Product architecture + UX audit + roadmap docs | Docs only. Define product principles, architecture, dependency map, roadmap, health dashboard, README, AGENTS. | Required docs exist, README links resolve, `git diff --check` passes, docs smoke passes, committed. |
| PR2 | `m1-pr2-app-scaffold-safe-shell` | Safe app scaffold | Create minimal app shell only after PR1 approval. No SocialSense integration beyond mocked contract fixtures unless approved. | Build/test commands exist, core routes render, no live APIs, safety banner visible. |
| PR3 | `m1-pr3-socialsense-adapter-fixture-contract` | SocialSense adapter | Add isolated adapter using public SDK/runtime only and deterministic fixture/offline contract tests. | Adapter tests prove no private imports, provenance preserved, unsafe/missing metadata fails closed. |
| PR4 | `m1-pr4-executive-dashboard-export-review` | Dashboard + export review | Render executive dashboard and export review using SocialSense dashboard/export contracts. | 7-step workflow usable, export review blocks unsupported/missing provenance, executive JSON/Markdown/JSON tested. |

## PR1 epics, features, tasks

### Epic 1: Old UX audit

Feature: Reference-only audit of old MarketingSimulation UX.

Tasks:

- Inspect old repo views/routes/components enough to cite evidence.
- Identify confusing flows, step overload, technical language, dashboard/export concerns, onboarding friction, and what not to repeat.
- Document acceptance criteria for 3C UX.

Acceptance criteria:

- Audit cites specific files/views.
- Audit does not claim analytics/user behavior not evidenced by files.
- Audit states MarketingSimulation is reference-only and not copied.

### Epic 2: Product principles

Feature: 3C product operating principles.

Tasks:

- Define target users.
- Define UX-first principles.
- Define 7-step flow.
- Define language rules.
- Define product/platform responsibility test.
- Define safety/trust principles.

Acceptance criteria:

- Principles are clear enough to gate PR2.
- Safety boundaries match SocialSense consumer contract.

### Epic 3: Architecture and dependency boundaries

Feature: Product architecture and cross-repo dependency map.

Tasks:

- Define future frontend structure.
- Define SocialSense integration boundary.
- Define API/state/routing/export/testing/rollback strategy.
- Define architecture gate triggers.
- Define SocialSense -> Marketing Domain Runtime -> 3C Integration Adapter -> 3C UX Workflow -> Dashboard -> Executive Report chain.

Acceptance criteria:

- No app code is created.
- No SocialSense or MarketingSimulation changes are required.
- Allowed/disallowed dependency directions are explicit.

### Epic 4: Program operations

Feature: Roadmap, health dashboard, README, AGENTS.

Tasks:

- Document PR1-PR4 sequence.
- Create product health dashboard baseline.
- Replace README stub with useful product overview.
- Add concise repo agent instructions.

Acceptance criteria:

- README links point to existing docs.
- AGENTS does not invent app commands.
- Current PR status is docs-only.

## Quality gates by PR

### PR1 quality gates

- `git status --short --branch` confirms correct branch.
- `git diff --check` passes.
- Docs smoke confirms required files and README links exist.
- No app code or external dependencies added.
- No modifications in SocialSense or MarketingSimulation.

### PR2 quality gates

- Scaffold command documented and verified.
- Minimal routes render.
- Safety banner appears on initial shell.
- App code remains independent from SocialSense internals.
- No live APIs or credentials.

### PR3 quality gates

- Adapter imports only public SocialSense facade.
- Contract tests cover successful run, missing provenance, export request, unsupported mode rejection.
- Fixture/offline outputs only.
- No changes to SocialSense public runtime without separate dependency review.

### PR4 quality gates

- 7-step workflow completion test passes.
- Dashboard shows provenance, assumptions, limitations, evidence gaps, and human review questions.
- Export review is mandatory.
- Supported formats are JSON, Markdown, and executive JSON unless SocialSense public contract changes.
- No conversion guarantee or production claim appears in product copy.

## Next milestones after PR4

### M2: Private dogfooding

- Run controlled fixture/offline product walkthroughs.
- Measure workflow completion, confusion points, export readiness, and dashboard clarity.
- Update health dashboard with real dogfooding observations.

### M3: Scenario comparison and executive polish

- Improve scenario comparison UX.
- Add clearer executive summaries and board-style report packaging.
- Keep safety and provenance mandatory.

### M4: Governance and release readiness review

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

- PR1-PR4 sequencing is explicit.
- Each PR has acceptance criteria and quality gates.
- Future milestones preserve safety boundaries.
- Roadmap does not require credentials, live APIs, SocialSense changes, or app scaffold in PR1.
