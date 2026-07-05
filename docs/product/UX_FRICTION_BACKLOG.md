# UX Friction Backlog — M2 Private Dogfooding

Status: Backlog created from M2 Product Launch Simulation dogfooding.

Scope rule: this backlog covers the existing Product Launch vertical slice only. Do not add new workflows until the Product Launch path is stable in private dogfooding.

## Prioritization scale

| Priority | Meaning |
|---|---|
| P1 | Should be addressed before expanding workflows |
| P2 | Useful refinement after P1s or alongside low-risk copy cleanup |
| P3 | Later hardening/research item |

## Backlog

| ID | Priority | Finding | Evidence | Proposed action | Owner | Proposed milestone | Acceptance criteria | Status |
|---|---:|---|---|---|---|---|---|---|
| UX-M2-001 | P1 | Run action and result confirmation are below the fold on laptop-height review. | `/workbench` screenshot/review showed long form before run button; result appears below setup. | Bring run action/result summary higher, add sticky action, or collapse setup after run. | UX/Product | M2 friction triage | User can see run action and result confirmation without excessive scrolling. | Open |
| UX-M2-002 | P1 | Locked Objective is a disabled dropdown that looks interactive. | Objective field is disabled but rendered as a select. | Replace with static “Product Launch mode” chip/card or clearer locked-state copy. | UX/Product | M2 friction triage | User understands objective is intentionally fixed within 5 seconds. | Open |
| UX-M2-003 | P1 | Results need a top-level decision/next-action summary. | Dashboard cards are readable but do not begin with a clear decision prompt. | Add a concise “What to do next” / “Recommended decision” summary before detailed cards. | Product | M2 friction triage | Result dashboard starts with one safe, non-predictive executive action recommendation. | Open |
| UX-M2-004 | P2 | Export review says formats are available, but there is no download/export action. | `/exports/sample-run` shows JSON/Markdown/Executive Summary available for review. | Change wording to “Preview available” or add a gated export action in a future safety-reviewed milestone. | Product/Safety | M2 or later export milestone | Users do not expect a download until one exists; unsupported export remains blocked. | Open |
| UX-M2-005 | P2 | Technical export format labels are less executive-friendly. | Export cards show JSON and Markdown directly. | Consider executive labels such as “Data file” and “Briefing draft” while retaining technical metadata. | UX/Product | M2 friction triage | Executive users understand what each format is for without needing technical knowledge. | Open |
| UX-M2-006 | P2 | Safety copy is clear but repeated often. | Safety panel, result caveats, export notes, limitations all repeat similar constraints. | Preserve critical labels but test progressive disclosure or compact repeated safety notes after first acknowledgement. | UX/Safety | M2 friction triage | Safety remains visible; completion time and perceived clutter improve. | Open |
| UX-M2-007 | P2 | Platform Breakdown wording sounds measured. | “2 aggregate sample interactions” can sound like real measured activity. | Reword to “sample platform cues/signals” or similar non-measured language. | Product/Safety | M2 friction triage | Users do not infer live social measurement from platform section. | Open |
| UX-M2-008 | P2 | Evidence gaps and limitations are complete but dense. | `/exports/sample-run` has long review metadata lists. | Group metadata under clearer headings or summarize first, details second. | UX/Product | M2 friction triage | Export review is scannable while preserving assumptions/evidence/limitations. | Open |
| UX-M2-009 | P3 | Accessibility/keyboard-only dogfood not yet performed. | M2 review used browser and DOM snapshots, not full keyboard-only or screen-reader checks. | Add focused accessibility dogfood pass for core routes. | QA/UX | M2 hardening | Keyboard-only user can complete Product Launch sample and reach export review. | Open |
| UX-M2-010 | P3 | Only one sample scenario exists. | Current Product Launch sample is Nimbus Go. | Add additional samples only after current Product Launch path is stable. | Product | Future scoped milestone | New samples do not add workflow complexity or weaken safety boundaries. | Deferred |

## Do-not-do-yet list

Do not use this backlog as approval to add:

- Campaign Message Test workflow;
- A/B Message Comparison workflow;
- backend services;
- persistence/workspaces;
- live APIs;
- credentials/auth;
- CRM/customer data;
- PII/private messages;
- production campaign execution;
- SocialSense API/runtime changes.

## Recommended immediate sequence

1. Address P1 friction items as small copy/layout UX improvements.
2. Re-run the same M2 dogfooding checklist.
3. Only then consider whether Product Launch is stable enough to plan the next workflow.
