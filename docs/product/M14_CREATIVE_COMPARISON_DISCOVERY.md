# M14 Creative Comparison Discovery

Status: M14 Creative Comparison Product Discovery & Specification.
Scope: documentation/discovery only. This document does not implement Creative Comparison, create frontend components, change runtime behavior, add backend endpoints, add APIs, add persistence, add authentication, redesign Campaign Workspace, modify SocialSense, or modify MarketingSimulation.
Architecture Gate: Not triggered.

## Problem Statement

Marketing teams need a safe way to compare creative directions before production work begins. 3C currently supports Product Launch, Campaign Message Test, A/B Experiment, and Campaign Workspace. M13 confirmed Creative Comparison may enter planning, but implementation remains HOLD. The discovery problem is to define a trustworthy fixture/offline Creative Comparison workflow that fits existing Campaign Workspace patterns without implying live execution, production creative scoring, conversion prediction, or automated persuasion optimization.

## Goals

- Define Creative Comparison as a planning-only workflow concept inside Campaign Workspace.
- Reuse Experiment Framework, Campaign Domain, Workflow Pattern, safety labels, result transparency, dashboard/export review, and M12 trust conventions.
- Compare creative directions using a shared objective, shared audience assumptions, common evaluation criteria, and explicit no-winner/inconclusive outcomes.
- Make trust boundaries visible: Reference Fixture, User Review Session, synthetic generated sample, user assumptions, and no live execution.
- Prepare enough specification for a future implementation planning milestone, not implementation.

## Non-goals

- No Creative Comparison implementation.
- No frontend route, component, form, dashboard, or fixture generation code.
- No backend endpoints, APIs, persistence, auth, credentials, live services, uploads, asset storage, or export format changes.
- No Campaign Workspace redesign or primary navigation change.
- No SocialSense or MarketingSimulation modification.
- No live creative scoring, conversion guarantee, persuasion optimization, microtargeting, CRM/customer-data use, or production campaign recommendation.

## Personas

| Persona | Need | Trust risk to prevent |
|---|---|---|
| Marketing Director | Compare creative directions quickly before budget review. | Mistaking fixture evidence for production performance. |
| Brand Manager | Check creative alignment with campaign message and audience assumptions. | Treating subjective fit as measured winner. |
| Creative Lead | Understand why a concept is clearer, riskier, or more aligned. | Losing nuance to a single score. |
| Research Analyst | See evidence basis, limitations, and confidence rules. | Unsupported significance or lift claims. |
| Governance Reviewer | Confirm safety boundaries and blocked actions. | Production or persuasion claims. |
| Future Maintainer | Implement later without redesign or private dependency changes. | Scope creep into runtime/API/storage. |

## User Journey

1. User enters Campaign Workspace and sees Creative Comparison as a future planning tool.
2. User reviews purpose, boundaries, and fixture/offline mode.
3. User supplies or reviews two to three creative concepts as planning assumptions, not uploaded assets.
4. User reviews common objective, audience, criteria, and comparison dimensions.
5. User runs a future offline/generated sample only after validation confirms comparable inputs.
6. User sees result preview/dashboard with directional comparison, no-winner support, confidence, risks, evidence gaps, and recommended next action.
7. User opens export review that preserves assumptions, limitations, and no-live-execution labels.

## Comparison Dimensions

- Message clarity.
- Campaign objective alignment.
- Audience fit based on stated assumptions.
- Brand consistency.
- Distinctiveness / memorability.
- Proof or credibility cues.
- Emotional tone fit.
- Channel fit for planned platforms.
- Risk / compliance caveats.
- Evidence gap severity.

## Trust Boundaries

- Reference Fixture must be labeled separately from User Review Session.
- User-entered concepts are assumptions only.
- Generated sample outputs are synthetic aggregate planning evidence.
- No live execution, no creative upload processing, no platform API, no CRM/customer data, no private data.
- Recommendations are planning prompts for human review, not automated selection.

## Transparency Rules

- Every result must show source mode, fixture/offline state, evidence gaps, limitations, and blocked actions.
- If concepts are not comparable, show inconclusive/no-winner rather than ranking.
- If confidence is low, recommend refining inputs or collecting evidence.
- Do not imply statistical significance, lift, conversion forecast, or production readiness.

## Research Constraints

- Offline/synthetic evidence defaults to low or medium directional confidence.
- Comparison validity requires common objective, audience, criteria, and evidence basis.
- Recommendation gating must block winner language when evidence basis is incomplete.
- All claims require visible caveats and human-review framing.

## Fixture Requirements

A future fixture should include creative concept labels, objective, audience assumptions, platform assumptions, evaluation criteria, dimension narratives, evidence quality, confidence rationale, risks, limitations, evidence gaps, no-winner state, recommendation, export readiness, and provenance.

## Error States

- Missing creative concept.
- Fewer than two comparable concepts.
- Missing shared objective.
- Missing evaluation criteria.
- Non-comparable audience/platform assumptions.
- Unsupported asset/upload request.
- Unknown run/export ID must remain unavailable, not fallback.

## Empty States

- No creative concepts yet: explain required concept fields and examples.
- No comparison criteria yet: show default planning criteria as suggestions only.
- No generated sample yet: invite review of assumptions before run.
- No export yet: explain export review appears after a reviewed sample result.

## Accessibility Notes

- Comparison tables need semantic headings and row labels.
- Do not rely on color alone for winner/inconclusive/risk states.
- Result jump link should mirror M12 result visibility convention.
- Error summaries must be keyboard reachable and screen-reader readable.
- Side-by-side concepts need responsive stacking and explicit labels.

## Success Metrics

- User can explain fixture vs user session before using results.
- User sees no-winner/inconclusive option as normal.
- User can identify evidence gaps and blocked actions.
- Product/UX/Research reviewers approve planning-to-implementation readiness.
- No scope drift into runtime/API/storage/SocialSense changes.

## Future API considerations — conceptual only

A future API, if separately approved, would need explicit source labels, no-live-execution provenance, validation errors, comparable criteria, export safety validation, and no asset/customer-data ingestion by default. M14 does not approve or create an API.

## Future persistence considerations — conceptual only

A future persistence layer, if separately approved, would need tenant/privacy design, retention rules, asset handling decisions, deletion, auditability, and export governance. M14 does not approve or create persistence.
