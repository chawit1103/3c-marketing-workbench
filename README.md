# 3C Marketing Workbench

3C Marketing Workbench is the official product app for executive marketing scenario work. It provides a safe, UX-first workbench shell for comparing marketing assumptions, reviewing synthetic aggregate scenario outputs in later PRs, and preparing executive reports after human review.

Status: M1 PR2 frontend shell and design system scaffold. A React/Vite/TypeScript frontend shell now exists with route placeholders, safety labels, design tokens, unit tests, linting, typecheck, and production build. It is still fixture/offline and non-production.

Explicit non-goals in PR2:

- no backend;
- no SocialSense adapter;
- no real simulation;
- no live APIs;
- no scraping;
- no credentials;
- no CRM/customer lists;
- no PII;
- no private messages/groups;
- no voter lists;
- no microtargeting;
- no persuasion optimization;
- no conversion guarantees;
- no production campaign claims.

## Repository boundary

This repository owns the 3C product experience:

- product positioning and user journey;
- safe React/Vite/TypeScript frontend shell;
- future scenario setup workflow;
- future SocialSense integration adapter over public SDK/runtime surfaces only;
- future executive dashboard and export review experience;
- repository-local product, architecture, roadmap, and operating docs.

Adjacent repositories are reference/dependency boundaries, not edit targets for this PR:

- SocialSense is the platform dependency. It owns simulation runtime, Marketing Domain Pack, ConsumerSDK, safety validation, provenance, dashboard contracts, and export contracts.
- MarketingSimulation is old/reference material only. It may be inspected for UX lessons, but must not be copied or modified.

PR2 must not modify SocialSense or MarketingSimulation.

## M1 PR2 current status

PR2 converts the PR1 product foundation into a minimal, testable frontend shell:

- React/Vite/TypeScript app scaffold exists;
- npm package metadata and lockfile exist;
- five documented route patterns render locally;
- safety boundary labels are visible across the shell;
- initial design system tokens, cards, buttons, badges, form states, and responsive layout exist;
- tests cover route rendering, safety labels, navigation, route resolution, and visible UI copy boundaries;
- lint, typecheck, test, build, docs smoke, and whitespace checks pass.

PR2 does not implement backend services, persistence, authentication, live API calls, SocialSense adapter code, or real scenario simulation.

## Route list

Current PR2 frontend routes:

| Route | Purpose | Status |
|---|---|---|
| `/` | Product home and safe executive positioning | Implemented shell page |
| `/workbench` | Guided 7-step workflow skeleton | Placeholder only |
| `/runs/:runId` | Executive dashboard space for a future run | Placeholder only; no real result |
| `/exports/:runId` | Export review space for a future run | Placeholder only; export disabled |
| `/health` | Product health/scaffold readiness view | Implemented shell page |

Unknown routes render a not-found state. There is no route for settings, auth, backend administration, live data ingestion, or credentials.

## Docs map

Required M1 documents:

- [Old MarketingSimulation UX Audit](docs/product/OLD_MARKETING_SIMULATION_UX_AUDIT.md)
- [3C Product Principles](docs/product/3C_PRODUCT_PRINCIPLES.md)
- [Product Architecture](docs/architecture/PRODUCT_ARCHITECTURE.md)
- [Cross-Repository Dependency Map](docs/architecture/CROSS_REPOSITORY_DEPENDENCY_MAP.md)
- [Roadmap](docs/product/ROADMAP.md)
- [Product Health Dashboard](docs/product/PRODUCT_HEALTH_DASHBOARD.md)
- [Agent Instructions](AGENTS.md)

## Safety boundaries

3C Marketing Workbench remains a safe fixture/offline product shell until later reviewed gates approve additional implementation. PR2 and future PRs must not add or imply:

- live APIs;
- scraping;
- credentials;
- CRM/customer lists;
- PII;
- private messages/groups;
- voter lists;
- microtargeting;
- persuasion optimization;
- conversion guarantees;
- production campaign claims.

Future product copy must also avoid claiming real-world predictive certainty, field evidence, production readiness, or guaranteed marketing outcomes. Visible UI should use executive product language and avoid exposing internal platform terms as primary copy.

## Local setup and verified commands

Install dependencies and generate/update the npm lockfile:

```bash
npm install
```

Verified PR2 validation commands:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
python3 scripts/docs_smoke.py
git diff --check
```

Development server, for manual review only:

```bash
npm run dev
```

## PR2 quality gates

Before handoff:

- run all verified commands above;
- confirm app remains frontend shell only;
- confirm no backend, auth, credentials, live API calls, SocialSense adapter, or real simulation were added;
- confirm SocialSense and MarketingSimulation remain unmodified;
- commit all PR2 changes on `m1-pr2-frontend-shell-design-system`.
