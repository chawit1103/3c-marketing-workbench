"""Tests for the PR3 product-owned SocialSense adapter."""

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

    def run(self, **kwargs: Any) -> dict[str, Any]:
        self.run_calls.append(kwargs)
        return {
            "status": "ok",
            "scenario": {"name": kwargs["scenario"]},
            "domain_pack": {"id": "marketing", "production_ready": False},
            "dashboard_contract": {"contract_version": "fake-v1"},
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
    fake_module.load_domain_pack = lambda pack_id: fake_domain
    sys.modules["socialsense"] = fake_module
    return fake_domain


class SocialSenseAdapterStaticTests(unittest.TestCase):
    def test_adapter_imports_only_public_socialsense_facade(self) -> None:
        source = ADAPTER_PATH.read_text(encoding="utf-8")
        tree = ast.parse(source)
        imports: list[str] = []
        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                imports.extend(alias.name for alias in node.names)
            elif isinstance(node, ast.ImportFrom):
                imports.append(node.module or "")
                if node.module == "socialsense":
                    imported_names = {alias.name for alias in node.names}
                    self.assertEqual(imported_names, {"load_domain_pack"})

        self.assertIn("socialsense", imports)
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

    def test_product_launch_maps_3c_inputs_to_public_domain_run(self) -> None:
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
        self.assertEqual(
            self.fake_domain.run_calls[0],
            {
                "scenario": "product_launch",
                "platform_mix": ["LINE", "TikTok"],
                "seed": "unit-seed",
                "assumptions": ["aggregate fixture assumption"],
                "notes": "unit notes",
            },
        )
        self.assertEqual(self.fake_domain.export_calls[0]["format"], "executive_json")
        self.assertIn("export_handle", result)
        self.assertNotIn("run_payload", result)
        self.assertTrue(result["safety"]["fixture_only"])
        self.assertFalse(result["safety"]["live_api_access"])
        self.assertIn("conversion_prediction", result["safety"]["disallowed_claims"])

    def test_export_wrapper_uses_public_domain_export_and_preserves_metadata(self) -> None:
        run = self.adapter.run_product_launch_simulation(
            export_formats=(),
            domain=self.fake_domain,
        )
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

    def test_campaign_message_test_reuses_public_adapter_and_all_export_formats(self) -> None:
        result = self.adapter.run_campaign_message_test(
            message_theme="clear benefit message",
            platform_mix=["LINE", "Facebook"],
            assumptions=["aggregate message assumption"],
            notes="message test notes",
            domain=self.fake_domain,
        )

        self.assertEqual(result["status"], "ok")
        self.assertTrue(result["public_sdk_only"])
        self.assertEqual(result["scenario"], "campaign_response")
        self.assertEqual(result["adapter_function"], "run_campaign_message_test")
        self.assertEqual(self.fake_domain.run_calls[0]["scenario"], "campaign_response")
        self.assertIn("message_theme: clear benefit message", self.fake_domain.run_calls[0]["assumptions"])
        self.assertEqual(
            [call["format"] for call in self.fake_domain.export_calls],
            ["json", "markdown", "executive_json"],
        )
        self.assertEqual(sorted(result["exports"].keys()), ["executive_json", "json", "markdown"])


if __name__ == "__main__":
    unittest.main()
