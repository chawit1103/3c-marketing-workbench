"""Tests for the PR4 product launch fixture generator."""

from __future__ import annotations

import ast
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GENERATOR_PATH = ROOT / "scripts" / "generate_product_launch_fixture.py"
CAMPAIGN_GENERATOR_PATH = ROOT / "scripts" / "generate_campaign_message_test_fixture.py"
FIXTURE_PATH = ROOT / "src" / "product" / "fixtures" / "productLaunchResult.json"
CAMPAIGN_FIXTURE_PATH = ROOT / "src" / "product" / "fixtures" / "campaignMessageTestResult.json"


class ProductLaunchFixtureGeneratorTests(unittest.TestCase):
    def test_generator_uses_pr3_adapter_only_for_socialsense_execution(self) -> None:
        source = GENERATOR_PATH.read_text(encoding="utf-8")
        tree = ast.parse(source)
        import_from_modules = [node.module for node in ast.walk(tree) if isinstance(node, ast.ImportFrom)]

        self.assertIn("integrations.socialsense", import_from_modules)
        self.assertIn("run_product_launch_simulation", source)
        self.assertIn("export_executive_report", source)
        self.assertNotIn("from socialsense", source)
        self.assertNotIn("socialsense.domain_packs", source)
        self.assertNotIn("app.civicsense", source)

    def test_generated_fixture_has_pr4_ui_contract_and_safety_status(self) -> None:
        self.assertTrue(FIXTURE_PATH.is_file(), "Run scripts/generate_product_launch_fixture.py before tests")
        fixture = json.loads(FIXTURE_PATH.read_text(encoding="utf-8"))

        self.assertEqual(fixture["schemaVersion"], "pr4-product-launch-ui-v1")
        self.assertEqual(fixture["objective"], "Product Launch")
        self.assertEqual(fixture["sourceChecks"]["publicAdapterOnly"], True)
        self.assertEqual(fixture["sourceChecks"]["offlineExecution"], True)
        self.assertEqual(fixture["sourceChecks"]["liveApiAccess"], False)
        self.assertEqual(fixture["sourceChecks"]["credentialsRequired"], False)
        self.assertEqual(fixture["sourceChecks"]["productionReady"], False)
        self.assertEqual(
            [item["label"] for item in fixture["exports"]["formats"]],
            ["JSON", "Markdown", "Executive Summary"],
        )
        self.assertGreaterEqual(len(fixture["cards"]), 5)
        self.assertIn("No live APIs or credentials", fixture["safetyLabels"])
        self.assertIn("reviewMetadata", fixture)
        self.assertIn("provenance", fixture["reviewMetadata"])
        self.assertIn("assumptions", fixture["reviewMetadata"])
        self.assertIn("evidenceGaps", fixture["reviewMetadata"])
        self.assertIn("limitations", fixture["reviewMetadata"])
        self.assertEqual(fixture["reviewMetadata"]["source"]["runtimeMode"], "fixture")
        self.assertEqual(fixture["reviewMetadata"]["source"]["sourceModelLabel"], "socialsense_core_not_executed")
        self.assertEqual(fixture["reviewMetadata"]["source"]["sourceLabel"], "Reviewed SocialSense sample, no live data")
        self.assertIn("Directional synthetic aggregate sample", fixture["reviewMetadata"]["uncertainty"])

    def test_campaign_message_test_generator_uses_public_adapter_facade(self) -> None:
        source = CAMPAIGN_GENERATOR_PATH.read_text(encoding="utf-8")
        tree = ast.parse(source)
        import_from_modules = [node.module for node in ast.walk(tree) if isinstance(node, ast.ImportFrom)]

        self.assertIn("integrations.socialsense", import_from_modules)
        self.assertIn("run_campaign_message_test", source)
        self.assertIn("export_executive_report", source)
        self.assertNotIn("from socialsense", source)
        self.assertNotIn("socialsense.domain_packs", source)
        self.assertNotIn("app.civicsense", source)

    def test_campaign_message_test_fixture_has_m5_ui_contract_and_safety_status(self) -> None:
        self.assertTrue(CAMPAIGN_FIXTURE_PATH.is_file(), "Run scripts/generate_campaign_message_test_fixture.py before tests")
        fixture = json.loads(CAMPAIGN_FIXTURE_PATH.read_text(encoding="utf-8"))

        self.assertEqual(fixture["schemaVersion"], "m5-campaign-message-test-ui-v1")
        self.assertEqual(fixture["objective"], "Campaign Message Test")
        self.assertEqual(fixture["sourceChecks"]["publicAdapterOnly"], True)
        self.assertEqual(fixture["sourceChecks"]["offlineExecution"], True)
        self.assertEqual(fixture["sourceChecks"]["liveApiAccess"], False)
        self.assertEqual(fixture["sourceChecks"]["credentialsRequired"], False)
        self.assertEqual(fixture["sourceChecks"]["productionReady"], False)
        self.assertEqual(
            [item["label"] for item in fixture["exports"]["formats"]],
            ["JSON", "Markdown", "Executive Summary"],
        )
        self.assertGreaterEqual(len(fixture["cards"]), 5)
        self.assertIn("No live APIs or credentials", fixture["safetyLabels"])
        self.assertIn("reviewMetadata", fixture)
        self.assertIn("Campaign Message Test", fixture["summary"]["text"])


if __name__ == "__main__":
    unittest.main()
