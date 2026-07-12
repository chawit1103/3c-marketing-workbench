"""Tests for the M20 3C public-SDK SocialSense adapter."""

from __future__ import annotations

import ast
import importlib
import sys
import types
import unittest
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
ADAPTER_PATH = ROOT / "integrations" / "socialsense" / "adapter.py"
FORBIDDEN_REFERENCES = (
    "app.civicsense",
    "socialsense.domain_packs",
    "socialsense.workbench",
    "socialsense.bridge",
    "socialsense.plugins",
    "socialsense.scenarios",
)


class FakeSafetyProfile:
    fixture_only = True
    offline_execution = True
    live_api_access = False
    credentials_required = False
    private_social_access = False
    pii_access = False
    voter_or_crm_access = False
    persuasion_optimization = False
    microtargeting = False
    provenance_labels = ("sample_demo",)


class FakeMarketingDomain:
    safety_profile = FakeSafetyProfile()

    def __init__(self) -> None:
        self.run_calls: list[dict[str, Any]] = []
        self.export_calls: list[dict[str, Any]] = []
        self.runtime_contract_override: dict[str, Any] | None = None

    def run(self, **kwargs: Any) -> dict[str, Any]:
        self.run_calls.append(kwargs)
        runtime_contract = self.runtime_contract_override if self.runtime_contract_override is not None else {
            "simulation_profile": kwargs["simulation_profile"],
            "selected_platforms": kwargs["platform_mix"],
            "per_platform_participant_allocation": kwargs["participant_allocation"],
            "total_synthetic_participants": kwargs["total_participants"],
            "evidence_depth": kwargs["evidence_depth"],
        }
        return {
            "status": "completed",
            "scenario": {"name": kwargs["scenario"]},
            "domain_pack": {"id": "marketing", "production_ready": False},
            "dashboard_contract": {"contract_version": "fake-v1"},
            "runtime_contract": runtime_contract,
            "provenance": {
                "fixture_only": True,
                "live_api_access": False,
                "credentials_required": False,
                "provenance_label": "sample_demo",
            },
            "production_ready": False,
            "marketing_research": {
                "fixture_only": True,
                "offline_execution": True,
                "synthetic_aggregate_personas_only": True,
                "limitations": ["fixture/offline only"],
                "evidence_gaps": ["no field evidence"],
                "human_review_questions": ["What assumptions changed?"],
                "disallowed_claims": ["conversion_prediction", "microtargeting"],
            },
        }

    def export(self, run_payload: dict[str, Any], *, format: str = "json") -> str | dict[str, Any]:
        self.export_calls.append({"run_payload": run_payload, "format": format})
        if format == "executive_json":
            return {"report_type": "executive_report_json", "provenance": run_payload["provenance"]}
        return f"export:{format}"


def install_fake_socialsense() -> FakeMarketingDomain:
    fake_domain = FakeMarketingDomain()
    fake_module = types.ModuleType("socialsense")

    def create_session(**kwargs: Any) -> dict[str, Any]:
        return kwargs

    def run(session: dict[str, Any], domain_pack: FakeMarketingDomain) -> dict[str, Any]:
        return domain_pack.run(
            scenario=session["scenario_name"],
            platform_mix=session["platform_mix"],
            seed=session["seed"],
            assumptions=session["assumptions"],
            notes=session["notes"],
            simulation_profile=session["simulation_profile"],
            participant_allocation=session["participant_allocation"],
            total_participants=session["total_participants"],
            evidence_depth=session["evidence_depth"],
        )

    fake_module.load_domain_pack = lambda pack_id: fake_domain
    fake_module.create_research_session = create_session
    fake_module.run_scenario = run
    fake_module.export_run = lambda run_payload, *, format: fake_domain.export(run_payload, format=format)
    sys.modules["socialsense"] = fake_module
    return fake_domain


class SocialSenseAdapterStaticTests(unittest.TestCase):
    def test_adapter_imports_only_public_socialsense_facade(self) -> None:
        source = ADAPTER_PATH.read_text(encoding="utf-8")
        tree = ast.parse(source)
        imported_names: set[str] = set()
        for node in ast.walk(tree):
            if isinstance(node, ast.ImportFrom) and node.module == "socialsense":
                imported_names.update(alias.name for alias in node.names)

        self.assertEqual(imported_names, {"create_research_session", "export_run", "load_domain_pack", "run_scenario"})
        for forbidden in FORBIDDEN_REFERENCES:
            self.assertNotIn(forbidden, source)

    def test_adapter_does_not_reference_live_or_private_data_paths(self) -> None:
        source = ADAPTER_PATH.read_text(encoding="utf-8")
        for forbidden in ("credentials=", "api_key", "token=", "customer_list", "voter_list"):
            self.assertNotIn(forbidden, source)


