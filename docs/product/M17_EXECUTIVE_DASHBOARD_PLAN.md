# M17 Executive Dashboard & Reporting Plan

Status: M17 started after M16 by PR1 program kickoff docs only. This PR does not deliver Executive KPI cards, marketing charts, confidence visualization, report/export implementation, runtime UI changes, backend, persistence, auth, external services, live APIs, SocialSense changes, or MarketingSimulation changes.

## M17 objective

Improve the existing executive dashboard and export-review experience so executive users can quickly understand scenario health, evidence quality, confidence, limitations, and recommended next actions from existing synthetic aggregate offline fixtures.

## M17 PR sequence

### PR1: Program kickoff docs

Scope:

- Create `docs/product/EXECUTIVE_EXPERIENCE_PROGRAM.md`.
- Create `docs/product/M17_EXECUTIVE_DASHBOARD_PLAN.md`.
- Update README, AGENTS, Roadmap, Product Health Dashboard, and docs smoke.
- Keep docs/smoke only.

Acceptance criteria:

- Program and M17 plan docs exist and link from README.
- M17-M19 are decomposed into epics/features/tasks/PR order.
- M17 PR2+ implementation is explicitly future work, not delivered in this PR.
- Quality gates are listed: QA Review, Code Review, Safety Review, Product Review, UX Review, Research Review.
- Program KPIs are measurable and reviewable with definition/formula, baseline/source, target/threshold, owner, cadence, and GO/NO-GO criteria: Product Health, UX Health, Executive Readiness, Dashboard Quality, Report Quality, I18N Readiness, Simulation Readiness, Trust, Transparency, Release Readiness.
- Evidence/confidence methodology is defined with evidence-quality tiers, confidence levels, minimum evidence requirements, downgrade rules, unsupported-evidence handling, and synthetic/offline evidence mapping.
- M19 PR3 implementation is blocked until M19 PR2 approves synthetic engagement methodology, metric definitions, fixture assumptions, evidence/confidence rules, and Research/Safety Review GO.
- Architecture Gate triggers are listed exactly: SocialSense redesign/API change, workspace/workflow/IA/design-system redesign, backend, persistence, auth, external services, live APIs.
- Validation commands pass.
- No source UI/runtime files are changed.

### PR2: Executive KPI cards

Scope:

- Future implementation only after PR1 review.
- Add or refine executive KPI cards using existing fixture data and existing dashboard patterns.
- Keep values synthetic aggregate, directional, and review-oriented.
- Do not add backend, persistence, auth, live APIs, external services, SocialSense changes, MarketingSimulation changes, or new workflows.

Acceptance criteria:

- KPI cards are visible on approved executive dashboard surfaces.
- Cards cover status, confidence, evidence coverage, risk, recommended next action, and review readiness.
- Copy avoids production prediction, conversion guarantees, and persuasion optimization claims.
- Unit tests cover card rendering and safety copy.
- Product Health, UX Health, Executive Readiness, Dashboard Quality, Trust, Transparency, and Release Readiness are updated in docs.
- QA Review, Code Review, Safety Review, Product Review, UX Review, and Research Review return GO.

### PR3: Marketing charts/evidence/confidence visualization

Scope:

- Future implementation only after PR2 validation.
- Add chart/evidence/confidence visualization using existing fixture fields only.
- Show evidence gaps, limitations, and human review questions near visual summaries.
- Keep chart design within the existing design-system pattern unless Architecture Gate approves otherwise.

Acceptance criteria:

- Charts or visual summaries render from existing offline fixtures without new data sources.
- Confidence and evidence gaps are visible and understandable.
- Unsupported or unavailable evidence is explicit, not hidden.
- No live APIs, external services, backend, persistence, auth, or SocialSense API changes are introduced.
- Dashboard Quality, Trust, Transparency, and Executive Readiness are updated.
- Tests cover chart/evidence/confidence empty and normal states.
- QA Review, Code Review, Safety Review, Product Review, UX Review, and Research Review return GO.

### PR4: Executive report/export improvements

Scope:

