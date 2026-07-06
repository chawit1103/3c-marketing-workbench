# M6 Experiment Consumer Mapping

Status: M6 Experiment Framework Planning draft.

Scope: documentation-only consumer mapping. This document does not implement A/B Message Comparison, Multivariate Testing, Creative Comparison, frontend routes, backend services, runtime behavior, SocialSense changes, live APIs, private data, CRM/customer data, PII, microtargeting, persuasion optimization, conversion guarantees, or production campaign automation.

## Purpose

Experiment should be a reusable business capability beyond one marketing workflow. This document maps current and future consumers.

## Current consumer

| Consumer | Status | Experiment use |
|---|---|---|
| 3C Marketing Workbench | Current | Compare campaign messages, headlines, offers, CTAs, creative concepts, and research options through safe human-reviewed workflows. |

Current available 3C workflows remain:

- Product Launch;
- Campaign Message Test.

M6 does not add A/B Message Comparison.

## Future consumers

| Future consumer | Applicability | Example experiment | Special constraints |
|---|---|---|---|
| Corporate Communication | High | Compare internal announcement headlines/messages. | Avoid employee scoring/private employee data. |
| Consumer Research | High | Compare positioning concepts or survey prompt variants. | Evidence quality and sampling caveats must be explicit. |
| Healthcare Communication | Medium/high | Compare patient education wording options. | No PHI; medical/legal review required before use. |
| Education Research | Medium/high | Compare learning message or outreach variants. | No student records; equity/interpretability caveats. |
| Public Sector Communication | Medium | Compare public-service message clarity. | No voter targeting or political persuasion. |

## Shared concepts across consumers

Every consumer can reuse:

- experiment objective;
- hypothesis;
- variants;
- evaluation criteria;
- evidence basis;
- assumptions;
- limitations;
- confidence statement;
- decision recommendation;
- export review;
- safety labels.

## Consumer-specific extensions

| Extension | Consumer | Planning note |
|---|---|---|
| Compliance/legal review | Healthcare, Corporate Communication, Offer Comparison | Add review requirement field in future implementation. |
| Qualitative evidence grading | Consumer Research, Education Research | Add evidence quality criteria before implementation. |
| Audience sensitivity notes | Healthcare, Education, Public Sector | Require stronger caveats and blocked actions. |
| Asset metadata | Creative Comparison | Future creative brief metadata, not M6 implementation. |

## Consumer readiness states

| State | Meaning | Allowed in M6? |
|---|---|---:|
| Current | Actively served by product. | 3C only |
| Future mapped | Good conceptual fit, no implementation. | Yes |
| Requires planning | Needs dedicated safety/product/research review before implementation. | Yes |
| Architecture Gate | Requires redesign or unsafe data mode. | Stop/escalate only |

## Safety boundaries for future consumers

Future consumers must not introduce:

- private records;
- CRM/customer lists;
- PII;
- employee/student/PHI records;
- private messages;
- voter lists;
- microtargeting;
- persuasion optimization;
- conversion guarantees;
- production/public claims.

If a future consumer requires any of these, the correct outcome is Architecture Gate escalation / no-go for implementation, not framework expansion.

## Recommendation

Experiment Framework has strong reuse potential across future communication and research consumers.

Next implementation candidate should remain **A/B Message Comparison**, but only after M6 receives GO and remains scoped to safe, offline, human-reviewed comparison.
