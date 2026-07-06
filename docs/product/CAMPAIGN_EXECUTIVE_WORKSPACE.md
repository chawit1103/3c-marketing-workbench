# Campaign Executive Workspace

Status: M9 Campaign Workspace Foundation complete and merged.
Scope: Documentation-only executive workspace design. This document does not implement Creative Comparison, additional workflows, frontend routes, backend behavior, runtime functionality, persistence, live APIs, or SocialSense changes.

## Executive goal

An executive should understand campaign status, decision status, evidence quality, confidence, risks, and recommended next action without opening individual workflows.

## Executive first screen

| Priority | Executive question | Workspace answer |
|---|---|---|
| 1 | What campaign is this? | Campaign name, objective, audience, offer, platform assumptions. |
| 2 | Where are we? | Current journey stage and completed stages. |
| 3 | What decision is needed? | Decision status and recommended next action. |
| 4 | What evidence exists? | Evidence summary across Product Launch, Campaign Message Test, and A/B Experiment. |
| 5 | How confident are we? | Confidence level, evidence quality, source/review mode. |
| 6 | What risks remain? | Open evidence gaps, limitations, safety flags, blocked actions. |
| 7 | What can be handed off? | Reports and export readiness in approved formats. |

## Executive status model

| Status | Meaning | Executive action |
|---|---|---|
| Draft | Campaign setup is incomplete. | Ask team to finish Campaign Definition. |
| Review needed | A workflow output is ready for human review. | Review assumptions, caveats, and next action. |
| Evidence needed | Current evidence is insufficient. | Approve bounded evidence-gathering or request revision. |
| Decision ready | Evidence package is coherent enough for executive decision. | Approve, revise, hold, or request more evidence. |
| Handoff ready | Export / Handoff package is reviewed and safe. | Share internally with caveats. |
| Hold | Safety or evidence concerns block progression. | Stop, revise, or escalate. |

## Evidence quality display

Executive workspace should summarize:

- completed stages;
- available reports;
- evidence gaps;
- limitations;
- confidence level;
- source / review mode;
- blocked actions;
- human review notes.

## Recommended next action rules

A recommendation is executive-ready only if it states:

- the proposed next stage;
- decision rationale;
- confidence and uncertainty;
- risks and blocked actions;
- whether export/handoff is allowed;
- whether more evidence is needed.

## Executive non-goals

M9 does not create executive UI, dashboards, report packages, exports, approval flows, persistence, backend, or runtime behavior.

## Related M9 documents

- [Campaign Workspace Analysis](CAMPAIGN_WORKSPACE_ANALYSIS.md)
- [Campaign Workspace Model](CAMPAIGN_WORKSPACE_MODEL.md)
- [Campaign Workspace Navigation](CAMPAIGN_WORKSPACE_NAVIGATION.md)
- [Campaign Workspace Dashboard](CAMPAIGN_WORKSPACE_DASHBOARD.md)
- [Campaign Workspace Journey](CAMPAIGN_WORKSPACE_JOURNEY.md)
- [Campaign Executive Workspace](CAMPAIGN_EXECUTIVE_WORKSPACE.md)
- [Campaign Workspace Placement](CAMPAIGN_WORKSPACE_PLACEMENT.md)

## Architecture Gate assessment

No Architecture Gate is triggered. Executive workspace design reuses approved executive summary, dashboard, evidence, and safety patterns.
