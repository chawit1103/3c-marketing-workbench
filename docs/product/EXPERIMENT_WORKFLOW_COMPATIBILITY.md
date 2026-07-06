# M6 Experiment Workflow Compatibility

Status: M6 Experiment Framework Planning draft.

Scope: documentation-only compatibility review. This document does not implement A/B Message Comparison, Multivariate Testing, Creative Comparison, frontend routes, backend services, runtime behavior, SocialSense changes, live APIs, private data, CRM/customer data, PII, microtargeting, persuasion optimization, conversion guarantees, or production campaign automation.

## Purpose

Evaluate whether the existing Product Launch / Campaign Message Test Workflow Pattern is sufficient for Experiment workflows.

## Compatibility decision

## GO

The existing Workflow Pattern is sufficient for Experiment Framework planning.

Experiments can reuse:

```text
Input → Review → Run → Result Preview / Dashboard → Executive Summary → Export Review → Recommended Next Action
```

No Architecture Gate is triggered.

## Stage-by-stage compatibility

| Existing stage | Experiment compatibility | Extension required? | Notes |
|---|---|---:|---|
| Input | GO | Bounded | Add variant and hypothesis fields in future implementation. |
| Review | GO | Bounded | Review variant completeness, assumptions, evidence mode, and safety. |
| Run | GO | No for planning | Current run remains offline/sample/human-review; no runtime changes in M6. |
| Dashboard | GO | Bounded | Side-by-side comparison cards may be needed later. |
| Executive Summary | GO | No redesign | Summarize decision, rationale, confidence, caveats. |
| Export Review | GO | No new format | Existing export review can include comparison content in existing formats. |
| Recommended Next Action | GO | No redesign | Choose, revise, collect evidence, or small approved test. |

## Product Launch / Campaign Message Test evidence

Product Launch proved guided input, assumptions preview, offline run action, dashboard cards, executive summary, export review, recommended next action, and safety labels.

Campaign Message Test proved second reference workflow reuse, Campaign Domain reuse, dashboard reuse above 80%, component reuse above 80%, export review reuse at 100%, and primary navigation unchanged.

Experiment Framework can build on that evidence.

## Required future extensions

These are allowed as future implementation planning items, not M6 implementation:

| Extension | Needed by | Type | Architecture Gate? |
|---|---|---|---:|
| Variant input groups | A/B, Headline, CTA, Offer | Component/config extension | No |
| Side-by-side comparison dashboard | A/B, Creative, Offer | Dashboard card extension | No |
| Evidence quality grading | Research Comparison | Review/dashboard extension | No |
| Factor matrix | Multivariate Testing | Complexity-controlled input extension | No if bounded; yes if it requires redesign/runtime/statistical engine. |
| Creative metadata | Creative Comparison | Optional metadata fields | No |

## UX compatibility

Experiment workflows should preserve one clear objective, low input count for simple A/B workflows, visible assumptions before run, one primary run/review action, no primary navigation sprawl, executive-readable dashboard cards, clear limitations/confidence, and no technical platform terms in primary UI.

## Research compatibility

Experiment workflows require a stronger methodology layer than Campaign Message Test, but this fits the current pattern as Review, Result Preview / Dashboard, and Executive Summary content.

Research requirements:

- hypothesis visible;
- evaluation criteria visible and shared across variants;
- evidence mode visible;
- variant parity check visible;
- comparable evidence basis visible;
- source quality, relevance, representativeness, currentness, completeness, bias/limitations, and evidence gaps reviewed;
- confidence statement visible with Low/Medium/High directional rules;
- recommendation bounded by evidence and confidence;
- inconclusive/no-winner outcome treated as valid when evidence is insufficient;
- tradeoffs disclosed instead of forcing winner selection.

Minimum acceptance for future Experiment implementation:

- methodology note present;
- evidence basis present;
- limitations and evidence gaps present;
- confidence rationale present;
- blocked actions present;
- recommendation gating applied before executive summary.

## Safety compatibility

Existing safety labels and limitations are sufficient for planning.

Future implementation must continue to block or explicitly exclude live APIs, credentials, CRM/customer lists, PII/private data, private messages/groups, voter lists, microtargeting, persuasion optimization, conversion guarantees, and production campaign claims.

## Architecture Gate review

| Question | Answer |
|---|---|
| Does Experiment require Workflow Pattern redesign? | No. |
| Does Experiment require Campaign Domain redesign? | No. |
| Does Experiment require Navigation redesign? | No. |
| Does Experiment require Design System redesign? | No. |
| Does Experiment require SocialSense runtime changes? | No. |

## Final compatibility result

Experiment Framework receives **GO for planning compatibility**.

A/B Message Comparison should be recommended only as a future implementation candidate after M6 review gates approve this framework.
