# M3 Campaign Objectives

Status: Drafted for M3 — Campaign Domain Planning.

Scope: objective model only. No UI, backend, runtime, SocialSense, or workflow implementation.

## Purpose

Campaign objectives define the business question a workflow should answer. They keep future workflows focused and prevent dashboards from becoming generic report dumps.

Each future campaign workflow should have one primary objective, optional secondary context, objective-specific success criteria, objective-specific evidence gaps, and one safe recommended next action.

## Objective catalog

| Objective | Definition | Business value | Typical campaign types | Output emphasis |
|---|---|---|---|---|
| Increase Awareness | Improve recognition, understanding, or recall. | Decide whether awareness framing is clear enough to test. | Product Launch, Brand Awareness, Research Campaign | Awareness risks, recall cues, channel fit, next evidence step |
| Improve Message Acceptance | Improve relevance, clarity, credibility, and willingness to consider. | Refine copy before real testing. | Campaign Message Test, Product Launch, Promotion, Retention | Message clarity, objections, credibility, acceptance drivers |
| Compare Messages | Compare variants against shared objective and audience. | Choose a direction or identify tradeoffs. | A/B Message Comparison | Variant comparison, winner/runner-up rationale, caveats |
| Collect Feedback | Gather and structure opinions, needs, questions, and objections. | Help product/research teams learn before investment. | Product Feedback, Research Campaign | Themes, sentiment cues, open questions, evidence quality |
| Evaluate Perception | Understand likely perception of positioning, tone, trust, and fit. | Avoid tone/product-market mismatch. | Brand Awareness, Product Launch, Research Campaign | Perception risks, trust cues, positioning tradeoffs |
| Improve Engagement | Improve likelihood of response, interaction, or safe next step. | Refine offers and channel choices. | Promotion, Retention, Re-engagement, Campaign Response | Engagement hypotheses, timing, offer clarity, channel cues |
| Diagnose Response | Interpret why a campaign may be under/over-performing directionally. | Decide what to adjust next. | Campaign Response, Promotion, Retention | Diagnostic hypotheses, evidence gaps, next diagnostic test |
| Prepare Executive Review | Turn campaign evidence into an executive decision packet. | Help stakeholders approve/reject next planning step. | All | Summary, limitations, recommendation, export readiness |

## Objective relationships

```text
Increase Awareness → Evaluate Perception → Improve Message Acceptance → Compare Messages / Improve Engagement
Collect Feedback → Evaluate Perception → Product Launch / Promotion / Retention planning
Diagnose Response → Improve Message Acceptance or Improve Engagement refinement
```

## Objective-to-campaign mapping

| Campaign type | Primary objective | Secondary objective options | Notes |
|---|---|---|---|
| Product Launch | Increase Awareness | Improve Message Acceptance; Evaluate Perception | Reference flow uses launch readiness plus next evidence step. |
| Campaign Message Test | Improve Message Acceptance | Evaluate Perception | Single-message test should not become A/B comparison; A/B Message Comparison owns Compare Messages. |
| A/B Message Comparison | Compare Messages | Improve Message Acceptance | Requires variant parity rules. |
| Promotion | Improve Engagement | Improve Message Acceptance; Diagnose Response | Offer/urgency clarity matters. |
| Brand Awareness | Increase Awareness | Evaluate Perception | Trust and recall cues matter. |
| Product Feedback | Collect Feedback | Evaluate Perception | Needs qualitative evidence grouping. |
| Retention | Improve Engagement | Improve Message Acceptance | Lifecycle context required. |
| Re-engagement | Improve Engagement | Evaluate Perception | Sensitivity and fatigue risks required. |
| Research Campaign | Collect Feedback | Evaluate Perception; Prepare Executive Review | Research question quality matters. |

## Objective success criteria

| Objective | Success criteria | Unsafe overclaim to avoid |
|---|---|---|
| Increase Awareness | Operator can identify awareness risk, audience fit, and next evidence step. | “This campaign will increase awareness.” |
| Improve Message Acceptance | Operator can identify clarity/credibility risks and safer next message test. | “This message will be accepted.” |
| Compare Messages | Operator can compare variants with tradeoffs and evidence gaps. | “Variant A will outperform Variant B.” |
| Collect Feedback | Operator can see themes, gaps, and follow-up questions. | “This represents all users/customers.” |
| Evaluate Perception | Operator can identify perception risks and trust cues. | “Audience perception is proven.” |
| Improve Engagement | Operator can identify engagement hypotheses and safe test design. | “This will increase engagement.” |
| Diagnose Response | Operator can identify plausible causes and next diagnostic test. | “This explains real campaign performance.” |
| Prepare Executive Review | Operator can review a concise decision packet. | “This is approved production evidence.” |

## Objective input requirements

| Objective | Required campaign inputs | Optional inputs |
|---|---|---|
| Increase Awareness | Campaign type, audience, awareness statement, platform mix | Brand context, competitors, timing |
| Improve Message Acceptance | Message, audience, objective, assumptions | Tone constraints, objections, offer |
| Compare Messages | Variant A, Variant B, shared audience, comparison criteria | Risk weighting, brand constraints |
| Collect Feedback | Research question, audience, product/context | Prompt, known concerns |
| Evaluate Perception | Positioning statement, audience, context | Trust cues, category concerns |
| Improve Engagement | Offer/action, audience, platform mix | Urgency, lifecycle stage |
| Diagnose Response | Prior campaign context, response signal, assumptions | Channel notes, timing |
| Prepare Executive Review | Result summary, limitations, evidence gaps, recommendation | Export format readiness |

## Recommendation rules

Recommendations must be one clear next step, human-reviewable, evidence-gathering or planning-oriented, bounded by limitations, and never an automated production action.

| Objective | Good recommendation | Bad recommendation |
|---|---|---|
| Improve Message Acceptance | Run a small approved message clarity test with two audience segments. | Publish the message. |
| Compare Messages | Use Variant A as next test candidate, but collect evidence for trust objections. | Variant A will win. |
| Collect Feedback | Ask focused follow-up questions about pricing and onboarding. | Users want this feature. |
| Improve Engagement | Review offer clarity with a small offline panel before channel spend. | Increase budget on LINE. |

## Acceptance criteria

The objectives model is approved if future workflows can choose one primary objective, objectives map to campaign types, outputs/success criteria are documented, unsafe overclaims are blocked, and no UI/runtime/backend implementation is introduced.
