#!/usr/bin/env python3
"""Run PR3 SocialSense adapter smoke against a local/public SocialSense install."""

from __future__ import annotations

import json
from typing import Any, Mapping

from integrations.socialsense import run_product_launch_simulation, run_submitted_simulation_configuration

_SUCCESSFUL_RUNTIME_STATUSES = {"completed", "ok"}
_SUBMITTED_CONFIGURATION_CONTRACT = {
    "simulation_profile": "product_launch",
    "selected_platforms": {"Facebook", "LINE", "X"},
    "per_platform_participant_allocation": {"Facebook": 80, "LINE": 120, "X": 150},
    "total_synthetic_participants": 350,
    "evidence_depth": "standard",
    "evidence_tier": "fixture_offline_aggregate_only",
    "confidence_level": "not_calibrated",
}


def _has_verified_submitted_configuration_contract(result: Mapping[str, Any]) -> bool:
    """Require explicit completion, offline provenance, and exact contract echo."""

    runtime_contract = result.get("runtime_contract")
    provenance = result.get("provenance")
    if not isinstance(runtime_contract, Mapping) or not isinstance(provenance, Mapping):
        return False

    selected_platforms = runtime_contract.get("selected_platforms")
    confidence = runtime_contract.get("confidence")
    return (
        result.get("status") == "ok"
        and result.get("run_status") in _SUCCESSFUL_RUNTIME_STATUSES
        and result.get("runtime_consumed") is True
        and result.get("runtime_status") == "consumed_by_runtime"
        and isinstance(selected_platforms, list)
        and all(isinstance(platform, str) for platform in selected_platforms)
        and set(selected_platforms) == _SUBMITTED_CONFIGURATION_CONTRACT["selected_platforms"]
        and len(selected_platforms) == len(_SUBMITTED_CONFIGURATION_CONTRACT["selected_platforms"])
        and runtime_contract.get("simulation_profile") == _SUBMITTED_CONFIGURATION_CONTRACT["simulation_profile"]
        and runtime_contract.get("per_platform_participant_allocation")
        == _SUBMITTED_CONFIGURATION_CONTRACT["per_platform_participant_allocation"]
        and runtime_contract.get("total_synthetic_participants")
        == _SUBMITTED_CONFIGURATION_CONTRACT["total_synthetic_participants"]
        and runtime_contract.get("evidence_depth") == _SUBMITTED_CONFIGURATION_CONTRACT["evidence_depth"]
        and runtime_contract.get("evidence_tier") == _SUBMITTED_CONFIGURATION_CONTRACT["evidence_tier"]
        and isinstance(confidence, Mapping)
        and confidence.get("level") == _SUBMITTED_CONFIGURATION_CONTRACT["confidence_level"]
        and provenance.get("fixture_only") is True
        and provenance.get("live_api_access") is False
        and provenance.get("credentials_required") is False
    )


def main() -> None:
    result = run_product_launch_simulation(
        platform_mix=["LINE", "TikTok"],
        seed="3c-pr3-local-socialsense-smoke",
        assumptions=[
            "Fixture offline aggregate launch planning sample.",
            "Uses reviewed public SDK fixture inputs only.",
            "Outputs require human executive review before any real world decision.",
        ],
        notes="3C PR3 local adapter smoke for SocialSense Marketing Domain Pack.",
    )
    submitted_configuration = run_submitted_simulation_configuration(
        {
            "simulationProfile": "product_launch",
            "selectedPlatforms": ["facebook", "line", "x"],
            "platformAllocations": {"facebook": 80, "line": 120, "x": 150},
            "evidenceDepth": "standard",
        },
        seed="3c-m20-submitted-settings-smoke",
        assumptions=["Fixture/offline aggregate submitted-configuration smoke."],
        notes="3C M20 public SDK runtime-contract smoke.",
    )
    summary = {
        "status": result["status"],
        "run_status": result.get("run_status"),
        "scenario": result["scenario"],
        "platform_mix": result["platform_mix"],
        "export_formats": result["exports"],
        "safety": {
            "labels": result["safety"].get("labels", []),
            "fixture_only": result["safety"].get("fixture_only"),
            "offline_execution": result["safety"].get("offline_execution"),
            "synthetic_aggregate_personas_only": result["safety"].get("synthetic_aggregate_personas_only"),
            "live_api_access": result["safety"].get("live_api_access"),
            "credentials_required": result["safety"].get("credentials_required"),
            "private_social_access": result["safety"].get("private_social_access"),
            "pii_access": result["safety"].get("pii_access"),
            "voter_or_crm_access": result["safety"].get("voter_or_crm_access"),
            "persuasion_optimization": result["safety"].get("persuasion_optimization"),
            "microtargeting": result["safety"].get("microtargeting"),
            "production_ready": result["safety"].get("production_ready"),
            "disallowed_claims": result["safety"].get("disallowed_claims", []),
        },
        "provenance": result["provenance"],
        "limitations_count": len(result.get("limitations", [])),
        "evidence_gaps_count": len(result.get("evidence_gaps", [])),
        "public_sdk_only": result["public_sdk_only"],
        "submitted_configuration": {
            "status": submitted_configuration["status"],
            "runtime_status": submitted_configuration["runtime_status"],
            "runtime_consumed": submitted_configuration["runtime_consumed"],
            "platform_mix": submitted_configuration.get("platform_mix", []),
            "runtime_contract": submitted_configuration.get("runtime_contract", {}),
        },
    }
    print(json.dumps(summary, indent=2, sort_keys=True))
    if not _has_verified_submitted_configuration_contract(submitted_configuration):
        raise SystemExit("Submitted configuration was not consumed by the verified public fixture runtime contract.")


if __name__ == "__main__":
    main()
