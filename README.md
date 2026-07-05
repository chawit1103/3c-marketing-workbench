# 3C Marketing Workbench

3C Marketing Workbench is the official product app for executive marketing scenario work. It provides a safe, UX-first workbench shell for comparing marketing assumptions, reviewing synthetic aggregate scenario outputs, and preparing executive reports after human review.

Status: M4 Information Architecture & Design System Review in progress. Product Launch is the only available workflow; Campaign Domain and Workflow Pattern are approved; IA/navigation/design-system/component-reuse standards are being defined before additional workflows; and the product-owned adapter over SocialSense public SDK/runtime surfaces remains the platform boundary. Campaign Message Test, A/B Message Comparison, Promotion workflows, backend, and SocialSense changes remain not implemented.

Historical PR4 and current M4 non-goals:

- no backend;
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
- Product Launch Simulation vertical slice backed by `src/product/fixtures/productLaunchResult.json`;
- product-owned fixture generation through `scripts/generate_product_launch_fixture.py`;
- product-owned SocialSense adapter under `integrations/socialsense/`;
- executive dashboard and export review experience for the generated offline sample;
- repository-local product, architecture, roadmap, and operating docs.

Adjacent repositories are reference/dependency boundaries, not edit targets for this PR:

- SocialSense is the platform dependency. It owns simulation runtime, Marketing Domain Pack, ConsumerSDK, safety validation, provenance, dashboard contracts, and export contracts.
- MarketingSimulation is old/reference material only. It may be inspected for UX lessons, but must not be copied or modified.

PR4 must not modify SocialSense or MarketingSimulation.

## Historical M1 PR4 delivered status

PR4 adds the first usable browser vertical slice without adding a backend:

- `scripts/generate_product_launch_fixture.py` calls the PR3 adapter, which uses the SocialSense public SDK facade only;
- `src/product/fixtures/productLaunchResult.json` is the generated offline sample consumed by React;
- `/workbench` lets a non-technical user choose Product Launch, enter product/message/offer/context, select audiences and platform mix, run a local UI action, and review results;
- `/runs/:runId` renders the Product Launch results dashboard for the generated sample;
- `/exports/:runId` renders JSON, Markdown, and Executive Summary readiness/status plus an executive summary preview;
- visible copy remains synthetic/aggregate/offline, human-review oriented, and non-predictive.

PR4 does not implement backend services, persistence, authentication, live API calls, credentials, arbitrary browser-input simulation, CRM/customer data ingestion, or production campaign execution.

## M1 PR3 adapter status

PR3 adds the first safe adapter layer without wiring the UI:

- `integrations/socialsense/adapter.py` imports only `from socialsense import load_domain_pack`;
- adapter calls only `load_domain_pack('marketing')`, `domain.run(...)`, and `domain.export(...)`;
- `run_product_launch_simulation(...)` executes an actual SocialSense Marketing Domain Pack `product_launch` fixture in local smoke;
- `run_campaign_message_test(...)`, `run_message_comparison(...)`, and `export_executive_report(...)` expose adapter-shaped product functions for later workflow wiring;
- input mapping is limited to aggregate non-sensitive `scenario`, `platform_mix`, `seed`, `assumptions`, and `notes`;
- adapter output preserves provenance, safety labels/boundaries, limitations, evidence gaps, dashboard metadata, and export status;
- smoke output includes `public_sdk_only: true`.

PR3 does not implement backend services, persistence, authentication, live API calls, credentials, UI workflow integration, CRM/customer data ingestion, or production campaign execution.

## Route list

Current frontend routes:

| Route | Purpose | Status |
|---|---|---|
| `/` | Product home and safe executive positioning | Implemented |
| `/workbench` | Guided Product Launch Simulation form and local run action | Implemented PR4 vertical slice |
| `/runs/:runId` | Product Launch results dashboard for generated offline sample | Implemented PR4 vertical slice |
| `/exports/:runId` | Export review for JSON, Markdown, and Executive Summary readiness/status | Implemented PR4 vertical slice |
| `/health` | Product health/readiness view | Implemented |

Unknown routes render a not-found state. There is no route for settings, auth, backend administration, live data ingestion, or credentials.

## Docs map

Product documentation map:

