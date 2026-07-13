# M20 Closeout and Cross-Repository Readiness Decision

Status: M20 is CLOSED as GO WITH CONDITIONS for controlled, local fixture/offline aggregate-only product review. This PR6 closeout records evidence only; it does not start M21 or authorize a new capability.

Program: M20 — SocialSense Runtime Consumption Integration.

Architecture Gate: Not Triggered.

Readiness decision: GO WITH CONDITIONS.

## Executive summary

M20 established an executable, public-SDK-only evidence path from the submitted 3C Simulation Configuration to the SocialSense fixture runtime contract. The approved consumer remains a thin adapter: SocialSense owns runtime validation, deterministic fixture execution, provenance, dashboard/export contracts, and safety; 3C owns UX, submitted configuration, labels, review flow, and the read-only mapping.

The evidence supports local fixture/offline aggregate runtime consumption of the mapped configuration only. It does not support live platform measurement, private or customer data use, field evidence, calibrated confidence, production execution, forecasting, conversion claims, or an automatic M21 start.

## Merged repository evidence

| Repository | M20 merged baseline | Evidence |
| --- | --- | --- |
| 3C Marketing Workbench | `main` at `09e6e0b` (`M20 PR5: runtime traceability and fail-closed status`) | PR #40 delivered the public-contract adapter alignment; PR #41 delivered runtime traceability and fail-closed status. |
| SocialSense | `main` at `dc0aa7a` (merge of M20 PR3 public SDK compatibility) | PR #20 audited the runtime contract, PR #21 implemented the additive fixture contract, and PR #22 proved public-SDK compatibility. |

PR6 changes only 3C documentation and its documentation guard. A SocialSense PR6 change is not required: the SocialSense `main` baseline already contains the M20 runtime-contract audit, executable tests, consumer smoke, and public SDK compatibility evidence. No runtime, SDK, service, or product capability is changed by this closeout.

## Integration evidence

1. 3C imports only `create_research_session`, `run_scenario`, `export_run`, and `load_domain_pack` directly from the top-level `socialsense` public SDK.
2. The adapter maps the reviewed submitted profile, aggregate platform mix, per-platform allocation, allocation total, evidence depth, and deterministic fixture seed to the public runtime contract.
3. Promotion to `consumed_by_runtime` requires successful run status plus exact normalized contract echoes, fixture-only provenance, no live API access, no credentials, `fixture_offline_aggregate_only` evidence tier, and an explicit `not_calibrated` confidence caveat.
4. Missing, malformed, mismatched, or unsafe runtime evidence fails closed to `configuration_only`; it does not fabricate a runtime result.
5. The browser renders a local generated fixture. It does not call SocialSense, a backend, a live API, or an external service.

The authoritative consumer boundary and error behavior remain documented in [M20 PR3 SocialSense Public SDK Integration Boundary](M20_PR3_SOCIALSENSE_SDK_INTEGRATION_BOUNDARY.md) and [SocialSense Integration](SOCIALSENSE_INTEGRATION.md).

## Validation evidence

PR6 requires validation in both repositories from their merged baselines:

```bash
# 3C Marketing Workbench
npm run test
npm run typecheck
npm run lint
npm run build
python3 scripts/docs_smoke.py
python3 -m unittest discover -s tests -p 'test_*.py'
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py
git diff --check HEAD
git status --short --branch

# SocialSense
PYTHONPATH=. pytest -q
PYTHONPATH=. python scripts/socialsense_consumer_smoke.py
python -m compileall -q socialsense app/civicsense/socialsense_bridge app/civicsense/socialsense_workbench examples scripts
git diff --check origin/main...HEAD
git status --short --branch
```

The run log and exact pass/fail results must be captured in the pull-request handoff and re-run after merge. Passing these checks demonstrates deterministic local fixture/offline compatibility and regression coverage; it does not strengthen the evidence tier or make a production claim.

## Executed PR6 validation record

The required cross-repository validation was executed against the documented merged baselines before the PR6 handoff:

