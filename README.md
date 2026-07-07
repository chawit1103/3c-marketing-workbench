# 3C Marketing Workbench

3C Marketing Workbench is the official product app for executive marketing scenario work. It provides a safe, UX-first workbench shell for comparing marketing assumptions, reviewing synthetic aggregate scenario outputs, and preparing executive reports after human review.

Status: M18 Thai-first Internationalization is the current implementation milestone after M17 Executive Dashboard & Reporting closed as GO WITH CONDITIONS on main at `a03ecf236c638d69cd48c37465d70e03579ebc8f` after PR #27 and PR #28 merged and post-merge validation passed. The milestone improves executive report preview and export format readiness with Executive JSON preview, Markdown briefing preview, planning-only PDF and PowerPoint notices, assumptions, limitations, synthetic-data notice, safety notice, and Formula/Source/Evidence tier/Confidence copy for reviewed offline campaign evidence. Evidence remains E1 synthetic/offline fixture scope with Low directional confidence, so human review and field evidence are required before launch, budget, or winner decisions. M18 Thai-first Internationalization is the current implementation milestone; M19 must not begin until M18 closes. Feature Freeze v0.1 remains active: no new workflow, backend, persistence, auth, live API, external service, credential, CRM/customer data, PII/private data, production automation, SocialSense change, or MarketingSimulation change is allowed.

M7 completed A/B Experiment as an offline reference workflow only, with generated synthetic aggregate fixtures, human review, reusable dashboard/export review, and unchanged primary navigation.

Historical PR4 and current M11 non-goals:

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
- Campaign Message Test, A/B Experiment, and Creative Comparison reference workflows backed by generated product fixtures;
- product-owned fixture generation through `scripts/generate_product_launch_fixture.py`, `scripts/generate_campaign_message_test_fixture.py`, `scripts/generate_ab_experiment_fixture.py`, and `scripts/generate_creative_comparison_fixture.py`;
- product-owned adapter under `integrations/socialsense/`;
- executive dashboard and export review experience for the generated offline sample;
- repository-local product, architecture, roadmap, and operating docs.

Adjacent repositories are reference/dependency boundaries, not edit targets for M17:

- SocialSense is the platform dependency. It owns simulation runtime, Marketing Domain Pack, ConsumerSDK, safety validation, provenance, dashboard contracts, and export contracts.
- MarketingSimulation is old/reference material only. It may be inspected for UX lessons, but must not be copied or modified.

M17 program kickoff must not modify SocialSense or MarketingSimulation.

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
| `/campaign-workspace` | Campaign Workspace overview, M17 executive KPI dashboard, sentiment comparison, evidence tier visualization, journey stage, recent runs, evidence gaps/limitations, human review checklist, executive summary, next action, and workflow action links from existing fixtures only | Implemented M10 MVP + M17 PR3 visualization slice |
| `/workbench/campaign-message-test` | Guided Campaign Message Test form and local run action | Implemented M5 reference workflow |
| `/workbench/ab-experiment` | Guided A/B Experiment form and local run action | Implemented M7 reference workflow |
| `/workbench/creative-comparison` | Guided text-only Creative Comparison form and local run action | Implemented M15 vertical slice |
| `/runs/:runId` | Product Launch, Campaign Message Test, A/B Experiment, or Creative Comparison results dashboard for known generated offline samples; unknown IDs show Run unavailable with recovery links | Implemented reusable dashboard pattern + M12 trust guard + M15 Creative Comparison |
| `/exports/:runId` | Export review for known generated offline samples, including Creative Comparison; PR4 adds executive report preview, export format readiness, Executive JSON preview, Markdown briefing preview, and explicit planning-only PDF/PowerPoint unsupported notices; unknown IDs show Export unavailable with recovery links | Implemented reusable export-review pattern + M17 PR4 report/export readability |
| `/health` | M18 Thai-first Internationalization health, KPI dashboard, language coverage, safety copy quality, and no-M19 status | Implemented M18 |

Unknown routes render a not-found state. Unknown run/export IDs render explicit unavailable states instead of Product Launch fallback content. There is no route for settings, auth, backend administration, live data ingestion, or credentials.

## Docs map

Product documentation map:

