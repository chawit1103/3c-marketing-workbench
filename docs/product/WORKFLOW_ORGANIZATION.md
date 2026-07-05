# M4 Workflow Organization

Status: Drafted for M4 — Information Architecture & Design System Review.

Scope: workflow grouping only. No new workflows, routes, UI, backend, runtime, or SocialSense changes are implemented.

## Purpose

Workflow Organization defines how 3C Marketing Workbench groups many workflows so operators do not face a flat list of 20+ options.

## Organization principles

1. Group by operator intent, not implementation module.
2. Product Launch remains the reference workflow.
3. Campaign Domain remains the shared business model.
4. Workflows can be Available, Planning, Needs Extension, Future, or Requires Gate.
5. A/B and feedback/research complexity should be extension groups, not the default entry point.
6. Sensitive future consumers/domains should remain visibly gated.

## Approved grouping model

Research and Comparison are **secondary workflow groups inside the Campaigns hub** for M4. They are documented separately so operators can understand their intent, but they are not approved as top-level primary navigation areas yet.

```text
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
      Product Feedback
    Research Campaign
  Comparison
    A/B Message Comparison

Reports
  Executive Summaries
  Export Reviews

Templates
  Campaign Templates
  Audience Templates
  Report Templates
```

## Workflow placement

| Workflow | Group | Status | Reuse strategy |
|---|---|---|---|
| Product Launch | Campaigns → Launch | Available | Reference workflow and reusable pattern. |
| Campaign Message Test | Campaigns → Message Testing | Planning only | Reuse Campaign Domain and Product Launch pattern. |
| Brand Awareness | Campaigns → Awareness | Future planning | Reuse Campaign Domain with awareness/trust cards. |
| Promotion | Campaigns → Offer & Response | Future planning | Reuse Campaign Domain with offer fields. |
| Campaign Response | Campaigns → Offer & Response | Future planning | Reuse Campaign Domain with response diagnosis fields. |
| Retention | Campaigns → Lifecycle | Future planning | Reuse lifecycle fields and sensitivity constraints. |
| Re-engagement | Campaigns → Lifecycle | Future planning | Reuse lifecycle fields and fatigue/sensitivity constraints. |
| Product Feedback | Campaigns → Research → Feedback | Needs extension | Add qualitative taxonomy/theme grouping. |
| Research Campaign | Campaigns → Research | Future planning | Add evidence quality and research-question fields. |
| A/B Message Comparison | Campaigns → Comparison | Needs extension | Add variant parity and comparison matrix. |

## Workflow card standard

Each workflow card should eventually show:

| Field | Purpose |
|---|---|
| Workflow name | Human-readable task. |
| Group | Campaigns, Campaigns → Research, Campaigns → Comparison, Reports, Templates, etc. |
| Status | Available / Planning / Needs Extension / Future / Requires Gate. |
| Primary objective | Why the workflow exists. |
| Evidence mode | Offline fixture / planning / future approved evidence. |
| Safety note | Key boundary. |
| Next action | Open, plan, or review requirements. |

## Group-level behavior

### Campaigns

Campaigns is the default home for marketing workflows. It should contain launch, message, awareness, offer/response, and lifecycle workflows.

### Campaigns → Research

Research is a secondary workflow group inside Campaigns. It contains workflows whose main output is learning: feedback themes, evidence quality, research questions, and perception study design.

### Campaigns → Comparison

Comparison is a secondary workflow group inside Campaigns. It contains workflows that evaluate alternatives. It must include parity rules and avoid winner/optimization overclaims.

### Reports

Reports contains executive summaries and export-readiness artifacts. It should not start workflows by default.

### Templates

Templates contain reusable starting points, not run history or reports.

## Avoided anti-patterns

- Do not show every workflow in top navigation.
- Do not create a new route hierarchy for every workflow before reuse is proven.
- Do not mix reports, workflow setup, and templates in the same area.
- Do not treat A/B comparison as the default workflow model.
- Do not imply future workflows are implemented before authorization.

## Success criteria

Workflow Organization is approved if:

- every current/future workflow has a group;
- grouping supports 20+ workflows;
- Product Launch remains available/reference;
- Campaign Message Test remains planning-only;
- A/B and Product Feedback extension needs are clear;
- no implementation changes are required.
