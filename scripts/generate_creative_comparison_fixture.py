#!/usr/bin/env python3
"""Generate the M15 Creative Comparison UI fixture through the product SocialSense adapter.

There is no creative-specific SocialSense runtime scenario in the product-owned
public adapter today. This generator intentionally uses the closest existing
marketing/experiment path, run_message_comparison, and documents that limitation
in the fixture rather than changing SocialSense APIs.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from integrations.socialsense import export_executive_report, run_message_comparison
from scripts.generate_ab_experiment_fixture import ab_summary_preview
from scripts.generate_product_launch_fixture import (
    export_status,
    friendly_signal,
    sanitize_limitations,
    sanitize_review_list,
    summarize_risks,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "src" / "product" / "fixtures" / "creativeComparisonResult.json"

SAMPLE = {
    "brand": "Nimbus Go",
    "campaign_message": "Compare two text-only lunch creative concepts before creative review.",
    "creative_a_title": "Speed-first lunch creative",
    "creative_a_description": "A clean desk scene with lunch options resolved quickly and a short benefit-led caption.",
    "creative_b_title": "Trust-proof lunch creative",
    "creative_b_description": "A team lunch moment with nutrition proof points and dependable delivery reassurance.",
    "key_message": "Healthy team lunch decisions can feel fast, reviewed, and dependable.",
    "tone": "helpful, practical, trust-first",
    "claim": "Creative concepts are text-only planning assumptions, not verified production claims.",
    "context": "Reviewed offline Creative Comparison MVP sample for executive creative-review planning.",
    "audiences": ["Working Adults", "Urban Consumers", "SME Owners"],
    "platforms": ["Facebook", "TikTok", "LINE"],
}


def main() -> None:
    assumptions = [
        f"Brand is {SAMPLE['brand']}.",
        f"Creative A title is {SAMPLE['creative_a_title']}.",
        f"Creative A description is {SAMPLE['creative_a_description']}",
        f"Creative B title is {SAMPLE['creative_b_title']}.",
        f"Creative B description is {SAMPLE['creative_b_description']}",
        f"Key message is {SAMPLE['key_message']}",
        f"Tone is {SAMPLE['tone']}",
        "Creative Comparison MVP is text-only: no image generation, uploads, or live creative analysis.",
        "Use only aggregate, synthetic, offline assumptions with no customer records or private audience data.",
    ]
    comparison = run_message_comparison(
        message_a=f"{SAMPLE['creative_a_title']}: {SAMPLE['creative_a_description']}",
        message_b=f"{SAMPLE['creative_b_title']}: {SAMPLE['creative_b_description']}",
        platform_mix=SAMPLE["platforms"],
        seed="3c-m15-creative-comparison-reference-workflow",
        assumptions=assumptions,
    )
    arm_a = comparison["arms"]["message_a"]
    arm_b = comparison["arms"]["message_b"]
    executive_a = export_executive_report(arm_a, format="executive_json")
    executive_b = export_executive_report(arm_b, format="executive_json")
    markdown_a = export_executive_report(arm_a, format="markdown")
    json_a = export_executive_report(arm_a, format="json")

    artifact_a = executive_a["artifact"]
    artifact_b = executive_b["artifact"]
    if not isinstance(artifact_a, dict) or not isinstance(artifact_b, dict):
        raise TypeError("executive_json export did not return dictionaries for both creative arms")

    fixture = build_ui_fixture(comparison, arm_a, arm_b, artifact_a, artifact_b, markdown_a["artifact"], json_a["artifact"])
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(fixture, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)}")


def build_ui_fixture(
    comparison: dict[str, Any],
    arm_a: dict[str, Any],
    arm_b: dict[str, Any],
    executive_a: dict[str, Any],
    executive_b: dict[str, Any],
    markdown_artifact: Any,
    json_artifact: Any,
) -> dict[str, Any]:
    summary_a = executive_a.get("executive_summary", {})
    summary_b = executive_b.get("executive_summary", {})
    risks = executive_a.get("risk_and_limitations", {})
    safety = comparison.get("safety", {})
    limitations = sanitize_limitations(list(executive_a.get("limitations", [])))[:4] or summarize_risks(list(risks.get("limitations", comparison.get("limitations", []))))[:4]
    limitation_note = "Creative-specific SocialSense runtime scenario is not available; closest existing marketing/experiment path run_message_comparison is used for this offline fixture."

    return {
        "schemaVersion": "m15-creative-comparison-ui-v1",
        "runId": "3c-m15-creative-comparison-reference-workflow",
        "objective": "Creative Comparison",
        "sampleInput": SAMPLE,
        "summary": {
            "headline": "Offline creative comparison ready for executive review",
            "text": "Creative A and Creative B are compared as text-only concepts using the same audience, platform mix, key message, and evidence rules. No winner is selected from synthetic evidence; the result is inconclusive planning input for human creative review.",
            "sentimentDelta": summary_a.get("sentiment_delta"),
            "trustDelta": summary_a.get("trust_delta"),
            "diffusionReach": summary_a.get("diffusion_reach"),
            "riskScore": summary_a.get("risk_score"),
        },
        "creativeSummaries": [
            {"title": "Creative A summary", "value": SAMPLE["creative_a_title"], "detail": "Speed-led concept; review whether the visual/copy idea makes the benefit clear without overclaiming time savings."},
            {"title": "Creative B summary", "value": SAMPLE["creative_b_title"], "detail": "Trust-proof concept; review whether reassurance and nutrition cues stay useful without implying verified outcomes."},
        ],
        "cards": [
            {"title": "Audience fit", "value": "Directional planning fit", "detail": "Working adults and urban consumers may understand both concepts; field evidence is not attached."},
            {"title": "Brand fit", "value": "Consistent with helpful trust-first framing", "detail": "Both concepts remain aligned to dependable lunch decisions and avoid production-ready claims."},
            {"title": "Message clarity", "value": friendly_signal(summary_a.get("sentiment_delta"), "Needs review"), "detail": "Use human review to decide whether speed or trust proof better supports the shared key message."},
            {"title": "Risk / caveats", "value": "No winner selected", "detail": "Synthetic offline evidence is insufficient for winner selection, scaling, or conversion prediction."},
            {"title": "Evidence notes", "value": "Fixture-backed only", "detail": "No live APIs, uploads, image generation, CRM data, or private audience data are used."},
        ],
        "comparisonCards": [
            {"title": "Comparison highlights", "value": "Speed clarity vs trust proof", "detail": "Creative A emphasizes quick resolution; Creative B emphasizes reassurance. Treat this as a review frame, not a winner call."},
            {"title": "Differentiators", "value": "Benefit-led caption vs proof-led moment", "detail": "The concepts differ in emphasis while sharing the same key message and platform assumptions."},
            {"title": "Decision Status", "value": "No winner selected", "detail": "Current evidence is inconclusive; collect comparable creative feedback before deciding."},
        ],
        "comparisonDashboard": [
            {"title": "Comparison highlights", "detail": "Creative A is clearer on speed; Creative B is clearer on trust proof. Evidence remains synthetic and inconclusive."},
            {"title": "Differentiators", "detail": "Creative A uses a clean task-resolution scene; Creative B uses a team proof/reassurance scene."},
            {"title": "Audience fit", "detail": "Both concepts fit the stated audience directionally; no segment-level targeting or microtargeting is supported."},
            {"title": "Brand fit", "detail": "Both concepts fit a helpful, practical brand tone; claims still need human substantiation review."},
            {"title": "Message clarity", "detail": "Both concepts can support the key message; clarity is inconclusive without comparable field evidence."},
            {"title": "Risk / caveats", "detail": "No winner selected; do not treat this as production advice, conversion prediction, or scaling guidance."},
            {"title": "Evidence notes", "detail": "Offline fixture-backed sample using the closest existing marketing/experiment adapter path only."},
            {"title": "Recommended next action", "detail": "Run a small human-reviewed creative feedback test with the same brief, audience, and platform assumptions."},
        ],
        "comparisonMethod": {
            "decisionStatus": "No winner selected / inconclusive",
            "confidenceLevel": "Low directional confidence",
            "humanReviewRequired": True,
            "rationale": "Both creative concepts use the same brief, audience, platform mix, context, and criteria; synthetic evidence is inconclusive and cannot support winner selection.",
            "sharedCriteria": ["audience fit", "brand fit", "message clarity", "differentiation", "risk/caveats"],
            "parityCheck": "Creative A and Creative B use the same key message, intended audience, platform mix, notes, and offline evidence basis.",
            "blockedActions": ["winner selection", "production launch", "conversion prediction", "persuasion optimization", "automated targeting"],
        },
        "platformBreakdown": [
            {"platform": platform, "signal": "Fixture channel cue", "detail": "Planning cue only; not measured live platform activity."}
            for platform in SAMPLE["platforms"]
        ],
        "audienceInsights": [
            "Working Adults: compare speed clarity against confidence-building proof points.",
            "Urban Consumers: review whether quick benefit framing or reassurance feels easier to understand.",
            "SME Owners: keep team-benefit framing without promising productivity or conversion outcomes.",
        ],
        "risksCaveats": limitations + [limitation_note],
        "recommendedNextTest": "Run a small human-reviewed creative feedback test with the same brief, audience, and platform assumptions before choosing a creative direction.",
        "safetyLabels": [
            "Synthetic aggregate sample",
            "Offline review only",
            "No live APIs or credentials",
            "No PII, CRM lists, private messages, or voter lists",
            "No microtargeting, persuasion optimization, or conversion guarantees",
        ],
        "exports": {
            "formats": [
                export_status("JSON", arm_a, "json", json_artifact),
                export_status("Markdown", arm_a, "markdown", markdown_artifact),
                export_status("Executive Summary", arm_a, "executive_json", executive_a),
            ],
            "readiness": "Ready for human review",
            "status": "Generated from the reviewed offline Creative Comparison sample; review safety notes before reuse.",
            "executiveSummaryPreview": "Executive review: Creative A and Creative B are ready for directional human review. No winner is selected; use this to plan a small approved creative feedback test.",
        },
        "reviewMetadata": {
            "provenance": executive_a.get("provenance", arm_a.get("provenance", {})),
            "assumptions": sanitize_creative_assumptions(
                executive_a.get("assumptions", arm_a.get("input", {}).get("assumptions", []))
            ),
            "evidenceGaps": sanitize_review_list(executive_a.get("evidence_gaps", arm_a.get("evidence_gaps", []))),
            "limitations": limitations + [limitation_note],
            "source": {
                "runtimeMode": str(executive_a.get("provenance", arm_a.get("provenance", {})).get("runtime_mode", "fixture")),
                "sourceModelLabel": str(executive_a.get("provenance", arm_a.get("provenance", {})).get("source_model_label", "offline_sample")),
                "provenanceLabel": str(executive_a.get("provenance", arm_a.get("provenance", {})).get("provenance_label", "sample_demo")),
                "reviewMode": "Offline sample",
                "sourceLabel": "Reviewed offline sample, no live data",
            },
            "uncertainty": "Directional synthetic aggregate sample only; use for human review and next-test planning, not prediction.",
        },
        "sourceChecks": {
            "publicAdapterOnly": bool(comparison.get("public_sdk_only")),
            "adapterFunction": comparison.get("adapter_function"),
            "offlineExecution": bool(safety.get("offline_execution")),
            "liveApiAccess": bool(safety.get("live_api_access")),
            "credentialsRequired": bool(safety.get("credentials_required")),
            "productionReady": False,
        },
    }


def sanitize_creative_assumptions(values: Any) -> list[str]:
    sanitized = sanitize_review_list(values)
    cleaned: list[str] = []
    for item in sanitized:
        if item.startswith("message_theme:"):
            cleaned.append(item.replace("message_theme:", "Creative concept reviewed:", 1).strip())
        else:
            cleaned.append(item)
    return cleaned


if __name__ == "__main__":
    main()
