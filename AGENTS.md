# AGENTS.md

Repository guidance for agents working in 3C Marketing Workbench.

## Purpose

- 3C Marketing Workbench is the official product app for executive marketing scenario work.
- Current repository status: M17 Executive Dashboard & Reporting is in PR2 implementation after M16 Feature Freeze and Demo Readiness and the PR1 program kickoff docs.
- PR1 product architecture, PR2 frontend shell, PR3 SocialSense public adapter smoke, PR4 Product Launch vertical slice, M2 workflow-pattern stabilization, M3 Campaign Domain Planning, M4 Information Architecture & Design System Review, M5 Campaign Message Test Reference Workflow, M6 Experiment Framework Planning, M7 A/B Experiment Reference Workflow, M8 Marketing Journey Framework, M9 Campaign Workspace Foundation, M10 Campaign Workspace MVP, M11 Continuous Product Validation, M12 Campaign Workspace Trust & Validation, M13 Product Trust Readiness Gate, M14 Creative Comparison discovery/specification, M15 Creative Comparison Vertical Slice, M16 Feature Freeze and Demo Readiness, and M17 PR1 Executive Experience program kickoff docs are complete. M17 PR2 implements the first limited executive KPI/dashboard visual slice.
- M17 PR2 may update the existing Campaign Workspace/dashboard frontend, CSS, tests, docs/status, and docs smoke to add fixture-backed executive KPI cards and React/CSS-only visuals. Do not add new workflows, backend endpoints, SocialSense capability, live APIs, external services, persistence, auth, credentials, CRM/customer data, PII/private data, production automation, workflow redesign, workspace redesign, SocialSense changes, or MarketingSimulation changes.

## Repository boundaries

- Work in `/Users/chawit/Projects/3c-marketing-workbench` only unless explicitly asked otherwise.
- Do not modify SocialSense.
- Do not modify MarketingSimulation.
- SocialSense is a dependency boundary: 3C may use only public SDK/runtime surfaces.
- Allowed SocialSense import for the product adapter: `from socialsense import load_domain_pack`.
- Allowed runtime calls: `load_domain_pack('marketing')`, `domain.run(...)`, and `domain.export(...)`.
- Product Launch, Campaign Message Test, A/B Experiment, and Creative Comparison fixture generation must go through product-owned scripts and `integrations/socialsense/adapter.py`; do not import private SocialSense modules.
- Do not copy UI, routes, state, CSS, API helpers, architecture, or internals from SocialSense or MarketingSimulation.
- Keep M17 PR2 limited to existing frontend/docs/tests and fixture/offline data; do not add backend services, live data sources, authentication, credentials, external services, new workflows, persistence, workspace storage, production campaign systems, SocialSense changes, MarketingSimulation changes, or product redesign.

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

Keep all M17 language fixture/offline-compatible, synthetic, aggregate-only, non-production, release-readiness, feature-freeze, and human-review oriented. Visible UI should use user-facing executive language; avoid internal platform terms as primary UI copy.

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


## M17 Executive Dashboard & Reporting expectations

M17 PR1 was docs/smoke only and started the Executive Experience & Marketing Simulation Enhancement program after M16. M17 PR2 is the first limited implementation slice for executive dashboard readability.

Required planning artifacts:

- `docs/product/EXECUTIVE_EXPERIENCE_PROGRAM.md`;
- `docs/product/M17_EXECUTIVE_DASHBOARD_PLAN.md`.

M17 PR1 must continue documenting the M17-M19 program and the fact that PR1 did not deliver implementation. M17 PR2 must stay limited to existing fixture/offline frontend dashboard improvements: executive KPI cards, platform comparison, audience comparison, confidence/risk/readiness visuals, journey progress, CSS, tests, and docs/status updates.

Architecture Gate triggers must remain exactly: SocialSense redesign/API change, workspace/workflow/IA/design-system redesign, backend, persistence, auth, external services, live APIs.

Program KPIs must include: Product Health, UX Health, Executive Readiness, Dashboard Quality, Report Quality, I18N Readiness, Simulation Readiness, Trust, Transparency, Release Readiness.

Run focused validation before handoff:

```bash
python3 scripts/docs_smoke.py
git diff --check HEAD
npm run test
npm run typecheck
npm run lint
npm run build
python3 -m unittest discover -s tests -p 'test_*.py'
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py
git status --short --branch
```

## M16 validation commands

Run focused validation before handoff:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
python3 scripts/docs_smoke.py
git diff --check HEAD
python3 -m unittest discover -s tests -p 'test_*.py'
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py
git status --short --branch
```

M16 may add or update release-readiness docs, docs smoke, README, Roadmap, Product Health Dashboard, and AGENTS only unless a small low-risk polish fix is clearly necessary. Do not add new workflows, backend/server/API/auth/credential files, persistence, live APIs, SocialSense changes, MarketingSimulation changes, private/customer data, production automation, workflow redesign, or workspace redesign.

## M15 validation commands

Run focused validation before handoff:

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
git status --short --branch
```

M15 may add the Creative Comparison route/workflow, deterministic offline fixture, generator, tests, closeout report, README/roadmap/product health/AGENTS docs, and docs smoke updates. Do not add backend/server/API/auth/credential files, persistence, live APIs, SocialSense changes, MarketingSimulation changes, production claims, persuasion optimization, microtargeting, or conversion guarantees.

## M14 validation commands

