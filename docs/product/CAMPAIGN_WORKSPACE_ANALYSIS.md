# Campaign Workspace Analysis

Status: M9 Campaign Workspace Foundation in progress.
Scope: Documentation-only foundation for a campaign-centric workspace model. This document does not implement Creative Comparison, additional workflows, frontend routes, backend behavior, runtime functionality, persistence, live APIs, or SocialSense changes.

## Purpose

Campaign Workspace reframes the product around the campaign a user is working on. The user mental model should be:

> I am working on a campaign.

not:

> I am opening a workflow.

The workspace becomes the container that organizes campaign context, journey progress, workflow runs, evidence, decisions, reports, exports, history, templates, and recommendations.

## Workspace concept

A Campaign Workspace is a product-owned decision container for one campaign. It composes approved workflows and frameworks without changing their architecture.

```text
Campaign Workspace
├── Campaign
├── Journey
├── Runs
├── Reports
├── Exports
├── History
├── Templates
├── Evidence
└── Recommendations
```

## Workspace elements

| Element | Meaning | Current source |
|---|---|---|
| Campaign | Shared campaign definition: objective, audience, message, offer, platform assumptions. | Campaign Domain, Product Launch |
| Journey | Stage progression from idea to handoff. | Marketing Journey Framework |
| Runs | Outputs from approved workflows. | Product Launch, Campaign Message Test, A/B Experiment generated offline fixtures |
| Reports | Executive summaries and decision narratives. | Existing dashboard / executive summary pattern |
| Exports | Reviewed export readiness in existing formats. | Export Review |
| History | Timeline of decisions, revisions, caveats, and evidence gaps. | Future workspace concept only |
| Templates | Reusable campaign or journey starting points. | Future workspace concept only |
| Evidence | Accumulated assumptions, limitations, confidence, evidence gaps, and source labels. | Existing workflow outputs and M8 evidence model |
| Recommendations | Stage-aware next recommended actions with blocked actions. | Existing Recommended Next Action pattern |

## Product shift

| Workflow-centric product | Workspace-centric product |
|---|---|
| User chooses a workflow first. | User opens a campaign workspace first. |
| Outputs feel isolated. | Outputs accumulate into campaign evidence. |
| Next step depends on screen memory. | Next step is visible from workspace status. |
| Executive context is fragmented. | Executive status summarizes journey, evidence, risks, and recommendations. |
| Future workflows risk route sprawl. | Future workflows become tools inside the workspace. |

## Workspace principles

1. Campaign is the anchor.
2. Journey is the organizing sequence.
3. Workflows are tools inside the workspace.
4. Evidence accumulates across runs.
5. Recommendations are stage-aware and human-reviewed.
6. Executive status is available without opening each workflow.
7. Future workflows must fit workspace placement before implementation.
8. Workspace foundation must not require frontend, backend, runtime, SocialSense, IA, design-system, or Experiment Framework redesign.

## Success criteria alignment

- Workspace model is complete.
- Workspace navigation can be described without implementation.
- Workspace dashboard answers location, completion, next action, evidence, reports, and risks.
- Journey integration maps approved workflows into the workspace.
- Executive workspace provides decision status without workflow drilling.
- Future workflow placement is explicit and blocked until separate authorization.

## Related M9 documents

- [Campaign Workspace Analysis](CAMPAIGN_WORKSPACE_ANALYSIS.md)
- [Campaign Workspace Model](CAMPAIGN_WORKSPACE_MODEL.md)
- [Campaign Workspace Navigation](CAMPAIGN_WORKSPACE_NAVIGATION.md)
- [Campaign Workspace Dashboard](CAMPAIGN_WORKSPACE_DASHBOARD.md)
- [Campaign Workspace Journey](CAMPAIGN_WORKSPACE_JOURNEY.md)
- [Campaign Executive Workspace](CAMPAIGN_EXECUTIVE_WORKSPACE.md)
- [Campaign Workspace Placement](CAMPAIGN_WORKSPACE_PLACEMENT.md)

## Architecture Gate assessment

No Architecture Gate is triggered. Campaign Workspace composes approved foundations and remains documentation-only.