- [Old MarketingSimulation UX Audit](docs/product/OLD_MARKETING_SIMULATION_UX_AUDIT.md)
- [3C Product Principles](docs/product/3C_PRODUCT_PRINCIPLES.md)
- [Product Architecture](docs/architecture/PRODUCT_ARCHITECTURE.md)
- [Cross-Repository Dependency Map](docs/architecture/CROSS_REPOSITORY_DEPENDENCY_MAP.md)
- [Roadmap](docs/product/ROADMAP.md)
- [Product Health Dashboard](docs/product/PRODUCT_HEALTH_DASHBOARD.md)
- [M1 PR4 Closeout Report](docs/product/M1_PR4_CLOSEOUT_REPORT.md)
- [M2 Dogfooding Report](docs/product/M2_DOGFOODING_REPORT.md)
- [M2.1 UX Friction Burn-down](docs/product/M2_1_UX_FRICTION_BURNDOWN.md)
- [M2.1 Closeout Report](docs/product/M2_1_CLOSEOUT_REPORT.md)
- [M2.3 Closeout Report](docs/product/M2_3_CLOSEOUT_REPORT.md)
- [Workflow Pattern Review](docs/product/WORKFLOW_PATTERN_REVIEW.md)
- [Workflow Pattern Guidelines](docs/product/WORKFLOW_PATTERN_GUIDELINES.md)
- [Workflow Pattern Decision](docs/product/WORKFLOW_PATTERN_DECISION.md)
- [Campaign Domain Analysis](docs/product/CAMPAIGN_DOMAIN_ANALYSIS.md)
- [Campaign Taxonomy](docs/product/CAMPAIGN_TAXONOMY.md)
- [Campaign Objectives](docs/product/CAMPAIGN_OBJECTIVES.md)
- [Campaign Data Model](docs/product/CAMPAIGN_DATA_MODEL.md)
- [Campaign Workflow Mapping](docs/product/CAMPAIGN_WORKFLOW_MAPPING.md)
- [Campaign Consumer Mapping](docs/product/CAMPAIGN_CONSUMER_MAPPING.md)
- [Information Architecture](docs/product/INFORMATION_ARCHITECTURE.md)
- [Navigation Model](docs/product/NAVIGATION_MODEL.md)
- [Workflow Organization](docs/product/WORKFLOW_ORGANIZATION.md)
- [Design System Review](docs/product/DESIGN_SYSTEM_REVIEW.md)
- [Design Tokens](docs/product/DESIGN_TOKENS.md)
- [Component Reuse Matrix](docs/product/COMPONENT_REUSE_MATRIX.md)
- [Executive UX Review](docs/product/EXECUTIVE_UX_REVIEW.md)
- [UX Friction Backlog](docs/product/UX_FRICTION_BACKLOG.md)
- [SocialSense Integration](docs/product/SOCIALSENSE_INTEGRATION.md)
- [Agent Instructions](AGENTS.md)

## Safety boundaries

3C Marketing Workbench remains safe fixture/offline product work until later reviewed gates approve additional implementation. PR3 and future PRs must not add or imply:

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

Install dependencies and maintain the npm lockfile:

```bash
npm install
```

M4 docs-only validation commands:

```bash
python3 scripts/docs_smoke.py
git diff --check origin/main...HEAD
```

Full product regression commands remain available for implementation milestones:

```bash
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/generate_product_launch_fixture.py
python3 -m unittest discover -s tests -p 'test_*.py'
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py
npm run test
npm run typecheck
npm run lint
npm run build
python3 scripts/docs_smoke.py
git diff --check
```

Development server, for manual frontend shell review only:

```bash
npm run dev
```

## M4 review gates

Before M4 handoff:

- run `python3 scripts/docs_smoke.py`;
- run `git diff --check origin/main...HEAD`;
- confirm Information Architecture, Navigation Model, Workflow Organization, Design System Review, Design Tokens, Component Reuse Matrix, and Executive UX Review exist;
- confirm Product Health Dashboard and README reflect M4 current state;
- confirm no Campaign Message Test, A/B comparison, Promotion workflow, frontend workflow, backend, runtime, or SocialSense implementation was added;
- confirm no backend, auth, credentials, live API calls, CRM/customer data, PII, private data, voter lists, microtargeting, persuasion optimization, conversion guarantees, or production campaign claims were added;
- confirm SocialSense and MarketingSimulation remain unmodified;
- commit M4 docs-only changes on `m4-information-architecture-design-system`.
