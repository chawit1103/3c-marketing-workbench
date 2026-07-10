# M19 Preparation — Synthetic Engagement Terminology and Remediation Backlog

Status: Historical preparation artifact. M19 PR3 product-owned synthetic/offline platform engagement result model is now implemented; future live/runtime/SocialSense expansion remains blocked unless separately authorized.
Scope: Documentation, terminology, copy rules, safety wording, evidence/confidence wording, and remediation backlog only.
Source milestone: M18 Thai-first Internationalization implementation closed as **GO WITH CONDITIONS** on main at `42bdf1b4c259c0bc553733fe89f6ad065409de4a`; M18 closeout/status was finalized at `e871b7f38111eb13bf3f2e727d948ef19d915874`.
Architecture Gate: Not Triggered.

This addendum historically prepared language and review constraints for Synthetic Social Platform Engagement Simulation work before PR3. It does not authorize live/runtime expansion and does not add or modify backend services, SocialSense, MarketingSimulation, live APIs, scraping, posting, credentials, persistence, auth, private data, production automation, or production engagement claims.

## Non-Implementation Boundary

This document defined historical wording and backlog constraints before PR3. It remains a preparation artifact and must not be used as approval for live/runtime/SocialSense expansion.

M19 PR3 product-owned synthetic/offline platform engagement result model is implemented. Future live/runtime/SocialSense expansion remains blocked until a separate kickoff explicitly approves scope, acceptance criteria, review gates, and changed files.

Do not add or imply:

- live social APIs;
- scraping or account automation;
- posting, replying, liking, following, sharing, or boosting;
- credentials, cookies, tokens, browser sessions, or auth headers;
- CRM/customer lists, contact lists, PII, private messages, private groups, or voter lists;
- individual targeting, microtargeting, persuasion optimization, or manipulation workflows;
- measured platform engagement, production engagement, production readiness, or guaranteed campaign outcomes;
- SocialSense changes or private SocialSense imports;
- MarketingSimulation changes.

## Terminology / Glossary Addendum

| English term | Thai-first term | Usage rule |
|---|---|---|
| Synthetic engagement | engagement สังเคราะห์ | Use only for generated/offline planning signals. Never imply real platform engagement. |
| Synthetic social engagement | engagement โซเชียลสังเคราะห์ | Use when the context is social-platform-like behavior, but keep the synthetic qualifier visible. |
| Engagement signal | สัญญาณ engagement | Use for directional indicators, not measured metrics. Pair with source and limitation. |
| Simulated reaction | ปฏิกิริยาจำลอง | Use for persona reaction, sentiment shift, or response pattern generated from fixtures. |
| Simulated share intent | แนวโน้มแชร์แบบจำลอง | Use as a hypothetical directional signal only, not actual sharing. |
| Simulated comment intent | แนวโน้มคอมเมนต์แบบจำลอง | Use as a hypothetical response pattern, not real comments. |
| Simulated save intent | แนวโน้มบันทึกแบบจำลอง | Use only if the future fixture includes this signal; not a platform API metric. |
| Simulated click intent | แนวโน้มคลิกแบบจำลอง | Use as planning input; avoid CTR or performance claim unless field data exists. |
| Estimated engagement lift | ทิศทาง engagement ที่คาดจากข้อมูลจำลอง | Avoid percentage lift unless clearly marked synthetic/offline and uncalibrated. |
| Platform-like behavior | พฤติกรรมลักษณะคล้ายแพลตฟอร์ม | Use when describing a model abstraction; avoid naming a real platform capability if no integration exists. |
| Social platform fixture | ข้อมูลตัวอย่างแพลตฟอร์มสังเคราะห์ | Use for offline fixture data only. |
| Engagement scenario | ฉากทัศน์ engagement | Use for scenario planning; not a forecast. |
| Engagement readiness | ความพร้อมสำหรับตรวจทาน engagement | Means readiness for human review, not readiness to run a campaign. |
| Engagement evidence | หลักฐาน engagement สังเคราะห์ | Must include evidence tier, source, assumptions, limitations, and next validation step. |
| Engagement confidence | ความเชื่อมั่นของ engagement สังเคราะห์ | Use conservative level wording; do not present as statistical certainty. |
| Field validation needed | ต้องตรวจสอบกับข้อมูลภาคสนาม | Required when synthetic engagement signals might influence budget, launch, winner, or platform decisions. |

