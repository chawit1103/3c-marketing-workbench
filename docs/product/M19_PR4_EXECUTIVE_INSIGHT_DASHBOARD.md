# M19 PR4 Executive Insight Dashboard

Status: PR4 was implemented in M19 PR4. PR5 is implemented separately as Executive Decision Brief in M19 PR5; PR6 closeout closes M19 as GO WITH CONDITIONS.

Architecture Gate: Not Triggered.

Why: PR4 is a frontend-only dashboard insight layer inside 3C Marketing Workbench. It reuses existing offline fixtures, PR1 user-entered assumptions propagation, PR2 submitted Simulation Configuration snapshot, and the PR3 Platform Engagement Result Model. It does not add backend endpoints, persistence, auth, external services, live platform APIs, scraping, credentials, private data, CRM/customer data, PII, voter/private data, microtargeting, persuasion optimization, production campaign claims, real-user/live-engagement claims, SocialSense changes, or SocialSense public SDK/API/runtime changes.

## Scope

Included:

- Product-owned TypeScript model: `src/product/executiveInsights.ts`.
- Executive Insight Dashboard surfaced in the current result dashboard pattern only.
- Executive Insight Cards derived deterministically from PR1 user-entered assumptions, PR2 submitted Simulation Configuration snapshot, PR3 Platform Engagement Result Model, and the existing offline fixture.
- Platform Comparison that includes selected PR3 platforms only and uses the submitted configuration snapshot after Run.
- Evidence Visualization showing provenance, synthetic/offline status, limitations, evidence gaps, and configuration-only status.
- Decision Guidance phrased as reviewed next-step guidance for human review, not campaign prediction, not persuasion optimization, and not a launch decision.
- Thai default and English secondary user-visible copy for new PR4 dashboard content.
- Regression coverage for all four existing workflows, assumptions propagation, configuration snapshot use, safe wording, localization, and no PR5/report redesign leakage.

Excluded:

- No PR5 report upgrade.
- No report redesign.
- No export redesign.
- No downloadable report generation.
- No backend endpoint.
- No persistence.
- No auth.
- No external services.
- No live platform APIs.
- No scraping.
- No credentials.
- No SocialSense changes.
- No SocialSense public SDK/API/runtime changes.
- No real-user or live-engagement claims.
- No measured engagement claim.
- No demographic truth claim.
- No prediction, accuracy, confidence, conversion, lift, or performance guarantee.
- No launch approval, budget approval, production campaign claim, microtargeting, or persuasion optimization.

## Result contract

`ExecutiveInsights` contains:

- `modelVersion`: `m19-pr4-executive-insight-dashboard-v1`.
- `insightCards`: executive-readable cards for review assumption snapshot, configuration scope, platform planning cue, and review readiness.
- `platformComparison`: one row per selected platform from the PR3 Platform Engagement Result Model, with synthetic participants, reaction index, reach index, and submitted configuration snapshot basis.
- `evidenceVisualization`: compact provenance, configuration status, limitations, and evidence gaps.
- `decisionGuidance`: reviewed next-step guidance with human review status and explicit safe next steps.
- `sourceSummary`: source inputs and synthetic/offline configuration-only limitations.

## Deterministic input path

PR4 uses only current offline product inputs:

1. PR1 user-entered assumptions shown for review.
2. PR2 submitted Simulation Configuration snapshot after Run.
3. PR3 Platform Engagement Result Model derived from selected platforms and platform allocations.
4. Existing offline fixture summary, readiness, limitations, evidence gaps, and recommended next test.

Unsubmitted edits after Run do not change the displayed PR4 dashboard insight layer or the dashboard/export payload. This preserves the same submitted snapshot behavior as PR3.

## Current dashboard integration

PR4 reuses the current result/dashboard surface:

- Workbench run result preview shows Executive Insight Dashboard after the PR3 platform engagement panel.
- `/runs/:runId` renders the same Executive Insight Dashboard from known offline fixtures and optional assumption/configuration payload.
- The Export Review surface remains the existing review surface; PR5 adds a separate Executive Decision Brief narrative there without backend, SocialSense, PDF/PPT/download, or workflow changes.

## Safety wording rules

Use approved safe wording:

- synthetic/offline;
- offline fixture;
- configuration-only;
- provenance;
- limitations;
- evidence gaps;
- reviewed next step;
- human review required;
- not live;
- not measured;
- not a forecast;
- not a launch decision.

Avoid unsafe wording:

- live platform users;
- live API access;
- runtime consumption;
- measured engagement;
- real users;
- demographic truth;
- prediction;
- accuracy guarantee;
- confidence guarantee;
- conversion guarantee;
- engagement lift guarantee;
- launch approval;
- production campaign claim;
- persuasion optimization;
- microtargeting.

## Thai-first localization

Thai is the default UI language. PR4 visible dashboard copy is localized for:

- Executive Insight Dashboard = แดชบอร์ดอินไซต์ผู้บริหาร
- Executive Insight Cards = การ์ดอินไซต์ผู้บริหาร
- Platform Comparison = เปรียบเทียบแพลตฟอร์ม
- Evidence Visualization = ภาพหลักฐาน
- Decision Guidance = คำแนะนำเพื่อการตัดสินใจ
- configuration-only = ตั้งค่าเท่านั้น

English remains the secondary language through the existing language selector.

## Test coverage

PR4 tests cover:

- PR4 insight cards are derived from PR1/PR2/PR3 inputs.
- Platform comparison includes only selected platforms and uses the submitted configuration snapshot after Run.
- Evidence visualization states synthetic/offline/provenance/limitations/configuration-only and no live API/runtime claim.
- Decision guidance does not predict performance, guarantee accuracy/confidence, or approve launch.
- All four workflows continue to render and run current safe paths.
- Thai default and English switching localize PR4 dashboard content.
- Existing user-entered assumptions remain intact.
- No report redesign/export PR5 scope leaks into PR4.

## KPI/status

- PR4 implemented: Executive Insight Dashboard is implemented in the current dashboard/result view.
- M19 PR5 Executive Decision Brief implemented; PR6 closeout closed as GO WITH CONDITIONS.
- Report/export redesign: not started.
- Architecture Gate: Not Triggered.
- SocialSense changes: None.
- Backend/live/API/persistence/auth changes: None.
