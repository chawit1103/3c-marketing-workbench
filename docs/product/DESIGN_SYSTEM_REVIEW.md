# M4 Design System Review

Status: Drafted for M4 — Information Architecture & Design System Review.

Scope: component inventory and standards review only. No visual redesign, CSS change, component implementation, workflow implementation, backend, runtime, or SocialSense change is introduced.

## Purpose

Design System Review inventories the current UI foundation and decides which components are reusable, need refinement, need replacement, or are missing standards before additional workflows are added.

## Current component inventory

Evidence basis: current React views, shell, product components, and `src/styles.css`.

| Component / pattern | Current evidence | Classification | Notes |
|---|---|---|---|
| App shell | `AppShell`, sticky header, brand, main nav | Reusable with refinement | Needs future IA labels once implemented. |
| Primary navigation | Home, Workbench, Dashboard, Export review, Health | Needs refinement | Current nav works for one workflow; future IA requires grouped Campaigns/Reports. |
| Safety labels | `SafetyLabels`, global badges | Reusable | Must stay visible across workflows. |
| Buttons | `.button`, primary/secondary | Reusable | Needs disabled/loading standard before async workflows. |
| Cards | `.card`, `.card-accent`, objective/result cards | Reusable | Strong base for workflow cards and dashboard panels. |
| Forms | fieldsets, labels, inputs, textareas, choice pills | Reusable with refinement | Needs future validation summary and variant field standards. |
| Result cards | `MetricCard`, fixture cards | Reusable with refinement | Must support objective-specific cards without raw payload leakage. |
| Dashboard panels | result hero, assumptions, insight lists, decision support | Reusable | Lower-density M2.3 improvements should remain standard. |
| Executive Summary | export preview summary card | Reusable with refinement | Needs consistent executive hierarchy across reports. |
| Export Review | readiness card + format cards + evidence/limitations | Reusable | Preview-only until real export gate. |
| Safety/status banners | safety panel, badges, error state | Reusable | Add formal status-color rules. |
| Empty states | `.empty-state`, not-found route | Needs refinement | Future History/Reports need domain-specific empty states. |
| Loading states | `.loading-state` CSS exists | Needs refinement | No async workflow yet; define copy and skeleton rules. |
| Dialogs | None | Candidate future component | Do not implement in M4; future confirmations may need modal/drawer rules. |
| Breadcrumbs | None | Candidate future component | Needed when IA grows. |
| Workflow cards | ObjectiveCard partially covers this | Needs refinement | Future Campaigns hub needs status/objective/evidence fields. |
| Report cards | Export format cards partially cover this | Needs refinement | Future Reports hub needs report metadata and safety status. |

## Component decisions

| Component | Decision | Rationale |
|---|---|---|
| Buttons | Reuse | Current primary/secondary styles are adequate. |
| Cards | Reuse | Card hierarchy supports executive dashboards. |
| Forms | Reuse with refinement | Need standards for multi-variant and qualitative workflows. |
| Result Cards | Reuse with refinement | Need objective-specific card taxonomy. |
| Dashboard Panels | Reuse | Current assumptions/evidence/limitations pattern is sound. |
| Executive Summary | Reuse with refinement | Needs standard heading, caveat, and next-action order. |
| Export Review | Reuse | Keep preview-only until real export approved. |
| Safety Labels | Reuse | Mandatory and proven. |
| Status Banners | Reuse with refinement | Define readiness statuses consistently. |
| Empty States | Refine | Future History/Reports will rely on them. |
| Loading States | Refine | Required before async/non-fixture workflows. |
| Dialogs | Future candidate | Not needed until destructive/export/approval actions exist. |

## Reusable component standards

### Buttons

- Primary button: one per major decision region.
- Secondary button: navigation or review action.
- Disabled/loading states must explain why action is unavailable.
- Do not use buttons for unavailable future workflows; use status cards.

### Cards

- Use cards for workflow cards, dashboard panels, report previews, evidence sections.
- Use accent cards only for page hero/primary status.
- Avoid dense multi-purpose cards.

### Forms

- Use fieldsets and legends for grouped inputs.
- Keep one primary objective per workflow run.
- Show assumptions preview before run.
- Keep validation errors human-readable.

### Dashboard panels

- Prioritize: headline, recommendation, assumptions, evidence, limitations, next action.
- Keep lower panels scannable.
- Do not show raw platform/runtime payloads as primary UI.

### Executive summary

- Must answer: what was reviewed, what it suggests, what is uncertain, what to do next.
- Must not imply predictive certainty or production readiness.

### Export review

- Must remain review/preview language unless real export exists.
- Must include evidence gaps and limitations.

## Replacement candidates

No current component requires replacement before adding future workflows. The risks are missing standards, not broken components.

## Refinement backlog

| Need | Trigger | Priority |
|---|---|---|
| Breadcrumb component | More than one workflow group implemented | Medium |
| Workflow card component | Campaigns hub implementation | High before 3+ workflows |
| Loading/skeleton standard | Async/non-fixture workflow implementation | High before runtime changes |
| Empty state variants | History/Reports/Templates implementation | Medium |
| Comparison matrix component | A/B planning/implementation | High before A/B |
| Qualitative theme panel | Product Feedback planning/implementation | Medium |
| Dialog/drawer standard | Export/download/approval actions | Medium |

## Success criteria

Design System Review is approved if:

- current components are inventoried;
- reusable/refine/future classifications are explicit;
- missing future components are documented;
- no visual redesign or implementation is introduced;
- future workflow cost is reduced through reuse standards.
