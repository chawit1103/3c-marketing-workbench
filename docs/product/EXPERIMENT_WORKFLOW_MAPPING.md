# M6 Experiment Workflow Mapping

Status: M6 Experiment Framework Planning draft.

Scope: documentation-only workflow mapping. This document does not implement A/B Message Comparison, Multivariate Testing, Creative Comparison, frontend routes, backend services, runtime behavior, SocialSense changes, live APIs, private data, CRM/customer data, PII, microtargeting, persuasion optimization, conversion guarantees, or production campaign automation.

## Purpose

This document maps future comparison workflows to the reusable Experiment Framework.

## Reusable pattern

Approved 3C workflow pattern:

```text
Input
↓
Review
↓
Run
↓
Result Preview / Dashboard
↓
Executive Summary
↓
Export Review
↓
Recommended Next Action
```

Experiment-specific interpretation:

| Workflow stage | Experiment meaning | Reuse expectation |
|---|---|---|
| Input | objective, hypothesis, variants, audience/platform context, evaluation criteria | Reuse existing guided form pattern. |
| Review | assumptions, evidence basis, variant completeness, safety labels | Reuse assumptions preview and safety boundary pattern. |
| Run | approved review mode only | Reuse offline/local run pattern until future runtime approval. |
| Result Preview / Dashboard | immediate orientation plus side-by-side comparison cards and caveats | Reuse result preview and dashboard cards; add comparison layout only when implementing. |
| Executive Summary | decision, rationale, confidence, caveats | Reuse executive summary pattern. |
| Export Review | JSON/Markdown/Executive Summary readiness | Reuse export review; no new export formats. |
| Recommended Next Action | select/revise/test/collect evidence | Reuse recommended action card. |

## Workflow mappings

### A/B Message Comparison → Experiment

| Experiment field | A/B mapping |
|---|---|
| Experiment type | `ab_message_comparison` |
| Variants | Message A, Message B |
| Hypothesis | One message is clearer/trustier/more suitable than the other. |
| Evaluation | clarity, tone, trust, claim readiness, platform fit |
| Decision | choose A/B, revise both, or collect more evidence |
| Recommendation | run small approved message-readiness test only after human review |
| Extension need | Two-variant comparison layout; no architecture redesign. |

### Creative Comparison → Experiment

| Experiment field | Creative mapping |
|---|---|
| Experiment type | `creative_comparison` |
| Variants | Creative concept A/B or visual/message brief variants |
| Hypothesis | One creative direction fits audience/context better. |
| Evaluation | message alignment, visual clarity, brand fit, risk/caveat review |
| Decision | proceed with concept, revise, or collect evidence |
| Extension need | Asset metadata/creative brief fields; no implementation in M6. |

### Headline / CTA / Offer Comparison → Experiment

| Workflow | Variants | Evaluation emphasis | Extension need |
|---|---|---|---|
| Headline Comparison | Headline A/B | hook clarity, credibility, specificity, tone fit | Minimal; direct configuration. |
| CTA Comparison | CTA A/B | action clarity, intent match, overclaim risk | Minimal; direct configuration. |
| Offer Comparison | Offer A/B | value clarity, constraints, overpromise risk, eligibility caveats | Compliance/constraint review fields. |

### Multivariate Testing → Experiment

| Experiment field | Multivariate mapping |
|---|---|
| Experiment type | `multivariate_testing` |
| Variants | Factor combinations, not just A/B pair |
| Hypothesis | Different factor combinations may affect readiness differently. |
| Evaluation | factor-level criteria, interaction caution, readability limits |
| Decision | choose candidate combination or reduce complexity |
| Extension need | Factor matrix, limit guardrails, complexity warning. Planning only. |

### Research Comparison → Experiment

| Experiment field | Research mapping |
|---|---|
| Experiment type | `research_comparison` |
| Variants | Research question, positioning, or interpretation options |
| Hypothesis | One interpretation/action is better supported by evidence. |
| Evaluation | evidence quality, relevance, confidence, limitations |
| Extension need | Evidence grading and qualitative synthesis. |

## Reusable vs. workflow-specific

| Layer | Reusable | Workflow-specific extension |
|---|---|---|
| IA/navigation | Campaigns → Comparison | none for planning |
| Form shell | guided input cards | variant fields/factor matrix |
| Review | assumptions/evidence/safety | variant completeness checks |
| Dashboard | cards, badges, executive summary | side-by-side comparison card layout |
| Export | existing export review | include comparison table in existing formats |
| Recommendation | next action region | choose/revise/collect evidence action types |

## Architecture Gate evaluation

No Architecture Gate is triggered.

The existing pattern is sufficient for planning. Future implementation may require a comparison-card component or factor-matrix input, but these are bounded extensions inside the existing design system, not redesign triggers.

## Implementation rule for future milestones

Future A/B Message Comparison implementation must start from Experiment Framework acceptance criteria. It must not bypass this mapping by creating a one-off A/B architecture.
