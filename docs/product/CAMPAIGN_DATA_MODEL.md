# M3 Campaign Data Model

Status: Drafted for M3 — Campaign Domain Planning.

Scope: conceptual data model only. No code, schemas, APIs, backend, frontend workflow, runtime behavior, or SocialSense changes.

## Purpose

The Campaign Data Model defines reusable business objects for future 3C Marketing Workbench workflows. It separates what 3C owns from what SocialSense may provide through approved public contracts in future milestones.

## Boundary summary

| Layer | Owner | M3 decision |
|---|---|---|
| Product/business model | 3C Marketing Workbench | Define now |
| Operator UX pattern | 3C Marketing Workbench | Reuse Product Launch pattern |
| Fixture/offline product docs | 3C Marketing Workbench | Define now |
| Public adapter boundary | 3C + SocialSense public SDK | Preserve existing boundary |
| SocialSense runtime internals | SocialSense | Do not modify |
| Live APIs/customer/private data | Not approved | Out of scope |
| Backend/persistence/auth | Not approved | Out of scope |

## Conceptual entities

### Campaign

| Field | Meaning | Owner | Required? | Notes |
|---|---|---|---|---|
| campaign_id | Stable identifier if persistence exists. | 3C | Future | Not implemented in M3. |
| name | Operator-facing campaign name. | 3C | Yes | Human-readable. |
| type | Campaign taxonomy type. | 3C | Yes | Product Launch, Promotion, etc. |
| objective | Primary objective. | 3C | Yes | One primary objective per run. |
| lifecycle_state | Draft/reviewed/planning etc. | 3C | Future | Defined conceptually only. |
| audience | Aggregate audience model. | 3C | Yes | No CRM/customer/PII/private data. |
| message_set | One or more messages/variants. | 3C | Conditional | A/B adds variants. |
| platform_mix | Channel/platform planning mix. | 3C | Yes | Planning cue, not measured performance. |
| assumptions | Operator-provided context. | 3C | Yes | Visible before review/run. |
| evidence | Evidence package. | 3C + SocialSense public boundary | Yes after run | Offline/synthetic unless future gate. |
| limitations | What cannot be concluded. | 3C | Yes | Mandatory. |
| recommendation | Human-reviewable next step. | 3C | Yes after run | No automated production action. |

### Message

| Field | Meaning | Owner | Notes |
|---|---|---|---|
| label | Variant label or primary-message label. | 3C | For A/B, e.g. Variant A/B. |
| text | Campaign-facing message. | 3C | Human-reviewed; no publish action. |
| tone | Optional tone guidance. | 3C | Helps UX/research review. |
| claim_type | Awareness, offer, proof, urgency, trust, etc. | 3C | Helps evidence model. |
| constraints | Brand/legal/compliance constraints. | 3C | Future planning. |

### Audience

| Field | Meaning | Owner | Notes |
|---|---|---|---|
| segment_name | Aggregate audience label. | 3C | No user-level data. |
| needs | Known needs or pain points. | 3C | Planning assumptions. |
| objections | Likely concerns. | 3C | Planning assumptions. |
| context | Market/usage context. | 3C | Human-entered assumption. |
| sensitivity_flags | Any special care required. | 3C | Healthcare/education/public comms need stronger gates. |

### Offer

| Field | Meaning | Owner | Notes |
|---|---|---|---|
| offer_text | Offer or incentive. | 3C | Required for promotion/retention. |
| urgency | Timing or deadline cue. | 3C | Must avoid manipulative framing. |
| eligibility | Who can use the offer. | 3C | Aggregate only. |
| constraints | Legal/brand/availability limits. | 3C | Future review. |

### Objective

| Field | Meaning | Owner | Notes |
|---|---|---|---|
| objective_type | Objective catalog entry. | 3C | Improve Message Acceptance, etc. |
| success_criteria | What useful review must answer. | 3C | Required. |
| unsafe_overclaims | Claims to avoid. | 3C | Required. |
| evidence_need | What evidence would increase confidence. | 3C + SocialSense boundary | Future approved evidence only. |

### Platform Mix

| Field | Meaning | Owner | Notes |
|---|---|---|---|
| channel | Channel/platform label. | 3C | LINE, LinkedIn, Facebook, email, offline, etc. |
| planning_weight | Directional planning weight. | 3C | Not live measured activity. |
| rationale | Why the channel is considered. | 3C | Human-readable. |
| risk | Channel-specific risk/limitation. | 3C | Required for safety/readability. |

### Evidence

| Field | Meaning | Owner | Notes |
|---|---|---|---|
| evidence_mode | fixture/offline/synthetic/approved future source. | 3C | Must be visible. |
| source_label | Where evidence came from. | 3C + public adapter | Current: generated offline fixture. |
| confidence | Directional confidence. | 3C + public adapter | Not predictive guarantee. |
| provenance | Trace of assumptions/source/method. | 3C + public adapter | Must survive export. |
| evidence_gaps | Missing evidence. | 3C | Mandatory. |
| limitations | Boundaries. | 3C | Mandatory. |

### Recommendation

| Field | Meaning | Owner | Notes |
|---|---|---|---|
| next_action | One recommended next step. | 3C | Human-reviewable. |
| rationale | Why this follows evidence. | 3C | Must reference evidence/limitations. |
| risk | What could go wrong. | 3C | Required for executive review. |
| approval_required | Whether human approval is needed. | 3C | Normally yes. |

## 3C vs SocialSense boundary

| Concept | 3C owns | SocialSense owns / may own later | Boundary decision |
|---|---|---|---|
| Campaign | Business object, UX, docs, workflow configuration. | None in M3. | 3C concept. |
| Message | Operator copy and variant semantics. | Future aggregate support if public contract exists. | 3C first. |
| Audience | Aggregate labels and assumptions. | Future aggregate scenario processing. | No private/user-level data. |
| Objective | Business objective and dashboard framing. | Future scenario mappings if approved. | 3C controls UX language. |
| Platform Mix | Planning channel cue. | Future aggregate model input/output if public. | Do not imply live measurement. |
| Evidence | Display, limitations, evidence gaps, executive framing. | Source/export/runtime if public adapter returns it. | Preserve provenance. |
| Recommendation | Product-facing next action. | Future generated candidate rationale if public. | 3C safety-reviews copy. |

## Non-goals

M3 does not define or implement database tables, API payloads, frontend state machines, backend services, SocialSense runtime schemas, live evidence ingestion, CRM/customer imports, private data processing, production campaign execution, or automatic recommendation execution.

## Product Launch compatibility

| Product Launch concept | Campaign Domain equivalent |
|---|---|
| Product / brand / launch context | Campaign name/type/context |
| Campaign message | Message |
| Audience segments | Audience |
| Platform mix | Platform Mix |
| Generated offline fixture | Evidence |
| Assumptions / limitations / gaps | Assumptions / Limitations / Evidence Gaps |
| Recommended next action | Recommendation |
| Export readiness preview | Export Review |

## Completeness checklist

- [x] Campaign root object defined.
- [x] Campaign type, objective, message, audience, offer, platform mix defined.
- [x] Evidence, limitations, assumptions, recommendations defined.
- [x] 3C vs SocialSense boundary documented.
- [x] Runtime/frontend/backend implementation excluded.
- [x] No Architecture Gate required.

## Recommended next milestone

If this model receives GO, Campaign Message Test Planning can map its fields to Campaign, Message, Audience, Objective, Evidence, and Recommendation. Do not implement Campaign Message Test from this model alone.
