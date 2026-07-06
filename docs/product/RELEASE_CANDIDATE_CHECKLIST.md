# Release Candidate Readiness Checklist

Status: M16 Feature Freeze and Demo Readiness.
Candidate: 3C Marketing Workbench v0.1 controlled release candidate.
Architecture Gate: Not triggered.

## Workflows

- [x] Product Launch route works.
- [x] Campaign Message Test route works.
- [x] A/B Experiment route works.
- [x] Creative Comparison route works.
- [x] No new workflow is introduced during M16.

## Workspace

- [x] Campaign Workspace opens.
- [x] Current journey stage is understandable.
- [x] Recent runs are visible.
- [x] Evidence summary is readable.
- [x] Recommended next action is visible.
- [x] Executive Summary is reachable.
- [x] Export Readiness Preview is reachable.

## Tests and build

- [x] `npm run test` passes.
- [x] `npm run typecheck` passes.
- [x] `npm run lint` passes.
- [x] `npm run build` passes.
- [x] `python3 scripts/docs_smoke.py` passes.
- [x] `git diff --check HEAD` passes.
- [x] `python3 -m unittest discover -s tests -p 'test_*.py'` passes.
- [x] `PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py` passes.

## Documentation

- [x] Feature Freeze v0.1 is documented.
- [x] 5-minute demo script exists.
- [x] Demo workspace is documented.
- [x] Human dogfooding plan exists.
- [x] Feedback capture template exists.
- [x] Release candidate checklist exists.
- [x] README, Roadmap, Product Health Dashboard, and AGENTS reflect M16 status.

## Safety

- [x] Fixture/offline labels remain visible.
- [x] Synthetic aggregate outputs remain clear.
- [x] No live social data is claimed.
- [x] No CRM/customer data is requested.
- [x] No private messages are requested.
- [x] No prediction guarantee is claimed.
- [x] Not production campaign optimization remains clear.

## Trust

- [x] Unsupported run/export IDs still show unavailable states.
- [x] Export Readiness Preview is not described as a production download.
- [x] No workflow declares a winner without evidence.
- [x] Creative Comparison remains no-winner/inconclusive when evidence is synthetic.

## UX

- [x] Demo start path is clear from Campaign Workspace.
- [x] Current stage is clear.
- [x] Recommended next action is visible.
- [x] Safety copy does not overwhelm demo flow.
- [x] Primary navigation remains unchanged.

## Demo

- [x] Five-minute script can be followed.
- [x] Demo data is deterministic.
- [x] Demo can be repeated without external services.
- [x] Presenter can explain fixture/synthetic boundaries.

## Known limitations

- Text-only Creative Comparison; no image upload or generation.
- Browser-entered inputs are assumptions beside generated samples, not arbitrary live simulation.
- Export review is preview/readiness only, not a production file package.
- No persistence, authentication, or customer-data integration.
- No live APIs or production automation.

## Blocker list

| ID | Blocker | Severity | Owner | Status | Notes |
|---|---|---|---|---|---|
| RC-001 | None recorded after M16 validation | P3 | Orchestrator | Closed | Reopen this row only if QA/review/dogfooding identifies a real release blocker. |

## RC readiness decision

- Demo readiness: Ready for controlled executive walkthrough.
- Executive readability: Ready for review; demo script and workspace center executive status, summary, next action, and export readiness.
- Human dogfooding readiness: Ready for controlled human dogfooding using the documented tester roles, tasks, and feedback template.
- Feature freeze compliance: Compliant; M16 is docs/release-readiness only and blocks new workflow/backend/live/persistence/auth/private-data scope.
- Trust readiness: Ready for dogfooding; existing safety labels, fixture boundaries, and no-winner language remain required.
- Export readiness: Ready for preview review; existing Export Readiness Preview only, no new formats or production download.
- Known blockers: None recorded after validation.
- Release candidate readiness: Ready for controlled demo and human dogfooding after final review gates.
