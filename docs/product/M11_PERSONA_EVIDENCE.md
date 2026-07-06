# M11 Persona Evidence Appendix

Status: M11 Continuous Product Validation & Synthetic Dogfooding evidence appendix.
Scope: Committed evidence summary only. This document records synthetic/operator dogfooding observations; it does not implement product changes, new workflows, Creative Comparison, backend endpoints, runtime changes, product redesign, or SocialSense changes.

## Evidence caveat

M11 used Hermes persona reviews and browser/operator walkthroughs. Timing is proxy/operator timing, not private-user analytics. Scores are ordinal product-review scores, not statistically significant user-research metrics.

## Scoring method

Scores use a 1-10 ordinal rubric:

| Score band | Meaning |
|---|---|
| 9-10 | Strong, clear, and safe with only minor polish. |
| 7-8 | Usable and valuable with known non-blocking friction. |
| 5-6 | Partially usable; notable friction or confidence gaps. |
| 3-4 | Workflow can be completed only with substantial support. |
| 1-2 | Blocks task completion or creates unacceptable risk. |

Overall Product Health Score is the simple average of the ten reported dimensions in `M11_PRODUCT_VALIDATION_REPORT.md`:

| Dimension | Score |
|---|---:|
| Business Value | 8.0 |
| Workflow Clarity | 7.0 |
| Navigation Clarity | 7.0 |
| Executive Readability | 8.0 |
| Operator Confidence | 6.5 |
| Research Confidence | 6.5 |
| Safety Communication | 9.0 |
| Export Understanding | 8.0 |
| Dashboard Readability | 7.0 |
| Learning Curve | 7.0 |
| **Average** | **7.4** |

This is a synthetic dogfooding score for prioritization only. It is not a claim of statistically validated product-market fit.

## Shared technical evidence

Local route and UI checks were run against:

```text
http://127.0.0.1:5182
```

Observed route checks from persona sessions:

| Route | Observed status | Evidence note |
|---|---:|---|
| `/` | 200 | Home rendered with Campaign Workspace and workflow CTAs. |
| `/workbench` | 200 | Product Launch setup rendered. |
| `/workbench/campaign-message-test` | 200 | Campaign Message Test setup rendered. |
| `/workbench/ab-experiment` | 200 | A/B Experiment setup rendered. |
| `/campaign-workspace` | 200 | Campaign Workspace rendered. |
| `/runs/sample-run` | 200 | Product Launch dashboard rendered. |
| `/exports/sample-run` | 200 | Product Launch export readiness preview rendered. |
| `/runs/unknown-run-id` | 200 | Valid-looking Product Launch result appeared for unknown ID; recorded as P1 backlog, not fixed in M11. |
| `/exports/unknown-run-id` | 200 | Valid-looking Product Launch export appeared for unknown ID; recorded as P1 backlog, not fixed in M11. |
| `/workspace` | 200 SPA fallback | Natural guessed alias did not route to Campaign Workspace; recorded as P2 backlog. |

Console observations: no JavaScript errors were observed during the sampled browser walkthroughs.

## Persona completion matrix

| Persona | Product Launch | Campaign Message Test | A/B Experiment | Campaign Workspace | Completion status |
|---|---|---|---|---|---|
| Marketing Director | Completed | Completed with discoverability caveat | Completed | Completed | Completed all scenarios |
| First-time user | Completed with scroll friction | Completed with scroll friction | Completed with validation caveat | Completed with `/workspace` route caveat | Completed all scenarios |
| Marketing Research Specialist | Completed | Completed with discoverability/reproducibility caveat | Completed | Completed | Completed all scenarios |
| Power user | Completed with edge-case notes | Completed with edge-case notes | Completed with invalid-input notes | Completed plus invalid-route tests | Completed all scenarios |
| Governance reviewer | Completed review | Completed review | Completed review | Completed review | Completed all scenarios |
| Future maintainer | Completed static/runtime review | Completed static/runtime review | Completed static/runtime review | Completed static/runtime review | Completed all scenarios |

## Persona records

### Marketing Director / Product Manager

Task result:

| Scenario | Result | Proxy notes |
|---|---|---|
| Product Launch | Success | Reached executive summary; business value is clear. |
| Campaign Message Test | Success with friction | Useful but result/output discoverability needs stronger handoff. |
| A/B Experiment | Success | Strongest business framing because low confidence/no-winner is clear. |
| Campaign Workspace | Success | Workspace supports campaign-level review and current/next-step decisioning. |

Measurements:

| Measure | Observation |
|---|---|
| Task success | 4/4 completed |
| Navigation confusion | Medium: workspace and export context can be ambiguous |
| Wrong clicks | Low in guided routes; `/workspace` is likely guess risk |
| Scroll friction | Medium |
| Reading burden | Medium/high |
| Decision confidence | Medium |
| Executive usefulness | High |
| Recommendation usefulness | Medium/high |
| Evidence understanding | Medium |
| Export understanding | Medium/high |
| Safety understanding | High |
| Satisfaction | 7/10 |

Key evidence: Product Health and Executive Product Review recommend M12 trust/validation fixes before Creative Comparison.

### First-time user / UX Researcher

Task result:

