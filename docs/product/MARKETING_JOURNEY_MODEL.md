# Marketing Journey Model

Status: M8 Marketing Journey Framework in progress.
Scope: Documentation-only model for Journey, Stage, Workflow, Output, Entry Criteria, Exit Criteria, and Next Recommended Stage. This document does not implement Creative Comparison, additional workflows, frontend routes, backend behavior, runtime functionality, live APIs, or SocialSense changes.

## Core objects

| Object | Definition | Ownership |
|---|---|---|
| Journey | A coherent marketing decision path for a campaign from idea through executive handoff. | 3C product model |
| Stage | A named decision moment inside a Journey. | 3C product model |
| Workflow | A reusable guided experience that can satisfy one or more Stage needs. | Existing reference workflows |
| Output | A reviewed artifact produced by a workflow run: dashboard, executive summary, export readiness, recommendation, caveats. | Existing run/export patterns |
| Entry criteria | Minimum context required before a Stage can be responsibly started. | Journey governance |
| Exit criteria | Evidence and review conditions required before moving to the next Stage. | Journey governance |
| Next recommended stage | Human-readable guidance for what to do next. | Reused Recommended Next Action pattern |

## Journey lifecycle

```text
Journey created from campaign idea
↓
Stage selected from current decision need
↓
Workflow run or reviewed
↓
Output stored conceptually as evidence
↓
Exit criteria evaluated
↓
Next recommended stage selected
↓
Executive handoff or additional evidence stage
```

M8 defines this lifecycle conceptually only. It does not add persistence, workspace storage, new routes, or workflow orchestration code.

## Required Journey fields

| Field | Purpose | Example |
|---|---|---|
| Journey name | Business-readable journey label | Q3 LINE Product Launch Journey |
| Campaign | Campaign definition shared across stages | Product, message, audience, offer, platforms |
| Current stage | Where the user is in the decision journey | A/B Experiment |
| Completed stages | Evidence already reviewed | Campaign Definition, Campaign Message Test |
| Open evidence gaps | What is still uncertain | Field response, channel proof, compliance wording |
| Decision history | Human decisions and caveats | Revise message, run A/B readiness test |
| Next recommended stage | Guided next step | Executive Decision or Creative Refinement |

## Stage model

| Stage | Entry criteria | Workflow | Output | Exit criteria | Next recommended stage |
|---|---|---|---|---|---|
| Idea | Business objective or opportunity exists | Product Launch can provide initial framing | Initial assumptions and campaign idea | Objective, audience, and offer are clear enough to review | Campaign Definition |
| Campaign Definition | Idea has campaign intent, audience, and platform context | Product Launch | Campaign dashboard, assumptions, limitations, evidence gaps | Human review confirms campaign is clear enough for message validation | Campaign Message Test |
| Campaign Message Test | Campaign definition has candidate message | Campaign Message Test | Message-readiness result, caveats, executive summary | Message is clear enough or revision is requested | A/B Experiment or revise message |
| A/B Experiment | Two variants share objective, audience, and criteria | A/B Experiment | Comparison dashboard, parity check, shared criteria, blocked actions | No-winner conclusion is understood and next evidence test is approved or declined | Executive Decision or Creative Refinement planning |
| Executive Decision | Evidence from prior stages is available | Reused dashboard / executive summary review | Decision recommendation with confidence and uncertainty | Executive chooses approve, revise, hold, or request more evidence | Export / Handoff or previous stage |
| Export / Handoff | Reviewed decision package exists | Export Review | Export readiness for existing formats | Package is safe, caveats visible, unsupported formats blocked | Internal handoff or journey close |

## Decision status values

| Status | Meaning | Allowed next step |
|---|---|---|
| Ready for human review | Stage output is complete enough for a human decision | Review and decide next stage |
| Needs revision | Output has clarity or evidence gaps | Return to current or previous stage |
| Inconclusive / needs evidence | Comparison cannot select a winner | Plan small approved evidence test or revise assumptions |
| Hold | Safety, evidence, or business context is insufficient | Stop or request more information |
| Handoff ready | Executive package is complete enough for internal sharing | Export / Handoff |

## Non-goals

M8 does not add Journey objects to code, route state, database tables, backend endpoints, export formats, SocialSense runtime, or additional workflow implementations.

## Related M8 documents

- [Marketing Journey Analysis](MARKETING_JOURNEY_ANALYSIS.md)
- [Marketing Journey Model](MARKETING_JOURNEY_MODEL.md)
- [Journey Workflow Mapping](JOURNEY_WORKFLOW_MAPPING.md)
- [Workspace Model](WORKSPACE_MODEL.md)
- [Executive Journey](EXECUTIVE_JOURNEY.md)
- [Future Workflow Placement](FUTURE_WORKFLOW_PLACEMENT.md)

## Architecture Gate assessment

No Architecture Gate is triggered. The Journey model composes approved foundations and does not require redesign.
