# M4 Information Architecture

Status: Drafted for M4 — Information Architecture & Design System Review.

Scope: documentation-only product-structure design. No Campaign Message Test, A/B Message Comparison, Promotion workflow, frontend workflow, backend functionality, runtime behavior, SocialSense change, or production campaign capability is implemented.

## Purpose

3C Marketing Workbench must remain understandable when it grows from one Product Launch workflow to 20+ workflows. Information Architecture defines the long-term product structure before additional workflows are added.

## Architecture Gate assessment

Architecture Gate: **not triggered**.

The proposed IA does not require breaking changes to Product Launch or the approved workflow pattern. Product Launch can remain in the current `/workbench`, `/runs/:runId`, and `/exports/:runId` model while future navigation is planned.

## Long-term product areas

| Area | Purpose | Status | Notes |
|---|---|---|---|
| Home | Executive orientation, product value, safe starting point. | Existing | Should stay simple and explain current capabilities. |
| Campaigns | Primary workflow hub for marketing campaign workflows. | Future IA | Product Launch and future campaign workflows belong here. |
| Templates | Reusable starting points for campaign types, audiences, objectives, and report structures. | Future IA | No template implementation in M4. |
| History | Prior runs/reviews when persistence exists. | Future IA | Not available until backend/persistence is approved. |
| Reports | Executive summaries and export-readiness artifacts. | Future IA | Current export review is preview-only. |
| Settings | Product preferences and safe configuration. | Future IA | No auth/admin settings until separately approved. |
| Health | Product status, safety posture, roadmap, readiness. | Existing | May remain operational/admin-facing. |
| Future Domains | Other consumer/domain areas if approved. | Future IA | Corporate Comms, Healthcare, Education, Consumer Research require gates. |

## Recommended top-level navigation

```text
Home
Campaigns
Templates
History
Reports
Health
Settings
```

Current implementation can remain smaller:

```text
Home
Workbench
Dashboard
Export Review
Health
```

M4 approves the future IA, not an immediate navigation implementation.

## Where future workflows belong

| Workflow | Future IA area | Group | Notes |
|---|---|---|---|
| Product Launch | Campaigns | Launch | Current reference workflow. |
| Campaign Message Test | Campaigns | Campaigns / Message testing | Planning only after M4 GO. |
| Promotion | Campaigns | Campaigns / Offer & response | Reuse Campaign Domain. |
| Campaign Response | Campaigns | Campaigns / Offer & response | Response diagnosis, not live analytics by default. |
| Brand Awareness | Campaigns | Campaigns / Awareness | Awareness/trust/reach framing. |
| Retention | Campaigns | Campaigns / Lifecycle | Lifecycle extensions required. |
| Re-engagement | Campaigns | Campaigns / Lifecycle | Sensitivity and fatigue constraints required. |
| Product Feedback | Campaigns | Research / Feedback | Needs qualitative taxonomy extension. |
| Research Campaign | Campaigns | Research / Evidence gathering | Research quality emphasis. |
| A/B Message Comparison | Campaigns | Comparison / Message variants | Needs comparison extension; not optimization. |

## Area behavior standards

### Home

- Explain what 3C is for in executive language.
- Show safe current capability.
- Provide one clear primary action.
- Avoid listing 20 workflows directly on the home page.

### Campaigns

- Primary place to browse, start, and understand campaign workflows.
- Should support grouping/filtering before workflow count exceeds 8–10.
- Should show workflow cards with objective, evidence mode, safety status, and readiness.

### Templates

- Stores reusable starting assumptions and approved patterns.
- Should not become a workflow execution area.
- Must show whether a template is sample, reviewed, or organization-approved.

### History

- Future persistence-backed area for prior runs and decisions.
- Not available in current frontend-only scope.
- Must distinguish assumptions, generated evidence, limitations, and human decisions.

### Reports

- Executive report and export-readiness hub.
- Current export route is preview-only.
- Future real export/download requires separate implementation and safety gate.

### Settings

- Future preferences, guardrails, product configuration, and integrations.
- Not an admin/backend area until separately approved.
- No credentials or live API settings in current scope.

## Scalability rules for 20+ workflows

1. Do not add a top-level nav item for every workflow.
2. Group workflows by business intent: Campaigns, Research, Comparison, Lifecycle.
3. Keep one workflow detail pattern: overview, inputs, review, run, results, export review, next action.
4. Provide filters and templates before adding more visible routes.
5. Keep Health/Settings separate from operator workflow discovery.
6. Show workflow readiness: Available, Planning, Needs Extension, Future.
7. Do not expose SocialSense or implementation terminology in primary IA labels.

## Approved IA decision

M4 should approve one consistent model: **Research and Comparison are workflow groups inside the Campaigns hub, not top-level primary navigation areas yet**. They may be promoted later only if usage volume and a future IA review justify it.

```text
Home
Campaigns
  Launch
    Product Launch
  Message Testing
    Campaign Message Test
  Awareness
    Brand Awareness
  Offer & Response
    Promotion
    Campaign Response
  Lifecycle
    Retention
    Re-engagement
  Research
    Feedback
    Research Campaign
  Comparison
    A/B Message Comparison
Templates
History
Reports
Health
Settings
```

Implementation note: The future IA can be realized progressively. M4 does not require changing routes now.

## Success criteria

Information Architecture is approved if:

- all future workflows have a home;
- product remains understandable at 20+ workflows;
- Product Launch remains compatible;
- Campaign Domain and Workflow Pattern are preserved;
- no new implementation or backend is introduced;
- no Architecture Gate is triggered.
