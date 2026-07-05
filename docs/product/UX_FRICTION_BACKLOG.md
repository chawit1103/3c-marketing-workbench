# UX Friction Backlog — M2 Private Dogfooding

Status: Backlog updated for M2.3 Product Launch copy/readability polish. Remaining Product Launch work is P3/accessibility or future sample expansion unless private dogfooding finds new P1 friction.

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
| UX-M2-006 | P2 | Safety copy is clear but repeated often. | M2.3 compacts result safety copy and consolidates caveats while preserving visible global/export safety labels. | Monitor in next private walkthrough; avoid removing hard safety labels. | UX/Safety | M2.3 | Safety remains visible; completion time and perceived clutter improve. | Addressed in M2.3 / monitor |
| UX-M2-007 | P2 | Platform Breakdown wording sounds measured. | M2.3 replaces measured-sounding count language with “Fixture channel cue only; use as a planning prompt, not measured live activity.” | Verify in browser smoke/next walkthrough. | Product/Safety | M2.3 | Users do not infer live social measurement from platform section. | Addressed in M2.3 / verify |
| UX-M2-008 | P2 | Evidence gaps and limitations are complete but dense. | M2.3 limits lower export lists to the first three review items and shortens dashboard caveats to four concise items. | Verify scannability in next walkthrough. | UX/Product | M2.3 | Export review is scannable while preserving assumptions/evidence/limitations. | Addressed in M2.3 / verify |
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

1. Validate M2.3 copy/readability polish in a quick browser smoke.
2. Keep UX-M2-009 accessibility dogfood and UX-M2-010 additional samples as future Product Launch hardening, not next-workflow approval.
3. Do not start Campaign Message Test or A/B Message Comparison implementation until the user explicitly authorizes that milestone.
