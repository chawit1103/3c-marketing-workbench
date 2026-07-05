# AGENTS.md

Repository guidance for agents working in 3C Marketing Workbench.

## Purpose

- 3C Marketing Workbench is the official product app for executive marketing scenario work.
- Current branch scope: M1 PR3 SocialSense public SDK adapter smoke.
- PR3 adds a product-owned adapter under `integrations/socialsense/` plus local fixture smoke and tests.
- No UI workflow integration yet; PR4 will wire the product launch vertical slice.

## Repository boundaries

- Work in `/Users/chawit/Projects/3c-marketing-workbench` only unless explicitly asked otherwise.
- Do not modify SocialSense.
- Do not modify MarketingSimulation.
- SocialSense is a dependency boundary: 3C may use only public SDK/runtime surfaces.
- Allowed SocialSense import for PR3 adapter: `from socialsense import load_domain_pack`.
- Allowed runtime calls: `load_domain_pack('marketing')`, `domain.run(...)`, and `domain.export(...)`.
- Do not import `app.civicsense` or private SocialSense modules.
- Do not copy UI, routes, state, CSS, API helpers, architecture, or internals from SocialSense or MarketingSimulation.
- Keep PR3 independent from backend services, live data sources, authentication, credentials, and production campaign systems.

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

Keep all PR3 language fixture/offline, synthetic, aggregate-only, non-production, and human-review oriented. Visible UI should use user-facing executive language; avoid hidden internal platform terms as primary UI copy.

## PR3 adapter expectations

The adapter should expose:

- `run_product_launch_simulation(...)`;
- `run_campaign_message_test(...)`;
- `run_message_comparison(...)`;
- `export_executive_report(...)`.

Input mapping must stay limited to aggregate non-sensitive `scenario`, `platform_mix`, `seed`, `assumptions`, and `notes`.

Adapter outputs must preserve SocialSense provenance, safety labels/boundaries, limitations, evidence gaps, dashboard contract metadata, and export status. Smoke output should include `public_sdk_only: true`.

## Real PR3 commands

Install dependencies and maintain the npm lockfile when needed:

```bash
npm install
```

Run validation before handoff:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
python3 scripts/docs_smoke.py
python3 -m unittest discover -s tests -p 'test_*.py'
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py
git diff --check
git status --short --branch
```

Optional local manual frontend review:

```bash
npm run dev
```

## Docs smoke expectations

`scripts/docs_smoke.py` is a PR3 check. It must confirm:

- required docs exist, including `docs/product/SOCIALSENSE_INTEGRATION.md`;
- README links resolve;
- README and AGENTS include required safety phrases;
- expected React/Vite/TypeScript frontend shell files still exist;
- expected PR3 adapter, smoke, and test files exist;
- adapter uses the SocialSense public facade and avoids forbidden internals;
- forbidden backend/live/auth/credential files are absent.

## Definition of Done

PR3 is done only when:

- adapter exists under a product-owned path;
- adapter imports only the SocialSense public SDK facade;
- local smoke runs `product_launch` through SocialSense Marketing Domain Pack and exports `executive_json` at minimum;
- docs describe PR3 status and commands;
- `npm run test`, `npm run typecheck`, `npm run lint`, `npm run build`, `python3 scripts/docs_smoke.py`, Python adapter unit tests, local SocialSense smoke, and `git diff --check` pass;
- no backend, live API calls, credentials/auth, CRM/customer data, PII, private data, voter lists, microtargeting, persuasion optimization, conversion guarantees, or production campaign claims are introduced;
- SocialSense and MarketingSimulation remain unmodified;
- all PR3 changes are committed.