Glossary consistency rule: when a phrase contains `engagement`, keep `engagement` in English if it improves executive recognition, and add Thai context around it. Do not translate it as a real measured interaction unless real approved field evidence exists.

## Thai-First Copy Rules For M19 Preparation

1. Lead with Thai executive meaning, then preserve recognisable product/platform terms only where useful.
2. Keep `สังเคราะห์`, `จำลอง`, `ออฟไลน์`, or `ข้อมูลตัวอย่าง` close to any engagement term.
3. Use `สัญญาณ`, `แนวโน้ม`, `ฉากทัศน์`, and `ขั้นตอนตรวจสอบถัดไป` instead of hard claims like `ผลลัพธ์จริง`, `ยอดจริง`, or `คาดการณ์แม่นยำ`.
4. Keep copy short enough for dashboard cards and export-review sections.
5. Separate UI labels from fixture values; do not translate brand names, run IDs, or user-provided campaign data unless they are controlled sample copy.
6. Preserve English fallback meaning for reviewers; English must be equally conservative.
7. Use `ตรวจทานโดยมนุษย์` before any external use, budget decision, launch decision, or winner selection.
8. Do not use Thai wording that implies live social listening, real audience surveillance, platform account access, or production posting.

Recommended Thai frames:

- `สัญญาณ engagement สังเคราะห์จากข้อมูลตัวอย่างออฟไลน์`
- `ปฏิกิริยาจำลองของ persona ไม่ใช่ข้อมูล engagement จริงจากแพลตฟอร์ม`
- `ใช้เพื่อวางแผนฉากทัศน์เท่านั้น ต้องตรวจสอบกับข้อมูลภาคสนามก่อนตัดสินใจ`
- `ความเชื่อมั่นเชิงทิศทางต่ำ เพราะยังไม่มีข้อมูลภาคสนามหรือผลลัพธ์จริงเทียบเคียง`

Avoid:

- `ระบบทำนาย engagement จริง`
- `คาดการณ์ยอดแชร์/ไลก์/คอมเมนต์ได้แม่นยำ`
- `พร้อมใช้งานจริงบนแพลตฟอร์มโซเชียล`
- `เพิ่ม engagement ได้แน่นอน`
- `เชื่อมต่อข้อมูลโซเชียลสด`

## Safety Wording Checklist

Any future M19 copy, fixture, dashboard, export, or screenshot must keep these meanings visible:

- [ ] Synthetic/offline source is explicit.
- [ ] No live social data is implied.
- [ ] No measured platform engagement is implied.
- [ ] No scraping, posting, account automation, or platform credential use is implied.
- [ ] No CRM/customer list, PII, private message, private group, or voter-list use is implied.
- [ ] No individual targeting, microtargeting, persuasion optimization, or manipulation workflow is implied.
- [ ] No production campaign approval, production readiness, or guaranteed outcome is implied.
- [ ] Evidence tier, source, assumptions, limitations, and next validation step are visible.
- [ ] Human review is required before external use.
- [ ] Field validation is required before launch, budget, winner, or platform allocation decisions.
- [ ] SocialSense remains a public dependency boundary and is not modified.
- [ ] MarketingSimulation remains reference-only and is not modified.

Required safety sentence pattern:

> This is synthetic/offline scenario-planning evidence only. It is not live social data, not measured platform engagement, not production prediction, and not approval for launch, budget, winner, or posting decisions.

Thai pattern:

> นี่คือหลักฐานสำหรับวางแผนฉากทัศน์จากข้อมูลสังเคราะห์/ออฟไลน์เท่านั้น ไม่ใช่ข้อมูลโซเชียลสด ไม่ใช่ engagement ที่วัดจริงบนแพลตฟอร์ม ไม่ใช่การคาดการณ์ใช้งานจริง และไม่ใช่การอนุมัติให้ตัดสินใจเปิดตัว งบประมาณ ผู้ชนะ หรือการโพสต์จริง

## Evidence And Confidence Wording Rules

Evidence tier rules:

| Tier | Allowed wording | Disallowed wording |
|---|---|---|
| E1 synthetic/offline fixture | `E1 synthetic/offline fixture`, `E1 ข้อมูลสังเคราะห์/ออฟไลน์` | `measured engagement`, `real platform evidence`, `validated social data` |
| E2 reviewed field comparison | Future only; requires approved aggregate field evidence and separate review | Do not claim in M19 prep or initial runtime without evidence |
| E3 calibrated production evidence | Future only; requires production governance, field calibration, and architecture review | Do not claim in this product state |

