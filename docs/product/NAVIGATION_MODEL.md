# M4 Navigation Model

Status: Drafted for M4 — Information Architecture & Design System Review.

Scope: navigation design only. No navigation implementation, new routes, backend, workflow implementation, SocialSense changes, or production capability is added.

## Purpose

The Navigation Model defines how operators move through 3C Marketing Workbench as the product grows from Product Launch to many workflows. It keeps current routes compatible while setting standards for primary navigation, secondary navigation, breadcrumbs, context switching, and future domain switching.

## Architecture Gate assessment

Architecture Gate: **not triggered**. The model does not require breaking changes to Product Launch or the approved workflow pattern.

## Primary navigation

Recommended long-term primary navigation:

| Item | Purpose | When visible | Notes |
|---|---|---|---|
| Home | Product orientation and safe start. | Always | Executive entry point. |
| Campaigns | Browse/start campaign workflows. | When >1 workflow exists | Primary future workflow hub. |
| Templates | Reusable starting points. | When templates exist | Not implementation in M4. |
| History | Prior runs/reviews. | When persistence exists | Requires backend/persistence gate. |
| Reports | Executive summaries/export review. | When report hub exists | Current export preview remains route-level. |
| Health | Product status/safety/readiness. | Always or admin/ops | Existing. |
| Settings | Preferences/configuration. | Future only | No credentials/live settings now. |

Current nav may remain:

| Current item | Future mapping |
|---|---|
| Home | Home |
| Workbench | Campaigns → Product Launch |
| Dashboard | History/Reports → Product Launch run dashboard |
| Export review | Reports → Export Review |
| Health | Health |

## Secondary navigation

Secondary navigation should appear inside large areas, not top-level.

### Campaigns secondary nav

```text
All Campaigns
Launch
Message Testing
Awareness
Offer & Response
Lifecycle
```

### Campaigns → Research secondary nav

Research is a secondary group inside the Campaigns hub for M4, not a top-level primary navigation area.

```text
Feedback
Research Campaign
Evidence Quality
```

### Campaigns → Comparison secondary nav

Comparison is a secondary group inside the Campaigns hub for M4, not a top-level primary navigation area.

```text
Message Comparison
Variant Review
Decision Summary
```

### Reports secondary nav

```text
Executive Summaries
Export Reviews
Evidence Gaps
Limitations
```

## Breadcrumb behavior

Breadcrumbs should show hierarchy and current context, not implementation path.

Examples:

| Page | Breadcrumb |
|---|---|
| Product Launch setup | Home → Campaigns → Product Launch |
| Product Launch run dashboard | Home → Campaigns → Product Launch → Run Review |
| Export readiness preview | Home → Reports → Export Review → Product Launch |
| Campaign Message Test planning | Home → Campaigns → Message Testing → Campaign Message Test |
| A/B Message Comparison planning | Home → Campaigns → Comparison → A/B Message Comparison |

Rules:

1. Breadcrumb labels must be business-facing.
2. Do not show raw route params as primary labels.
3. Breadcrumbs must distinguish workflow setup, run review, and report review.
4. Breadcrumbs must not imply a workflow exists before implementation.

## Context switching

Context switching is needed when an operator moves between:

- workflow setup;
- run dashboard;
- export/report review;
- template selection;
- prior run/history;
- future domains.

Approved context labels:

| Context | Label | Purpose |
|---|---|---|
| Workflow | Product Launch / Campaign Message Test / Promotion | What is being reviewed. |
| Evidence mode | Offline fixture / Planning / Future approved evidence | What output is based on. |
| Report context | Executive Summary / Export Review | What artifact is being reviewed. |
| Consumer/domain | 3C Marketing / Future Corporate Comms / Future Healthcare | Which consumer context applies. |

## Future domain switching

Domain switching should not appear until there is more than one approved consumer/domain.

Potential future switcher:

```text
3C Marketing Workbench
Corporate Communication
Healthcare Campaigns
Education Campaigns
Consumer Research
```

Rules:

1. 3C remains default and only active consumer now.
2. Future domain labels must show availability: Current, Planning, Future, Requires Gate.
3. Sensitive domains such as Healthcare and Education require Architecture/Safety Gate before implementation.
4. Domain switching must not expose SocialSense internals.

## Navigation states

| State | Use | Copy rule |
|---|---|---|
| Available | Implemented and usable. | “Available” or “Open”. |
| Planning | Approved for planning docs only. | “Planning only”. |
| Needs extension | Requires design/domain extension. | “Needs extension”. |
| Future | Not approved. | “Future”. |
| Requires gate | Sensitive or architecture-dependent. | “Requires review gate”. |

## Empty, loading, and error navigation rules

| Situation | Required behavior |
|---|---|
| No history exists | Show empty state explaining history requires future persistence. |
| No reports exist | Show export-preview guidance, not a broken page. |
| Workflow not implemented | Show planning/future state, not a dead route. |
| Loading async workflow | Use shared loading state with evidence-mode copy. |
| Route not found | Show safe not-found state and link back to Home/Campaigns. |

## Success criteria

Navigation Model is approved if:

- primary/secondary navigation supports 20+ workflows;
- breadcrumbs and context switching are business-readable;
- future domain switching is gated;
- current Product Launch routes remain compatible;
- no implementation, backend, or SocialSense changes are required.
