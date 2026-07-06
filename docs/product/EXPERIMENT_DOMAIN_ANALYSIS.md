# M6 Experiment Domain Analysis

Status: M6 Experiment Framework Planning draft.

Scope: documentation-only domain planning. This document does not implement A/B Message Comparison, Multivariate Testing, Creative Comparison, runtime behavior, frontend routes, backend services, SocialSense changes, live APIs, private data, CRM/customer data, PII, microtargeting, persuasion optimization, conversion guarantees, or production campaign automation.

## Purpose

The Experiment Framework defines **Experiment** as a reusable business capability for 3C Marketing Workbench. A/B Message Comparison should become one configuration of Experiment, not an isolated product architecture.

M6 answers:

- What is an Experiment?
- Which concepts are shared across comparison workflows?
- Which decisions stay in 3C vs. SocialSense?
- Can the approved Workflow Pattern support experiment planning without redesign?

## Domain definition

An **Experiment** is a structured, human-reviewed comparison of two or more variants against a stated hypothesis, evaluation method, evidence basis, confidence note, and recommended next action.

An Experiment is **not**:

- automated persuasion optimization;
- a conversion guarantee;
- a production campaign engine;
- live platform measurement;
- a CRM/customer scoring workflow;
- a statistical significance claim unless a future approved data source and methodology explicitly support it;
- a SocialSense runtime redesign.

## Core domain concepts

| Concept | Definition | Required for all experiments? | 3C ownership |
|---|---|---:|---|
| Experiment | The umbrella comparison record: objective, hypothesis, variants, evaluation scope, decision, evidence, confidence, and recommendation. | Yes | Owns product-facing model and workflow framing. |
| Variant | A candidate message, headline, creative, CTA, offer, or combination to compare. | Yes | Owns product input/review shape and labels. |
| Hypothesis | The reason the variants are being compared. Example: “Trust-proof headline will improve readiness over clarity-first headline.” | Yes | Owns human-readable hypothesis framing. |
| Evaluation | The method used to compare variants: criteria, metrics, review basis, evidence source, and limitations. | Yes | Owns review UX and evidence transparency. |
| Comparison | The side-by-side interpretation of variant performance against evaluation criteria. | Yes | Owns comparison dashboard and executive summary. |
| Decision | The recommended direction: choose variant, revise, run small approved test, or collect more evidence. | Yes | Owns decision language and action boundaries. |
| Recommendation | The next safe business action after review. | Yes | Owns human-review next action copy. |
| Evidence | The material supporting the evaluation: assumptions, offline sample, research notes, field evidence if future-approved, and evidence gaps. | Yes | Owns evidence display and gap disclosure. |
| Confidence | The bounded certainty statement. For current workflows, this remains directional/offline/synthetic only. | Yes | Owns confidence language and caution labels. |

## Experiment lifecycle

```text
Define objective
↓
State hypothesis
↓
Define variants
↓
Select evaluation criteria
↓
Review assumptions, evidence, and limitations
↓
Run approved review mode
↓
Compare results
↓
Summarize executive decision
↓
Export review
↓
Recommend next action
```

This maps to the approved Workflow Pattern without redesign:

```text
Input → Review → Run → Result Preview / Dashboard → Executive Summary → Export Review → Recommended Next Action
```

## Shared questions every Experiment must answer

1. What decision is the operator trying to make?
2. What are the variants?
3. What is the hypothesis?
4. What criteria compare the variants?
5. What evidence exists?
6. What evidence is missing?
7. What assumptions limit interpretation?
8. What confidence level is appropriate?
9. What action should happen next?
10. What actions are explicitly not approved?

## 3C-owned responsibilities

3C owns the product/business layer:

- Experiment terminology and operator mental model;
- variant input/review UI plan;
- hypothesis and decision framing;
- dashboard and executive summary interpretation;
- evidence gaps, assumptions, limitations, confidence, and recommendation UX;
- export review and safety labels;
- workflow placement under Campaigns → Comparison;
- no-implementation boundaries for M6.

## SocialSense-owned boundary

SocialSense remains a dependency boundary. M6 does not require SocialSense changes.

SocialSense may remain responsible for future approved runtime/domain services such as:

- fixture/offline aggregate domain outputs;
- public SDK/domain pack surfaces;
- safety validation and provenance contracts;
- export contract payloads.

M6 does **not** request:

- SocialSense runtime changes;
- new SocialSense scenarios;
- new public APIs;
- private/internal imports;
- live data;
- customer/CRM/PII/private data paths.

## Evidence and confidence defaults

Current Experiment Framework confidence defaults:

- Directional only.
- Human-review required.
- Offline/sample unless a future approved milestone changes evidence mode.
- No production prediction.
- No conversion guarantee.
- No statistical significance claim.
- Evidence gaps visible before decisions.

## Architecture Gate evaluation

No Architecture Gate is triggered by this domain model.

| Gate trigger | M6 status |
|---|---|
| Workflow Pattern redesign | Not required. |
| Campaign Domain redesign | Not required. Experiment extends Campaign comparison use cases. |
| Navigation redesign | Not required. Experiments fit under Campaigns → Comparison. |
| Design System redesign | Not required. Existing forms/cards/dashboard/export patterns are sufficient for planning. |
| SocialSense runtime changes | Not required. |

## Acceptance criteria

- Experiment is defined as a reusable capability.
- Variant, Hypothesis, Evaluation, Comparison, Decision, Recommendation, Evidence, and Confidence are defined.
- 3C vs. SocialSense boundaries are explicit.
- Unsafe/live/production claims remain out of scope.
- No implementation is started.
