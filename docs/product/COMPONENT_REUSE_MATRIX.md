# M4 Component Reuse Matrix

Status: Drafted for M4 — Information Architecture & Design System Review.

Scope: component reuse strategy only. No component implementation, workflow implementation, backend, runtime, or SocialSense change is introduced.

## Purpose

The Component Reuse Matrix shows which existing component patterns future workflows should reuse so new workflows become configurations of the approved product structure, not isolated feature additions.

## Component families

| Component family | Current pattern | Reuse decision |
|---|---|---|
| Shell/navigation | AppShell, header, nav pills | Reuse with IA refinement |
| Safety labels | Global SafetyLabels + badges | Reuse mandatory |
| Workflow cards | ObjectiveCard pattern | Refine into workflow card before hub implementation |
| Forms | Fieldsets, labels, inputs, textareas, choice pills | Reuse |
| Assumptions preview | Assumption panel and `dl` grid | Reuse mandatory |
| Run action | Primary button + validation errors | Reuse |
| Result hero | Result preview + recommendation | Reuse |
| Metric/result cards | MetricCard + three-column grid | Reuse with objective-specific labels |
| Insight lists | Platform/audience/risks/evidence lists | Reuse |
| Executive summary | Export summary preview | Reuse with refinement |
| Export review | Readiness card + format cards | Reuse |
| Empty/loading/error states | CSS patterns and not-found/error state | Refine before async/history/reports |
| Dialogs | Not present | Future candidate only |
| Breadcrumbs | Not present | Future candidate before deep IA implementation |

## Reuse matrix by workflow

| Workflow | Shell/Nav | Workflow card | Form inputs | Assumptions preview | Result cards | Dashboard panels | Executive summary | Export review | Safety labels | Extension needed |
|---|---|---|---|---|---|---|---|---|---|---|
| Product Launch | Existing | Existing objective cards | Existing launch form | Existing | Existing | Existing | Existing | Existing | Existing | None |
| Campaign Message Test | Reuse | Refine | Reuse with message fields | Reuse | Reuse message-quality cards | Reuse | Reuse | Reuse | Reuse | Message rubric |
| Promotion | Reuse | Refine | Reuse with offer fields | Reuse | Reuse offer/urgency cards | Reuse | Reuse | Reuse | Reuse | Offer constraints |
| Campaign Response | Reuse | Refine | Reuse with response context | Reuse | Reuse diagnosis cards | Reuse | Reuse | Reuse | Reuse | Response signal caveats |
| Brand Awareness | Reuse | Refine | Reuse with awareness/trust fields | Reuse | Reuse awareness cards | Reuse | Reuse | Reuse | Reuse | Awareness/trust card taxonomy |
| Product Feedback | Reuse | Refine | Reuse with feedback prompt | Reuse | Extend qualitative cards | Extend theme panels | Reuse | Reuse | Reuse | Qualitative theme grouping |
| Retention | Reuse | Refine | Reuse with lifecycle/offer fields | Reuse | Reuse retention cards | Reuse | Reuse | Reuse | Reuse | Lifecycle fields |
| Re-engagement | Reuse | Refine | Reuse with dormancy/sensitivity fields | Reuse | Reuse reactivation cards | Reuse | Reuse | Reuse | Reuse | Sensitivity/fatigue rules |
| Research Campaign | Reuse | Refine | Reuse with research question fields | Reuse | Extend evidence-quality cards | Extend research panels | Reuse | Reuse | Reuse | Research evidence taxonomy |
| A/B Message Comparison | Reuse | Refine | Extend variant inputs | Reuse with variant parity | Extend comparison cards | Extend comparison matrix | Reuse with comparison summary | Reuse | Reuse | Variant parity + matrix |

## Cross-workflow reuse rules

1. Reuse shell, safety labels, cards, forms, assumptions preview, result hero, executive summary, and export review for every workflow.
2. Extend only the fields/cards needed by the workflow objective.
3. Do not create one-off dashboard components unless at least two workflows cannot share the existing pattern.
4. Keep recommendations in the same position and tone across workflows.
5. Keep limitations/evidence gaps visible in dashboard and export review.
6. Do not create a workflow-specific export mechanism before real export is approved.

## Component reuse by product area

| Area | Components to reuse | Notes |
|---|---|---|
| Campaigns | Workflow cards, status badges, forms, assumptions previews | Primary workflow hub. |
| Templates | Cards, badges, empty states | Templates are starting points, not runs. |
| History | Empty states, run cards, report cards | Requires future persistence. |
| Reports | Executive summary, export review, report cards | Current export preview becomes report pattern. |
| Settings | Forms, status banners | No credentials/live settings until approved. |
| Health | Objective/status cards, safety badges | Existing route. |

## Reuse economics

| Reuse decision | Future workflow cost impact |
|---|---|
| Shared shell/nav pattern | Avoids route sprawl and per-workflow navigation design. |
| Shared form + assumptions preview | Reduces input/review design cost. |
| Shared result hero + recommendation | Keeps executive decision pattern consistent. |
| Shared dashboard panel hierarchy | Reduces card/report redesign. |
| Shared export review | Avoids unsafe export shortcuts. |
| Shared safety labels | Keeps safety posture consistent. |

## Success criteria

Component reuse strategy is approved if:

- every future workflow maps to reusable components;
- extension needs are explicit;
- no implementation is introduced;
- A/B, feedback, and research extensions are visible before implementation;
- Campaign Message Test can be planned as a configuration of existing patterns.
