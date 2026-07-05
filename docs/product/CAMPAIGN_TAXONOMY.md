# M3 Campaign Taxonomy

Status: Drafted for M3 — Campaign Domain Planning.

Scope: classification only. No workflow, UI, backend, runtime, SocialSense, or production campaign implementation.

## Principles

Campaign types must be business-readable, objective-driven, reusable across future consumers, compatible with the Product Launch workflow pattern, safe under fixture/offline/synthetic aggregate boundaries, and selectable without platform-internal knowledge.

Campaign types are configurations of Campaign Domain, not independent products.

## Campaign families

| Family | Purpose | Examples | Reuse level |
|---|---|---|---|
| Launch | Introduce a new product/service/feature/offer. | Product Launch, feature launch, market entry | Reference pattern |
| Awareness | Increase recognition, recall, trust, or category association. | Brand Awareness, thought leadership, public education | Reusable |
| Conversion / Response | Encourage a bounded response to an offer or message. | Promotion, Campaign Response, lead magnet | Reusable with offer fields |
| Retention / Lifecycle | Improve ongoing relationship or reactivation. | Retention, Re-engagement, win-back | Reusable with lifecycle fields |
| Research / Feedback | Learn from audiences and structure evidence. | Product Feedback, Research Campaign, concept test | Needs evidence taxonomy extension |
| Comparison | Compare alternatives. | A/B Message Comparison, message variant comparison | Needs two-variant extension |

## Campaign type catalog

| Campaign type | Definition | Primary objective fit | Inputs that matter most | Output emphasis | Classification |
|---|---|---|---|---|---|
| Product Launch | Review launch message, audience, platform mix, and next test. | Increase Awareness; Improve Message Acceptance; Evaluate Perception | Product, value proposition, audience, platform mix, launch context | Launch readiness, audience fit, channel cues, next evidence step | Reference workflow |
| Brand Awareness | Review whether framing improves recognition, recall, trust, or positioning. | Increase Awareness; Evaluate Perception | Brand statement, audience, trust cues, platform mix | Awareness drivers, trust risks, recall cues, evidence gaps | Reusable |
| Promotion | Review an offer, incentive, or time-bounded campaign. | Improve Engagement; Improve Message Acceptance | Offer, urgency, eligibility, constraints | Offer clarity, urgency risk, response hypothesis, next test | Reusable |
| Campaign Response | Review directional response patterns and adjustment options. | Improve Engagement; Evaluate Perception; Diagnose Response | Prior campaign context, response signal, audience, message | Response interpretation, diagnosis, next action | Reusable with response evidence fields |
| Product Feedback | Structure feedback themes, objections, needs, and unanswered questions. | Collect Feedback; Evaluate Perception | Feedback prompt, audience, product area, context | Themes, sentiment cues, evidence quality, follow-up questions | Needs extension |
| Retention | Review messaging/offers for existing customers/users. | Improve Engagement; Improve Message Acceptance | Lifecycle stage, reason to stay, incentive, audience | Retention drivers, churn-risk cues, outreach test | Reusable with lifecycle context |
| Re-engagement | Review messaging for dormant/inactive audiences. | Improve Engagement; Improve Message Acceptance | Dormancy reason, reactivation offer, sensitivity constraints | Relevance risk, timing cues, respectful next action | Reusable with sensitivity constraints |
| Research Campaign | Plan evidence-gathering for perception, concept, or market learning. | Collect Feedback; Evaluate Perception | Research question, sample definition, evidence constraints | Research usefulness, gaps, question quality, next study design | Reusable with research evidence fields |
| A/B Message Comparison | Compare variants against shared objective and audience. | Compare Messages | Variants, common audience/objective, comparison criteria | Comparison matrix, tradeoffs, evidence gap | Needs extension |
| Campaign Message Test | Review one message against objective, audience, and evidence model. | Improve Message Acceptance; Evaluate Perception | Message, objective, audience, platform mix, assumptions | Message clarity, acceptance risk, recommended next test | Reusable |

## Type selection rules

1. Choose one primary campaign type per run.
2. Choose one primary objective per run.
3. Use a comparison extension for variants rather than overloading single-message workflows.
4. Use research/feedback fields for qualitative learning.
5. If live/customer/private evidence is required, stop and require a future Architecture/Safety Gate.

## Type-to-pattern mapping

| Type | Input | Review | Run | Dashboard | Executive Summary | Export Review | Next Action |
|---|---|---|---|---|---|---|---|
| Product Launch | Reference fields | Assumptions preview | Existing offline run | Existing dashboard | Existing summary | Existing export preview | Existing next action |
| Campaign Message Test | Message-first fields | Message/objective/audience review | Future planning only | Message quality cards | Message recommendation | Export preview | Next message evidence step |
| A/B Message Comparison | Variant fields | Variant parity review | Future planning only | Comparison matrix | Comparison conclusion | Export preview | Decide/iterate/collect evidence |
| Promotion | Offer-first fields | Offer constraints review | Future planning only | Offer clarity/risk cards | Promotion recommendation | Export preview | Small approved offer test |
| Brand Awareness | Awareness/trust fields | Awareness assumptions review | Future planning only | Awareness/trust cards | Awareness narrative | Export preview | Evidence collection plan |
| Product Feedback | Feedback prompt fields | Research question review | Future planning only | Theme/evidence cards | Feedback insight summary | Export preview | Follow-up research question |

## Avoided taxonomy mistakes

- Do not make each campaign type a hardcoded route.
- Do not copy old MarketingSimulation workflow complexity.
- Do not expose SocialSense runtime terms as primary operator terminology.
- Do not imply live response measurement from fixture/offline evidence.
- Do not treat A/B as production optimization; it is planning/comparison until authorized.

## Success criteria

Taxonomy is acceptable if every M3 future workflow has a place, Product Launch remains the reference type, comparison and feedback extensions are identified without redesigning the pattern, and implementation/safety boundaries remain explicit.
