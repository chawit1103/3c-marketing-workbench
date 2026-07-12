"""3C adapter over the public SocialSense Consumer SDK contract.

This product-owned boundary maps aggregate, submitted configuration to the
reviewed fixture/offline SocialSense runtime. It imports no SocialSense internals
and does not calculate or copy simulation logic.
"""

from __future__ import annotations

from typing import Any, Iterable, Mapping
from uuid import uuid4

from socialsense import create_research_session, export_run, load_domain_pack, run_scenario

DEFAULT_PLATFORM_MIX = ["LINE", "Facebook", "TikTok"]
DEFAULT_EXPORT_FORMATS = ("json", "markdown", "executive_json")
PUBLIC_SDK_ONLY = True
_RUN_PAYLOADS: dict[str, dict[str, Any]] = {}
_PLATFORM_LABELS = {
    "facebook": "Facebook",
    "tiktok": "TikTok",
    "line": "LINE",
    "youtube": "YouTube",
    "x": "X",
}
_CANONICAL_PLATFORM_ORDER = ("LINE", "Facebook", "TikTok", "YouTube", "X", "Reddit")
_EVIDENCE_DEPTHS = {"minimal", "standard", "expanded"}
_SCENARIO_NAMES = {"product_launch", "brand_awareness", "campaign_response", "product_feedback", "promotion_response"}
_RUNTIME_EVIDENCE_TIER = "fixture_offline_aggregate_only"
_NON_CALIBRATED_CONFIDENCE_LEVEL = "not_calibrated"
_MIN_PLATFORM_ALLOCATION = 10
_MAX_PLATFORM_ALLOCATION = 500


def run_product_launch_simulation(
    *,
    scenario: str = "product_launch",
    platform_mix: Iterable[str] | None = None,
    seed: str = "3c-pr3-product-launch-fixture",
    assumptions: Iterable[str] | None = None,
    notes: str = "",
    export_formats: Iterable[str] = DEFAULT_EXPORT_FORMATS,
    domain: Any | None = None,
    simulation_profile: str | None = None,
    participant_allocation: Mapping[str, int] | None = None,
    total_participants: int | None = None,
    evidence_depth: str = "standard",
) -> dict[str, Any]:
    """Run a product-launch fixture through the public Consumer SDK contract."""

    return _run_marketing_fixture(
        scenario=scenario,
        platform_mix=platform_mix,
        seed=seed,
        assumptions=assumptions,
        notes=notes,
        export_formats=export_formats,
        domain=domain,
        adapter_function="run_product_launch_simulation",
        simulation_profile=simulation_profile,
        participant_allocation=participant_allocation,
        total_participants=total_participants,
        evidence_depth=evidence_depth,
    )


