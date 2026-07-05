#!/usr/bin/env python3
"""Run PR3 SocialSense adapter smoke against a local/public SocialSense install."""

from __future__ import annotations

import json

from integrations.socialsense import run_product_launch_simulation


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
    }
    print(json.dumps(summary, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
