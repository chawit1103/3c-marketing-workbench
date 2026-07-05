# SocialSense Integration

Status: M1 PR4 consumes a generated Product Launch UI fixture that is produced through the M1 PR3 product-owned SocialSense adapter.

## Scope

3C Marketing Workbench has an isolated adapter at `integrations/socialsense/adapter.py` that consumes SocialSense through the public SDK/runtime facade only:

```python
from socialsense import load_domain_pack
```

The adapter loads the Marketing Domain Pack with `load_domain_pack('marketing')` and uses only:

- `domain.run(...)`
- `domain.export(...)`

It does not modify SocialSense, copy SocialSense internals, import `app.civicsense`, or import private SocialSense modules.

## PR4 fixture flow

PR4 uses this cross-repository flow:

```text
SocialSense public SDK
↓
integrations/socialsense/adapter.py
↓
scripts/generate_product_launch_fixture.py
↓
src/product/fixtures/productLaunchResult.json
↓
React Product Launch workflow, dashboard, and export review
```

The browser does not call SocialSense, live APIs, or a backend. It renders a reproducible offline sample generated locally from the adapter.

## Exposed adapter functions

- `run_product_launch_simulation(...)`
- `run_campaign_message_test(...)`
- `run_message_comparison(...)`
- `export_executive_report(...)`

`run_product_launch_simulation(...)` is the Product Launch smoke and PR4 fixture-generation path. Campaign and comparison helpers remain adapter-shaped wrappers for later reviewed workflow PRs.

## Input mapping

3C product inputs remain aggregate and non-sensitive. The adapter maps only these fields to SocialSense:

- `scenario`
- `platform_mix`
- `seed`
- `assumptions`
- `notes`

No CRM/customer lists, PII, private messages/groups, voter lists, credentials, scraping, live APIs, microtargeting, persuasion optimization, conversion guarantees, or production campaign claims are introduced.

## Output preservation

Adapter view models and the PR4 fixture preserve SocialSense metadata rather than stripping it:

- provenance;
- safety labels and boundaries;
- dashboard/export status;
- limitations;
- evidence gaps;
- human review questions;
- export status for JSON, Markdown, and Executive Summary.

The UI converts those into marketing-friendly language and must not expose internal platform terms as primary user copy.

## Local commands

Run Python adapter and fixture tests:

```bash
python3 -m unittest discover -s tests -p 'test_*.py'
```

Regenerate the Product Launch UI fixture through the PR3 adapter:

```bash
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/generate_product_launch_fixture.py
```

Run actual local SocialSense smoke:

```bash
PYTHONPATH=/Users/chawit/Projects/socialsense:. python3 scripts/socialsense_adapter_smoke.py
```

Expected smoke/fixture summary includes:

- `status: ok`
- `scenario: product_launch`
- export status for `json`, `markdown`, and `executive_json`
- safety boundaries such as fixture/offline execution and no live/private/PII/CRM/voter access
- `public_sdk_only: true`

## Current limitations

- PR4 renders one Product Launch vertical slice only.
- Browser-entered form values are shown as review assumptions beside the generated offline sample; they are not sent to a live SocialSense service.
- No backend service, auth, persistence, live API, credentials, customer data, or production campaign workflow.
- A/B comparison, campaign message test, real workspace persistence, and downloadable report packaging remain future gated work.
