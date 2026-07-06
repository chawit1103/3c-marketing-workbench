# M11 Product Backlog

Status: M11 Continuous Product Validation & Synthetic Dogfooding complete.
Scope: Evidence-backed backlog only. This document does not implement new workflows, Creative Comparison, backend endpoints, runtime changes, SocialSense changes, or product redesign.

## Backlog prioritization

| Priority | Meaning |
|---|---|
| P1 | Fix before adding future capabilities. |
| P2 | Fix or explicitly accept before broader executive demo. |
| P3 | Improve usability/readability in planned polish. |
| P4 | Standardization and polish. |

## Backlog items

| ID | Priority | Backlog item | Reason | Evidence | Consumer benefit | Estimated effort |
|---|---|---|---|---|---|---|
| M11-B01 | P1 | Add explicit unknown run state for `/runs/:id`. | Invalid run IDs currently render Product Launch result. | QA route test: `/runs/unknown-run-id` showed “Product Launch Results.” | Prevents false executive decisions from wrong artifact. | M |
| M11-B02 | P1 | Add explicit unknown export state for `/exports/:id`. | Invalid export IDs render Product Launch export preview. | QA route test: `/exports/unknown-run-id` showed Product Launch executive summary. | Prevents false export readiness. | M |
| M11-B03 | P1 | Improve post-run result discoverability. | Results appear below fold after run. | UX/QA noted medium scroll friction across Product Launch, Campaign Message Test, and A/B Experiment. | Improves first-time task success and confidence. | S/M |
| M11-B04 | P1 | Add clear accessible validation for blank/invalid fields. | Invalid input can fail silently or with weak feedback. | QA/UX blank Variant A and blank campaign-name findings. | Prevents user confusion and false failure perception. | S/M |
| M11-B05 | P2 | Add `/workspace` alias or recovery path to Campaign Workspace. | Users guess `/workspace`. | QA wrong-route attempt; UX route expectation mismatch. | Improves workspace discoverability. | S |
| M11-B06 | P2 | Label fixture reference versus user-executed run state. | Workspace can imply all stages are completed from user action. | Research and PM concerns around fixture-completed vs user-executed-completed. | Improves evidence trust and executive interpretation. | M |
| M11-B07 | P2 | Add signal/confidence methodology panel. | Signal labels are safe but not operationally explained. | Research Analyst: no visible scoring rubric/sample basis/confidence derivation. | Improves research credibility. | M |
| M11-B08 | P2 | Clarify global Dashboard/Export navigation context. | Header links point to Product Launch sample-run. | QA/Research found potential wrong artifact interpretation. | Reduces wrong artifact review. | S/M |
| M11-B09 | P2 | Update Health page to current Campaign Workspace / M11 validation posture. | Health page heading remains older milestone framing. | Research and maintainability review flagged stale M7 readiness label. | Improves stakeholder confidence. | S |
| M11-B10 | P2 | Extract fixture registry and exact run/export lookup. | Heuristic substring fallback creates correctness risk. | Code Reviewer flagged `configForRunId` fallback behavior. | Makes future workflows safer to add later. | M |
| M11-B11 | P2 | Extract `src/views.tsx` into maintainable modules. | Large file concentrates route views, configs, validation, exports, workspace. | Code Reviewer: `src/views.tsx` >800 lines and growing. | Reduces future-change risk. | L |
| M11-B12 | P3 | Add scenario-specific next-test design details. | Recommendations are useful but repetitive. | PM/Research noted repeated “small approved test” language. | Increases operator actionability. | M |
| M11-B13 | P3 | Rename or clarify Export Review as Export Readiness Preview. | Current label may imply downloadable export. | Research/Safety noted preview-only wording is clear but nav label can overpromise. | Aligns expectations and governance. | S |
| M11-B14 | P3 | Add compact Decision Readiness card to workspace. | Evidence is useful but dense. | UX/Code Reviewer noted long page and reading burden. | Improves executive readability. | M |
| M11-B15 | P3 | Add recovery links to not-found page. | Wrong routes end in a dead end. | QA `/nope` and `/workspace` findings. | Reduces navigation frustration. | S |
| M11-B16 | P4 | Standardize readiness label taxonomy. | Readiness wording varies across pages. | UX friction register P4. | Improves product polish. | S |
| M11-B17 | P4 | Compact safety-label presentation after first view. | Safety is strong but visually repetitive. | UX first-time-user synthesis. | Reduces visual load while keeping governance. | S |

## Recommended sequencing

1. P1 correctness and task-completion fix: unknown run/export states, result focus, validation feedback.
2. P2 trust and maintainability: fixture registry, fixture-vs-user-run labeling, Health page freshness, navigation context.
3. P2/P3 research usefulness: signal methodology and scenario-specific next-test design.
4. P3/P4 polish: decision readiness card, not-found recovery, readiness taxonomy, safety-label compactness.

## Explicit non-goals

- Do not implement Creative Comparison from this backlog alone.
- Do not implement new marketing workflows.
- Do not modify SocialSense.
- Do not add backend endpoints unless a future milestone explicitly requires them.
- Do not redesign the product; treat this backlog as focused remediation and validation evidence.