# M2 Dogfooding Report — Private UX Friction Review

Status: M2 private dogfooding review completed for the existing Product Launch Simulation vertical slice.

Scope date: 2026-07-05.

Branch: `m2-private-dogfooding-ux-friction-review`.

## Executive summary

M2 dogfooding reviewed the existing Product Launch Simulation vertical slice only. No new workflow, backend, live API, credentials, authentication, CRM/customer data, private data, or SocialSense changes were introduced.

The Product Launch flow is usable for a private dogfood round. The main user value is clear: a non-technical user can open the workbench, review safe default launch assumptions, run the offline sample, inspect a results dashboard, and review export readiness with safety notes.

The primary friction is not functional failure; it is workflow clarity and information density:

- the run button sits below a long form on laptop height;
- result content appears below the form and may be missed without scrolling;
- a disabled Objective select looks interactive;
- export review says formats are available, but there is no download/export action yet;
- dashboard and export pages are trustworthy but text-heavy.

Recommendation: continue M2 as a friction-triage milestone. Do not add new workflows yet. Improve the current Product Launch path before Campaign Message Test or A/B Message Comparison.

## Scope and non-goals

### In scope

- Existing Product Launch Simulation vertical slice only.
- `/workbench` guided form and local offline run action.
- `/runs/sample-run` dashboard readability.
- `/exports/sample-run` export review usefulness.
- Safety label clarity.
- Executive summary usefulness.
- UX friction backlog creation.

### Out of scope

- New workflows.
- Backend or persistence.
- Live APIs or scraping.
- Credentials or authentication.
- CRM/customer data.
- PII or private messages/groups.
- Voter lists.
- Microtargeting or persuasion optimization.
- Conversion guarantees.
- Production campaign claims.
- SocialSense code/API/runtime changes.

## Methodology

Dogfooding used the local Vite app and browser automation as a proxy for a private user walkthrough.

Test server:

```text
http://127.0.0.1:5175/
```

Routes reviewed:

| Route | Purpose | Reviewed |
|---|---|---:|
| `/workbench` | Product Launch setup and local offline run | Yes |
| `/runs/sample-run` | Result dashboard | Yes |
| `/exports/sample-run` | Export review | Yes |

Console status:

- no JavaScript errors observed;
- only Vite connection/debug and React DevTools informational messages appeared.

Important evidence note:

- Browser automation `browser_click` did not trigger the React click handler in one run, while direct React handler dispatch showed results instantly.
- Existing UI tests already cover the click path.
- This is recorded as automation friction, not a user-facing blocker.

## Timing measurements

| Task | Observed / estimated time | Evidence source | Interpretation |
|---|---:|---|---|
| Open `/workbench` and see default form | Immediate after page load | Browser snapshot | Good first-load readiness |
| Run offline sample with default values | 1.8 ms handler-to-results by direct React dispatch | Browser performance measure | Runtime response is instant once event fires |
| Human completion with default sample | <1 minute estimated | Walkthrough observation | Good for demo/private dogfood |
| Human completion after thoughtful edits | 2–4 minutes estimated | Form length and input count | Acceptable, but long form creates friction |
| Navigate dashboard/export direct routes | ~1 ms programmatic route measurement | Browser performance measure | Route rendering is not a bottleneck |

## Measure-by-measure findings

### 1. Task completion time

Rating: **Green/Yellow**

The offline sample is fast. The user-facing completion time is dominated by reading and scrolling, not computation. The default sample supports quick private demos, but edited scenarios require reading five inputs, six audience choices, six platform choices, safety labels, and an assumptions panel before the run button.

Friction:

- run button is below the fold on laptop-height view;
- users may not realize the default sample is already sufficient to run;
- result appears below the long setup form.

### 2. User friction points

Rating: **Yellow**

Observed friction points:

1. The disabled Objective field looks like a selectable dropdown even though it is fixed.
2. Safety panel is clear but consumes the first screen before the user sees the form.
3. The relationship between browser-entered assumptions and the fixed generated sample requires repeated explanation.
4. Results are below the form, so users may need to scroll to confirm the run worked.
5. Export review has readiness/status, but no actual download/export action.

### 3. Confusing labels

Rating: **Yellow**

Potentially confusing labels:

