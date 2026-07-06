# M6 Experiment Data Model

Status: M6 Experiment Framework Planning draft.

Scope: documentation-only data-model planning. This document does not implement data structures in runtime code, A/B Message Comparison, Multivariate Testing, Creative Comparison, frontend routes, backend services, SocialSense changes, live APIs, private data, CRM/customer data, PII, microtargeting, persuasion optimization, conversion guarantees, or production campaign automation.

## Purpose

The Experiment Data Model defines reusable business objects for future comparison workflows. It is a planning contract, not executable schema.

## Core objects

### Experiment

| Field | Meaning | Owner |
|---|---|---|
| `experiment_id` | Product-owned identifier for review/reporting. | 3C |
| `experiment_type` | A/B message, headline, creative, CTA, offer, multivariate, research. | 3C |
| `objective` | Business decision to support. | 3C |
| `campaign_context` | Campaign/domain context from approved Campaign Domain. | 3C |
| `hypothesis` | Human-readable reason for comparison. | 3C |
| `variants` | Ordered candidate variants. | 3C |
| `evaluation` | Criteria, metrics, evidence mode, and limitations. | 3C owns UX; SocialSense may supply future approved outputs. |
| `decision` | Recommended direction and decision status. | 3C |
| `recommendation` | Next safe action. | 3C |
| `evidence` | Assumptions, evidence gaps, source labels. | Shared boundary; 3C displays, SocialSense may supply. |
| `confidence` | Bounded confidence statement. | 3C displays; SocialSense may supply technical provenance. |

### Variant

| Field | Meaning | Required? | Notes |
|---|---|---:|---|
| `variant_id` | Stable label such as A/B or V1/V2. | Yes | Human-readable in UI/export. |
| `name` | Operator label. | Yes | Example: “Clarity-first headline”. |
| `content` | Message/headline/CTA/offer/creative brief. | Yes | No private/customer data. |
| `variant_type` | message, headline, creative, CTA, offer, factor-combination. | Yes | Drives display plan. |
| `assumptions` | Variant-specific assumptions. | Yes | Visible before interpretation. |
| `constraints` | Legal/brand/claim constraints. | Optional | Especially for Offer/Healthcare/Education. |

### Evaluation

| Field | Meaning | Required? |
|---|---|---:|
| `criteria` | Evaluation criteria such as clarity, trust, tone, platform fit. | Yes |
| `metrics` | Directional review metrics or future approved measured metrics. | Yes |
| `evidence_mode` | offline sample, approved field evidence, research review, etc. | Yes |
| `methodology_note` | How comparison should be interpreted. | Yes |
| `limitations` | Method and data limits. | Yes |
| `evidence_gaps` | Missing proof needed before production decisions. | Yes |

### Metric

| Field | Meaning | Current default |
|---|---|---|
| `metric_name` | Executive-readable name. | e.g. Message Clarity |
| `metric_value` | Directional score/label if available. | Offline/sample only |
| `metric_basis` | Source/evidence basis. | Synthetic aggregate review |
| `interpretation` | Human-readable explanation. | Required |
| `risk_note` | Caveat or misuse warning. | Required for high-risk metrics |

### Decision / Recommendation

| Object | Field | Meaning |
|---|---|---|
| Decision | `decision_status` | choose, revise, inconclusive, needs evidence, do not use. |
| Decision | `winning_variant` | Optional; only if evidence supports a bounded choice. |
| Decision | `decision_reason` | Why the decision is recommended. |
| Decision | `confidence_level` | Low/medium/high directional confidence, not statistical unless future-approved. |
| Decision | `human_review_required` | Always true for current 3C workflows. |
| Recommendation | `recommended_next_action` | Next safe step. |
| Recommendation | `required_review` | Brand/legal/research/operator review needed. |
| Recommendation | `blocked_actions` | Actions not authorized, e.g. production campaign launch. |

### Evidence

| Field | Meaning |
|---|---|
| `source_label` | Offline sample, research note, approved field evidence, etc. |
| `assumptions` | Inputs treated as assumptions. |
| `evidence_gaps` | Missing evidence. |
| `limitations` | Known limits. |
| `provenance` | Source/runtime/review metadata if available. |
| `safety_labels` | Boundaries such as no live data and no PII. |

## 3C vs. SocialSense ownership

