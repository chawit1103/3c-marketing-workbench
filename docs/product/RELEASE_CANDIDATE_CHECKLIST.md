# Release Candidate Readiness Checklist

Status: M16 Feature Freeze and Demo Readiness.
Candidate: 3C Marketing Workbench v0.1 controlled release candidate.
Architecture Gate: Not triggered.

## Workflows

- [ ] Product Launch route works.
- [ ] Campaign Message Test route works.
- [ ] A/B Experiment route works.
- [ ] Creative Comparison route works.
- [ ] No new workflow is introduced during M16.

## Workspace

- [ ] Campaign Workspace opens.
- [ ] Current journey stage is understandable.
- [ ] Recent runs are visible.
- [ ] Evidence summary is readable.
- [ ] Recommended next action is visible.
- [ ] Executive Summary is reachable.
- [ ] Export Readiness Preview is reachable.

## Tests and build

- [ ] `npm run test` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] `python3 scripts/docs_smoke.py` passes.
- [ ] `git diff --check HEAD` passes.
- [ ] `python3 -m unittest discover -s tests -p 'test_*.py'` passes.
- [ ] `PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py` passes.

## Documentation

- [ ] Feature Freeze v0.1 is documented.
- [ ] 5-minute demo script exists.
- [ ] Demo workspace is documented.
- [ ] Human dogfooding plan exists.
- [ ] Feedback capture template exists.
- [ ] Release candidate checklist exists.
- [ ] README, Roadmap, Product Health Dashboard, and AGENTS reflect M16 status.

## Safety

- [ ] Fixture/offline labels remain visible.
- [ ] Synthetic aggregate outputs remain clear.
- [ ] No live social data is claimed.
- [ ] No CRM/customer data is requested.
- [ ] No private messages are requested.
- [ ] No prediction guarantee is claimed.
- [ ] Not production campaign optimization remains clear.

## Trust

- [ ] Unsupported run/export IDs still show unavailable states.
- [ ] Export Readiness Preview is not described as a production download.
- [ ] No workflow declares a winner without evidence.
- [ ] Creative Comparison remains no-winner/inconclusive when evidence is synthetic.

## UX

- [ ] Demo start path is clear from Campaign Workspace.
- [ ] Current stage is clear.
- [ ] Recommended next action is visible.
- [ ] Safety copy does not overwhelm demo flow.
- [ ] Primary navigation remains unchanged.

## Demo

- [ ] Five-minute script can be followed.
- [ ] Demo data is deterministic.
- [ ] Demo can be repeated without external services.
- [ ] Presenter can explain fixture/synthetic boundaries.

## Known limitations

- Text-only Creative Comparison; no image upload or generation.
- Browser-entered inputs are assumptions beside generated samples, not arbitrary live simulation.
- Export review is preview/readiness only, not a production file package.
- No persistence, authentication, or customer-data integration.
- No live APIs or production automation.

## Blocker list

| ID | Blocker | Severity | Owner | Status | Notes |
|---|---|---|---|---|---|
| RC-001 | None recorded at M16 start | P3 | Orchestrator | Open for validation | Replace with real blockers found during validation/dogfooding. |

## RC readiness decision

- Demo readiness:
- Executive readability:
- Human dogfooding readiness:
- Feature freeze compliance:
- Trust readiness:
- Export readiness:
- Known blockers:
- Release candidate readiness:
