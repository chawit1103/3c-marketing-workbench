# Campaign Reference Workflow

Status: M5 Campaign Message Test implemented as the second reference workflow.
Scope: Product-owned React/UI fixture workflow only. No backend, No live APIs, no credentials, no CRM/customer lists, no PII, no private messages/groups, no voter lists, no microtargeting, no persuasion optimization, no conversion guarantees, and no production campaign claims.
Architecture Gate: not triggered. Existing Workflow Pattern, Campaign Domain, Information Architecture, Navigation, Design System, Product Launch runtime pattern, and the public SocialSense adapter facade support this work.

## Decision

Campaign Message Test is available from the existing Workbench area at `/workbench/campaign-message-test` without changing the primary navigation model. The main navigation remains Home, Workbench, Dashboard, Export review, and Health.

The workflow proves reuse of:

- Workflow Pattern: Input / Review / Run / Dashboard / Executive Summary / Export Review / Recommended Next Action.
- Campaign Domain: campaign name or brand, campaign message, key message, tone, claim to review, context, audiences, and platform mix.
- IA and Navigation: second workflow is discoverable from Home/Workbench but does not add a new primary nav item.
- Design System: cards, forms, badges, buttons, grids, quick-start panel, assumptions preview, dashboard cards, safety labels, and export review.
- Product Launch reference implementation: same route resolver model, result fixture shape, dashboard composition, export review pattern, and safety language.
- SocialSense boundary: generated offline fixture uses `run_campaign_message_test(...)` through `integrations/socialsense/adapter.py`, which imports only the public facade.

## User workflow

Required M5 flow implemented:

1. Campaign Details
2. Audience
3. Platform Mix
4. Review
5. Run
6. Dashboard
7. Executive Summary
8. Export Review
9. Recommended Next Action

## Minimal inputs

Campaign Message Test keeps required inputs minimal and reused:

- Campaign name or brand
- Campaign Message
- Key Message
- Tone
- Claim to review
- Context notes
- Audiences
- Platform Mix

Validation requires only campaign name or brand, campaign message, and at least one platform. Tone, claim, key message, context, and audiences are review assumptions, not blockers.

## Result/dashboard/export behavior

M5 reuses the existing Product Launch result/dashboard/export review patterns:

- no new export formats;
- JSON readiness/status;
- Markdown readiness/status;
- Executive Summary readiness/status;
- safety labels and limitations visible before export review;
- generated offline result is displayed as an assumption-backed sample and is not recalculated from arbitrary browser-entered data;
- Dashboard and Export Review avoid internal platform terms as visible product copy.

## Safety posture

Campaign Message Test remains fixture/offline and aggregate only:

- No backend.
- No live APIs.
- No SocialSense browser call.
- No credentials.
- No CRM/customer lists.
- No PII.
- No private messages/groups.
- No voter lists.
- No microtargeting.
- No persuasion optimization.
- No conversion guarantees.
- No production campaign claims.

## KPIs

Product KPIs:

- Second reference workflow is usable from existing workbench navigation.
- Primary navigation count remains unchanged.
- Required fields stay minimal: 3 blocking requirements.
- Export formats remain unchanged: JSON, Markdown, Executive Summary.
- Product Launch regression remains covered by tests.

UX KPIs:

- One-click run with safe defaults.
- Workflow steps visible before interpretation.
- Dashboard uses marketing-friendly language and scannable cards.
- Safety labels visible on all routes.
- No internal-term leakage in visible primary UI tests.

Research KPIs:

- Output remains directional synthetic aggregate sample only.
- Evidence gaps, limitations, assumptions, uncertainty, and recommended next action remain visible.
- Message claim readiness is framed as substantiation review, not a verified claim.
- Recommendation is a small approved message-readiness test, not automated optimization.

## Reuse targets

- dashboard reuse >80%: achieved by reusing the same `ReferenceResults` rendering path, cards grid, platform/audience/risks sections, executive summary panel, and recommended next action structure.
- component reuse >80%: achieved by reusing AppShell, SafetyLabels, ObjectiveCard, form fieldsets, choice pills, assumptions preview, MetricCard, InsightList, ExportReview, buttons, badges, CSS tokens, and route shell.

## Files

Implemented files include:

- `src/views.tsx`
- `src/App.tsx`
- `src/app/routes/routeResolver.ts`
- `src/product/fixtures/campaignMessageTestResult.json`
- `scripts/generate_campaign_message_test_fixture.py`
- `integrations/socialsense/adapter.py`
- `src/App.test.tsx`
- `src/app/routes/routeResolver.test.ts`
- `tests/test_socialsense_adapter.py`
- `tests/test_product_launch_fixture_generator.py`