| Object/field | 3C responsibility | SocialSense responsibility |
|---|---|---|
| Experiment | Own product model, workflow, route planning, UX copy. | None in M6. |
| Variant | Own input/review/display model. | None in M6. |
| Evaluation | Own criteria framing and dashboard interpretation. | May supply future approved aggregate outputs through public API. |
| Metric | Own product label and executive interpretation. | May supply raw/domain output if future-approved. |
| Evidence | Own display, assumptions, gaps, limitations. | May supply provenance/safety payload in future approved runtime. |
| Confidence | Own bounded interpretation. | May supply source/confidence metadata if public contract supports. |
| Export review | Own product review experience. | May provide export contract through existing public boundary. |

## Object relationship

```text
Experiment
  ├── Campaign Context
  ├── Hypothesis
  ├── Variant[]
  ├── Evaluation
  │     ├── Metric[]
  │     ├── Evidence
  │     └── Confidence
  ├── Decision
  └── Recommendation
```

## Research methodology requirements

Every future Experiment must expose a minimum methodology note before any recommendation:

- shared objective across variants;
- same audience/context assumptions across variants;
- same evaluation criteria across variants;
- comparable evidence basis across variants;
- variant parity check, including whether one variant has richer evidence than another;
- tradeoff disclosure, not only winner selection;
- ambiguity handling;
- explicit “no winner / inconclusive” outcome when evidence is insufficient.

## Evidence quality rubric

| Quality dimension | Required check | Allowed interpretation |
|---|---|---|
| Source type | offline sample, research note, approved field evidence, or future approved source | Determines whether output is planning-only or can support stronger action. |
| Relevance | Evidence must match the same objective, audience, platform, and context as the Experiment. | Low relevance limits recommendation to revise or collect evidence. |
| Representativeness | Evidence must not imply population coverage when it is synthetic/sample-only. | Current M6 defaults remain directional only. |
| Recency/currentness | Evidence date/source freshness must be visible when applicable. | Stale or unknown evidence lowers confidence. |
| Completeness | Required criteria and variants must be evaluated consistently. | Missing criteria blocks winner selection. |
| Bias/limitations | Known source/model/operator limitations must be disclosed. | Material unresolved bias blocks production action. |
| Evidence gaps | Gaps must be listed before a recommendation. | Material gaps force inconclusive/collect-evidence recommendations. |

## Directional confidence rules

Current M6 planning defaults should normally produce **Low** or **Medium** directional confidence unless a future approved evidence source and methodology support more.

| Confidence | Criteria | Prohibited interpretation |
|---|---|---|
| Low | Synthetic/offline evidence only, material gaps, weak relevance, or incomplete variant parity. | No winner, no production action, no statistical claim. |
| Medium | Criteria are consistently applied, major assumptions are visible, and no material safety/compliance gap is unresolved. | Still not a production prediction or conversion guarantee. |
| High | Reserved for future approved evidence methodology with stronger source quality and review gates. | No high confidence in M6 offline planning by default. |

No statistical confidence, significance, lift, or conversion prediction is allowed unless a future approved methodology explicitly supports it.

## Recommendation gating matrix

| Evidence + confidence state | Allowed recommendation | Blocked recommendation |
|---|---|---|
| Low confidence or material evidence gaps | revise variants, collect more evidence, or mark inconclusive | choose winner, production launch, optimization |
| Medium directional confidence with no material safety gap | human-reviewed small approved test or candidate direction | conversion guarantee, automated optimization, production action |
| Safety/compliance caveat unresolved | required review or do not use | any launch/selection recommendation |
| Non-comparable evidence basis | normalize evidence, rerun review, or mark inconclusive | winner selection |
| Future approved stronger evidence | may support stronger recommendation only inside that future gate | bypassing safety/export review |

## Research acceptance criteria

Every future Experiment must show methodology note, evidence basis, limitations, evidence gaps, confidence rationale, tradeoffs, blocked actions, and recommendation gating before an executive recommendation is accepted.

## Safety constraints in the model

Every Experiment object must preserve no live APIs, credentials, CRM/customer lists, PII/private data, voter lists, microtargeting, persuasion optimization, conversion guarantees, or production campaign claims.

## Compatibility decision

The data model can be planned as an extension of the approved Campaign Domain. No Campaign Domain redesign or SocialSense runtime change is required for planning.