def run_campaign_message_test(
    *,
    message_theme: str = "safe aggregate launch message",
    platform_mix: Iterable[str] | None = None,
    seed: str = "3c-pr3-campaign-message-fixture",
    assumptions: Iterable[str] | None = None,
    notes: str = "",
    export_formats: Iterable[str] = DEFAULT_EXPORT_FORMATS,
    domain: Any | None = None,
    simulation_profile: str | None = None,
    participant_allocation: Mapping[str, int] | None = None,
    total_participants: int | None = None,
    evidence_depth: str = "standard",
) -> dict[str, Any]:
    """Run a campaign-message fixture through the public Consumer SDK contract."""

    mapped_assumptions = _normalize_assumptions(assumptions)
    mapped_assumptions.append(f"message_theme: {message_theme}")
    return _run_marketing_fixture(
        scenario="campaign_response",
        platform_mix=platform_mix,
        seed=seed,
        assumptions=mapped_assumptions,
        notes=notes,
        export_formats=export_formats,
        domain=domain,
        adapter_function="run_campaign_message_test",
        simulation_profile=simulation_profile,
        participant_allocation=participant_allocation,
        total_participants=total_participants,
        evidence_depth=evidence_depth,
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


def run_submitted_simulation_configuration(
    submitted_configuration: Mapping[str, Any],
    *,
    scenario: str | None = None,
    seed: str = "3c-m20-submitted-configuration",
    assumptions: Iterable[str] | None = None,
    notes: str = "",
    export_formats: Iterable[str] = DEFAULT_EXPORT_FORMATS,
    domain: Any | None = None,
) -> dict[str, Any]:
    """Run submitted 3C settings, failing closed without runtime evidence.

    Product configuration fields are mapped to the additive public runtime
    fields. The result is marked ``consumed_by_runtime`` only when the public
    runtime contract echoes every submitted setting and preserves offline safety
    provenance; otherwise no result is promoted beyond ``configuration_only``.
    """

    try:
        runtime_inputs = _map_submitted_configuration(submitted_configuration)
        if scenario is not None and scenario != runtime_inputs["scenario_name"]:
            raise ValueError("Submitted simulation scenario must match the canonical simulation profile.")
        result = _run_marketing_fixture(
            scenario=runtime_inputs["scenario_name"],
            platform_mix=runtime_inputs["platform_mix"],
            seed=seed,
            assumptions=assumptions,
            notes=notes,
            export_formats=export_formats,
            domain=domain,
            adapter_function="run_submitted_simulation_configuration",
            simulation_profile=runtime_inputs["simulation_profile"],
            participant_allocation=runtime_inputs["participant_allocation"],
            total_participants=runtime_inputs["total_participants"],
            evidence_depth=runtime_inputs["evidence_depth"],
        )
    except Exception:
        return _configuration_only_fallback(submitted_configuration)

    if not _has_executable_runtime_evidence(result, runtime_inputs):
        return _configuration_only_fallback(submitted_configuration)

    result["runtime_status"] = "consumed_by_runtime"
    result["runtime_consumed"] = True
    return result


def export_executive_report(
    run: dict[str, Any],
    *,
    format: str = "executive_json",
    domain: Any | None = None,
) -> dict[str, Any]:
    """Export a completed run through the public Consumer SDK export contract."""

    run_payload = _resolve_run_payload(run)
    exported = export_run(run_payload, format=format)
    return {
        "status": "ok",
        "format": format,
        "artifact": exported,
        "artifact_type": type(exported).__name__,
        "public_sdk_only": PUBLIC_SDK_ONLY,
        "provenance": run_payload.get("provenance", {}),
        "safety": _extract_safety(run_payload, domain),
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
    simulation_profile: str | None = None,
    participant_allocation: Mapping[str, int] | None = None,
    total_participants: int | None = None,
    evidence_depth: str = "standard",
) -> dict[str, Any]:
    marketing = domain or _load_marketing_domain()
    mapped_platform_mix = _normalize_platform_mix(platform_mix)
    mapped_assumptions = _normalize_assumptions(assumptions)
    mapped_allocation = dict(participant_allocation) if participant_allocation is not None else None
    session = create_research_session(
        scenario_name=scenario,
        platform_mix=mapped_platform_mix,
        seed=seed,
        runtime_mode="fixture",
        data_mode="fixture",
        assumptions=mapped_assumptions,
        notes=notes,
        simulation_profile=simulation_profile,
        participant_allocation=mapped_allocation,
        total_participants=total_participants,
        evidence_depth=evidence_depth,
    )
    run_payload = run_scenario(session=session, domain_pack=marketing)
    run_status = run_payload.get("status", "completed")
    export_handle = _store_run_payload(run_payload)
    exports = _export_bundle(run_payload, export_formats)
    marketing_research = run_payload.get("marketing_research", {})
    return {
        "status": "ok" if run_status in {"completed", "ok"} else str(run_status),
        "run_status": run_status,
        "export_handle": export_handle,
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
            "simulation_profile": simulation_profile,
            "participant_allocation": mapped_allocation,
            "total_participants": total_participants,
            "evidence_depth": evidence_depth,
        },
        "domain_pack": run_payload.get("domain_pack", {}),
        "dashboard_contract": run_payload.get("dashboard_contract", {}),
        "provenance": run_payload.get("provenance", {}),
        "runtime_contract": run_payload.get("runtime_contract", {}),
        "safety": _extract_safety(run_payload, marketing),
        "limitations": list(marketing_research.get("limitations", [])),
        "evidence_gaps": list(marketing_research.get("evidence_gaps", [])),
        "human_review_questions": list(marketing_research.get("human_review_questions", [])),
        "exports": exports,
    }


