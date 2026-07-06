# Demo Workspace

Status: M16 Feature Freeze and Demo Readiness.
Dataset mode: stable deterministic fixture workspace.
Architecture Gate: Not triggered.

## Purpose

This document defines the repeatable demo workspace for 3C Marketing Workbench v0.1 release-candidate readiness.

## Demo data policy

The demo must use existing deterministic fixtures only.

The demo must not use:

- live data;
- customer data;
- CRM records;
- PII/private data;
- private messages;
- external APIs;
- credentials;
- image uploads;
- image generation;
- production campaign systems.

## Stable campaign context

Primary demo campaign:

- Campaign: Nimbus Go
- Theme: healthy lunch decisions for busy urban teams
- Audience: Working Adults, Urban Consumers, SME Owners
- Platform mix: Facebook, TikTok, LINE
- Review mode: fixture/offline, synthetic aggregate, human review required

## Stable demo routes

| Demo area | Route |
|---|---|
| Campaign Workspace | `/campaign-workspace` |
| Product Launch | `/workbench` |
| Campaign Message Test | `/workbench/campaign-message-test` |
| Creative Comparison | `/workbench/creative-comparison` |
| A/B Experiment | `/workbench/ab-experiment` |
| Creative Comparison result | `/runs/3c-m15-creative-comparison-reference-workflow` |
| Creative Comparison export review | `/exports/3c-m15-creative-comparison-reference-workflow` |
| Product Health | `/health` |

## Stable fixture files

| Workflow | Fixture |
|---|---|
| Product Launch | `src/product/fixtures/productLaunchResult.json` |
| Campaign Message Test | `src/product/fixtures/campaignMessageTestResult.json` |
| A/B Experiment | `src/product/fixtures/abExperimentResult.json` |
| Creative Comparison | `src/product/fixtures/creativeComparisonResult.json` |

## Demo reset expectations

Before a demo:

1. Start from clean `main`.
2. Run validation if time allows.
3. Do not edit fixtures during the demo.
4. Use safe defaults unless demonstrating validation messages.
5. If the browser has stale state, reload the route or reopen a clean tab.

## Determinism checklist

- [x] All demo screens are frontend/fixture-backed.
- [x] Demo routes are stable.
- [x] Run buttons reveal local generated sample results.
- [x] Export readiness uses existing preview formats only.
- [x] Safety labels are visible on demo routes.
- [x] No live API or external data dependency is required.

## Known demo limitations

- Browser-entered inputs are review assumptions beside generated offline samples; they do not trigger arbitrary live simulation.
- Export Review is a readiness preview and does not create a production-ready file package.
- Creative Comparison is text-only and does not handle image assets.
- Evidence is synthetic and directional only.
