# Executive Experience & Marketing Simulation Enhancement Program

Status: M17 Executive Dashboard & Reporting — Complete for controlled review after PR1 program kickoff docs, PR2 executive KPI cards, PR3 marketing charts/evidence/confidence visualization, PR4 report/export readability, and PR5 M17 validation/closeout complete. Current readiness is GO WITH CONDITIONS because evidence remains E1 synthetic/offline fixture scope with Low directional confidence; human review and field evidence are required before launch, budget, or winner decisions. M18 may be prepared next after M17 review/merge/post-merge validation, but M18 implementation must not begin in this PR. PR5 does not add backend behavior, SocialSense changes, MarketingSimulation changes, persistence, auth, external services, live APIs, runtime product changes, or actual PDF/PPT generation/download.

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

The program must track these KPIs across M17-M19. Every future implementation PR must update the relevant KPI row with current evidence, status, owner sign-off, and a GO/NO-GO decision before handoff.

### Measurable KPI framework

| Program KPI | Definition / formula | Baseline and source | Target / threshold | Owner | Cadence | GO / NO-GO criteria |
|---|---|---|---|---|---|---|
| Product Health | `(validated workflows + documented safe states + passing product smoke gates) / planned workflow health checks`; review as percent complete plus open blocker count. | M16 Feature Freeze and Demo Readiness docs, `docs/product/PRODUCT_HEALTH_DASHBOARD.md`, `scripts/docs_smoke.py`, current offline fixture tests. Baseline at PR1: docs baseline only, no M17 runtime evidence. | GO target: 100% required docs/smoke gates pass, zero critical product blockers, no Architecture Gate trigger. NO-GO threshold: any missing required workflow health evidence, critical blocker, or unreviewed runtime expansion. | Product owner with QA reviewer. | Every M17-M19 PR and milestone closeout. | GO when all required product checks are evidenced and owners sign off; NO-GO when evidence is missing, stale, contradicted by tests, or requires out-of-scope architecture work. |
| UX Health | `reviewed executive UX tasks passed / reviewed executive UX tasks attempted`, with unresolved severity-1/2 UX issues counted as blockers. | M16 dogfooding/readability notes, M17 dashboard/report review notes, UX Review outcomes. Baseline at PR1: planned review criteria only. | GO target: >=90% reviewed tasks pass, zero severity-1/2 UX blockers, safety boundaries remain visible. NO-GO threshold: unclear executive path, hidden limitations, inaccessible or ambiguous critical labels. | UX reviewer. | Each UI/report PR and closeout. | GO when representative executive review can identify status, confidence, limitation, and next action; NO-GO when reviewers cannot interpret decision state or safety boundaries. |
| Executive Readiness | Count of executive decision surfaces that show `status + confidence + evidence + limitation + recommended next action` divided by required executive surfaces. | Existing executive dashboard/export surfaces and M17 PR plans. Baseline at PR1: not implemented; requirement documented. | GO target: 100% required surfaces include all five elements; NO-GO threshold: any executive surface lacks evidence, limitation, or next-action framing. | Product owner with executive reviewer. | Every M17 implementation PR and closeout. | GO when dashboard/report can support a review meeting without unsupported claims; NO-GO when it implies production performance, conversion certainty, or hides uncertainty. |
| Dashboard Quality | `(passing dashboard rendering states + passing empty/error/safety states) / required dashboard states`, plus visual review sign-off. | Existing React tests, fixture-backed dashboard state checks, M17 PR2/PR3 validation. Baseline at PR1: no M17 dashboard implementation. | GO target: 100% required states covered by tests/review, no critical visual regressions. NO-GO threshold: broken rendering, untested empty state, unsafe claim, or new data source. | Frontend owner with QA reviewer. | Each dashboard PR. | GO when fixture-only dashboard renders normal, empty, and limitation states; NO-GO when it needs backend/live data or masks missing evidence. |
| Report Quality | `(required report sections present + export-review safety checks passed) / required report sections`, with unsupported formats explicitly labelled. | Existing export-review conventions, M17 PR4 plan, report/export tests. Baseline at PR1: report improvement not implemented. | GO target: all required sections present: assumptions, limitations, evidence gaps, confidence, safety boundaries, human review status. NO-GO threshold: missing review section, unsupported format presented as available, or production-ready claim. | Reporting owner with Safety reviewer. | Each report/export PR. | GO when report is decision-ready and clearly non-production; NO-GO when export copy overstates readiness or omits limitations. |
| I18N Readiness | `(approved Thai-first terms + approved fallback rules + reviewed safety strings) / required i18n inventory`. | M18 discovery/glossary docs and Thai-first review notes. Baseline at PR1: future milestone, no runtime i18n. | GO target: 100% critical safety/executive terms reviewed before i18n implementation; NO-GO threshold: unreviewed safety wording, ambiguous Thai label, or architecture change without gate. | I18N/content owner with UX reviewer. | M18 PRs and any PR changing user-facing copy. | GO when Thai-first copy preserves executive meaning and safety comprehension; NO-GO when translations weaken limitations or require unapproved runtime architecture. |
| Simulation Readiness | `(approved synthetic metrics + approved assumptions + validated fixture states + reviewed limitations) / required simulation plan items`. | M19 PR1 discovery, M19 PR2 methodology/fixture plan, offline synthetic fixture validation. Baseline at PR1: future milestone only. | GO target: 100% methodology items approved before implementation; NO-GO threshold: missing metric definition, unapproved fixture assumption, live/social-platform dependency, or unsafe engagement claim. | Research owner with Safety reviewer. | M19 PR1-PR5. | GO when simulation remains synthetic, aggregate, fixture/offline, and methodology-approved; NO-GO when implementation starts before Research/Safety GO or implies real engagement prediction. |
| Trust | `approved trust signals shown / required trust signals`, with safety review blocker count. Required signals: source mode, synthetic/offline label, limitations, evidence gaps, human review status, blocked actions. | M12/M13 trust gates, M16 freeze docs, Safety Review outcomes. Baseline at PR1: trust requirements documented. | GO target: all required trust signals visible for changed surfaces, zero safety blockers. NO-GO threshold: hidden source mode, missing blocked-action copy, or unsupported production claim. | Safety reviewer. | Every PR. | GO when users can see what the system can and cannot conclude; NO-GO when trust copy is absent, misleading, or contradicted by UI/report behavior. |
| Transparency | `(claims with visible evidence basis + visible confidence + visible limitation) / total decision claims`. | Evidence/confidence methodology in this doc, dashboard/report copy reviews. Baseline at PR1: methodology documented, implementation pending. | GO target: 100% decision claims have evidence basis, confidence, and limitation. NO-GO threshold: any unsupported claim, hidden assumption, or confidence without evidence tier. | Research reviewer with Product owner. | Every PR touching claims, metrics, or reports. | GO when every claim is traceable to allowed evidence; NO-GO when unsupported evidence is promoted, omitted, or not downgraded. |
| Release Readiness | `(completed required validation commands + completed review gates + resolved blockers) / required release gates`. | Required validation command output, QA/Code/Safety/Product/UX/Research reviews, closeout docs. Baseline at PR1: validation required before handoff. | GO target: 100% required commands pass and all review gates GO. NO-GO threshold: any failed required command, unresolved blocker, dirty unsupported scope, or missing owner decision. | Release owner with QA reviewer. | Every PR handoff and milestone closeout. | GO when validation is green and review gates are recorded; NO-GO when validation is skipped/failing or scope exceeds approved boundaries. |

