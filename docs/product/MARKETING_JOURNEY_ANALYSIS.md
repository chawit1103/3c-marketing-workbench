# Marketing Journey Analysis

Status: M8 Marketing Journey Framework in progress.
Scope: Documentation-only framework for connecting approved workflows into a coherent marketing decision journey. This document does not implement Creative Comparison, additional workflows, frontend routes, backend behavior, runtime functionality, live APIs, or SocialSense changes.

## Purpose

3C Marketing Workbench should be understood as a marketing decision platform, not as isolated workflow screens. The Marketing Journey Framework connects Product Launch, Campaign Message Test, and A/B Experiment into one reusable journey.

## Approved foundations reused

- Workflow Pattern: Input → Review → Run → Result Preview / Dashboard → Executive Summary → Export Review → Recommended Next Action.
- Campaign Domain: campaign, objective, message, audience, offer, platform mix, evidence, confidence, recommendation, and human review.
- Information Architecture and Navigation Model: journeys and workflows remain under existing Workbench / Campaigns structure without new primary navigation.
- Design System: existing cards, badges, forms, dashboard panels, executive summaries, safety labels, and export review language remain the default presentation model.
- Experiment Framework: comparison workflows become journey stages, not separate architecture.

## Minimum journey stages

```text
Idea
↓
Campaign Definition
↓
Campaign Message Test
↓
A/B Experiment
↓
Executive Decision
↓
Export / Handoff
```

## Stage analysis

| Stage | User question | Existing workflow support | Primary output | Decision expected |
|---|---|---|---|---|
| Idea | What are we trying to launch or improve? | Product Launch setup and Campaign Domain docs | Initial campaign intent, audience, offer, message, and assumptions | Is this worth shaping into a campaign definition? |
| Campaign Definition | What campaign definition should be reviewed? | Product Launch Reference Workflow | Campaign definition with assumptions, evidence gaps, and recommended next action | Is the campaign clear enough to test messages? |
| Campaign Message Test | Is the message safe, understandable, and executive-ready? | Campaign Message Test Reference Workflow | Message-readiness dashboard and executive summary | Is the message ready for comparison or revision? |
| A/B Experiment | Which variant hypothesis deserves the next evidence-gathering test? | A/B Experiment Reference Workflow | Comparison dashboard, parity disclosure, blocked actions, low-confidence framing | Is there enough directional clarity to plan a small approved test? |
| Executive Decision | What decision should the business make now? | Reused dashboard / executive summary pattern | Decision record with confidence, caveats, and recommended next action | Approve, revise, hold, or request more evidence. |
| Export / Handoff | What should be handed to stakeholders? | Export Review | Reviewed export readiness in existing formats | Is the package safe and complete enough to share internally? |

## Optional future stages

Future stages are positions in the journey only. They are not implemented by M8.

| Future stage | Position | Candidate workflows | Notes |
|---|---|---|---|
| Creative Refinement | After Campaign Message Test or after A/B Experiment | Creative Comparison, visual direction review | Requires M8 GO before planning; no implementation in M8. |
| Headline / CTA Optimization | After message validation | Headline Comparison, CTA Comparison | Must reuse Experiment Framework and no-winner confidence model. |
| Offer Validation | Before or after A/B Experiment | Offer Comparison | Must preserve human review and non-guarantee language. |
| Promotion Planning | After Executive Decision | Promotion workflow | Requires separate scope and safety review. |
| Research Follow-up | Any evidence gap stage | Research Campaign | Must clarify source quality and decision validity. |
| Handoff Tracking | After Export / Handoff | History / Reports / Workspace | Workspace model only in M8; no persistence implementation. |

## Journey principles

1. One journey, multiple workflow stages.
2. Each stage starts from the output of the previous stage when available.
3. Evidence accumulates; confidence should not reset silently between stages.
4. Recommended next action should be stage-aware and should never imply automatic production launch.
5. Creative Comparison and other future workflows are journey stages, not standalone architecture.
6. Journey framing must not require frontend, backend, runtime, SocialSense, IA, navigation, design-system, or Experiment Framework redesign.

## Related M8 documents

- [Marketing Journey Analysis](MARKETING_JOURNEY_ANALYSIS.md)
- [Marketing Journey Model](MARKETING_JOURNEY_MODEL.md)
- [Journey Workflow Mapping](JOURNEY_WORKFLOW_MAPPING.md)
- [Workspace Model](WORKSPACE_MODEL.md)
- [Executive Journey](EXECUTIVE_JOURNEY.md)
- [Future Workflow Placement](FUTURE_WORKFLOW_PLACEMENT.md)

## Architecture Gate assessment

No Architecture Gate is triggered. The Marketing Journey Framework fits the existing Workflow Pattern, Campaign Domain, Information Architecture, Navigation Model, Design System, Experiment Framework, and SocialSense boundary.
