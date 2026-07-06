# M14 Creative Comparison UX Flow

Status: M14 Creative Comparison Product Discovery & Specification.
Scope: documentation/discovery only. This document does not implement Creative Comparison, create frontend components, change runtime behavior, add backend endpoints, add APIs, add persistence, add authentication, redesign Campaign Workspace, modify SocialSense, or modify MarketingSimulation.
Architecture Gate: Not triggered.

## UX Principle

Creative Comparison should feel like an extension of the existing Input → Review → Run → Result Preview / Dashboard → Executive Summary → Export Review → Recommended Next Action workflow, not a new product architecture.

## User Journey

1. Discover — Campaign Workspace indicates Creative Comparison is a future planning capability after Product Trust GO.
2. Understand boundaries — User sees fixture/offline, synthetic, no live execution, and no production claim copy.
3. Input assumptions — User reviews creative concept names/descriptions, shared objective, audience, platforms, and criteria.
4. Review comparability — UI checks common objective, comparable concepts, and evaluation criteria before run.
5. Run generated sample — Future run is local/offline fixture-backed only.
6. Result Preview / Dashboard — Show dimension-by-dimension comparison, qualitative tradeoffs, no-winner state, confidence, limitations, gaps, blocked actions.
7. Executive Summary — Summarize planning recommendation and next evidence step.
8. Export Review — Preserve all trust labels and boundaries.
9. Recommended Next Action — Suggest refine, collect evidence, stakeholder review, or stop.

## UX Flow

```text
Campaign Workspace
  → Creative Comparison planning card
  → Boundary preview
  → Concept assumptions
  → Shared criteria review
  → Run generated sample
  → Result Preview / Dashboard
  → Executive Summary
  → Export Review
  → Recommended Next Action
```

## Navigation Flow

M14 does not add routes. Future conceptual navigation may use existing Workbench/Campaign Workspace placement:

- Campaign Workspace → Future Workflow Actions → Creative Comparison planning tool.
- Existing primary navigation remains unchanged.
- Unknown run/export behavior from M12 must remain fail-closed.

## Screen Inventory

| Future screen/section | Purpose | Required trust copy |
|---|---|---|
| Workspace entry card | Explain why Creative Comparison is available. | Planning-only, fixture/offline. |
| Boundary panel | Prevent misuse. | No live execution, no production scoring. |
| Concept input | Capture creative assumptions. | User-provided assumptions only. |
| Criteria review | Confirm comparable evaluation. | Shared objective/audience/criteria. |
| Result preview | Show immediate outcome. | Generated synthetic sample. |
| Comparison dashboard | Show dimensions and tradeoffs. | Directional, no statistical claim. |
| Executive summary | Explain decision readiness. | Human review required. |
| Export review | Preserve evidence and caveats. | Not a final production artifact. |

## Error States

- Missing concept A/B.
- Duplicate or vague concept labels.
- Missing shared objective.
- Criteria mismatch.
- Unsupported upload/live-source request.
- Unknown fixture/run/export state.

## Empty States

- No concepts: show examples and minimum inputs.
- No criteria: show suggested dimensions as editable assumptions.
- No result: show run prerequisites.
- No export: show export review requires generated sample.

## Accessibility Notes

- Each concept must have a visible heading.
- Error summary must precede the form after failed validation.
- Side-by-side comparisons must collapse into labeled stacked cards on narrow screens.
- Confidence/risk labels need text and icons, not color alone.
- Jump link to result preview should be included after run.
