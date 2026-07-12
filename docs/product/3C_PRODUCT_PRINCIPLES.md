# 3C Product Principles

Status: M1 PR1 product foundation. This document defines how the 3C Marketing Workbench should behave before app code is created.

## Product definition

3C Marketing Workbench is the official product app for executive marketing scenario work. It owns frontend UX, workflows, configuration, adapters, report framing, and executive experience.

SocialSense is the platform dependency. SocialSense owns the simulation engine, Marketing Domain Pack, ConsumerSDK, dashboard/export contracts, safety validation, provenance, and fixture/offline runtime behavior.

3C consumes SocialSense only through the approved top-level public SDK facade for the reviewed fixture/offline aggregate adapter:

- `from socialsense import create_research_session, export_run, load_domain_pack, run_scenario`

These four functions are the complete PR4 allowlist; private/non-public `socialsense.*` modules and live execution remain forbidden.

## Target user

Primary user: executive or senior marketing/business leader who wants to compare campaign/scenario assumptions safely before committing budget.

Secondary user: product/strategy/operator who prepares scenarios and exports evidence for executive review.

Not the primary user: simulation engineer, graph engineer, data scientist, or platform maintainer.

## UX-first principles

1. Business answer first
   - Start with the decision question, not the runtime mechanics.
   - Default dashboard should answer: what was tested, what changed, what is uncertain, and what a human should review next.

2. One primary path
   - The product should make one core workflow obvious.
   - Advanced comparison, settings, and audit details should not compete with first-run completion.

3. Safe sandbox by default
   - All M1/MVP work is offline, fixture-based, synthetic, aggregate-only, and non-production.
   - The UI must never imply live platform access, scraping, customer data, or production prediction.

4. Provenance visible everywhere
   - Every result, dashboard, and export includes source/provenance, assumptions, limitations, and safety boundaries.
   - If provenance is missing, export is blocked.

5. Executive language
   - Use marketing and decision language: scenario, audience segment, channel mix, expected sensitivity, confidence, limitations, review questions.
   - Avoid primary-copy terms such as ontology, Graph RAG, runtime, SDK, task ID, agent action type, and graph node.

6. Few inputs, clear defaults
   - MVP should work with preset/synthetic fixture scenarios before supporting any free-form or uploaded inputs.
   - Users should understand what is simulated and what is not before pressing Run.

7. No false precision
   - Prefer ranges, directional findings, confidence bands, and evidence gaps over exact conversion, ROI, or market-share claims.
   - Avoid language that guarantees outcomes.

## MVP workflows

MVP should include these workflows only after scaffold/implementation PRs are approved:

- Scenario setup from reviewed templates.
- Offline fixture simulation via SocialSense Marketing Domain Pack.
- Executive dashboard rendering from SocialSense dashboard contract.
- Scenario comparison for aggregate outputs.
- Export review and export via SocialSense-supported formats.
- Safety/provenance audit panel.

MVP should not include:

- Live platform API connection.
- Scraping.
- Credential storage.
- CRM/customer list uploads.
- PII ingestion.
- Private messages/groups.
- Voter lists.
- Individual profiling or microtargeting.
- Persuasion optimization.
- Conversion guarantees.
- Production campaign claims.

## Simple 7-step flow

1. Choose a safe scenario template
   - Example: product launch, brand awareness, campaign response, product feedback, promotion response.

2. Describe the business question
   - What decision is the user trying to make?

3. Select synthetic audience/channel assumptions
   - Use aggregate, preset, non-PII choices.

4. Review safety and data boundaries
   - Confirm fixture/offline, synthetic, aggregate-only mode.

5. Run offline simulation
   - 3C calls SocialSense public SDK/runtime only.

6. Review executive dashboard
   - Show summary, comparison, assumptions, limitations, confidence, and human review questions.

7. Review and export
   - User must inspect provenance/limitations before JSON, Markdown, or executive JSON export.

## Language rules

Use:

- “Offline simulation”
- “Synthetic aggregate outputs”
- “Scenario test”
- “Directional signal”
- “Evidence gap”
- “Human review required”
- “Export for executive review”

Avoid:

- “Predict conversion”
- “Guaranteed ROI”
- “Optimize persuasion”
- “Target individuals”
- “Live social listening”
- “Scrape audience data”
- “Import customer list”
- “Production campaign recommendation”

Translate technical platform concepts into product language:

- Domain Pack -> scenario pack
- Runtime annotation -> source/provenance note
- Dashboard contract -> dashboard data package
- Export safety validation -> export review gate
- Evidence gaps -> what we still do not know

## Product/platform responsibility test

Ask these questions before adding any feature:

1. Is this user-facing workflow, copy, routing, view state, or executive framing?
   - Owner: 3C product app.

2. Is this simulation runtime, domain pack logic, export validation, dashboard contract, safety validator, or SDK behavior?
   - Owner: SocialSense.

3. Does this require SocialSense public API/runtime changes?
   - Hard stop for PR1. Create a dependency request instead.

4. Does this require old MarketingSimulation implementation reuse?
   - Hard stop. Reference only; do not copy.

5. Does this require live data, credentials, scraping, CRM/customer lists, PII, private messages/groups, voter lists, microtargeting, persuasion optimization, misinformation workflow, or conversion guarantees?
   - Hard stop.

## Safety and trust principles

- Fail closed when provenance, safety metadata, or export validation is unavailable.
- Show clear non-production labels in dashboard and exports.
- Keep human review questions visible before any recommendation-like output.
- Use aggregate segment language only; do not expose individual-level synthetic profiles as targetable people.
- Preserve SocialSense limitations rather than rewriting them into stronger claims.
- Treat export as a controlled artifact, not an automated campaign instruction.

## PR1 acceptance criteria

- Product principles are documented before app scaffold begins.
- UX flow is seven steps or fewer.
- Product/platform responsibilities are explicit.
- Safety boundaries match SocialSense fixture/offline consumer contract.
- No app code, external dependencies, live APIs, or credentials are introduced.