- Future implementation only after PR3 validation.
- Improve executive report narrative, headings, review checklist, and export-review readability.
- Preserve export review safety boundaries; do not claim real downloadable production report unless separately approved.
- Keep supported export semantics aligned with existing JSON, Markdown, and Executive Summary readiness unless a reviewed contract change approves otherwise.

Acceptance criteria:

- Executive report preview is clearer, shorter, and decision-oriented.
- Export review lists assumptions, limitations, evidence gaps, confidence, safety boundaries, and human review status.
- Unsupported formats remain clearly unavailable.
- No new external service, live API, backend, persistence, auth, or SocialSense change is added.
- Report Quality, Executive Readiness, Trust, Transparency, and Release Readiness are updated.
- Tests cover report/export rendering and unsafe-claim avoidance.
- QA Review, Code Review, Safety Review, Product Review, UX Review, and Research Review return GO.

### PR5: M17 validation/closeout

Scope:

- Future validation/closeout only after PR2-PR4 are merged and validated.
- Create M17 closeout documentation with KPI results, review-gate outcomes, known risks, and M18 readiness decision.
- Update README, AGENTS, Roadmap, Product Health Dashboard, and docs smoke as needed.
- Do not add runtime features in closeout unless separately approved.

Acceptance criteria:

- M17 closeout states what shipped, what remains future work, and whether M18 can start.
- Product Health, UX Health, Executive Readiness, Dashboard Quality, Report Quality, Trust, Transparency, and Release Readiness have current status.
- All quality gates are recorded: QA Review, Code Review, Safety Review, Product Review, UX Review, Research Review.
- Architecture Gate status is explicit and any triggers are documented.
- Validation commands pass on the M17 branch and after merge.
- SocialSense and MarketingSimulation remain unmodified.

## M17 research KPI and evidence gate

M17 implementation PRs must use the measurable KPI framework and evidence/confidence methodology in `docs/product/EXECUTIVE_EXPERIENCE_PROGRAM.md`. A KPI update is reviewable only when it includes:

- definition or formula;
- baseline and source;
- target or threshold;
- owner;
- cadence;
- GO/NO-GO criteria;
- evidence tier and confidence level;
- limitation and next evidence step for any Low/None confidence item.

M17 PR2 and PR3 must not render confidence, evidence, or readiness as generic labels. Every visible decision claim must map to an allowed evidence tier. Unsupported evidence must be labelled, downgraded to None, and either removed from the claim or converted into an evidence-gap blocker. Synthetic/offline fixtures default to Low confidence and may rise to Medium only when paired with documented review evidence.

M17 closeout cannot mark Executive Readiness, Dashboard Quality, Report Quality, Trust, Transparency, or Release Readiness as GO unless validation commands pass and QA, Code, Safety, Product, UX, and Research reviews record GO for the relevant scope.

## M19 sequencing dependency

M19 PR3 frontend implementation is explicitly blocked until M19 PR2 produces approved methodology documentation and review evidence. The required PR2 outputs are:

- approved synthetic engagement methodology;
- metric definitions/formulas with baselines/sources, targets/thresholds, owners, cadence, and limitations;
- fixture assumptions for platform/channel abstractions and excluded data sources;
- evidence/confidence rules, downgrade rules, unsupported-evidence handling, and synthetic/offline mapping;
- Research Review GO and Safety Review GO.

If any required M19 PR2 output is missing, stale, or REQUEST_CHANGES, M19 PR3 must remain docs-only or stop for Architecture Gate escalation; no frontend implementation may begin.

## M17 safety and Architecture Gate checks

Before each M17 PR, confirm the work does not require:

- SocialSense redesign/API change
- workspace/workflow/IA/design-system redesign
- backend
- persistence
- auth
- external services
- live APIs

If any item is required, stop and request Architecture Gate review before implementation.

## M17 non-goals

M17 does not implement:

- new workflows;
- Thai-first i18n runtime;
- synthetic social platform engagement simulation;
- backend endpoints;
- persistence;
- auth;
- external services;
- live APIs;
- SocialSense changes;
- MarketingSimulation changes;
- production campaign automation;
- conversion guarantees;
- persuasion optimization;
- microtargeting.

## Validation commands

Run before PR1 handoff and reuse for later M17 PRs unless a future PR adds a narrower required gate:

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
