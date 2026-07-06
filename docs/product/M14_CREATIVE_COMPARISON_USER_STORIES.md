# M14 Creative Comparison User Stories

Status: M14 Creative Comparison Product Discovery & Specification.
Scope: documentation/discovery only. This document does not implement Creative Comparison, create frontend components, change runtime behavior, add backend endpoints, add APIs, add persistence, add authentication, redesign Campaign Workspace, modify SocialSense, or modify MarketingSimulation.
Architecture Gate: Not triggered.

## Personas

- Marketing Director
- Brand Manager
- Creative Lead
- Research Analyst
- Governance Reviewer
- Future Maintainer

## User Stories

| ID | Persona | Story | Acceptance signal |
|---|---|---|---|
| CC-US-01 | Marketing Director | As a Marketing Director, I want to compare two creative directions in one executive view so I can decide what to refine before budget review. | Result shows shared objective, dimensions, recommendation, and caveats. |
| CC-US-02 | Brand Manager | As a Brand Manager, I want brand consistency and message clarity called out so I can protect brand fit. | Dimensions include brand consistency and clarity with narrative rationale. |
| CC-US-03 | Creative Lead | As a Creative Lead, I want qualitative tradeoffs rather than a simplistic winner so the team can improve concepts. | No-winner/inconclusive state is first-class. |
| CC-US-04 | Research Analyst | As a Research Analyst, I want evidence basis, limitations, and confidence rationale so recommendations are auditable. | Evidence quality, gaps, confidence, and blocked actions are visible. |
| CC-US-05 | Governance Reviewer | As a Governance Reviewer, I want safety boundaries and blocked claims visible so outputs are not used as production proof. | No live execution, no conversion guarantees, no persuasion optimization. |
| CC-US-06 | Future Maintainer | As a Future Maintainer, I want implementation boundaries and fixture shape defined so future work is scoped. | M15 can plan without redesign or dependency changes. |

## Journey-linked stories

1. From Campaign Workspace, user can discover Creative Comparison as a future planning tool, not an implemented route.
2. User can review non-goals before run: no upload, no live APIs, no production scoring.
3. User can compare concepts with shared objective/audience/criteria.
4. User can understand why a result is inconclusive.
5. User can export only a review-ready future artifact preserving trust labels.

## Error and empty state stories

- As a user, if I provide one concept only, I need to know that at least two comparable concepts are required and why.
- As a user, if objectives differ, I need guidance to align the comparison before running.
- As a user, if I request asset upload/live scoring, I need a blocked state explaining that fixture mode does not support it.
- As a user, before any generated sample exists, I need an empty state that explains the review flow.

## Research and trust acceptance

- Stories must preserve synthetic/offline wording.
- Stories must allow no-winner/inconclusive outcomes.
- Stories must not require backend, API, persistence, auth, upload, SocialSense, or MarketingSimulation changes.
