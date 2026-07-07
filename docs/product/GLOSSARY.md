# M18 Glossary — Thai-first Product Terms

Status: M18 current implementation milestone. M17 is closed as GO WITH CONDITIONS. M19 must not begin until M18 closes.

Architecture Gate: Not Triggered. This glossary supports frontend-only localization and does not require backend, SocialSense, workflow, IA, design-system, persistence, auth, external service, or live API changes.

| English term | Thai-first term | Usage note |
|---|---|---|
| Campaign | แคมเปญ | Use for the marketing initiative. Keep concise in dashboards. |
| Campaign Workspace | Campaign Workspace / พื้นที่ทำงานแคมเปญ | Keep product name recognizable; Thai explanation can follow. |
| Executive Summary | สรุปสำหรับผู้บริหาร | Use for management-readable summaries. |
| Evidence | หลักฐาน | Must be paired with source/limitations where decision-relevant. |
| Confidence | ความเชื่อมั่น | Use conservative levels; preserve Low directional confidence meaning. |
| Recommendation | ข้อเสนอแนะ | Next evidence step, not approval or guarantee. |
| Journey | Journey / เส้นทางการทำงาน | Keep Journey when referring to product framework; Thai context may clarify. |
| Stage | ช่วง | Use for journey/workflow step status. |
| Workflow | เวิร์กโฟลว์ | Existing product term; avoid redesign implication. |
| Experiment | การทดลอง | Use for A/B or comparison review; not live market experiment. |
| Synthetic | สังเคราะห์ | Preserve safety meaning: generated/non-real/aggregate. |
| Fixture | ข้อมูลตัวอย่าง | Use for offline reviewed sample data. |
| Dashboard | แดชบอร์ด | Executive dashboard context. |
| Report | รายงาน | Use for preview/report structure, not generated production export unless approved. |
| Export | ส่งออก | Use with preview/readiness wording; do not imply download if not available. |
| Review | ตรวจทาน | Human review or export review. |
| Platform Mix | สัดส่วนแพลตฟอร์ม | Channel/platform selection context. |
| Audience | กลุ่มเป้าหมาย | Aggregate audience only; no private or individual targeting. |
| Risk | ความเสี่ยง | Preserve market-risk-unmeasured meaning. |
| Limitation | ข้อจำกัด | Must stay visible near evidence and confidence. |
| Assumption | สมมติฐาน | Use for user-entered or fixture planning inputs. |

## Safety glossary rules

- `E1 synthetic/offline fixture` = `E1 ข้อมูลสังเคราะห์/ออฟไลน์`.
- `Low directional confidence` = `ความเชื่อมั่นเชิงทิศทางต่ำ`.
- `human review required` = `ต้องให้มนุษย์ตรวจทาน`.
- `not live social data` = `ไม่ใช่ข้อมูลโซเชียลสด`.
- `not production prediction` = `ไม่ใช่การคาดการณ์ใช้งานจริง`.
- `not a conversion guarantee` = `ไม่ใช่การรับประกัน conversion`.

## Screen coverage note

Home, Campaign Workspace, Product Launch, Campaign Message Test, A/B Experiment, Creative Comparison, Dashboard, Executive Summary, Export Review, and Health use these terms. No Settings screen exists, so no Settings terminology is added in M18.
