# 5-Minute Executive Demo Script

Status: M16 Feature Freeze and Demo Readiness.
Demo mode: deterministic fixture-backed executive walkthrough.
Architecture Gate: Not triggered.

## Demo objective

Show that 3C Marketing Workbench can support a controlled executive review of one campaign across four existing workflows without live data, customer data, or production claims.

## Setup

Open the app locally and use existing deterministic fixtures only.

Recommended route sequence:

1. `/campaign-workspace`
2. `/workbench`
3. `/workbench/campaign-message-test`
4. `/workbench/creative-comparison`
5. `/workbench/ab-experiment`
6. `/runs/3c-m15-creative-comparison-reference-workflow`
7. `/exports/3c-m15-creative-comparison-reference-workflow`

## Minute-by-minute script

### 0:00-0:45 — Open Campaign Workspace

Open `/campaign-workspace`.

Narration:

> This is the Campaign Workspace. It brings together the approved v0.1 workflows: Product Launch, Campaign Message Test, A/B Experiment, and Creative Comparison. The workspace is designed for executive review, not live campaign automation.

Point out:

- campaign overview;
- current journey stage;
- recent runs;
- evidence summary;
- recommended next action;
- safety labels.

### 0:45-1:25 — Review campaign status

Stay on Campaign Workspace.

Narration:

> The current stage is Executive Decision. The tool shows that definition, message readiness, A/B evidence, and Creative Comparison evidence are ready for human review. It does not select a production winner or guarantee results.

Point out:

- current journey stage;
- evidence quality;
- blocked actions;
- handoff readiness.

### 1:25-2:00 — Run or inspect Product Launch

Open `/workbench`.

Narration:

> Product Launch is the reference workflow. It uses safe defaults and fixture-backed assumptions so a reviewer can reach the first result quickly.

Action:

- inspect inputs;
- optionally click `Run offline simulation`;
- show result preview if run.

### 2:00-2:35 — Run or inspect Campaign Message Test

Open `/workbench/campaign-message-test`.

Narration:

> Campaign Message Test reuses the same workflow pattern for message-readiness review. It remains offline and synthetic.

Action:

- show message input;
- show audience/platform assumptions;
- optionally run.

### 2:35-3:15 — Review Creative Comparison

Open `/workbench/creative-comparison`.

Narration:

> Creative Comparison compares two text-only creative concepts: Creative A and Creative B. No images are generated or uploaded in this MVP. The result is a cautious executive review, not a winner declaration.

Action:

- show Creative A and Creative B fields;
- click `Run offline simulation`;
- point out Creative Comparison Dashboard;
- point out `No winner selected / inconclusive`.

### 3:15-3:50 — Review A/B Experiment

Open `/workbench/ab-experiment`.

Narration:

> A/B Experiment provides a structured comparison frame using the approved experiment pattern. Like Creative Comparison, it uses synthetic evidence and blocks production winner selection.

Action:

- inspect Variant A / Variant B;
- show comparison methodology if run or existing result is opened.

### 3:50-4:30 — Open Executive Summary

Open `/runs/3c-m15-creative-comparison-reference-workflow` or use the Creative Comparison result after running.

Narration:

> The Executive Summary is designed to be readable by a decision-maker. It summarizes assumptions, caveats, confidence, and next action in cautious language.

Point out:

- executive summary;
- evidence notes;
- risks/caveats;
- recommended next action.

### 4:30-5:00 — Open Export Readiness Preview and explain safety boundaries

Open `/exports/3c-m15-creative-comparison-reference-workflow`.

Narration:

> Export Readiness Preview confirms review-ready JSON, Markdown, and Executive Summary previews. It is offline, fixture-backed, synthetic, not production campaign advice, and not a conversion prediction.

Point out:

- no downloadable production file is generated;
- fixture transparency;
- no live social data;
- no CRM/customer data;
- no private messages;
- no prediction guarantee.

## Demo close

Recommended close:

> v0.1 is ready for controlled human dogfooding. The next question is not which workflow to add next; it is whether real users can understand, trust, and use the four existing workflows in a five-minute executive review.

## Acceptance criteria

- [x] Demo fits five minutes.
- [x] Demo shows all four workflows.
- [x] Demo shows Campaign Workspace, Executive Summary, and Export Readiness Preview.
- [x] Demo explains safety, fixture, and synthetic boundaries.
- [x] Demo does not require live data or external APIs.
