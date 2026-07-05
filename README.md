# 3C Marketing Workbench

3C Marketing Workbench is the official product app for executive marketing scenario work. It provides a safe, UX-first workbench shell for comparing marketing assumptions, reviewing synthetic aggregate scenario outputs, and preparing executive reports after human review.

Status: M1 PR3 SocialSense public SDK adapter smoke. PR2 delivered the React/Vite/TypeScript frontend shell; PR3 adds a product-owned adapter over SocialSense public SDK/runtime surfaces and a local fixture smoke for `product_launch`. UI workflow integration is still deferred to PR4.

Explicit non-goals in PR3:

- no backend;
- no UI workflow integration yet;
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
- product-owned SocialSense adapter under `integrations/socialsense/`;
- future scenario setup workflow;
- future executive dashboard and export review experience;
- repository-local product, architecture, roadmap, and operating docs.

Adjacent repositories are reference/dependency boundaries, not edit targets for this PR:

- SocialSense is the platform dependency. It owns simulation runtime, Marketing Domain Pack, ConsumerSDK, safety validation, provenance, dashboard contracts, and export contracts.
- MarketingSimulation is old/reference material only. It may be inspected for UX lessons, but must not be copied or modified.

PR3 must not modify SocialSense or MarketingSimulation.

## M1 PR3 current status

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

Current frontend routes remain PR2 shell routes:

| Route | Purpose | Status |
|---|---|---|
| `/` | Product home and safe executive positioning | Implemented shell page |
| `/workbench` | Guided 7-step workflow skeleton | Placeholder only |
| `/runs/:runId` | Executive dashboard space for a future run | Placeholder only; not wired to PR3 adapter |
| `/exports/:runId` | Export review space for a future run | Placeholder only; export UI disabled |
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

PR3 validation commands:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
python3 scripts/docs_smoke.py
python3 -m unittest discover -s tests -p 'test_*.py'
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py
git diff --check
```

Development server, for manual frontend shell review only:

```bash
npm run dev
```

## PR3 quality gates

Before handoff:

- run all validation commands above;
- confirm adapter imports only the SocialSense public SDK facade;
- confirm local smoke executes `product_launch` through SocialSense Marketing Domain Pack and exports `executive_json` at minimum;
- confirm no backend, auth, credentials, live API calls, CRM/customer data, PII, private data, voter lists, microtargeting, persuasion optimization, conversion guarantees, or production campaign claims were added;
- confirm SocialSense and MarketingSimulation remain unmodified;
- commit all PR3 changes on `m1-pr3-socialsense-adapter-smoke`.
