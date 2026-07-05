# AGENTS.md

Repository guidance for agents working in 3C Marketing Workbench.

## Purpose

- 3C Marketing Workbench is the official product app for executive marketing scenario work.
- Current branch scope: M4 Information Architecture & Design System Review, documentation-only.
- PR1 product architecture, PR2 frontend shell, PR3 SocialSense public adapter smoke, PR4 Product Launch vertical slice, M2 workflow-pattern stabilization, and M3 Campaign Domain Planning are complete.
- M4 defines long-term information architecture, navigation, workflow organization, design-system review, design tokens, component reuse, and executive UX standards before additional workflows are added.

## Repository boundaries

- Work in `/Users/chawit/Projects/3c-marketing-workbench` only unless explicitly asked otherwise.
- Do not modify SocialSense.
- Do not modify MarketingSimulation.
- SocialSense is a dependency boundary: 3C may use only public SDK/runtime surfaces.
- Allowed SocialSense import for the product adapter: `from socialsense import load_domain_pack`.
- Allowed runtime calls: `load_domain_pack('marketing')`, `domain.run(...)`, and `domain.export(...)`.
- PR4 fixture generation must go through `scripts/generate_product_launch_fixture.py` and `integrations/socialsense/adapter.py`; do not import private SocialSense modules.
- Do not copy UI, routes, state, CSS, API helpers, architecture, or internals from SocialSense or MarketingSimulation.
- Keep PR4 independent from backend services, live data sources, authentication, credentials, and production campaign systems.

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

Keep all PR4 language fixture/offline, synthetic, aggregate-only, non-production, and human-review oriented. Visible UI should use user-facing executive language; avoid internal platform terms as primary UI copy.

## PR4 vertical slice expectations

The browser should let a non-technical user complete Product Launch Simulation from `/workbench`:

- objective locked/defaulted to Product Launch;
- product/message/offer/key-message/context fields;
- audience presets and platform mix selection;
- local run action that reveals the generated offline sample result;
- `/runs/:runId` dashboard with marketing-friendly cards and caveats;
- `/exports/:runId` review for JSON, Markdown, and Executive Summary readiness/status;
- safety labels and limitations visible before interpreting or sharing.

The UI consumes `src/product/fixtures/productLaunchResult.json`, generated from SocialSense through the PR3 adapter. It must not claim arbitrary browser-entered data was executed by SocialSense unless that is actually implemented in a later gated PR.

## Real PR4 commands

Install dependencies and maintain the npm lockfile when needed:

```bash
npm install
```

Run validation before handoff:

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
git status --short --branch
```

Optional local manual frontend review:

```bash
npm run dev
```

## Docs smoke expectations

`scripts/docs_smoke.py` must confirm:

- required docs exist, including `docs/product/SOCIALSENSE_INTEGRATION.md`;
- README links resolve;
- README and AGENTS include required safety phrases;
- expected React/Vite/TypeScript frontend shell files still exist;
- expected PR3 adapter, smoke, and test files exist;
- expected PR4 fixture generator, UI fixture, and generator tests exist;
- adapter uses the SocialSense public facade and avoids forbidden internals;
- fixture generator uses the PR3 adapter, not private SocialSense imports;
- forbidden backend/live/auth/credential files are absent.

## Definition of Done

PR4 is done only when:

- Product Launch vertical slice is usable from `/workbench`;
- generated offline sample fixture exists and is reproducible through the PR3 adapter;
- `/runs/:runId` and `/exports/:runId` render dashboard/export review from the generated sample;
- UI tests cover workflow, validation, platform selection, results, export review, safety labels, and no internal term leakage;
- `npm run test`, `npm run typecheck`, `npm run lint`, `npm run build`, docs smoke, Python tests, fixture generation, SocialSense adapter smoke, and `git diff --check` pass;
- no backend, live API calls, credentials/auth, CRM/customer data, PII, private data, voter lists, microtargeting, persuasion optimization, conversion guarantees, or production campaign claims are introduced;
- SocialSense and MarketingSimulation remain unmodified;
- all PR4 changes are committed.
