# M3 Campaign Consumer Mapping

Status: Drafted for M3 — Campaign Domain Planning.

Scope: consumer mapping only. No consumers, workflows, integrations, backend functionality, frontend UI, SocialSense changes, or live data handling are implemented.

## Purpose

Campaign Domain should serve 3C Marketing Workbench first while remaining understandable for future adjacent consumers. This document separates shared campaign concepts from domain-specific concepts so future products do not force premature redesign.

## Consumer list

| Consumer | Status | Primary need | M3 handling |
|---|---|---|---|
| 3C Marketing Workbench | Current | Executive marketing scenario planning and review. | Primary consumer. |
| Corporate Communication | Future | Internal/external communication message review and perception risk. | Map shared concepts; no implementation. |
| Healthcare Campaigns | Future | Patient/public-health communication planning with sensitivity constraints. | Add domain-specific safety fields later. |
| Education Campaigns | Future | Student/parent/community campaign planning and feedback. | Add education-specific audience/context later. |
| Consumer Research | Future | Product/concept perception and feedback research. | Add research evidence taxonomy later. |

## Shared concepts across consumers

| Shared concept | Why it is shared | Notes |
|---|---|---|
| Campaign | Every consumer has a bounded communication effort. | Root object. |
| Objective | Every consumer needs a clear purpose. | Keep one primary objective. |
| Message | Every consumer reviews communication content. | May be one message or variants. |
| Audience | Every consumer speaks to an audience. | Aggregate only; no PII/private data. |
| Platform/Channel Mix | Every consumer chooses where communication appears. | Planning cue, not live measurement. |
| Assumptions | Every consumer relies on context and beliefs. | Visible before interpretation. |
| Evidence | Every consumer needs a basis for review. | Fixture/offline unless later approved. |
| Limitations | Every consumer must know what cannot be concluded. | Mandatory. |
| Recommendation | Every consumer needs a safe next step. | Human-reviewed. |
| Export Review | Every consumer may need executive/report output. | Preview-only unless future implementation. |

## Domain-specific concepts

| Consumer | Domain-specific concepts | Why not shared by default |
|---|---|---|
| 3C Marketing Workbench | Offer, marketing KPI framing, campaign budget/constraints, marketing channel assumptions. | Core marketing planning extensions over shared Campaign concepts. |
| Corporate Communication | Stakeholder group, reputation risk, announcement sensitivity, internal/external channel. | Communication risk differs from marketing conversion framing. |
| Healthcare Campaigns | Patient/public group, medical claim sensitivity, clinical disclaimer, accessibility/health-literacy constraints. | Higher safety/privacy/compliance risk. |
| Education Campaigns | Student/parent/community group, learning outcome, institution policy, age sensitivity. | Education context and minors require special framing. |
| Consumer Research | Research question, sample definition, methodology note, qualitative theme taxonomy. | Research quality is stronger than campaign execution framing. |

## Consumer-specific safety posture

| Consumer | Safety sensitivity | Required future gate before implementation |
|---|---|---|
| 3C Marketing Workbench | Medium | Product/UX/Research/Safety review. |
| Corporate Communication | Medium-High | Reputation and stakeholder-sensitivity review. |
| Healthcare Campaigns | High | Health/privacy/compliance Architecture and Safety Gate. |
| Education Campaigns | High | Minor/student/privacy/safeguarding Safety Gate. |
| Consumer Research | Medium-High | Research ethics/evidence-quality review. |

## Consumer-to-workflow fit

| Workflow | 3C | Corporate Comms | Healthcare | Education | Consumer Research |
|---|---|---|---|---|---|
| Product Launch | Strong | Medium | Medium | Medium | Medium |
| Campaign Message Test | Strong | Strong | Strong with safety extension | Strong with safety extension | Strong |
| A/B Message Comparison | Strong with extension | Medium | High-risk; needs strict review | High-risk; needs strict review | Medium |
| Promotion | Strong | Low | High-risk; likely not default | Medium | Low |
| Campaign Response | Strong | Strong | Medium with compliance gate | Medium with safeguarding gate | Medium |
| Brand Awareness | Strong | Strong | Medium | Medium | Medium |
| Product Feedback | Strong | Medium | Medium with ethics gate | Medium with safeguarding gate | Strong |
| Research Campaign | Strong | Strong | Strong with compliance gate | Strong with safeguarding gate | Strong |

## Shared vs consumer-specific ownership

| Layer | Shared Campaign Domain | Consumer-specific extension |
|---|---|---|
| Campaign root | name, type, objective, audience, message, evidence, recommendation | consumer context and policy constraints |
| Objective | awareness, acceptance, comparison, feedback, perception, engagement | clinical, educational, reputation, research-specific objectives |
| Evidence | source label, confidence, limitations, evidence gaps | methodology, compliance, ethics, data-use constraints |
| Recommendation | safe next action | approval chain and domain-specific review |
| Export review | executive-readable summary and limitations | regulated disclaimers and stakeholder-specific format |

## Consumer adoption rules

1. 3C remains the primary consumer until another consumer milestone is explicitly approved.
2. Future consumers must map to Campaign Domain first; do not fork the domain prematurely.
3. Regulated/sensitive consumers require stronger Architecture/Safety Gates before implementation.
4. No future consumer can introduce CRM/customer/PII/private data by implication.
5. No future consumer can convert recommendation into automatic action without explicit approval.
6. SocialSense remains a dependency boundary and must not be modified in M3.

## Consumer value assessment

| Consumer | Shared value from Campaign Domain | Risk if not shared |
|---|---|---|
| 3C Marketing Workbench | Faster future workflow planning and consistent UX. | Workflow sprawl and inconsistent dashboards. |
| Corporate Communication | Reuse message/reputation/perception model. | Duplicated communication review features. |
| Healthcare Campaigns | Reuse campaign structure while adding compliance constraints later. | Unsafe generic marketing framing. |
| Education Campaigns | Reuse audience/message/evidence concepts while adding safeguarding constraints. | Inconsistent terminology and risk treatment. |
| Consumer Research | Reuse evidence/recommendation/export model. | Research workflows become disconnected reports. |

## Acceptance criteria

Consumer mapping is complete if current and future consumers are identified, shared concepts are separated from domain-specific concepts, safety-sensitive consumer extensions are gated, no implementation/integration is introduced, and 3C remains the current primary consumer.

## Recommended next milestone

If M3 receives GO, Campaign Message Test Planning can proceed for 3C only. Do not start Corporate Communication, Healthcare, Education, or Consumer Research implementation from this document alone.
