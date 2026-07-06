# Feature Freeze v0.1

Status: M16 Feature Freeze and Demo Readiness.
Decision: Feature Freeze v0.1 is declared for 3C Marketing Workbench.
Architecture Gate: Not triggered.

## Purpose

3C Marketing Workbench now has enough functionality for a controlled release candidate, executive demo, and human dogfooding. M16 freezes product capability and shifts work from feature delivery to release readiness, trust, documentation, validation, and demo preparation.

## Frozen workflows

The following usable workflows are frozen for v0.1 release-candidate readiness:

1. Product Launch
2. Campaign Message Test
3. A/B Experiment
4. Creative Comparison

The following product shell capabilities are also frozen:

- Campaign Workspace
- Executive Summary
- Export Review / Export Readiness Preview
- Safety Labels
- Product Health Dashboard
- SocialSense public adapter boundary

## Allowed changes during freeze

Allowed M16 and v0.1 freeze work:

- demo readiness;
- UX polish that clarifies existing flows;
- copy polish;
- bug fixes;
- trust fixes;
- documentation;
- test coverage;
- deterministic demo data based on existing fixtures;
- human dogfooding preparation;
- release readiness checks;
- release-candidate blocker triage.

Allowed changes must preserve existing routes, existing workflow intent, safety labels, fixture/offline boundaries, and user-facing cautious language.

## Blocked changes during freeze

Blocked until a separate post-freeze milestone is explicitly authorized:

- new workflow;
- new backend;
- new SocialSense capability;
- new live API;
- persistence;
- authentication;
- CRM/customer data;
- PII/private data;
- production automation;
- private social data;
- image upload or image generation;
- persuasion optimization;
- microtargeting;
- conversion guarantees;
- workflow redesign;
- workspace redesign.

## Release scope

v0.1 release-candidate scope is a controlled, fixture-backed demo and dogfooding build that helps humans review marketing scenario assumptions and executive summaries.

It is not:

- a production campaign system;
- a conversion prediction product;
- a customer-data platform;
- a CRM integration;
- a live social listening system;
- an automated optimization engine.

## Rollback expectations

If a release-readiness change harms workflow clarity, safety copy, tests, or demo determinism:

1. Revert the specific readiness change.
2. Preserve the M15 four-workflow baseline.
3. Keep Feature Freeze v0.1 active.
4. Do not introduce replacement features as a rollback workaround.
5. Record the issue in the release-candidate blocker list or dogfooding findings.

## Acceptance criteria

- [x] Frozen workflows are explicit.
- [x] Allowed changes are release-readiness only.
- [x] Blocked changes prevent scope expansion.
- [x] Release scope is fixture/offline and human-review oriented.
- [x] Rollback expectations preserve M15 baseline.
