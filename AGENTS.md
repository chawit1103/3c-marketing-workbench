# AGENTS.md

Repository guidance for agents working in 3C Marketing Workbench.

## Purpose

- 3C Marketing Workbench is the official product app for executive marketing scenario work.
- Current branch scope: M1 PR2 React/Vite/TypeScript frontend shell and design system scaffold.
- PR2 is frontend shell only: route placeholders, safety labels, initial design system, tests, lint, typecheck, build, and docs smoke.

## Repository boundaries

- Work in `/Users/chawit/Projects/3c-marketing-workbench` only unless explicitly asked otherwise.
- Do not modify SocialSense.
- Do not modify MarketingSimulation.
- SocialSense is a dependency boundary: future 3C implementation may use only public SDK/runtime surfaces.
- MarketingSimulation is reference-only for UX audit evidence. Do not copy UI, routes, state, CSS, API helpers, or architecture.
- Keep PR2 independent from backend services, live data sources, authentication, credentials, and production campaign systems.

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

Keep all PR2 language fixture/offline, synthetic, aggregate-only, non-production, and human-review oriented. Visible UI should use user-facing executive language; avoid hidden internal platform terms as primary UI copy.

## Real PR2 commands

Install dependencies and maintain the npm lockfile:

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
git diff --check
git status --short --branch
```

Optional local manual review:

```bash
npm run dev
```

## Docs smoke expectations

`scripts/docs_smoke.py` is a PR2 check. It must confirm:

- required docs exist;
- README links resolve;
- README and AGENTS include required safety phrases;
- expected React/Vite/TypeScript frontend shell files exist;
- forbidden backend/live/auth/credential files are absent.

## Definition of Done

PR2 is done only when:

- README and AGENTS describe PR2, not PR1-only docs;
- React/Vite/TypeScript scaffold files and package lock are present;
- core routes render and route sprawl remains limited;
- safety labels are visible in the shell;
- primary UI copy avoids internal platform terminology;
- `npm run test`, `npm run typecheck`, `npm run lint`, `npm run build`, `python3 scripts/docs_smoke.py`, and `git diff --check` pass;
- no backend, no SocialSense adapter, no live API calls, no credentials/auth, and no real simulation are introduced;
- SocialSense and MarketingSimulation remain unmodified;
- all PR2 changes are committed.
