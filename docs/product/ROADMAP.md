# Roadmap

Status: M1 PR4 Product Launch Simulation vertical slice is current. PR1 product architecture/UX audit, PR2 frontend shell, and PR3 SocialSense public SDK adapter smoke are complete.

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
| PR4 | `m1-pr4-product-launch-vertical-slice` | Product Launch vertical slice | Current. Generate an offline product-launch fixture through the PR3 adapter and render `/workbench`, `/runs/:runId`, and `/exports/:runId` as a usable UX slice. | Workflow usable, result cards render, export review shows JSON/Markdown/Executive Summary readiness, safety labels visible, all gates pass. |

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
- PR4 is marked current while PR1-PR3 are complete.
- Each PR has acceptance criteria and quality gates.
- Future milestones preserve safety boundaries.
- Roadmap does not require credentials, live APIs, SocialSense changes, backend, or arbitrary browser-input simulation in M1.
