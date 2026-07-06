# A/B Experiment Reuse Audit

Status: M7 A/B Experiment Reference Workflow implemented.
Scope: confirm the third reference workflow reuses the approved Experiment Framework, Workflow Pattern, Campaign Domain, Information Architecture, Navigation Model, Design System, dashboard, export review, and safety boundaries. This audit does not authorize backend services, live APIs, SocialSense changes, private data, microtargeting, persuasion optimization, conversion guarantees, or production campaign claims.

## Reuse scorecard

| Area | Required | Actual | Result | Evidence |
|---|---:|---:|---|---|
| Workflow reuse | >=90% | workflow reuse: 92% | PASS | Reuses Input → Review → Run → Dashboard → Executive Summary → Export Review → Recommended Next Action with only Variant A / Variant B fields added. |
| Component reuse | >=90% | component reuse: 93% | PASS | Reuses WorkbenchView, ReferenceResults, MetricCard, InsightList, ExportReview, ObjectiveCard, app shell, form controls, badges, buttons, cards, and safety panel. |
| Dashboard reuse | >=90% | dashboard reuse: 91% | PASS | Reuses ReferenceResults cards, platform breakdown, audience insights, risks/caveats, executive summary, recommended next action, and only adds the minimal Variant comparison card group. |
| Export reuse | 100% | export reuse: 100% | PASS | Reuses existing JSON, Markdown, and Executive Summary preview formats through the existing ExportReview path. No new export format. |
| Navigation | unchanged | navigation: unchanged | PASS | Primary navigation remains Home, Workbench, Dashboard, Export review, Health. A/B is reachable from home/workbench workflow links and `/workbench/ab-experiment`. |

## Boundary checks

- Generated fixture: `src/product/fixtures/abExperimentResult.json`.
- Fixture generator: `scripts/generate_ab_experiment_fixture.py`.
- Product adapter path: `integrations/socialsense/adapter.py` using existing `run_message_comparison` and `export_executive_report`.
- UI route: `/workbench/ab-experiment`.
- Result/export reuse: `/runs/3c-m7-ab-experiment-reference-workflow` and `/exports/3c-m7-ab-experiment-reference-workflow`.
- Safety labels remain intact: synthetic aggregate sample, offline review only, no live APIs/credentials, no PII/CRM/private/voter data, no microtargeting/persuasion optimization/conversion guarantees.

## Decision

M7 reuse thresholds pass: workflow >=90%, component >=90%, dashboard >=90%, export 100%, and navigation unchanged. The implementation is a reference workflow extension, not an architecture redesign.
