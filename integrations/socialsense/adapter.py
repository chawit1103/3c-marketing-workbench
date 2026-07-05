"""3C product adapter over the public SocialSense Marketing Domain Pack.

This module is intentionally small and product-owned. It imports only the
SocialSense public facade and calls only ``load_domain_pack('marketing')``,
``domain.run(...)``, and ``domain.export(...)``. It does not import or copy
SocialSense internals.
"""

from __future__ import annotations

from typing import Any, Iterable

from socialsense import load_domain_pack

DEFAULT_PLATFORM_MIX = ["LINE", "Facebook", "TikTok"]
DEFAULT_EXPORT_FORMATS = ("json", "markdown", "executive_json")
PUBLIC_SDK_ONLY = True


def run_product_launch_simulation(
    *,
    scenario: str = "product_launch",
    platform_mix: Iterable[str] | None = None,
    seed: str = "3c-pr3-product-launch-fixture",
    assumptions: Iterable[str] | None = None,
    notes: str = "",
    export_formats: Iterable[str] = DEFAULT_EXPORT_FORMATS,
    domain: Any | None = None,
) -> dict[str, Any]:
    """Run a product-launch fixture through SocialSense public SDK/runtime.

    Inputs are aggregate, non-sensitive, and map directly to SocialSense accepted
    fields: ``scenario``, ``platform_mix``, ``seed``, ``assumptions``, and
    ``notes``.
    """

    return _run_marketing_fixture(
        scenario=scenario,
        platform_mix=platform_mix,
        seed=seed,
        assumptions=assumptions,
        notes=notes,
        export_formats=export_formats,
        domain=domain,
        adapter_function="run_product_launch_simulation",
    )


def run_campaign_message_test(
    *,
    message_theme: str = "safe aggregate launch message",
    platform_mix: Iterable[str] | None = None,
    seed: str = "3c-pr3-campaign-message-fixture",
    assumptions: Iterable[str] | None = None,
    notes: str = "",
    domain: Any | None = None,
) -> dict[str, Any]:
    """Adapter-shaped campaign-response wrapper for later UI integration."""

    mapped_assumptions = _normalize_assumptions(assumptions)
    mapped_assumptions.append(f"message_theme: {message_theme}")
    return _run_marketing_fixture(
        scenario="campaign_response",
        platform_mix=platform_mix,
        seed=seed,
        assumptions=mapped_assumptions,
        notes=notes,
        export_formats=("executive_json",),
        domain=domain,
        adapter_function="run_campaign_message_test",
    )


def run_message_comparison(
    *,
    message_a: str,
    message_b: str,
    platform_mix: Iterable[str] | None = None,
    seed: str = "3c-pr3-message-comparison-fixture",
    assumptions: Iterable[str] | None = None,
    domain: Any | None = None,
) -> dict[str, Any]:
    """Run two deterministic aggregate campaign-message fixtures for comparison."""

    shared_domain = domain or _load_marketing_domain()
    first = run_campaign_message_test(
        message_theme=message_a,
        platform_mix=platform_mix,
        seed=f"{seed}-a",
        assumptions=assumptions,
        notes="Comparison arm A. Fixture/offline aggregate only.",
        domain=shared_domain,
    )
    second = run_campaign_message_test(
        message_theme=message_b,
        platform_mix=platform_mix,
        seed=f"{seed}-b",
        assumptions=assumptions,
        notes="Comparison arm B. Fixture/offline aggregate only.",
        domain=shared_domain,
    )
    return {
        "status": "ok" if first["status"] == "ok" and second["status"] == "ok" else "error",
        "adapter_function": "run_message_comparison",
        "public_sdk_only": PUBLIC_SDK_ONLY,
        "scenario": "campaign_response",
        "platform_mix": first["platform_mix"],
        "arms": {"message_a": first, "message_b": second},
        "limitations": sorted(set(first.get("limitations", []) + second.get("limitations", []))),
        "safety": _merge_safety(first.get("safety", {}), second.get("safety", {})),
    }


def export_executive_report(
    run: dict[str, Any],
    *,
    format: str = "executive_json",
    domain: Any | None = None,
) -> dict[str, Any]:
    """Export a SocialSense run payload through the public domain export method."""

    run_payload = run.get("run_payload", run)
    marketing = domain or _load_marketing_domain()
    exported = marketing.export(run_payload, format=format)
    return {
        "status": "ok",
        "format": format,
        "artifact": exported,
        "artifact_type": type(exported).__name__,
        "public_sdk_only": PUBLIC_SDK_ONLY,
        "provenance": run_payload.get("provenance", {}),
        "safety": _extract_safety(run_payload, marketing),
    }


