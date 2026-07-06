# Campaign Workspace Model

Status: M9 Campaign Workspace Foundation in progress.
Scope: Documentation-only data model for the Campaign Workspace. This document does not implement Creative Comparison, additional workflows, frontend routes, backend behavior, runtime functionality, persistence, database schema, live APIs, or SocialSense changes.

## Core model

| Object | Definition | Required fields | Notes |
|---|---|---|---|
| Workspace | Product container for one campaign's journey and artifacts. | id, name, campaign, journey, status, evidence, recommendations | Concept only in M9. |
| Campaign | Shared business object for all workspace activity. | objective, audience, message, offer, platform assumptions, safety constraints | Reuses Campaign Domain. |
| Journey | Ordered decision path for the campaign. | stages, current stage, completed stages, next recommended stage | Reuses M8 Marketing Journey. |
| Stage | A decision point in the journey. | name, entry criteria, exit criteria, workflow options, decision status | Uses canonical journey stages. |
| Run | A workflow execution/review output. | workflow type, run id, assumptions, result summary, confidence, evidence gaps | Existing generated offline fixtures are current examples. |
| Artifact | Any reviewed output from a run or stage. | type, source, status, safety labels, limitations, export readiness | Includes dashboard, report, export preview, summary. |
| Decision | Human-reviewed choice at a stage. | decision, rationale, confidence, reviewer, date, blocked actions | Future concept only; no persistence in M9. |
| Recommendation | Stage-aware next action. | recommendation, target stage, confidence, caveats, blocked actions | Must remain bounded by evidence quality. |
| History | Timeline of runs, artifacts, decisions, and revisions. | event type, timestamp, actor, source artifact, summary | Future concept only. |

## Canonical workspace status

| Status | Meaning | Allowed next action |
|---|---|---|
| Draft | Campaign idea exists but definition is incomplete. | Complete Campaign Definition. |
| In review | A stage output is ready for human review. | Review output, revise, or proceed. |
| Evidence needed | Current evidence is insufficient for decision. | Run or plan approved evidence-gathering stage. |
| Decision ready | Evidence package is complete enough for executive decision. | Executive Decision. |
| Handoff ready | Export / Handoff package is reviewed and caveats are visible. | Internal handoff. |
| On hold | Safety, evidence, or business context blocks progress. | Stop, revise, or request more information. |

## Canonical stage taxonomy

```text
Idea
→ Campaign Definition
→ Campaign Message Test
→ A/B Experiment
→ Executive Decision
→ Export / Handoff
```

Future workflows may be stage options or sub-stages, but they must not create competing top-level taxonomy without Architecture Gate review.

## Relationships

```text
Workspace owns Campaign
Workspace contains Journey
Journey contains Stages
Stage may use Workflow
Workflow produces Run
Run produces Artifacts
Artifacts support Decisions
Decisions generate Recommendations
History records all significant changes
```

## Non-goals

M9 does not add code objects, storage, backend endpoints, route state, migrations, export formats, workflow orchestration, SocialSense runtime, or Creative Comparison implementation.

## Related M9 documents

- [Campaign Workspace Analysis](CAMPAIGN_WORKSPACE_ANALYSIS.md)
- [Campaign Workspace Model](CAMPAIGN_WORKSPACE_MODEL.md)
- [Campaign Workspace Navigation](CAMPAIGN_WORKSPACE_NAVIGATION.md)
- [Campaign Workspace Dashboard](CAMPAIGN_WORKSPACE_DASHBOARD.md)
- [Campaign Workspace Journey](CAMPAIGN_WORKSPACE_JOURNEY.md)
- [Campaign Executive Workspace](CAMPAIGN_EXECUTIVE_WORKSPACE.md)
- [Campaign Workspace Placement](CAMPAIGN_WORKSPACE_PLACEMENT.md)

## Architecture Gate assessment

No Architecture Gate is triggered. The model is a documentation-only product model layered on approved foundations.
