# Old MarketingSimulation UX Audit

Status: PR1 reference audit only. Evidence was inspected in `/Users/chawit/Projects/MarketingSimulation` and is used only to identify product/UX lessons. Do not copy UI, architecture, routes, or implementation into 3C Marketing Workbench.

## Audit scope

Inspected evidence:

- `frontend/src/router/index.js`
- `frontend/src/views/Home.vue`
- `frontend/src/views/MainView.vue`
- `frontend/src/views/SimulationView.vue`
- `frontend/src/views/SimulationRunView.vue`
- `frontend/src/views/ReportView.vue`
- `frontend/src/views/Dashboard.vue`
- `frontend/src/components/Step1GraphBuild.vue`
- `frontend/src/components/Step2EnvSetup.vue`
- `frontend/src/components/Step3Simulation.vue`
- `frontend/src/components/Step4Report.vue`
- `frontend/src/components/Step5Interaction.vue`
- `frontend/src/components/ExportButton.vue`

This audit is intentionally bounded. It identifies visible design risks from files/views and avoids claims about user analytics or production behavior that were not inspected.

## Executive finding

The old product contains many useful concepts, but the UX is overloaded for a 3C executive marketing workbench. It exposes implementation steps, platform mechanics, graph/RAG concepts, action logs, agent internals, technical API names, and multiple side workflows before users reach a simple business answer. 3C should keep the strategic intent but redesign the product as a small number of executive workflows around scenario setup, fixture/offline simulation, dashboard interpretation, and export review.

## Confusing flows

### Too many top-level routes compete for attention

Evidence: `frontend/src/router/index.js` defines routes for `/campaigns`, `/settings`, `/process/:projectId`, `/simulation/:simulationId`, `/simulation/:simulationId/start`, `/report/:reportId`, `/interaction/:reportId`, `/dashboard/:campaignId`, `/comparator`, `/impact`, `/budget-planner`, `/proof-of-value`, `/resources`, `/strategic-command`, `/calibration`, and `/war-room`.

Risk for 3C:

- A new user cannot infer the primary path.
- Decision-oriented routes, simulation routes, legacy process routes, and demo routes appear at the same level.
- Some routes sound like internal capabilities rather than jobs-to-be-done.

3C principle:

- One primary workflow first; advanced workspaces should be secondary and clearly labeled.

### The legacy process path mixes graph construction, simulation setup, reporting, and interaction

Evidence:

- `MainView.vue` declares `currentStep` as graph build, environment setup, simulation, report, and interaction.
- `Step1GraphBuild.vue` combines ontology generation, graph build, and simulation creation.
- `Step2EnvSetup.vue` handles simulation instance initialization, persona generation, configuration, platform timing, and agent parameters.
- `Step3Simulation.vue` renders detailed platform action timelines.
- `Step4Report.vue` renders generation workflow logs and report section progress.
- `Step5Interaction.vue` adds chat with report agent, chat with individual agents, and survey tools.

Risk for 3C:

- The flow asks a business user to understand system construction before value is visible.
- Steps are implementation-driven, not outcome-driven.
- Deep interaction with generated agents creates safety, trust, and expectation risks if not strongly bounded.

3C principle:

- Hide platform/runtime mechanics behind a clear scenario workflow and surface only aggregate, provenance-labeled outputs.

### Split graph/workbench layout can distract from the business answer

Evidence: `MainView.vue`, `SimulationView.vue`, and `ReportView.vue` use a `viewMode` switcher with `graph`, `split`, and `workbench` modes. Report and simulation views still carry GraphPanel wiring.

Risk for 3C:

- Persistent graph visualization suggests the graph is the product rather than the scenario decision.
- Executives may interpret technical graph objects as evidence quality.

3C principle:

- Keep technical provenance available, but default to executive summary, assumptions, limitations, scenario comparison, and export readiness.

## Too many steps and status details

Evidence:

- `Step1GraphBuild.vue` exposes three substeps: ontology generation, Graph RAG build, and build complete, including API notes such as `POST /api/graph/ontology/generate`, `POST /api/graph/build`, and `POST /api/simulation/create`.
- `Step2EnvSetup.vue` exposes simulation instance, generated personas, configuration, time periods, active hours, post/comment rates, response delay, activity level, sentiment tendency, and influence weights.
- `Step3Simulation.vue` exposes platform progress, available action lists, rounds, elapsed time, and chronological actions.
- `Step4Report.vue` exposes section generation progress, workflow timeline, tool calls, and report-agent logs.

Risk for 3C:

- Users can get stuck interpreting operational status instead of answering a marketing question.
- Technical progress details can make offline fixture simulations appear more authoritative than warranted.

3C principle:

