# SocialSense Integration

Status: M1 PR3 product-owned adapter smoke is implemented.

## Scope

3C Marketing Workbench now has an isolated adapter at `integrations/socialsense/adapter.py` that consumes SocialSense through the public SDK/runtime facade only:

```python
from socialsense import load_domain_pack
```

The adapter loads the Marketing Domain Pack with `load_domain_pack('marketing')` and uses only:

- `domain.run(...)`
- `domain.export(...)`

It does not modify SocialSense, copy SocialSense internals, import `app.civicsense`, or import private SocialSense modules.

## Exposed adapter functions

- `run_product_launch_simulation(...)`
- `run_campaign_message_test(...)`
- `run_message_comparison(...)`
- `export_executive_report(...)`

`run_product_launch_simulation(...)` is the PR3 smoke path and executes an actual `product_launch` fixture through SocialSense Marketing Domain Pack. Campaign and comparison helpers are adapter-shaped deterministic wrappers for later UI workflow integration.

## Input mapping

3C product inputs remain aggregate and non-sensitive. The adapter maps only these fields to SocialSense:

- `scenario`
- `platform_mix`
- `seed`
- `assumptions`
- `notes`

No CRM/customer lists, PII, private messages/groups, voter lists, credentials, scraping, live APIs, microtargeting, persuasion optimization, conversion guarantees, or production campaign claims are introduced.

## Output preservation

Adapter view models preserve SocialSense metadata rather than stripping it:

- provenance;
- safety labels and boundaries;
- dashboard contract;
- domain pack metadata;
- limitations;
- evidence gaps;
- human review questions;
- export status for SocialSense-supported formats.

The smoke script prints `public_sdk_only: true` to make the boundary explicit.

## Local commands

Run Python adapter unit tests:

```bash
python3 -m unittest discover -s tests -p 'test_*.py'
```

Run actual local SocialSense smoke, using the local platform repo or an installed `socialsense` package:

```bash
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py
```

Expected smoke summary includes:

- `status: ok`
- `scenario: product_launch`
- export status for `json`, `markdown`, and `executive_json`
- safety boundaries such as fixture/offline execution and no live/private/PII/CRM/voter access
- `public_sdk_only: true`

## Current limitations

- No UI workflow integration yet; PR4 will wire the product launch vertical slice.
- No backend service, auth, persistence, live API, credentials, customer data, or production campaign workflow.
- Export review UI is deferred to PR4; PR3 only verifies SocialSense public export calls locally.
