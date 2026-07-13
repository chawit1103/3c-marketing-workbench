#!/usr/bin/env python3
"""Generate the M5 Campaign Message Test UI fixture through the public SocialSense adapter."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from integrations.socialsense import export_executive_report, run_campaign_message_test
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
    runtime_traceability_evidence,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "src" / "product" / "fixtures" / "campaignMessageTestResult.json"

SAMPLE = {
    "brand": "Nimbus Go",
    "campaign_message": "Healthy lunch decisions in under 10 minutes for busy urban teams.",
    "offer": "No offer required for message-only review.",
    "key_message": "Save time without sacrificing taste, nutrition, or team convenience.",
    "tone": "helpful, practical, trust-first",
    "claim": "Under 10 minutes is a message assumption for review, not a verified production claim.",
    "context": "Reviewed offline Campaign Message Test sample for executive message-readiness planning.",
    "audiences": ["Working Adults", "Urban Consumers", "SME Owners"],
    "platforms": ["Facebook", "TikTok", "LINE"],
}


def main() -> None:
    assumptions = [
        f"Brand is {SAMPLE['brand']}.",
        f"Campaign message is {SAMPLE['campaign_message']}",
        f"Key message is {SAMPLE['key_message']}",
        f"Tone is {SAMPLE['tone']}",
        f"Claim to review is {SAMPLE['claim']}",
        "Audience focus is " + ", ".join(SAMPLE["audiences"]) + ".",
        "Use only aggregate, synthetic, offline assumptions with no customer records or private audience data.",
    ]
    run = run_campaign_message_test(
        message_theme=SAMPLE["campaign_message"],
        platform_mix=SAMPLE["platforms"],
        seed="3c-m5-campaign-message-test-reference-workflow",
        assumptions=assumptions,
        notes=SAMPLE["context"],
        export_formats=("json", "markdown", "executive_json"),
    )
    executive_export = export_executive_report(run, format="executive_json")
    markdown_export = export_executive_report(run, format="markdown")
    json_export = export_executive_report(run, format="json")

    artifact = executive_export["artifact"]
    if not isinstance(artifact, dict):
        raise TypeError("executive_json export did not return a dictionary")

    runtime_evidence = runtime_traceability_evidence("campaign_response", SAMPLE["platforms"], 150)
    fixture = build_ui_fixture(run, artifact, markdown_export["artifact"], json_export["artifact"], runtime_evidence)
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(fixture, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)}")


def build_ui_fixture(
    run: dict[str, Any], executive: dict[str, Any], markdown_artifact: Any, json_artifact: Any,
    runtime_evidence: dict[str, Any] | None = None,
) -> dict[str, Any]:
    summary = executive.get("executive_summary", {})
    marketing = executive.get("marketing_research", {})
    kpis = marketing.get("marketing_kpis", {})
    observations = list(marketing.get("research_observations", []))
    platform_breakdown = executive.get("platform_breakdown", [])
    risks = executive.get("risk_and_limitations", {})
    safety = run.get("safety", {})

    return {
        "schemaVersion": "m5-campaign-message-test-ui-v1",
        "runId": executive.get("workbench_run_id", run.get("export_handle", "campaign-message-sample-run")),
        "objective": "Campaign Message Test",
        "sampleInput": SAMPLE,
        "runtimeEvidence": runtime_evidence,
        "summary": {
            "headline": "Offline campaign-message test ready for executive review",
            "text": executive_preview(summary),
            "sentimentDelta": summary.get("sentiment_delta"),
            "trustDelta": summary.get("trust_delta"),
            "diffusionReach": summary.get("diffusion_reach"),
            "riskScore": summary.get("risk_score"),
        },
        "cards": [
            {
                "title": "Overall Reaction",
                "value": friendly_signal(summary.get("sentiment_delta"), "Message needs review"),
                "detail": "Audience response is aggregate and synthetic; use it to choose the next approved message test.",
            },
            {
                "title": "Message Clarity",
                "value": friendly_signal(kpis.get("message_acceptance"), "Main benefit is understandable"),
                "detail": "The message is strongest when the time-saving benefit is stated with plain proof.",
            },
            {
                "title": "Tone Fit",
                "value": friendly_signal(summary.get("trust_delta"), "Tone needs trust proof"),
                "detail": "Helpful and practical tone should be paired with evidence before external use.",
            },
            {
                "title": "Claim Readiness",
                "value": "Needs substantiation review",
                "detail": "Review the under-10-minute claim with product evidence before launch approval.",
            },
            {
                "title": "Platform Fit",
                "value": friendly_signal(summary.get("diffusion_reach"), "Moderate channel fit"),
                "detail": "Short video and chat-friendly variants are better first tests than broad campaign scaling.",
            },
        ],
        "platformBreakdown": [
            {
                "platform": platform_name(item.get("platform")),
                "signal": platform_signal(item),
                "detail": platform_detail(item),
            }
            for item in platform_breakdown
        ],
        "audienceInsights": [
            "Working Adults: emphasize speed, reliability, and proof that the lunch choice is practical.",
            "Urban Consumers: lead with convenience and visible quality cues.",
            "SME Owners: frame the message as a simple team convenience benefit, not a guaranteed outcome.",
        ] + [clean_summary_text(str(item)) for item in observations[:2]],
        "risksCaveats": summarize_risks(list(risks.get("limitations", []))),
        "recommendedNextTest": "Run a small approved message-readiness test: clarity-first headline versus trust-proof headline, reviewed by a human before launch use.",
        "safetyLabels": [
            "Synthetic aggregate sample",
            "Offline review only",
            "No live APIs or credentials",
            "No PII, CRM lists, private messages, or voter lists",
            "No microtargeting, persuasion optimization, or conversion guarantees",
        ],
        "exports": {
            "formats": [
                export_status("JSON", run, "json", json_artifact),
                export_status("Markdown", run, "markdown", markdown_artifact),
                export_status("Executive Summary", run, "executive_json", executive),
            ],
            "readiness": "Ready for human review",
            "status": "Generated from the reviewed offline Campaign Message Test sample; review safety notes before reuse.",
            "executiveSummaryPreview": executive_summary_preview(summary),
        },
        "reviewMetadata": {
            "provenance": executive.get("provenance", run.get("provenance", {})),
            "assumptions": sanitize_review_list(executive.get("assumptions", run.get("input", {}).get("assumptions", []))),
            "evidenceGaps": sanitize_review_list(executive.get("evidence_gaps", run.get("evidence_gaps", []))),
            "limitations": sanitize_limitations(list(executive.get("limitations", [])))[:5]
            or sanitize_limitations(list(risks.get("limitations", [])))[:5],
            "source": {
                "runtimeMode": str(executive.get("provenance", run.get("provenance", {})).get("runtime_mode", "fixture")),
                "sourceModelLabel": str(executive.get("provenance", run.get("provenance", {})).get("source_model_label", "offline_sample")),
                "provenanceLabel": str(executive.get("provenance", run.get("provenance", {})).get("provenance_label", "sample_demo")),
                "reviewMode": "Offline sample",
                "sourceLabel": "Reviewed offline sample, no live data",
            },
            "uncertainty": "Directional synthetic aggregate sample only; use for human review and next-test planning, not prediction.",
        },
        "sourceChecks": {
            "publicAdapterOnly": bool(run.get("public_sdk_only")),
            "offlineExecution": bool(safety.get("offline_execution")),
            "liveApiAccess": bool(safety.get("live_api_access")),
            "credentialsRequired": bool(safety.get("credentials_required")),
            "productionReady": bool(safety.get("production_ready")),
        },
    }


def executive_preview(summary: dict[str, Any]) -> str:
    sentiment = friendly_signal(summary.get("sentiment_delta"), "message response needs review")
    trust = friendly_signal(summary.get("trust_delta"), "trust signal needs review")
    reach = friendly_signal(summary.get("diffusion_reach"), "channel signal needs review")
    return (
        f"The offline Campaign Message Test sample shows {sentiment.lower()} for message response, "
        f"{trust.lower()} for trust, and {reach.lower()} for channel reach. "
        f"Treat this as a planning prompt for human review, not a forecast."
    )


def executive_summary_preview(summary: dict[str, Any]) -> str:
    sentiment = friendly_signal(summary.get("sentiment_delta"), "message response needs review")
    trust = friendly_signal(summary.get("trust_delta"), "trust signal needs review")
    reach = friendly_signal(summary.get("diffusion_reach"), "channel signal needs review")
    return (
        f"Executive review: message response is {sentiment.lower()}, trust is {trust.lower()}, "
        f"and channel reach is {reach.lower()}. Use this to plan a small approved message-readiness test after human review."
    )


if __name__ == "__main__":
    main()