- [Old MarketingSimulation UX Audit](docs/product/OLD_MARKETING_SIMULATION_UX_AUDIT.md)
- [3C Product Principles](docs/product/3C_PRODUCT_PRINCIPLES.md)
- [Product Architecture](docs/architecture/PRODUCT_ARCHITECTURE.md)
- [Cross-Repository Dependency Map](docs/architecture/CROSS_REPOSITORY_DEPENDENCY_MAP.md)
- [Roadmap](docs/product/ROADMAP.md)
- [Product Health Dashboard](docs/product/PRODUCT_HEALTH_DASHBOARD.md)
- [Executive Experience & Marketing Simulation Enhancement Program](docs/product/EXECUTIVE_EXPERIENCE_PROGRAM.md)
- [M17 Executive Dashboard & Reporting Plan](docs/product/M17_EXECUTIVE_DASHBOARD_PLAN.md)
- [M17 Executive Dashboard & Reporting Closeout Report](docs/product/M17_CLOSEOUT_REPORT.md)
- [M18 Translation Style Guide](docs/product/TRANSLATION_STYLE_GUIDE.md)
- [M18 Glossary](docs/product/GLOSSARY.md)
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
- [Campaign Reference Workflow](docs/product/CAMPAIGN_REFERENCE_WORKFLOW.md)
- [Component Reuse Audit](docs/product/COMPONENT_REUSE_AUDIT.md)
- [Experiment Domain Analysis](docs/product/EXPERIMENT_DOMAIN_ANALYSIS.md)
- [Experiment Taxonomy](docs/product/EXPERIMENT_TAXONOMY.md)
- [Experiment Data Model](docs/product/EXPERIMENT_DATA_MODEL.md)
- [Experiment Workflow Mapping](docs/product/EXPERIMENT_WORKFLOW_MAPPING.md)
- [Experiment Consumer Mapping](docs/product/EXPERIMENT_CONSUMER_MAPPING.md)
- [Experiment Workflow Compatibility](docs/product/EXPERIMENT_WORKFLOW_COMPATIBILITY.md)
- [A/B Experiment Reuse Audit](docs/product/AB_EXPERIMENT_REUSE_AUDIT.md)
- [Marketing Journey Analysis](docs/product/MARKETING_JOURNEY_ANALYSIS.md)
- [Marketing Journey Model](docs/product/MARKETING_JOURNEY_MODEL.md)
- [Journey Workflow Mapping](docs/product/JOURNEY_WORKFLOW_MAPPING.md)
- [Workspace Model](docs/product/WORKSPACE_MODEL.md)
- [Executive Journey](docs/product/EXECUTIVE_JOURNEY.md)
- [Future Workflow Placement](docs/product/FUTURE_WORKFLOW_PLACEMENT.md)
- [Campaign Workspace Analysis](docs/product/CAMPAIGN_WORKSPACE_ANALYSIS.md)
- [Campaign Workspace Model](docs/product/CAMPAIGN_WORKSPACE_MODEL.md)
- [Campaign Workspace Navigation](docs/product/CAMPAIGN_WORKSPACE_NAVIGATION.md)
- [Campaign Workspace Dashboard](docs/product/CAMPAIGN_WORKSPACE_DASHBOARD.md)
- [Campaign Workspace Journey](docs/product/CAMPAIGN_WORKSPACE_JOURNEY.md)
- [Campaign Executive Workspace](docs/product/CAMPAIGN_EXECUTIVE_WORKSPACE.md)
- [Campaign Workspace Placement](docs/product/CAMPAIGN_WORKSPACE_PLACEMENT.md)
- [M11 Product Validation Report](docs/product/M11_PRODUCT_VALIDATION_REPORT.md)
- [M11 Persona Evidence Appendix](docs/product/M11_PERSONA_EVIDENCE.md)
- [M11 UX Friction Register](docs/product/M11_UX_FRICTION_REGISTER.md)
- [M11 Product Backlog](docs/product/M11_PRODUCT_BACKLOG.md)
- [M11 Executive Product Review](docs/product/M11_EXECUTIVE_PRODUCT_REVIEW.md)
- [M12 Campaign Workspace Trust & Validation Report](docs/product/M12_TRUST_VALIDATION_REPORT.md)
- [M13 Product Trust Readiness Gate](docs/product/M13_PRODUCT_TRUST_READINESS_GATE.md)
- [M14 Creative Comparison Discovery](docs/product/M14_CREATIVE_COMPARISON_DISCOVERY.md)
- [M14 Creative Comparison User Stories](docs/product/M14_CREATIVE_COMPARISON_USER_STORIES.md)
- [M14 Creative Comparison UX Flow](docs/product/M14_CREATIVE_COMPARISON_UX_FLOW.md)
- [M14 Creative Comparison Information Architecture](docs/product/M14_CREATIVE_COMPARISON_INFORMATION_ARCHITECTURE.md)
- [M14 Creative Comparison Acceptance Criteria](docs/product/M14_CREATIVE_COMPARISON_ACCEPTANCE_CRITERIA.md)
- [M14 Creative Comparison Implementation Plan](docs/product/M14_CREATIVE_COMPARISON_IMPLEMENTATION_PLAN.md)
- [M15 Creative Comparison Closeout Report](docs/product/M15_CREATIVE_COMPARISON_CLOSEOUT_REPORT.md)
- [Feature Freeze v0.1](docs/product/FEATURE_FREEZE_V0_1.md)
- [5-Minute Executive Demo Script](docs/product/DEMO_SCRIPT_5_MIN.md)
- [Demo Workspace](docs/product/DEMO_WORKSPACE.md)
- [Human Dogfooding Plan](docs/product/HUMAN_DOGFOODING_PLAN.md)
- [Feedback Capture Template](docs/product/FEEDBACK_CAPTURE_TEMPLATE.md)
- [Release Candidate Readiness Checklist](docs/product/RELEASE_CANDIDATE_CHECKLIST.md)
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

