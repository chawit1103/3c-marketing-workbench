# M18 Translation Style Guide — Thai-first Internationalization

Status: M18 is closed as GO WITH CONDITIONS. This guide governs Thai and English UI copy for 3C Marketing Workbench. M19 PR1 and PR2 configuration-only work are complete/in correction; runtime synthetic engagement/platform engagement result model remains not begun, and PR3 remains blocked until PR2 correction post-merge validation passes.

## Architecture Gate

Architecture Gate: Not Triggered.

Stop and report if localization requires backend redesign, SocialSense changes, workflow redesign, information architecture redesign, design system redesign, persistence, auth, external services, or live APIs. M18 stays frontend-only and does not modify SocialSense.

## Thai-first principles

- Default language is Thai on first load.
- English is the secondary language and English fallback for missing keys.
- Thai copy should be short, clear, professional, and non-technical.
- Prefer executive language over implementation language.
- Keep known product names when translation would reduce recognition, e.g. Product Launch, A/B Experiment, Campaign Workspace.
- Do not translate fixture data values such as brand names, generated fixture descriptions, run IDs, or platform names unless they are UI labels.

## Executive tone

- Lead with status, evidence, confidence, limitation, and next action.
- Avoid technical implementation details in primary UI copy.
- Use concise Thai sentences that can be scanned by management.
- Keep English clear, consistent, and close to existing product meaning.

## Marketing tone

- Use practical decision language: campaign, audience, message, platform mix, review, recommendation.
- Do not imply conversion guarantee, persuasion optimization, production launch approval, or real market prediction.
- Recommendations are next evidence steps, not automatic decisions.

## Research tone

- Evidence wording must remain conservative.
- Confidence wording must state Low directional confidence when evidence is synthetic/offline only.
- Limitations and assumptions must stay visible near dashboards, report sections, and export review.
- Synthetic notices must not be softened.

## Dashboard wording

- KPI cards should use short labels.
- Metadata should preserve Formula, Source, Evidence tier, Confidence, Limitation, and next evidence step.
- Thai labels must avoid overflow where possible by using compact terms.

## Safety, evidence, and confidence wording

Required safety meaning in both languages:

- fixture/offline mode;
- synthetic aggregate outputs;
- no live social data;
- no CRM/customer data;
- no private messages;
- no prediction guarantee;
- not production campaign optimization;
- human review required before launch, budget, or winner decisions.

Do not remove or weaken safety labels, synthetic notices, evidence notices, confidence wording, limitation wording, or blocked-action wording. Avoid unnecessary repetition, but keep the meaning visible.

## Supported screens

M18 covers user-facing UI chrome and screen copy by user experience:

- Home;
- Campaign Workspace;
- Product Launch;
- Campaign Message Test;
- A/B Experiment;
- Creative Comparison;
- Dashboard;
- Executive Summary;
- Export Review;
- Health.

Settings: no Settings route/screen exists in the current route model, so M18 does not add a Settings route.

## Product KPI tracking for M18

- Translation Completeness;
- Glossary Consistency;
- Thai UX Quality;
- English UX Quality;
- Executive Readability;
- Safety Copy Quality;
- Terminology Consistency;
- Language Coverage.

## M19 status

M19 PR1 and PR2 configuration-only work are complete/in correction. Runtime synthetic engagement/platform engagement result model remains not begun; PR3 remains blocked until PR2 correction post-merge validation passes.
