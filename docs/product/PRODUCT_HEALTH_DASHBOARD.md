# Product Health Dashboard

Status: Initial M1 PR1 baseline. This dashboard tracks product readiness for a docs-only PR and establishes the future measurement model.

## Summary

| Area | Current status | Target for M1 | Notes |
|---|---|---|---|
| UX simplicity | Yellow | Green by PR4 | PR1 defines 7-step flow; implementation not started. |
| Workflow completion | Not started | Measured by PR4 | No app scaffold yet. |
| Onboarding clarity | Yellow | Green by PR2/PR4 | Principles require safe sample scenario and boundary-first onboarding. |
| SocialSense integration health | Yellow | Green by PR3 | Contract identified; adapter not implemented in PR1. |
| Export readiness | Yellow | Green by PR4 | Export flow defined; product UI not implemented. |
| Dashboard readiness | Yellow | Green by PR4 | Executive dashboard requirements documented. |
| Test status | Green for PR1 | Green every PR | Docs smoke and diff checks only in PR1. |
| Safety posture | Green for PR1 | Green every PR | No app code, live APIs, credentials, PII, or external dependencies. |

## KPI baseline

| KPI | Baseline | Measurement method | Next target |
|---|---:|---|---:|
| Core workflow steps | 7 proposed | Product principles review | <=7 |
| Top-level product routes | 0 implemented | PR2 route review | <=5 initial routes |
| Required docs complete | 8/8 | Docs smoke | 8/8 |
| README doc links valid | Pending validation | Docs smoke | 100% |
| SocialSense public-surface use | Not implemented | PR3 adapter tests | 100% public facade |
| Unsupported export formats exposed | 0 | PR4 UI/export tests | 0 |
| Live API usage | 0 | Code review/tests | 0 |
| PII/CRM/private-data input paths | 0 | Code review/tests | 0 |
| Production/conversion guarantee claims | 0 intended | Copy review | 0 |

## UX simplicity tracker

Current PR1 target:

- One primary product concept: executive marketing scenario workbench.
- One proposed core flow: seven steps.
- Technical platform concepts are not primary UX copy.
- Old MarketingSimulation route sprawl is explicitly not repeated.

Risks:

- PR2 could over-scaffold routes before workflow is proven.
- Dashboard could become too dense if all SocialSense fields are rendered equally.

Mitigation:

- Use product principles as PR2/PR4 gates.
- Start with executive summary, assumptions, limitations, confidence/provenance, and export readiness.

## Workflow completion tracker

Current state: no app scaffold in PR1.

Future measurement:

- User starts safe sample scenario.
- User completes 7-step workflow.
- User reaches dashboard.
- User opens export review.
- User exports a supported format.

Future target:

- Private dogfooding completion rate >=80% for safe sample workflow before expanding features.

## Onboarding clarity tracker

Current PR1 baseline:

- README explains product purpose and boundaries.
- Product principles define boundary-first onboarding.
- Upload-first onboarding is discouraged.

Future target:

- First screen explains fixture/offline, synthetic aggregate mode before run.
- User can start with a reviewed sample scenario without uploading data.

## SocialSense integration health

Current PR1 baseline:

- SocialSense is reference-only and not modified.
- Public consumer contract identified:
  - `load_domain_pack`
  - `ConsumerSDK`
  - `DomainPack.run(...)`
  - `DomainPack.export(...)`
  - `runtime_annotation`
  - `dashboard_contract`

Future health checks:

- Adapter has no private imports.
- Contract tests use fixture/offline data only.
- Provenance, limitations, assumptions, and evidence gaps are preserved.
- Missing metadata fails closed.

## Export readiness

Current PR1 baseline:

- Export architecture defined.
- Supported initial formats: JSON, Markdown, executive JSON.
- Export review gate required.

Future health checks:

- Export button disabled until run and provenance are available.
- Export review shows boundaries and limitations.
- Unsupported formats are not shown.
- No client-side fallback bypasses SocialSense export safety.

## Dashboard readiness

Current PR1 baseline:

- Dashboard requirements documented.
- Old dashboard density and false-precision risks identified.

Future dashboard acceptance:

- Shows what was tested.
- Shows scenario result as directional/synthetic aggregate evidence.
- Shows source/provenance and fixture/offline mode.
- Shows assumptions, limitations, evidence gaps, and human review questions.
- Avoids conversion guarantees, live campaign claims, and production certainty.

## Test status

PR1 required:

- `git diff --check`
- Docs smoke test for required files and README links.

Future required:

- Unit tests for adapter mapping.
- Workflow tests for the 7-step flow.
- Export review blocking tests.
- Dashboard provenance rendering tests.
- Accessibility checks for core pages.

## Known risks

| Risk | Severity | Owner | Mitigation |
|---|---|---|---|
| Product copies old MarketingSimulation UX complexity | High | 3C | Audit and principles explicitly ban copying old UI/architecture. |
| Adapter needs SocialSense API not currently public | High | 3C + SocialSense | Stop and open dependency review; do not import internals. |
| Dashboard implies production prediction | High | 3C | Use directional language and provenance labels; block unsafe claims. |
| Export bypasses SocialSense safety | High | 3C | Mandatory export review and SocialSense `DomainPack.export(...)`. |
| PR2 adds too much scaffold | Medium | 3C | Keep PR2 shell minimal and testable. |
| No real dogfooding metrics yet | Medium | Product | Add after PR4 private walkthroughs. |

## Technical debt register

Current PR1 debt:

- No app scaffold or executable product tests yet by design.
- No adapter contract tests yet by design.
- README quick local plan is provisional until PR2.

Future debt to watch:

- Duplicated SocialSense contract models in frontend.
- Dashboard over-rendering raw platform fields.
- Export format drift from SocialSense contract.
- Route sprawl.

## Next milestone

Next milestone: PR2 safe app scaffold.

PR2 should deliver:

- Minimal app shell.
- Safety/boundary banner.
- Initial routes only.
- Placeholder 7-step workflow skeleton.
- Verified build/test commands.
- No SocialSense internals, live APIs, credentials, or production claims.

## PR1 acceptance criteria

- Health dashboard baseline exists.
- KPIs cover UX simplicity, workflow completion, onboarding, SocialSense integration, export, dashboard, tests, risks, and debt.
- Dashboard is honest about PR1 docs-only status.