Confidence wording rules:

- Use `Low directional confidence` / `ความเชื่อมั่นเชิงทิศทางต่ำ` for synthetic/offline-only engagement outputs.
- Explain the downgrade: no live platform data, no measured engagement, no field calibration, and no production outcome validation.
- Confidence describes source completeness and review readiness, not statistical confidence intervals.
- Never present confidence as prediction accuracy, probability of virality, guaranteed lift, or production readiness.
- Pair any engagement recommendation with a next validation step.

Approved English examples:

- `Confidence: Low directional. Synthetic/offline engagement signals are useful for review, but not for launch, budget, winner, or posting decisions without field validation.`
- `Evidence: E1 synthetic/offline fixture. No live social data, measured platform engagement, or production prediction is used.`

Approved Thai examples:

- `ความเชื่อมั่น: เชิงทิศทางต่ำ สัญญาณ engagement สังเคราะห์ช่วยให้ตรวจทานแนวทางได้ แต่ยังใช้ตัดสินใจเปิดตัว งบประมาณ ผู้ชนะ หรือการโพสต์จริงไม่ได้จนกว่าจะตรวจสอบกับข้อมูลภาคสนาม`
- `หลักฐาน: E1 ข้อมูลสังเคราะห์/ออฟไลน์ ไม่มีข้อมูลโซเชียลสด ไม่มี engagement ที่วัดจริงบนแพลตฟอร์ม และไม่ใช่การคาดการณ์ใช้งานจริง`

## Remediation Backlog From M18 Conditions

| ID | Priority | Backlog item | Acceptance criteria | Gate |
|---|---:|---|---|---|
| M19-PREP-001 | P0 | Add this M19 terminology/glossary addendum before runtime work | Glossary addendum exists, is linked from README, and docs smoke checks it | Product / Research |
| M19-PREP-002 | P0 | Keep Thai-first copy review as M19 acceptance criterion | Future M19 task/PR lists Thai-first review and English fallback review explicitly | Product / UX |
| M19-PREP-003 | P0 | Preserve no-live/no-scraping/no-posting/no-credential boundary | Any future M19 brief includes forbidden scope list and changed-path guard | Safety / Code |
| M19-PREP-004 | P0 | Define engagement evidence/confidence wording before UI copy | Future M19 UI/export copy uses E1 synthetic/offline + Low directional confidence unless approved evidence tier changes | Research / Safety |
| M19-PREP-005 | P1 | Add tests for mixed-language and unsafe claim blockers when M19 copy exists | Future runtime copy tests fail on production engagement, measured engagement, live social, scraping, posting, and guarantee phrases | QA / Code |
| M19-PREP-006 | P1 | Add export/screenshot checklist for engagement terms | Future export review and screenshots preserve source, limitation, confidence, and validation-step wording | UX / Research |
| M19-PREP-007 | P1 | Confirm SocialSense adapter remains public-only | Future M19 work may use only approved public facade calls unless Architecture Gate is explicitly triggered | Code / Architecture |
| M19-PREP-008 | P2 | Decide whether engagement terms remain inline or move to structured locale resources | Decision recorded before large translation expansion; no broad DOM or phrase replacement mutation returns | Code / Product |
| M19-PREP-009 | P2 | Human editorial review of Thai executive engagement copy | Thai copy is concise, conservative, and executive-readable before release candidate | UX / Product |

## Architecture Gate Reminder

Architecture Gate remains **Not Triggered** for this preparation document because it is docs/smoke only.

Architecture Gate must be triggered before any future work that requires:

- SocialSense redesign or API change;
- workspace, workflow, information architecture, or design-system redesign;
- backend services;
- persistence;
- authentication;
- external services;
- live APIs;
- scraping or platform automation;
- credentials or private account access;
- private/customer/PII data handling.

## Exit Criteria For This Preparation Task

- This addendum exists.
- README links to this addendum.
- Docs smoke validates the addendum and M19 preparation phrases.
- No source UI/runtime feature files change.
- No SocialSense or MarketingSimulation files change.
- No live APIs, scraping, posting, credentials, private data, or production engagement claims are introduced.
- Architecture Gate remains Not Triggered.
