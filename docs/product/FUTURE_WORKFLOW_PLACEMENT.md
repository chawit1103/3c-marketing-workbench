# Future Workflow Placement

Status: M8 Marketing Journey Framework complete and merged.
Scope: Documentation-only placement of future workflows inside the Marketing Journey. This document does not implement Creative Comparison, additional workflows, frontend routes, backend behavior, runtime functionality, live APIs, or SocialSense changes.

## Placement principle

Future workflows should become stages or stage options inside the Marketing Journey. They should not be isolated features, new primary navigation areas, or reasons to redesign the Experiment Framework, Workflow Pattern, Campaign Domain, Information Architecture, Navigation Model, Design System, or SocialSense runtime.

## Future workflow placement map

| Future workflow | Journey placement | Relationship to approved foundations | Implementation status |
|---|---|---|---|
| Creative Comparison | After Campaign Message Test or after A/B Experiment, before Executive Decision | Experiment Framework stage for creative direction comparison. Must reuse no-winner / low-confidence / blocked-action pattern. | Not implemented. Recommend only after M8 GO. |
| Headline Comparison | After Campaign Message Test, before A/B Experiment or as a focused Experiment stage | Experiment Framework configuration with shared criteria and parity disclosure. | Not implemented. |
| CTA Comparison | After Campaign Message Test or after Headline Comparison | Experiment Framework configuration focused on action clarity, not conversion guarantee. | Not implemented. |
| Offer Comparison | Campaign Definition or A/B Experiment stage | Campaign Domain extension for offer framing; must avoid conversion guarantee. | Not implemented. |
| Promotion | After Executive Decision, before Export / Handoff or future activation planning | Requires separate safety/product review; not an Experiment by default. | Not implemented. |
| Research Campaign | Before Idea validation or after evidence gaps emerge | Research follow-up stage for evidence quality and source planning. | Not implemented. |
| Brand Awareness Review | Campaign Definition or Executive Decision support stage | Campaign Domain workflow; may reuse dashboard/export pattern. | Not implemented. |
| Product Feedback | Research follow-up or post-handoff learning stage | Needs research validity and data-source governance before implementation. | Not implemented. |

## Recommended sequencing after M8

1. Creative Comparison planning / implementation gate only if M8 receives GO.
2. Headline / CTA / Offer comparisons should wait until Creative Comparison validates journey-stage reuse.
3. Promotion should remain blocked until product, safety, and production-boundary reviews are explicit.
4. Research Campaign should be considered when evidence gaps require a structured source-quality stage.

## Placement acceptance criteria for any future workflow

A future workflow may proceed only if it declares:

- Journey stage;
- entry criteria;
- exit criteria;
- workflow pattern reuse;
- campaign domain reuse;
- experiment framework reuse if comparison-based;
- dashboard/export reuse;
- safety labels;
- evidence and confidence model;
- blocked actions;
- next recommended stage;
- no SocialSense runtime change unless a separate dependency review explicitly approves it.

## Non-goals

M8 does not implement Creative Comparison, Headline Comparison, CTA Comparison, Offer Comparison, Promotion, Research Campaign, or any additional workflow.

## Related M8 documents

- [Marketing Journey Analysis](MARKETING_JOURNEY_ANALYSIS.md)
- [Marketing Journey Model](MARKETING_JOURNEY_MODEL.md)
- [Journey Workflow Mapping](JOURNEY_WORKFLOW_MAPPING.md)
- [Workspace Model](WORKSPACE_MODEL.md)
- [Executive Journey](EXECUTIVE_JOURNEY.md)
- [Future Workflow Placement](FUTURE_WORKFLOW_PLACEMENT.md)

## Architecture Gate assessment

No Architecture Gate is triggered. Future workflow placement is compatible with the approved product foundations.