- A simple 7-step product flow should use business language: choose scenario, describe campaign, choose channels, run offline fixture simulation, review dashboard, review limitations, export executive report.

## Technical language and implementation leakage

Evidence examples:

- `Step1GraphBuild.vue` shows API endpoint notes directly in the UI.
- `Step1GraphBuild.vue` uses terms such as ontology, entity types, relation types, schema types, Graph RAG, nodes, and edges.
- `Step2EnvSetup.vue` shows project ID, graph ID, simulation ID, task ID, agent configs, active hours, post/comment rates, influence weight, and sentiment bias.
- `Step3Simulation.vue` shows action-type concepts such as `CREATE_POST`, `QUOTE_POST`, `REPOST`, `LIKE_POST`, `SEARCH_POSTS`, `FOLLOW`, `UPVOTE_POST`, `DOWNVOTE_POST`, and `DO_NOTHING`.

Risk for 3C:

- 3C target users need business framing, not model/runtime internals.
- Unexplained internals lower trust because users may not know which fields are controllable, simulated, or evidence-backed.

3C principle:

- Use plain marketing and executive language. Keep SocialSense terms behind tooltips, audit panels, or developer docs.

## Weak dashboard areas for 3C use

Evidence:

- `Dashboard.vue` is a very large view with many concerns in one file and many visible modules: decision console, what-if sandbox, campaign brief, confidence evidence, KPI cards, timeline, action plan, and export data.
- The inspected dashboard includes business metrics such as revenue impact, crisis loss, market share shift, ROI, conversion probability, projected revenue, and confidence score.
- `ResultSourceBadge` is present, which is a good trust pattern, but the dashboard also presents numeric business impact and conversion-style fields that can be misread as real predictions.

Risk for 3C:

- Dashboard density may obscure the few metrics an executive needs.
- Conversion, revenue, ROI, and market-share figures need strict non-production, synthetic/fixture labeling or should be avoided until validated.
- If everything is shown at once, users may export before reading limitations.

3C principle:

- Dashboard must prioritize: scenario answer, confidence/provenance, assumptions, evidence gaps, recommended human review questions, and export readiness. Avoid conversion guarantees or production campaign claims.

## Unclear exports

Evidence:

- `ExportButton.vue` offers PPT, CSV, and quick client-side download.
- It posts to `/api/export/pptx` or `/api/export/csv` and falls back to a client-side CSV if the request fails.
- Export tracking includes source mode, but the UI flow inspected does not require a pre-export safety/provenance review.

Risk for 3C:

- Export fallback may produce a file even when server export fails, making provenance and completeness unclear.
- PPT/CSV affordances suggest finished executive output before the new 3C product defines report standards.

3C principle:

- PR1 architecture should define export as SocialSense-supported JSON, Markdown, and executive JSON only. Future product exports must include a mandatory review screen and preserve fixture/offline provenance, assumptions, limitations, and safety boundaries.

## Onboarding friction

Evidence:

- `Home.vue` contains a polished hero area, a workflow grid, feature cards, trust strip, and a legacy console.
- The legacy console asks users to upload files (`.pdf`, `.md`, `.txt`) and enter a simulation requirement before the internal graph/process flow begins.
- Primary entry points include demo dashboard, campaigns, and war room from the hero actions.

Risk for 3C:

- Upload-first onboarding is heavy for a first PR/MVP when 3C is restricted to offline fixture simulations and no customer lists or PII.
- Multiple CTA paths can split users before they understand the safe sandbox.

3C principle:

- First-run onboarding should start from a safe sample scenario and explain boundaries before asking for inputs. No upload/customer list flow in PR1 or MVP unless explicitly approved in a later safety review.

## What 3C should not repeat

- Do not expose SocialSense internals as primary UX.
- Do not make graph/RAG construction a required user concept.
- Do not present live-like timelines or private-message-like agent behavior as real social evidence.
- Do not default to upload-first onboarding.
- Do not create many top-level workspaces before the core workflow is proven.
- Do not ship export paths without a provenance/limitations review gate.
- Do not claim conversion lift, market-share prediction, ROI, or production campaign certainty.
- Do not mix public app code from SocialSense or MarketingSimulation into this repo.

## 3C UX acceptance criteria from this audit

- A new user can identify one primary workflow within 30 seconds of landing.
- The core flow is seven steps or fewer and uses business-language labels.
- Every dashboard/export screen displays fixture/offline, synthetic aggregate provenance.
- Technical terms such as ontology, graph, SDK, runtime, task ID, and agent action type are not primary copy.
- Exports require a review of assumptions, limitations, and disallowed use cases.
- No old UI implementation, route structure, or component architecture is copied into 3C.
