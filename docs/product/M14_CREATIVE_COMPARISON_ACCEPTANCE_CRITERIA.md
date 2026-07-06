# M14 Creative Comparison Acceptance Criteria

Status: M14 Creative Comparison Product Discovery & Specification.
Scope: documentation/discovery only. This document does not implement Creative Comparison, create frontend components, change runtime behavior, add backend endpoints, add APIs, add persistence, add authentication, redesign Campaign Workspace, modify SocialSense, or modify MarketingSimulation.
Architecture Gate: Not triggered.

## Milestone Acceptance Criteria

M14 is complete only when:

- all six M14 discovery/specification documents exist;
- README, AGENTS, Roadmap, Product Health Dashboard, and docs smoke are updated for M14 discovery status;
- docs smoke verifies M14 artifacts and non-implementation boundaries;
- no runtime source files are changed;
- no Creative Comparison implementation is started;
- validation and all required review gates pass;
- PR is merged, main is updated, and post-merge validation passes.

## Future Feature Acceptance Criteria

A future M15 implementation planning milestone must require the following before any code:

### Input and Review

- [ ] User can identify creative concepts as assumptions.
- [ ] At least two comparable concepts are required.
- [ ] Shared objective, audience, platforms, and criteria are visible before run.
- [ ] Validation explains what is missing, why it matters, and how to fix it.

### Result Visibility

- [ ] Run completion state is immediately visible.
- [ ] Result Preview / Dashboard is reachable via a jump link.
- [ ] Executive Summary and Recommended Next Action are present.

### Research Integrity

- [ ] Evidence quality and confidence rationale are visible.
- [ ] No-winner/inconclusive outcome is supported.
- [ ] No statistical significance, lift, or conversion prediction is implied.
- [ ] Recommendation gating blocks unsafe or unsupported winner language.

### Transparency

- [ ] Reference Fixture and User Review Session labels are separate.
- [ ] Synthetic generated sample and user-provided assumptions are visible.
- [ ] No live execution is stated on result and export surfaces.
- [ ] Evidence gaps, limitations, and blocked actions are preserved.

### Safety

- [ ] No live APIs, scraping, credentials, PII, CRM/customer lists, private messages, voter lists, microtargeting, persuasion optimization, conversion guarantees, or production campaign claims.
- [ ] No SocialSense or MarketingSimulation changes unless separately approved by a future gate.

### Accessibility

- [ ] Form fields have labels and help text.
- [ ] Errors use role/summary conventions.
- [ ] Comparison tables/cards are navigable by keyboard and screen reader.
- [ ] Risk/confidence states do not rely on color alone.

## Error States

- Missing concept.
- Incomplete shared objective.
- Non-comparable concepts.
- Missing criteria.
- Unsupported upload/live API request.
- Unknown run/export unavailable state.

## Empty States

- No concepts yet.
- No criteria yet.
- No result generated.
- No export review available.

## Success Metrics

- Product Trust remains GO.
- UX Clarity remains GO.
- Research Transparency remains GO.
- Regression Stability remains GO.
- Creative Comparison Implementation remains HOLD until a separate implementation milestone is approved.