| Label | Risk | Suggested future direction |
|---|---|---|
| Objective disabled dropdown | Looks editable but is locked | Replace with static “Product Launch mode” chip/card |
| Synthetic Purchase Intent | May sound like a forecast despite caveat | Consider “Directional purchase-interest signal” |
| JSON / Markdown / Executive Summary | Technical for executives | Show “Data file”, “Briefing draft”, “Executive summary” while preserving real format metadata |
| Available for review | May imply downloadable export exists | Clarify “Preview available” until actual export package exists |
| Platform Breakdown interaction counts | “2 aggregate sample interactions” sounds measured | Reword to “sample signal examples” or “sample platform cues” |

### 4. Dashboard readability

Rating: **Green/Yellow**

Strengths:

- card headings are plain language;
- executive summary is visible;
- assumptions are visible;
- risk/caveat language is explicit;
- dashboard does not claim predictive certainty.

Friction:

- dashboard is text-heavy after the first five cards;
- no one-line “recommended decision” appears before detailed cards;
- risk/caveat block is long and may be skipped;
- Platform Breakdown wording feels more technical than executive.

### 5. Executive summary usefulness

Rating: **Green/Yellow**

The summary is useful because it is short, non-predictive, and gives directional interpretation:

> The offline Product Launch sample shows a moderate positive signal with light positive signal and strong directional signal. Treat this as a planning prompt for human review, not a forecast.

Opportunity:

- add a future “Recommended next action” line before metrics;
- make the “light positive signal / strong directional signal” phrasing more specific to marketing decisions.

### 6. Safety label clarity

Rating: **Green**

Safety labels are prominent and understandable:

- Fixture/offline mode;
- Synthetic aggregate outputs;
- No live social data;
- No CRM/customer data;
- No private messages;
- No prediction guarantee;
- Not production campaign optimization.

Friction:

- repeated safety language is valuable for trust but competes with task content;
- later UX may need progressive disclosure after first acknowledgement while preserving always-visible critical warnings.

### 7. Export review usefulness

Rating: **Yellow**

Strengths:

- shows available review formats;
- includes executive summary preview;
- shows review assumptions, evidence gaps, limitations, sample source, confidence note, and safety labels;
- avoids unsupported production claims.

Friction:

- no actual export/download action exists;
- “Available for review” can be mistaken for “ready to download”;
- review metadata is complete but dense;
- JSON/Markdown labels are technically accurate but not executive-friendly.

## UX scorecard

| Area | Score | Rationale |
|---|---:|---|
| Task completion | 4/5 | Fast and complete with default sample; form length adds friction |
| Friction | 3/5 | Usable, but below-fold run/result and fixed objective need refinement |
| Label clarity | 3/5 | Mostly clear; some technical/locked-state labels confuse |
| Dashboard readability | 3.5/5 | Good cards; lower sections are text-heavy |
| Executive summary | 3.5/5 | Useful and safe; could be more decision-oriented |
| Safety clarity | 4.5/5 | Strong trust cues; repeated copy may dominate |
| Export review | 3/5 | Complete review view; lacks actual export package/action |

Overall private dogfood readiness: **GO WITH FRICTION BACKLOG**.

## Evidence summary

- `/workbench` rendered safety labels, Product Launch form, assumptions preview, and run action.
- Result section rendered offline executive summary, assumptions, dashboard/export links, cards, platform breakdown, audience insights, risks/caveats, and next test.
- `/runs/sample-run` rendered Product Launch Results dashboard without console errors.
- `/exports/sample-run` rendered export readiness, JSON/Markdown/Executive Summary statuses, assumptions, evidence gaps, limitations, sample source, confidence note, and safety labels.
- No JavaScript errors were observed.

## Architecture Gate assessment

No Architecture Gate was triggered.

The dogfooding review did not require or introduce:

- SocialSense API/runtime changes;
- backend/API service;
- new external dependency;
- authentication/authorization;
- credentials;
- live data;
- private/customer data;
- product vision change.

## Recommendation

Proceed with M2 friction triage using `docs/product/UX_FRICTION_BACKLOG.md`.

Do **not** add Campaign Message Test, A/B Message Comparison, backend, or live execution until the Product Launch path is easier to complete and interpret in private dogfooding.