class SocialSenseAdapterMappingTests(unittest.TestCase):
    def setUp(self) -> None:
        self.fake_domain = install_fake_socialsense()
        for module_name in ["integrations.socialsense.adapter", "integrations.socialsense"]:
            sys.modules.pop(module_name, None)
        self.adapter = importlib.import_module("integrations.socialsense.adapter")

    def test_product_launch_maps_inputs_to_public_sdk_session_and_runtime(self) -> None:
        result = self.adapter.run_product_launch_simulation(
            platform_mix=["LINE", "TikTok"],
            seed="unit-seed",
            assumptions=["aggregate fixture assumption"],
            notes="unit notes",
            export_formats=("executive_json",),
            domain=self.fake_domain,
        )

        self.assertEqual(result["status"], "ok")
        self.assertTrue(result["public_sdk_only"])
        self.assertEqual(result["scenario"], "product_launch")
        self.assertEqual(result["platform_mix"], ["LINE", "TikTok"])
        self.assertEqual(self.fake_domain.run_calls[0]["scenario"], "product_launch")
        self.assertEqual(self.fake_domain.run_calls[0]["platform_mix"], ["LINE", "TikTok"])
        self.assertEqual(self.fake_domain.run_calls[0]["seed"], "unit-seed")
        self.assertEqual(self.fake_domain.run_calls[0]["assumptions"], ["aggregate fixture assumption"])
        self.assertEqual(self.fake_domain.run_calls[0]["notes"], "unit notes")
        self.assertEqual(self.fake_domain.export_calls[0]["format"], "executive_json")
        self.assertIn("export_handle", result)
        self.assertNotIn("run_payload", result)
        self.assertTrue(result["safety"]["fixture_only"])
        self.assertFalse(result["safety"]["live_api_access"])
        self.assertIn("conversion_prediction", result["safety"]["disallowed_claims"])

    def test_submitted_configuration_maps_every_runtime_contract_field(self) -> None:
        submitted = {
            "simulationProfile": "campaign_response",
            "selectedPlatforms": ["facebook", "line", "x"],
            "platformAllocations": {"facebook": 80, "line": 120, "x": 150},
            "evidenceDepth": "expanded",
        }

        result = self.adapter.run_submitted_simulation_configuration(
            submitted,
            seed="submitted-settings",
            export_formats=(),
            domain=self.fake_domain,
        )

        self.assertEqual(result["status"], "ok")
        self.assertEqual(result["runtime_status"], "consumed_by_runtime")
        self.assertTrue(result["runtime_consumed"])
        self.assertEqual(result["scenario"], "campaign_response")
        self.assertEqual(result["platform_mix"], ["Facebook", "LINE", "X"])
        self.assertEqual(
            self.fake_domain.run_calls[0]["participant_allocation"],
            {"Facebook": 80, "LINE": 120, "X": 150},
        )
        self.assertEqual(self.fake_domain.run_calls[0]["total_participants"], 350)
        self.assertEqual(self.fake_domain.run_calls[0]["evidence_depth"], "expanded")

    def test_submitted_configuration_accepts_canonical_runtime_platform_order(self) -> None:
        self.fake_domain.runtime_contract_override = {
            "simulation_profile": "campaign_response",
            "selected_platforms": ["LINE", "Facebook", "X"],
            "per_platform_participant_allocation": {"Facebook": 80, "LINE": 120, "X": 150},
            "total_synthetic_participants": 350,
            "evidence_depth": "expanded",
        }
        submitted = {
            "simulationProfile": "campaign_response",
            "selectedPlatforms": ["facebook", "line", "x"],
            "platformAllocations": {"facebook": 80, "line": 120, "x": 150},
            "evidenceDepth": "expanded",
        }

        result = self.adapter.run_submitted_simulation_configuration(
            submitted,
            seed="canonical-order",
            export_formats=(),
            domain=self.fake_domain,
        )

        self.assertEqual(result["runtime_status"], "consumed_by_runtime")
        self.assertTrue(result["runtime_consumed"])

    def test_submitted_configuration_falls_closed_when_runtime_contract_is_absent(self) -> None:
        self.fake_domain.runtime_contract_override = {}
        submitted = {
            "simulationProfile": "product_launch",
            "selectedPlatforms": ["line"],
            "platformAllocations": {"line": 30},
            "evidenceDepth": "minimal",
        }

        result = self.adapter.run_submitted_simulation_configuration(submitted, export_formats=(), domain=self.fake_domain)

        self.assertEqual(result["status"], "configuration_only")
        self.assertEqual(result["runtime_status"], "configuration_only")
        self.assertFalse(result["runtime_consumed"])
        self.assertEqual(result["reason"], "executable_runtime_evidence_absent")

    def test_invalid_submitted_configuration_falls_closed_without_runtime_execution(self) -> None:
        result = self.adapter.run_submitted_simulation_configuration(
            {
                "simulationProfile": "product_launch",
                "selectedPlatforms": ["line"],
                "platformAllocations": {"line": 1},
                "evidenceDepth": "standard",
            },
            domain=self.fake_domain,
        )

        self.assertEqual(result["status"], "configuration_only")
        self.assertEqual(self.fake_domain.run_calls, [])

    def test_export_wrapper_uses_public_sdk_export_and_preserves_metadata(self) -> None:
        run = self.adapter.run_product_launch_simulation(export_formats=(), domain=self.fake_domain)
        exported = self.adapter.export_executive_report(run, domain=self.fake_domain)

        self.assertEqual(exported["status"], "ok")
        self.assertEqual(exported["format"], "executive_json")
        self.assertEqual(exported["artifact"]["report_type"], "executive_report_json")
        self.assertTrue(exported["public_sdk_only"])
        self.assertTrue(exported["safety"]["fixture_only"])
        self.assertFalse(exported["safety"]["credentials_required"])

    def test_message_comparison_uses_deterministic_campaign_response_wrappers(self) -> None:
        comparison = self.adapter.run_message_comparison(
            message_a="clear value message",
            message_b="trust proof message",
            platform_mix=["LINE"],
            domain=self.fake_domain,
        )

        self.assertEqual(comparison["status"], "ok")
        self.assertEqual(comparison["scenario"], "campaign_response")
        self.assertEqual(len(self.fake_domain.run_calls), 2)
        self.assertEqual(self.fake_domain.run_calls[0]["scenario"], "campaign_response")
        self.assertIn("message_a", comparison["arms"])
        self.assertIn("message_b", comparison["arms"])


if __name__ == "__main__":
    unittest.main()
