# M19 PR5 Executive Decision Brief

Status: PR5 implemented on branch `m19-pr5-executive-decision-brief`. PR6 closeout remains blocked/not started.

Architecture Gate: Not Triggered.

PR5 is a frontend-only narrative report upgrade inside the existing export review surface. It does not require backend, SocialSense API/runtime changes, persistence, auth, external services, live platform APIs, or product architecture redesign.

## Scope

PR5 turns PR4 Executive Insight Dashboard outputs into a concise Executive Decision Brief inside `/exports/:runId` for known offline fixture runs.

The brief reuses:

- PR1 user assumptions;
- PR2 submitted simulation configuration snapshot;
- PR3 platform engagement result model;
- PR4 executive insights;
- existing export review;
- Thai-first i18n.

## Product-owned model

Source: `src/product/executiveDecisionBrief.ts`.

The helper is deterministic and bounded. It assembles:

- campaign context;
- current situation;
- platform findings;
- evidence;
- confidence;
- risks;
- limitations;
- decision options;
- recommended next action;
- synthetic/offline notices.

It consumes only product-owned frontend fixtures and already-submitted offline configuration/result objects. It does not call SocialSense, live APIs, backend endpoints, scraping, CRM/customer systems, or persistence.

## Required brief content

The Executive Decision Brief displays:

- user inputs;
- selected platforms;
- simulation profile;
- participant allocations;
- synthetic engagement summary;
- strongest directional fit;
- weakest directional fit;
- top themes;
- top concerns;
- executive KPI snapshot;
- decision blockers;
- next review step.

All content remains configuration-only, synthetic/offline, not live, not measured, and not a forecast.

## Decision options

The four decision options are exactly:

1. Proceed with review
2. Revise message/creative
3. Run another experiment
4. Hold for more evidence

Every option shows:

- evidence basis;
- confidence;
- limitations;
- blocked actions.

Blocked actions include launch approval, winner selection, conversion guarantee claims, budget approval from this brief alone, and production campaign activation. These are blocked actions, not supported outcomes.

## Thai-first localization

Thai remains the default language and English remains fully supported.

The UI renders dynamic fragments through structured fields and localization templates instead of raw English sentence concatenation. The Thai brief localizes primary labels, option labels, evidence labels, confidence labels, limitations labels, blocked-action labels, and synthetic/offline notices.

## Safety and non-goals

PR5 does not add:

- backend endpoints;
- persistence;
- auth;
- external services;
- live platform APIs;
- scraping;
- credentials;
- private data;
- CRM/customer data;
- PII;
- voter/private data;
- microtargeting;
- persuasion optimization;
- production campaign claims;
- real-user/live-engagement claims;
- SocialSense public SDK/API/runtime changes;
- new workflows;
- PDF generation;
- PPT or PowerPoint generation;
- download functionality.

The export review remains a preview/review surface only. It includes no PDF, no PPT, and no download action.

## Validation coverage

Tests cover that:

- the narrative reflects submitted assumptions and submitted configuration snapshot;
- decision options are cautious and include evidence/confidence/limitations/blocked actions;
- evidence/confidence/limitations are visible;
- Thai/English switching works;
- export review remains synthetic/offline;
- existing four workflows continue to render current result paths with executive insights;
- no report/download/PDF/PPT generation is added;
- no live/runtime/measured/winner/launch/conversion guarantee claims are introduced as supported outcomes.

## Current status

PR5 implemented on the current branch. PR6 closeout remains blocked/not started.

No SocialSense changes. No backend. No PDF/PPT/download generation. No PR6 work.
