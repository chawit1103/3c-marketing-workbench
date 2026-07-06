# M11 UX Friction Register

Status: M11 Continuous Product Validation & Synthetic Dogfooding complete.
Scope: Friction register only. No implementation changes are authorized by this document.

## Severity definitions

| Severity | Meaning |
|---|---|
| P1 | Blocks trust, task completion, or executive correctness before next capability work. |
| P2 | High-value improvement needed before broader demo/use. |
| P3 | Usability/readability improvement. |
| P4 | Polish or consistency item. |

## Friction items

| ID | Severity | Description | Persona affected | Suggested resolution | Expected business impact |
|---|---|---|---|---|---|
| M11-F01 | P1 | Unknown `/runs/:id` renders valid-looking Product Launch results instead of an unsupported-run state. | QA / Power user, Marketing Director, Executive reviewer | Replace heuristic fallback with exact fixture registry and explicit run-not-found state. Add regression tests. | Prevents false executive review of wrong artifact; improves trust. |
| M11-F02 | P1 | Unknown `/exports/:id` renders Product Launch export preview instead of export-not-found. | QA / Power user, Governance reviewer | Use exact export/run registry and explicit export-not-found recovery state. | Prevents false export readiness and governance risk. |
| M11-F03 | P1 | Workflow result appears below fold after running; users may think nothing happened. | First-time user, Marketing Director | Auto-scroll/focus to result, or show sticky run-complete banner with result links above fold. | Improves task completion and reduces abandonment. |
| M11-F04 | P1 | Blank/invalid fields can fail silently or provide weak feedback. | First-time user, QA / Power user | Add inline accessible validation, focus invalid fields, and explain no-result states. | Raises confidence that workflows are reliable. |
| M11-F05 | P2 | `/workspace` guess route is not recognized. | First-time user, QA / Power user | Add `/workspace` alias/redirect or not-found recovery link to Campaign Workspace. | Improves discoverability and reduces wrong clicks. |
| M11-F06 | P2 | Campaign Workspace mixes fixture-completed status with user-executed completion. | Research Analyst, Marketing Director | Label runs as fixture reference, user assumption preview, generated run, reviewed artifact. | Prevents overinterpretation of fixture evidence as live/user-run evidence. |
| M11-F07 | P2 | Signal labels like “strong directional signal” and “low directional confidence” lack visible methodology/rubric. | Research Analyst, Marketing Director | Add “How this signal is derived” explanation: fixture basis, criteria, confidence meaning, upgrade path. | Improves research credibility and executive decision quality. |
| M11-F08 | P2 | Global Dashboard/Export nav points to Product Launch sample-run regardless of current workflow context. | First-time user, Marketing Director | Rename to sample dashboard/export or make current-run context explicit. | Reduces confusion and wrong artifact review. |
| M11-F09 | P2 | Product Health page still reads as older milestone readiness rather than continuous product validation. | Marketing Director, Future maintainer | Update health copy/status to Campaign Workspace + M11 validation posture in a focused follow-up. | Improves roadmap confidence and stakeholder trust. |
| M11-F10 | P2 | Large `src/views.tsx` concentrates workflow configs, workspace, dashboard, export, validation, and fixture selection. | Future maintainer | Extract workflow registry, fixture registry, workspace sections, ReferenceResults, ExportReview into reusable modules. | Lowers risk before adding future capabilities. |
| M11-F11 | P3 | Recommendation wording is safe but repetitive across scenarios. | Marketing Director, Research Analyst | Add scenario-specific next-test design: hypothesis, minimum evidence, success/failure criteria, owner. | Increases actionability without adding workflows. |
| M11-F12 | P3 | Export Review is clear but “Export review” can imply a downloadable artifact. | First-time user, Governance reviewer | Rename visible nav/heading to “Export readiness preview” or show disabled download with explanation. | Reduces expectation mismatch. |
| M11-F13 | P3 | Workspace is useful but dense; evidence and risks require reading effort. | Executive reviewer, First-time user | Add compact Decision Readiness card and progressive disclosure for detailed evidence. | Improves executive readability. |
| M11-F14 | P3 | Not-found page lacks recovery links. | First-time user, QA / Power user | Add recovery buttons to Home, Campaign Workspace, Product Launch, A/B Experiment. | Reduces dead-end frustration. |
| M11-F15 | P4 | Readiness labels vary: “Ready for review,” “Ready for human review,” “Preview ready for review.” | First-time user, Governance reviewer | Standardize readiness taxonomy. | Improves polish and consistency. |
| M11-F16 | P4 | Safety labels are strong but visually repeated across every page. | First-time user | Keep compact global labels; consider collapsible detail after first view. | Maintains safety while reducing visual load. |

## Register summary

| Severity | Count |
|---|---:|
| P1 | 4 |
| P2 | 6 |
| P3 | 4 |
| P4 | 2 |

## Architecture Gate assessment

No Architecture Gate triggered. These items should become backlog and follow-up validation/fix milestones; they do not require product redesign or SocialSense changes.