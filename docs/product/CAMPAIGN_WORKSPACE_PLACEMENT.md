# Campaign Workspace Placement

Status: M9 Campaign Workspace Foundation in progress.
Scope: Documentation-only placement of future workflows inside Campaign Workspace. This document does not implement Creative Comparison, additional workflows, frontend routes, backend behavior, runtime functionality, persistence, live APIs, or SocialSense changes.

## Placement principle

Future workflows should become tools inside a Campaign Workspace. They should not become isolated screens, new primary navigation categories, or reasons to redesign approved foundations.

## Future workflow placement map

| Future workflow | Workspace placement | Journey stage | Required guardrail | Implementation status |
|---|---|---|---|---|
| Creative Comparison | Current-stage tool for creative direction evidence. | After Campaign Message Test or after A/B Experiment, before Executive Decision. | Must reuse Experiment Framework, no-winner framing, safety labels, and evidence quality model. | Not implemented. Recommend only after M9 GO. |
| Headline Comparison | Focused comparison tool attached to message/creative review. | Campaign Message Test or A/B Experiment stage. | Must avoid conversion guarantee and use shared criteria. | Not implemented. |
| Offer Comparison | Offer evidence tool under Campaign Definition or A/B stage. | Campaign Definition or A/B Experiment. | Must preserve non-production and non-guarantee language. | Not implemented. |
| Promotion | Future activation planning tool. | After Executive Decision, before or after Export / Handoff. | Requires separate safety/product review and production-boundary decision. | Not implemented. |
| Research Campaign | Evidence-gap resolution tool. | Before Idea validation or whenever evidence gaps block progress. | Requires source-quality and research-validity review. | Not implemented. |
| Lifecycle | Post-handoff learning and history view. | After Export / Handoff. | Must avoid claiming field learning without approved data sources. | Not implemented. |

## Workspace placement acceptance criteria

Any future workflow must declare before implementation:

- workspace placement;
- journey stage;
- entry criteria;
- exit criteria;
- output artifact;
- evidence and confidence model;
- safety labels;
- blocked actions;
- reports / exports impact;
- handoff target;
- whether it needs Experiment Framework;
- confirmation that SocialSense runtime changes are not required unless separately reviewed.

## Recommendation after M9

Creative Comparison may be recommended only after Campaign Workspace receives GO and post-merge validation passes. M9 does not authorize Creative Comparison implementation by itself.

## Non-goals

M9 does not implement Creative Comparison, Headline Comparison, Offer Comparison, Promotion, Research Campaign, Lifecycle, or any additional workflow.

## Related M9 documents

- [Campaign Workspace Analysis](CAMPAIGN_WORKSPACE_ANALYSIS.md)
- [Campaign Workspace Model](CAMPAIGN_WORKSPACE_MODEL.md)
- [Campaign Workspace Navigation](CAMPAIGN_WORKSPACE_NAVIGATION.md)
- [Campaign Workspace Dashboard](CAMPAIGN_WORKSPACE_DASHBOARD.md)
- [Campaign Workspace Journey](CAMPAIGN_WORKSPACE_JOURNEY.md)
- [Campaign Executive Workspace](CAMPAIGN_EXECUTIVE_WORKSPACE.md)
- [Campaign Workspace Placement](CAMPAIGN_WORKSPACE_PLACEMENT.md)

## Architecture Gate assessment

No Architecture Gate is triggered. Future workflow placement fits inside Campaign Workspace without redesign.
