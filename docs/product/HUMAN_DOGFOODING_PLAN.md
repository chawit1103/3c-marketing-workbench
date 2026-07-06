# Human Dogfooding Plan

Status: M16 Feature Freeze and Demo Readiness.
Purpose: prepare controlled human dogfooding for v0.1 release-candidate readiness.
Architecture Gate: Not triggered.

## Objective

Evaluate whether target users can understand, trust, and complete the existing 3C Marketing Workbench workflows without adding new product capability.

## Target testers

1. Marketing Manager
2. Digital Marketer
3. Brand Manager
4. Executive / CEO
5. First-time non-technical user

## Test environment

- Use local or controlled demo build only.
- Use deterministic fixtures only.
- No live data.
- No customer data.
- No external APIs.
- No credentials.
- No production advice.

## Required tasks

Each tester should attempt these tasks:

1. Open Campaign Workspace.
2. Explain the current campaign status in their own words.
3. Complete or inspect Product Launch.
4. Run Campaign Message Test.
5. Compare Creative A/B in Creative Comparison.
6. Review A/B Experiment.
7. Understand Campaign Workspace evidence summary.
8. Open Executive Summary.
9. Open Export Readiness Preview.
10. Explain safety / fixture / synthetic boundaries.

## Persona-specific observation focus

| Tester | Primary observation focus |
|---|---|
| Marketing Manager | Can they see what decision should happen next? |
| Digital Marketer | Can they understand channel/audience assumptions and comparison caveats? |
| Brand Manager | Can they judge brand/message clarity without expecting production claims? |
| Executive / CEO | Can they extract an executive answer in under five minutes? |
| First-time non-technical user | Can they use the flow without explanation? |

## Facilitation rules

- Do not explain the UI before first attempt unless the tester is blocked.
- Ask the tester to think aloud.
- Record confusion verbatim.
- Do not correct trust misunderstandings immediately; observe them first.
- Stop the session if the tester tries to use private/customer/live data.

## Success signals

- Tester reaches first result without help.
- Tester understands that outputs are synthetic and offline.
- Tester can find the recommended next action.
- Tester does not interpret outputs as conversion prediction or production advice.
- Tester can open Export Readiness Preview and explain what it is for.

## Failure/blocker signals

- Tester cannot find where to start.
- Tester believes live data or customer data is used.
- Tester treats a workflow as production optimization.
- Tester expects a winner despite inconclusive/no-winner language.
- Tester cannot distinguish export readiness from final deliverable.

## Acceptance criteria

- [x] All target tester roles are defined.
- [x] Required tasks cover all four workflows and shell capabilities.
- [x] Safety/trust comprehension is included.
- [x] No new workflow or production feature is required.