M17 PR5 closeout validation commands:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
python3 scripts/docs_smoke.py
git diff --check HEAD
python3 -m unittest discover -s tests -p 'test_*.py'
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py
```

M17 PR5 closeout branch / PR #27 provided docs/status/smoke closeout history, and PR #28 merged the final status correction to main at `a03ecf236c638d69cd48c37465d70e03579ebc8f` after post-merge validation passed. M17 is CLOSED as GO WITH CONDITIONS for controlled executive review: dashboard/report surfaces are not production launch evidence, and human review plus field evidence are required before launch, budget, or winner decisions. M18 Thai-first Internationalization is the current implementation milestone; M19 must not begin until M18 closes. PR5 and final status correction must not add new workflows, backend endpoints, SocialSense capability, live APIs, external services, persistence, authentication, CRM/customer data, PII/private data, production automation, SocialSense changes, MarketingSimulation changes, or runtime product changes outside docs smoke.

M15 focused validation commands:

```bash
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/generate_creative_comparison_fixture.py
npm run test
npm run typecheck
npm run lint
npm run build
python3 scripts/docs_smoke.py
git diff --check HEAD
python3 -m unittest discover -s tests -p 'test_*.py'
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py
```

M15 is a product build milestone for Creative Comparison. It must keep backend endpoints, persistence, auth, live APIs, credentials, SocialSense changes, MarketingSimulation changes, production claims, persuasion optimization, microtargeting, and conversion guarantees out of scope.

M11 focused validation commands:

```bash
python3 scripts/docs_smoke.py
git diff --check origin/main...HEAD
```

M11 is a validation/reporting milestone only. Run the full frontend regression suite and docs smoke to prove no runtime regressions; do not add backend endpoints, new workflows, Creative Comparison, product redesign, or SocialSense changes.

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

## M12 review gates

Before M12 handoff:

- run `npm run test`;
- run `npm run typecheck`;
- run `npm run lint`;
- run `npm run build`;
- run `python3 scripts/docs_smoke.py`;
- run `git diff --check origin/main...HEAD`;
- run `python3 -m unittest discover -s tests -p 'test_*.py'`;
- run `PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py`;
- confirm Product Health, UX Health, Trust Score, Transparency Score, Validation Score, Dashboard Clarity, Overall Readiness, and Engineering KPI are documented;
- confirm no Creative Comparison, additional workflows, backend/live APIs, persistence, auth, credentials, SocialSense changes, or MarketingSimulation changes were added.

## M11 review gates

Before M11 handoff:

- run `npm run test`;
- run `npm run typecheck`;
- run `npm run lint`;
- run `npm run build`;
- run `python3 scripts/docs_smoke.py`;
- run `git diff --check origin/main...HEAD`;
- confirm all M11 validation artifacts exist and are linked from the README;
- confirm the persona reviews cover Product Launch, Campaign Message Test, A/B Experiment, and Campaign Workspace;
- confirm Product Health, Roadmap, and Executive Product Review recommend evidence-backed remediation before Creative Comparison;
- confirm no Creative Comparison, additional workflows, backend, runtime API, product redesign, auth, credentials, CRM/customer data, PII, private data, voter lists, microtargeting, persuasion optimization, conversion guarantees, production campaign claims, or SocialSense changes were added;
- commit M11 validation artifacts on `m11-continuous-product-validation`.
