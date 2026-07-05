#!/usr/bin/env python3
"""Generate the PR4 product-launch UI fixture through the PR3 SocialSense adapter."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from integrations.socialsense import export_executive_report, run_product_launch_simulation

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "src" / "product" / "fixtures" / "productLaunchResult.json"

SAMPLE = {
    "brand": "Nimbus Go",
    "campaign_message": "Healthy lunch decisions in under 10 minutes for busy urban teams.",
    "offer": "Intro launch bundle: first-week sampler with free delivery threshold.",
    "key_message": "Save time without sacrificing taste, nutrition, or team convenience.",
    "context": "Reviewed offline product-launch sample for an executive marketing scenario walkthrough.",
    "audiences": ["Working Adults", "Urban Consumers", "SME Owners"],
    "platforms": ["Facebook", "TikTok", "LINE"],
}


def main() -> None:
    assumptions = [
        f"Brand and product is {SAMPLE['brand']}.",
        f"Campaign message is {SAMPLE['campaign_message']}",
        f"Launch offer is {SAMPLE['offer']}",
        f"Key message is {SAMPLE['key_message']}",
        "Audience focus is " + ", ".join(SAMPLE["audiences"]) + ".",
        "Use only aggregate, synthetic, offline assumptions with no customer records or private audience data.",
    ]
    run = run_product_launch_simulation(
        platform_mix=SAMPLE["platforms"],
        seed="3c-pr4-product-launch-vertical-slice",
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

    fixture = build_ui_fixture(run, artifact, markdown_export["artifact"], json_export["artifact"])
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(fixture, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)}")


def build_ui_fixture(
    run: dict[str, Any], executive: dict[str, Any], markdown_artifact: Any, json_artifact: Any
) -> dict[str, Any]:
    summary = executive.get("executive_summary", {})
    marketing = executive.get("marketing_research", {})
    kpis = marketing.get("marketing_kpis", {})
    observations = list(marketing.get("research_observations", []))
    platform_breakdown = executive.get("platform_breakdown", [])
    risks = executive.get("risk_and_limitations", {})
    safety = run.get("safety", {})

    return {
        "schemaVersion": "pr4-product-launch-ui-v1",
        "runId": executive.get("workbench_run_id", run.get("export_handle", "sample-run")),
        "objective": "Product Launch",
        "sampleInput": SAMPLE,
        "summary": {
            "headline": "Offline product-launch simulation ready for executive review",
            "text": executive_preview(summary),
            "sentimentDelta": summary.get("sentiment_delta"),
            "trustDelta": summary.get("trust_delta"),
            "diffusionReach": summary.get("diffusion_reach"),
            "riskScore": summary.get("risk_score"),
        },
        "cards": [
            {
                "title": "Overall Reaction",
                "value": friendly_signal(summary.get("sentiment_delta"), "Positive directional response"),
                "detail": "Audience response is aggregate and synthetic; use it to decide what to test next.",
            },
            {
                "title": "Message Acceptance",
                "value": friendly_signal(kpis.get("message_acceptance"), "Message is understandable"),
                "detail": "The promise is clearest when the time-saving benefit is paired with trust proof.",
            },
            {
                "title": "Brand Perception",
                "value": friendly_signal(summary.get("trust_delta"), "Trust needs proof points"),
                "detail": "Add quality, delivery, and nutrition evidence before scaling the message.",
            },
            {
                "title": "Engagement Potential",
                "value": friendly_signal(summary.get("diffusion_reach"), "Moderate share potential"),
                "detail": "Short video and chat-friendly creative are likely better first tests than broad reach claims.",
            },
            {
                "title": "Synthetic Purchase Intent",
                "value": friendly_signal(kpis.get("synthetic_purchase_intent"), "Directional only"),
                "detail": "This is not a sales forecast or conversion guarantee; validate with approved field data.",
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
            "Working Adults: emphasize speed, reliability, and a clear lunch-time use case.",
            "Urban Consumers: lead with convenience and visible quality proof.",
            "SME Owners: frame the offer as a simple team perk with budget control.",
        ] + [clean_summary_text(str(item)) for item in observations[:2]],
        "risksCaveats": summarize_risks(list(risks.get("limitations", []))),
        "recommendedNextTest": "Run a small approved A/B creative test: time-saving headline versus trust-proof headline, reviewed by a human before launch.",
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
            "status": "Generated from the reviewed offline sample; review safety notes before reuse.",
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
                "sourceLabel": "Reviewed SocialSense sample, no live data",
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
    sentiment = friendly_signal(summary.get("sentiment_delta"), "directional response")
    trust = friendly_signal(summary.get("trust_delta"), "trust signal needs review")
    reach = friendly_signal(summary.get("diffusion_reach"), "channel signal needs review")
    return (
        f"The offline Product Launch sample shows a {sentiment.lower()} with {trust.lower()} "
        f"and {reach.lower()}. Treat this as a planning prompt for human review, not a forecast."
    )


def executive_summary_preview(summary: dict[str, Any]) -> str:
    sentiment = friendly_signal(summary.get("sentiment_delta"), "directional response")
    trust = friendly_signal(summary.get("trust_delta"), "trust signal needs review")
    reach = friendly_signal(summary.get("diffusion_reach"), "channel signal needs review")
    return (
        f"Executive review: product-launch response is {sentiment.lower()}, trust is {trust.lower()}, "
        f"and channel reach is {reach.lower()}. Confirm assumptions, evidence gaps, and limitations before any launch use."
    )


def sanitize_review_list(items: Any) -> list[str]:
    if isinstance(items, dict):
        values = [f"{key}: {value}" for key, value in items.items()]
    elif isinstance(items, list):
        values = items
    elif items:
        values = [items]
    else:
        values = []
    return [clean_summary_text(str(item)) for item in values if str(item).strip()]


def clean_summary_text(text: str) -> str:
    return (
        text.replace("Product Launch Research Fixture aggregate fixture simulation", "Product launch offline sample")
        .replace("fixture simulation", "offline sample")
        .replace("synthetic diffusion reach", "synthetic reach")
        .replace("SocialSense contract", "review contract")
        .replace("Fixture mode", "Offline sample mode")
        .replace("fixture mode", "offline sample mode")
        .replace("socialsense_core_not_executed", "offline sample, no live model execution")
    )


def sanitize_limitations(limitations: list[Any]) -> list[str]:
    measured_metric_copy = "Aggregate dashboard " + "metrics require human review before executive or public-facing interpretation."
    replacements = {
        "Experimental backend/CLI spike only; not production-ready and not exposed in CivicSense UI.": "Reviewed offline sample only; not production-ready and not connected to production campaign systems.",
        "Experimental backend-only workbench; not a production simulator replacement.": "Offline workbench sample only; not a production simulator replacement.",
        measured_metric_copy: "Dashboard signals require human review before executive or public-facing use.",
    }
    cleaned: list[str] = []
    for item in limitations:
        text = clean_summary_text(str(item))
        cleaned.append(replacements.get(text, text))
    return cleaned


def friendly_signal(value: Any, fallback: str) -> str:
    if isinstance(value, (int, float)):
        if value >= 0.35:
            return "Strong directional signal"
        if value >= 0.15:
            return "Moderate positive signal"
        if value >= 0:
            return "Light positive signal"
        return "Needs message revision"
    return fallback


def platform_name(value: Any) -> str:
    names = {"line": "LINE", "facebook": "Facebook", "tiktok": "TikTok", "youtube": "YouTube", "instagram": "Instagram", "x": "X / Twitter"}
    return names.get(str(value).lower(), str(value).title())


def platform_signal(item: dict[str, Any]) -> str:
    actions = item.get("actions", {})
    if not isinstance(actions, dict) or not actions:
        return "Review needed"
    strongest = max(actions, key=lambda key: actions[key])
    return str(strongest).replace("_", " ").title()


def platform_detail(item: dict[str, Any]) -> str:
    return "Fixture channel cue only; use as a planning prompt, not measured live activity."


def summarize_risks(limitations: list[Any]) -> list[str]:
    base = sanitize_limitations(limitations)[:3]
    measured_metric_copy = "Aggregate dashboard " + "metrics require human review before executive or public-facing interpretation."
    replacements = {
        measured_metric_copy: "Dashboard signals require human review before executive or public-facing use.",
    }
    base = [replacements.get(item, item) for item in base]
    safety_summary = "Offline fixture only: no live social data, private data, CRM lists, or production prediction."
    return base + [safety_summary]


def export_status(label: str, run: dict[str, Any], key: str, artifact: Any) -> dict[str, Any]:
    status = run.get("exports", {}).get(key, {})
    return {
        "label": label,
        "status": "Available for review" if status.get("available") else "Needs regeneration",
        "detail": "Prepared from the reviewed offline sample with safety notes attached.",
        "sizeHint": len(artifact) if isinstance(artifact, str) else len(artifact.keys()) if isinstance(artifact, dict) else 0,
    }


if __name__ == "__main__":
    main()