def _store_run_payload(run_payload: dict[str, Any]) -> str:
    handle = str(run_payload.get("workbench_run_id") or f"3c-adapter-{uuid4()}")
    _RUN_PAYLOADS[handle] = run_payload
    return handle


def _resolve_run_payload(run: dict[str, Any]) -> dict[str, Any]:
    handle = run.get("export_handle")
    if isinstance(handle, str) and handle in _RUN_PAYLOADS:
        return _RUN_PAYLOADS[handle]
    if "scenario" in run and "provenance" in run and "marketing_research" in run:
        return run
    raise ValueError("export_executive_report requires an adapter export_handle from a completed run.")


def _load_marketing_domain() -> Any:
    return load_domain_pack("marketing")


def _normalize_platform_mix(platform_mix: Iterable[str] | None) -> list[str]:
    values = [str(item).strip() for item in (platform_mix or DEFAULT_PLATFORM_MIX) if str(item).strip()]
    if not values:
        raise ValueError("platform_mix must include at least one aggregate platform label.")
    return values


def _normalize_assumptions(assumptions: Iterable[str] | None) -> list[str]:
    return [str(item).strip() for item in (assumptions or []) if str(item).strip()]


def _export_bundle(run_payload: dict[str, Any], export_formats: Iterable[str]) -> dict[str, dict[str, Any]]:
    statuses: dict[str, dict[str, Any]] = {}
    for export_format in export_formats:
        artifact = export_run(run_payload, format=str(export_format))
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


def _extract_safety(run_payload: dict[str, Any], domain: Any | None) -> dict[str, Any]:
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
        if key in {"labels", "disallowed_claims"}:
            merged[key] = sorted(set(merged.get(key, []) + value))
        elif key not in merged:
            merged[key] = value
    return merged


def _map_submitted_configuration(submitted_configuration: Mapping[str, Any]) -> dict[str, Any]:
    profile = submitted_configuration.get("simulationProfile")
    selected_platforms = submitted_configuration.get("selectedPlatforms")
    allocations = submitted_configuration.get("platformAllocations")
    evidence_depth = submitted_configuration.get("evidenceDepth")
    if profile not in _SCENARIO_NAMES or evidence_depth not in _EVIDENCE_DEPTHS:
        raise ValueError("Submitted simulation profile or evidence depth is not supported.")
    if not isinstance(selected_platforms, list) or not selected_platforms:
        raise ValueError("Submitted configuration requires selected platforms.")
    if len({platform for platform in selected_platforms if isinstance(platform, str)}) != len(selected_platforms):
        raise ValueError("Submitted configuration contains duplicate or unsupported platforms.")
    if not isinstance(allocations, Mapping):
        raise ValueError("Submitted configuration requires platform allocations.")

    platform_mix: list[str] = []
    participant_allocation: dict[str, int] = {}
    for platform_key in selected_platforms:
        if not isinstance(platform_key, str) or platform_key not in _PLATFORM_LABELS:
            raise ValueError("Submitted configuration contains an unsupported platform.")
        allocation = allocations.get(platform_key)
        if (
            isinstance(allocation, bool)
            or not isinstance(allocation, int)
            or not _MIN_PLATFORM_ALLOCATION <= allocation <= _MAX_PLATFORM_ALLOCATION
        ):
            raise ValueError("Submitted configuration contains an invalid synthetic participant allocation.")
        platform_label = _PLATFORM_LABELS[platform_key]
        platform_mix.append(platform_label)
        participant_allocation[platform_label] = allocation

    return {
        "scenario_name": profile,
        "simulation_profile": profile,
        "platform_mix": platform_mix,
        "participant_allocation": participant_allocation,
        "total_participants": sum(participant_allocation.values()),
        "evidence_depth": evidence_depth,
    }


