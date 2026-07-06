# Campaign Workspace Journey

Status: M9 Campaign Workspace Foundation complete and merged.
Scope: Documentation-only journey integration for the Campaign Workspace. This document does not implement Creative Comparison, additional workflows, frontend routes, backend behavior, runtime functionality, persistence, live APIs, or SocialSense changes.

## Purpose

Campaign Workspace Journey maps the approved workflows into a campaign-centric workspace so users understand each workflow as a tool used at the right stage.

## Workspace journey map

```text
Campaign Workspace
→ Campaign Definition using Product Launch
→ Message readiness using Campaign Message Test
→ Variant comparison using A/B Experiment
→ Executive Decision
→ Export / Handoff
```

## Workflow integration

| Workflow | Workspace entry | Outputs | Handoff | Next stage |
|---|---|---|---|---|
| Product Launch | Workspace has idea, campaign objective, audience, offer, or initial assumptions. | Campaign definition, assumptions, limitations, evidence gaps, recommended next action. | Campaign context becomes the workspace baseline. | Campaign Message Test. |
| Campaign Message Test | Workspace has campaign definition and candidate message. | Message clarity, tone fit, claim readiness, platform fit, caveats, executive summary. | Message-readiness output updates Evidence and Recommendations. | A/B Experiment or revise Campaign Definition. |
| A/B Experiment | Workspace has two variants with shared criteria and safety constraints. | Variant decision frame, parity check, shared criteria, differentiators, low confidence, blocked actions. | Comparison output updates Decision status and evidence gaps. | Executive Decision or additional approved evidence stage. |

## Stage state rules

| Stage state | Meaning | Workspace behavior |
|---|---|---|
| Not started | Entry criteria not met. | Show missing inputs and safe starting recommendation. |
| Ready | Entry criteria met. | Offer the approved workflow as the current-stage tool. |
| In review | Output exists and awaits human decision. | Surface evidence, caveats, and decision options. |
| Complete | Exit criteria met. | Add output to evidence/history and recommend next stage. |
| Needs revision | Output has material gaps. | Recommend revising current or prior stage. |
| Blocked | Safety or evidence issue prevents progression. | Show blocked actions and required review. |

## Handoff artifacts

| Artifact | From | To | Required preservation |
|---|---|---|---|
| Campaign definition | Product Launch | Campaign Message Test | Objective, audience, offer, assumptions, evidence gaps. |
| Message-readiness summary | Campaign Message Test | A/B Experiment | Candidate message, caveats, claim readiness, platform fit. |
| Comparison frame | A/B Experiment | Executive Decision | Shared criteria, parity check, no-winner status, confidence, blocked actions. |
| Executive summary | All workflows | Reports / Exports | Decision narrative, assumptions, uncertainty, safety labels. |

## Recommendation handoff rules

- A recommendation must name the next stage or explain why progression is blocked.
- A recommendation must carry evidence quality and confidence.
- A comparison recommendation must not claim a production winner.
- Export / Handoff is available only when executive decision context is clear.

## Related M9 documents

- [Campaign Workspace Analysis](CAMPAIGN_WORKSPACE_ANALYSIS.md)
- [Campaign Workspace Model](CAMPAIGN_WORKSPACE_MODEL.md)
- [Campaign Workspace Navigation](CAMPAIGN_WORKSPACE_NAVIGATION.md)
- [Campaign Workspace Dashboard](CAMPAIGN_WORKSPACE_DASHBOARD.md)
- [Campaign Workspace Journey](CAMPAIGN_WORKSPACE_JOURNEY.md)
- [Campaign Executive Workspace](CAMPAIGN_EXECUTIVE_WORKSPACE.md)
- [Campaign Workspace Placement](CAMPAIGN_WORKSPACE_PLACEMENT.md)

## Architecture Gate assessment

No Architecture Gate is triggered. Journey integration composes approved workflows and does not require redesign.