- 3C: `npm run test` passed with 163 tests in 7 files; `npm run typecheck`, `npm run lint`, and `npm run build` passed. The build emitted only the existing Vite advisory for a minified chunk above 500 kB.
- 3C: `python3 scripts/docs_smoke.py` passed, including the M20 PR6 closeout/path guard; `python3 -m unittest discover -s tests -p 'test_*.py'` passed 43 tests; `git diff --check HEAD` passed.
- Cross-repository consumer evidence: `PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py` passed with `status: ok`, `public_sdk_only: true`, fixture-only provenance, no live API access, no credentials, and a `consumed_by_runtime` submitted configuration echo for the reviewed aggregate fixture contract.
- SocialSense: `PYTHONPATH=. pytest -q` passed 2,795 tests; `PYTHONPATH=. python scripts/socialsense_consumer_smoke.py` passed 8/8 offline fixture checks; compilation and `git diff --check origin/main...HEAD` passed.
- SocialSense `main` was clean and synchronized with `origin/main`. The 3C tracked PR6 change set is bounded to documentation, its smoke guard, and its regression test; the pre-existing untracked `archive.html` remains excluded and is not part of this PR.

## Review gates

| Gate | Required decision for PR6 | Evidence to inspect |
| --- | --- | --- |
| QA Review | GO | Both repository validation suites, consumer smoke, cross-repository adapter smoke, docs smoke, and clean diff checks pass. |
| Code Review | GO | PR6 remains documentation/guard-only; no adapter, frontend runtime, SocialSense, or dependency change is present. |
| Safety Review | GO | No live API, scraping, credential, CRM/customer data, PII/private data, private messages, voter data, microtargeting, persuasion optimization, conversion guarantee, persistence, auth, or production claim is introduced. |
| Product Review | GO WITH CONDITIONS | The outcome is useful for controlled review of local fixture/offline aggregate evidence only. |
| UX Review | GO WITH CONDITIONS | User-visible traceability remains clear that runtime evidence is offline, aggregate-only, and not calibrated or live. |
| Research Review | GO WITH CONDITIONS | The deterministic fixture contract is reproducible but is not field, live, private, calibrated, predictive, or causal evidence. |

## Safety and architecture verification

Verified boundaries:

- no live platform APIs, scraping, credentials, CRM/customer data, PII/private data, private messages, voter data, persistence, authentication, external infrastructure, microtargeting, persuasion optimization, conversion guarantees, or production claims;
- no private SocialSense import: 3C uses only the reviewed top-level public SDK allowlist;
- no duplicated simulation logic in 3C: runtime behavior remains in SocialSense;
- no MarketingSimulation change and no `archive.html` commit;
- no breaking SDK change, runtime redesign, new service architecture, or live-platform access.

Architecture Gate: Not Triggered. A future request that needs a breaking SDK change, runtime redesign, new service architecture, external infrastructure, persistence, auth, live access, private data, or non-public imports must stop for Architecture Gate review.

## Rollback and recovery

The baseline is safe to roll back without changing SocialSense runtime behavior:

1. If a 3C consumer regression is discovered, remove the PR6 documentation commit with `git revert <pr6-commit>` or restore the previously merged 3C `main` baseline; do not modify SocialSense to compensate.
2. If executable runtime evidence is absent or mismatched, retain the adapter's existing fail-closed `configuration_only` result. Do not promote the result, retry with unsafe data, or fall back to a fabricated runtime output.
3. If the public SDK contract changes incompatibly, stop 3C promotion, pin review to the last compatible merged SocialSense baseline, and raise an Architecture Gate rather than importing an internal module or reproducing runtime logic in 3C.
4. If a SocialSense rollback is required, revert the relevant SocialSense PR on that repository independently, then re-run its full test suite, its consumer smoke, and the 3C adapter smoke against the selected baseline before any 3C release decision.
5. Restore forward only through a separately authorized, reviewed PR with all six gates and both-repository validation; do not begin M21 as part of rollback or closeout.

## Known limitations and conditions

1. Runtime consumption is proven only through deterministic local fixture/offline aggregate contract echoes.
2. The evidence tier remains `fixture_offline_aggregate_only`; confidence remains explicitly `not_calibrated`.
3. The browser consumes generated local fixtures, not a runtime service.
4. Controlled executive review may discuss assumptions, limitations, and traceability, but must not make live, production, budget, winner, conversion, or measured-engagement decisions from this evidence.
5. The 3C working tree may retain the pre-existing untracked `archive.html`; it is intentionally excluded from this program and must not be committed. The tracked PR6 change set itself must be clean after merge.

## Final readiness decision

Readiness decision: GO WITH CONDITIONS.

M20 is ready to close for controlled product review of its deterministic, public-SDK, fixture/offline aggregate-only integration evidence. It is not ready for live measurement, production execution, private-data use, calibrated claims, or a next capability. Do not begin M21 automatically.
