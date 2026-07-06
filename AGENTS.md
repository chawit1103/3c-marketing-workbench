# AGENTS.md

Repository guidance for agents working in 3C Marketing Workbench.

## Purpose

- 3C Marketing Workbench is the official product app for executive marketing scenario work.
- Current branch scope: M7 A/B Experiment Reference Workflow implementation.
- PR1 product architecture, PR2 frontend shell, PR3 SocialSense public adapter smoke, PR4 Product Launch vertical slice, M2 workflow-pattern stabilization, M3 Campaign Domain Planning, M4 Information Architecture & Design System Review, and M5 Campaign Message Test Reference Workflow are complete.
- M7 implements A/B Experiment as the third reference workflow through the existing workbench pattern. Reuse the approved Experiment Framework, Workflow Pattern, Campaign Domain, IA, Navigation, Design System, dashboard/export patterns, and product-owned SocialSense adapter. Do not redesign architecture, add backend behavior, live APIs, private data, or SocialSense changes.

## Repository boundaries

- Work in `/Users/chawit/Projects/3c-marketing-workbench` only unless explicitly asked otherwise.
- Do not modify SocialSense.
- Do not modify MarketingSimulation.
- SocialSense is a dependency boundary: 3C may use only public SDK/runtime surfaces.
- Allowed SocialSense import for the product adapter: `from socialsense import load_domain_pack`.
- Allowed runtime calls: `load_domain_pack('marketing')`, `domain.run(...)`, and `domain.export(...)`.
- Product Launch, Campaign Message Test, and A/B Experiment fixture generation must go through product-owned scripts and `integrations/socialsense/adapter.py`; do not import private SocialSense modules.
- Do not copy UI, routes, state, CSS, API helpers, architecture, or internals from SocialSense or MarketingSimulation.
- Keep M7 independent from backend services, live data sources, authentication, credentials, and production campaign systems.

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

Keep all M7 language fixture/offline-compatible, synthetic, aggregate-only, non-production, and human-review oriented. Visible UI should use user-facing executive language; avoid internal platform terms as primary UI copy.

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

## M7 validation commands

Run focused validation before handoff:

```bash
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/generate_ab_experiment_fixture.py
python3 -m unittest discover -s tests -p 'test_*.py'
npm run test
npm run typecheck
npm run lint
npm run build
python3 scripts/docs_smoke.py
git diff --check
git status --short --branch
```

Optional local manual frontend review for implementation milestones only:

```bash
npm run dev
```

## Docs smoke expectations

`scripts/docs_smoke.py` must confirm:

- required docs exist, including `docs/product/SOCIALSENSE_INTEGRATION.md`;
- the six M6 Experiment Framework docs exist and include status/scope/non-implementation boundaries;
- README links resolve, including M6 docs;
- README and AGENTS include required safety phrases;
- expected React/Vite/TypeScript frontend shell files still exist;
- expected PR3 adapter, smoke, and test files exist;
- expected PR4 and M5 fixture files still exist;
- adapter uses the SocialSense public facade and avoids forbidden internals;
- fixture generators use the PR3 adapter, not private SocialSense imports;
- M6 branch changes are limited to docs plus README/AGENTS/docs smoke;
- forbidden backend/live/auth/credential files are absent.

## Definition of Done

M6 is done only when:

- all six Experiment Framework docs exist;
- Product Health Dashboard and Roadmap reflect M6 as the current planning milestone;
- no A/B Message Comparison, Multivariate Testing, Creative Comparison, frontend workflow, backend, runtime functionality, live API, auth, credentials, CRM/customer data, PII, private data, voter lists, microtargeting, persuasion optimization, conversion guarantees, production campaign claims, or SocialSense changes are introduced;
- `python3 scripts/docs_smoke.py`, `git diff --check origin/main...HEAD`, and the docs-only diff guard pass;
- QA, code review, safety review, documentation review, Product Review, UX Review, and Research Review return GO;
- SocialSense and MarketingSimulation remain unmodified;
- all M6 planning changes are committed.
