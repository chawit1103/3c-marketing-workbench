# AGENTS.md

Repository guidance for agents working in 3C Marketing Workbench.

## Purpose

- 3C Marketing Workbench is the official product app for executive marketing scenario work.
- Current branch scope: M1 PR1 product architecture, UX audit, roadmap, and repo guidance.
- PR1 is docs-only. Do not create application code or scaffold.

## Repository boundaries

- Work in `/Users/chawit/Projects/3c-marketing-workbench` only unless explicitly asked otherwise.
- Do not modify SocialSense.
- Do not modify MarketingSimulation.
- SocialSense is a dependency boundary: future 3C implementation may use only public SDK/runtime surfaces.
- MarketingSimulation is reference-only for UX audit evidence. Do not copy UI, routes, state, CSS, API helpers, or architecture.

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

Keep all PR1 language fixture/offline, synthetic, aggregate-only, non-production, and human-review oriented.

## PR quality gates

Before handoff on PR1:

```bash
python3 scripts/docs_smoke.py
git diff --check
git status --short --branch
```

The docs smoke must confirm required docs exist, README links resolve, required safety phrases are present, and no app scaffold files are present.

## Future app command placeholder

App scaffold, install, build, test, and run commands are TBD until PR2. Do not invent npm, Python app, frontend, backend, or framework commands in PR1.

## Definition of Done

PR1 is done only when:

- README is no longer a stub and links to existing PR1 docs;
- this AGENTS.md exists and is concise/actionable;
- required PR1 docs exist;
- safety boundaries are explicit in README and AGENTS;
- validation commands pass;
- no app scaffold exists;
- SocialSense and MarketingSimulation remain unmodified;
- all PR1 docs changes are committed.
