# Executive Journey

Status: M8 Marketing Journey Framework in progress.
Scope: Documentation-only executive journey design. This document does not implement Creative Comparison, additional workflows, frontend routes, backend behavior, runtime functionality, live APIs, or SocialSense changes.

## Executive view goal

Executives should see a decision story, not a workflow inventory. The executive journey should answer:

1. What are we trying to decide?
2. What evidence do we have?
3. What remains uncertain?
4. What decision is safe now?
5. What should happen next?

## What executives should see first

| Priority | Executive question | Recommended content |
|---|---|---|
| 1 | What decision is requested? | Current stage, decision status, recommended next action. |
| 2 | What campaign is this about? | Campaign name, objective, audience, offer, platform assumptions. |
| 3 | What evidence supports this? | Completed stages and their outputs. |
| 4 | What are the limits? | Evidence gaps, assumptions, uncertainty, source mode, safety labels. |
| 5 | What should we not do? | Blocked actions such as production launch, winner selection, conversion optimization, and automated targeting when unsupported. |

## Stage-level executive decisions

| Stage | Executive decision | Evidence required | Uncertainty display |
|---|---|---|---|
| Idea | Proceed to campaign definition or hold. | Business objective and audience hypothesis. | High uncertainty; no performance evidence. |
| Campaign Definition | Approve campaign framing for message validation. | Campaign context, assumptions, limitations, evidence gaps. | Directional synthetic aggregate caveats. |
| Campaign Message Test | Approve message for comparison or revise. | Clarity, tone, claim readiness, platform fit. | Message quality caveats and unresolved risks. |
| A/B Experiment | Approve small evidence-gathering comparison or revise variants. | Shared criteria, parity check, differentiators, blocked actions. | Low directional confidence; no winner selected. |
| Executive Decision | Approve, revise, hold, or request more evidence. | Accumulated journey summary across prior stages. | Confidence and evidence gaps visible together. |
| Export / Handoff | Share internally or hold. | Reviewed executive summary, export readiness, caveats. | Unsupported formats and limitations visible. |

## Evidence accumulation model

Evidence should accumulate as a layered executive narrative:

```text
Campaign intent
+ campaign definition evidence
+ message validation evidence
+ experiment comparison evidence
+ executive decision rationale
+ export/handoff package
```

Evidence must remain qualified as synthetic, aggregate, offline, fixture/sample, or human-reviewed where applicable. A later stage should not erase earlier caveats.

## Uncertainty display

Use explicit labels:

- Confidence level.
- Evidence quality.
- Open evidence gaps.
- Assumptions.
- Limitations.
- Source / review mode.
- Blocked actions.
- Human review required.

Do not use certainty language such as guaranteed, proven, predicted conversion, winner, optimized, production-ready, or automated targeting unless a future reviewed milestone explicitly authorizes appropriate evidence and safety controls.

## Executive handoff principles

1. Every stage should produce a business-readable summary.
2. Recommendations should be specific but bounded by evidence quality.
3. No comparison stage should select a production winner from synthetic aggregate evidence.
4. Export / Handoff should preserve caveats and safety labels.
5. Executives should understand whether the decision is approve, revise, hold, or gather more evidence.

## Related M8 documents

- [Marketing Journey Analysis](MARKETING_JOURNEY_ANALYSIS.md)
- [Marketing Journey Model](MARKETING_JOURNEY_MODEL.md)
- [Journey Workflow Mapping](JOURNEY_WORKFLOW_MAPPING.md)
- [Workspace Model](WORKSPACE_MODEL.md)
- [Executive Journey](EXECUTIVE_JOURNEY.md)
- [Future Workflow Placement](FUTURE_WORKFLOW_PLACEMENT.md)

## Architecture Gate assessment

No Architecture Gate is triggered. The Executive Journey is a composition and presentation model over approved outputs.