def _has_executable_runtime_evidence(result: Mapping[str, Any], expected: Mapping[str, Any]) -> bool:
    runtime_contract = result.get("runtime_contract")
    provenance = result.get("provenance")
    if result.get("status") != "ok" or not isinstance(runtime_contract, Mapping) or not isinstance(provenance, Mapping):
        return False
    confidence = runtime_contract.get("confidence")
    return (
        runtime_contract.get("simulation_profile") == expected["simulation_profile"]
        and _normalize_runtime_platform_order(runtime_contract.get("selected_platforms"))
        == _normalize_runtime_platform_order(expected["platform_mix"])
        and runtime_contract.get("per_platform_participant_allocation") == expected["participant_allocation"]
        and runtime_contract.get("total_synthetic_participants") == expected["total_participants"]
        and runtime_contract.get("evidence_depth") == expected["evidence_depth"]
        and runtime_contract.get("evidence_tier") == _RUNTIME_EVIDENCE_TIER
        and isinstance(confidence, Mapping)
        and confidence.get("level") == _NON_CALIBRATED_CONFIDENCE_LEVEL
        and provenance.get("fixture_only") is True
        and provenance.get("live_api_access") is False
        and provenance.get("credentials_required") is False
    )


def _normalize_runtime_platform_order(platforms: Any) -> list[str] | None:
    if not isinstance(platforms, list) or not all(isinstance(platform, str) for platform in platforms):
        return None
    order = {platform: index for index, platform in enumerate(_CANONICAL_PLATFORM_ORDER)}
    return sorted(platforms, key=lambda platform: order.get(platform, len(order)))


def _configuration_only_fallback(submitted_configuration: Mapping[str, Any]) -> dict[str, Any]:
    return {
        "status": "configuration_only",
        "runtime_status": "configuration_only",
        "runtime_consumed": False,
        "public_sdk_only": PUBLIC_SDK_ONLY,
        "submitted_configuration": _submitted_configuration_snapshot(submitted_configuration),
        "reason": "executable_runtime_evidence_absent",
        "provenance": {
            "source": "submitted_configuration",
            "runtime_evidence": "not_verified",
            "runtime_consumed": False,
        },
        "limitations": [
            "Submitted configuration is retained for fixture/offline aggregate review only.",
            "No runtime result is presented without verified public runtime evidence.",
        ],
        "evidence_gaps": [
            "Required public runtime-contract evidence was missing, mismatched, or ambiguous.",
            "No calibrated confidence or live platform measurement is available.",
        ],
    }


def _submitted_configuration_snapshot(submitted_configuration: Mapping[str, Any]) -> dict[str, Any]:
    snapshot: dict[str, Any] = {}
    simulation_profile = submitted_configuration.get("simulationProfile")
    selected_platforms = submitted_configuration.get("selectedPlatforms")
    platform_allocations = submitted_configuration.get("platformAllocations")
    evidence_depth = submitted_configuration.get("evidenceDepth")

    if simulation_profile in _SCENARIO_NAMES:
        snapshot["simulationProfile"] = simulation_profile
    if isinstance(selected_platforms, list) and isinstance(platform_allocations, Mapping):
        accepted_platforms = [
            platform for platform in selected_platforms if isinstance(platform, str) and platform in _PLATFORM_LABELS
        ]
        has_complete_platform_selection = (
            bool(accepted_platforms)
            and len(accepted_platforms) == len(selected_platforms)
            and len(set(accepted_platforms)) == len(accepted_platforms)
        )
        accepted_allocations = {
            platform: platform_allocations.get(platform)
            for platform in accepted_platforms
        }
        has_matching_allocations = all(
            isinstance(allocation, int)
            and not isinstance(allocation, bool)
            and _MIN_PLATFORM_ALLOCATION <= allocation <= _MAX_PLATFORM_ALLOCATION
            for allocation in accepted_allocations.values()
        )
        if has_complete_platform_selection and has_matching_allocations:
            snapshot["selectedPlatforms"] = accepted_platforms
            snapshot["platformAllocations"] = accepted_allocations
    if evidence_depth in _EVIDENCE_DEPTHS:
        snapshot["evidenceDepth"] = evidence_depth
    return snapshot
