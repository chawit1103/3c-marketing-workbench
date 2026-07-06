# M14 Creative Comparison Implementation Plan

Status: M14 Creative Comparison Product Discovery & Specification.
Scope: documentation/discovery only. This document does not implement Creative Comparison, create frontend components, change runtime behavior, add backend endpoints, add APIs, add persistence, add authentication, redesign Campaign Workspace, modify SocialSense, or modify MarketingSimulation.
Architecture Gate: Not triggered.

## Purpose

This is an implementation plan for a future milestone, not implementation. M14 does not create code, routes, components, APIs, persistence, auth, or fixtures.

## Future M15 Planning Sequence

1. Reconfirm Product/UX/Research/Safety scope and non-goals.
2. Decide whether M15 is implementation planning only or implementation authorization.
3. If implementation is later authorized, write failing tests first for route visibility, input validation, result transparency, no-winner outcomes, export review, and safety copy.
4. Reuse existing workflow components and result/export patterns before adding new UI.
5. Keep Creative Comparison under Campaign Workspace without primary navigation redesign.
6. Generate any fixture through product-owned scripts and public adapter boundaries only if separately authorized.
7. Run QA, Code Review, Safety Review, Product Review, UX Review, and Research Review before merge.

## Work Breakdown for future implementation planning

| Workstream | Description | M14 decision |
|---|---|---|
| Product scope | Define exact Creative Comparison user value and boundaries. | Planning required. |
| UX design | Map assumptions, criteria review, result preview, dashboard, export review. | Planning required. |
| Research methodology | Define dimensions, evidence quality, confidence, recommendation gating. | Planning required. |
| Safety model | Preserve no live/private/production claims. | Mandatory. |
| Fixture model | Define sample payload shape. | Conceptual only now. |
| Runtime integration | Decide whether existing fixtures suffice. | Not authorized by M14. |
| Docs/tests | Define acceptance tests before implementation. | Required before code. |

## Proposed future task order

1. M15 planning PR: confirm final workflow scope, payload schema, route choice, and test plan.
2. M16 implementation PR, only if authorized: add tests first, then minimal fixture-backed UI.
3. M17 validation PR, if needed: dogfood Creative Comparison with personas before expansion.

## Technical Constraints

- No Campaign Workspace redesign.
- No primary navigation change unless future IA review explicitly approves.
- No backend/API/persistence/auth by default.
- No SocialSense runtime or MarketingSimulation changes.
- Maintain M12 unavailable-state behavior.
- Maintain M13 planning-vs-implementation distinction.

## Future API considerations — conceptual only

A future API might expose validation and result contracts only after security/privacy review. It must include provenance, source mode, evidence gaps, limitations, safety status, and export readiness. M14 creates no API.

## Future persistence considerations — conceptual only

A future persistence model might store non-sensitive campaign assumptions and comparison sessions only after retention, deletion, tenancy, audit, and privacy decisions. M14 creates no persistence.

## Review Gates for future implementation

- QA: regression behavior and accessibility smoke.
- Code Review: reuse, maintainability, no broad fallback.
- Safety Review: blocked data/claims remain blocked.
- Product Review: user value and readiness.
- UX Review: clarity, flow, and error states.
- Research Review: evidence quality, confidence, and recommendation integrity.
