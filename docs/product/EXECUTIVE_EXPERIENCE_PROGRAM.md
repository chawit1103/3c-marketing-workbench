# Executive Experience & Marketing Simulation Enhancement Program

Status: M17 program kickoff docs only. M17 Executive Dashboard & Reporting has started after M16 Feature Freeze and Demo Readiness. M18 Thai-first Internationalization and M19 Synthetic Social Platform Engagement Simulation are planned future milestones. This PR does not deliver runtime features, UI changes, backend behavior, SocialSense changes, MarketingSimulation changes, persistence, auth, external services, or live APIs.

## Program objective

Create an executive-grade marketing workbench that turns safe synthetic aggregate scenario outputs into decision-ready dashboards, transparent reports, Thai-first internationalized experiences, and later synthetic social engagement simulations without weakening the M16 architecture freeze.

The program improves business, consumer, and executive value in priority order:

1. Business value: faster campaign decision framing, clearer evidence review, better reporting discipline, and safer cross-functional handoff.
2. Executive value: board-ready KPI cards, confidence/evidence visibility, clear limitations, and export/report narratives that support decision meetings.
3. Consumer value: Thai-first clarity, accessible explanations, transparent boundaries, and no unsafe personalization or production persuasion claims.

## Architecture freeze

M16 Feature Freeze v0.1 remains the baseline. M17-M19 may compose existing product-owned frontend patterns, generated offline fixtures, dashboard/export review conventions, safety labels, docs smoke, and the public SocialSense adapter boundary. Any expansion beyond that baseline must stop for Architecture Gate review before implementation.

Frozen baseline:

- frontend-only React/Vite/TypeScript product shell;
- generated offline fixtures only;
- synthetic aggregate outputs only;
- no backend;
- no persistence;
- no auth;
- no external services;
- no live APIs;
- no SocialSense changes;
- no MarketingSimulation changes;
- no customer, CRM, private, voter, or PII data;
- no production campaign automation or conversion guarantee.

## Architecture Gate triggers

Architecture Gate is triggered exactly by any proposed change requiring:

- SocialSense redesign/API change
- workspace/workflow/IA/design-system redesign
- backend
- persistence
- auth
- external services
- live APIs

If a PR discovers one of these triggers, it must stop implementation, document the dependency, and request architecture review before code changes continue.

## Program KPIs

The program must track these KPIs across M17-M19:

- Product Health
- UX Health
- Executive Readiness
- Dashboard Quality
- Report Quality
- I18N Readiness
- Simulation Readiness
- Trust
- Transparency
- Release Readiness

## M17 Executive Dashboard & Reporting

Status: started by PR1 program kickoff docs. PR2+ implementation is future work and is not delivered in this PR.

### Epic 1: Executive KPI cards

Feature: Decision-first KPI card layer for the existing executive dashboard pattern.

Tasks:

- Define KPI inventory and mapping to existing fixture fields.
- Keep KPI values directional, synthetic aggregate, and review-oriented.
- Show status, confidence, evidence coverage, risk, and recommended next action.
- Avoid claiming production prediction or guaranteed marketing outcomes.

### Epic 2: Marketing charts, evidence, and confidence visualization

Feature: Scannable chart/evidence sections that clarify what is known, uncertain, and missing.

Tasks:

- Define allowed chart types from existing fixture data only.
- Add confidence and evidence-gap presentation rules.
- Keep limitations and human review questions visible.
- Confirm no live data, external API, or SocialSense contract expansion is required.

### Epic 3: Executive report and export improvements

Feature: Better executive narrative and export-review readability without bypassing safety review.

Tasks:

- Improve report structure, headings, and review checklist.
- Preserve JSON, Markdown, and Executive Summary readiness semantics unless a future reviewed PR approves otherwise.
- Document unsupported formats as future work.
- Keep export review honest: preview/review only unless separately approved.

### M17 PR order

1. PR1 Program kickoff docs: this docs-only PR.
2. PR2 Executive KPI cards: future implementation after PR1 review.
3. PR3 Marketing charts/evidence/confidence visualization: future implementation after PR2 validation.
4. PR4 Executive report/export improvements: future implementation after PR3 validation.
5. PR5 M17 validation/closeout: future validation and closeout docs after PR2-PR4 pass review.

