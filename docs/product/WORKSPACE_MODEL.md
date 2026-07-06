# Workspace Model

Status: M8 Marketing Journey Framework complete and merged.
Scope: Documentation-only future workspace concept. This document does not implement workspace persistence, Creative Comparison, additional workflows, frontend routes, backend behavior, runtime functionality, live APIs, or SocialSense changes.

## Purpose

A future workspace should give users one place to understand a campaign journey instead of navigating isolated workflow runs. M8 defines the concept only so future implementation can reuse existing product foundations.

## Workspace concept

A workspace is a product-owned container for a marketing decision journey.

```text
Workspace
├── Campaign
├── Journey
├── Runs
├── Reports
├── Exports
├── History
└── Templates
```

## Workspace objects

| Object | Meaning | Current implementation status |
|---|---|---|
| Campaign | Shared campaign definition: objective, message, audience, offer, platforms, assumptions. | Concept exists through Product Launch / Campaign Domain; no workspace storage. |
| Journey | Ordered stages and current decision status. | Defined by M8 docs only. |
| Runs | Workflow outputs from Product Launch, Campaign Message Test, and A/B Experiment. | Existing generated offline fixtures; no persistent run store. |
| Reports | Executive summaries and decision narratives. | Existing dashboard / executive summary pattern. |
| Exports | Reviewed export readiness in supported formats. | Existing Export Review route; no new formats. |
| History | Decisions, caveats, revisions, and evidence gaps across stages. | Future concept only. |
| Templates | Reusable journey or workflow presets. | Future concept only. |

## Future workspace screen priorities

If implemented later, a workspace should show:

1. Campaign and Journey status.
2. Current stage and next recommended stage.
3. Evidence accumulated so far.
4. Open evidence gaps and uncertainty.
5. Recent workflow runs and decision outcomes.
6. Export / Handoff readiness.
7. Safety boundaries and non-production status.

## Workspace entry criteria

A workspace should be created only when at least one of these exists:

- campaign idea with business objective;
- Product Launch run;
- Campaign Message Test run;
- A/B Experiment run;
- reviewed executive decision package.

## Workspace exit criteria

A journey can be considered closed when:

- Executive Decision is recorded;
- Export / Handoff is reviewed;
- unresolved evidence gaps are accepted, deferred, or assigned;
- no workflow claims production launch, conversion guarantee, or automated targeting.

## Boundaries

M8 does not create:

- database schema;
- backend endpoint;
- frontend workspace route;
- account/auth/tenant model;
- live data import;
- new export format;
- SocialSense runtime change;
- Creative Comparison or any other additional workflow.

## Related M8 documents

- [Marketing Journey Analysis](MARKETING_JOURNEY_ANALYSIS.md)
- [Marketing Journey Model](MARKETING_JOURNEY_MODEL.md)
- [Journey Workflow Mapping](JOURNEY_WORKFLOW_MAPPING.md)
- [Workspace Model](WORKSPACE_MODEL.md)
- [Executive Journey](EXECUTIVE_JOURNEY.md)
- [Future Workflow Placement](FUTURE_WORKFLOW_PLACEMENT.md)

## Architecture Gate assessment

No Architecture Gate is triggered. The workspace model is compatible with existing IA and can remain a future product concept under Workbench / Reports / History without redesign.
