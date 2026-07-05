# M4 Design Tokens

Status: Drafted for M4 — Information Architecture & Design System Review.

Scope: standards only. This document does not redesign visuals or change CSS. No runtime, workflow, backend, or SocialSense implementation.

## Purpose

Design Tokens standardize spacing, typography, color roles, status colors, card hierarchy, elevation, grid, icons, and responsive behavior so future workflows can reuse the existing visual language without redesign.

## Current token inventory

The current app already uses CSS custom properties in `src/styles.css`:

| Token family | Existing examples | Decision |
|---|---|---|
| Background/surface | `--color-bg`, `--color-surface`, `--color-surface-muted` | Reuse |
| Text | `--color-text`, `--color-muted` | Reuse |
| Primary | `--color-primary`, `--color-primary-strong` | Reuse |
| Status | `--color-safe`, `--color-review`, `--color-error` | Reuse with expanded roles |
| Spacing | `--space-1` through `--space-7` | Reuse, extend if needed |
| Radius | `--radius-sm/md/lg` | Reuse |
| Shadow | `--shadow-card`, `--shadow-soft` | Reuse |
| Typography | `--font-family` | Reuse |

## Spacing standard

Use an 8px-compatible rhythm. Current tokens can remain:

| Token | Use |
|---|---|
| `--space-1` | Micro gap, badge vertical padding |
| `--space-2` | Small gap, nav pills |
| `--space-3` | Button/input padding, compact card elements |
| `--space-4` | Fieldset/card internal grouping |
| `--space-5` | Card padding, major section gap |
| `--space-6` | Page shell padding |
| `--space-7` | Large hero spacing |

Future rule: add new spacing tokens only when a repeated pattern appears across at least two workflow groups.

## Typography standard

| Role | Standard |
|---|---|
| Product title | Clear executive phrase; avoid internal implementation terms. |
| Page `h1` | One per page/route. |
| Section `h2` | Major workflow regions: Input, Review, Result, Export. |
| Panel `h3` | Dashboard/report cards. |
| Eyebrow | Uppercase category/status cue; use sparingly. |
| Body | Plain executive language. |
| Help text | Safety/assumption clarification, short and non-repetitive. |

Typography should support quick executive scanning:

1. headline;
2. summary;
3. recommendation;
4. evidence/limitations;
5. details.

## Color roles

| Role | Current token | Usage |
|---|---|---|
| Page background | `--color-bg` | Application canvas. |
| Surface | `--color-surface` | Cards, forms, panels. |
| Muted surface | `--color-surface-muted` | Secondary/choice backgrounds. |
| Text | `--color-text` | Primary content. |
| Muted text | `--color-muted` | Explanatory/support copy. |
| Primary action | `--color-primary` | Main action. |
| Strong primary | `--color-primary-strong` | Active nav/links. |
| Safe/ready | `--color-safe`, `--color-safe-bg` | Ready/review-safe state. |
| Review/warning | `--color-review`, `--color-review-bg` | Human review / caution. |
| Error | `--color-error`, `--color-error-bg` | Validation errors only. |

## Status colors

| Status | Color role | Copy standard |
|---|---|---|
| Available | Safe/ready | “Available” / “Ready for review” |
| Planning | Review | “Planning only” |
| Needs Extension | Review | “Needs extension” |
| Future | Placeholder | “Future” |
| Requires Gate | Error/review depending severity | “Requires review gate” |
| Not Implemented | Placeholder | “Not implemented” |

Avoid using red for normal future/unavailable work; reserve red/error for validation failures, unsafe scope, or blocked gates.

## Card hierarchy

| Card type | Usage | Visual standard |
|---|---|---|
| Hero/accent card | Page-level orientation or milestone status. | `card card-accent`; one per page where needed. |
| Workflow card | Workflow selection or status. | Card + badge + objective + evidence mode. |
| Form card | Input/review forms. | Fieldset grouping; assumptions preview nearby. |
| Result card | KPI/metric/evidence summary. | Title, value, detail, caveat. |
| Dashboard panel | Larger insight sections. | Scannable list; max density. |
| Report card | Export/summary readiness. | Format/status/detail. |
| Safety panel | Boundaries and labels. | Always visible for workflow/report interpretation. |

## Elevation

| Elevation | Use |
|---|---|
| Base surface | Forms, static panels. |
| Card shadow | Workflow cards, dashboard cards. |
| Soft shadow | Safety panels, secondary panels. |
| Modal/dialog shadow | Future only; define before dialogs implemented. |

Do not add heavy shadows or new elevation levels without design review.

## Grid and layout

| Pattern | Usage |
|---|---|
| One-column stack | Mobile and dense executive reading. |
| Two-column grid | Input + assumptions, paired insights. |
| Three-column grid | Workflow/status/result cards. |
| Max width | Keep page shell bounded for executive readability. |
| Sticky header | Keep navigation reachable without overwhelming content. |

Responsive rule: collapse two/three-column grids to one column at narrow widths. Current CSS already follows this pattern.

## Icons

No icon system is required yet. If added later:

- use icons as supportive cues, not primary labels;
- pair every icon with text;
- keep status icons consistent with status colors;
- avoid campaign/platform logos unless licensing and brand rules are reviewed.

## Responsive behavior

| Viewport | Standard |
|---|---|
| Mobile | One-column stack; primary action near top; no horizontal tables for operator UI. |
| Tablet | Two-column layout where useful. |
| Desktop | Three-column cards allowed; dashboard panels remain scannable. |
| Executive presentation | Prefer concise cards and report summaries over dense tables. |

## Success criteria

Design Tokens are approved if:

- spacing, typography, colors, statuses, cards, elevation, grid, icons, and responsive standards are defined;
- existing visual system is preserved;
- future workflows can reuse tokens without redesign;
- no CSS/visual implementation occurs in M4.