## M18 Thai-first Internationalization

Status: planned future milestone after M17 closeout. No i18n runtime implementation is delivered in this PR.

### Epic 1: Thai-first content model

Feature: Thai-first UX copy and executive terminology for the product shell and reports.

Tasks:

- Audit executive/product terms that need Thai-first wording.
- Define translation tone, glossary, fallback rules, and review ownership.
- Preserve safety copy clarity in Thai and English.

### Epic 2: Locale architecture planning

Feature: Internationalization implementation plan that avoids architecture drift.

Tasks:

- Identify current copy surfaces and route/page ownership.
- Define future locale file structure only after review.
- Confirm whether implementation stays frontend-only and fixture/offline.
- Stop for Architecture Gate if locale work requires backend, persistence, auth, external services, live APIs, or design-system redesign.

### Epic 3: Thai-first validation

Feature: Review gates for Thai usability, executive readability, and safety comprehension.

Tasks:

- Validate Thai labels, report sections, and safety boundaries with representative review personas.
- Track I18N Readiness, UX Health, Trust, and Transparency.
- Record unresolved wording risks before any release claim.

### M18 PR order

1. PR1 Thai-first i18n discovery and glossary.
2. PR2 Locale architecture and content inventory.
3. PR3 Thai-first UI/report copy implementation, only if approved.
4. PR4 I18N validation and closeout.

## M19 Synthetic Social Platform Engagement Simulation

Status: planned future milestone after M18 review. No synthetic social platform runtime implementation is delivered in this PR.

### Epic 1: Social engagement simulation scope

Feature: Safe synthetic engagement model for scenario review, not live social automation.

Tasks:

- Define platform/channel abstractions using synthetic aggregate assumptions only.
- Separate engagement simulation from scraping, private messages, real accounts, or production posting.
- Document safety restrictions for microtargeting, persuasion optimization, and conversion claims.

### Epic 2: Simulation evidence and transparency

Feature: Explainable simulation output that highlights uncertainty and evidence gaps.

Tasks:

- Define engagement metrics as synthetic directional indicators.
- Show assumptions, confidence, limitations, and human review questions.
- Track Simulation Readiness, Trust, Transparency, and Release Readiness.

### Epic 3: Executive social scenario reporting

Feature: Executive-facing summary for synthetic social engagement scenarios.

Tasks:

- Summarize reach/engagement hypotheses without production claims.
- Show recommended next learning action, not automated campaign action.
- Preserve export review and safety label boundaries.

### M19 PR order

1. PR1 Synthetic social engagement discovery and safety scope.
2. PR2 Simulation model and fixture plan, docs first.
3. PR3 Frontend implementation only if no Architecture Gate trigger is present.
4. PR4 Reporting/export review integration only after simulation validation.
5. PR5 M19 validation and closeout.

## Safety boundaries

M17-M19 must not add or imply:

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
- production campaign claims;
- backend;
- persistence;
- auth;
- external services;
- SocialSense changes;
- MarketingSimulation changes.

All outputs remain synthetic aggregate, fixture/offline compatible, human-review oriented, and non-production unless a later reviewed architecture and safety gate explicitly changes scope.

## Validation and review gates

Program requirement: validation and review gates must be explicit in every PR handoff.

Every PR in this program must list and complete these quality gates before handoff:

- QA Review
- Code Review
- Safety Review
- Product Review
- UX Review
- Research Review

M17 PR1 validation commands:

```bash
python3 scripts/docs_smoke.py
git diff --check HEAD
npm run test
npm run typecheck
npm run lint
npm run build
python3 -m unittest discover -s tests -p 'test_*.py'
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py
```

## PR sequencing rules

- PR1 is docs-only program kickoff and must not implement runtime features.
- PR2+ implementation is explicitly future work and not delivered in PR1.
- Each implementation PR must be small enough to review independently.
- Each PR must update docs smoke if it introduces required docs or durable acceptance criteria.
- Any Architecture Gate trigger stops implementation until reviewed.
- M18 cannot start implementation until M17 validation/closeout confirms executive dashboard/reporting readiness.
- M19 cannot start implementation until Thai-first review confirms safety comprehension and executive readability.
