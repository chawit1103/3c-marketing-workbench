# Workflow Pattern Guidelines

Status: Approved guidance from M2 Exit Review.

Applies to future 3C Marketing Workbench workflows after Product Launch.

## Official reusable pattern

Use this reusable pattern unless a future Architecture Gate explicitly approves a redesign:

```text
Input
↓
Review
↓
Run
↓
Result Preview
↓
Dashboard
↓
Executive Summary
↓
Export Review
↓
Recommended Next Action
```

Guideline refinement:

- Recommended Next Action must be visible immediately after run/result preview.
- It may also appear in dashboard and export-review context.
- It should never rely on production certainty, conversion guarantees, microtargeting, or private data.

## Pattern principles

1. **Start with safe defaults.** Users should be able to reach first result quickly without uploading data or connecting accounts.
2. **Show assumptions before run.** Every workflow must show what will be reviewed before the result appears.
3. **Keep the run action early.** The primary run button should be visible before deep scrolling.
4. **Keep results executive-readable.** Lead with summary, recommended next action, and caveats before dense evidence.
5. **Preserve safety labels.** Global safety labels remain visible; repeated contextual safety copy can be compact.
6. **Treat exports as review surfaces until real export is implemented.** Do not imply a downloadable file exists until a gated export milestone creates one.
7. **No route sprawl.** Future workflows should reuse Workbench, Dashboard, Export review, and Health patterns where possible.
8. **No premature workflow engine.** Extract reusable components after the second workflow proves repetition.

## Required sections per workflow

| Section | Required? | Guideline |
|---|---:|---|
| Workflow label | Yes | State the active workflow plainly. |
| Input fields | Yes | Keep first-run required fields ≤5 where possible. |
| Assumptions preview | Yes | Show what the user is about to review. |
| Run action | Yes | Visible early, preferably top-screen or one screen max. |
| Result preview | Yes | Show headline, concise summary, and recommended next action. |
| Dashboard cards | Yes | Use scenario-specific cards but keep executive labels. |
| Evidence/caveat sections | Yes | Cap visible density; summarize first, details later. |
| Executive summary | Yes | Non-predictive, human-review oriented. |
| Export review | Yes | Preview/readiness language until actual export exists. |
| Safety labels | Yes | Global + contextual; no production claims. |
| Error state | Yes | Field-specific and safe; no stack traces. |
| Loading state | Required for async flows | Not needed for current instant fixture run, but required before live/async runtime integration. |
| Empty state | Required for no-run/no-export routes | Explain how to start safely. |

## Input pattern

Inputs should be grouped as:

1. Workflow identity;
2. Editable scenario assumptions;
3. Audience or segment presets;
4. Channel/platform context;
5. Optional context notes.

Rules:

- Do not request CRM/customer lists or PII.
- Do not require credentials or platform handles.
- Do not imply live social data is connected.
- Keep technical platform terms out of primary UI labels.

## Review pattern

Each workflow must show:

- selected workflow;
- user-entered assumptions;
- audience/channel assumptions;
- explicit offline/fixture/synthetic boundary;
- note that browser inputs are assumptions unless a future runtime integration actually recalculates results.

## Run pattern

Run behavior should follow Product Launch:

- safe defaults available;
- one primary run action;
- no backend/live/API dependency unless a later architecture gate approves it;
- immediate result preview for fixture workflows;
- loading state required for future async workflows.

## Dashboard pattern

Dashboard must prioritize:

1. Result headline;
2. Short executive summary;
3. Recommended next action;
4. Scenario-specific metric cards;
5. Evidence/caveat sections;
6. Human-review and safety notes.

Avoid:

- raw platform payload dumps;
- measured-looking fixture counts;
- prediction/confidence claims without evidence;
- repeated dense safety text in every section.

## Executive Summary pattern

Every executive summary must include:

- what the offline sample suggests;
- what decision it supports;
- what evidence is missing;
- what human review is needed;
- what should not be claimed.

## Export Review pattern

Until real export exists, use:

- `Export Readiness Preview`;
- preview/readiness labels;
- no-download wording;
- visible assumptions, evidence gaps, limitations, sample basis, and safety labels.

Real download/export requires a separate reviewed milestone.

## Safety pattern

Every workflow must preserve these boundaries:

- fixture/offline mode;
- synthetic aggregate outputs;
- no live social data;
- no CRM/customer data;
- no private messages;
- no prediction guarantee;
- not production campaign optimization.

## Recommendation pattern

Recommended next action should be:

- safe;
- small;
- reviewable by a human;
- evidence-gathering oriented;
- non-predictive;
- not a production campaign instruction.

## Future workflow fit

| Workflow | Pattern use |
|---|---|
| Campaign Message Test | Reuse pattern directly with message-focused inputs. |
| A/B Message Comparison | Extend input/dashboard/recommendation for two variants. |
| Promotion Response | Reuse pattern directly with promotion/offer inputs. |
| Brand Awareness | Reuse pattern directly with awareness metric cards. |
| Product Feedback | Extend evidence taxonomy and qualitative feedback sections. |

## Do-not-implement-yet list

This guideline does not authorize implementation of:

- Campaign Message Test;
- A/B Message Comparison;
- Promotion Response;
- Brand Awareness;
- Product Feedback;
- backend;
- live APIs;
- credentials;
- authentication;
- CRM/customer data;
- PII/private data;
- SocialSense changes;
- MarketingSimulation changes.
