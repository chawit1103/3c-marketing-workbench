# M3 Campaign Workflow Mapping

Status: Drafted for M3 — Campaign Domain Planning.

Scope: workflow mapping only. No Campaign Message Test, A/B Message Comparison, Promotion, Campaign Response, Brand Awareness, frontend workflows, backend services, runtime behavior, or SocialSense changes are implemented.

## Purpose

This document maps future workflows to the Campaign Domain so they can become configurations of a shared model instead of independent features.

Approved M2 workflow pattern:

```text
Input → Review → Run → Result Preview / Dashboard → Executive Summary → Export Review → Recommended Next Action
```

M3 keeps that pattern and maps workflow-specific behavior onto Campaign Domain fields.

## Mapping summary

| Future workflow | Campaign Domain mapping | Reusable pattern | Workflow-specific behavior | M3 decision |
|---|---|---|---|---|
| Campaign Message Test | Campaign + Message + Audience + Objective + Evidence + Recommendation | Yes | Message quality rubric and acceptance risks | Ready for planning, not implementation |
| A/B Message Comparison | Campaign + message variants + shared Objective/Audience + comparison Evidence | Yes with extension | Variant parity, comparison matrix, winner/tradeoff logic | Needs extension spec |
| Promotion | Campaign + Offer + Audience + Platform Mix + Evidence | Yes | Offer clarity, urgency, response-risk cards | Ready for planning |
| Campaign Response | Campaign + response context + Audience + Message + Evidence | Yes | Response diagnosis, adjustment options, evidence-gap cards | Ready for planning |
| Brand Awareness | Campaign + Objective + Message + Audience + Platform Mix + Evidence | Yes | Awareness/trust/recall dashboard cards | Ready for planning |
| Research Campaign | Campaign + Research Question + Audience + Evidence + Recommendation | Yes with research emphasis | Evidence quality, sampling limitations, question quality | Ready for planning |
| Product Feedback | Campaign + Feedback Prompt + Audience + Evidence themes | Yes with extension | Qualitative taxonomy and theme grouping | Needs extension spec |
| Retention | Campaign + Lifecycle Stage + Offer/Message + Audience | Yes | Churn/loyalty lifecycle fields | Ready for planning |
| Re-engagement | Campaign + Dormancy Context + Message/Offer + Audience | Yes | Sensitivity/timing/fatigue fields | Ready for planning |

## Campaign Message Test mapping

| Pattern step | Campaign Domain object | Planning behavior |
|---|---|---|
| Input | Campaign, Message, Audience, Objective, Platform Mix | Operator provides one message, one audience, one primary objective. |
| Review | Assumptions, unsafe overclaims, evidence needs | Show message, objective, audience, platform assumptions before run. |
| Run | Evidence package | Future approved evidence review only; no M3 runtime. |
| Dashboard | Message clarity, acceptance risk, audience fit, platform cues | Use message-specific cards. |
| Executive Summary | Objective-specific summary | Summarize message acceptance/readiness. |
| Export Review | Review-ready report | Preview only unless future export implemented. |
| Recommended Next Action | Recommendation | Suggest a small approved evidence-gathering step. |

Classification: **Reusable**. Implementation status: **not implemented**.

## A/B Message Comparison mapping

| Pattern step | Campaign Domain object | Planning behavior |
|---|---|---|
| Input | Campaign, Message Variant A, Message Variant B, shared Objective/Audience | Operator provides variants and common criteria. |
| Review | Variant parity checklist | Ensure only intended message differences are compared. |
| Run | Comparison Evidence | Future approved comparison evidence only. |
| Dashboard | Comparison matrix | Show strengths, risks, tradeoffs, and confidence. |
| Executive Summary | Comparison recommendation | Explain which variant to test next and why. |
| Export Review | Comparison report preview | Include caveats and evidence gaps. |
| Recommended Next Action | Recommendation | Decide, iterate, or collect more evidence. |

Classification: **Needs extension**.

Extension required: variant parity rules, comparison matrix, tie/uncertainty state, and no winner overclaim.

