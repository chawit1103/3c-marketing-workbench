# Campaign Workspace Dashboard

Status: M9 Campaign Workspace Foundation in progress.
Scope: Documentation-only dashboard design for a future Campaign Workspace. This document does not implement Creative Comparison, additional workflows, frontend routes, backend behavior, runtime functionality, persistence, live APIs, or SocialSense changes.

## Dashboard purpose

The Campaign Workspace Dashboard should answer six questions without requiring the user to open individual workflows first:

1. Where am I?
2. What have I completed?
3. What should I do next?
4. What evidence do I have?
5. What reports are available?
6. What risks remain?

## Dashboard sections

| Section | Primary question | Content | Reused foundation |
|---|---|---|---|
| Workspace status | Where am I? | Campaign name, current stage, journey status, decision status. | Marketing Journey Framework |
| Completed work | What have I completed? | Completed stages, run summaries, reviewed artifacts. | Product Launch, Campaign Message Test, A/B Experiment outputs |
| Next recommended action | What should I do next? | Stage-aware recommendation, entry/exit criteria, blocked actions. | Workflow Pattern recommended next action |
| Evidence summary | What evidence do I have? | Assumptions, limitations, confidence, evidence gaps, source mode. | Existing dashboard / executive summary pattern |
| Reports and exports | What reports are available? | Executive summaries, export readiness, supported formats. | Export Review |
| Risk register | What risks remain? | Safety flags, uncertainty, open evidence gaps, unsupported claims. | Safety labels and Research Review rules |

## Dashboard decision hierarchy

1. Current campaign and stage.
2. Decision status.
3. Recommended next action.
4. Evidence quality and confidence.
5. Completed runs and artifacts.
6. Risks, blocked actions, and caveats.
7. Reports / exports.

## Evidence display requirements

Every dashboard evidence area should preserve:

- source / review mode;
- assumptions;
- limitations;
- evidence gaps;
- confidence level;
- safety labels;
- blocked actions;
- human review requirement.

## Dashboard non-goals

M9 does not build this dashboard. It does not add UI components, routes, state, persistence, APIs, exports, backend behavior, or SocialSense runtime behavior.

## Future dashboard acceptance criteria

A future implementation should pass only if:

- user can identify current campaign and current stage in one glance;
- completed workflows are summarized without raw payload leakage;
- next recommended action is stage-aware and bounded by evidence;
- reports and exports are visible without implying unavailable formats;
- risks and uncertainty are visible before handoff;
- no Creative Comparison or future workflow appears as implemented before its own milestone.

## Related M9 documents

- [Campaign Workspace Analysis](CAMPAIGN_WORKSPACE_ANALYSIS.md)
- [Campaign Workspace Model](CAMPAIGN_WORKSPACE_MODEL.md)
- [Campaign Workspace Navigation](CAMPAIGN_WORKSPACE_NAVIGATION.md)
- [Campaign Workspace Dashboard](CAMPAIGN_WORKSPACE_DASHBOARD.md)
- [Campaign Workspace Journey](CAMPAIGN_WORKSPACE_JOURNEY.md)
- [Campaign Executive Workspace](CAMPAIGN_EXECUTIVE_WORKSPACE.md)
- [Campaign Workspace Placement](CAMPAIGN_WORKSPACE_PLACEMENT.md)

## Architecture Gate assessment

No Architecture Gate is triggered. Dashboard design reuses approved dashboard, executive summary, export review, and safety patterns.
