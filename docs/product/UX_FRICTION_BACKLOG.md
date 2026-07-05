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
| UX-M2-001 | P1 | Run action and result confirmation are below the fold on laptop-height review. | M2.1 adds a top quick-start run action before the detailed form. | Verify top quick-start action and result preview in browser dogfood; consider sticky/collapse only if still needed. | UX/Product | M2.1 validation | User can run the default sample before scrolling through the full form. | Addressed in M2.1 / verify |
| UX-M2-002 | P1 | Locked Objective is a disabled dropdown that looks interactive. | M2.1 replaces disabled select with static Product Launch mode messaging. | Verify users understand Product Launch is the current available workflow. | UX/Product | M2.1 validation | User understands objective is intentionally fixed within 5 seconds. | Addressed in M2.1 / verify |
| UX-M2-003 | P1 | Results need a top-level decision/next-action summary. | M2.1 adds a Recommended next action region before detailed cards. | Verify the recommendation is concise, safe, and visible in first result view. | Product | M2.1 validation | Result dashboard starts with one safe, non-predictive executive action recommendation. | Addressed in M2.1 / verify |
| UX-M2-004 | P2 | Export review says formats are available, but there is no download/export action. | M2.1 renames route to Export Readiness Preview and states it is not a download action. | Verify users do not expect an actual file download. Real export remains future gated work. | Product/Safety | M2.1 validation | Users do not expect a download until one exists; unsupported export remains blocked. | Addressed in M2.1 / verify |
| UX-M2-005 | P2 | Technical export format labels are less executive-friendly. | M2.1 changes primary labels to Data preview, Briefing preview, and Executive summary preview while retaining format metadata in parentheses. | Verify executive users understand format intent. | UX/Product | M2.1 validation | Executive users understand what each format is for without needing technical knowledge. | Addressed in M2.1 / verify |
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

1. Validate M2.1 P1/P2 fixes with the same Product Launch dogfooding checklist.
2. If quick-start, static Product Launch mode, result preview, and export-readiness copy pass, keep remaining P2/P3 items as follow-up.
3. Only then consider whether Product Launch is stable enough to plan the next workflow.
