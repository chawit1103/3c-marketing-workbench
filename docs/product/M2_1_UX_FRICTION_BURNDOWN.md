# M2.1 UX Friction Burn-down — Product Launch

Status: Implemented for the existing Product Launch Simulation vertical slice.

Scope: Product Launch only. No Campaign Message Test, A/B Message Comparison, backend, live APIs, credentials, authentication, CRM/customer data, PII/private data, SocialSense changes, MarketingSimulation changes, or repo rename.

## Consumer benefit

Users can reach the first offline Product Launch result faster, understand that Product Launch is the current available workflow, and review result/export readiness with less cognitive load.

## UX KPI assumptions

| KPI | M2.1 assumption | How it is supported |
|---|---:|---|
| Time to first simulation | <60 seconds with defaults | The workbench opens with all sample defaults prefilled and a top quick-start run button. |
| Clicks to first result | 1 click from `/workbench` with defaults; <=6 even after small edits | User can click `Run offline simulation` immediately or edit up to five visible text inputs first. |
| Scroll depth before Run | 0 screens on standard laptop viewport target | Run action is in the top intro/quick-start card before the detailed form. |
| Required inputs | 3 validation requirements, <=5 visible editable text inputs | Required: Brand/Product, Campaign Message, at least one Platform. Offer, Key Message, and Context remain prefilled editable assumptions. |
| Cognitive choices per screen | <=3 primary decisions | Top screen presents: current Product Launch workflow, run with defaults, or edit assumptions. |

These are product/DOM assumptions, not measured analytics. Timed private-user walkthroughs remain a future validation step.

## Changes delivered

- Added top quick-start run action so users can run the offline sample before scrolling through the form.
- Replaced the disabled Objective dropdown with static Product Launch mode messaging.
- Added an immediate result preview hero with a clearer `Recommended next action` region.
- Kept safety boundaries visible globally and retained concise safety language in result/export contexts.
- Reworded export page to `Export Readiness Preview` and clarified it is preview/readiness only, not a download action.
- Shifted visible product positioning toward `Marketing Decision Workbench` in user-facing hero/brand copy while keeping the repo/package unchanged.
- Removed primary-UI display of internal SocialSense source wording from the export review.

## Acceptance mapping

| Requirement | M2.1 result |
|---|---|
| Run action visible early | Top quick-start panel contains `Run offline simulation`. |
| Product Launch objective clearly explained | Static Product Launch mode card/chip explains it is the current workflow. |
| Results discoverable after run | Result preview appears after run with dashboard and export-readiness links. |
| Safety labels remain visible | Global safety panel remains tested on every shell route; result/export keep concise safety notes. |
| No internal SocialSense terms in primary UI | Primary routes/tests reject internal technical terms and SocialSense display copy. |
| Export review says preview/readiness, not download | Page title/copy and format cards use preview/readiness language and explicitly say it is not a download action. |
| Recommended next action visible | Results hero starts with a `Recommended next action` region. |

## Remaining risks

- KPI values are still proxy assumptions from UI structure, not analytics instrumentation.
- Product Launch still uses a generated offline sample; browser-entered assumptions are not recalculated into a live simulation.
- Export remains a readiness preview only; adding real file generation needs a future safety-reviewed milestone.
