# M14 Creative Comparison Information Architecture

Status: M14 Creative Comparison Product Discovery & Specification.
Scope: documentation/discovery only. This document does not implement Creative Comparison, create frontend components, change runtime behavior, add backend endpoints, add APIs, add persistence, add authentication, redesign Campaign Workspace, modify SocialSense, or modify MarketingSimulation.
Architecture Gate: Not triggered.

## Information Architecture

Creative Comparison belongs under Campaign Workspace as a future comparison tool, not as a primary navigation item. It should reuse Campaign → Journey → Workflow → Run → Report concepts already defined by M8-M13.

## Placement

| IA location | Decision | Rationale |
|---|---|---|
| Primary nav | Do not add | Avoid navigation sprawl and redesign. |
| Campaign Workspace | Future tool card | Campaign is the product anchor. |
| Workbench route family | Future candidate only | Implementation planning must decide route after design review. |
| Reports/Exports | Reuse Export Review pattern | Preserve existing trust controls. |

## Conceptual Data Model

| Object | Conceptual fields | Notes |
|---|---|---|
| CreativeComparisonSession | session_id, campaign_id, source_mode, created_at | Conceptual only, no persistence in M14. |
| CreativeConcept | label, description, primary_message, format_hint, assumptions | No asset upload in M14. |
| ComparisonCriteria | dimension, rationale, weight_hint | Planning cue, not statistical weighting. |
| AudienceContext | audience, platform_mix, campaign_objective | Shared across concepts. |
| ComparisonResult | dimension_findings, confidence, evidence_gaps, limitations, recommendation | Synthetic/offline generated sample only. |
| ExportReview | readiness, formats, safety_status, blocked_actions | Reuse existing pattern conceptually. |

## Comparison Dimensions

1. Message clarity.
2. Brand consistency.
3. Audience fit.
4. Objective alignment.
5. Emotional tone.
6. Distinctiveness.
7. Credibility/proof cues.
8. Channel fit.
9. Risk/compliance.
10. Evidence gap severity.

## Screen Inventory

- Campaign Workspace future action card.
- Creative Comparison boundary/introduction panel.
- Concept assumptions form.
- Criteria review panel.
- Result Preview / Dashboard.
- Executive Summary.
- Export Review.
- Recommended Next Action.

## Navigation Flow

```text
Home → Campaign Workspace → Future Creative Comparison card → Concept assumptions → Review → Run → Result Preview / Dashboard → Export Review
```

No new route is approved by M14. Future route design is conceptual and requires M15 implementation planning.

## Trust Boundaries

- No production asset library.
- No live creative scoring.
- No persistence or campaign history changes.
- No SocialSense public contract changes unless future planning proves they are necessary and safe.
- Existing unknown run/export unavailable states must remain intact.

## Future API considerations — conceptual only

A future API contract would need source_mode, fixture_id, session labels, comparable criteria validation, evidence gaps, confidence rationale, safety status, and export readiness. It must reject live/private data by default. No API is created in M14.

## Future persistence considerations — conceptual only

If future persistence is approved, it should store only reviewed non-sensitive campaign assumptions by default, with explicit retention, deletion, and audit rules. No persistence is created in M14.