### Evidence/confidence methodology

All dashboard, report, i18n, and simulation claims must state their evidence tier, confidence level, limitation, and owner-reviewed source. Evidence is review support, not production proof.

Evidence-quality tiers:

| Tier | Evidence type | Allowed use | Default confidence ceiling |
|---|---|---|---|
| E0 Unsupported | No source, stale source, contradicted source, unverifiable reviewer memory, or missing fixture field. | Must be labelled `Unsupported`; may only create a blocker or evidence-gap note. | None; cannot support a KPI GO. |
| E1 Synthetic/offline fixture | Product-owned generated fixture, static sample, or offline SocialSense public-adapter output with visible assumptions. | Directional planning, UI smoke, copy review, scenario explanation. | Low unless triangulated with E2+ review evidence. |
| E2 Internal review evidence | QA/Product/UX/Research/Safety review notes, deterministic tests, docs smoke, fixture validation, or accessibility/readability review. | PR readiness and methodology acceptance. | Medium unless supported by E3 operational evidence. |
| E3 Validated aggregate evidence | Approved non-PII aggregate benchmark, reviewed research dataset, or repeated controlled validation that is explicitly allowed by architecture/safety scope. | Milestone readiness and stronger directional comparisons. | High for reviewed scope only; still not a production guarantee. |
| E4 Production/live evidence | Live APIs, customer data, CRM, private messages, scraping, production campaign results, or external services. | Out of scope for M17-M19 unless a future Architecture Gate and Safety Review explicitly approve it. | Not allowed in this program baseline. |

Confidence levels:

| Level | Meaning | Minimum evidence requirement | Required display |
|---|---|---|---|
| None | Claim has no usable evidence. | E0 or missing required source. | Show unsupported/evidence gap; block GO. |
| Low | Directional hypothesis only. | E1 plus visible assumptions and limitations. | Show low confidence, assumptions, next evidence step. |
| Medium | Reviewable planning confidence. | E1 plus E2, or multiple consistent E2 checks. | Show confidence rationale, owner, cadence, limitation. |
| High | Strong evidence for the reviewed offline/product scope. | E3 plus E2 review sign-off and no safety blocker. | Show scope boundary and confirm no production guarantee. |

