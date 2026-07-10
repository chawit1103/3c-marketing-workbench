# M19 PR3 Platform Engagement Result Model

Status: M19 PR3 is implemented as a product-owned synthetic/offline platform engagement result model. M19 PR4 Executive Insight Dashboard is implemented in the current PR branch; PR5 report upgrade remains not started/blocked until a separate explicit kickoff.

Architecture Gate: Not Triggered.

Why: PR3 is delivered entirely inside 3C as a product-owned TypeScript result contract and deterministic fixture/data path over the current offline Workspace / Workbench. It does not require SocialSense changes, SocialSense public SDK/API/runtime changes, backend endpoints, persistence, auth, live APIs, scraping, credentials, CRM/customer data, PII/private data, microtargeting, persuasion optimization, production campaign claims, or real-user/live-engagement claims.

## Scope

PR3 adds a compact Platform Engagement Result Model to the existing dashboard/export surfaces. The current PR4 branch implements the separate Executive Insight Dashboard layer, while PR5 report upgrade remains out of scope.

Included:

- Product-owned TypeScript model: `src/product/platformEngagement.ts`.
- Deterministic derivation from current M19 PR2 `SimulationConfiguration` selected platforms, platform allocations, evidence depth, and configuration source.
- Platform metrics per selected/configured platform.
- Synthetic engagement metrics: synthetic participants, synthetic reach index, synthetic reaction index, synthetic comment count, and synthetic share-intent index.
- Synthetic comments.
- Themes.
- Cross-platform summary.
- Source/provenance/safety status that clearly says configuration-owned offline fixture, synthetic/offline, not live, not measured, and not a forecast.
- Compact integration into current result dashboard pattern and export review report preview.
- Thai default and English secondary user-visible copy.

Excluded:

- No PR4 dashboard redesign/upgrade was included in the historical PR3 slice.
- No backend endpoint.
- No persistence.
- No auth.
- No external services.
- No live platform APIs.
- No scraping.
- No credentials.
- No private data, CRM data, PII, voter lists, or private messages/groups.
- No SocialSense changes.
- No SocialSense public SDK/API/runtime changes.
- No duplicated SocialSense simulation engine logic inside 3C.
- No production campaign claims.
- No real-user or live-engagement claims.
- No measured engagement claim.
- No demographic truth claim.
- No prediction, accuracy, confidence, conversion, or lift guarantee.

## Result contract

`PlatformEngagementResult` contains:

- `modelVersion`: `m19-pr3-platform-engagement-result-v1`.
- `platforms`: one row per selected PR2 platform only.
- `syntheticComments`: deterministic synthetic comments tied to selected platforms.
- `themes`: `Message clarity`, `Trust proof needed`, and `Channel fit hypothesis`.
- `crossPlatformSummary`: platform count, total synthetic participants, average synthetic reach index, average synthetic reaction index, total synthetic comments, leading synthetic platform, and safe interpretation.
- `source`: provenance, runtime status, safety status, configuration source, evidence depth, and disclaimer.

## Deterministic fixture/data path

Input source is the current PR2 `SimulationConfiguration`:

- `selectedPlatforms` controls which platforms appear.
- `platformAllocations` controls synthetic participant counts and deterministic index values.
- `evidenceDepth` is copied into every platform metric and source metadata.
- `configurationSource` is copied into source metadata.
- `runtimeStatus` is held at `configuration_only`.

Unselected platforms are excluded even when allocation values exist in the configuration object. This prevents silent inclusion of channels the user did not select.

## Dashboard/export integration

Existing current surfaces are reused:

- Workbench run result preview shows the Platform Engagement Result Model below fixture transparency and before existing metric cards.
- `/runs/:runId` renders the same compact model.
- `/exports/:runId` includes a `Platform engagement result model` report section in the existing executive report preview.
- URL/caller payload carries the PR2 simulation configuration with edited assumptions for dashboard/export review only; it does not call a backend, service, or SocialSense runtime.

## Safety wording rules

Use approved safe wording:

- synthetic/offline;
- configuration-owned offline fixture;
- not live;
- not measured;
- not a forecast;
- human review before external use.

Avoid unsafe wording:

- live platform users;
- live API access;
- measured engagement;
- real users;
- demographic truth;
- prediction;
- accuracy guarantee;
- confidence guarantee;
- conversion guarantee;
- engagement lift guarantee;
- production campaign claim.

## Thai-first localization

Thai is the default UI language. PR3 visible copy is localized for the compact result panel and export report section. English remains the secondary language through the existing language selector.

Primary Thai terms:

- Platform Engagement Result Model = โมเดลผลการมีส่วนร่วมแพลตฟอร์ม
- Synthetic platform engagement results = ผลการมีส่วนร่วมแพลตฟอร์มเชิงสังเคราะห์
- Synthetic comments = คอมเมนต์สังเคราะห์
- Cross-platform summary = สรุปข้ามแพลตฟอร์ม
- configuration-owned offline fixture = ข้อมูลตัวอย่างออฟไลน์ที่เป็นของผลิตภัณฑ์

## Test coverage

PR3 tests cover:

- deterministic model derivation from selected platforms/configuration;
- unselected platforms excluded from engagement results;
- synthetic comments, themes, cross-platform summary, source/provenance/safety status present;
- forbidden live/measurement/guarantee claims avoided;
- all four workflows render/run current safe paths with the PR3 model surfaced;
- export review includes the PR3 model safely;
- Thai default and English switching localize PR3 content.

## KPI/status

- PR3 Platform Engagement Result Model: Implemented.
- M19 PR4 Executive Insight Dashboard: Implemented in the current PR branch.
- Architecture Gate: Not Triggered.
- SocialSense changes: None.
- Backend/live/API/persistence/auth changes: None.