Implementation status: **not implemented**.

## Promotion mapping

| Pattern step | Campaign Domain object | Planning behavior |
|---|---|---|
| Input | Campaign, Offer, Audience, Platform Mix, Objective | Operator defines offer and response goal. |
| Review | Offer constraints, urgency, eligibility | Show whether offer is clear and safe. |
| Run | Evidence package | Future approved evidence review only. |
| Dashboard | Offer clarity, urgency risk, audience fit | Promotion-specific cards. |
| Executive Summary | Promotion planning summary | Summarize response hypothesis and caveats. |
| Export Review | Review-ready report | Preview only. |
| Recommended Next Action | Recommendation | Small approved offer/message test. |

Classification: **Reusable**.

## Campaign Response mapping

| Pattern step | Campaign Domain object | Planning behavior |
|---|---|---|
| Input | Campaign, prior campaign context, response signal, Audience, Message | Operator defines what response pattern needs diagnosis. |
| Review | Assumptions, signal limitations, response context | Show what is known, unknown, and not live-measured by 3C. |
| Run | Evidence package | Future approved evidence review only. |
| Dashboard | Response diagnosis, likely drivers, evidence gaps | Response-specific cards. |
| Executive Summary | Campaign response planning summary | Summarize plausible diagnosis and caveats. |
| Export Review | Review-ready report | Preview only. |
| Recommended Next Action | Recommendation | Small approved diagnostic follow-up. |

Classification: **Reusable**.

## Brand Awareness mapping

| Pattern step | Campaign Domain object | Planning behavior |
|---|---|---|
| Input | Campaign, awareness message, audience, platform mix | Operator defines awareness goal and context. |
| Review | Trust/recall assumptions | Review brand perception risks. |
| Run | Evidence package | Future approved evidence review only. |
| Dashboard | Awareness, trust, recall, channel cues | Awareness-specific cards. |
| Executive Summary | Brand narrative summary | Summarize perception/trust risks. |
| Export Review | Review-ready report | Preview only. |
| Recommended Next Action | Recommendation | Small evidence collection plan. |

Classification: **Reusable**.

## Research Campaign mapping

| Pattern step | Campaign Domain object | Planning behavior |
|---|---|---|
| Input | Campaign, research question, audience, objective | Operator defines learning goal. |
| Review | Evidence quality and question clarity | Confirm question is answerable. |
| Run | Evidence package | Future approved research evidence only. |
| Dashboard | Evidence quality, themes, gaps | Research-focused cards. |
| Executive Summary | Research decision summary | Summarize what can/cannot be concluded. |
| Export Review | Review-ready report | Preview only. |
| Recommended Next Action | Recommendation | Next research question or evidence plan. |

Classification: **Reusable with stronger evidence-quality emphasis**.

## Workflow-specific behavior catalog

| Behavior | Shared or specific? | Needed by |
|---|---|---|
| One primary objective | Shared | All workflows |
| Input review before run | Shared | All workflows |
| Evidence gaps and limitations | Shared | All workflows |
| Recommended next action | Shared | All workflows |
| Variant parity review | Specific extension | A/B Message Comparison |
| Qualitative theme grouping | Specific extension | Product Feedback, Research Campaign |
| Offer eligibility/urgency | Specific extension | Promotion, Retention, Re-engagement |
| Lifecycle stage | Specific extension | Retention, Re-engagement |
| Awareness/trust dimensions | Specific extension | Brand Awareness |

## Non-implementation rules

M3 does not permit new routes, React components, form fields, fixtures, runtime calls, adapter functions, SocialSense modifications, backend/API/persistence/auth, or production campaign action.

## Architecture Gate assessment

Architecture Gate: **not triggered**. No changes are required to SocialSense Runtime, SocialSense SDK, Workflow Pattern, or Product Architecture.

## Acceptance criteria

Workflow mapping is complete if every future workflow named in M3 maps to Campaign Domain objects, reusable vs extension behavior is explicit, no workflow requires redesign at planning level, no implementation is introduced, and Campaign Message Test is recommended only for planning after GO.
