# M4 Executive UX Review

Status: Drafted for M4 — Information Architecture & Design System Review.

Scope: executive UX evaluation only. No UI, workflow, backend, runtime, or SocialSense implementation is introduced.

## Purpose

The Executive UX Review evaluates whether 3C Marketing Workbench remains suitable for executives as it scales beyond Product Launch.

Core questions:

1. Can an executive understand the product in under five minutes?
2. Can an executive locate reports quickly?
3. Can an executive distinguish assumptions from evidence?
4. Can an executive identify limitations?

## Review basis

Reviewed artifacts:

- current Product Launch UI structure;
- approved Workflow Pattern;
- Campaign Domain docs;
- proposed Information Architecture;
- proposed Navigation Model;
- Design System Review;
- Design Tokens;
- Component Reuse Matrix.

## Executive comprehension assessment

| Question | Assessment | Decision |
|---|---|---|
| Can an executive understand the product in under five minutes? | Yes, if Home explains safe campaign planning and Campaigns groups workflows by business intent. | GO |
| Can an executive locate reports quickly? | Yes, with future Reports area and current Export Review pattern. Current nav is acceptable for one workflow. | GO with future IA implementation note |
| Can an executive distinguish assumptions from evidence? | Yes, Product Launch already separates editable assumptions from generated offline sample evidence; M4 makes this a standard. | GO |
| Can an executive identify limitations? | Yes, limitations/evidence gaps/safety labels are visible and must remain mandatory. | GO |

## Five-minute executive path

Future ideal executive path:

```text
Home
↓
Campaigns
↓
Select Product Launch / Campaign Message Test / Promotion / Brand Awareness
↓
Review assumptions
↓
Run or open reviewed result
↓
Read result headline + recommendation
↓
Open Reports / Export Review
↓
Review limitations and next action
```

Current Product Launch path remains compatible:

```text
Home → Workbench → Run offline simulation → Dashboard → Export Review
```

## Executive mental model

Executives should understand 3C as:

> A safe marketing decision workbench for reviewing campaign assumptions, directional evidence, limitations, and recommended next actions before business approval.

Approved labels:

| Concept | Executive-friendly label |
|---|---|
| Campaign Domain | Campaign structure / Campaign model |
| Evidence package | Review basis / Evidence summary |
| Export | Export Review / Report Preview |
| Run | Review / Run offline review |
| Result | Decision summary / Campaign review result |
| Limitations | What this cannot prove |
| Recommendation | Recommended next action |

Avoid as primary UI labels:

- raw runtime names;
- SocialSense internals;
- JSON payload language;
- “optimization” or “winner” without caveats;
- production campaign readiness unless actually approved.

## Report discoverability

Future Reports area should support:

| Report type | Executive need |
|---|---|
| Executive Summary | Quick decision brief. |
| Export Review | Check whether report artifacts are ready. |
| Evidence Gaps | See what must be validated. |
| Limitations | Understand risk before acting. |
| Recommendations | Know the next safe step. |

Current Product Launch export review is a good pattern because it says preview/readiness, not download or production-ready report.

## Assumptions vs evidence clarity

Required executive distinction:

| Layer | Must say |
|---|---|
| Assumptions | Operator-provided context, editable before run. |
| Evidence | Offline/synthetic/approved source only. |
| Limitations | What cannot be inferred. |
| Recommendation | Human-reviewable next action, not automation. |

Product Launch already demonstrates this split. Future workflows must keep it.

## Information density review

| Area | Density decision |
|---|---|
| Home | Low density; orient and start. |
| Campaigns | Medium density; grouped cards, not flat workflow list. |
| Workflow setup | Medium density; one objective and grouped fields. |
| Dashboard | Medium-high but scannable; cards and lists. |
| Reports | Low-medium; executive summary first. |
| Health | Higher density acceptable for product ops. |

## Executive UX risks

| Risk | Severity | Mitigation |
|---|---|---|
| 20+ workflows create menu sprawl | High | Group into Campaigns with Research and Comparison as secondary Campaigns groups; keep Reports and Templates separate. |
| Reports are hidden behind workflow pages | Medium | Add Reports area before report volume grows. |
| Assumptions/evidence blur | High | Keep assumptions preview and evidence labels mandatory. |
| Limitations become lower-page detail | High | Include limitations/evidence gaps in dashboard and export review. |
| Internal architecture terms leak into UI | Medium | Use executive labels and hide SocialSense/runtime terms. |
| A/B comparison implies optimization | High | Use planning/comparison language and caveats. |

## Executive UX decision

Executive UX Review: **GO candidate**.

The proposed IA and design-system standards can keep the product understandable for executives if future implementation follows the approved grouping, assumptions/evidence separation, and report discovery model.

## Success criteria

Executive UX Review is approved if:

- executives can understand the product purpose quickly;
- reports have an obvious future home;
- assumptions, evidence, limitations, and recommendations remain distinct;
- future IA avoids menu sprawl;
- no implementation is introduced in M4.
