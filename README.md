# 3C Marketing Workbench

3C Marketing Workbench is the official product app for executive marketing scenario work. It is intended to provide a safe, UX-first workbench for comparing marketing assumptions, reviewing synthetic aggregate scenario outputs, and preparing executive reports.

Status: M1 PR1 product architecture and UX audit. This PR is documentation-only. It does not create an app scaffold, frontend, backend, package metadata, runtime integration, or production campaign workflow.

## Repository boundary

This repository owns the 3C product experience:

- product positioning and user journey;
- future scenario setup workflow;
- future SocialSense integration adapter over public SDK/runtime surfaces only;
- future executive dashboard and export review experience;
- repository-local product, architecture, roadmap, and operating docs.

Adjacent repositories are reference/dependency boundaries, not edit targets for this PR:

- SocialSense is the platform dependency. It owns simulation runtime, Marketing Domain Pack, ConsumerSDK, safety validation, provenance, dashboard contracts, and export contracts.
- MarketingSimulation is old/reference material only. It may be inspected for UX lessons, but must not be copied or modified.

PR1 must not modify SocialSense or MarketingSimulation.

## M1 PR1 status

PR1 establishes the product foundation before any scaffold work:

- old MarketingSimulation UX audit completed;
- 3C product principles documented;
- product architecture and SocialSense boundary documented;
- cross-repository dependency map documented;
- roadmap and product health dashboard documented;
- README and AGENTS repo guidance completed;
- validation remains docs-only.

Application scaffold commands are TBD until PR2. Do not invent or run npm, Python app, frontend, backend, or framework commands for this repository in PR1.

## Docs map

Required PR1 documents:

- [Old MarketingSimulation UX Audit](docs/product/OLD_MARKETING_SIMULATION_UX_AUDIT.md)
- [3C Product Principles](docs/product/3C_PRODUCT_PRINCIPLES.md)
- [Product Architecture](docs/architecture/PRODUCT_ARCHITECTURE.md)
- [Cross-Repository Dependency Map](docs/architecture/CROSS_REPOSITORY_DEPENDENCY_MAP.md)
- [Roadmap](docs/product/ROADMAP.md)
- [Product Health Dashboard](docs/product/PRODUCT_HEALTH_DASHBOARD.md)
- [Agent Instructions](AGENTS.md)

## Safety boundaries

3C Marketing Workbench is a safe fixture/offline product concept until later reviewed gates approve implementation. PR1 and future PRs must not add or imply:

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

Future product copy must also avoid claiming real-world predictive certainty, field evidence, production readiness, or guaranteed marketing outcomes.

## Planned local setup notes

Current PR1 setup is docs-only:

- no app scaffold exists;
- no package manager has been selected;
- no local server exists;
- no SocialSense adapter is implemented;
- no external service configuration is required.

PR2 will define the app scaffold and verified local setup commands. Until then, local validation is limited to documentation checks and git hygiene.

## PR1 quality gates

Run these before handoff:

```bash
python3 scripts/docs_smoke.py
git diff --check
```

Expected PR1 validation:

- required docs exist;
- README links point to existing files;
- README and AGENTS include required safety boundaries;
- no app scaffold is introduced;
- SocialSense and MarketingSimulation are not modified;
- changes are committed on `m1-pr1-product-architecture-ux-audit`.