Minimum evidence requirements:

- Any KPI status needs at least E1 evidence, a named owner, cadence, and limitation.
- Any PR handoff GO needs E2 review evidence for the changed scope plus passing required validation commands.
- Any M19 simulation implementation GO needs approved M19 PR2 methodology evidence: synthetic engagement metrics, fixture assumptions, evidence/confidence rules, safety limits, and Research/Safety Review GO.
- Any release-readiness GO needs all required review gates recorded and zero unresolved critical blockers.

Downgrade rules:

- Downgrade confidence by one level when evidence is synthetic/offline only, older than the current milestone, not tied to a named owner, or missing an explicit limitation.
- Downgrade to Low when fixture assumptions are incomplete, metric definitions are directional but not formula-backed, or only one reviewer role has approved the evidence.
- Downgrade to None and block GO when evidence is unsupported, contradicted by validation, out of scope, uses forbidden data/source types, or cannot be reproduced.
- Never upgrade synthetic/offline evidence above Low unless combined with documented E2 review evidence; never upgrade above Medium without allowed E3 aggregate evidence.

Unsupported-evidence handling:

1. Label the claim `Unsupported` in docs, dashboard, or report notes.
2. Remove or rewrite the claim as an assumption or evidence gap.
3. Create a blocker with owner, next evidence step, and cadence.
4. Force KPI status to NO-GO if the unsupported claim is required for release, safety, executive readiness, or simulation readiness.

Synthetic/offline mapping:

- Generated fixtures, offline adapter outputs, and mock executive dashboard states map to E1 by default.
- E1 supports directional UI/readability checks and planning narratives only.
- E1 cannot support production performance, real engagement prediction, conversion lift, persuasion optimization, or release claims without E2/E3 review evidence.
- If synthetic/offline evidence is used in reports, the report must show source mode, assumptions, confidence ceiling, limitations, and next evidence step.

## M17 Executive Dashboard & Reporting

Status: PR5 M17 validation/closeout is current and docs/status/smoke only; PR1 remains the historical docs/smoke only kickoff and did not deliver implementation. PR2 executive KPI cards, PR3 marketing charts/evidence/confidence visualization, and PR4 report/export readability are complete. M17 closes with GO WITH CONDITIONS for controlled executive review.

Historical PR1 context: PR1 recorded “M17 PR2+ implementation is future work” and “not delivered in this PR” because PR1 was docs/smoke only with no source UI/runtime changes. That boundary is preserved as PR1 history, not as the current PR2 branch status.

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
2. PR2 Executive KPI cards: complete limited implementation slice after PR1 review.
3. PR3 Marketing charts/evidence/confidence visualization: complete implementation after PR2 validation.
4. PR4 Executive report/export improvements: current implemented runtime slice after PR3 validation.
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
3. PR3 Frontend implementation only after the M19 PR3 implementation gate is satisfied: approved synthetic engagement methodology, metric definitions/formulas, fixture assumptions, evidence/confidence rules, and explicit Research Review GO plus Safety Review GO from M19 PR2.
4. PR4 Reporting/export review integration only after simulation validation.
5. PR5 M19 validation and closeout.

### M19 PR3 implementation gate

M19 PR3 is blocked until M19 PR2 records all of the following as GO:

- Synthetic engagement methodology approved by Research Review and Safety Review.
- Metric definitions include formula, baseline/source, target/threshold, owner, cadence, and limitation for every engagement metric.
- Fixture assumptions list platform/channel abstractions, synthetic aggregate input ranges, excluded data sources, and unsupported states.
- Evidence/confidence rules match the methodology in this program doc, including downgrade rules and unsupported-evidence handling.
- Safety scope confirms no scraping, private messages/groups, real accounts, live APIs, external services, CRM/customer data, PII, voter lists, microtargeting, persuasion optimization, conversion guarantees, production posting, or production campaign claims.

If any item is missing or receives REQUEST_CHANGES, PR3 implementation must not start; the only allowed follow-up is docs/methodology correction or Architecture Gate escalation.

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
- PR2+ implementation was explicitly future work and not delivered in PR1; PR2 is now the current limited runtime slice.
- Each implementation PR must be small enough to review independently.
- Each PR must update docs smoke if it introduces required docs or durable acceptance criteria.
- Any Architecture Gate trigger stops implementation until reviewed.
- M18 cannot start implementation until M17 validation/closeout confirms executive dashboard/reporting readiness.
- M19 cannot start implementation until Thai-first review confirms safety comprehension and executive readability.
