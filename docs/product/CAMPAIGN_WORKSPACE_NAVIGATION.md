# Campaign Workspace Navigation

Status: M9 Campaign Workspace Foundation in progress.
Scope: Documentation-only navigation model for a future Campaign Workspace. This document does not implement Creative Comparison, additional workflows, frontend routes, backend behavior, runtime functionality, persistence, live APIs, or SocialSense changes.

## Navigation principle

Navigation should help users orient around a campaign workspace, not around isolated workflow screens.

The future navigation mental model is:

```text
Workspace Home
→ Campaign Overview
→ Journey Timeline
→ Current Stage
→ Recent Runs
→ Reports
→ Exports
→ History
→ Templates
```

M9 defines this model only. It does not add routes or change primary navigation.

## Workspace navigation areas

| Area | User question | Content | Implementation status |
|---|---|---|---|
| Workspace home | Which campaign am I working on? | Campaign name, status, current stage, next action, key risks. | Future concept only. |
| Campaign overview | What is the campaign? | Objective, audience, message, offer, platform mix, assumptions. | Future concept only; reuses Campaign Domain. |
| Journey timeline | Where am I in the journey? | Idea, Campaign Definition, Campaign Message Test, A/B Experiment, Executive Decision, Export / Handoff. | Future concept only; reuses M8 taxonomy. |
| Current stage | What should I do now? | Entry criteria, current workflow option, evidence gaps, recommended next action. | Future concept only. |
| Recent runs | What has been reviewed? | Product Launch, Campaign Message Test, A/B Experiment runs and summaries. | Future concept only; current fixtures remain separate. |
| Reports | What summaries are available? | Executive summaries, decision narratives, evidence rollups. | Future concept only. |
| Exports | What can be handed off? | Existing export readiness formats and caveats. | Future concept only; no new formats. |
| History | What changed over time? | Decisions, revisions, holds, evidence updates. | Future concept only. |
| Templates | How can I start faster? | Reusable campaign / journey starting points. | Future concept only. |

## Current IA compatibility

M9 does not redesign the approved Information Architecture or Navigation Model. The workspace concept can live under the existing Workbench / Campaigns direction in a future implementation milestone.

## Navigation guardrails

- Do not add new primary navigation in M9.
- Do not add frontend routes in M9.
- Do not create separate top-level areas for every future workflow.
- Future workflows should appear as current-stage tools within a workspace.
- Executive users should reach campaign status without opening individual workflow screens.

## Transition model

| From | To | Transition rule |
|---|---|---|
| Workspace home | Campaign overview | User needs context. |
| Campaign overview | Journey timeline | User wants progress. |
| Journey timeline | Current stage | User wants next action. |
| Current stage | Recent runs | User wants evidence details. |
| Recent runs | Reports / Exports | User wants executive artifact or handoff. |
| Any area | History | User wants decision trace. |
| Any area | Templates | User wants reusable starting points. |

## Related M9 documents

- [Campaign Workspace Analysis](CAMPAIGN_WORKSPACE_ANALYSIS.md)
- [Campaign Workspace Model](CAMPAIGN_WORKSPACE_MODEL.md)
- [Campaign Workspace Navigation](CAMPAIGN_WORKSPACE_NAVIGATION.md)
- [Campaign Workspace Dashboard](CAMPAIGN_WORKSPACE_DASHBOARD.md)
- [Campaign Workspace Journey](CAMPAIGN_WORKSPACE_JOURNEY.md)
- [Campaign Executive Workspace](CAMPAIGN_EXECUTIVE_WORKSPACE.md)
- [Campaign Workspace Placement](CAMPAIGN_WORKSPACE_PLACEMENT.md)

## Architecture Gate assessment

No Architecture Gate is triggered. Workspace navigation is compatible with approved IA and Navigation Model.
