# Journey Workflow Mapping

Status: M8 Marketing Journey Framework complete and merged.
Scope: Documentation-only mapping of existing workflows into the Marketing Journey. This document does not implement Creative Comparison, additional workflows, frontend routes, backend behavior, runtime functionality, live APIs, or SocialSense changes.

## Mapping summary

| Existing workflow | Journey stage | Role in journey | Reusable output |
|---|---|---|---|
| Product Launch | Campaign Definition | Turns idea into campaign context, assumptions, and initial evidence gaps. | Product Launch dashboard, executive summary, export review, recommended next action. |
| Campaign Message Test | Campaign Message Test | Validates message clarity, tone, safety, claim readiness, and channel fit for a candidate campaign message. | Message-readiness dashboard, caveats, executive summary, export review. |
| A/B Experiment | A/B Experiment | Compares two variant hypotheses under shared criteria without selecting a production winner. | Comparison dashboard, parity disclosure, shared criteria, low confidence, blocked actions. |

## Product Launch → Campaign Definition

| Mapping item | Definition |
|---|---|
| Inputs | Campaign name/brand, campaign message, audience, offer, context, platform mix, assumptions. |
| Outputs | Campaign context, directional synthetic aggregate result, limitations, evidence gaps, recommended next action. |
| Hand-off | Use campaign definition and evidence gaps as the starting context for Campaign Message Test. |
| Reusable artifacts | Assumptions preview, result hero, metric cards, executive summary, export review, safety labels. |
| Exit criteria | Campaign is understandable enough for message-specific validation; safety labels and caveats remain visible. |

## Campaign Message Test → Message Validation

| Mapping item | Definition |
|---|---|
| Inputs | Campaign definition from Product Launch or equivalent, candidate message, audience, platform mix, tone, assumptions. |
| Outputs | Message clarity, tone fit, claim readiness, platform fit, executive summary, limitations, evidence gaps. |
| Hand-off | Candidate message and message-readiness caveats become inputs for A/B Experiment variant design. |
| Reusable artifacts | Workbench form, current assumptions panel, dashboard cards, executive summary, export review, safety labels. |
| Exit criteria | Message is safe and clear enough to compare, or revision is recommended before comparison. |

## A/B Experiment → Experiment Validation

| Mapping item | Definition |
|---|---|
| Inputs | Two variants sharing the same objective, audience, platform assumptions, evaluation criteria, and safety constraints. |
| Outputs | Variant decision frame, parity check, shared criteria, differentiators, no-winner / inconclusive status, low confidence. |
| Hand-off | Executive Decision receives comparison evidence, blocked actions, and recommendation gating. |
| Reusable artifacts | Existing workflow shell, dashboard cards, InsightList sections, executive summary, export review, safety labels, product adapter. |
| Exit criteria | Human reviewer understands that no production winner is selected and decides whether to gather more evidence. |

## Hand-off rules

1. Outputs must carry assumptions, limitations, evidence gaps, confidence, and safety labels into the next stage.
2. Recommended Next Action should point to the next stage only when entry criteria are satisfied.
3. A workflow may recommend revision rather than progression.
4. Export / Handoff is allowed only after Executive Decision review.
5. No future workflow may bypass safety labels, low-confidence disclosure, or human review.

## Reusable journey artifacts

| Artifact | Source | Journey use |
|---|---|---|
| Campaign context | Product Launch / Campaign Domain | Shared object across stages. |
| Message candidate | Campaign Message Test | Feeds comparison and executive copy review. |
| Variant hypotheses | A/B Experiment | Captures comparison alternatives with shared criteria. |
| Evidence gaps | All workflows | Accumulate across the journey and guide next stage. |
| Executive summary | All workflows | Provides decision-ready narrative. |
| Export readiness | Export Review | Supports internal handoff without new export formats. |

## Related M8 documents

- [Marketing Journey Analysis](MARKETING_JOURNEY_ANALYSIS.md)
- [Marketing Journey Model](MARKETING_JOURNEY_MODEL.md)
- [Journey Workflow Mapping](JOURNEY_WORKFLOW_MAPPING.md)
- [Workspace Model](WORKSPACE_MODEL.md)
- [Executive Journey](EXECUTIVE_JOURNEY.md)
- [Future Workflow Placement](FUTURE_WORKFLOW_PLACEMENT.md)

## Architecture Gate assessment

No Architecture Gate is triggered. Existing workflows map cleanly into a journey composition without redesign.
