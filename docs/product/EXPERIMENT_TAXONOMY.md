# M6 Experiment Taxonomy

Status: M6 Experiment Framework Planning draft.

Scope: documentation-only taxonomy. This document does not implement A/B Message Comparison, Multivariate Testing, Creative Comparison, runtime behavior, frontend routes, backend services, SocialSense changes, live APIs, private data, CRM/customer data, PII, microtargeting, persuasion optimization, conversion guarantees, or production campaign automation.

## Purpose

The Experiment Taxonomy classifies future comparison workflows so they become configurations of one Experiment Framework rather than separate architectures.

## Taxonomy overview

| Experiment type | Primary variants | Shared framework fit | Unique concepts | Implementation status |
|---|---|---|---|---|
| A/B Message Comparison | Message A vs. Message B | High | Variant pair, message clarity/trust/tone criteria | Not implemented |
| Headline Comparison | Headline A vs. Headline B | High | Hook strength, clarity, executive tone | Not implemented |
| Creative Comparison | Creative asset concepts | Medium | Visual/message alignment, asset metadata, creative brief | Not implemented |
| CTA Comparison | Call-to-action variants | High | Action clarity, risk of overpromising, funnel intent | Not implemented |
| Offer Comparison | Offer/package/pricing-message variants | High | Offer constraints, eligibility caveats, legal review needs | Not implemented |
| Multivariate Testing | Multiple factors and combinations | Medium | Factor matrix, interaction caution, complexity control | Not implemented |
| Research Comparison | Research concepts or positioning options | Medium | Evidence quality, research question framing, qualitative synthesis | Not implemented |

## Shared concepts

All Experiment types share:

- Experiment objective;
- hypothesis;
- variants;
- evaluation criteria;
- evidence basis;
- assumptions;
- limitations;
- confidence statement;
- comparison dashboard;
- executive summary;
- export review;
- recommendation;
- safety boundaries.

## Unique concept classes

| Unique class | Used by | Planning implication |
|---|---|---|
| Variant pair | A/B Message, Headline, CTA, Offer | Simple two-column comparison can reuse dashboard cards. |
| Asset metadata | Creative Comparison | May need future metadata fields; no design-system redesign expected. |
| Factor matrix | Multivariate Testing | Requires complexity guardrails; likely extension to input/review, not architecture redesign. |
| Qualitative evidence synthesis | Research Comparison | Requires evidence grading and caveat emphasis. |
| Compliance/legal caveat | Offer, Healthcare, Education | Must show limitations and approval status before action. |

## Taxonomy tiers

### Tier 1 — Direct configuration

These should require minimal framework extension:

- A/B Message Comparison
- Headline Comparison
- CTA Comparison
- Offer Comparison

Pattern:

```text
Experiment + 2 variants + shared evaluation criteria + decision recommendation
```

### Tier 2 — Configured with bounded extension

These need additional fields or review sections but should not require architecture redesign:

- Creative Comparison
- Research Comparison

Pattern:

```text
Experiment + variants + extra evidence/metadata section + shared dashboard/export
```

### Tier 3 — Complexity-controlled extension

Multivariate Testing needs stronger planning controls:

- factor limits;
- variant combination limits;
- readability guardrails;
- no statistical significance claim by default;
- no automated optimization.

Pattern:

```text
Experiment + factor matrix + evaluation criteria + caution-heavy dashboard
```

## Relationship to Campaign Domain

Experiment is an extension of Campaign Domain, not a replacement.

Campaign Domain supplies campaign/business context, message/audience/platform mix, evidence, assumptions, limitations, recommendation concepts, and safety posture.

Experiment adds variants, hypothesis, comparison/evaluation, decision model, and confidence model for variant choice.

## Non-goals

M6 taxonomy does not authorize A/B workflow implementation, multivariate implementation, creative asset upload, live measurement, SocialSense runtime changes, or production optimization.

## Taxonomy decision

A/B Message Comparison should be treated as the **first likely implementation of Experiment**, not as a separate workflow architecture. Future comparison workflows should enter the roadmap only after mapping to this taxonomy.
