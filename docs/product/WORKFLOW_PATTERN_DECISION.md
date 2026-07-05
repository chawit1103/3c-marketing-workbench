# Workflow Pattern Decision

Decision: **GO**

Status: M2 Exit Review complete.

Timestamp: 2026-07-05 21:20:13 +07.

## Decision statement

Product Launch is approved as the official reusable workflow pattern for 3C Marketing Workbench planning and future workflow design.

Approved reusable flow:

```text
Input
↓
Review
↓
Run
↓
Result Preview / Dashboard
↓
Executive Summary
↓
Export Review
↓
Recommended Next Action
```

Required refinement:

- Recommended Next Action should appear immediately after run/result preview and remain available in dashboard/export context.
- Loading, error, and empty-state conventions must be specified before implementing workflows that are async, multi-variant, or non-fixture-backed.

## Gate results

| Gate | Decision | Notes |
|---|---|---|
| Product Review | GO | Business value, workflow clarity, discoverability, and onboarding quality are sufficient. |
| UX Review | GO | Cognitive load, navigation, readability, and consistency are acceptable. |
| Research Review | GO | Dashboard/report/evidence/recommendation pattern is useful if safety/provenance remain visible. |
| Engineering Review | GO | Pattern is reusable without redesign; do not create a generic engine prematurely. |
| QA | GO | Docs-only review scope; validation passes. |
| Code Review | GO | Docs-only pattern review; no implementation scope. |
| Safety Review | GO | No live/API/private-data/production claim scope. |

Architecture Gate: **not triggered**.

## Classification by future workflow

| Future workflow | Classification | Required handling |
|---|---|---|
| Campaign Message Test | Reusable | Planning may start after this decision; implementation remains blocked until authorized. |
| A/B Message Comparison | Needs extension | Add two-variant input/review/dashboard comparison rules, not a redesign. |
| Promotion Response | Reusable | Reuse pattern with offer/promotion-specific cards. |
| Brand Awareness | Reusable | Reuse pattern with awareness/reach/trust cards. |
| Product Feedback | Needs extension | Add qualitative feedback taxonomy and evidence grouping. |

## Conditions for future milestones

1. Future workflows must use this pattern unless a future Architecture Gate approves a redesign.
2. Campaign Message Test may proceed to **planning only** after this decision.
3. No future workflow implementation is authorized by this decision alone.
4. Real export/download remains separately gated.
5. Backend/live/API/auth/CRM/PII/private-data integration remains out of scope.
6. SocialSense public adapter boundary remains unchanged.
7. MarketingSimulation remains reference-only.

## Why GO

The Product Launch flow has passed:

- vertical-slice completion;
- private dogfooding review;
- UX friction burn-down;
- proxy timing / DOM walkthrough review;
- copy/readability polish;
- post-merge validation;
- safety/scope gates.

It now provides enough stable structure to avoid reinventing UX for each future workflow.

## Why not redesign

A redesign is not warranted because:

- top-screen run visibility is solved;
- objective/workflow clarity is solved;
- result discoverability is solved;
- dashboard readability is acceptable after M2.3 polish;
- safety/export wording is clear and bounded;
- remaining gaps are extension specs, not core pattern blockers.

## Known extension backlog

Before workflow implementation expands, define:

- shared async loading state;
- shared run-error state;
- no-run dashboard empty state;
- no-export readiness empty state;
- two-variant comparison dashboard pattern;
- keyboard-only/accessibility dogfood checklist.

## Next milestone recommendation

Recommended next milestone: **Campaign Message Test Planning**.

Scope must be planning only unless the user explicitly authorizes implementation.
