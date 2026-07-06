# AGENTS.md

Repository guidance for agents working in 3C Marketing Workbench.

## Purpose

- 3C Marketing Workbench is the official product app for executive marketing scenario work.
- Current branch scope: M11 Continuous Product Validation & Synthetic Dogfooding, validation/reporting only.
- PR1 product architecture, PR2 frontend shell, PR3 SocialSense public adapter smoke, PR4 Product Launch vertical slice, M2 workflow-pattern stabilization, M3 Campaign Domain Planning, M4 Information Architecture & Design System Review, M5 Campaign Message Test Reference Workflow, M6 Experiment Framework Planning, M7 A/B Experiment Reference Workflow, M8 Marketing Journey Framework, M9 Campaign Workspace Foundation, and M10 Campaign Workspace MVP are complete.
- M11 validates the current product through structured multi-persona synthetic dogfooding and creates evidence reports/backlog only. Reuse the approved Workflow Pattern, Campaign Domain, IA, Navigation, Design System, Experiment Framework, Marketing Journey Framework, Campaign Workspace Foundation, Campaign Workspace MVP, dashboard/export patterns, safety labels, product-owned adapter, and product-owned SocialSense boundary. Do not implement Creative Comparison, add workflows, redesign architecture, add backend behavior, live APIs, private data, persistence, or SocialSense changes.

## Repository boundaries

- Work in `/Users/chawit/Projects/3c-marketing-workbench` only unless explicitly asked otherwise.
- Do not modify SocialSense.
- Do not modify MarketingSimulation.
- SocialSense is a dependency boundary: 3C may use only public SDK/runtime surfaces.
- Allowed SocialSense import for the product adapter: `from socialsense import load_domain_pack`.
- Allowed runtime calls: `load_domain_pack('marketing')`, `domain.run(...)`, and `domain.export(...)`.
- Product Launch, Campaign Message Test, and A/B Experiment fixture generation must go through product-owned scripts and `integrations/socialsense/adapter.py`; do not import private SocialSense modules.
- Do not copy UI, routes, state, CSS, API helpers, architecture, or internals from SocialSense or MarketingSimulation.
- Keep M11 independent from backend services, live data sources, authentication, credentials, additional workflows, Creative Comparison, persistence, workspace storage, production campaign systems, and product redesign.

## Safety rules

Do not add or imply:

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

Keep all M11 language fixture/offline-compatible, synthetic, aggregate-only, non-production, validation/reporting-only, and human-review oriented. Visible UI should use user-facing executive language; avoid internal platform terms as primary UI copy.

## M6 Experiment Framework planning expectations

M6 must define Experiment as a reusable framework for future comparison workflows without adding product runtime behavior.

Required planning artifacts:

- `docs/product/EXPERIMENT_DOMAIN_ANALYSIS.md`;
- `docs/product/EXPERIMENT_TAXONOMY.md`;
- `docs/product/EXPERIMENT_DATA_MODEL.md`;
- `docs/product/EXPERIMENT_WORKFLOW_MAPPING.md`;
- `docs/product/EXPERIMENT_CONSUMER_MAPPING.md`;
- `docs/product/EXPERIMENT_WORKFLOW_COMPATIBILITY.md`.

M6 must keep A/B Message Comparison, Multivariate Testing, Creative Comparison, backend, runtime functionality, frontend routes, live APIs, and SocialSense changes out of scope.

## M8 Marketing Journey Framework expectations

M8 must define Marketing Journey as a reusable framework for connecting existing workflows into a coherent product experience without adding product runtime behavior.

Required planning artifacts:

- `docs/product/MARKETING_JOURNEY_ANALYSIS.md`;
- `docs/product/MARKETING_JOURNEY_MODEL.md`;
- `docs/product/JOURNEY_WORKFLOW_MAPPING.md`;
- `docs/product/WORKSPACE_MODEL.md`;
- `docs/product/EXECUTIVE_JOURNEY.md`;
- `docs/product/FUTURE_WORKFLOW_PLACEMENT.md`.