Run focused validation before handoff:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
python3 scripts/docs_smoke.py
git diff --check HEAD
python3 -m unittest discover -s tests -p 'test_*.py'
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py
git status --short --branch
```

M14 may modify documentation and docs smoke only. Do not add runtime/source implementation, backend/server/api/auth/credential files, new workflows, Creative Comparison implementation, product redesign, persistence, live APIs, SocialSense changes, or MarketingSimulation changes.

## M13 validation commands

Run focused validation before handoff:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
python3 scripts/docs_smoke.py
git diff --check HEAD
python3 -m unittest discover -s tests -p 'test_*.py'
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py
git status --short --branch
```

M13 may modify documentation and docs smoke only. Do not add runtime/source implementation, backend/server/api/auth/credential files, new workflows, Creative Comparison implementation, product redesign, persistence, live APIs, SocialSense changes, or MarketingSimulation changes.

## M12 validation commands

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

M12 may modify focused frontend trust/validation code, regression tests, README/roadmap/product health/AGENTS docs, and docs smoke only. Do not add backend/server/api/auth/credential files, new workflows, Creative Comparison, product redesign, persistence, live APIs, SocialSense changes, or MarketingSimulation changes.

## Docs smoke expectations

`scripts/docs_smoke.py` must confirm:

- required docs exist, including `docs/product/SOCIALSENSE_INTEGRATION.md`;
- the six M6 Experiment Framework docs exist and include status/scope/non-implementation boundaries;
- the six M8 Marketing Journey Framework docs exist and include status/scope/non-implementation boundaries;
- the seven M9 Campaign Workspace Foundation docs exist and include status/scope/non-implementation boundaries;
- the five M11 continuous product validation docs exist and include evidence/backlog/readiness boundaries;
- README links resolve, including M6, M8, M9, M11, M12, M13, and M14 docs;
- README and AGENTS include required safety phrases;
- expected React/Vite/TypeScript frontend shell files still exist;
- expected PR3 adapter, smoke, and test files exist;
- expected PR4 and M5 fixture files still exist;
- adapter uses the SocialSense public facade and avoids forbidden internals;
- fixture generators use the PR3 adapter, not private SocialSense imports;
- M14 branch changes are limited to Creative Comparison discovery docs, README/roadmap/product health/AGENTS docs, and docs smoke updates;
- forbidden backend/live/auth/credential files are absent.

## Definition of Done

M14 is done only when:

- all six M14 Creative Comparison discovery/specification docs exist;
- docs include problem statement, goals, non-goals, personas, user stories, user journey, UX flow, navigation flow, information architecture, screen inventory, conceptual data model, comparison dimensions, trust boundaries, transparency rules, research constraints, fixture requirements, error states, empty states, accessibility notes, success metrics, acceptance criteria, and future API/persistence considerations as conceptual only;
- Product Health, Roadmap, README, AGENTS, and docs smoke reflect M14 discovery status;
- no Creative Comparison implementation, runtime/source implementation, new workflow, Campaign Workspace redesign, backend endpoint, API, persistence, auth, live API, credential, CRM/customer data, PII, private data, voter list, microtargeting, persuasion optimization, conversion guarantee, production campaign claim, SocialSense change, or MarketingSimulation change is introduced;
- `npm run test`, `npm run typecheck`, `npm run lint`, `npm run build`, `python3 scripts/docs_smoke.py`, `git diff --check HEAD`, `python3 -m unittest discover -s tests -p 'test_*.py'`, `PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py`, and changed-path guard pass;
- QA Review, Code Review, Safety Review, Product Review, UX Review, and Research Review all return GO;
- PR is opened, merged, post-merge KPI docs are updated, and full validation passes on `main`.

## M13 Definition of Done

- M12 trust behavior is verified stable on `main` for unknown run/export states, `/health`, result visibility, and fixture transparency;
- `docs/product/M13_PRODUCT_TRUST_READINESS_GATE.md` exists and is linked from README;
- Product Trust, UX Clarity, Research Transparency, Regression Stability, and Creative Comparison Planning decisions are explicit;
- Product Health, Roadmap, README, AGENTS, and docs smoke reflect M13 governance status;
- no Creative Comparison implementation, additional workflow implementation, backend, runtime API, persistence, workspace storage, live API, auth, credentials, CRM/customer data, PII, private data, voter lists, microtargeting, persuasion optimization, conversion guarantees, production campaign claims, product redesign, SocialSense changes, or MarketingSimulation changes are introduced;
- `npm run test`, `npm run typecheck`, `npm run lint`, `npm run build`, `python3 scripts/docs_smoke.py`, `git diff --check HEAD`, `python3 -m unittest discover -s tests -p 'test_*.py'`, `PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py`, and changed-path guard pass;
- QA Review, Code Review, Safety Review, Product Review, UX Review, and Research Review all return GO;
- PR is opened for M13 review.

## M12 Definition of Done

M12 is done only when:

- unknown `/runs/:id` and `/exports/:id` show explicit unavailable states with recovery links and no Product Launch fallback;
- blank/invalid input feedback explains what is missing, why it matters, and how to fix it;
- run completion/result visibility is immediate;
- all result views distinguish Reference Fixture from User Review Session, synthetic generated sample, user-provided assumptions, and no live execution;
- Product Health, Roadmap, README, AGENTS, and docs smoke reflect M12 trust validation status and KPIs;
- no Creative Comparison, additional workflow implementation, backend, runtime API, persistence, workspace storage, live API, auth, credentials, CRM/customer data, PII, private data, voter lists, microtargeting, persuasion optimization, conversion guarantees, production campaign claims, product redesign, or SocialSense changes are introduced;
- `npm run test`, `npm run typecheck`, `npm run lint`, `npm run build`, `python3 scripts/docs_smoke.py`, `git diff --check origin/main...HEAD`, and changed-path guard pass;
- SocialSense and MarketingSimulation remain unmodified;
- M12 is complete only when all review gates pass and post-merge validation on `main` remains green.
