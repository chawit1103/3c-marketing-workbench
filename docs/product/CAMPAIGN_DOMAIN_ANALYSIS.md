# M3 Campaign Domain Analysis

Status: Drafted for M3 — Campaign Domain Planning.

Scope: documentation-only domain model. No Campaign Message Test, A/B Message Comparison, frontend workflow, backend, runtime, SocialSense, or production campaign implementation.

## Purpose

Campaign Domain is the reusable business model that future 3C Marketing Workbench workflows should share. Product Launch remains the reference workflow; Campaign Domain turns that successful flow into common concepts instead of independent one-off features.

Future workflows should become configurations of this domain:

- Campaign Message Test
- A/B Message Comparison
- Promotion
- Campaign Response
- Brand Awareness
- Product Feedback
- Retention
- Re-engagement
- Research Campaign

## Architecture Gate assessment

Architecture Gate: **not triggered**.

M3 does not require changes to SocialSense Runtime, SocialSense SDK, Workflow Pattern, Product Architecture, frontend routes, backend services, or live API integration. The domain can be defined as a 3C product/business model over the approved Product Launch workflow pattern and existing SocialSense public-adapter boundary.

## Campaign business concepts

| Concept | Definition | Owner | Notes |
|---|---|---|---|
| Campaign | Bounded marketing effort with objective, audience, message, channel mix, assumptions, evidence, and next action. | 3C | Root business object. |
| Campaign Type | Category of campaign intent. | 3C | Product Launch, Brand Awareness, Promotion, etc. |
| Objective | Desired business/research outcome. | 3C | One primary objective per run. |
| Message | Audience-facing creative statement, offer, or value proposition. | 3C | Human-reviewed; not production publish action. |
| Audience | Aggregate target segment/persona group. | 3C | No CRM/customer lists, PII, private groups, or voter lists. |
| Platform Mix | Planned channel/platform distribution. | 3C + SocialSense boundary | Planning cue, not live measurement. |
| Assumptions | Operator-provided beliefs/context. | 3C | Visible before run/review. |
| Evidence | Synthetic/offline or later approved aggregate evidence. | 3C + SocialSense boundary | Current evidence is offline fixture-derived. |
| Limitations | Caveats and what cannot be concluded. | 3C | Mandatory in dashboard/export. |
| Recommendation | Human-reviewable next step. | 3C | No automation or production optimization. |

## Campaign types

| Type | Primary use | Pattern fit |
|---|---|---|
| Product Launch | Validate launch messaging, audience, channel assumptions, and next evidence step. | Reference workflow |
| Brand Awareness | Explore awareness, trust, reach, recall, and positioning. | Reusable |
| Promotion | Evaluate offer clarity, urgency, fit, and response risk. | Reusable |
| Campaign Response | Interpret directional response and next diagnostic action. | Reusable with response evidence fields |
| Product Feedback | Structure feedback themes, objections, needs, and unanswered questions. | Needs qualitative taxonomy extension |
| Retention | Evaluate renewal, loyalty, and churn-prevention messaging. | Reusable with lifecycle fields |
| Re-engagement | Assess dormant-audience reactivation messaging and sensitivity. | Reusable with lifecycle/sensitivity fields |
| Research Campaign | Explore perception, awareness, pain points, or concept testing. | Reusable with research-evidence framing |

## Campaign lifecycle

```text
Idea → Define Campaign → Review Inputs → Run Offline / Approved Evidence Review → Read Dashboard → Read Executive Summary → Review Export Readiness → Choose Recommended Next Action → Plan Follow-up Evidence
```

| State | Meaning | M3 handling |
|---|---|---|
| Draft | Campaign concept exists but is not ready to review. | Defined only |
| Ready for Review | Required assumptions and objective are present. | Defined only |
| Reviewed | Result/dashboard has been interpreted. | Reference from Product Launch |
| Evidence Gap Identified | Next action is to collect safer/better evidence. | Required pattern |
| Approved for Planning | Human accepts next planning step. | Defined only |
| Approved for Implementation | Future explicit gate only. | Not authorized in M3 |

## Campaign inputs

| Input | Required? | Reusable? | Notes |
|---|---|---|---|
| Campaign name | Yes | Yes | User-facing label. |
| Campaign type | Yes | Yes | Product Launch, Brand Awareness, Promotion, etc. |
| Objective | Yes | Yes | One primary objective keeps cognitive load low. |
| Message / value proposition | Conditional | Yes | A/B extends this to variants. |
| Audience segment | Yes | Yes | Aggregate only; no customer lists or PII. |
| Offer / incentive | Conditional | Yes | Required for Promotion/Retention; optional elsewhere. |
| Platform mix | Yes | Yes | Business planning cue, not live performance. |
| Market/context notes | Optional | Yes | Supports assumptions and interpretation. |
| Success criteria | Yes | Yes | Defines what useful output should answer. |
| Constraints | Optional | Yes | Budget, geography, compliance, brand limits. |

## Campaign outputs

| Output | Purpose | Reusable? |
|---|---|---|
| Result headline | Fast understanding of outcome. | Yes |
| Executive summary | Executive interpretation. | Yes |
| Dashboard cards | Structured scenario interpretation. | Yes |
| Platform/channel cues | Planning prompts for further review. | Yes |
| Audience interpretation | Aggregate audience reasoning. | Yes |
| Evidence gaps | What must be validated before action. | Yes |
| Limitations | What cannot be concluded. | Yes |
| Recommendation | Human-reviewable next action. | Yes |
| Export readiness | Review of report formats/status, not download unless approved. | Yes |

## Campaign success criteria

A Campaign Domain workflow is successful only if:

- campaign type, objective, audience, message, and platform mix are clear;
- assumptions are visible before run/review;
- outputs remain offline/synthetic/aggregate unless a future gate changes evidence source;
- dashboard answers the objective-specific business question;
- executive summary is concise and non-predictive;
- limitations and evidence gaps are visible;
- recommendation is specific, safe, and human-reviewable;
- export does not imply a download or production-ready artifact unless separately implemented;
- no CRM/customer data, PII, private data, live APIs, scraping, microtargeting, persuasion optimization, or production claims are introduced.

## Completeness assessment

| Area | Status | Evidence |
|---|---|---|
| Business concepts | Complete for planning | Campaign/type/objective/message/audience/evidence/recommendation defined. |
| Lifecycle | Complete for planning | Draft → Review → Dashboard → Export Review → Next Action model defined. |
| Inputs | Complete for planning | Reusable/conditional input set defined. |
| Outputs | Complete for planning | Dashboard/export/recommendation outputs defined. |
| Runtime implementation | Not started | Explicitly out of scope. |
| Frontend workflow | Not started | Explicitly out of scope. |

## Recommended next milestone

If M3 receives GO, the next milestone may be **Campaign Message Test Planning** only. Do not implement Campaign Message Test from this document alone.