def _run_marketing_fixture(
    *,
    scenario: str,
    platform_mix: Iterable[str] | None,
    seed: str,
    assumptions: Iterable[str] | None,
    notes: str,
    export_formats: Iterable[str],
    domain: Any | None,
    adapter_function: str,
) -> dict[str, Any]:
    marketing = domain or _load_marketing_domain()
    mapped_platform_mix = _normalize_platform_mix(platform_mix)
    mapped_assumptions = _normalize_assumptions(assumptions)
    run_payload = marketing.run(
        scenario=scenario,
        platform_mix=mapped_platform_mix,
        seed=seed,
        assumptions=mapped_assumptions,
        notes=notes,
    )
    run_status = run_payload.get("status", "completed")
    exports = _export_bundle(marketing, run_payload, export_formats)
    marketing_research = run_payload.get("marketing_research", {})
    return {
        "status": "ok" if run_status == "completed" else str(run_status),
        "run_status": run_status,
        "adapter_function": adapter_function,
        "public_sdk_only": PUBLIC_SDK_ONLY,
        "scenario": run_payload.get("scenario", {}).get("name", scenario),
        "platform_mix": mapped_platform_mix,
        "input": {
            "scenario": scenario,
            "platform_mix": mapped_platform_mix,
            "seed": seed,
            "assumptions": mapped_assumptions,
            "notes": notes,
        },
        "domain_pack": run_payload.get("domain_pack", {}),
        "dashboard_contract": run_payload.get("dashboard_contract", {}),
        "provenance": run_payload.get("provenance", {}),
        "safety": _extract_safety(run_payload, marketing),
        "limitations": list(marketing_research.get("limitations", [])),
        "evidence_gaps": list(marketing_research.get("evidence_gaps", [])),
        "human_review_questions": list(marketing_research.get("human_review_questions", [])),
        "exports": exports,
        "run_payload": run_payload,
    }


def _load_marketing_domain() -> Any:
    return load_domain_pack("marketing")


def _normalize_platform_mix(platform_mix: Iterable[str] | None) -> list[str]:
    values = [str(item).strip() for item in (platform_mix or DEFAULT_PLATFORM_MIX) if str(item).strip()]
    if not values:
        raise ValueError("platform_mix must include at least one aggregate platform label.")
    return values


def _normalize_assumptions(assumptions: Iterable[str] | None) -> list[str]:
    return [str(item).strip() for item in (assumptions or []) if str(item).strip()]


def _export_bundle(domain: Any, run_payload: dict[str, Any], export_formats: Iterable[str]) -> dict[str, dict[str, Any]]:
    statuses: dict[str, dict[str, Any]] = {}
    for export_format in export_formats:
        artifact = domain.export(run_payload, format=str(export_format))
        statuses[str(export_format)] = {
            "status": "ok",
            "artifact_type": type(artifact).__name__,
            "available": True,
        }
        if isinstance(artifact, dict):
            statuses[str(export_format)]["top_level_keys"] = sorted(artifact.keys())
        else:
            statuses[str(export_format)]["length"] = len(artifact)
    return statuses


def _extract_safety(run_payload: dict[str, Any], domain: Any) -> dict[str, Any]:
    marketing_research = run_payload.get("marketing_research", {})
    domain_pack = run_payload.get("domain_pack", {})
    safety_profile = getattr(domain, "safety_profile", None)
    return {
        "labels": list(getattr(safety_profile, "provenance_labels", ()) or []),
        "fixture_only": _coalesce_bool(
            marketing_research.get("fixture_only"),
            run_payload.get("provenance", {}).get("fixture_only"),
            getattr(safety_profile, "fixture_only", None),
        ),
        "offline_execution": _coalesce_bool(
            marketing_research.get("offline_execution"),
            getattr(safety_profile, "offline_execution", None),
        ),
        "synthetic_aggregate_personas_only": marketing_research.get("synthetic_aggregate_personas_only"),
        "live_api_access": _coalesce_bool(
            run_payload.get("provenance", {}).get("live_api_access"),
            getattr(safety_profile, "live_api_access", None),
        ),
        "credentials_required": _coalesce_bool(
            run_payload.get("provenance", {}).get("credentials_required"),
            getattr(safety_profile, "credentials_required", None),
        ),
        "private_social_access": getattr(safety_profile, "private_social_access", False),
        "pii_access": getattr(safety_profile, "pii_access", False),
        "voter_or_crm_access": getattr(safety_profile, "voter_or_crm_access", False),
        "persuasion_optimization": getattr(safety_profile, "persuasion_optimization", False),
        "microtargeting": getattr(safety_profile, "microtargeting", False),
        "production_ready": domain_pack.get("production_ready", run_payload.get("production_ready")),
        "disallowed_claims": list(marketing_research.get("disallowed_claims", [])),
    }


def _coalesce_bool(*values: Any) -> bool | None:
    for value in values:
        if isinstance(value, bool):
            return value
    return None


def _merge_safety(first: dict[str, Any], second: dict[str, Any]) -> dict[str, Any]:
    merged = dict(first)
    for key, value in second.items():
        if key == "labels":
            merged[key] = sorted(set(merged.get(key, []) + value))
        elif key == "disallowed_claims":
            merged[key] = sorted(set(merged.get(key, []) + value))
        elif key not in merged:
            merged[key] = value
    return merged