M8 must keep Creative Comparison, additional workflows, frontend implementation, backend behavior, runtime functionality, live APIs, and SocialSense changes out of scope.

## M9 Campaign Workspace Foundation expectations

M9 must define Campaign Workspace as a campaign-centric product foundation without adding product runtime behavior.

Required planning artifacts:

- `docs/product/CAMPAIGN_WORKSPACE_ANALYSIS.md`;
- `docs/product/CAMPAIGN_WORKSPACE_MODEL.md`;
- `docs/product/CAMPAIGN_WORKSPACE_NAVIGATION.md`;
- `docs/product/CAMPAIGN_WORKSPACE_DASHBOARD.md`;
- `docs/product/CAMPAIGN_WORKSPACE_JOURNEY.md`;
- `docs/product/CAMPAIGN_EXECUTIVE_WORKSPACE.md`;
- `docs/product/CAMPAIGN_WORKSPACE_PLACEMENT.md`.

M9 must keep Creative Comparison, additional workflows, frontend implementation, backend behavior, runtime functionality, persistence, workspace storage, live APIs, and SocialSense changes out of scope.

## M11 validation commands

Run focused validation before handoff:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
python3 scripts/docs_smoke.py
git diff --check origin/main...HEAD
git status --short --branch
```

M11 may modify docs and docs smoke only. Do not add backend/server/api/auth/credential files, runtime/frontend implementation, new workflows, Creative Comparison, product redesign, or SocialSense changes.

## Docs smoke expectations

`scripts/docs_smoke.py` must confirm:

- required docs exist, including `docs/product/SOCIALSENSE_INTEGRATION.md`;
- the six M6 Experiment Framework docs exist and include status/scope/non-implementation boundaries;
- the six M8 Marketing Journey Framework docs exist and include status/scope/non-implementation boundaries;
- the seven M9 Campaign Workspace Foundation docs exist and include status/scope/non-implementation boundaries;
- the four M11 continuous product validation docs exist and include evidence/backlog/readiness boundaries;
- README links resolve, including M6, M8, M9, and M11 docs;
- README and AGENTS include required safety phrases;
- expected React/Vite/TypeScript frontend shell files still exist;
- expected PR3 adapter, smoke, and test files exist;
- expected PR4 and M5 fixture files still exist;
- adapter uses the SocialSense public facade and avoids forbidden internals;
- fixture generators use the PR3 adapter, not private SocialSense imports;
- M11 branch changes are limited to validation reports/backlog, README/roadmap/product health/AGENTS docs, and docs smoke updates;
- forbidden backend/live/auth/credential files are absent.

## Definition of Done

M11 is done only when:

- all six persona reviews complete Product Launch, Campaign Message Test, A/B Experiment, and Campaign Workspace scenarios;
- `docs/product/M11_PRODUCT_VALIDATION_REPORT.md`, `docs/product/M11_UX_FRICTION_REGISTER.md`, `docs/product/M11_PRODUCT_BACKLOG.md`, and `docs/product/M11_EXECUTIVE_PRODUCT_REVIEW.md` exist and are linked;
- Product Health, Roadmap, README, and AGENTS reflect M11 validation status and evidence-backed next milestone guidance;
- no Creative Comparison, additional workflow implementation, backend, runtime API, persistence, workspace storage, live API, auth, credentials, CRM/customer data, PII, private data, voter lists, microtargeting, persuasion optimization, conversion guarantees, production campaign claims, product redesign, or SocialSense changes are introduced;
- `npm run test`, `npm run typecheck`, `npm run lint`, `npm run build`, `python3 scripts/docs_smoke.py`, `git diff --check origin/main...HEAD`, and changed-path guard pass;
- SocialSense and MarketingSimulation remain unmodified;
- M11 validation artifacts are committed.
