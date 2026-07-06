#!/usr/bin/env python3
"""Generate the M7 A/B Experiment UI fixture through the product SocialSense adapter."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from integrations.socialsense import export_executive_report, run_message_comparison
from scripts.generate_campaign_message_test_fixture import executive_preview, executive_summary_preview
from scripts.generate_product_launch_fixture import (
    clean_summary_text,
    export_status,
    friendly_signal,
    platform_detail,
    platform_name,
    platform_signal,
    sanitize_limitations,
    sanitize_review_list,
    summarize_risks,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "src" / "product" / "fixtures" / "abExperimentResult.json"

SAMPLE = {
    "brand": "Nimbus Go",
    "campaign_message": "Healthy lunch decisions in under 10 minutes for busy urban teams.",
    "variant_a": "Healthy lunch decisions in under 10 minutes for busy urban teams.",
    "variant_b": "Team lunch made simple with reviewed nutrition cues and dependable delivery windows.",
    "offer": "No offer required for message comparison review.",
    "key_message": "Compare speed-led clarity against trust-proof reassurance before budget review.",
    "tone": "helpful, practical, trust-first",
    "claim": "Variant claims are assumptions for review, not verified production claims.",
    "context": "Reviewed offline A/B Experiment sample for executive message-comparison planning.",
    "audiences": ["Working Adults", "Urban Consumers", "SME Owners"],
    "platforms": ["Facebook", "TikTok", "LINE"],
}


def main() -> None:
    assumptions = [
        f"Brand is {SAMPLE['brand']}.",
        f"Variant A is {SAMPLE['variant_a']}",
        f"Variant B is {SAMPLE['variant_b']}",
        f"Key message is {SAMPLE['key_message']}",
        f"Tone is {SAMPLE['tone']}",
        f"Claim to review is {SAMPLE['claim']}",
        "Audience focus is " + ", ".join(SAMPLE["audiences"]) + ".",
        "Use only aggregate, synthetic, offline assumptions with no customer records or private audience data.",
    ]
    comparison = run_message_comparison(
        message_a=SAMPLE["variant_a"],
        message_b=SAMPLE["variant_b"],
        platform_mix=SAMPLE["platforms"],
        seed="3c-m7-ab-experiment-reference-workflow",
        assumptions=assumptions,
    )
    arm_a = comparison["arms"]["message_a"]
    arm_b = comparison["arms"]["message_b"]
    executive_a = export_executive_report(arm_a, format="executive_json")
    markdown_a = export_executive_report(arm_a, format="markdown")
    json_a = export_executive_report(arm_a, format="json")
    executive_b = export_executive_report(arm_b, format="executive_json")

    artifact_a = executive_a["artifact"]
    artifact_b = executive_b["artifact"]
    if not isinstance(artifact_a, dict) or not isinstance(artifact_b, dict):
        raise TypeError("executive_json export did not return dictionaries for both arms")

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
    marketing_a = executive_a.get("marketing_research", {})
    kpis_a = marketing_a.get("marketing_kpis", {})
    observations = list(marketing_a.get("research_observations", []))
    platform_breakdown = executive_a.get("platform_breakdown", [])
    risks = executive_a.get("risk_and_limitations", {})
    safety = comparison.get("safety", {})

    return {
        "schemaVersion": "m7-ab-experiment-ui-v1",
        "runId": "3c-m7-ab-experiment-reference-workflow",
        "objective": "A/B Experiment",
        "sampleInput": SAMPLE,
        "summary": {
            "headline": "Offline A/B experiment ready for executive review",
            "text": ab_preview(summary_a, summary_b),
            "sentimentDelta": summary_a.get("sentiment_delta"),
            "trustDelta": summary_a.get("trust_delta"),
            "diffusionReach": summary_a.get("diffusion_reach"),
            "riskScore": summary_a.get("risk_score"),
        },
        "cards": [
            {"title": "Overall Reaction", "value": friendly_signal(summary_a.get("sentiment_delta"), "Variant response needs review"), "detail": "Aggregate synthetic response for Variant A baseline; compare directionally against Variant B."},
            {"title": "Message Clarity", "value": friendly_signal(kpis_a.get("message_acceptance"), "Main benefit is understandable"), "detail": "Use the same Campaign Message Test card pattern for A/B review."},
            {"title": "Tone Fit", "value": friendly_signal(summary_a.get("trust_delta"), "Tone needs trust proof"), "detail": "Review tone and proof before external use."},
            {"title": "Claim Readiness", "value": "Needs substantiation review", "detail": "Claims in both variants require human evidence review before launch approval."},
            {"title": "Platform Fit", "value": friendly_signal(summary_a.get("diffusion_reach"), "Moderate channel fit"), "detail": "Start with a small approved channel test, not broad scaling."},
        ],
        "comparisonCards": [
            {"title": "Variant A Clarity Comparison", "value": "Variant A is the clarity hypothesis", "detail": "Same criterion for both variants: speed-led clarity versus trust-proof clarity; no winner is selected from synthetic evidence."},
            {"title": "Variant B Trust Comparison", "value": "Variant B is the trust-proof hypothesis", "detail": "Same criterion for both variants: trust proof and reassurance; Variant B provides the clearer trust rationale for the next test."},
            {"title": "Decision Status", "value": "No winner selected", "detail": "Both variants require comparable field evidence; current output supports human-reviewed next-test planning only."},
        ],
        "comparisonMethod": {
            "decisionStatus": "Inconclusive / needs evidence",
            "confidenceLevel": "Low directional confidence",
            "humanReviewRequired": True,
            "rationale": "Same objective, audience, platform mix, context, and criteria are used for both variants; synthetic evidence is not sufficient to select a production winner.",
            "sharedCriteria": ["message clarity", "trust proof", "tone fit", "platform fit", "claim readiness"],
            "parityCheck": "Variant A and Variant B use the same audience, platforms, context, evaluation criteria, and offline evidence basis.",
            "blockedActions": ["winner selection", "production launch", "conversion optimization", "automated targeting"],
        },
        "platformBreakdown": [
            {"platform": platform_name(item.get("platform")), "signal": platform_signal(item), "detail": platform_detail(item)}
            for item in platform_breakdown
        ],
        "audienceInsights": [
            "Working Adults: Variant A emphasizes speed; Variant B adds reliability proof.",
            "Urban Consumers: compare convenience clarity against quality reassurance.",
            "SME Owners: keep team-benefit framing without guaranteed outcomes.",
        ] + [clean_summary_text(str(item)) for item in observations[:2]],
        "risksCaveats": summarize_risks(list(risks.get("limitations", comparison.get("limitations", [])))),
        "recommendedNextTest": "Run a small approved A/B message-readiness test after human review: speed-led Variant A versus trust-proof Variant B.",
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
            "status": "Generated from the reviewed offline A/B Experiment sample; review safety notes before reuse.",
            "executiveSummaryPreview": ab_summary_preview(summary_a, summary_b),
        },
        "reviewMetadata": {
            "provenance": executive_a.get("provenance", arm_a.get("provenance", {})),
            "assumptions": sanitize_review_list(executive_a.get("assumptions", arm_a.get("input", {}).get("assumptions", []))),
            "evidenceGaps": sanitize_review_list(executive_a.get("evidence_gaps", arm_a.get("evidence_gaps", []))),
            "limitations": sanitize_limitations(list(executive_a.get("limitations", [])))[:5]
            or sanitize_limitations(list(risks.get("limitations", comparison.get("limitations", []))))[:5],
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


def ab_preview(summary_a: dict[str, Any], summary_b: dict[str, Any]) -> str:
    return (
        "The offline A/B Experiment sample uses the same objective, audience, platform mix, and criteria for both variants. "
        "Variant A is the speed-led clarity hypothesis; Variant B is the trust-proof hypothesis. "
        "No winner is selected from synthetic evidence; use this as a planning prompt for human review, not a forecast."
    )


def ab_summary_preview(summary_a: dict[str, Any], summary_b: dict[str, Any]) -> str:
    return (
        "Executive review: Variant A and Variant B are ready for directional human review; "
        f"Variant A response is {friendly_signal(summary_a.get('sentiment_delta'), 'needs review').lower()} and Variant B trust is "
        f"{friendly_signal(summary_b.get('trust_delta'), 'needs review').lower()}. Use this to plan a small approved A/B evidence test."
    )


if __name__ == "__main__":
    main()
