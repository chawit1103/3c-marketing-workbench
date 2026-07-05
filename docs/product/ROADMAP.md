# Roadmap

Status: M5 Campaign Message Test Reference Workflow complete and merged. PR1-PR4, M2 Product Launch stabilization, M2 Exit Workflow Pattern Review, M3 Campaign Domain Planning, M4 IA/design-system review, and M5 Campaign Message Test are complete. A/B Message Comparison remains planning-only / not implemented.

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

### Next: A/B Message Comparison Planning — Only if M5 validates reuse strategy

- Recommend planning only if Campaign Message Test receives GO and demonstrates the reusable workflow strategy.
- Do not implement A/B Message Comparison automatically.

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
- M5 Campaign Message Test Reference Workflow is marked current.
- Next milestone is A/B Message Comparison planning only if M5 validates reuse strategy.
- Each PR/milestone has acceptance criteria and quality gates.
- Future milestones preserve safety boundaries.
- Roadmap does not require credentials, live APIs, SocialSense changes, backend, or arbitrary browser-input simulation.