| Scenario | Result | Proxy notes |
|---|---|---|
| Product Launch | Success with scroll friction | Run result appears below fold and can be missed. |
| Campaign Message Test | Success with scroll friction | Result can be missed unless user scrolls/finds links. |
| A/B Experiment | Success with validation caveat | Blank/invalid input feedback is weak. |
| Campaign Workspace | Success with route caveat | Current stage and next step are clear; `/workspace` alias is not supported. |

Measurements:

| Measure | Observation |
|---|---|
| Task success | 4/4 completed |
| Navigation confusion | Medium |
| Wrong clicks | 1 likely wrong-route guess (`/workspace`) |
| Scroll friction | Medium/high |
| Reading burden | Medium/high |
| Decision confidence | Medium |
| Executive usefulness | High |
| Recommendation usefulness | Medium/high |
| Evidence understanding | Medium |
| Export understanding | Medium |
| Safety understanding | High |
| Satisfaction | 6.4/10 |

Key evidence: P1 friction items are blockers for next capability work, not blockers to completing M11 validation.

### Marketing Research Specialist / Research Analyst

Task result:

| Scenario | Result | Proxy notes |
|---|---|---|
| Product Launch | Success | Safe executive summary; signal labels need methodology. |
| Campaign Message Test | Success with discoverability caveat | Result path should be easier to verify and interpret. |
| A/B Experiment | Success | Low-confidence/no-winner framing is research-safe. |
| Campaign Workspace | Success | Strong synthesis; fixture-reference versus user-run labeling needs clarity. |

Measurements:

| Measure | Observation |
|---|---|
| Task success | 4/4 completed |
| Navigation confusion | Medium |
| Wrong clicks | Low |
| Scroll friction | Medium |
| Reading burden | Medium/high |
| Decision confidence | Medium because evidence is synthetic |
| Executive usefulness | High with caveats |
| Recommendation usefulness | High but could be more scenario-specific |
| Evidence understanding | Medium/high |
| Export understanding | High |
| Safety understanding | High |
| Satisfaction | 7/10 |

Key evidence: Product Health score is an ordinal average of ten synthetic dogfooding dimensions, documented above.

### Power user / QA

Task result:

| Scenario | Result | Proxy notes |
|---|---|---|
| Product Launch | Success with friction | Reached executive summary; blank field behavior needs clearer validation. |
| Campaign Message Test | Success with friction | Result generated; global nav context can confuse sample/current run. |
| A/B Experiment | Success with invalid-input caveat | Blank Variant A lacked visible error/recovery. |
| Campaign Workspace | Success | Current stage, next step, reports, exports visible. |

Edge-case evidence:

| Edge case | Observed behavior | Backlog severity |
|---|---|---|
| `/runs/unknown-run-id` | Product Launch fixture rendered under unknown ID | P1 |
| `/exports/unknown-run-id` | Product Launch export preview rendered under unknown ID | P1 |
| `/workspace` | SPA fallback, not Campaign Workspace | P2 |
| blank Variant A | Weak/silent feedback | P1 |

### Governance reviewer / Safety Reviewer

Task result:

| Scenario | Result | Safety interpretation |
|---|---|---|
| Product Launch | Completed review | Strong fixture/offline/no-production framing. |
| Campaign Message Test | Completed review | Claim-readiness caveats are useful. |
| A/B Experiment | Completed review | No-winner, low-confidence, blocked-actions language is strong. |
| Campaign Workspace | Completed review | Good executive caveats; fixture/user-run labels should improve. |

Measurements:

| Measure | Observation |
|---|---|
| Safety understanding | High |
| Overclaim risk | Low/medium: mostly controlled by caveats |
| Misleading wording risk | Medium for invalid run/export fallback and fixture/user-run ambiguity |
| Governance satisfaction | 8/10 |

### Future maintainer / Code Reviewer

Task result:

| Scenario | Result | Maintainability interpretation |
|---|---|---|
| Product Launch | Completed review | Usable reference workflow. |
| Campaign Message Test | Completed review | Reuse pattern works but result context should be explicit. |
| A/B Experiment | Completed review | Good fixture reuse and blocked-action framing. |
| Campaign Workspace | Completed review | Useful but source is concentrated in large `src/views.tsx`. |

Maintainability evidence:

| Finding | Severity | Evidence |
|---|---|---|
| Heuristic fixture routing | P2 | Unknown run/export falls back to Product Launch. |
| Large route/view file | P2 | `src/views.tsx` concentrates workflow config, workspace, dashboard, export, validation, and fixture selection. |
| Docs smoke branch-guard debt | Resolved for M11 | `scripts/docs_smoke.py` now includes M11 docs/report-only guard. |

## Reproducible validation commands

M11 local validation evidence:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
python3 scripts/docs_smoke.py
git diff --check origin/main...HEAD
python3 -m unittest discover -s tests -p 'test_*.py'
```

Observed result: all commands passed on branch `m11-continuous-product-validation` at final pre-merge head `2d798733c50ad5580f23c5929c055321f2a9b75d`; the PR was then squash-merged to `main`.

## M11 interpretation boundary

M11 validates the current product and produces evidence-backed backlog. It does not claim that P1 findings are fixed. The correct roadmap interpretation is:

- M11 validation milestone: complete when evidence and backlog are accepted.
- Next capability work: blocked until P1 findings are resolved or explicitly accepted.
- Creative Comparison: not authorized by M11.